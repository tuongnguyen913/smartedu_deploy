import { Component, inject, OnInit, PLATFORM_ID, DestroyRef } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ModalService } from '../../core/services/modal.service';
import { LeadFormComponent } from '../../shared/components/lead-form/lead-form.component';
import { StoryComponent } from './components/story/story.component';
import { CoreValuesComponent } from './components/core-values/core-values.component';
import { CommitmentsComponent } from './components/commitments/commitments.component';
import { LeadershipMessageComponent } from './components/leadership-message/leadership-message.component';
import { LegalComponent } from './components/legal/legal.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LeadFormComponent,
    StoryComponent,
    CoreValuesComponent,
    CommitmentsComponent,
    LeadershipMessageComponent,
    LegalComponent
  ],
  template: `
    <main>
      <!-- SUBPAGE HERO BANNER -->
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
                Giới thiệu về SmartEdu
              </li>
            </ol>
          </nav>
          <div class="section-badge"><i class="fa-solid fa-award"></i> Về SmartEdu Academy</div>
          <h1 class="subpage-hero-title">Giáo Dục Cho Sự Trọn Vẹn <br><span>Kiến Tạo Thế Hệ Trưởng Thành</span></h1>
          <p class="subpage-hero-desc">SmartEdu Academy ra đời với sứ mệnh mang đến một môi trường giáo dục văn hóa chuẩn mực, kết hợp giữa tri thức học thuật vững chắc, tư duy tự chủ và nhân cách nhân văn cho học sinh tại Quận 6, TP.HCM.</p>
        </div>
      </section>

      <!-- SECTION 1: CÂU CHUYỆN THÀNH LẬP & TÂM HUYẾT -->
      <app-about-story></app-about-story>

      <!-- SECTION 2: HỆ GIÁ TRỊ CỐT LÕI (BENTO GRID) -->
      <app-about-core-values></app-about-core-values>

      <!-- SECTION 3: 4 CAM KẾT VÀNG (DARK THEME) -->
      <app-about-commitments></app-about-commitments>

      <!-- SECTION 4: EDITORIAL LEADERSHIP QUOTE BLOCK -->
      <app-about-leadership-message></app-about-leadership-message>

      <!-- SECTION 5: PHÁP LÝ & CÔNG KHAI -->
      <app-about-legal></app-about-legal>

      <!-- REGISTRATION FORM -->
      <section class="section-registration" style="background:#0F172A; padding:80px 0; color:#FFFFFF;">
        <div class="container">
          <div style="max-width: 700px; margin: 0 auto; background: #1E293B; border: 1px solid #334155; border-radius: 20px; padding: 40px 32px; box-shadow: 0 20px 40px rgba(0,0,0,0.3);">
            <div style="text-align: center; margin-bottom: 24px;">
              <span class="section-badge" style="background:rgba(216,24,36,0.2); color:#FCA5A5; border-color:#D81824;"><i class="fa-solid fa-gift"></i> Nhận tư vấn trực tiếp</span>
              <h3 style="font-size: 1.5rem; font-weight: 800; color: #FFFFFF; margin-top: 8px;">Đăng Ký Học Thử 02 Buổi &bull; Kiểm Tra Đầu Vào 0đ</h3>
              <p style="font-size: 0.875rem; color: #94A3B8; margin-top: 4px;">Thầy cô Ban Chuyên Môn sẽ trực tiếp liên hệ và gửi lộ trình học tập tối ưu cho con.</p>
            </div>
            <app-lead-form></app-lead-form>
          </div>
        </div>
      </section>
    </main>
  `
})
export class AboutComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private platformId = inject(PLATFORM_ID);
  private destroyRef = inject(DestroyRef);
  modalService = inject(ModalService);

  private readonly sectionMap: Record<string, string> = {
    'cau-chuyen-smartedu': 'section-story',
    'section-story': 'section-story',
    'story': 'section-story',
    'he-gia-tri-cot-loi': 'section-core-values',
    'section-core-values': 'section-core-values',
    'core-values': 'section-core-values',
    '4-cam-ket-vang': 'section-commitments',
    'cam-ket-vang': 'section-commitments',
    'section-commitments': 'section-commitments',
    'commitments': 'section-commitments',
    'thong-diep-giang-huan': 'section-message',
    'section-message': 'section-message',
    'message': 'section-message',
    'phap-ly-cong-khai': 'section-legal',
    'section-legal': 'section-legal',
    'legal': 'section-legal'
  };

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.route.fragment.pipe(
        takeUntilDestroyed(this.destroyRef)
      ).subscribe(fragment => {
        if (fragment) {
          const targetId = this.sectionMap[fragment] || fragment;
          this.scrollToAnchor(targetId);
        }
      });

      this.route.params.pipe(
        takeUntilDestroyed(this.destroyRef)
      ).subscribe(params => {
        const section = params['section'];
        if (section) {
          const targetId = this.sectionMap[section] || section;
          this.scrollToAnchor(targetId);
        }
      });
    }
  }

  private scrollToAnchor(fragment: string): void {
    const doScroll = () => {
      const element = document.getElementById(fragment);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return true;
      }
      return false;
    };

    // Thực hiện cuộn ngay và thử lại ở 100ms & 300ms đề phòng hydration / ảnh load
    doScroll();
    setTimeout(doScroll, 100);
    setTimeout(doScroll, 300);
  }

  openAssessment() {
    this.modalService.openAssessment();
  }
}
