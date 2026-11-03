import { Component, OnInit, inject, signal, computed, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml, Title, Meta } from '@angular/platform-browser';
import { switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { CourseService } from '../../core/services/course.service';
import { ModalService } from '../../core/services/modal.service';
import { Course } from '../../core/models/course.model';
import { LeadFormComponent } from '../../shared/components/lead-form/lead-form.component';

@Component({
  standalone: true,
  selector: 'app-course-detail',
  imports: [CommonModule, RouterLink, LeadFormComponent],
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  private courseService = inject(CourseService);
  private modalService = inject(ModalService);
  private titleService = inject(Title);
  private metaService = inject(Meta);
  private sanitizer = inject(DomSanitizer);
  private platformId = inject(PLATFORM_ID);

  course = signal<any>(null);
  loading = signal<boolean>(true);
  sanitizedContent = signal<SafeHtml>('');
  otherCourses = signal<Course[]>([]);
  activeAccordionIndex = signal<number>(0);

  // Computed lấy danh sách chuyên đề theo khóa học
  syllabuses = computed(() => {
    const c = this.course();
    if (!c) return [];
    return c.syllabuses || c.syllabusList || [];
  });

  ngOnInit() {
    // Đăng ký lắng nghe sự thay đổi của tham số :slug trên URL bằng switchMap
    this.route.paramMap.pipe(
      switchMap(params => {
        this.loading.set(true);
        const slug = params.get('slug');
        if (!slug) return of(null);

        return this.http.get<any>(`http://localhost:5000/api/courses/detail/${slug}`).pipe(
          catchError(() => {
            return this.http.get<any>(`http://localhost:5206/api/courses/detail/${slug}`).pipe(
              catchError(() => this.courseService.getCourseDetail(slug))
            );
          })
        );
      })
    ).subscribe({
      next: (data) => {
        if (data) {
          this.course.set(data);

          // Render ContentHtml an toàn
          const rawContent = data.contentHtml || this.getDefaultContentHtml(data);
          this.sanitizedContent.set(this.sanitizer.bypassSecurityTrustHtml(rawContent));

          // Cập nhật SEO Title & Meta
          const seoTitle = data.seoTitle || `${data.courseName} — SmartEdu Academy`;
          this.titleService.setTitle(seoTitle);
          if (data.seoDescription || data.shortDescription) {
            this.metaService.updateTag({
              name: 'description',
              content: data.seoDescription || data.shortDescription || ''
            });
          }
        } else {
          this.course.set(null);
        }

        this.loading.set(false);
        if (isPlatformBrowser(this.platformId)) {
          window.scrollTo(0, 0); // Tự động cuộn lên đầu trang khi nạp bài mới
        }
      },
      error: (err) => {
        console.error('Lỗi lấy chi tiết khóa học:', err);
        this.loading.set(false);
      }
    });

    // Lấy danh sách khóa học khác cho thanh Sidebar
    this.courseService.getCourses().subscribe(courses => {
      if (courses && courses.length > 0) {
        this.otherCourses.set(courses);
      }
    });
  }

  toggleAccordion(index: number) {
    this.activeAccordionIndex.update(curr => (curr === index ? -1 : index));
  }

  openAssessment() {
    const c = this.course();
    const courseName = c ? c.courseName : undefined;
    this.modalService.openAssessment(courseName);
  }

  formatGradeBadge(course: any): string {
    if (!course) return 'Lớp 6 - Lớp 9';
    if (course.grade) return course.grade;
    switch ((course.gradeLevel || '').toLowerCase()) {
      case 'cap2': return 'Lớp 6 - Lớp 9';
      case 'chuyencap':
      case 'tuyensinh10': return 'Lớp 9';
      case 'cap3': return 'Lớp 10 - Lớp 12';
      default: return 'Lớp 6 - Lớp 9';
    }
  }

  private getDefaultContentHtml(course: any): string {
    return `
      <h2>1. Giới thiệu tổng quan: ${course.courseName}</h2>
      <p>${course.shortDescription || 'Chương trình bồi dưỡng kiến thức chất lượng cao tại SmartEdu Academy.'}</p>
      <h2>2. Mục tiêu năng lực đầu ra</h2>
      <ul>
        <li><strong>Nền tảng vững chắc:</strong> Hệ thống hóa 100% định nghĩa, công thức cốt lõi và dạng bài tập cơ bản.</li>
        <li><strong>Tư duy độc lập:</strong> Thành thạo kỹ năng phân tích đề thi thực tế, không học vẹt, nhớ lâu.</li>
        <li><strong>Bứt phá điểm số:</strong> Tự tin đạt điểm 8.0+ trong các bài kiểm tra định kỳ và kỳ thi chuyển cấp/tốt nghiệp.</li>
        <li><strong>Tâm lý phòng thi vững vàng:</strong> Rèn luyện kỹ năng canh giờ, hạn chế tối đa các lỗi sai ngớ ngẩn làm mất điểm oan.</li>
      </ul>
      <h2>3. Điểm khác biệt tại SmartEdu Academy</h2>
      <p>Lớp học sĩ số tối đa <strong>${course.classSizeMax || 15} học sinh</strong>, 100% giáo viên ĐH Sư Phạm TP.HCM theo sát từng em, <strong>kèm 1:1 miễn phí ngoài giờ</strong> và cam kết hoàn 100% học phí nếu không tiến bộ.</p>
    `;
  }
}
