import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { ModalService } from '../../../../core/services/modal.service';
import { BranchService } from '../../../../core/services/branch.service';
import { ContactService } from '../../../../core/services/contact.service';
import { Branch } from '../../../../core/models/branch.model';

@Component({
  selector: 'app-course-filter',
  standalone: true,
  template: `
    <!-- ==========================================================================
         4. ILA CHOOSE-COURSE (FLOATING QUICK FILTER BAR)
         ========================================================================== -->
    <div class="container choose-course-wrapper">
      <div class="choose-course-card">
        <div class="choose-course-body">
          <div class="choose-course-header">
            <h3><i class="fa-solid fa-magnifying-glass" style="color: var(--color-primary); margin-right: 6px;"></i> Tìm Khóa Học Phù Hợp Với Con Bạn Tại SmartEdu</h3>
            <p>Chọn cấp học và môn học để được tư vấn lộ trình bứt phá điểm số tối ưu nhất</p>
          </div>
          <form class="choose-course-form" (submit)="$event.preventDefault()">
            <!-- Cấp học -->
            <div class="filter-select-group">
              <i class="fa-solid fa-graduation-cap select-icon"></i>
              <select class="filter-select" id="quickFilterLevel" [value]="filterLevel()" (change)="onLevelChange($event)">
                <option value="all">Tất cả cấp học</option>
                <option value="cap2">THCS (Lớp 6 - 9)</option>
                <option value="tuyensinh10">Luyện thi Tuyển sinh 10</option>
                <option value="cap3">THPT (Lớp 10 - 12)</option>
              </select>
            </div>

            <!-- Môn học -->
            <div class="filter-select-group">
              <i class="fa-solid fa-book select-icon"></i>
              <select class="filter-select" id="quickFilterSubject" [value]="filterSubject()" (change)="onSubjectChange($event)">
                <option value="all">Tất cả môn học</option>
                <option value="toan">Toán học Tư duy</option>
                <option value="van">Ngữ văn &amp; Rèn chữ</option>
                <option value="anh">Tiếng Anh Học thuật</option>
                <option value="ly">Vật lý</option>
                <option value="hoa">Hóa học</option>
                <option value="khtn">Khoa học tự nhiên</option>
              </select>
            </div>

            <!-- Cơ sở -->
            <div class="filter-select-group">
              <i class="fa-solid fa-location-dot select-icon"></i>
              <select class="filter-select" id="quickFilterCampus">
                @for (b of branches(); track b.branchId; let i = $index) {
                  <option [value]="'cs' + b.branchId">CS{{ i + 1 }}: {{ b.address.split(',')[0] }}</option>
                }
              </select>
            </div>

            <!-- Action Button -->
            <button type="button" class="btn-register btn-red" id="btnQuickCourseFilter" (click)="applyQuickFilter()">
              <span>Tìm khóa học <i class="fa-solid fa-arrow-right"></i></span>
            </button>
          </form>
        </div>

        <!-- Right Side Badge Block (ILA style) -->
        <div class="choose-course-badge-side">
          <i class="fa-solid fa-certificate"></i>
          <span class="big-num counter-value" data-target="100%">100%</span>
          <span class="label">Giảng Viên Sư Phạm</span>
        </div>
      </div>
    </div>

    <!-- ==========================================================================
         5. SECTION COURSES SHOWCASE (ILA EXACT CARDS & TAB FILTERING)
         ========================================================================== -->
    <section class="section-courses" id="section-courses">
      <div class="container">
        <div class="section-header">
          <div class="section-badge"><i class="fa-solid fa-book-bookmark"></i> Lộ trình đào tạo xuyên suốt</div>
          <h2 class="section-title">Chương Trình Bồi Dưỡng <span>Chất Lượng Cao</span></h2>
          <p class="section-subtitle">Phương pháp sư phạm tích cực, rèn luyện tư duy tự chủ, cá nhân hóa lộ trình cho từng học sinh để đạt kết quả học tập vượt bậc.</p>
        </div>

        <!-- Filter Tabs -->
        <div class="courses-tabs-nav">
          <button type="button" class="course-tab-btn" [class.active]="activeTab() === 'all'" (click)="setTab('all')">Tất cả chương trình</button>
          <button type="button" class="course-tab-btn" [class.active]="activeTab() === 'cap2'" (click)="setTab('cap2')">THCS (Lớp 6-9)</button>
          <button type="button" class="course-tab-btn" [class.active]="activeTab() === 'tuyensinh10'" (click)="setTab('tuyensinh10')">Luyện thi vào 10</button>
          <button type="button" class="course-tab-btn" [class.active]="activeTab() === 'cap3'" (click)="setTab('cap3')">THPT (Lớp 10-12)</button>
        </div>

        <!-- Courses Grid: Đúng 3 khối/card chính -->
        <div class="courses-grid" id="coursesGrid">
          
          <!-- Course Card 1: THCS Lớp 6-9 -->
          <div class="course-item-card" data-level="cap2" data-subject="toan van anh" [style.display]="isCardVisible('cap2', 'toan van anh') ? 'flex' : 'none'">
            <div class="course-card-thumb">
              <img src="assets/images/students/students-khoi-cap-2-lop-7.jpg" alt="Toán - Văn - Anh THCS" loading="lazy">
              <span class="course-badge-pill"><i class="fa-solid fa-star"></i> Trọng điểm</span>
            </div>
            <div class="course-card-main">
              <div class="course-card-meta">
                <span class="course-subject-tag"><i class="fa-solid fa-book"></i> THCS Lớp 6 - 9</span>
                <button type="button" class="learn-more open-assessment-modal" (click)="openAssessment('Khối THCS (Lớp 6-8)')">
                  <span class="circle"><i class="icon arrow"></i></span>
                  <span class="button-text">Khám phá</span>
                </button>
              </div>
              <h3 class="course-card-title"><a href="javascript:void(0)" class="open-assessment-modal" (click)="openAssessment('Khối THCS (Lớp 6-8)')">Bồi Dưỡng Toàn Diện Toán – Văn – Anh (Lớp 6–9)</a></h3>
              <p class="course-card-desc">Bám sát chương trình GDPT mới, củng cố kiến thức gốc, trang bị phương pháp giải toán hình học và kỹ năng viết bài văn nghị luận.</p>
              <div class="course-card-specs">
                <div class="spec-item"><i class="fa-solid fa-clock"></i> 2 buổi/môn/tuần</div>
                <div class="spec-item"><i class="fa-solid fa-chart-line"></i> Báo cáo tuần cho PH</div>
              </div>
              <div class="course-card-footer">
                <button type="button" class="btn-primary-ila btn-red open-assessment-modal" style="width: 100%;" (click)="openAssessment('Khối THCS (Lớp 6-8)')">
                  <span>Đăng ký học thử</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Course Card 2: Luyện thi Tuyển sinh 10 -->
          <div class="course-item-card" data-level="tuyensinh10 cap2" data-subject="toan van anh" [style.display]="isCardVisible('tuyensinh10 cap2', 'toan van anh') ? 'flex' : 'none'">
            <div class="course-card-thumb">
              <img src="assets/images/students/students-chinh-phuc-lop-10.jpg" alt="Luyện thi Tuyển sinh 10" loading="lazy">
              <span class="course-badge-pill hot"><i class="fa-solid fa-bolt"></i> Cam kết đỗ NV1</span>
            </div>
            <div class="course-card-main">
              <div class="course-card-meta">
                <span class="course-subject-tag"><i class="fa-solid fa-trophy"></i> Ôn thi Tuyển sinh 10</span>
                <button type="button" class="learn-more open-assessment-modal" (click)="openAssessment('Lớp 9 (Luyện thi vào 10)')">
                  <span class="circle"><i class="icon arrow"></i></span>
                  <span class="button-text">Khám phá</span>
                </button>
              </div>
              <h3 class="course-card-title"><a href="javascript:void(0)" class="open-assessment-modal" (click)="openAssessment('Lớp 9 (Luyện thi vào 10)')">Bứt Phá Kỳ Thi Tuyển Sinh 10 &amp; Trường Chuyên</a></h3>
              <p class="course-card-desc">Chuyên đề giải toán thực tế, chiến lược điểm 9+ Ngữ văn, tối ưu tốc độ môn Tiếng Anh và thi thử sát cấu trúc đề Sở GD&amp;ĐT TP.HCM.</p>
              <div class="course-card-specs">
                <div class="spec-item"><i class="fa-solid fa-vial"></i> Thi thử định kỳ hàng tháng</div>
                <div class="spec-item"><i class="fa-solid fa-shield-halved"></i> Hoàn 100% học phí</div>
              </div>
              <div class="course-card-footer">
                <button type="button" class="btn-primary-ila btn-red open-assessment-modal" style="width: 100%;" (click)="openAssessment('Lớp 9 (Luyện thi vào 10)')">
                  <span>Đăng ký học thử</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Course Card 3: THPT Lớp 10-12 -->
          <div class="course-item-card" data-level="cap3" data-subject="toan ly hoa" [style.display]="isCardVisible('cap3', 'toan ly hoa') ? 'flex' : 'none'">
            <div class="course-card-thumb">
              <img src="assets/images/students/students-khoi-cap-3-lop-10.jpg" alt="THPT Toán Lý Hóa" loading="lazy">
              <span class="course-badge-pill"><i class="fa-solid fa-graduation-cap"></i> Chuyên sâu THPT</span>
            </div>
            <div class="course-card-main">
              <div class="course-card-meta">
                <span class="course-subject-tag"><i class="fa-solid fa-landmark"></i> THPT Lớp 10 - 12</span>
                <button type="button" class="learn-more open-assessment-modal" (click)="openAssessment('Khối THPT (Lớp 10-12)')">
                  <span class="circle"><i class="icon arrow"></i></span>
                  <span class="button-text">Khám phá</span>
                </button>
              </div>
              <h3 class="course-card-title"><a href="javascript:void(0)" class="open-assessment-modal" (click)="openAssessment('Khối THPT (Lớp 10-12)')">Bồi Dưỡng Chuyên Sâu Khối A, A1, B, D (Lớp 10–12)</a></h3>
              <p class="course-card-desc">Hệ thống hóa kiến thức trọng tâm, rèn luyện kỹ năng phân loại đề thi trắc nghiệm, tư duy giải nhanh bằng máy tính Casio.</p>
              <div class="course-card-specs">
                <div class="spec-item"><i class="fa-solid fa-chalkboard-user"></i> 100% Giảng viên ĐHSP</div>
                <div class="spec-item"><i class="fa-solid fa-user-check"></i> Kèm 1:1 chuyên đề</div>
              </div>
              <div class="course-card-footer">
                <button type="button" class="btn-primary-ila btn-red open-assessment-modal" style="width: 100%;" (click)="openAssessment('Khối THPT (Lớp 10-12)')">
                  <span>Đăng ký học thử</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        <div id="noCoursesFound" [style.display]="noCourses() ? 'block' : 'none'" style="text-align:center; padding: 40px; color: var(--color-text-muted);">
          <i class="fa-solid fa-circle-exclamation" style="font-size: 2rem; color: var(--color-primary); margin-bottom: 10px;"></i>
          <p>Không tìm thấy khóa học khớp chính xác. Hãy chọn lại cấp học hoặc liên hệ Hotline <strong>{{ hotline() }}</strong> để được tư vấn riêng.</p>
        </div>
      </div>
    </section>
  `
})
export class CourseFilterComponent implements OnInit {
  private modalService = inject(ModalService);
  private branchService = inject(BranchService);
  private contactService = inject(ContactService);

