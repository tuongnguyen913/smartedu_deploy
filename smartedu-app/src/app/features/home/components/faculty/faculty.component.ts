import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ModalService } from '../../../../core/services/modal.service';
import { TeacherService } from '../../../../core/services/teacher.service';
import { Teacher } from '../../../../core/models/teacher.model';

@Component({
  selector: 'app-faculty',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="section-faculty" id="section-faculty" style="display: block;">
      <div class="container">
        <div class="faculty-header-flex">
          <div style="max-width: 800px;">
            <div class="section-badge"><i class="fa-solid fa-graduation-cap"></i> Đội ngũ nhà giáo chuẩn mực</div>
            <h2 class="section-title" style="margin-bottom: 6px;">Hội Đồng <span>Ban Giảng Huấn</span></h2>
            <p class="section-subtitle" style="margin-bottom: 0;">100% giáo viên SmartEdu tốt nghiệp loại Giỏi/Xuất sắc từ ĐH Sư Phạm TP.HCM &amp; ĐH Khoa Học Tự Nhiên, giàu tâm huyết, chuyên môn vững vàng và tận tụy kèm cặp từng học trò.</p>
          </div>
          <div class="faculty-nav-controls">
            <button type="button" class="faculty-nav-arrow faculty-nav-prev" id="facultyScrollPrev" aria-label="Xem giảng viên trước" (click)="scrollPrev()">
              <i class="fa-solid fa-chevron-left"></i>
            </button>
            <button type="button" class="faculty-nav-arrow faculty-nav-next" id="facultyScrollNext" aria-label="Xem giảng viên tiếp theo" (click)="scrollNext()">
              <i class="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>

        <!-- Faculty Horizontal Scroll Track Wrapper -->
        <div class="faculty-scroll-wrapper in-view">
          <div class="faculty-scroll-track" id="facultyScrollTrack" #track>
            
            @for (teacher of featuredTeachers(); track teacher.teacherId) {
              <div class="faculty-card in-view">
                <div class="faculty-thumb-wrap">
                  <img [src]="teacher.avatarUrl" [alt]="teacher.fullName" loading="lazy">
                </div>
                <div class="faculty-info">
                  <span class="faculty-subject">{{ teacher.position || teacher.subject }}</span>
                  <h3 class="faculty-name">{{ teacher.fullName }}</h3>
                  
                  <!-- Trường đào tạo & Học vị (Bỏ số năm kinh nghiệm theo yêu cầu) -->
                  <div class="faculty-credentials" style="font-size: 0.8125rem; color: #D81824; font-weight: 600; margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
                    <i class="fa-solid fa-university"></i>
                    <span>{{ teacher.graduatedUniversity }} ({{ teacher.academicDegree }})</span>
                  </div>

                  <p class="faculty-desc">"{{ teacher.teachingPhilosophy }}"</p>
                  
                  <a href="javascript:void(0)" class="faculty-btn-bio" (click)="openBio(teacher)">
                    Xem hồ sơ giảng viên <i class="fa-solid fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            }

          </div>
        </div>

        <!-- Scroll Indicator Hint & CTA button linking to ban-giang-huan -->
        <div style="display: flex; flex-direction: column; align-items: center; gap: 16px; margin-top: 28px;">
          <div class="faculty-scroll-hint" style="display: flex; align-items: center; gap: 8px; font-size: 0.8125rem; color: var(--color-text-muted);">
            <i class="fa-solid fa-arrows-left-right" style="color: var(--color-primary);"></i>
            <span>Vuốt hoặc cuộn ngang để xem các Trưởng bộ môn</span>
          </div>

          <a routerLink="/ban-giang-huan" class="btn-primary-ila btn-red" style="padding: 14px 32px; font-size: 0.9375rem; border-radius: var(--radius-pill); box-shadow: 0 8px 20px rgba(216, 24, 36, 0.25); display: inline-flex; align-items: center; gap: 10px; text-decoration: none;">
            <span>Xem toàn bộ {{ totalTeachers() }} Giảng viên Sư Phạm</span>
            <i class="fa-solid fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </section>
  `
})
export class FacultyComponent implements OnInit {
  private modalService = inject(ModalService);
  private teacherService = inject(TeacherService);

  featuredTeachers = signal<Teacher[]>([]);
  totalTeachers = signal<number>(4);

  ngOnInit() {
    this.teacherService.getTeachers().subscribe(data => {
      this.totalTeachers.set(data.length);
      // Lấy đúng 4 giáo viên tiêu biểu theo yêu cầu
      const featured = data.filter(t => t.isFeatured);
      const top4 = featured.length >= 4 ? featured.slice(0, 4) : data.slice(0, 4);
      this.featuredTeachers.set(top4);
    });
  }

  openBio(teacher: Teacher) {
    this.modalService.openFaculty(teacher);
  }

  scrollPrev() {
    if (typeof document !== 'undefined') {
      const track = document.getElementById('facultyScrollTrack');
      if (track) track.scrollBy({ left: -340, behavior: 'smooth' });
    }
  }

  scrollNext() {
    if (typeof document !== 'undefined') {
      const track = document.getElementById('facultyScrollTrack');
      if (track) track.scrollBy({ left: 340, behavior: 'smooth' });
    }
  }
}
