import { Component, inject, OnInit, signal, computed, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FacultyService } from '../../core/services/faculty.service';
import { ModalService } from '../../core/services/modal.service';
import { Teacher } from '../../core/models/teacher.model';
import { FacultyHeader, SubjectCount } from '../../core/models/faculty.model';
import { LeadFormComponent } from '../../shared/components/lead-form/lead-form.component';

@Component({
  selector: 'app-faculty',
  standalone: true,
  imports: [CommonModule, RouterLink, LeadFormComponent],
  styles: [`
    .section-faculty {
      padding: 50px 0 90px;
      background: #FFFFFF;
    }
    .course-filter-bar {
      display: flex;
      gap: 12px;
      justify-content: center;
      flex-wrap: wrap;
      margin-bottom: 45px;
    }
    .course-tab-btn {
      background: #F8FAFC;
      color: #475569;
      border: 1px solid #E2E8F0;
      border-radius: 50px;
      padding: 10px 22px;
      font-size: 0.875rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .course-tab-btn:hover {
      background: #FFF1F2;
      color: #D81824;
      border-color: #FECDD3;
      transform: translateY(-2px);
    }
    .course-tab-btn.active {
      background: #D81824 !important;
      color: #FFFFFF !important;
      border-color: #D81824 !important;
      box-shadow: 0 4px 14px rgba(216, 24, 36, 0.25);
    }
    .faculty-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 30px;
    }
    .faculty-card {
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 16px rgba(15, 23, 42, 0.05);
      display: flex;
      flex-direction: column;
      transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
    }
    .faculty-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 12px 30px rgba(15, 23, 42, 0.12);
      border-color: #FECDD3;
    }
    .faculty-thumb-wrap {
      position: relative;
      height: 320px;
      background: #0F172A;
      overflow: hidden;
    }
    .faculty-thumb-wrap img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s ease;
    }
    .faculty-card:hover .faculty-thumb-wrap img {
      transform: scale(1.05);
    }
    .faculty-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(to top, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.5) 65%, transparent 100%);
      padding: 24px 18px 14px;
      color: #FFFFFF;
    }
    .faculty-pos {
      font-size: 0.8125rem;
      color: #FCA5A5;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.03em;
      display: block;
      margin-bottom: 2px;
    }
    .faculty-name {
      font-size: 1.25rem;
      font-weight: 800;
      margin: 0;
      color: #FFFFFF;
      line-height: 1.3;
    }
    .faculty-info {
      padding: 20px;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }
    .faculty-credentials {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-bottom: 16px;
      font-size: 0.875rem;
    }
    .credential-item {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      line-height: 1.45;
    }
    .credential-item i {
      color: #D81824;
      width: 18px;
      margin-top: 3px;
      flex-shrink: 0;
    }
    .credential-item span {
      color: #334155;
      font-weight: 500;
    }
    .credential-item:first-child span {
      color: #0F172A;
      font-weight: 700;
    }
    .faculty-quote {
      background: #FFF1F2;
      border-left: 3px solid #D81824;
      border-radius: 6px;
      padding: 10px 14px;
      margin-bottom: 20px;
      flex-grow: 1;
    }
    .faculty-quote p {
      font-size: 0.84375rem;
      color: #475569;
      line-height: 1.55;
      font-style: italic;
      margin: 0;
    }
    .btn-faculty-bio {
      width: 100%;
      height: 44px;
      border: 1px solid #0F172A;
      background: #0F172A;
      color: #FFFFFF;
      border-radius: 8px;
      font-size: 0.875rem;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      transition: all 0.2s ease;
    }
    .btn-faculty-bio:hover {
      background: #D81824;
      border-color: #D81824;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(216, 24, 36, 0.3);
    }
    .faculty-empty-state {
      text-align: center;
      padding: 60px 20px;
      color: #64748B;
    }
    .faculty-empty-state i {
      font-size: 3rem;
      margin-bottom: 12px;
      color: #CBD5E1;
    }
    .btn-reset-filter {
      margin-top: 12px;
      padding: 8px 18px;
      background: #D81824;
      color: #FFFFFF;
      border: none;
      border-radius: 50px;
      cursor: pointer;
      font-weight: 600;
      font-size: 0.875rem;
    }
  `],
  template: `
    <main>
      <!-- TẦNG 1: SUBPAGE HERO BANNER (Dữ liệu từ tbl_HomepageSection: SectionCode = 'FACULTY_HEADER') -->
      @if (header().isActive) {
        <section class="subpage-hero">
          <div class="container">
            <nav class="breadcrumb-wrapper" aria-label="breadcrumb">
              <ol class="breadcrumb-list">
                <li class="breadcrumb-item">
                  <a routerLink="/"><i class="fa-solid fa-house"></i> Trang chủ</a>
                </li>
                <li class="breadcrumb-separator">
                  <i class="fa-solid fa-chevron-right"></i>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  Ban giảng huấn
                </li>
              </ol>
            </nav>
            <div class="section-badge">
              <i class="fa-solid fa-chalkboard-user"></i> {{ header().subTitle }}
            </div>
            <h1 class="subpage-hero-title">
              {{ header().title }}
            </h1>
            <p class="subpage-hero-desc">
              {{ header().content }}
            </p>
          </div>
        </section>
      }

      <!-- 2. FACULTY FILTER & TEACHERS GRID -->
      <section class="section-faculty">
        <div class="container">

          <!-- Subject Filter Bar Render Dynamically -->
          <div class="course-filter-bar">
            <!-- Thẻ mặc định: Tất cả tổ bộ môn -->
            <button
              type="button"
              class="course-tab-btn"
              [class.active]="selectedSubject() === 'all'"
              (click)="setSubject('all')"
            >
              Tất cả tổ bộ môn ({{ totalTeachers() }})
            </button>

            <!-- Các thẻ bộ môn tiếp theo dựa trên danh sách Subject lấy từ DB -->
            @for (item of subjects(); track item.subject) {
              <button
                type="button"
                class="course-tab-btn"
                [class.active]="selectedSubject() === item.subject"
                (click)="setSubject(item.subject)"
              >
                {{ formatSubjectLabel(item.subject) }} ({{ item.count }})
              </button>
            }
          </div>

          <!-- Teachers Grid -->
          <div class="faculty-grid">
            @for (teacher of filteredTeachers(); track teacher.teacherId) {
              <div class="faculty-card">
                <!-- Avatar & Position Overlay -->
                <div class="faculty-thumb-wrap">
                  <img [src]="teacher.avatarUrl" [alt]="teacher.fullName" loading="lazy">
                  <div class="faculty-overlay">
                    <span class="faculty-pos">{{ teacher.position || teacher.subject }}</span>
                    <h3 class="faculty-name">{{ teacher.fullName }}</h3>
                  </div>
                </div>

                <!-- Teacher Details -->
                <div class="faculty-info">
                  <div class="faculty-credentials">
                    <div class="credential-item">
                      <i class="fa-solid fa-graduation-cap"></i>
                      <span>{{ teacher.academicDegree }}</span>
                    </div>
                    <div class="credential-item">
                      <i class="fa-solid fa-building-columns"></i>
                      <span>{{ teacher.graduatedUniversity }}</span>
                    </div>
                  </div>

                  <!-- Khối trích dẫn triết lý sư phạm -->
                  @if (teacher.teachingPhilosophy) {
                    <div class="faculty-quote">
                      <p>"{{ teacher.teachingPhilosophy }}"</p>
                    </div>
                  }

                  <!-- Nút Xem Tiểu Sử Giảng Huấn (Mở Modal chi tiết) -->
                  <button type="button" class="btn-faculty-bio" (click)="openBio(teacher)">
                    <i class="fa-solid fa-address-card"></i>
                    <span>Xem Tiểu Sử Giảng Huấn</span>
                  </button>
                </div>
              </div>
            }
          </div>

          <!-- Empty State -->
          @if (filteredTeachers().length === 0) {
            <div class="faculty-empty-state">
              <i class="fa-solid fa-user-slash"></i>
              <p>Hiện chưa có thông tin giáo viên cho bộ môn này.</p>
              <button type="button" class="btn-reset-filter" (click)="setSubject('all')">
                Xem tất cả giáo viên
              </button>
            </div>
          }

        </div>
      </section>

      <!-- 3. REGISTRATION SECTION -->
      <section class="section-registration" style="background:#0F172A; padding:80px 0; color:#FFFFFF;">
        <div class="container">
          <div style="max-width: 700px; margin: 0 auto; background: #1E293B; border: 1px solid #334155; border-radius: 20px; padding: 40px 32px; box-shadow: 0 20px 40px rgba(0,0,0,0.3);">
            <div style="text-align: center; margin-bottom: 24px;">
              <span class="section-badge" style="background:rgba(216,24,36,0.2); color:#FCA5A5; border-color:#D81824;">
                <i class="fa-solid fa-gift"></i> Đăng ký học thử cùng Thầy Cô
              </span>
              <h3 style="font-size: 1.5rem; font-weight: 800; color: #FFFFFF; margin-top: 8px;">
                Trải Nghiệm Lớp Học Trực Tiếp &bull; Kiểm Tra 1:1 Miễn Phí
              </h3>
              <p style="font-size: 0.875rem; color: #94A3B8; margin-top: 4px;">
                Kiểm tra năng lực cùng Thầy Cô ĐH Sư Phạm để xác định chính xác lộ trình cho con.
              </p>
            </div>
            <app-lead-form></app-lead-form>
          </div>
        </div>
      </section>
    </main>
  `
})
export class FacultyComponent implements OnInit {
  private facultyService = inject(FacultyService);
  private modalService = inject(ModalService);
  private cdr = inject(ChangeDetectorRef);

