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
      courseName: 'Toán Tư Duy & Nâng Cao Cấp 2',
      slug: 'toan-tu-duy-nang-cao-cap-2',
      gradeLevel: 'Cap2',
      grade: 'Lớp 6 - Lớp 9',
      subject: 'Toán học',
      shortDescription: 'Chương trình bồi dưỡng toàn diện năng lực tư duy toán học, giúp học sinh xóa tan nỗi sợ hình học & đại số, tự tin đạt điểm 8-9-10.',
      thumbnailUrl: 'assets/images/lop-cap2.png',
      classSizeMax: 15,
      scheduleSummary: '2 buổi/tuần (90 phút/buổi)',
      tuitionFee: 1600000,
      tuitionPeriod: 'tháng',
      hasFreeTutoringGuarantee: true,
      hasTuitionRefundGuarantee: true,
      displayOrder: 1,
      isFeatured: true,
      isActive: true
    },
    {
      courseId: 2,
      courseName: 'Khoa Học Tự Nhiên Toàn Diện (Lý - Hóa - Sinh)',
      slug: 'khoa-hoc-tu-nhien-toan-dien',
      gradeLevel: 'Cap2',
      grade: 'Lớp 6 - Lớp 9',
      subject: 'Khoa học Tự nhiên',
      shortDescription: 'Tích hợp 3 phân môn Vật Lý - Hóa Học - Sinh Học với phương pháp học qua hiện tượng và sơ đồ tư duy thực tế.',
      thumbnailUrl: 'assets/images/lop-cap2.png',
      classSizeMax: 15,
      scheduleSummary: '2 buổi/tuần (90 phút/buổi)',
      tuitionFee: 1500000,
      tuitionPeriod: 'tháng',
      hasFreeTutoringGuarantee: true,
      hasTuitionRefundGuarantee: true,
      displayOrder: 2,
      isFeatured: true,
      isActive: true
    },
    {
      courseId: 3,
      courseName: 'Chiến Binh Bứt Phá - Luyện Thi Vào Lớp 10 Tuyển Sinh',
      slug: 'luyen-thi-vao-lop-10-tuyen-sinh',
      gradeLevel: 'ChuyenCap',
      grade: 'Lớp 9',
      subject: 'Toán học & Tuyển sinh',
      shortDescription: 'Lộ trình ôn thi chuyên sâu bám sát cấu trúc đề thi tuyển sinh vào Lớp 10 công lập tại TP.HCM. Cam kết đầu ra đỗ trường nguyện vọng 1.',
      thumbnailUrl: 'assets/images/lop-cap3.png',
      classSizeMax: 12,
      scheduleSummary: '3 buổi/tuần (120 phút/buổi)',
      tuitionFee: 1800000,
      tuitionPeriod: 'tháng',
      hasFreeTutoringGuarantee: true,
      hasTuitionRefundGuarantee: true,
      displayOrder: 3,
      isFeatured: true,
      isActive: true
    },
    {
      courseId: 4,
      courseName: 'Khối THPT & Luyện Thi Đại Học (Lớp 10 – 12)',
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
      displayOrder: 4,
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
      map(res => {
        if (res && res.courses) {
          const hasCap3 = res.courses.some(c => (c.gradeLevel || '').toLowerCase() === 'cap3');
          if (!hasCap3) {
            const cap3Course = this.defaultSeedCourses.find(c => c.gradeLevel === 'Cap3');
            if (cap3Course) {
              res.courses.push(cap3Course);
            }
          }
        }
        return res;
      }),
      catchError(() => {
        return this.http.get<CoursesResponse>(`${this.fallbackUrl}/list`).pipe(
          timeout(2000),
          map(res => {
            if (res && res.courses) {
              const hasCap3 = res.courses.some(c => (c.gradeLevel || '').toLowerCase() === 'cap3');
              if (!hasCap3) {
                const cap3Course = this.defaultSeedCourses.find(c => c.gradeLevel === 'Cap3');
                if (cap3Course) {
                  res.courses.push(cap3Course);
                }
              }
            }
            return res;
          }),
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
      const match = this.findMatchingSeedCourse(slug);
      return of(this.buildFallbackDetail(match, slug));
    }

    return this.http.get<CourseDetail>(`${this.baseUrl}/detail/${slug}`).pipe(
      timeout(3500),
      catchError(() => {
        return this.http.get<CourseDetail>(`${this.fallbackUrl}/detail/${slug}`).pipe(
          timeout(2500),
          catchError(() => {
            const match = this.findMatchingSeedCourse(slug);
            return of(this.buildFallbackDetail(match, slug));
          })
        );
      })
    );
  }

  private findMatchingSeedCourse(slug: string): Course {
    const s = (slug || '').toLowerCase();
    return this.defaultSeedCourses.find(c =>
      c.slug.toLowerCase() === s ||
      c.courseId.toString() === s ||
      (s.includes('khoa-hoc') || s.includes('khtn') ? c.courseId === 2 : false) ||
      (s.includes('lop-10') || s.includes('tuyen-sinh') ? c.courseId === 3 : false) ||
      (s.includes('thpt') || s.includes('dai-hoc') ? c.courseId === 4 : false)
    ) || this.defaultSeedCourses[0];
  }

  private buildFallbackDetail(course?: Course, slug = ''): CourseDetail {
    const match = course || this.findMatchingSeedCourse(slug);

    let syllabuses: CourseSyllabus[] = [];
    if (match.courseId === 2) {
      syllabuses = [
        {
          syllabusId: 201,
          courseId: 2,
          semesterName: 'Giai Đoạn 1: Bản Chất Khoa Học',
          topicTitle: 'Hệ Thống Hóa Vật Lý - Hóa Học - Sinh Học Căn Bản',
          topicContent: 'Học qua sơ đồ tư duy trực quan, gắn liền các định luật tự nhiên với hiện tượng đời sống hàng ngày.',
          displayOrder: 1
        },
        {
          syllabusId: 202,
          courseId: 2,
          semesterName: 'Giai Đoạn 2: Tích Hợp Kỹ Năng',
          topicTitle: 'Phương Pháp Đọc Biểu Đồ & Giải Bài Toán Thực Tiễn',
          topicContent: 'Thao tác phân tích bảng số liệu thí nghiệm, giải quyết các câu hỏi liên môn chiếm 30% đề kiểm tra mới.',
          displayOrder: 2
        },
        {
          syllabusId: 203,
          courseId: 2,
          semesterName: 'Giai Đoạn 3: Bứt Phá Điểm 9-10',
          topicTitle: 'Luyện Đề Kiểm Tra Học Kỳ Chuẩn Barem Sở GD&ĐT',
          topicContent: 'Thực hành các đề thi trọng điểm, sửa bài chi tiết 1:1, hạn chế tối đa lỗi diễn đạt làm mất điểm.',
          displayOrder: 3
        }
      ];
    } else if (match.courseId === 3) {
      syllabuses = [
        {
          syllabusId: 301,
          courseId: 3,
          semesterName: 'Giai Đoạn 1: Quét Sạch Lỗ Hổng',
          topicTitle: '12 Dạng Toán Thực Tế Kinh Điển Trong Đề Thi Vào 10',
          topicContent: 'Chuyên đề lãi suất ngân hàng, hình học không gian thực tế, bài toán năng suất và chuyển động.',
          displayOrder: 1
        },
        {
          syllabusId: 302,
          courseId: 3,
          semesterName: 'Giai Đoạn 2: Chinh Phục Điểm 8-9',
          topicTitle: 'Tứ Giác Nội Tiếp & Bất Đẳng Thức Phân Hóa Cao',
          topicContent: 'Rèn phản xạ vẽ đường phụ hình học, nắm các mẹo đại số để giải quyết nhanh câu phân loại.',
          displayOrder: 2
        },
        {
          syllabusId: 303,
          courseId: 3,
          semesterName: 'Giai Đoạn 3: Vượt Vũ Môn',
          topicTitle: 'Thi Thử Mô Phỏng Phòng Thi Thật Chuẩn Sở GD&ĐT TP.HCM',
          topicContent: 'Tập dượt canh giờ thi nghiêm ngặt, rọc phách chấm chéo, bảo toàn trọn vẹn điểm số NV1.',
          displayOrder: 3
        }
      ];
    } else if (match.courseId === 4) {
      syllabuses = [
        {
          syllabusId: 401,
          courseId: 4,
          semesterName: 'Giai Đoạn 1: Nền Tảng Chuyên Sâu',
          topicTitle: 'Chuyên Đề Nâng Cao & Phân Hóa Lớp 10 - 11',
          topicContent: 'Củng cố các mảng kiến thức khó, kỹ năng bấm máy tính Casio và tư duy liên môn.',
          displayOrder: 1
        },
        {
          syllabusId: 402,
          courseId: 4,
          semesterName: 'Giai Đoạn 2: Tăng Tốc Lớp 12',
          topicTitle: 'Quét Kiến Thức Trọng Tâm Lớp 12 Bám Sát GDPT Mới',
          topicContent: 'Đi sâu vào dạng bài vận dụng cao và các bẫy trắc nghiệm hay gặp trong đề thi chuẩn Bộ GD&ĐT.',
          displayOrder: 2
        },
        {
          syllabusId: 403,
          courseId: 4,
          semesterName: 'Giai Đoạn 3: Thực Chiến & Về Đích',
          topicTitle: 'Luyện Đề Chuẩn Ma Trận Tốt Nghiệp THPT & ĐGNL',
          topicContent: 'Rèn bản lĩnh tâm lý phòng thi, chiến thuật canh thời gian trắc nghiệm tối ưu điểm số tổ hợp xét tuyển.',
          displayOrder: 3
        }
      ];
    } else {
      syllabuses = [
        {
          syllabusId: 101,
          courseId: 1,
          semesterName: 'Giai Đoạn 1: Củng Cố Căn Bản',
          topicTitle: 'Rà Soát Lỗ Hổng & Hệ Thống Hóa Lý Thuyết Trọng Tâm',
          topicContent: 'Kiểm tra năng lực 1:1, đánh giá chính xác lỗ hổng môn học từ các năm trước. Củng cố công thức và bài tập mẫu.',
          displayOrder: 1
        },
        {
          syllabusId: 102,
          courseId: 1,
          semesterName: 'Giai Đoạn 2: Tăng Tốc Kỹ Năng',
          topicTitle: 'Rèn Luyện Kỹ Năng Giải Toán Thực Tế & Vận Dụng',
          topicContent: 'Bám sát bộ sách mới (Chân trời sáng tạo, Cánh diều, Kết nối tri thức). Rèn kỹ năng giải toán thực tế.',
          displayOrder: 2
        },
        {
          syllabusId: 103,
          courseId: 1,
          semesterName: 'Giai Đoạn 3: Bứt Phá Điểm 9-10',
          topicTitle: 'Luyện Đề Chuẩn Cấu Trúc & Chiến Thuật Phân Bổ Thời Gian',
          topicContent: 'Thực hành bộ đề độc quyền sát ma trận Sở GD&ĐT TP.HCM, chấm chéo và rèn tâm lý thi cử vững vàng.',
          displayOrder: 3
        }
      ];
    }

    return {
      ...match,
      heroBanner: match.bannerUrl || match.thumbnailUrl || 'assets/images/lop-cap2.png',
      contentHtml: match.contentHtml || `
        <h2>1. Giới thiệu tổng quan: ${match.courseName}</h2>
        <p>${match.shortDescription}</p>
        <h2>2. Chuẩn đầu ra & Phương pháp đào tạo độc quyền</h2>
        <ul>
          <li><strong>Mô hình Lớp Tinh Hoa:</strong> Tối đa ${match.classSizeMax || 15} học sinh/lớp, 100% giáo viên ĐH Sư Phạm TP.HCM theo sát từng em.</li>
          <li><strong>Kèm 1:1 ngoài giờ:</strong> Phụ đạo miễn phí ngay khi học sinh gặp bài khó trên trường hoặc chưa hiểu bài.</li>
          <li><strong>Báo cáo học tập minh bạch:</strong> Phụ huynh nhận báo cáo chi tiết qua Zalo sau mỗi buổi học.</li>
          <li><strong>Cam kết hoàn học phí:</strong> Hoàn trả 100% học phí bằng hợp đồng nếu học sinh không tiến bộ.</li>
        </ul>
      `,
      syllabuses,
      syllabusList: syllabuses
    };
  }
}
