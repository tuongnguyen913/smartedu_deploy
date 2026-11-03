import { Component } from '@angular/core';

@Component({
  selector: 'app-about-commitments',
  standalone: true,
  template: `
    <!-- SECTION 3: 4 CAM KẾT VÀNG (DARK THEME) -->
    <section class="section-commitments" id="section-commitments" style="background:#0F172A; padding: 80px 0; color:#FFFFFF; scroll-margin-top: 90px;">
      <div class="container">
        <div class="section-header" style="text-align: center; margin-bottom: 50px;">
          <div class="section-badge" style="background:rgba(216,24,36,0.2); color:#FCA5A5; border-color:#D81824;"><i class="fa-solid fa-shield-halved"></i> Bảo chứng chất lượng</div>
          <h2 class="section-title" style="color:#FFFFFF;">4 Cam Kết Vàng <span style="color:#D81824;">Chỉ Có Tại SmartEdu</span></h2>
          <p class="section-subtitle" style="color:#94A3B8;">Chúng tôi cam kết bằng văn bản với phụ huynh ngay từ ngày đầu tiên con nhập học.</p>
        </div>

        <div class="commitments-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px;">
          <div class="commitment-card" style="background:#1E293B; border:1px solid #334155; border-radius:16px; padding:30px;">
            <div class="commitment-icon-box" style="font-size:28px; color:#D81824; margin-bottom:16px;"><i class="fa-solid fa-hand-holding-hand"></i></div>
            <h3 style="font-size:1.15rem; font-weight:700; color:#FFFFFF; margin-bottom:10px;">Kèm 1:1 Miễn Phí Ngoài Giờ</h3>
            <p style="color:#CBD5E1; font-size:0.9rem; line-height:1.6;">Học sinh chưa hiểu bài hoặc nghỉ học có phép được thầy cô trực tiếp bồi dưỡng 1:1 vào cuối tuần hoàn toàn không thu phụ phí.</p>
          </div>

          <div class="commitment-card" style="background:#1E293B; border:1px solid #334155; border-radius:16px; padding:30px;">
            <div class="commitment-icon-box" style="font-size:28px; color:#D81824; margin-bottom:16px;"><i class="fa-solid fa-rotate-left"></i></div>
            <h3 style="font-size:1.15rem; font-weight:700; color:#FFFFFF; margin-bottom:10px;">Hoàn Học Phí Nếu Không Tiến Bộ</h3>
            <p style="color:#CBD5E1; font-size:0.9rem; line-height:1.6;">Cam kết rõ ràng về sự thay đổi điểm số và thái độ học tập sau 60 ngày. Hoàn 100% học phí nếu con không có sự tiến bộ thực chất.</p>
          </div>

          <div class="commitment-card" style="background:#1E293B; border:1px solid #334155; border-radius:16px; padding:30px;">
            <div class="commitment-icon-box" style="font-size:28px; color:#D81824; margin-bottom:16px;"><i class="fa-solid fa-user-tie"></i></div>
            <h3 style="font-size:1.15rem; font-weight:700; color:#FFFFFF; margin-bottom:10px;">100% Giáo Viên ĐH Sư Phạm</h3>
            <p style="color:#CBD5E1; font-size:0.9rem; line-height:1.6;">Nói không với trợ giảng chưa có bằng cấp đứng lớp. Đội ngũ giảng huấn đều là Thạc sĩ, Cử nhân tốt nghiệp chính quy ĐH Sư phạm TP.HCM.</p>
          </div>

          <div class="commitment-card" style="background:#1E293B; border:1px solid #334155; border-radius:16px; padding:30px;">
            <div class="commitment-icon-box" style="font-size:28px; color:#D81824; margin-bottom:16px;"><i class="fa-solid fa-comments"></i></div>
            <h3 style="font-size:1.15rem; font-weight:700; color:#FFFFFF; margin-bottom:10px;">Báo Cáo Tiến Độ Hàng Tuần</h3>
            <p style="color:#CBD5E1; font-size:0.9rem; line-height:1.6;">Sổ liên lạc điện tử cập nhật kết quả từng buổi học, điểm danh chuyên cần và nhận xét chi tiết của thầy cô gửi trực tiếp qua Zalo phụ huynh.</p>
          </div>
        </div>
      </div>
    </section>
  `
})
export class CommitmentsComponent {}

