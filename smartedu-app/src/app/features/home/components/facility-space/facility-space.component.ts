import { Component, inject, OnInit, signal } from '@angular/core';
import { BranchService } from '../../../../core/services/branch.service';
import { Branch } from '../../../../core/models/branch.model';

@Component({
  selector: 'app-facility-space',
  standalone: true,
  template: `
    <section class="section-space-powers" id="section-space">
      <div class="container">
        <div class="section-header">
          <div class="section-badge"><i class="fa-solid fa-school"></i> Môi trường giáo dục văn minh</div>
          <h2 class="section-title">Không Gian Học Tập <span>Chuẩn Mực Sư Phạm</span></h2>
          <p class="section-subtitle">Được đầu tư bài bản với trang thiết bị giảng dạy tương tác tiên tiến, mang lại sự tiện nghi và bảo vệ tối đa sức khỏe học đường.</p>
        </div>

        <div class="space-gallery-slider">
          <div class="space-card">
            <img src="assets/images/campus/campus-phong-hoc-chat-luong-cao.jpg" alt="Phòng học chất lượng cao">
            <div class="space-overlay">
              <h4>Phòng Học Tiêu Chuẩn 10–15 Học Sinh</h4>
              <p>Trang bị máy lạnh 100%, máy chiếu tương tác và bảng chống lóa bảo vệ mắt.</p>
            </div>
          </div>

          @for (b of branches(); track b.branchId) {
            <div class="space-card">
              <img [src]="b.imageUrl || (b.branchId === 1 ? 'assets/images/campus/campus-co-so-moi-khai-truong.jpg' : 'assets/images/campus/campus-co-so-2-cho-lon.jpg')" [alt]="b.branchName">
              <div class="space-overlay">
                <h4>{{ b.branchName }} &mdash; {{ b.address.split(',')[0] }}</h4>
                <p>Địa chỉ: {{ b.address }}. Giờ mở cửa: {{ b.workingHours || '07:30 - 21:00' }}.</p>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `
})
export class FacilitySpaceComponent implements OnInit {
  private branchService = inject(BranchService);
  branches = signal<Branch[]>([]);

  ngOnInit() {
    this.branchService.getBranches().subscribe(data => {
      if (data && data.length > 0) {
        this.branches.set(data);
      }
    });
  }
}
