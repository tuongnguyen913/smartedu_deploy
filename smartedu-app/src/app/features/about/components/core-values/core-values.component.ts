import { Component } from '@angular/core';

@Component({
  selector: 'app-about-core-values',
  standalone: true,
  template: `
    <!-- SECTION 2: HỆ GIÁ TRỊ CỐT LÕI (BENTO GRID) -->
    <section class="section-courses" id="section-core-values" style="background:#F8FAFC; padding: 80px 0; border-top:1px solid #E2E8F0; border-bottom:1px solid #E2E8F0; scroll-margin-top: 90px;">
      <div class="container">
        <div class="section-header" style="text-align: center; margin-bottom: 50px;">
          <div class="section-badge"><i class="fa-solid fa-compass"></i> Định hướng xuyên suốt</div>
          <h2 class="section-title">Hệ Giá Trị <span>Cốt Lõi</span></h2>
          <p class="section-subtitle">Ba trụ cột vững chắc định hình mọi hoạt động giảng dạy, tương tác và quản lý học vụ tại SmartEdu Academy.</p>
        </div>

        <div class="bento-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">
          <!-- Card 1: Tầm nhìn -->
          <div class="bento-card" style="background:#FFFFFF; border:1px solid #E2E8F0; border-radius:16px; padding:32px; box-shadow:0 4px 12px rgba(0,0,0,0.03);">
            <div style="width:56px; height:56px; border-radius:12px; background:#FEE2E2; color:#D81824; display:flex; align-items:center; justify-content:center; font-size:24px; margin-bottom:20px;">
              <i class="fa-solid fa-eye"></i>
            </div>
            <h3 style="font-size:1.25rem; font-weight:700; color:#0F172A; margin-bottom:12px;">Tầm Nhìn Chiến Lược</h3>
            <p style="color:#64748B; line-height:1.6; font-size:0.9375rem;">
              Trở thành hệ thống trung tâm bồi dưỡng văn hóa và rèn luyện tư duy uy tín hàng đầu tại TP.HCM, nơi phụ huynh gửi trọn niềm tin và học sinh tìm thấy niềm cảm hứng học tập thực chất.
            </p>
          </div>

          <!-- Card 2: Sứ mệnh -->
          <div class="bento-card" style="background:#FFFFFF; border:1px solid #E2E8F0; border-radius:16px; padding:32px; box-shadow:0 4px 12px rgba(0,0,0,0.03);">
            <div style="width:56px; height:56px; border-radius:12px; background:#EFF6FF; color:#1B3F94; display:flex; align-items:center; justify-content:center; font-size:24px; margin-bottom:20px;">
              <i class="fa-solid fa-bullseye"></i>
            </div>
            <h3 style="font-size:1.25rem; font-weight:700; color:#0F172A; margin-bottom:12px;">Sứ Mệnh Giáo Dục</h3>
            <p style="color:#64748B; line-height:1.6; font-size:0.9375rem;">
              "Giáo dục cho sự trọn vẹn" — Không chỉ cung cấp kiến thức đạt điểm 9-10, SmartEdu trao cho học sinh phương pháp tự học, tư duy logic phản biện và thói quen kỷ luật tự giác suốt đời.
            </p>
          </div>

          <!-- Card 3: Triết lý & Giá trị sống còn -->
          <div class="bento-card" style="background:#FFFFFF; border:1px solid #E2E8F0; border-radius:16px; padding:32px; box-shadow:0 4px 12px rgba(0,0,0,0.03);">
            <div style="width:56px; height:56px; border-radius:12px; background:#FEF3C7; color:#D97706; display:flex; align-items:center; justify-content:center; font-size:24px; margin-bottom:20px;">
              <i class="fa-solid fa-gem"></i>
            </div>
            <h3 style="font-size:1.25rem; font-weight:700; color:#0F172A; margin-bottom:12px;">3 Giá Trị Sống Còn</h3>
            <p style="color:#64748B; line-height:1.6; font-size:0.9375rem;">
              <strong>Giảng Sư Tinh Hoa</strong> (100% bằng ĐH Sư phạm chuẩn) &bull; <strong>Phương Pháp Cá Nhân Hóa</strong> (Kèm 1:1 ngoài giờ) &bull; <strong>Môi Trường Yêu Thương &amp; Kỷ Luật Tích Cực</strong>.
            </p>
          </div>
        </div>
      </div>
    </section>
  `
})
export class CoreValuesComponent {}

