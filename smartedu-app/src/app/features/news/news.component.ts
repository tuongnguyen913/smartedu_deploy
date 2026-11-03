import { Component, inject, OnInit, signal, ChangeDetectorRef, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NewsService } from '../../core/services/news.service';
import { PageHeader } from '../../core/models/page-header.model';
import { NewsCategory, NewsArticle } from '../../core/models/article.model';
import { LeadFormComponent } from '../../shared/components/lead-form/lead-form.component';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, RouterLink, LeadFormComponent],
  styles: [`
    .section-news {
      padding: 50px 0 90px;
      background: #FFFFFF;
    }
    .course-filter-bar {
      display: flex;
      gap: 12px;
      justify-content: center;
      flex-wrap: wrap;
      margin-bottom: 45px;
    }
    .course-tab-btn {
      background: #F8FAFC;
      color: #475569;
      border: 1px solid #E2E8F0;
      border-radius: 50px;
      padding: 10px 24px;
      font-size: 0.875rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .course-tab-btn:hover {
      background: #FFF1F2;
      color: #D81824;
      border-color: #FECDD3;
      transform: translateY(-2px);
    }
    .course-tab-btn.active {
      background: #D81824 !important;
      color: #FFFFFF !important;
      border-color: #D81824 !important;
      box-shadow: 0 4px 14px rgba(216, 24, 36, 0.25);
    }
    .news-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 30px;
    }
    .news-card {
      border: 1px solid #E2E8F0;
      border-radius: 16px;
      overflow: hidden;
      background: #FFFFFF;
      box-shadow: 0 4px 16px rgba(15, 23, 42, 0.05);
      display: flex;
      flex-direction: column;
      transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
    }
    .news-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 12px 30px rgba(15, 23, 42, 0.12);
      border-color: #FECDD3;
    }
    .news-thumb {
      position: relative;
      height: 220px;
      overflow: hidden;
      background: #0F172A;
    }
    .news-thumb img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s ease;
    }
    .news-card:hover .news-thumb img {
      transform: scale(1.05);
    }
    .news-badge {
      position: absolute;
      top: 14px;
      left: 14px;
      background: #D81824;
      color: #FFFFFF;
      font-size: 0.75rem;
      font-weight: 700;
      padding: 4px 12px;
      border-radius: 4px;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }
    .news-content {
      padding: 24px;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }
    .news-meta {
      display: flex;
      gap: 16px;
      font-size: 0.8125rem;
      color: #64748B;
      margin-bottom: 12px;
    }
    .news-meta i {
      color: #D81824;
      margin-right: 4px;
    }
    .news-title {
      font-size: 1.15rem;
      font-weight: 800;
      line-height: 1.45;
      margin: 0 0 12px;
    }
    .news-title a {
      color: #0F172A;
      text-decoration: none;
      transition: color 0.2s ease;
    }
    .news-title a:hover {
      color: #D81824;
    }
    .news-brief {
      font-size: 0.875rem;
      color: #475569;
      line-height: 1.6;
      margin-bottom: 20px;
      flex-grow: 1;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .news-link {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-weight: 700;
      font-size: 0.875rem;
      color: #D81824;
      text-decoration: none;
      transition: gap 0.2s ease;
    }
    .news-link:hover {
      gap: 12px;
    }
  `],
  template: `
    <main>
      <!-- TẦNG 1: SUBPAGE HERO BANNER (Query từ tbl_HomepageSection: SectionCode = 'NEWS_HEADER') -->
      @if (header().isActive) {
        <section class="subpage-hero">
          <div class="container">
            <nav class="breadcrumb-wrapper" aria-label="breadcrumb">
              <ol class="breadcrumb-list">
                <li class="breadcrumb-item">
                  <a routerLink="/"><i class="fa-solid fa-house"></i> Trang chủ</a>
                </li>
                <li class="breadcrumb-separator">
                  <i class="fa-solid fa-chevron-right"></i>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  Tin tức &amp; Cẩm nang
                </li>
              </ol>
            </nav>
            <div class="section-badge">
              <i class="fa-solid fa-newspaper"></i> {{ header().subTitle }}
            </div>
            <h1 class="subpage-hero-title">
              {{ header().title }}
            </h1>
            <p class="subpage-hero-desc">
              {{ header().content }}
            </p>
          </div>
        </section>
      }

      <!-- TẦNG 2 & 3: CATEGORY TABS & ARTICLES GRID -->
      <section class="section-news">
        <div class="container">
          <!-- Tầng 2: Category Filter Tabs -->
          <div class="course-filter-bar">
            @for (cat of categories(); track cat.categoryId) {
              <button
                type="button"
                class="course-tab-btn"
                [class.active]="selectedCategory() === cat.userkey"
                (click)="setCategory(cat.userkey)"
              >
                {{ cat.title }}
              </button>
            }
          </div>

          <!-- Tầng 3: Articles Grid -->
          <div class="news-grid">
            @for (article of filteredArticles(); track article.articleId) {
              <article class="news-card">
                <div class="news-thumb">
                  <a [routerLink]="['/tin-tuc', article.userkey || article.articleId]">
                    <img [src]="article.picture || 'assets/images/cam-nang-1.jpg'" [alt]="article.title">
                  </a>
                  <span class="news-badge">
                    {{ article.categoryName }}
                  </span>
                </div>

                <div class="news-content">
                  <div class="news-meta">
                    <span><i class="fa-solid fa-calendar-days"></i> {{ formatDate(article.published) }}</span>
                    <span><i class="fa-solid fa-user-pen"></i> {{ article.author || 'Ban Biên Tập' }}</span>
                  </div>

                  <h3 class="news-title">
                    <a [routerLink]="['/tin-tuc', article.userkey || article.articleId]">
                      {{ article.title }}
                    </a>
                  </h3>

                  <p class="news-brief">
                    {{ article.brief }}
                  </p>

                  <a [routerLink]="['/tin-tuc', article.userkey || article.articleId]" class="news-link">
                    Đọc tiếp <i class="fa-solid fa-arrow-right"></i>
                  </a>
                </div>
              </article>
            }
          </div>

          @if (filteredArticles().length === 0) {
            <div style="text-align: center; padding: 60px 20px; color: #64748B;">
              <i class="fa-solid fa-folder-open" style="font-size: 3rem; color: #CBD5E1; margin-bottom: 12px; display: block;"></i>
              <p>Chưa có bài viết nào thuộc chuyên mục này.</p>
              <button type="button" class="course-tab-btn active" style="margin-top: 10px;" (click)="setCategory('all')">
                Xem tất cả bài viết
              </button>
            </div>
          }
        </div>
      </section>

      <!-- REGISTRATION SECTION -->
      <section class="section-registration" style="background:#0F172A; padding:80px 0; color:#FFFFFF;">
        <div class="container">
          <div style="max-width: 700px; margin: 0 auto; background: #1E293B; border: 1px solid #334155; border-radius: 20px; padding: 40px 32px; box-shadow: 0 20px 40px rgba(0,0,0,0.3);">
            <div style="text-align: center; margin-bottom: 24px;">
              <span class="section-badge" style="background:rgba(216,24,36,0.2); color:#FCA5A5; border-color:#D81824;"><i class="fa-solid fa-gift"></i> Đồng hành cùng con</span>
              <h3 style="font-size: 1.5rem; font-weight: 800; color: #FFFFFF; margin-top: 8px;">Nhận Lộ Trình Luyện Thi &amp; Kiểm Tra Đầu Vào 0đ</h3>
              <p style="font-size: 0.875rem; color: #94A3B8; margin-top: 4px;">Để lại thông tin để nhận tài liệu ôn tập và lịch tư vấn 1:1 từ Thầy Cô SmartEdu.</p>
            </div>
            <app-lead-form></app-lead-form>
          </div>
        </div>
      </section>
    </main>
  `
})
export class NewsComponent implements OnInit {
  private newsService = inject(NewsService);
  private cdr = inject(ChangeDetectorRef);

