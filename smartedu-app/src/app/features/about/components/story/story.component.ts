import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about-story',
  standalone: true,
  imports: [RouterLink],
  template: `
    <!-- SECTION 1: CÂU CHUYỆN THÀNH LẬP & TÂM HUYẾT -->
    <section class="section-courses" id="section-story" style="background:#FFFFFF; padding: 80px 0; scroll-margin-top: 90px;">
      <div class="container">
        <div class="story-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 40px; align-items: center;">
          <div class="story-body">
            <div class="section-badge"><i class="fa-solid fa-heart"></i> Tâm huyết của người thầy</div>
            <h2 class="section-title" style="text-align:left; margin-bottom: 20px;">Hành Trình Gieo Mầm <br><span>Tri Thức Thực Chất</span></h2>
            <p class="story-lead" style="font-size: 1.125rem; font-weight: 600; color: #D81824; line-height: 1.6; margin-bottom: 16px;">
              "Chúng tôi tin rằng mỗi đứa trẻ đều có tiềm năng để tỏa sáng nếu được đặt trong một môi trường được thấu hiểu, tôn trọng và đồng hành kiên nhẫn."
            </p>
            <p style="color: #475569; line-height: 1.7; margin-bottom: 14px;">
              SmartEdu Academy được thành lập tại phường Bình Phú, Quận 6 bởi tập thể các giảng viên, nhà giáo xuất thân từ <strong>Trường Đại học Sư phạm TP.HCM</strong>. Trải qua nhiều năm gắn bó với bục giảng, chúng tôi thấu hiểu sâu sắc những áp lực điểm số, tình trạng học vẹt và sự mất phương hướng của các em học sinh khi chuyển cấp hay đối mặt với các kỳ thi lớn.
            </p>
            <p style="color: #475569; line-height: 1.7;">
              Khác biệt với các lớp học thêm nhồi nhét đại trà 40-50 học sinh, SmartEdu kiên định duy trì <strong>sĩ số vàng giới hạn 10-15 em/lớp</strong>. Mỗi học sinh được kiểm tra năng lực đầu vào kỹ lưỡng, xây dựng lộ trình học riêng biệt, và nhận sự kèm cặp 1:1 tận tâm ngoài giờ học chính thức hoàn toàn miễn phí.
            </p>
            
            <div style="display:flex; gap:16px; margin-top:28px; flex-wrap:wrap;">
              <div style="background:#F8FAFC; border-left:4px solid #D81824; padding:16px 20px; border-radius:0 8px 8px 0; flex:1; min-width:200px;">
                <div style="font-size:1.75rem; font-weight:800; color:#0F172A;">100%</div>
                <div style="font-size:0.875rem; color:#64748B;">Giáo viên tốt nghiệp Thạc sĩ / Cử nhân ĐH Sư phạm TP.HCM</div>
              </div>
              <div style="background:#F8FAFC; border-left:4px solid #D81824; padding:16px 20px; border-radius:0 8px 8px 0; flex:1; min-width:200px;">
                <div style="font-size:1.75rem; font-weight:800; color:#0F172A;">10-15</div>
                <div style="font-size:0.875rem; color:#64748B;">Học sinh / lớp, đảm bảo theo sát tiến độ từng cá nhân</div>
              </div>
            </div>

            <div style="display:flex; gap:16px; margin-top:28px; flex-wrap:wrap;">
              <a routerLink="/ban-giang-huan" class="btn-primary-ila btn-red" style="text-decoration: none;">
                <span>Gặp gỡ ban giảng huấn</span>
              </a>
              <a routerLink="/chuong-trinh-hoc" class="btn-secondary-ila" style="text-decoration: none;">
                <span>Khám phá lộ trình đào tạo</span>
              </a>
            </div>
          </div>

          <div class="story-image-wrap">
            <img src="assets/images/campus/campus-phong-hoc-chat-luong-cao.jpg" alt="Câu chuyện SmartEdu" style="width: 100%; border-radius: 16px; box-shadow: 0 12px 30px rgba(0,0,0,0.08);">
          </div>
        </div>
      </div>
    </section>

    <!-- STATS PROOF STRIP -->
    <div class="container stats-proof-section" style="padding: 0 0 50px;">
      <div class="stats-proof-bar" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 16px; padding: 24px 30px;">
        <div class="stats-proof-item" style="display:flex; align-items:center; gap:16px;">
          <div class="stats-proof-icon" style="width:48px; height:48px; border-radius:12px; background:#FEE2E2; color:#D81824; display:flex; align-items:center; justify-content:center; font-size:22px;"><i class="fa-solid fa-graduation-cap"></i></div>
          <div>
            <div class="stats-proof-number" style="font-size:1.5rem; font-weight:800; color:#0F172A;">100%</div>
            <p class="stats-proof-label" style="font-size:0.8125rem; color:#64748B; margin:0;">Giảng Viên ĐH Sư Phạm TP.HCM</p>
          </div>
        </div>

        <div class="stats-proof-item" style="display:flex; align-items:center; gap:16px;">
          <div class="stats-proof-icon" style="width:48px; height:48px; border-radius:12px; background:#FEE2E2; color:#D81824; display:flex; align-items:center; justify-content:center; font-size:22px;"><i class="fa-solid fa-users"></i></div>
          <div>
            <div class="stats-proof-number" style="font-size:1.5rem; font-weight:800; color:#0F172A;">10 - 15 HS/Lớp</div>
            <p class="stats-proof-label" style="font-size:0.8125rem; color:#64748B; margin:0;">Sĩ Số Vàng Giới Hạn Từng Lớp</p>
          </div>
        </div>

        <div class="stats-proof-item" style="display:flex; align-items:center; gap:16px;">
          <div class="stats-proof-icon" style="width:48px; height:48px; border-radius:12px; background:#FEE2E2; color:#D81824; display:flex; align-items:center; justify-content:center; font-size:22px;"><i class="fa-solid fa-trophy"></i></div>
          <div>
            <div class="stats-proof-number" style="font-size:1.5rem; font-weight:800; color:#0F172A;">94.6%</div>
            <p class="stats-proof-label" style="font-size:0.8125rem; color:#64748B; margin:0;">Học Sinh Đỗ Nguyện Vọng 1</p>
          </div>
        </div>

        <div class="stats-proof-item" style="display:flex; align-items:center; gap:16px;">
          <div class="stats-proof-icon" style="width:48px; height:48px; border-radius:12px; background:#FEE2E2; color:#D81824; display:flex; align-items:center; justify-content:center; font-size:22px;"><i class="fa-solid fa-building-columns"></i></div>
          <div>
            <div class="stats-proof-number" style="font-size:1.5rem; font-weight:800; color:#0F172A;">02 Cơ Sở</div>
            <p class="stats-proof-label" style="font-size:0.8125rem; color:#64748B; margin:0;">Khu Đô Thị Bình Phú, Quận 6</p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class StoryComponent {}

