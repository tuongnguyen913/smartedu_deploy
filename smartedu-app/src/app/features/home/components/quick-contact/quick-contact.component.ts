import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ModalService } from '../../../../core/services/modal.service';
import { EnrollmentService } from '../../../../core/services/enrollment.service';
import { ToastService } from '../../../../core/services/toast.service';
import { BranchService } from '../../../../core/services/branch.service';
import { ContactService } from '../../../../core/services/contact.service';
import { Branch } from '../../../../core/models/branch.model';

@Component({
  selector: 'app-quick-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <!-- ==========================================================================
         13. SECTION REGISTRATION FORM (HIGH-CONVERSION)
         ========================================================================== -->
    <section class="section-registration" id="section-register">
      <div class="container">
        <div class="registration-card">
          <div class="registration-lead">
            <div class="section-badge" style="background: rgba(216, 24, 36, 0.08); color: var(--color-primary); border-color: rgba(216, 24, 36, 0.2);">
              <i class="fa-solid fa-gift"></i> Ưu đãi đặc quyền
            </div>
            <h2>Đăng Ký Học Thử &amp;<br><span>Kiểm Tra Đầu Vào 0đ</span></h2>
            <p>Trải nghiệm phương pháp giảng dạy tương tác cùng Thầy Cô ĐH Sư Phạm TP.HCM, nhận phân tích chi tiết lỗ hổng kiến thức và lộ trình bứt phá điểm số hoàn toàn miễn phí.</p>
            <div class="registration-benefits">
              <div class="benefit-item"><i class="fa-solid fa-circle-check"></i> Đánh giá năng lực 1:1 cùng Thạc sĩ Sư Phạm</div>
              <div class="benefit-item"><i class="fa-solid fa-circle-check"></i> Học thử 02 buổi thực tế không phát sinh chi phí</div>
              <div class="benefit-item"><i class="fa-solid fa-circle-check"></i> Tặng bộ đề thi thử độc quyền Tuyển sinh 10 &amp; THPTQG</div>
            </div>
          </div>

          <div class="registration-form-wrap">
            <form class="reg-form" id="leadRegistrationForm" [formGroup]="form" (ngSubmit)="onSubmit()">
              <div class="form-field">
                <label for="regName">Họ và tên Phụ huynh / Học sinh *</label>
                <input type="text" id="regName" formControlName="parentName" class="form-input" placeholder="Ví dụ: Nguyễn Văn An" required>
              </div>

              <div class="form-field">
                <label for="regPhone">Số điện thoại liên hệ (Zalo) *</label>
                <input type="tel" id="regPhone" formControlName="phoneNumber" class="form-input" placeholder="Ví dụ: 0906716727" required>
              </div>

              <div class="form-field">
                <label for="regGrade">Khối lớp của con *</label>
                <select id="regGrade" formControlName="gradeLevel" class="form-select" required>
                  <option value="" disabled>Chọn khối lớp</option>
                  <option value="Lớp 6">Lớp 6</option>
                  <option value="Lớp 7">Lớp 7</option>
                  <option value="Lớp 8">Lớp 8</option>
                  <option value="Lớp 9 (Luyện thi vào 10)">Lớp 9 (Luyện thi vào 10)</option>
                  <option value="Lớp 10">Lớp 10</option>
                  <option value="Lớp 11">Lớp 11</option>
                  <option value="Lớp 12 (Luyện thi Đại học)">Lớp 12 (Luyện thi Đại học)</option>
                </select>
              </div>

              <div class="form-field">
                <label for="regCampus">Cơ sở học thuận tiện *</label>
                <select id="regCampus" formControlName="branchId" class="form-select" required>
                  @for (b of branches(); track b.branchId; let i = $index) {
                    <option [value]="b.branchId">CS{{ i + 1 }}: {{ b.address }}</option>
                  }
                </select>
              </div>

              <button type="submit" class="btn-submit-reg" [disabled]="isSubmitting">
                <i class="fa-solid fa-paper-plane"></i> {{ isSubmitting ? 'ĐANG GỬI...' : 'Gửi Đăng Ký Tư Vấn Ngay' }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  `
})
export class QuickContactComponent implements OnInit {
  private fb = inject(FormBuilder);
  private modalService = inject(ModalService);
  private enrollmentService = inject(EnrollmentService);
  private toastService = inject(ToastService);
  private branchService = inject(BranchService);
  private contactService = inject(ContactService);

  isSubmitting = false;
  branches = signal<Branch[]>([]);

  form = this.fb.group({
    parentName: ['', [Validators.required, Validators.minLength(2)]],
    phoneNumber: ['', [Validators.required, Validators.pattern(/^(0|84)(3|5|7|8|9)[0-9]{8}$/)]],
    gradeLevel: ['Lớp 9 (Luyện thi vào 10)', Validators.required],
    branchId: [1, Validators.required]
  });

  ngOnInit() {
    this.branchService.getBranches().subscribe(data => {
      if (data && data.length > 0) {
        this.branches.set(data);
        if (!this.form.get('branchId')?.value) {
          this.form.patchValue({ branchId: data[0].branchId });
        }
      }
    });
    this.contactService.getContactInfo().subscribe();
  }

  openAssessment() {
    this.modalService.openAssessment();
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const val = this.form.getRawValue();
    const payload = {
      parentName: val.parentName || '',
      phoneNumber: val.phoneNumber || '',
      gradeLevel: val.gradeLevel || '',
      branchId: Number(val.branchId) || 1,
      sourcePage: 'Homepage Quick Contact'
    };

    this.enrollmentService.createEnrollment(payload).subscribe({
      next: () => {
        this.isSubmitting = false;
        if (typeof window !== 'undefined' && (window as any).confetti) {
          (window as any).confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
        }
        this.modalService.openSuccess(payload);
        this.toastService.show('Đăng ký tư vấn thành công! Thầy cô SmartEdu sẽ liên hệ lại sớm.');
        this.form.reset({
          gradeLevel: 'Lớp 9 (Luyện thi vào 10)',
          branchId: this.branches()[0]?.branchId || 1
        });
      },
      error: () => {
        this.isSubmitting = false;
        const hotline = this.contactService.contactInfo().hotline || '0906.716.727';
        alert(`Có lỗi xảy ra, vui lòng liên hệ Hotline ${hotline}`);
      }
    });
  }
}

