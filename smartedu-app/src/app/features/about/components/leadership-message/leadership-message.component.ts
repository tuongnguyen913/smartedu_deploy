import { Component } from '@angular/core';

@Component({
  selector: 'app-about-leadership-message',
  standalone: true,
  template: `
    <!-- SECTION 4: EDITORIAL LEADERSHIP QUOTE BLOCK -->
    <section class="section-courses" id="section-message" style="background:#F8FAFC; padding: 80px 0; border-top:1px solid #E2E8F0; scroll-margin-top: 90px;">
      <div class="container">
        <div class="editorial-quote-box">
          <div class="editorial-avatar-wrap">
            <img src="assets/images/teachers/teacher-thay-hoi-dong-giang-huan.png" alt="ThS. Nguyễn Thanh Tùng">
            <div class="editorial-avatar-name">ThS. Nguyễn Thanh Tùng</div>
            <div class="editorial-avatar-title">Chủ tịch Hội đồng Chuyên môn SmartEdu<br>Thạc sĩ Toán học - ĐH Sư phạm TP.HCM</div>
          </div>

          <div class="editorial-text-wrap">
            <i class="fa-solid fa-quote-left quote-mark"></i>
            <div class="editorial-quote-text">
              "Bằng trái tim của những người làm giáo dục chân chính, chúng tôi hiểu rằng điểm số rất quan trọng, nhưng niềm vui học tập và sự tự tin bên trong các em mới là tài sản lớn nhất. Chúng tôi không chỉ dạy chữ, mà cùng các em kiên nhẫn vượt qua từng bài toán khó, từng lỗi chính tả để nhìn thấy các em mỉm cười tự hào về bản thân mỗi ngày."
            </div>
            <div class="editorial-signature">
              <div>
                <strong style="color: #0F172A; display:block;">Hội Đồng Ban Giảng Huấn SmartEdu</strong>
                <span style="font-size:0.8125rem; color:#64748B;">Đại diện phê duyệt học vụ</span>
              </div>
              <div class="brand-sign">SmartEdu Academy</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class LeadershipMessageComponent {}

