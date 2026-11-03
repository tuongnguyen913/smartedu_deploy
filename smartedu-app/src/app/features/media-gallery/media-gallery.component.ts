import { Component, inject, OnInit, signal, ChangeDetectorRef, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MediaService } from '../../core/services/media.service';
import { PageHeader } from '../../core/models/page-header.model';
import { Album, MediaItem } from '../../core/models/media.model';
import { LeadFormComponent } from '../../shared/components/lead-form/lead-form.component';

@Component({
  selector: 'app-media-gallery',
  standalone: true,
  imports: [CommonModule, RouterLink, LeadFormComponent],
  styles: [`
    .section-media-main {
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
    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 26px;
    }
    .gallery-card {
      border: 1px solid #E2E8F0;
      border-radius: 16px;
      overflow: hidden;
      background: #FFFFFF;
      box-shadow: 0 4px 16px rgba(15, 23, 42, 0.05);
      cursor: pointer;
      display: flex;
      flex-direction: column;
      transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
    }
    .gallery-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 12px 30px rgba(15, 23, 42, 0.12);
      border-color: #FECDD3;
    }
    .gallery-thumb {
      position: relative;
      height: 230px;
      overflow: hidden;
      background: #0F172A;
    }
    .gallery-thumb img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s ease;
    }
    .gallery-card:hover .gallery-thumb img {
      transform: scale(1.05);
    }
    .video-icon-wrap {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(15, 23, 42, 0.35);
    }
    .video-icon-circle {
      width: 54px;
      height: 54px;
      border-radius: 50%;
      background: #D81824;
      color: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      box-shadow: 0 4px 16px rgba(216, 24, 36, 0.5);
      transition: transform 0.2s ease;
    }
    .gallery-card:hover .video-icon-circle {
      transform: scale(1.1);
    }
    .photo-icon-wrap {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(15, 23, 42, 0.3);
      opacity: 0;
      transition: opacity 0.2s ease;
    }
    .gallery-card:hover .photo-icon-wrap {
      opacity: 1;
    }
    .photo-icon-circle {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.9);
      color: #0F172A;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
    }
    .gallery-badge {
      position: absolute;
      top: 14px;
      left: 14px;
      background: rgba(15, 23, 42, 0.75);
      backdrop-filter: blur(4px);
      color: #FFFFFF;
      font-size: 0.75rem;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 4px;
    }
    .gallery-info {
      padding: 20px;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }
    .gallery-title {
      font-size: 1.05rem;
      font-weight: 700;
      color: #0F172A;
      margin: 0 0 8px;
      line-height: 1.4;
    }
    .gallery-caption {
      font-size: 0.8125rem;
      color: #64748B;
      margin: 0;
      line-height: 1.5;
    }
    .lightbox-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.88);
      z-index: 2000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      animation: fadeIn 0.2s ease;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    .lightbox-content {
      max-width: 900px;
      width: 100%;
      background: #0F172A;
      border-radius: 16px;
      overflow: hidden;
      position: relative;
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
    }
    .lightbox-close-btn {
      position: absolute;
      top: 16px;
      right: 16px;
      background: rgba(0, 0, 0, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: #FFFFFF;
      width: 38px;
      height: 38px;
      border-radius: 50%;
      font-size: 20px;
      cursor: pointer;
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s ease;
    }
    .lightbox-close-btn:hover {
      background: #D81824;
    }
  `],
  template: `
    <main>
      <!-- TẦNG 1: SUBPAGE HERO BANNER (Query từ tbl_HomepageSection: SectionCode = 'MEDIA_HEADER') -->
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
                  Thư viện Media
                </li>
              </ol>
            </nav>
            <div class="section-badge">
              <i class="fa-solid fa-photo-film"></i> {{ header().subTitle }}
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

      <!-- TẦNG 2 & 3: ALBUM TABS & MEDIA ITEMS GRID -->
      <section class="section-media-main">
        <div class="container">
          <!-- Tầng 2: Album Filter Tabs -->
          <div class="course-filter-bar">
            @for (album of albums(); track album.slug) {
              <button
                type="button"
                class="course-tab-btn"
                [class.active]="activeCategory() === album.slug"
                (click)="setCategory(album.slug)"
              >
                {{ album.name || album.albumName }}
              </button>
            }
          </div>

          <!-- Tầng 3: Media Items Grid -->
          <div class="gallery-grid">
            @for (item of filteredMedias(); track item.id) {
              <div class="gallery-card" (click)="openPreview(item)">
                <div class="gallery-thumb">
                  <img [src]="item.thumbnailUrl || item.url || item.mediaUrl" [alt]="item.name || item.mediaTitle">

                  @if (item.albumName) {
                    <span class="gallery-badge">
                      {{ item.albumName }}
                    </span>
                  }

                  @if (item.mediaType === 'video') {
                    <div class="video-icon-wrap">
                      <div class="video-icon-circle">
                        <i class="fa-solid fa-play"></i>
                      </div>
                    </div>
                  } @else {
                    <div class="photo-icon-wrap">
                      <div class="photo-icon-circle">
                        <i class="fa-solid fa-expand"></i>
                      </div>
                    </div>
                  }
                </div>

                <div class="gallery-info">
                  <h3 class="gallery-title">
                    {{ item.name || item.mediaTitle }}
                  </h3>
                  <p class="gallery-caption">
                    {{ item.caption }}
                  </p>
                </div>
              </div>
            }
          </div>

          @if (filteredMedias().length === 0) {
            <div style="text-align: center; padding: 60px 20px; color: #64748B;">
              <i class="fa-solid fa-images" style="font-size: 3rem; color: #CBD5E1; margin-bottom: 12px; display: block;"></i>
              <p>Chưa có hình ảnh nào trong album này.</p>
              <button type="button" class="course-tab-btn active" style="margin-top: 10px;" (click)="setCategory('all')">
                Xem tất cả Media
              </button>
            </div>
          }
        </div>
      </section>

      <!-- LIGHTBOX PREVIEW MODAL -->
      @if (selectedItem(); as active) {
        <div class="lightbox-overlay" (click)="closePreview()">
          <div class="lightbox-content" (click)="$event.stopPropagation()">
            <button type="button" class="lightbox-close-btn" (click)="closePreview()">
              &times;
            </button>

            @if (active.mediaType === 'video') {
              <div style="position: relative; padding-bottom: 56.25%; height: 0; background: #000;">
                <video controls autoplay style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
                  <source [src]="active.mediaUrl || active.url" type="video/mp4">
                  Trình duyệt không hỗ trợ video HTML5.
                </video>
              </div>
            } @else {
              <img [src]="active.mediaUrl || active.url" [alt]="active.name || active.mediaTitle" style="width: 100%; max-height: 70vh; object-fit: contain; background: #000; display: block;">
            }

            <div style="padding: 24px; color: #FFFFFF;">
              <div style="font-size: 0.8125rem; color: #FCA5A5; font-weight: 700; text-transform: uppercase; margin-bottom: 4px;">
                {{ active.albumName || 'Thư Viện Media' }}
              </div>
              <h3 style="font-size: 1.25rem; font-weight: 700; margin: 0 0 6px;">{{ active.name || active.mediaTitle }}</h3>
              <p style="font-size: 0.875rem; color: #94A3B8; margin: 0;">{{ active.caption }}</p>
            </div>
          </div>
        </div>
      }

      <!-- REGISTRATION SECTION -->
      <section class="section-registration" style="background:#0F172A; padding:80px 0; color:#FFFFFF;">
        <div class="container">
          <div style="max-width: 700px; margin: 0 auto; background: #1E293B; border: 1px solid #334155; border-radius: 20px; padding: 40px 32px; box-shadow: 0 20px 40px rgba(0,0,0,0.3);">
            <div style="text-align: center; margin-bottom: 24px;">
              <span class="section-badge" style="background:rgba(216,24,36,0.2); color:#FCA5A5; border-color:#D81824;"><i class="fa-solid fa-gift"></i> Trải nghiệm trực tiếp</span>
              <h3 style="font-size: 1.5rem; font-weight: 800; color: #FFFFFF; margin-top: 8px;">Tham Quan Cơ Sở &amp; Học Thử 02 Buổi Miễn Phí</h3>
              <p style="font-size: 0.875rem; color: #94A3B8; margin-top: 4px;">Kính mời Quý Phụ huynh và Học sinh đến tham quan không gian học tập tại 2 cơ sở Quận 6.</p>
            </div>
            <app-lead-form></app-lead-form>
          </div>
        </div>
      </section>
    </main>
  `
})
export class MediaGalleryComponent implements OnInit {
  private mediaService = inject(MediaService);
  private cdr = inject(ChangeDetectorRef);

