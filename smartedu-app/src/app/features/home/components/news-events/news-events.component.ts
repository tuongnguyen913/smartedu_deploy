import { Component, inject } from '@angular/core';
import { ModalService } from '../../../../core/services/modal.service';

@Component({
  selector: 'app-news-events',
  standalone: true,
  template: `
    <section class="section-multimedia" id="section-multimedia">
      <div class="container">
        <div class="section-header">
          <div class="section-badge"><i class="fa-solid fa-video"></i> Multimedia &amp; Hoạt động thực tế</div>
          <h2 class="section-title">Khoảnh Khắc <span>Lớp Học Hứng Khởi</span></h2>
          <p class="section-subtitle">Tận mắt chứng kiến bầu không khí học tập sôi nổi, tương tác chủ động và niềm say mê khám phá tri thức của học sinh SmartEdu.</p>
        </div>

        <div class="multimedia-layout">
          <!-- Featured Big Video Player -->
          <div class="video-hero-card">
            <div class="video-player-box">
              <video id="heroClassVideo" poster="assets/images/hero-lop-hoc.jpg" preload="none">
                <source src="assets/video/video-lop-hoc.mp4" type="video/mp4">
              </video>
              <div class="video-play-overlay open-video-modal" id="btnPlayMainVideo" (click)="openVideo()">
                <div class="video-play-btn"><i class="fa-solid fa-play"></i></div>
              </div>
            </div>
            <div class="video-hero-body">
              <h3>Một ngày học tập đầy niềm vui tại SmartEdu Academy</h3>
              <p>Mỗi tiết học tại SmartEdu là một hành trình khơi mở tư duy, nơi học sinh tự tin phát biểu, thảo luận nhóm và làm chủ kiến thức bài học.</p>
            </div>
          </div>

          <!-- Side Highlights List (ILA style) -->
          <div class="multimedia-side-list">
            
            <div class="multimedia-side-item open-video-modal" (click)="openVideo()">
              <div class="side-item-thumb">
                <img src="assets/images/students/students-phuong-phap-hoc-toan.jpg" alt="Phương pháp học Toán tư duy">
                <i class="fa-solid fa-play"></i>
              </div>
              <div class="side-item-info">
                <h4>Phương pháp học Toán không sợ hãi: Hiểu bản chất, không học vẹt</h4>
                <span><i class="fa-solid fa-eye"></i> 1,420 lượt xem &bull; Chuyên đề Toán</span>
              </div>
            </div>

            <div class="multimedia-side-item open-video-modal" (click)="openVideo()">
              <div class="side-item-thumb">
                <img src="assets/images/students/students-chinh-phuc-lop-10.jpg" alt="Workshop luyện thi vào 10">
                <i class="fa-solid fa-play"></i>
              </div>
              <div class="side-item-info">
                <h4>Workshop: Giải mã cấu trúc đề thi Tuyển sinh 10 môn Toán &amp; Văn</h4>
                <span><i class="fa-solid fa-eye"></i> 2,890 lượt xem &bull; Luyện thi 10</span>
              </div>
            </div>

            <div class="multimedia-side-item open-video-modal" (click)="openVideo()">
              <div class="side-item-thumb">
                <img src="assets/images/students/students-su-kien-giang-sinh.jpg" alt="Lễ hội &amp; Hoạt động ngoại khóa">
                <i class="fa-solid fa-play"></i>
              </div>
              <div class="side-item-info">
                <h4>Hoạt động ngoại khóa &amp; Lễ vinh danh khen thưởng học kỳ I</h4>
                <span><i class="fa-solid fa-eye"></i> 980 lượt xem &bull; Đời sống học đường</span>
              </div>
            </div>

            <div class="multimedia-side-item open-video-modal" (click)="openVideo()">
              <div class="side-item-thumb">
                <img src="assets/images/campus/campus-co-so-moi-khai-truong.jpg" alt="Khai trương cơ sở mới">
                <i class="fa-solid fa-play"></i>
              </div>
              <div class="side-item-info">
                <h4>Khai trương Cơ sở 2 - Đường Chợ Lớn: Nâng tầm trải nghiệm học tập</h4>
                <span><i class="fa-solid fa-eye"></i> 3,150 lượt xem &bull; Tin tức SmartEdu</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  `
})
export class NewsEventsComponent {
  private modalService = inject(ModalService);

  openVideo() {
    this.modalService.openVideo();
  }
}