  branches = signal<Branch[]>([]);
  hotline = computed(() => this.contactService.contactInfo().hotline || '0906.716.727');

  activeTab = signal<string>('all');
  filterLevel = signal<string>('all');
  filterSubject = signal<string>('all');

  ngOnInit() {
    this.branchService.getBranches().subscribe(data => {
      if (data && data.length > 0) {
        this.branches.set(data);
      }
    });
    this.contactService.getContactInfo().subscribe();
  }

  setTab(tab: string) {
    this.activeTab.set(tab);
    this.filterLevel.set(tab);
  }

  onLevelChange(e: Event) {
    const val = (e.target as HTMLSelectElement).value;
    this.filterLevel.set(val);
  }

  onSubjectChange(e: Event) {
    const val = (e.target as HTMLSelectElement).value;
    this.filterSubject.set(val);
  }

  applyQuickFilter() {
    this.activeTab.set(this.filterLevel());
    if (typeof document !== 'undefined') {
      const el = document.getElementById('section-courses');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  isCardVisible(cardLevels: string, cardSubjects: string): boolean {
    const active = this.activeTab();
    const subject = this.filterSubject();

    let levelMatch = false;
    if (active === 'all') {
      levelMatch = true;
    } else {
      levelMatch = cardLevels.includes(active);
    }

    let subjectMatch = false;
    if (subject === 'all') {
      subjectMatch = true;
    } else {
      subjectMatch = cardSubjects.includes(subject);
    }

    return levelMatch && subjectMatch;
  }

  noCourses(): boolean {
    return false;
  }

  openAssessment(gradeLevel?: string) {
    this.modalService.openAssessment();
  }
}
