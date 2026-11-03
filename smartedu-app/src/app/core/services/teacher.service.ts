import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, timeout } from 'rxjs/operators';
import { Teacher } from '../models/teacher.model';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  private apiUrl = 'http://localhost:5000/api/teachers';

  // Dữ liệu chuẩn từ bảng Teachers trong file smartedudb.sql (4 Thầy/Cô cốt cán)
  private mockTeachers: Teacher[] = [
    {
      teacherId: 1,
      fullName: 'Thầy Nguyễn Văn Tuấn',
      slug: 'thay-nguyen-van-tuan',
      position: 'Trưởng bộ môn Toán & Luyện thi',
      subject: 'Toán học',
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
      subject: 'Khoa học Tự nhiên',
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
      subject: 'Vật Lý',
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
      subject: 'Tiếng Anh',
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

  getTeachers(featuredOnly: boolean = false): Observable<Teacher[]> {
    let list = this.mockTeachers;
    if (featuredOnly) {
      list = list.filter(t => t.isFeatured);
    }
    const defaultEnriched = list.map(t => this.enrichTeacher(t));

    if (!isPlatformBrowser(this.platformId)) {
      return of(defaultEnriched);
    }

    const url = featuredOnly ? `${this.apiUrl}?featured=true` : this.apiUrl;
    return this.http.get<Teacher[]>(url).pipe(
      timeout(3000),
      catchError(() => {
        const fallbackUrl = featuredOnly ? `http://localhost:5206/api/teachers?featured=true` : 'http://localhost:5206/api/teachers';
        return this.http.get<Teacher[]>(fallbackUrl).pipe(
          timeout(2000),
          catchError(() => of(this.mockTeachers))
        );
      }),
      map(teachers => {
        let resList = teachers && teachers.length > 0 ? teachers : this.mockTeachers;
        if (featuredOnly) {
          resList = resList.filter(t => t.isFeatured);
        }
        return resList.map(t => this.enrichTeacher(t));
      })
    );
  }

  getTeacherById(id: number): Observable<Teacher | undefined> {
    const found = this.mockTeachers.find(t => t.teacherId === id);
    const defaultTeacher = found ? this.enrichTeacher(found) : undefined;

    if (!isPlatformBrowser(this.platformId)) {
      return of(defaultTeacher);
    }

    return this.http.get<Teacher>(`${this.apiUrl}/${id}`).pipe(
      timeout(3000),
      catchError(() => {
        return this.http.get<Teacher>(`/api/teachers/${id}`).pipe(
          timeout(2000),
          catchError(() => of(this.mockTeachers.find(t => t.teacherId === id)))
        );
      }),
      map(teacher => teacher ? this.enrichTeacher(teacher) : defaultTeacher)
    );
  }

  private enrichTeacher(t: Teacher): Teacher {
    // Chuẩn hóa đường dẫn avatar nếu chưa có
    let avatar = t.avatarUrl;
    if (!avatar || avatar.startsWith('/assets/')) {
      avatar = avatar ? avatar.replace(/^\//, '') : `assets/images/teachers/teacher-${t.teacherId}.jpg`;
    }

    // Gán category nếu chưa có để phục vụ bộ lọc tab
    let category = t.category;
    if (!category && t.subject) {
      const sub = t.subject.toLowerCase();
      if (sub.includes('toán')) category = 'toan';
      else if (sub.includes('văn')) category = 'van';
      else if (sub.includes('anh')) category = 'anh';
      else if (sub.includes('tự nhiên') || sub.includes('lý') || sub.includes('hóa') || sub.includes('sinh')) category = 'khtn';
      else category = 'toan';
    }

    // Parse BioTimelineJson
    let timelineEvents = t.timelineEvents;
    if (!timelineEvents && t.bioTimelineJson) {
      try {
        timelineEvents = JSON.parse(t.bioTimelineJson);
      } catch {
        timelineEvents = [];
      }
    }

    return {
      ...t,
      avatarUrl: avatar,
      category: category || 'toan',
      timelineEvents
    };
  }
}
