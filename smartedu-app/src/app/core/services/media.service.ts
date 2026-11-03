import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, timeout } from 'rxjs/operators';
import { PageHeader } from '../models/page-header.model';
import { Album, MediaItem, MediaResponse } from '../models/media.model';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  private baseUrl = 'http://localhost:5000/api/media';
  private fallbackUrl = 'http://localhost:5206/api/media';

  private defaultHeader: PageHeader = {
    subTitle: 'HÌNH ẢNH THỰC TẾ',
    title: 'Thư Viện Không Gian & Hoạt Động Giảng Huấn',
    content: 'Khám phá không gian học tập hiện đại, phòng học máy lạnh tiêu chuẩn cùng những khoảnh khắc học tập nhiệt huyết của thầy trò SmartEdu Academy.',
    isActive: true
  };

  private defaultSeedAlbums: Album[] = [
    {
      id: 0,
      albumId: 0,
      albumName: 'Tất cả Media',
      name: 'Tất cả Media',
      slug: 'all',
      coverImage: '',
      description: 'Tất cả hình ảnh & hoạt động',
      displayOrder: 0,
      isActive: true
    },
    {
      id: 1,
      albumId: 1,
      albumName: 'Không Gian Học Tập & Cơ Sở Vật Chất',
      name: 'Cơ sở vật chất',
      slug: 'co-so-vat-chat',
      coverImage: 'assets/images/gallery-1.jpg',
      description: 'Phòng học máy lạnh tiêu chuẩn hiện đại, bàn ghế công thái học tại 2 cơ sở Bình Phú Quận 6.',
      displayOrder: 1,
      isActive: true
    },
    {
      id: 2,
      albumId: 2,
      albumName: 'Hoạt Động Giảng Dạy & Lớp Học Thực Tế',
      name: 'Hoạt động giảng dạy',
      slug: 'hoat-dong-giang-day',
      coverImage: 'assets/images/gallery-2.jpg',
      description: 'Hình ảnh các buổi học tương tác cao, giờ kèm 1:1 miễn phí cùng giáo viên ĐH Sư Phạm.',
      displayOrder: 2,
      isActive: true
    },
    {
      id: 3,
      albumId: 3,
      albumName: 'Vinh Danh Bảng Vàng & Sự Kiện Trao Thưởng',
      name: 'Vinh danh bảng vàng',
      slug: 'vinh-danh-bang-vang',
      coverImage: 'assets/images/gallery-3.jpg',
      description: 'Lễ vinh danh các thủ khoa, á khoa và học sinh đỗ trường THPT chuyên, công lập hàng đầu.',
      displayOrder: 3,
      isActive: true
    }
  ];

  private defaultSeedMedias: MediaItem[] = [
    {
      id: 1,
      albumId: 1,
      albumName: 'Cơ sở vật chất',
      albumSlug: 'co-so-vat-chat',
      name: 'Phòng học tiêu chuẩn 15 học sinh - Cơ sở Đường Số 6',
      mediaTitle: 'Phòng học tiêu chuẩn 15 học sinh - Cơ sở Đường Số 6',
      mediaType: 'image',
      mediaUrl: 'assets/images/gallery-1.jpg',
      url: 'assets/images/gallery-1.jpg',
      thumbnailUrl: 'assets/images/gallery-1.jpg',
      caption: 'Ánh sáng đạt chuẩn chống cận thị, máy chiếu tương tác hiện đại',
      category: 'co-so-vat-chat'
    },
    {
      id: 2,
      albumId: 1,
      albumName: 'Cơ sở vật chất',
      albumSlug: 'co-so-vat-chat',
      name: 'Khu vực tự học & Thư viện mở SmartEdu',
      mediaTitle: 'Khu vực tự học & Thư viện mở SmartEdu',
      mediaType: 'image',
      mediaUrl: 'assets/images/gallery-2.jpg',
      url: 'assets/images/gallery-2.jpg',
      thumbnailUrl: 'assets/images/gallery-2.jpg',
      caption: 'Không gian yên tĩnh có trà bánh và giáo viên trực hỗ trợ bài tập',
      category: 'co-so-vat-chat'
    },
    {
      id: 3,
      albumId: 2,
      albumName: 'Hoạt động giảng dạy',
      albumSlug: 'hoat-dong-giang-day',
      name: 'Giờ học Toán thực tế cùng Thầy Nguyễn Văn Tuấn',
      mediaTitle: 'Giờ học Toán thực tế cùng Thầy Nguyễn Văn Tuấn',
      mediaType: 'image',
      mediaUrl: 'assets/images/gallery-3.jpg',
      url: 'assets/images/gallery-3.jpg',
      thumbnailUrl: 'assets/images/gallery-3.jpg',
      caption: 'Học sinh hào hứng thảo luận và tìm hướng giải bài toán hình học',
      category: 'hoat-dong-giang-day'
    },
    {
      id: 4,
      albumId: 2,
      albumName: 'Hoạt động giảng dạy',
      albumSlug: 'hoat-dong-giang-day',
      name: 'Tiết học KHTN thực nghiệm tương tác',
      mediaTitle: 'Tiết học KHTN thực nghiệm tương tác',
      mediaType: 'image',
      mediaUrl: 'assets/images/gallery-4.jpg',
      url: 'assets/images/gallery-4.jpg',
      thumbnailUrl: 'assets/images/gallery-4.jpg',
      caption: 'Trực quan hóa các định luật vật lý và phản ứng hóa học',
      category: 'hoat-dong-giang-day'
    },
    {
      id: 5,
      albumId: 3,
      albumName: 'Vinh danh bảng vàng',
      albumSlug: 'vinh-danh-bang-vang',
      name: 'Trao thưởng học sinh đạt điểm 10 Tuyển sinh 10',
      mediaTitle: 'Trao thưởng học sinh đạt điểm 10 Tuyển sinh 10',
      mediaType: 'image',
      mediaUrl: 'assets/images/gallery-5.jpg',
      url: 'assets/images/gallery-5.jpg',
      thumbnailUrl: 'assets/images/gallery-5.jpg',
      caption: 'Niềm vui của thầy trò trong ngày công bố kết quả tuyển sinh',
      category: 'vinh-danh-bang-vang'
    },
    {
      id: 6,
      albumId: 2,
      albumName: 'Hoạt động giảng dạy',
      albumSlug: 'hoat-dong-giang-day',
      name: 'Phút giây tập trung làm bài thi thử ĐGNL',
      mediaTitle: 'Phút giây tập trung làm bài thi thử ĐGNL',
      mediaType: 'image',
      mediaUrl: 'assets/images/gallery-6.jpg',
      url: 'assets/images/gallery-6.jpg',
      thumbnailUrl: 'assets/images/gallery-6.jpg',
      caption: 'Rèn luyện bản lĩnh phòng thi và phân bổ thời gian tối ưu',
      category: 'hoat-dong-giang-day'
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

  getAlbumsWithItems(): Observable<MediaResponse> {
    if (!isPlatformBrowser(this.platformId)) {
      return of({
        albums: this.defaultSeedAlbums,
        items: this.defaultSeedMedias
      });
    }
    return this.http.get<MediaResponse>(`${this.baseUrl}/albums-with-items`).pipe(
      timeout(3000),
      catchError(() => {
        return this.http.get<MediaResponse>(`${this.fallbackUrl}/albums-with-items`).pipe(
          timeout(2000),
          catchError(() => of({
            albums: this.defaultSeedAlbums,
            items: this.defaultSeedMedias
          }))
        );
      })
    );
  }

  getAlbums(): Observable<Album[]> {
    return this.getAlbumsWithItems().pipe(
      map(res => res.albums)
    );
  }

  getMedias(): Observable<MediaItem[]> {
    return this.getAlbumsWithItems().pipe(
      map(res => res.items)
    );
  }
}
