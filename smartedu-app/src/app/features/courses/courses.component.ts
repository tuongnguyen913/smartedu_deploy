import { Component, inject, OnInit, signal, ChangeDetectorRef, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CourseService } from '../../core/services/course.service';
import { ModalService } from '../../core/services/modal.service';
import { PageHeader } from '../../core/models/page-header.model';
import { Course, CourseCategoryTab } from '../../core/models/course.model';
import { LeadFormComponent } from '../../shared/components/lead-form/lead-form.component';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, RouterLink, LeadFormComponent],
  styles: [`
    .section-courses-main {
      padding: 50px 0 90px;
      background: #FFFFFF;
    }
    .course-tabs,
    .course-filter-bar {
      display: flex;
      gap: 12px;
      justify-content: center;
      flex-wrap: wrap;
      margin-bottom: 45px;
    }
    .course-tabs button,
    .course-tab-btn {
      background: #F8FAFC;
      color: #475569;
      border: 1px solid #E2E8F0;
      border-radius: 50px;
      padding: 10px 24px;
      font-size: 0.875rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .course-tabs button:hover,
    .course-tab-btn:hover {
      background: #FFF1F2;
      color: #D81824;
      border-color: #FECDD3;
      transform: translateY(-2px);
    }
    .course-tabs button.active,
    .course-tab-btn.active {
      background: #D81824 !important;
      color: #FFFFFF !important;
      border-color: #D81824 !important;
      box-shadow: 0 4px 14px rgba(216, 24, 36, 0.25);
    }
    .courses-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 30px;
    }
    .course-card {
      border: 1px solid #E2E8F0;
      border-radius: 16px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      background: #FFFFFF;
      box-shadow: 0 4px 16px rgba(15, 23, 42, 0.05);
      transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
    }
    .course-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 12px 30px rgba(15, 23, 42, 0.12);
      border-color: #FECDD3;
    }
    .course-thumb {
      position: relative;
      height: 220px;
      overflow: hidden;
      background: #0F172A;
    }
    .course-thumb img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s ease;
    }
    .course-card:hover .course-thumb img {
      transform: scale(1.05);
    }
    .course-badge-wrap {
      position: absolute;
      top: 14px;
      left: 14px;
      display: flex;
      gap: 8px;
    }
    .badge-grade {
      background: #D81824;
      color: #FFFFFF;
      font-size: 0.75rem;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 4px;
    }
    .badge-guarantee {
      background: #0F172A;
      color: #FFFFFF;
      font-size: 0.75rem;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 4px;
    }
    .course-content {
      padding: 24px;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }
    .course-subject {
      font-size: 0.8125rem;
      font-weight: 700;
      color: #D81824;
      margin-bottom: 8px;
      text-transform: uppercase;
      letter-spacing: 0.02em;
    }
    .course-title {
      font-size: 1.2rem;
      font-weight: 800;
      color: #0F172A;
      line-height: 1.4;
      margin: 0 0 12px;
    }
    .course-desc {
      font-size: 0.875rem;
      color: #64748B;
      line-height: 1.6;
      margin-bottom: 18px;
      flex-grow: 1;
    }
    .course-meta {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding-top: 14px;
      border-top: 1px solid #F1F5F9;
      margin-bottom: 20px;
      font-size: 0.8125rem;
      color: #475569;
    }
    .course-meta-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .course-meta-row i {
      color: #D81824;
      width: 18px;
      flex-shrink: 0;
    }
    .btn-register-course {
      flex: 1;
      height: 44px;
      background: #D81824;
      color: #FFFFFF;
      border: 1px solid #D81824;
      border-radius: 8px;
      font-size: 0.875rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .btn-register-course:hover {
      background: #B91C1C;
      border-color: #B91C1C;
      box-shadow: 0 4px 12px rgba(216, 24, 36, 0.3);
    }
    .btn-detail,
    .btn-detail-course {
      height: 44px;
      padding: 0 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.875rem;
      border: 1px solid #CBD5E1;
      border-radius: 8px;
      text-decoration: none;
      color: #0F172A;
      font-weight: 600;
      transition: all 0.2s ease;
    }
    .btn-detail:hover,
    .btn-detail-course:hover {
      background: #F8FAFC;
      border-color: #94A3B8;
    }
  `],
  template: `
    <main>
      <!-- TẦNG 1: SUBPAGE HERO BANNER (Query từ tbl_HomepageSection: SectionCode = 'COURSE_HEADER') -->
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
                  Chương trình đào tạo
                </li>
              </ol>
            </nav>
            <div class="section-badge">
              <i class="fa-solid fa-book-open"></i> {{ header().subTitle }}
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

      <!-- TẦNG 2 & 3: CATEGORY TABS & COURSES GRID -->
      <section class="section-courses-main">
        <div class="container">
          <!-- Tầng 2: Grade Level & Module Filter Tabs -->
          <div class="course-tabs">
            <button type="button" class="course-tab-btn" [class.active]="selectedTab() === 'ALL'" (click)="filterTab('ALL')">Tất cả chương trình</button>
            <button type="button" class="course-tab-btn" [class.active]="selectedTab() === 'Cap2'" (click)="filterTab('Cap2')">KHỐI THCS (LỚP 6 - 9)</button>
            <button type="button" class="course-tab-btn" [class.active]="selectedTab() === 'ChuyenCap'" (click)="filterTab('ChuyenCap')">KHỐI TUYỂN SINH 10 & CHUYÊN</button>
            <button type="button" class="course-tab-btn" [class.active]="selectedTab() === 'Cap3'" (click)="filterTab('Cap3')">KHỐI THPT & LUYỆN THI ĐẠI HỌC</button>
          </div>

          <!-- Tầng 3: Courses Cards Grid -->
          <div class="courses-grid">
            @for (course of displayedCourses(); track course.courseId) {
              <div class="course-card">
                <a [routerLink]="['/chuong-trinh-hoc', course.slug]" class="course-thumb" style="display:block; text-decoration:none;">
                  <img [src]="course.thumbnailUrl || 'assets/images/lop-cap2.png'" [alt]="course.courseName">
                  <div class="course-badge-wrap">
                    <span class="badge-grade">
                      {{ course.grade || formatGradeLabel(course.gradeLevel) }}
                    </span>
                  </div>
                </a>

                <div class="course-content">
                  <div class="course-subject">
                    <i class="fa-solid fa-graduation-cap"></i> {{ course.subject }}
                  </div>
                  <h3 class="course-title">
                    <a [routerLink]="['/chuong-trinh-hoc', course.slug]" style="text-decoration:none; color:inherit;">
                      {{ course.courseName }}
                    </a>
                  </h3>
                  <p class="course-desc">
                    {{ course.shortDescription }}
                  </p>

                  <div class="course-meta">
                    <div class="course-meta-row">
                      <i class="fa-solid fa-users"></i>
                      <span>Sĩ số: <strong>Tối đa {{ course.classSizeMax || 15 }} học sinh / lớp</strong></span>
                    </div>
                    <div class="course-meta-row">
                      <i class="fa-solid fa-clock"></i>
                      <span>Lịch học: <strong>{{ course.scheduleSummary || '2–3 buổi / tuần' }}</strong></span>
                    </div>
                    @if (course.tuitionFee && course.tuitionFee > 0) {
                      <div class="course-meta-row">
                        <i class="fa-solid fa-receipt"></i>
                        <span>Học phí: <strong>{{ course.tuitionFee | number }}đ {{ course.tuitionPeriod ? '/' + course.tuitionPeriod : '/ tháng' }}</strong></span>
                      </div>
                    }
                    <div class="course-meta-row">
                      <i class="fa-solid fa-shield-halved"></i>
                      <span>Cam kết: <strong>Hoàn phí 100% nếu không tiến bộ</strong></span>
                    </div>
                  </div>

                  <div style="display: flex; gap: 10px; margin-top: auto;">
                    <button type="button" class="btn-register-course" (click)="openAssessment(course.courseName)">
                      <span>Đăng Ký Học Thử</span>
                    </button>
                    <a [routerLink]="['/chuong-trinh-hoc', course.slug]" class="btn-detail">
                      Chi Tiết
                    </a>
                  </div>
                </div>
              </div>
            }
          </div>

          @if (displayedCourses().length === 0) {
            <div style="text-align: center; padding: 60px 20px; color: #64748B;">
              <i class="fa-solid fa-graduation-cap" style="font-size: 3rem; color: #CBD5E1; margin-bottom: 12px; display: block;"></i>
              <p>Hiện chưa có khóa học riêng cho nhóm này.</p>
              <button type="button" class="course-tab-btn active" style="margin-top: 10px;" (click)="filterTab('ALL')">
                Xem tất cả chương trình
              </button>
            </div>
          }

          <!-- SYLLABUS ACCORDION (3 GIAI ĐOẠN ĐÀO TẠO) -->
          <div class="syllabus-section" style="margin-top: 80px; padding-top: 60px; border-top: 1px solid #E2E8F0;">
            <div class="section-header" style="text-align: center; margin-bottom: 40px;">
              <div class="section-badge"><i class="fa-solid fa-list-check"></i> Phương pháp đào tạo</div>
              <h2 class="section-title">Lộ Trình Đào Tạo <span>3 Giai Đoạn Bứt Phá</span></h2>
              <p class="section-subtitle">Mỗi chuyên đề được thiết kế tinh giản, trọng tâm, xóa tan nỗi sợ hổng kiến thức cho học sinh.</p>
            </div>

            <div class="accordion-wrapper" style="max-width: 860px; margin: 0 auto; display: flex; flex-direction: column; gap: 16px;">
              <div class="accordion-item" style="border: 1px solid #E2E8F0; border-radius: 12px; overflow: hidden; background: #FFFFFF;">
                <div class="accordion-header" style="padding: 20px 24px; background: #F8FAFC; display: flex; justify-content: space-between; align-items: center; cursor: pointer;" (click)="toggleAccordion(1)">
                  <div style="display: flex; align-items: center; gap: 14px;">
                    <span style="width: 32px; height: 32px; border-radius: 50%; background: #0F172A; color: #FFFFFF; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.875rem;">01</span>
                    <h4 style="margin: 0; font-size: 1.05rem; font-weight: 700; color: #0F172A;">Giai Đoạn 1: Rà Soát Lỗ Hổng &amp; Lấy Lại Căn Bản (4–6 Tuần Đầu)</h4>
                  </div>
                  <i class="fa-solid" [class.fa-chevron-down]="openAccordion() !== 1" [class.fa-chevron-up]="openAccordion() === 1" style="color: #64748B;"></i>
                </div>
                @if (openAccordion() === 1) {
                  <div class="accordion-body" style="padding: 20px 24px; font-size: 0.9375rem; color: #475569; line-height: 1.6; border-top: 1px solid #E2E8F0;">
                    Giáo viên tiến hành kiểm tra 1:1, xác định chính xác những phần kiến thức học sinh bị hổng từ năm học trước. Lớp học củng cố định nghĩa, công thức cốt lõi và bài tập mẫu cơ bản. Thầy cô kèm riêng miễn phí nếu học sinh chưa theo kịp.
                  </div>
                }
              </div>

              <div class="accordion-item" style="border: 1px solid #E2E8F0; border-radius: 12px; overflow: hidden; background: #FFFFFF;">
                <div class="accordion-header" style="padding: 20px 24px; background: #F8FAFC; display: flex; justify-content: space-between; align-items: center; cursor: pointer;" (click)="toggleAccordion(2)">
                  <div style="display: flex; align-items: center; gap: 14px;">
                    <span style="width: 32px; height: 32px; border-radius: 50%; background: #0F172A; color: #FFFFFF; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.875rem;">02</span>
                    <h4 style="margin: 0; font-size: 1.05rem; font-weight: 700; color: #0F172A;">Giai Đoạn 2: Tăng Tốc Kỹ Năng &amp; Giải Bài Toán Thực Tế (Học Kỳ 1 &amp; 2)</h4>
                  </div>
                  <i class="fa-solid" [class.fa-chevron-down]="openAccordion() !== 2" [class.fa-chevron-up]="openAccordion() === 2" style="color: #64748B;"></i>
                </div>
                @if (openAccordion() === 2) {
                  <div class="accordion-body" style="padding: 20px 24px; font-size: 0.9375rem; color: #475569; line-height: 1.6; border-top: 1px solid #E2E8F0;">
                    Bám sát tiến độ SGK mới (Chân trời sáng tạo, Cánh diều, Kết nối tri thức). Đi sâu vào các dạng bài vận dụng và vận dụng cao chiếm 30% cấu trúc đề thi chính thức của Sở GD&ĐT TP.HCM. Rèn luyện kỹ năng đọc hiểu đề bài dài và phân tích số liệu thực tế.
                  </div>
                }
              </div>

              <div class="accordion-item" style="border: 1px solid #E2E8F0; border-radius: 12px; overflow: hidden; background: #FFFFFF;">
                <div class="accordion-header" style="padding: 20px 24px; background: #F8FAFC; display: flex; justify-content: space-between; align-items: center; cursor: pointer;" (click)="toggleAccordion(3)">
                  <div style="display: flex; align-items: center; gap: 14px;">
                    <span style="width: 32px; height: 32px; border-radius: 50%; background: #0F172A; color: #FFFFFF; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.875rem;">03</span>
                    <h4 style="margin: 0; font-size: 1.05rem; font-weight: 700; color: #0F172A;">Giai Đoạn 3: Luyện Đề Thi Thử Chuẩn Sở &amp; Bứt Phá Điểm 9-10 (Nước Rút)</h4>
                  </div>
                  <i class="fa-solid" [class.fa-chevron-down]="openAccordion() !== 3" [class.fa-chevron-up]="openAccordion() === 3" style="color: #64748B;"></i>
                </div>
                @if (openAccordion() === 3) {
                  <div class="accordion-body" style="padding: 20px 24px; font-size: 0.9375rem; color: #475569; line-height: 1.6; border-top: 1px solid #E2E8F0;">
                    Tổ chức các kỳ thi thử mô phỏng 100% điều kiện phòng thi thật (canh giờ nghiêm ngặt, rọc phách chấm chéo). Giúp học sinh làm quen áp lực thời gian, khắc phục lỗi mất điểm ngớ ngẩn và tối ưu hóa điểm số nguyện vọng 1.
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- REGISTRATION SECTION -->
      <section class="section-registration" style="background:#0F172A; padding:80px 0; color:#FFFFFF;">
        <div class="container">
          <div style="max-width: 700px; margin: 0 auto; background: #1E293B; border: 1px solid #334155; border-radius: 20px; padding: 40px 32px; box-shadow: 0 20px 40px rgba(0,0,0,0.3);">
            <div style="text-align: center; margin-bottom: 24px;">
              <span class="section-badge" style="background:rgba(216,24,36,0.2); color:#FCA5A5; border-color:#D81824;"><i class="fa-solid fa-gift"></i> Đồng hành cùng con</span>
              <h3 style="font-size: 1.5rem; font-weight: 800; color: #FFFFFF; margin-top: 8px;">Đăng Ký Đánh Giá Năng Lực &amp; Học Thử 02 Buổi 0đ</h3>
              <p style="font-size: 0.875rem; color: #94A3B8; margin-top: 4px;">Kiểm tra miễn phí 1:1 cùng Thầy Cô ĐH Sư Phạm để tìm đúng lỗ hổng và xây lộ trình chuẩn.</p>
            </div>
            <app-lead-form></app-lead-form>
          </div>
        </div>
      </section>
    </main>
  `
})
export class CoursesComponent implements OnInit {
  private courseService = inject(CourseService);
  private modalService = inject(ModalService);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);

  header = signal<PageHeader>({
    subTitle: 'LỘ TRÌNH CÁ NHÂN HÓA',
    title: 'Chương Trình Bồi Dưỡng Chất Lượng Cao',
    content: 'Hệ thống chương trình chuẩn mực từ Lớp 6 đến Lớp 12 và Luyện thi Tuyển sinh 10. 100% giáo viên ĐH Sư Phạm TP.HCM giảng dạy, kèm 1:1 miễn phí ngoài giờ.',
    isActive: true
  });

  allCourses = signal<Course[]>([]);
  displayedCourses = signal<Course[]>([]);
  selectedTab = signal<string>('ALL');
  openAccordion = signal<number>(1);

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['cap']) {
        const raw = (params['cap'] || '').toLowerCase();
        if (raw === 'cap2') this.filterTab('Cap2');
        else if (raw === 'chuyencap' || raw === 'tuyensinh10') this.filterTab('ChuyenCap');
        else if (raw === 'cap3') this.filterTab('Cap3');
        else this.filterTab('ALL');
      }
    });

    this.courseService.getHeader().subscribe(h => {
      if (h) {
        this.header.set(h);
        this.cdr.markForCheck();
      }
    });

    this.courseService.getCoursesList().subscribe(res => {
      if (res && res.courses && res.courses.length > 0) {
        this.allCourses.set(res.courses);
        this.filterTab(this.selectedTab());
        this.cdr.markForCheck();
      }
    });
  }

  filterTab(tabKey: string) {
    this.selectedTab.set(tabKey);
    if (tabKey === 'ALL') {
      this.displayedCourses.set(this.allCourses());
    } else {
      this.displayedCourses.set(
        this.allCourses().filter(c => {
          if (!c.gradeLevel) return false;
          if (c.gradeLevel === tabKey || c.gradeLevel.toLowerCase() === tabKey.toLowerCase()) {
            return true;
          }
          if (tabKey === 'ChuyenCap' && (c.gradeLevel.toLowerCase() === 'chuyencap' || c.gradeLevel.toLowerCase() === 'tuyensinh10')) {
            return true;
          }
          return false;
        })
      );
    }
    this.cdr.markForCheck();
  }

  selectTab(tabKey: string) {
    this.filterTab(tabKey);
  }

  setFilter(filter: string) {
    this.filterTab(filter);
  }

  toggleAccordion(index: number) {
    this.openAccordion.update(curr => (curr === index ? 0 : index));
    this.cdr.markForCheck();
  }

  openAssessment(courseName?: string) {
    this.modalService.openAssessment(courseName);
  }

  formatGradeLabel(gradeLevel?: string): string {
    switch ((gradeLevel || '').toLowerCase()) {
      case 'cap2': return 'Lớp 6 - Lớp 9';
      case 'chuyencap':
      case 'tuyensinh10': return 'Lớp 9';
      case 'cap3': return 'Lớp 10 - Lớp 12';
      default: return 'Lớp 6 - Lớp 9';
    }
  }
}
