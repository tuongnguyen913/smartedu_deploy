import { Component, inject } from '@angular/core';
import { ModalService } from '../../../../core/services/modal.service';

@Component({
  selector: 'app-about-legal',
  standalone: true,
  template: `
    <!-- SECTION 5: PHÁP LÝ & CÔNG KHAI THÔNG TIN -->
    <section class="section-courses" id="section-legal" style="background:#FFFFFF; padding: 80px 0; border-top:1px solid #E2E8F0; scroll-margin-top: 90px;">
      <div class="container">
        <div class="section-header" style="text-align: center; margin-bottom: 45px;">
          <div class="section-badge"><i class="fa-solid fa-file-contract"></i> Minh bạch thông tin</div>
          <h2 class="section-title">Hồ Sơ Pháp Lý <span>&amp; Quy Chế Hoạt Động</span></h2>
          <p class="section-subtitle">SmartEdu Academy hoạt động tuân thủ đầy đủ các quy định của Sở Giáo dục &amp; Đào tạo và Sở Kế hoạch - Đầu tư TP.HCM.</p>
        </div>

        <div style="max-width: 1000px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">
          <!-- Card 1 -->
          <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:16px; padding:28px; display:flex; flex-direction:column; justify-content:space-between; box-shadow:0 4px 12px rgba(0,0,0,0.03);">
            <div>
              <div style="display:flex; align-items:center; gap:12px; margin-bottom:14px;">
                <div style="width:44px; height:44px; border-radius:10px; background:#FEE2E2; color:#D81824; display:flex; align-items:center; justify-content:center; font-size:20px;">
                  <i class="fa-solid fa-stamp"></i>
                </div>
                <div>
                  <h4 style="font-size:1.05rem; font-weight:700; color:#0F172A; margin:0;">Giấy Phép Hoạt Động</h4>
                  <span style="font-size:0.75rem; color:#64748B;">Số QĐ: 2841/QĐ-SGDĐT TP.HCM</span>
                </div>
              </div>
              <p style="font-size:0.875rem; color:#475569; line-height:1.6; margin:0 0 16px;">
                Cấp phép bồi dưỡng văn hóa, kỹ năng và luyện thi các cấp theo quy định của Sở Giáo Dục &amp; Đào Tạo TP.HCM.
              </p>
            </div>
            <button type="button" (click)="openAssessment()" style="background:transparent; border:none; color:#D81824; font-weight:700; font-size:0.875rem; padding:0; cursor:pointer; display:inline-flex; align-items:center; gap:6px;">
              <span>Liên hệ xác nhận hồ sơ</span> <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>

          <!-- Card 2 -->
          <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:16px; padding:28px; display:flex; flex-direction:column; justify-content:space-between; box-shadow:0 4px 12px rgba(0,0,0,0.03);">
            <div>
              <div style="display:flex; align-items:center; gap:12px; margin-bottom:14px;">
                <div style="width:44px; height:44px; border-radius:10px; background:#FEE2E2; color:#D81824; display:flex; align-items:center; justify-content:center; font-size:20px;">
                  <i class="fa-solid fa-certificate"></i>
                </div>
                <div>
                  <h4 style="font-size:1.05rem; font-weight:700; color:#0F172A; margin:0;">Quy Chế Học Vụ</h4>
                  <span style="font-size:0.75rem; color:#64748B;">Ban hành theo QĐ 08/QĐ-SE</span>
                </div>
              </div>
              <p style="font-size:0.875rem; color:#475569; line-height:1.6; margin:0 0 16px;">
                Quy định chi tiết về chuẩn mực sư phạm, quy trình đánh giá năng lực đầu vào và chính sách kèm 1:1 miễn phí.
              </p>
            </div>
            <button type="button" (click)="openAssessment()" style="background:transparent; border:none; color:#D81824; font-weight:700; font-size:0.875rem; padding:0; cursor:pointer; display:inline-flex; align-items:center; gap:6px;">
              <span>Tìm hiểu quy chế</span> <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>

          <!-- Card 3 -->
          <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:16px; padding:28px; display:flex; flex-direction:column; justify-content:space-between; box-shadow:0 4px 12px rgba(0,0,0,0.03);">
            <div>
              <div style="display:flex; align-items:center; gap:12px; margin-bottom:14px;">
                <div style="width:44px; height:44px; border-radius:10px; background:#FEE2E2; color:#D81824; display:flex; align-items:center; justify-content:center; font-size:20px;">
                  <i class="fa-solid fa-clipboard-check"></i>
                </div>
                <div>
                  <h4 style="font-size:1.05rem; font-weight:700; color:#0F172A; margin:0;">Biểu Phí Công Khai</h4>
                  <span style="font-size:0.75rem; color:#64748B;">Niêm yết trọn gói hàng năm</span>
                </div>
              </div>
              <p style="font-size:0.875rem; color:#475569; line-height:1.6; margin:0 0 16px;">
                Minh bạch toàn bộ học phí, bao gồm giáo trình độc quyền và giờ kèm cuối tuần, cam kết hoàn học phí theo thỏa thuận.
              </p>
            </div>
            <button type="button" (click)="openAssessment()" style="background:transparent; border:none; color:#D81824; font-weight:700; font-size:0.875rem; padding:0; cursor:pointer; display:inline-flex; align-items:center; gap:6px;">
              <span>Nhận biểu mức học phí</span> <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  `
})
export class LegalComponent {
  private modalService = inject(ModalService);

  openAssessment() {
    this.modalService.openAssessment();
  }
}