  header = signal<PageHeader>({
    subTitle: 'HÌNH ẢNH THỰC TẾ',
    title: 'Thư Viện Không Gian & Hoạt Động Giảng Huấn',
    content: 'Khám phá không gian học tập hiện đại, phòng học máy lạnh tiêu chuẩn cùng những khoảnh khắc học tập nhiệt huyết của thầy trò SmartEdu Academy.',
    isActive: true
  });

  albums = signal<Album[]>([]);
  medias = signal<MediaItem[]>([]);
  activeCategory = signal<string>('all');
  selectedItem = signal<MediaItem | null>(null);

  filteredMedias = computed(() => {
    const cat = this.activeCategory();
    const list = this.medias();
    if (!cat || cat === 'all') {
      return list;
    }
    return list.filter(m => m.albumSlug === cat || m.category === cat);
  });

  ngOnInit() {
    this.mediaService.getHeader().subscribe(h => {
      if (h) {
        this.header.set(h);
        this.cdr.markForCheck();
      }
    });

    this.mediaService.getAlbumsWithItems().subscribe(res => {
      if (res) {
        this.albums.set(res.albums || []);
        this.medias.set(res.items || []);
        this.cdr.markForCheck();
      }
    });
  }

  setCategory(cat: string) {
    this.activeCategory.set(cat);
    this.cdr.markForCheck();
  }

  openPreview(item: MediaItem) {
    this.selectedItem.set(item);
    this.cdr.markForCheck();
  }

  closePreview() {
    this.selectedItem.set(null);
    this.cdr.markForCheck();
  }
}