  header = signal<FacultyHeader>({
    subTitle: 'ĐỘI NGŨ SƯ PHẠM TINH HOA — TẬN TÂM ĐỒNG HÀNH',
    title: 'Ban Giảng Huấn SmartEdu',
    content: 'Quy tụ đội ngũ Thạc sĩ, Cử nhân Sư phạm xuất sắc từ Trường ĐH Sư Phạm TP.HCM, mang đến phương pháp giảng dạy hiện đại, kiên nhẫn bồi dưỡng tri thức và khơi nguồn đam mê học tập cho từng học sinh.',
    isActive: true
  });

  teachers = signal<Teacher[]>([]);
  subjects = signal<SubjectCount[]>([]);
  totalTeachers = signal<number>(0);
  selectedSubject = signal<string>('all');

  filteredTeachers = computed(() => {
    const sel = this.selectedSubject();
    const list = this.teachers();
    if (sel === 'all') {
      return list;
    }
    return list.filter(t => t.subject?.trim().toLowerCase() === sel.trim().toLowerCase());
  });

  ngOnInit() {
    // 1. Gọi API Header
    this.facultyService.getHeader().subscribe(h => {
      if (h) {
        this.header.set(h);
        this.cdr.markForCheck();
      }
    });

    // 2. Gọi API Teachers & Subjects
    this.facultyService.getTeachers().subscribe(res => {
      if (res) {
        this.teachers.set(res.teachers);
        this.subjects.set(res.subjects);
        this.totalTeachers.set(res.totalTeachers);
        this.cdr.markForCheck();
      }
    });
  }

  setSubject(subject: string) {
    this.selectedSubject.set(subject);
    this.cdr.markForCheck();
  }

  formatSubjectLabel(subject: string): string {
    if (!subject) return '';
    const s = subject.trim();
    if (s.toLowerCase().startsWith('bộ môn') || s.toLowerCase().includes('khoa học')) {
      return s;
    }
    return `Bộ môn ${s}`;
  }

  openBio(teacher: Teacher) {
    this.modalService.openFaculty(teacher);
  }
}
