import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { SliderItem } from '../models/slider.model';

@Injectable({
  providedIn: 'root'
})
export class SliderService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  private apiUrl = '/api/sliders';

  private mockSliders: SliderItem[] = [
    {
      id: 1,
      name: 'Banner 1 - Giáo dục cho sự trọn vẹn',
      urlImage: 'assets/images/banner-3.jpg',
      badge: 'Bồi Dưỡng Văn Hóa & Luyện Thi Chuẩn Mực',
      title: 'Giáo Dục Cho Sự Trọn Vẹn<br><span class="hero-highlight">Trưởng Thành Hơn Mỗi Ngày</span>',
      subTitle: 'Đồng hành cùng học sinh từ Lớp 6 đến 12 bằng phương pháp sư phạm gợi mở, bám sát cấu trúc đề thi, kiến tạo tư duy và nhân cách.',
      ctaText: 'Nhận Lộ Trình Luyện Thi Lớp 10',
      secondaryCtaText: 'Khám Phá Ngay',
      secondaryCtaLink: '/bai-viet-chi-tiet',
      index: 1,
      isPublic: true
    },
    {
      id: 2,
      name: 'Banner 2 - Bứt phá kỳ thi tuyển sinh 10',
      urlImage: 'assets/images/banner-4.jpg',
      badge: 'Chương Trình Luyện Thi Trọng Điểm 2025',
      title: 'Bứt Phá Kỳ Thi Tuyển Sinh 10<br><span class="hero-highlight">Chinh Phục Trường Chuyên Top Đầu</span>',
      subTitle: '100% Giảng viên Đại học Sư phạm TP.HCM trực tiếp giảng dạy. Luyện đề sát cấu trúc chuẩn Sở, rèn tâm lý phòng thi vững vàng.',
      ctaText: 'Nhận Lộ Trình Luyện Thi Lớp 10',
      secondaryCtaText: 'Khám Phá Ngay',
      secondaryCtaLink: '/bai-viet-chi-tiet',
      index: 2,
      isPublic: true
    },
    {
      id: 3,
      name: 'Banner 3 - Không gian học tập chuẩn mực',
      urlImage: 'assets/images/banner-5.jpg',
      badge: '2 Cơ Sở Hiện Đại Tại Phường Bình Phú, Quận 6',
      title: 'Không Gian Học Tập Chuẩn Mực<br><span class="hero-highlight">Hiện Đại & Khang Trang</span>',
      subTitle: 'Phòng học máy lạnh 100%, trang bị màn hình tương tác thông minh, sĩ số giới hạn 10-15 học sinh/lớp để giáo viên quan tâm sát sao từng em.',
      ctaText: 'Nhận Lộ Trình Luyện Thi Lớp 10',
      secondaryCtaText: 'Khám Phá Ngay',
      secondaryCtaLink: '/bai-viet-chi-tiet',
      index: 3,
      isPublic: true
    }
  ];

  getSliders(): Observable<SliderItem[]> {
    if (!isPlatformBrowser(this.platformId)) {
      return of(this.mockSliders);
    }
    return this.http.get<SliderItem[]>(this.apiUrl).pipe(
      timeout(3000),
      catchError(() => of(this.mockSliders))
    );
  }
}
