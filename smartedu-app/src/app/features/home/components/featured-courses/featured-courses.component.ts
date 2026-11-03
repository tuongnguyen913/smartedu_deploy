import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-featured-courses',
  standalone: true,
  template: `
    <section class="section-hall-of-greatness" id="section-hall">
      <div class="container">
        <div class="section-header">
          <div class="section-badge" style="background: rgba(217, 119, 6, 0.1); color: #B45309; border-color: rgba(217, 119, 6, 0.25);">
            <i class="fa-solid fa-crown"></i> Niềm tự hào SmartEdu
          </div>
          <h2 class="section-title">Gương Mặt Xuất Sắc &mdash; <span>Bảng Vàng Thành Tích</span></h2>
          <p class="section-subtitle">Vinh danh những nỗ lực bứt phá không ngừng của học sinh SmartEdu trên hành trình chinh phục trường Chuyên và các trường THPT công lập hàng đầu.</p>
        </div>

        <div class="hall-slider-wrapper">
          <!-- Hall of Greatness Category Tabs (Đã bỏ tab Đại học & ĐGNL) -->
          <div class="hall-tabs-nav">
            <button type="button" class="hall-tab-btn" [class.active]="activeTab() === 'all'" (click)="setTab('all')">Tất cả thành tích</button>
            <button type="button" class="hall-tab-btn" [class.active]="activeTab() === 'tuyensinh10'" (click)="setTab('tuyensinh10')">Tuyển sinh lớp 10</button>
            <button type="button" class="hall-tab-btn" [class.active]="activeTab() === 'chuyen'" (click)="setTab('chuyen')">Trường Chuyên &amp; HSG</button>
          </div>

          <div class="hall-grid">
            
            <!-- Student 1 -->
            <div class="hall-card" data-category="tuyensinh10 chuyen" [style.display]="isStudentVisible('tuyensinh10 chuyen') ? 'flex' : 'none'">
              <div class="hall-card-thumb">
                <img src="assets/images/students/students-chinh-phuc-lop-10.jpg" alt="Trần Thế Hồng Phúc">
                <span class="hall-score-badge">Toán 9.75 &bull; Văn 9.0</span>
              </div>
              <div class="hall-card-body">
                <h4 class="hall-student-name">Trần Thế Hồng Phúc</h4>
                <div class="hall-student-school">Học sinh THCS Bình Phú, Q.6</div>
                <div class="hall-achievement-text">
                  <i class="fa-solid fa-trophy" style="color: #F59E0B; margin-right: 4px;"></i> Đỗ THPT Chuyên Lê Hồng Phong &amp; Chuyên Toán Mạc Đĩnh Chi
                </div>
              </div>
            </div>

            <!-- Student 2 -->
            <div class="hall-card" data-category="tuyensinh10 chuyen" [style.display]="isStudentVisible('tuyensinh10 chuyen') ? 'flex' : 'none'">
              <div class="hall-card-thumb">
                <img src="assets/images/students/students-nam-hoc-moi-hanh-phuc.jpg" alt="Nguyễn Ngọc An Nhiên">
                <span class="hall-score-badge">IELTS 7.5 &bull; Điểm 10 Anh</span>
              </div>
              <div class="hall-card-body">
                <h4 class="hall-student-name">Nguyễn Ngọc An Nhiên</h4>
                <div class="hall-student-school">Học sinh THCS Lam Sơn, Q.6</div>
                <div class="hall-achievement-text">
                  <i class="fa-solid fa-trophy" style="color: #F59E0B; margin-right: 4px;"></i> Đỗ THPT Chuyên Trần Đại Nghĩa &bull; Giải Nhất HSG TP.HCM
                </div>
              </div>
            </div>

            <!-- Student 3 -->
            <div class="hall-card" data-category="tuyensinh10" [style.display]="isStudentVisible('tuyensinh10') ? 'flex' : 'none'">
              <div class="hall-card-thumb">
                <img src="assets/images/students/students-hoc-hang-say-don-xuan.jpg" alt="Bùi Gia Hân">
                <span class="hall-score-badge">Toán 9.5 &bull; Anh 10</span>
              </div>
              <div class="hall-card-body">
                <h4 class="hall-student-name">Bùi Gia Hân</h4>
                <div class="hall-student-school">Học sinh THCS Hậu Giang, Q.6</div>
                <div class="hall-achievement-text">
                  <i class="fa-solid fa-trophy" style="color: #F59E0B; margin-right: 4px;"></i> Đỗ Nguyện Vọng 1 THPT Nguyễn Thượng Hiền (Tổng 27.5 đ)
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  `
})
export class FeaturedCoursesComponent {
  activeTab = signal<string>('all');

  setTab(tab: string) {
    this.activeTab.set(tab);
  }

  isStudentVisible(categories: string): boolean {
    const tab = this.activeTab();
    if (tab === 'all') return true;
    return categories.includes(tab);
  }
}
