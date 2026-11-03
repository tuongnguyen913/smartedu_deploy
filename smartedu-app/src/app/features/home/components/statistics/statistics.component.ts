import { Component } from '@angular/core';

@Component({
  selector: 'app-statistics',
  standalone: true,
  template: `
    <!-- ==========================================================================
         PROOF STATS STRIP (ILA BENCHMARK & SCROLLCRAFT NUMBER COUNTERS)
         ========================================================================== -->
    <div class="container stats-proof-section">
      <div class="stats-proof-bar in-view">
        <div class="stats-proof-item">
          <div class="stats-proof-icon"><i class="fa-solid fa-graduation-cap"></i></div>
          <div>
            <div class="stats-proof-number"><span class="counter-value" data-target="100%">100%</span></div>
            <p class="stats-proof-label">Giảng Viên ĐH Sư Phạm TP.HCM</p>
          </div>
        </div>

        <div class="stats-proof-item">
          <div class="stats-proof-icon"><i class="fa-solid fa-users"></i></div>
          <div>
            <div class="stats-proof-number"><span class="counter-value" data-target="15">15</span> HS/Lớp</div>
            <p class="stats-proof-label">Sĩ Số Vàng Giới Hạn 10–15 Học Sinh</p>
          </div>
        </div>

        <div class="stats-proof-item">
          <div class="stats-proof-icon"><i class="fa-solid fa-trophy"></i></div>
          <div>
            <div class="stats-proof-number"><span class="counter-value" data-target="94.6%">94.6%</span></div>
            <p class="stats-proof-label">Tỷ Lệ Học Sinh Đỗ Nguyện Vọng 1</p>
          </div>
        </div>

        <div class="stats-proof-item">
          <div class="stats-proof-icon"><i class="fa-solid fa-building-columns"></i></div>
          <div>
            <div class="stats-proof-number"><span class="counter-value" data-target="2">2</span> Cơ Sở</div>
            <p class="stats-proof-label">Vị Trí Đắc Địa Tại Phường Bình Phú</p>
          </div>
        </div>
      </div>
    </div>

    <!-- ==========================================================================
         6. SECTION 4 CAM KẾT VÀNG (TẠO NÊN KHÁC BIỆT)
         ========================================================================== -->
    <section class="section-commitments" id="section-commitments" style="display: block;">
      <div class="container">
        <div class="section-header">
          <div class="section-badge"><i class="fa-solid fa-shield-halved"></i> Bảo chứng chất lượng đào tạo</div>
          <h2 class="section-title">4 Cam Kết Vàng <span>Tạo Nên Khác Biệt</span></h2>
          <p class="section-subtitle">Tại SmartEdu, sự tiến bộ và niềm vui học tập của từng học trò là thước đo danh dự cao nhất của tập thể thầy cô giáo.</p>
        </div>

        <!-- 4 Commitments Bento Grid -->
        <div class="commitments-grid">
          
          <!-- Cam kết 1: 100% Giảng viên Sư phạm -->
          <div class="commitment-card in-view">
            <span class="commitment-number">01</span>
            <div class="commitment-icon-wrap">
              <i class="fa-solid fa-chalkboard-user"></i>
            </div>
            <h3 class="commitment-title">100% Giảng Viên ĐH Sư Phạm</h3>
            <p class="commitment-desc">Đội ngũ Thạc sĩ, Cử nhân tốt nghiệp chính quy ĐH Sư phạm TP.HCM &amp; ĐH Khoa học Tự nhiên với hơn 5-15 năm kinh nghiệm giảng dạy nhiệt huyết.</p>
          </div>

          <!-- Cam kết 2: Sĩ số 10-15 HS -->
          <div class="commitment-card in-view stagger-1">
            <span class="commitment-number">02</span>
            <div class="commitment-icon-wrap">
              <i class="fa-solid fa-users"></i>
            </div>
            <h3 class="commitment-title">Sĩ Số Vàng 10–15 Học Sinh</h3>
            <p class="commitment-desc">Lớp học giới hạn tối đa 10–15 em giúp giáo viên theo sát từng học sinh, nắm bắt kịp thời học lực và tương tác trực tiếp từng buổi học.</p>
          </div>

          <!-- Cam kết 3: Kèm ngoài giờ 1:1 -->
          <div class="commitment-card in-view stagger-2">
            <span class="commitment-number">03</span>
            <div class="commitment-icon-wrap">
              <i class="fa-solid fa-user-graduate"></i>
            </div>
            <h3 class="commitment-title">Kèm Ngoài Giờ 1:1 Miễn Phí</h3>
            <p class="commitment-desc">Học sinh chưa nắm vững bài hoặc nghỉ học có phép được thầy cô phụ đạo riêng ngoài giờ 1:1 hoàn toàn miễn phí cho đến khi hiểu bài thấu đáo.</p>
          </div>

          <!-- Cam kết 4: Tiến bộ rõ rệt -->
          <div class="commitment-card in-view stagger-3">
            <span class="commitment-number">04</span>
            <div class="commitment-icon-wrap">
              <i class="fa-solid fa-hand-holding-dollar"></i>
            </div>
            <h3 class="commitment-title">Cam Kết Tiến Bộ Rõ Rệt (Hoàn 100% Học Phí)</h3>
            <p class="commitment-desc">Cam kết học sinh tiến bộ vượt bậc về điểm số sau 01 khóa học. Nếu tham gia học tập nghiêm túc, làm đủ bài tập mà không tiến bộ, hoàn 100% học phí.</p>
          </div>

        </div>
      </div>
    </section>
  `
})
export class StatisticsComponent {}