  header = signal<PageHeader>({
    subTitle: 'TRI THỨC & PHƯƠNG PHÁP',
    title: 'Cẩm Nang Học Tập & Tin Tức Giáo Dục',
    content: 'Tổng hợp chiến lược làm bài thi, phân tích đề thi Tuyển sinh 10, bí quyết đồng hành cùng con và các thông báo hoạt động từ SmartEdu Academy.',
    isActive: true
  });

  categories = signal<NewsCategory[]>([]);
  articles = signal<NewsArticle[]>([]);
  selectedCategory = signal<string>('all');

  filteredArticles = computed(() => {
    const key = this.selectedCategory();
    const all = this.articles();
    if (!key || key === 'all') {
      return all;
    }

    // Lọc theo userkey hoặc categoryId
    const foundCat = this.categories().find(c => c.userkey === key);
    if (foundCat && foundCat.categoryId > 0) {
      return all.filter(a => a.categoryId === foundCat.categoryId || a.userkey === key);
    }

    return all.filter(a => a.userkey === key || a.categoryName.toLowerCase().includes(key.toLowerCase()));
  });

  ngOnInit() {
    this.newsService.getHeader().subscribe(h => {
      if (h) {
        this.header.set(h);
        this.cdr.markForCheck();
      }
    });

    this.newsService.getCategoriesWithArticles().subscribe(res => {
      if (res) {
        this.categories.set(res.categories || []);
        this.articles.set(res.articles || []);
        this.cdr.markForCheck();
      }
    });
  }

  setCategory(key: string) {
    this.selectedCategory.set(key);
    this.cdr.markForCheck();
  }

  formatDate(dateStr?: string): string {
    if (!dateStr) return 'Gần đây';
    try {
      const d = new Date(dateStr);
      if (!isNaN(d.getTime())) {
        return d.toLocaleDateString('vi-VN');
      }
    } catch {
      // ignore
    }
    return dateStr;
  }
}
