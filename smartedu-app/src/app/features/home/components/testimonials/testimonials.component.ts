import { Component } from '@angular/core';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  template: `
    <section class="section-testimonials" id="section-testimonials">
      <div class="container">
        <div class="section-header">
          <div class="section-badge"><i class="fa-solid fa-heart"></i> Lòng tin yêu từ phụ huynh</div>
          <h2 class="section-title">Phụ Huynh Nói Gì Về <span>SmartEdu</span></h2>
          <p class="section-subtitle">Sự tiến bộ rõ rệt và sự tự giác học tập mỗi ngày của con là niềm hạnh phúc lớn nhất mà SmartEdu mang lại cho mỗi gia đình.</p>
        </div>

        <div class="testimonials-grid">
          
          <div class="testimonial-card">
            <div class="testi-stars">
              <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
            </div>
            <p class="testi-quote">"Nhờ thầy cô SmartEdu kèm 1:1 môn Toán mà con từ một đứa sợ môn Toán đã tự tin đạt 9.2 điểm trong kỳ thi Tuyển sinh 10. Sự tận tâm của thầy Tùng khiến gia đình tôi vô cùng biết ơn."</p>
            <div class="testi-author">
              <div class="testi-avatar">CA</div>
              <div class="testi-info">
                <h5>Chị Chu Diệp Anh</h5>
                <span>Phụ huynh bé Gia Hân &bull; Lớp 9 lên 10</span>
              </div>
            </div>
          </div>

          <div class="testimonial-card">
            <div class="testi-stars">
              <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
            </div>
            <p class="testi-quote">"Môi trường học rất nề nếp và văn minh. Thầy cô báo cáo tình hình học tập hàng tuần chi tiết, bé đi học về rất vui vẻ và biết tự giác ngồi vào bàn làm bài tập mà không cần nhắc nhở."</p>
            <div class="testi-author">
              <div class="testi-avatar">LN</div>
              <div class="testi-info">
                <h5>Anh Lê Hoài Nam</h5>
                <span>Phụ huynh bé Minh Khôi &bull; Lớp 7</span>
              </div>
            </div>
          </div>

          <div class="testimonial-card">
            <div class="testi-stars">
              <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
            </div>
            <p class="testi-quote">"Khóa luyện thi Đánh giá năng lực của trung tâm rất sát với cấu trúc đề thực tế. Các phương pháp giải nhanh trắc nghiệm giúp con tiết kiệm được nhiều thời gian làm bài thi."</p>
            <div class="testi-author">
              <div class="testi-avatar">TH</div>
              <div class="testi-info">
                <h5>Chị Trịnh Thị Hương</h5>
                <span>Phụ huynh bé Bảo Ngọc &bull; Lớp 12</span>
              </div>
            </div>
          </div>

          <div class="testimonial-card">
            <div class="testi-stars">
              <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
            </div>
            <p class="testi-quote">"Cơ sở vật chất ở cơ sở Chợ Lớn rất mới và đẹp, phòng máy lạnh mát mẻ, bàn ghế chuẩn nên con ngồi học không bị gù lưng. Học phí rất hợp lý so với chất lượng nhận được."</p>
            <div class="testi-author">
              <div class="testi-avatar">LH</div>
              <div class="testi-info">
                <h5>Chị Lê Thị Hoài</h5>
                <span>Phụ huynh bé Tuấn Kiệt &bull; Lớp 6</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  `
})
export class TestimonialsComponent {}

