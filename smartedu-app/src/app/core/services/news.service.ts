import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { PageHeader } from '../models/page-header.model';
import { NewsCategoriesWithArticlesResponse, NewsCategory, NewsArticle, ArticleDetail, RelatedArticle } from '../models/article.model';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  private baseUrl = 'http://localhost:5000/api/news';
  private fallbackUrl = 'http://localhost:5206/api/news';

  private defaultHeader: PageHeader = {
    subTitle: 'TRI THỨC & PHƯƠNG PHÁP',
    title: 'Cẩm Nang Học Tập & Tin Tức Giáo Dục',
    content: 'Tổng hợp chiến lược làm bài thi, phân tích đề thi Tuyển sinh 10, bí quyết đồng hành cùng con và các thông báo hoạt động từ SmartEdu Academy.',
    isActive: true
  };

  private defaultSeedCategories: NewsCategory[] = [
    { categoryId: 0, title: 'Tất cả tin tức', userkey: 'all', displayOrder: 0 },
    { categoryId: 1, title: 'Luyện thi vào 10', userkey: 'tuyen-sinh-10', displayOrder: 1 },
    { categoryId: 2, title: 'Phương pháp học tập', userkey: 'phuong-phap', displayOrder: 2 },
    { categoryId: 3, title: 'Góc phụ huynh', userkey: 'phu-huynh', displayOrder: 3 },
    { categoryId: 4, title: 'Sự kiện SmartEdu', userkey: 'su-kien', displayOrder: 4 }
  ];

  private defaultSeedArticles: NewsArticle[] = [
    {
      articleId: 1,
      title: 'Chiến Lược Ôn Thi Vào Lớp 10 Môn Toán TP.HCM: Bí Quyết Giải Quyết 12 Dạng Toán Thực Tế',
      brief: 'Phân tích ma trận đề thi tuyển sinh 10 những năm gần đây và giải pháp lấy trọn 3 điểm phần bài toán thực tế cùng Thầy Nguyễn Văn Tuấn.',
      picture: 'assets/images/cam-nang-1.jpg',
      published: '28/10/2026',
      userkey: 'chien-luoc-on-thi-vao-lop-10-mon-toan-tphcm',
      categoryId: 1,
      categoryName: 'Luyện thi vào 10',
      author: 'Ban Chuyên Môn Toán'
    },
    {
      articleId: 2,
      title: 'Làm Sao Để Con Tự Giác Học Tập Mà Không Cần Cha Mẹ Thúc Ép Mỗi Ngày?',
      brief: 'Góc nhìn tâm lý học đường: 3 bước kích hoạt động lực nội tại thay vì đòn roi hay phần thưởng vật chất ngắn hạn từ ThS. Trần Thị Mai Chi.',
      picture: 'assets/images/cam-nang-2.jpg',
      published: '25/10/2026',
      userkey: 'lam-sao-de-con-tu-giac-hoc-tap',
      categoryId: 3,
      categoryName: 'Góc phụ huynh',
      author: 'ThS. Trần Thị Mai Chi'
    },
    {
      articleId: 3,
      title: 'Kỳ Thi Đánh Giá Năng Lực ĐHQG TP.HCM: Những Điều Học Sinh Lớp 12 Cần Chuẩn Bị Sớm',
      brief: 'Lộ trình rèn luyện kỹ năng tư duy logic, xử lý số liệu khoa học và cấu trúc 120 câu hỏi đa lĩnh vực bứt phá điểm xét tuyển Đại học.',
      picture: 'assets/images/cam-nang-3.jpg',
      published: '20/10/2026',
      userkey: 'ky-thi-danh-gia-nang-luc-dhqg-tphcm',
      categoryId: 2,
      categoryName: 'Phương pháp học tập',
      author: 'Tổ Trưởng Học Thuật'
    },
    {
      articleId: 4,
      title: 'Lễ Khai Giảng Khóa Bồi Dưỡng Chất Lượng Cao Năm Học Mới Tại 2 Cơ Sở Bình Phú Quận 6',
      brief: 'Không khí hân hoan của hơn 500 học sinh và phụ huynh trong ngày hội nhập học, nhận học bổng tài năng SmartEdu Academy.',
      picture: 'assets/images/gallery-1.jpg',
      published: '15/10/2026',
      userkey: 'le-khai-giang-khoa-boi-duong-nam-hoc-moi',
      categoryId: 4,
      categoryName: 'Sự kiện SmartEdu',
      author: 'Ban Truyền Thông'
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

  getCategoriesWithArticles(): Observable<NewsCategoriesWithArticlesResponse> {
    if (!isPlatformBrowser(this.platformId)) {
      return of({
        categories: this.defaultSeedCategories,
        articles: this.defaultSeedArticles
      });
    }
    return this.http.get<NewsCategoriesWithArticlesResponse>(`${this.baseUrl}/categories-with-articles`).pipe(
      timeout(3000),
      catchError(() => {
        return this.http.get<NewsCategoriesWithArticlesResponse>(`${this.fallbackUrl}/categories-with-articles`).pipe(
          timeout(2000),
          catchError(() => of({
            categories: this.defaultSeedCategories,
            articles: this.defaultSeedArticles
          }))
        );
      })
    );
  }

  getArticleDetail(slug: string): Observable<ArticleDetail> {
    return this.http.get<ArticleDetail>(`${this.baseUrl}/detail/${encodeURIComponent(slug)}`).pipe(
      timeout(4000),
      catchError((err: HttpErrorResponse) => {
        if (err.status === 404) {
          return throwError(() => err);
        }
        return this.http.get<ArticleDetail>(`${this.fallbackUrl}/detail/${encodeURIComponent(slug)}`).pipe(
          timeout(3000),
          catchError((err2: HttpErrorResponse) => {
            if (err2.status === 404) {
              return throwError(() => err2);
            }
            return this.http.get<ArticleDetail>(`/api/news/detail/${encodeURIComponent(slug)}`);
          })
        );
      })
    );
  }

  getRelatedArticles(categoryId: number, currentArticleId: number): Observable<RelatedArticle[]> {
    return this.http.get<RelatedArticle[]>(`${this.baseUrl}/related/${categoryId}/${currentArticleId}`).pipe(
      timeout(4000),
      catchError(() => {
        return this.http.get<RelatedArticle[]>(`${this.fallbackUrl}/related/${categoryId}/${currentArticleId}`).pipe(
          timeout(3000),
          catchError(() => {
            return this.http.get<RelatedArticle[]>(`/api/news/related/${categoryId}/${currentArticleId}`).pipe(
              catchError(() => of([]))
            );
          })
        );
      })
    );
  }
}
