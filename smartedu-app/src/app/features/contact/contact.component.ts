import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { BranchService } from '../../core/services/branch.service';
import { Branch } from '../../core/models/branch.model';
import { LeadFormComponent } from '../../shared/components/lead-form/lead-form.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RouterLink, LeadFormComponent],
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
                Liên hệ &amp; Cơ sở
              </li>
            </ol>
          </nav>
          <div class="section-badge"><i class="fa-solid fa-headset"></i> Hỗ trợ tận tâm</div>
          <h1 class="subpage-hero-title">Kết Nối Cùng SmartEdu <br><span>2 Cơ Sở Bình Phú Quận 6</span></h1>
          <p class="subpage-hero-desc">Đội ngũ tư vấn học vụ luôn sẵn sàng lắng nghe, hỗ trợ giải đáp mọi băn khoăn về lộ trình học tập và xếp lịch kiểm tra năng lực đầu vào miễn phí cho con.</p>
        </div>
      </section>

      <!-- CAMPUSES & CONTACT INFO SECTION -->
      <section class="section" style="padding: 60px 0; background: #FFFFFF;">
        <div class="container">
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 30px; margin-bottom: 50px;">
            @for (branch of branches(); track branch.branchId) {
              <div class="branch-card" style="border: 1px solid #E2E8F0; border-radius: 16px; padding: 32px; background: #F8FAFC; box-shadow: 0 4px 15px rgba(0,0,0,0.03);">
                <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 20px;">
                  <div style="width: 48px; height: 48px; border-radius: 12px; background: #D81824; color: #FFFFFF; display: flex; align-items: center; justify-content: center; font-size: 20px;">
                    <i class="fa-solid fa-location-dot"></i>
                  </div>
                  <div>
                    <span style="font-size: 0.75rem; font-weight: 700; color: #D81824; text-transform: uppercase;">Cơ Sở Chính Thức</span>
                    <h3 style="font-size: 1.25rem; font-weight: 800; color: #0F172A; margin: 0;">{{ branch.branchName }}</h3>
                  </div>
                </div>

                <div style="display: flex; flex-direction: column; gap: 14px; font-size: 0.9375rem; color: #475569;">
                  <div>
                    <strong style="color: #0F172A;"><i class="fa-solid fa-map-pin" style="color: #D81824; width: 20px;"></i> Địa chỉ:</strong>
                    <div style="margin-left: 24px; margin-top: 2px;">{{ branch.address }}</div>
                  </div>

                  <div>
                    <strong style="color: #0F172A;"><i class="fa-solid fa-phone" style="color: #D81824; width: 20px;"></i> Hotline / Zalo:</strong>
                    <div style="margin-left: 24px; margin-top: 2px;">
                      <a [href]="'tel:' + branch.hotline" style="color: #D81824; font-weight: 700; text-decoration: none;">{{ branch.hotline }}</a>
                    </div>
                  </div>

                  <div>
                    <strong style="color: #0F172A;"><i class="fa-solid fa-clock" style="color: #D81824; width: 20px;"></i> Giờ mở cửa:</strong>
                    <div style="margin-left: 24px; margin-top: 2px;">{{ branch.workingHours }}</div>
                  </div>

                  <div>
                    <strong style="color: #0F172A;"><i class="fa-solid fa-envelope" style="color: #D81824; width: 20px;"></i> Email:</strong>
                    <div style="margin-left: 24px; margin-top: 2px;">{{ branch.email }}</div>
                  </div>
                </div>

                <div style="margin-top: 24px; display: flex; gap: 10px;">
                  <button type="button" class="btn-register btn-red" style="flex: 1; height: 42px; font-size: 0.875rem;" (click)="selectCampus(branch.branchId)">
                    <i class="fa-solid fa-map-location-dot"></i> Xem Trên Bản Đồ
                  </button>
                  <a [href]="branch.googleMapsDirectionsUrl" target="_blank" rel="noopener" style="height: 42px; padding: 0 16px; border: 1px solid #CBD5E1; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #0F172A; text-decoration: none; font-size: 0.875rem; font-weight: 600;">
                    Chỉ Đường
                  </a>
                </div>
              </div>
            }
          </div>

          <!-- INTERACTIVE GOOGLE MAPS -->
          <div style="border: 1px solid #E2E8F0; border-radius: 16px; overflow: hidden; background: #FFFFFF; box-shadow: 0 8px 30px rgba(0,0,0,0.06);">
            <div style="padding: 16px 24px; background: #F8FAFC; border-bottom: 1px solid #E2E8F0; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
              <div style="font-weight: 700; color: #0F172A;">
                <i class="fa-solid fa-map" style="color: #D81824; margin-right: 8px;"></i> Bản Đồ Vị Trí: 
                <span style="color: #D81824;">{{ activeBranch()?.branchName }}</span>
              </div>
              <div style="display: flex; gap: 8px;">
                @for (b of branches(); track b.branchId) {
                  <button type="button" class="course-tab-btn" [class.active]="selectedBranchId() === b.branchId" (click)="selectCampus(b.branchId)" style="padding: 6px 14px; font-size: 0.8125rem;">
                    {{ b.branchName }}
                  </button>
                }
              </div>
            </div>

            <div style="height: 420px; width: 100%;">
              @if (safeMapUrl(); as url) {
                <iframe [src]="url" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
              }
            </div>
          </div>
        </div>
      </section>

      <!-- REGISTRATION / CONTACT FORM SECTION -->
      <section class="section-registration" style="background:#0F172A; padding:80px 0; color:#FFFFFF;">
        <div class="container">
          <div style="max-width: 700px; margin: 0 auto; background: #1E293B; border: 1px solid #334155; border-radius: 20px; padding: 40px 32px; box-shadow: 0 20px 40px rgba(0,0,0,0.3);">
            <div style="text-align: center; margin-bottom: 24px;">
              <span class="section-badge" style="background:rgba(216,24,36,0.2); color:#FCA5A5; border-color:#D81824;"><i class="fa-solid fa-paper-plane"></i> Gửi thông điệp</span>
              <h3 style="font-size: 1.5rem; font-weight: 800; color: #FFFFFF; margin-top: 8px;">Đăng Ký Tư Vấn &bull; Xếp Lịch Kiểm Tra Trực Tiếp</h3>
              <p style="font-size: 0.875rem; color: #94A3B8; margin-top: 4px;">SmartEdu sẽ liên hệ xác nhận lịch hẹn và chuẩn bị phòng kiểm tra chu đáo nhất cho con.</p>
            </div>
            <app-lead-form></app-lead-form>
          </div>
        </div>
      </section>
    </main>
  `
})
export class ContactComponent implements OnInit {
  private branchService = inject(BranchService);
  private sanitizer = inject(DomSanitizer);

  branches = signal<Branch[]>([]);
  selectedBranchId = signal<number>(1);
  safeMapUrl = signal<SafeResourceUrl | null>(null);

  ngOnInit() {
    this.branchService.getBranches().subscribe(data => {
      this.branches.set(data);
      if (data.length > 0) {
        this.selectCampus(data[0].branchId);
      }
    });
  }

  selectCampus(id: number) {
    this.selectedBranchId.set(id);
    const branch = this.branches().find(b => b.branchId === id);
    if (branch && branch.googleMapsEmbedUrl) {
      this.safeMapUrl.set(this.sanitizer.bypassSecurityTrustResourceUrl(branch.googleMapsEmbedUrl));
    }
  }

  activeBranch(): Branch | undefined {
    return this.branches().find(b => b.branchId === this.selectedBranchId());
  }
}

