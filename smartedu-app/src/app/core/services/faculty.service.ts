import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, timeout } from 'rxjs/operators';
import { FacultyHeader, FacultyTeachersResponse, SubjectCount } from '../models/faculty.model';
import { Teacher } from '../models/teacher.model';

@Injectable({
  providedIn: 'root'
})
export class FacultyService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  private baseUrl = 'http://localhost:5000/api/faculty';
  private fallbackBaseUrl = 'http://localhost:5206/api/faculty';
  private teachersApiUrl = 'http://localhost:5000/api/teachers';
  private fallbackTeachersApiUrl = 'http://localhost:5206/api/teachers';

  // Dữ liệu hạt giống mặc định cho Header
  private defaultHeader: FacultyHeader = {
    subTitle: 'ĐỘI NGŨ SƯ PHẠM TINH HOA — TẬN TÂM ĐỒNG HÀNH',
    title: 'Ban Giảng Huấn SmartEdu',
    content: 'Quy tụ đội ngũ Thạc sĩ, Cử nhân Sư phạm xuất sắc từ Trường ĐH Sư Phạm TP.HCM, mang đến phương pháp giảng dạy hiện đại, kiên nhẫn bồi dưỡng tri thức và khơi nguồn đam mê học tập cho từng học sinh.',
    isActive: true
  };

  // Dữ liệu hạt giống chuẩn gồm đúng 4 Thầy/Cô có trong DB
  private defaultTeachers: Teacher[] = [
    {
      teacherId: 1,
      fullName: 'Thầy Nguyễn Văn Tuấn',
      slug: 'thay-nguyen-van-tuan',
      position: 'Trưởng bộ môn Toán & Luyện thi',
      subject: 'Bộ môn Toán học',
      category: 'toan',
      academicDegree: 'Thạc sĩ Toán học',
      graduatedUniversity: 'Đại học Sư phạm TP.HCM',
      experienceYears: 15,
      teachingPhilosophy: 'Toán học không phải là học thuộc công thức, mà là chìa khóa mở rộng tư duy giải quyết vấn đề trong cuộc sống.',
      bioTimelineJson: '[{"year":"2009-2013","event":"Tốt nghiệp Thủ khoa Sư phạm Toán - ĐH Sư phạm TP.HCM"},{"year":"2013-2016","event":"Thạc sĩ Phương pháp Giảng dạy Toán học"},{"year":"2016-nay","event":"Đồng hành đào tạo hơn 2,500 học sinh đỗ trường THPT Top đầu TP.HCM"}]',
      avatarUrl: 'assets/images/teachers/teacher-1.jpg',
      displayOrder: 1,
      isFeatured: true,
      isActive: true
    },
    {
      teacherId: 2,
      fullName: 'Cô Trần Thị Mai Chi',
      slug: 'co-tran-thi-mai-chi',
      position: 'Chuyên gia Khoa học Tự nhiên',
      subject: 'Khoa học Tự nhiên (Lý - Hóa)',
      category: 'khtn',
      academicDegree: 'Thạc sĩ Hóa học',
      graduatedUniversity: 'Đại học Sư phạm TP.HCM',
      experienceYears: 12,
      teachingPhilosophy: 'Mỗi thí nghiệm là một câu chuyện kỳ diệu. Học KHTN là chạm vào bản chất của thế giới xung quanh.',
      bioTimelineJson: '[{"year":"2012-2016","event":"Cử nhân Sư phạm Hóa học xuất sắc - ĐH Sư phạm TP.HCM"},{"year":"2016-2019","event":"Thạc sĩ Hóa học lý thuyết & ứng dụng"},{"year":"2019-nay","event":"Chủ nhiệm bồi dưỡng học sinh giỏi KHTN Quận 6"}]',
      avatarUrl: 'assets/images/teachers/teacher-2.jpg',
      displayOrder: 2,
      isFeatured: true,
      isActive: true
    },
    {
      teacherId: 3,
      fullName: 'Thầy Lê Hoàng Nam',
      slug: 'thay-le-hoang-nam',
      position: 'Giảng viên Chuyên sâu Vật Lý',
      subject: 'Khoa học Tự nhiên (Lý - Hóa)',
      category: 'khtn',
      academicDegree: 'Cử nhân Vật Lý Xuất Sắc',
      graduatedUniversity: 'Đại học Khoa học Tự nhiên TP.HCM',
      experienceYears: 10,
      teachingPhilosophy: 'Biến định luật khô khan thành hiện tượng trực quan sinh động, giúp học sinh yêu thích và ghi nhớ bền vững.',
      bioTimelineJson: '[{"year":"2014-2018","event":"Tốt nghiệp ĐH Khoa học Tự nhiên TP.HCM"},{"year":"2018-nay","event":"Tác giả bộ chuyên đề Lấy lại gốc và Đột phá điểm 9+ môn Vật Lý THPT"}]',
      avatarUrl: 'assets/images/teachers/teacher-3.jpg',
      displayOrder: 3,
      isFeatured: true,
      isActive: true
    },
    {
      teacherId: 4,
      fullName: 'Cô Phạm Thu Hà',
      slug: 'co-pham-thu-ha',
      position: 'Trưởng bộ môn Tiếng Anh Học thuật',
      subject: 'Bộ môn Tiếng Anh',
      category: 'anh',
      academicDegree: 'Cử nhân Sư phạm Tiếng Anh',
      graduatedUniversity: 'Đại học Sài Gòn',
      experienceYears: 8,
      teachingPhilosophy: 'Ngôn ngữ là phản xạ tự nhiên khi trẻ được đặt trong môi trường tương tác ấm áp, không sợ sai.',
      bioTimelineJson: '[{"year":"2016-2020","event":"Tốt nghiệp Sư phạm Tiếng Anh - ĐH Sài Gòn (IELTS 8.0)"},{"year":"2020-nay","event":"Chuyên gia luyện thi Chứng chỉ Cambridge & Tiếng Anh vào Lớp 10"}]',
      avatarUrl: 'assets/images/teachers/teacher-4.jpg',
      displayOrder: 4,
      isFeatured: true,
      isActive: true
    }
  ];

  getFacultyList(): Observable<FacultyTeachersResponse> {
    return this.getTeachers();
  }

  /**
   * GET /api/faculty/header
   */
  getHeader(): Observable<FacultyHeader> {
    if (!isPlatformBrowser(this.platformId)) {
      return of(this.defaultHeader);
    }

    return this.http.get<FacultyHeader>(`${this.baseUrl}/header`).pipe(
      timeout(3000),
      catchError(() => {
        return this.http.get<FacultyHeader>(`${this.fallbackBaseUrl}/header`).pipe(
          timeout(2000),
          catchError(() => of(this.defaultHeader))
        );
      }),
      map(res => res || this.defaultHeader)
    );
  }

  /**
   * GET /api/faculty/teachers
   * Thử gọi port 5000 -> port 5206 -> teachersApiUrl -> seed data
   */
  getTeachers(): Observable<FacultyTeachersResponse> {
    const defaultResponse: FacultyTeachersResponse = this.buildDefaultTeachersResponse();

    if (!isPlatformBrowser(this.platformId)) {
      return of(defaultResponse);
    }

    return this.http.get<FacultyTeachersResponse>(`${this.baseUrl}/teachers`).pipe(
      timeout(3000),
      catchError(() => {
        return this.http.get<FacultyTeachersResponse>(`${this.fallbackBaseUrl}/teachers`).pipe(
          timeout(2000),
          catchError(() => {
            return this.http.get<Teacher[]>(this.teachersApiUrl).pipe(
              timeout(2000),
              catchError(() => {
                return this.http.get<Teacher[]>(this.fallbackTeachersApiUrl).pipe(
                  timeout(2000),
                  catchError(() => of(this.defaultTeachers))
                );
              }),
              map(teachers => {
                const list = teachers && teachers.length > 0 ? teachers : this.defaultTeachers;
                return {
                  totalTeachers: list.length,
                  subjects: this.extractSubjects(list),
                  teachers: list
                };
              })
            );
          })
        );
      }),
      map(res => {
        if (!res || !res.teachers || res.teachers.length === 0) {
          return defaultResponse;
        }

        const enrichedTeachers = res.teachers.map(t => this.enrichTeacher(t));
        return {
          totalTeachers: res.totalTeachers || enrichedTeachers.length,
          subjects: res.subjects && res.subjects.length > 0 ? res.subjects : this.extractSubjects(enrichedTeachers),
          teachers: enrichedTeachers
        };
      })
    );
  }

  private buildDefaultTeachersResponse(): FacultyTeachersResponse {
    const enriched = this.defaultTeachers.map(t => this.enrichTeacher(t));
    return {
      totalTeachers: enriched.length,
      subjects: this.extractSubjects(enriched),
      teachers: enriched
    };
  }

  private extractSubjects(teachers: Teacher[]): SubjectCount[] {
    const map = new Map<string, number>();
    for (const t of teachers) {
      if (t.subject) {
        const s = t.subject.trim();
        map.set(s, (map.get(s) || 0) + 1);
      }
    }
    return Array.from(map.entries())
      .map(([subject, count]) => ({ subject, count }))
      .sort((a, b) => b.count - a.count);
  }

  private enrichTeacher(t: Teacher): Teacher {
    let cat = t.category;
    if (!cat && t.subject) {
      const s = t.subject.toLowerCase();
      if (s.includes('toán')) cat = 'toan';
      else if (s.includes('văn')) cat = 'van';
      else if (s.includes('anh')) cat = 'anh';
      else if (s.includes('khtn') || s.includes('lý') || s.includes('hóa') || s.includes('khoa học')) cat = 'khtn';
      else cat = 'khac';
    }

    return {
      ...t,
      category: cat || 'khac',
      avatarUrl: t.avatarUrl || `assets/images/teachers/teacher-${(t.teacherId % 4) + 1}.jpg`
    };
  }
}
