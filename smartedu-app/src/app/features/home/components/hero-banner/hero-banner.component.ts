import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ModalService } from '../../../../core/services/modal.service';
import { BranchService } from '../../../../core/services/branch.service';

@Component({
  selector: 'app-hero-banner',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="hero-slider-section" id="section-hero">
      <div class="hero-slider-container">
        
        <!-- Slide 1: Sứ mệnh & Chất lượng Sư phạm -->
        <div class="hero-slide" [class.active]="currentSlide() === 0">
          <img src="assets/images/students/students-lop-hoc-thuc-te.jpg" alt="Lớp học thực tế tại SmartEdu" class="hero-bg">
          <div class="hero-overlay"></div>
          <div class="container" style="height: 100%; display: flex; align-items: center;">
            <div class="hero-content">
              <div class="hero-tag">
                <i class="fa-solid fa-award"></i> Bồi dưỡng văn hóa &amp; Luyện thi
              </div>
              <h1 class="hero-title">
                Giáo Dục Cho Sự Trọn Vẹn<br>
                <span>Trưởng Thành Hơn Mỗi Ngày</span>
              </h1>
              <p class="hero-desc">
                Đồng hành cùng học sinh từ Lớp 1 đến Lớp 12 với 100% giáo viên tốt nghiệp ĐH Sư phạm TP.HCM. Sĩ số vàng 10–15 học sinh/lớp, cam kết tiến bộ và kèm ngoài giờ 1:1 hoàn toàn miễn phí.
              </p>
              <div class="hero-actions">
                <button type="button" class="btn-primary-ila btn-red open-assessment-modal" (click)="openAssessment()">
                  <span>Đăng ký học thử</span>
                </button>
                <button type="button" class="btn-secondary-ila open-video-modal" (click)="openVideo()">
                  <i class="fa-solid fa-circle-play" style="color: var(--color-primary); font-size: 1.1rem;"></i>
                  <span>Xem video lớp học</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Slide 2: Luyện thi Tuyển sinh 10 & Chuyên -->
        <div class="hero-slide" [class.active]="currentSlide() === 1">
          <img src="assets/images/students/students-chinh-phuc-lop-10.jpg" alt="Chinh phục kỳ thi lớp 10" class="hero-bg">
          <div class="hero-overlay"></div>
          <div class="container" style="height: 100%; display: flex; align-items: center;">
            <div class="hero-content">
              <div class="hero-tag">
                <i class="fa-solid fa-trophy"></i> Tỷ lệ đỗ nguyện vọng 1 đạt 94.6%
              </div>
              <h1 class="hero-title">
                Bứt Phá Kỳ Thi Tuyển Sinh 10<br>
                <span>Chinh Phục Trường Chuyên Top Đầu</span>
              </h1>
              <p class="hero-desc">
                Lộ trình ôn luyện chuyên sâu Toán, Ngữ văn, Tiếng Anh. Giải mã cấu trúc đề thi Sở GD&amp;ĐT TP.HCM, rèn kỹ năng xử lý áp lực phòng thi và tối ưu điểm số tuyệt đối.
              </p>
              <div class="hero-actions">
                <button type="button" class="btn-primary-ila btn-red open-assessment-modal" (click)="openAssessment()">
                  <span>Nhận lộ trình luyện thi 10</span>
                </button>
                <a routerLink="/" fragment="section-hall" class="btn-secondary-ila">
                  <i class="fa-solid fa-medal" style="color: var(--color-gold);"></i>
                  <span>Xem bảng vàng thành tích</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Slide 3: Không gian & Cơ sở hiện đại -->
        <div class="hero-slide" [class.active]="currentSlide() === 2">
          <img src="assets/images/campus/campus-phong-hoc-chat-luong-cao.jpg" alt="Không gian phòng học chuẩn quốc tế" class="hero-bg">
          <div class="hero-overlay"></div>
          <div class="container" style="height: 100%; display: flex; align-items: center;">
            <div class="hero-content">
              <div class="hero-tag">
                <i class="fa-solid fa-compass"></i> Hệ thống {{ branchCount() }} cơ sở tại P. Bình Phú, Q.6
              </div>
              <h1 class="hero-title">
                Không Gian Học Tập Chuẩn Mực<br>
                <span>Hiện Đại &amp; Khang Trang</span>
              </h1>
              <p class="hero-desc">
                Phòng học 100% máy lạnh, trang bị màn hình tương tác thông minh, bàn ghế công thái học chuẩn học đường và hệ thống chiếu sáng bảo vệ thị lực cho học sinh.
              </p>
              <div class="hero-actions">
                <a routerLink="/lien-he" class="btn-primary-ila btn-red">
                  <span>Khám phá cơ sở vật chất</span>
                </a>
                <a routerLink="/lien-he" class="btn-secondary-ila">
                  <i class="fa-solid fa-map-location-dot" style="color: var(--color-navy);"></i>
                  <span>Tra cứu vị trí {{ branchCount() }} cơ sở</span>
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- Slider Controls -->
      <div class="hero-controls">
        <button type="button" class="hero-btn-prev" aria-label="Slide trước" (click)="prevSlide()"><i class="fa-solid fa-chevron-left"></i></button>
        <button type="button" class="hero-btn-next" aria-label="Slide tiếp theo" (click)="nextSlide()"><i class="fa-solid fa-chevron-right"></i></button>
      </div>

      <div class="hero-dots">
        <div class="hero-dot" [class.active]="currentSlide() === 0" (click)="goToSlide(0)"></div>
        <div class="hero-dot" [class.active]="currentSlide() === 1" (click)="goToSlide(1)"></div>
        <div class="hero-dot" [class.active]="currentSlide() === 2" (click)="goToSlide(2)"></div>
      </div>
    </section>
  `
})
export class HeroBannerComponent implements OnInit, OnDestroy {
  private modalService = inject(ModalService);
  private branchService = inject(BranchService);

  currentSlide = signal<number>(0);
  branchCount = signal<number>(2);
  private timer: any = null;

  ngOnInit() {
    this.startAutoplay();
    this.branchService.getBranches().subscribe(data => {
      if (data && data.length > 0) {
        this.branchCount.set(data.length);
      }
    });
  }

  ngOnDestroy() {
    this.stopAutoplay();
  }

  startAutoplay() {
    this.stopAutoplay();
    if (typeof window !== 'undefined') {
      this.timer = setInterval(() => {
        this.nextSlide();
      }, 5000);
    }
  }

  stopAutoplay() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  prevSlide() {
    const prev = (this.currentSlide() - 1 + 3) % 3;
    this.currentSlide.set(prev);
  }

  nextSlide() {
    const next = (this.currentSlide() + 1) % 3;
    this.currentSlide.set(next);
  }

  goToSlide(idx: number) {
    this.currentSlide.set(idx);
  }

  openAssessment() {
    this.modalService.openAssessment();
  }

  openVideo() {
    this.modalService.openVideo();
  }
}

