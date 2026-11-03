import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, timeout } from 'rxjs/operators';
import { PageHeader } from '../models/page-header.model';
import { Course, CourseCategoryTab, CoursesResponse, CourseDetail, CourseSyllabus } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  private baseUrl = 'http://localhost:5000/api/courses';
  private fallbackUrl = 'http://localhost:5206/api/courses';

  private defaultHeader: PageHeader = {
    subTitle: 'LỘ TRÌNH CÁ NHÂN HÓA',
    title: 'Chương Trình Bồi Dưỡng Chất Lượng Cao',
    content: 'Hệ thống chương trình chuẩn mực từ Lớp 6 đến Lớp 12 và Luyện thi Tuyển sinh 10. 100% giáo viên ĐH Sư Phạm TP.HCM giảng dạy, kèm 1:1 miễn phí ngoài giờ.',
    isActive: true
  };

  private defaultSeedTabs: CourseCategoryTab[] = [
    { moduleId: 0, moduleName: 'Tất cả chương trình', moduleKey: 'ALL', displayOrder: 0 },
    { moduleId: 1, moduleName: 'KHỐI THCS (LỚP 6 - 9)', moduleKey: 'Cap2', displayOrder: 1 },
    { moduleId: 2, moduleName: 'KHỐI TUYỂN SINH 10 & CHUYÊN', moduleKey: 'ChuyenCap', displayOrder: 2 },
    { moduleId: 3, moduleName: 'KHỐI THPT & LUYỆN THI ĐẠI HỌC', moduleKey: 'Cap3', displayOrder: 3 }
  ];

  private defaultSeedCourses: Course[] = [
    {
      courseId: 1,
      courseName: 'Khối THCS Chất Lượng Cao (Lớp 6 – 9)',
      slug: 'khoi-thcs-lop-6-9',
      gradeLevel: 'Cap2',
      grade: 'Lớp 6 - Lớp 9',
      subject: 'Toán, Ngữ Văn, Tiếng Anh, KHTN',
      shortDescription: 'Lấy lại căn bản, phát triển tư duy giải quyết vấn đề và chuẩn bị sớm cho kỳ thi Tuyển sinh 10 vào trường công lập.',
      thumbnailUrl: 'assets/images/lop-cap2.png',
      classSizeMax: 15,
      scheduleSummary: '2–3 buổi / tuần',
      tuitionFee: 1800000,
      tuitionPeriod: 'tháng',
      hasFreeTutoringGuarantee: true,
      hasTuitionRefundGuarantee: true,
      displayOrder: 1,
      isFeatured: true,
      isActive: true
    },
    {
      courseId: 2,
      courseName: 'Chiến Binh Bứt Phá — Luyện Thi Tuyển Sinh 10',
      slug: 'luyen-thi-vao-lop-10-tuyen-sinh',
      gradeLevel: 'ChuyenCap',
      grade: 'Lớp 9',
      subject: 'Toán, Ngữ Văn, Tiếng Anh',
      shortDescription: 'Luyện đề sát cấu trúc đề Sở GD&ĐT TP.HCM, rèn kỹ năng xử lý áp lực phòng thi, cam kết đỗ NV1 công lập.',
      thumbnailUrl: 'assets/images/lop-cap3.png',
      classSizeMax: 15,
      scheduleSummary: '3 buổi / tuần',
      tuitionFee: 2200000,
      tuitionPeriod: 'tháng',
      hasFreeTutoringGuarantee: true,
      hasTuitionRefundGuarantee: true,
      displayOrder: 2,
      isFeatured: true,
      isActive: true
    },
    {
      courseId: 3,
      courseName: 'Khối THPT & Định Hướng Đại Học (Lớp 10 – 12)',
      slug: 'khoi-thpt-dinh-huong-dai-hoc',
      gradeLevel: 'Cap3',
      grade: 'Lớp 10 - Lớp 12',
      subject: 'Toán, Vật Lý, Hóa Học, Ngữ Văn, Tiếng Anh',
      shortDescription: 'Nắm chắc kiến thức phân hóa nâng cao, bám sát phương pháp đổi mới của Bộ GD&ĐT, chuẩn bị hồ sơ xét tuyển.',
      thumbnailUrl: 'assets/images/anh-ai-ung-dung.jpg',
      classSizeMax: 15,
      scheduleSummary: '3 buổi / tuần',
      tuitionFee: 2500000,
      tuitionPeriod: 'tháng',
      hasFreeTutoringGuarantee: true,
      hasTuitionRefundGuarantee: true,
      displayOrder: 3,
      isFeatured: true,
      isActive: true
    }
  ];

  getHeader(): Observable<PageHeader> {
    if (!isPlatformBrowser(this.platformId)) {
      return of(this.defaultHeader);
    }
    return this.http.get<PageHeader>(`${this.baseUrl}/header`).pipe(
      timeout(3000),
      catchError(() => {
        return this.http.get<PageHeader>(`${this.fallbackUrl}/header`).pipe(
          timeout(2000),
          catchError(() => of(this.defaultHeader))
        );
      })
    );
  }

  getCoursesList(): Observable<CoursesResponse> {
    if (!isPlatformBrowser(this.platformId)) {
      return of({
        categories: this.defaultSeedTabs,
        courses: this.defaultSeedCourses
      });
    }
    return this.http.get<CoursesResponse>(`${this.baseUrl}/list`).pipe(
      timeout(3000),
      catchError(() => {
        return this.http.get<CoursesResponse>(`${this.fallbackUrl}/list`).pipe(
          timeout(2000),
          catchError(() => of({
            categories: this.defaultSeedTabs,
            courses: this.defaultSeedCourses
          }))
        );
      })
    );
  }

  getCourses(): Observable<Course[]> {
    return this.getCoursesList().pipe(
      map(res => res.courses)
    );
  }

  getCourseBySlug(slug: string): Observable<Course | undefined> {
    return this.getCourses().pipe(
      map(courses => courses.find(c => c.slug === slug))
    );
  }

  getCourseDetail(slug: string): Observable<CourseDetail> {
    if (!isPlatformBrowser(this.platformId)) {
      const match = this.defaultSeedCourses.find(c => c.slug === slug || c.courseId.toString() === slug);
      return of(this.buildFallbackDetail(match, slug));
    }

    return this.http.get<CourseDetail>(`${this.baseUrl}/detail/${slug}`).pipe(
      timeout(3500),
      catchError(() => {
        return this.http.get<CourseDetail>(`${this.fallbackUrl}/detail/${slug}`).pipe(
          timeout(2500),
          catchError(() => {
            const match = this.defaultSeedCourses.find(c => c.slug === slug || c.courseId.toString() === slug);
            return of(this.buildFallbackDetail(match, slug));
          })
        );
      })
    );
  }

  private buildFallbackDetail(course?: Course, slug = ''): CourseDetail {
    const base = course || {
      courseId: 1,
      courseName: 'Khối THCS Chất Lượng Cao (Lớp 6 – 9)',
      slug: slug || 'khoi-thcs-lop-6-9',
      gradeLevel: 'Cap2',
      grade: 'Lớp 6 - Lớp 9',
      subject: 'Toán, Ngữ Văn, Tiếng Anh, KHTN',
      shortDescription: 'Lấy lại căn bản, phát triển tư duy giải quyết vấn đề và chuẩn bị sớm cho kỳ thi Tuyển sinh 10 vào trường công lập.',
      thumbnailUrl: 'assets/images/lop-cap2.png',
      classSizeMax: 15,
      scheduleSummary: '2–3 buổi / tuần',
      tuitionFee: 1800000,
      tuitionPeriod: 'tháng',
      hasFreeTutoringGuarantee: true,
      hasTuitionRefundGuarantee: true,
      displayOrder: 1,
      isFeatured: true,
      isActive: true
    };

    const syllabuses: CourseSyllabus[] = [
      {
        syllabusId: 1,
        courseId: base.courseId,
        semesterName: 'Giai Đoạn 1: Củng Cố Căn Bản',
        topicTitle: 'Rà soát lỗ hổng kiến thức & Hệ thống hóa lý thuyết trọng tâm',
        topicContent: 'Kiểm tra năng lực 1:1, đánh giá chính xác lỗ hổng môn học từ các năm trước. Củng cố công thức, định nghĩa và phương pháp giải các dạng bài cốt lõi.',
        displayOrder: 1
      },
      {
        syllabusId: 2,
        courseId: base.courseId,
        semesterName: 'Giai Đoạn 2: Tăng Tốc Kỹ Năng',
        topicTitle: 'Rèn luyện kỹ năng giải toán thực tế & Vận dụng kiến thức',
        topicContent: 'Bám sát chương trình GDPT 2018 mới (Chân trời sáng tạo, Cánh diều, Kết nối tri thức). Tăng cường các câu hỏi liên hệ thực tiễn chiếm 30-40% đề thi.',
        displayOrder: 2
      },
      {
        syllabusId: 3,
        courseId: base.courseId,
        semesterName: 'Giai Đoạn 3: Bứt Phá Điểm 9-10',
        topicTitle: 'Luyện đề chuẩn cấu trúc & Chiến thuật phân bổ thời gian',
        topicContent: 'Thực hành bộ đề thi thử độc quyền theo ma trận Sở GD&ĐT TP.HCM. Chấm chéo, rọc phách, rèn tâm lý thi cử và khắc phục triệt để lỗi sai ngớ ngẩn.',
        displayOrder: 3
      }
    ];

    return {
      ...base,
      heroBanner: base.bannerUrl || base.thumbnailUrl || 'assets/images/lop-cap2.png',
      contentHtml: base.contentHtml || `
        <h3>Mục tiêu đào tạo</h3>
        <p>Chương trình giúp học sinh nắm vững bản chất kiến thức, rèn luyện tư duy logic độc lập và làm quen phương pháp học chủ động.</p>
        <h3>Phương pháp giảng dạy độc quyền</h3>
        <ul>
          <li><strong>Mô hình Lớp Tinh Hoa:</strong> Tối đa 15 học sinh/lớp, giáo viên theo sát từng em.</li>
          <li><strong>Kèm 1:1 ngoài giờ:</strong> Thầy cô ĐH Sư Phạm phụ đạo miễn phí ngay khi học sinh gặp bài khó.</li>
          <li><strong>Báo cáo học tập minh bạch:</strong> Phụ huynh nhận báo cáo chi tiết qua Zalo sau mỗi buổi học.</li>
        </ul>
      `,
      syllabuses,
      syllabusList: syllabuses
    };
  }
}
