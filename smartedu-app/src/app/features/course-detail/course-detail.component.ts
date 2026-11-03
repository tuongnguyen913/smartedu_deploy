import { Component, inject, OnInit, signal, computed, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Title, Meta, DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CourseService } from '../../core/services/course.service';
import { ModalService } from '../../core/services/modal.service';
import { CourseDetail, CourseSyllabus, Course } from '../../core/models/course.model';
import { LeadFormComponent } from '../../shared/components/lead-form/lead-form.component';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, LeadFormComponent],
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private courseService = inject(CourseService);
  private modalService = inject(ModalService);
  private titleService = inject(Title);
  private metaService = inject(Meta);
  private sanitizer = inject(DomSanitizer);
  private platformId = inject(PLATFORM_ID);

  course = signal<CourseDetail | null>(null);
  sanitizedContent = signal<SafeHtml>('');
  otherCourses = signal<Course[]>([]);
  isLoading = signal<boolean>(true);
  isNotFound = signal<boolean>(false);
  activeAccordionIndex = signal<number>(0);

  syllabuses = computed(() => {
    const c = this.course();
    if (!c) return [];
    return c.syllabuses || c.syllabusList || [];
  });

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      if (slug) {
        this.loadCourse(slug);
      } else {
        this.isNotFound.set(true);
        this.isLoading.set(false);
      }
    });

    this.courseService.getCourses().subscribe(courses => {
      if (courses && courses.length > 0) {
        this.otherCourses.set(courses);
      }
    });
  }

  loadCourse(slug: string) {
    this.isLoading.set(true);
    this.isNotFound.set(false);

    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    this.courseService.getCourseDetail(slug).subscribe({
      next: (data) => {
        if (!data || !data.courseName) {
          this.isNotFound.set(true);
          this.isLoading.set(false);
          return;
        }

        this.course.set(data);

        // Render ContentHtml
        const rawContent = data.contentHtml || this.getDefaultContentHtml(data);
        this.sanitizedContent.set(this.sanitizer.bypassSecurityTrustHtml(rawContent));

        // Update Title & Meta Tags for SEO
        const seoTitle = data.seoTitle || `${data.courseName} — SmartEdu Academy`;
        this.titleService.setTitle(seoTitle);
        if (data.seoDescription || data.shortDescription) {
          this.metaService.updateTag({
            name: 'description',
            content: data.seoDescription || data.shortDescription || ''
          });
        }

        this.isLoading.set(false);
      },
      error: () => {
        this.isNotFound.set(true);
        this.isLoading.set(false);
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

  formatGradeBadge(course: Course | CourseDetail): string {
    if (course.grade) return course.grade;
    switch ((course.gradeLevel || '').toLowerCase()) {
      case 'cap2': return 'Lớp 6 - Lớp 9';
      case 'chuyencap':
      case 'tuyensinh10': return 'Lớp 9';
      case 'cap3': return 'Lớp 10 - Lớp 12';
      default: return 'Lớp 6 - Lớp 9';
    }
  }

  private getDefaultContentHtml(course: CourseDetail): string {
    return `
      <h2>1. Giới thiệu tổng quan chương trình</h2>
      <p>Chương trình <strong>${course.courseName}</strong> tại SmartEdu Academy được thiết kế đặc biệt dành riêng cho học sinh ${course.grade || 'từ Lớp 6 đến Lớp 12'}, bám sát định hướng đổi mới phương pháp và chuẩn đầu ra của Bộ GD&ĐT.</p>
      <p>Đặc biệt chú trọng việc phát hiện sớm và bù đắp các lỗ hổng kiến thức căn bản, đồng thời rèn luyện phản xạ giải quyết các bài toán vận dụng thực tiễn — một trong những điểm mới then chốt trong các kỳ thi học kỳ và tuyển sinh hiện nay.</p>

      <h2>2. Mục tiêu năng lực đầu ra</h2>
      <ul>
        <li><strong>Nền tảng vững chắc:</strong> Hệ thống hóa 100% định nghĩa, công thức cốt lõi và dạng toán cơ bản.</li>
        <li><strong>Tư duy độc lập:</strong> Thành thạo kỹ năng phân tích đề thi thực tế, không học vẹt, nhớ lâu.</li>
        <li><strong>Bứt phá điểm số:</strong> Tự tin đạt điểm 8.0+ trong các bài kiểm tra định kỳ và kỳ thi chuyển cấp/tốt nghiệp.</li>
        <li><strong>Tâm lý phòng thi vững vàng:</strong> Rèn luyện kỹ năng canh giờ, hạn chế tối đa các lỗi sai ngớ ngẩn làm mất điểm oan.</li>
      </ul>

      <h2>3. Điểm khác biệt tại SmartEdu Academy</h2>
      <div class="feature-box-highlight">
        <div class="feature-item">
          <i class="fa-solid fa-graduation-cap"></i>
          <div>
            <strong>100% Giảng viên Sư phạm TP.HCM</strong>
            <p>Thầy cô giàu kinh nghiệm bồi dưỡng học sinh giỏi, nắm bắt tâm lý lứa tuổi và phương pháp sư phạm truyền cảm hứng.</p>
          </div>
        </div>
        <div class="feature-item">
          <i class="fa-solid fa-users"></i>
          <div>
            <strong>Sĩ số vàng tối đa 15 học sinh</strong>
            <p>Không gian học tập chuẩn mực, giáo viên nắm rõ năng lực và sửa bài cặn kẽ cho từng em ngay trong giờ học.</p>
          </div>
        </div>
        <div class="feature-item">
          <i class="fa-solid fa-user-check"></i>
          <div>
            <strong>Kèm 1:1 miễn phí ngoài giờ</strong>
            <p>Hỗ trợ học sinh giải đáp bài tập trên trường hoặc củng cố kiến thức chưa vững hoàn toàn miễn phí.</p>
          </div>
        </div>
      </div>
    `;
  }
}

