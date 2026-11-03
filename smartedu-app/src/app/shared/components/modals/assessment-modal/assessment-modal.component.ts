import { Component, inject, OnInit, signal, PLATFORM_ID } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { ModalService } from '../../../../core/services/modal.service';
import { EnrollmentService } from '../../../../core/services/enrollment.service';
import { ToastService } from '../../../../core/services/toast.service';
import { BranchService } from '../../../../core/services/branch.service';
import { ContactService } from '../../../../core/services/contact.service';
import { Branch } from '../../../../core/models/branch.model';
import { CreateEnrollmentDto } from '../../../../core/models/enrollment.model';

@Component({
  selector: 'app-assessment-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    @if (modalService.isAssessmentOpen()) {
      <div class="modal-overlay active" (click)="onBackdropClick($event)">
        <div class="modal-box" style="max-width: 520px;">
          <button type="button" class="modal-close-btn" (click)="close()">&times;</button>
          <div style="padding: 36px 32px;">
            <div style="text-align: center; margin-bottom: 24px;">
              <span class="section-badge"><i class="fa-solid fa-gift"></i> Hoàn toàn miễn phí</span>
              <h3 style="font-size: 1.5rem; font-weight: 800; color: var(--color-navy-dark); margin-top: 6px;">
                Đăng Ký Đánh Giá Năng Lực Đầu Vào
              </h3>
              <p style="font-size: 0.875rem; color: var(--color-text-muted); margin-top: 4px;">
                SmartEdu sẽ liên hệ xếp lịch kiểm tra 1:1 và tư vấn lộ trình học tối ưu nhất cho con.
              </p>
            </div>

            <!-- Banner thông báo thành công nếu có -->
            @if (successMessage()) {
              <div style="background: #ECFDF5; border: 1px solid #A7F3D0; color: #065F46; padding: 14px 16px; border-radius: 10px; margin-bottom: 18px; display: flex; align-items: center; gap: 10px; font-size: 0.875rem; font-weight: 600;">
                <i class="fa-solid fa-circle-check" style="font-size: 1.25rem; color: #10B981;"></i>
                <span>{{ successMessage() }}</span>
              </div>
            }

            <!-- Banner thông báo lỗi nếu có -->
            @if (errorMessage()) {
              <div style="background: #FEF2F2; border: 1px solid #FECACA; color: #991B1B; padding: 12px 16px; border-radius: 10px; margin-bottom: 18px; display: flex; align-items: center; gap: 10px; font-size: 0.84375rem;">
                <i class="fa-solid fa-circle-exclamation" style="font-size: 1.1rem; color: #EF4444;"></i>
                <span>{{ errorMessage() }}</span>
              </div>
            }

            <form [formGroup]="form" (ngSubmit)="onSubmit()" style="display: flex; flex-direction: column; gap: 14px;">
              <!-- 1. Họ và tên phụ huynh / học sinh -->
              <div>
                <label style="font-size: 0.8125rem; font-weight: 600; color: var(--color-text-dark); margin-bottom: 4px; display: block;">
                  Họ tên phụ huynh / học sinh <span style="color: #D81824;">*</span>
                </label>
                <input
                  type="text"
                  formControlName="parentName"
                  class="form-input"
                  placeholder="Ví dụ: Trần Minh Châu"
                  [style.borderColor]="isFieldInvalid('parentName') ? '#D81824' : 'var(--color-border)'"
                  [style.background]="isFieldInvalid('parentName') ? '#FFF5F5' : 'var(--bg-slate)'"
                  style="border: 1px solid var(--color-border); border-radius: 8px; padding: 10px 14px; width: 100%; font-size: 0.875rem; transition: all 0.2s ease;">
                @if (isFieldInvalid('parentName')) {
                  <span style="font-size: 0.75rem; color: #D81824; margin-top: 4px; display: flex; align-items: center; gap: 4px;">
                    <i class="fa-solid fa-triangle-exclamation"></i> Vui lòng nhập họ tên phụ huynh/học sinh
                  </span>
                }
              </div>

              <!-- 2. Số điện thoại liên hệ -->
              <div>
                <label style="font-size: 0.8125rem; font-weight: 600; color: var(--color-text-dark); margin-bottom: 4px; display: block;">
                  Số điện thoại liên hệ (Zalo) <span style="color: #D81824;">*</span>
                </label>
                <input
                  type="tel"
                  formControlName="phoneNumber"
                  class="form-input"
                  placeholder="Ví dụ: 0906716727"
                  [style.borderColor]="isFieldInvalid('phoneNumber') ? '#D81824' : 'var(--color-border)'"
                  [style.background]="isFieldInvalid('phoneNumber') ? '#FFF5F5' : 'var(--bg-slate)'"
                  style="border: 1px solid var(--color-border); border-radius: 8px; padding: 10px 14px; width: 100%; font-size: 0.875rem; transition: all 0.2s ease;">
                @if (isFieldInvalid('phoneNumber')) {
                  <span style="font-size: 0.75rem; color: #D81824; margin-top: 4px; display: flex; align-items: center; gap: 4px;">
                    <i class="fa-solid fa-triangle-exclamation"></i> Vui lòng nhập đúng số điện thoại (10 số, bắt đầu bằng 03, 05, 07, 08, 09)
                  </span>
                }
              </div>

              <!-- 3. Khối lớp & Cơ sở -->
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                <div>
                  <label style="font-size: 0.8125rem; font-weight: 600; color: var(--color-text-dark); margin-bottom: 4px; display: block;">
                    Khối lớp <span style="color: #D81824;">*</span>
                  </label>
                  <select
                    formControlName="gradeLevel"
                    class="form-select"
                    style="border: 1px solid var(--color-border); background: var(--bg-slate); border-radius: 8px; padding: 10px 14px; width: 100%; font-size: 0.875rem;">
                    <option value="Lớp 6">Lớp 6</option>
                    <option value="Lớp 7">Lớp 7</option>
                    <option value="Lớp 8">Lớp 8</option>
                    <option value="Lớp 9 (Luyện thi 10)">Lớp 9 (Luyện thi 10)</option>
                    <option value="Lớp 10">Lớp 10</option>
                    <option value="Lớp 11">Lớp 11</option>
                    <option value="Lớp 12 (Luyện thi Đại học)">Lớp 12 (Luyện thi ĐH)</option>
                  </select>
                </div>
                <div>
                  <label style="font-size: 0.8125rem; font-weight: 600; color: var(--color-text-dark); margin-bottom: 4px; display: block;">
                    Cơ sở thuận tiện <span style="color: #D81824;">*</span>
                  </label>
                  <select
                    formControlName="branchId"
                    class="form-select"
                    style="border: 1px solid var(--color-border); background: var(--bg-slate); border-radius: 8px; padding: 10px 14px; width: 100%; font-size: 0.875rem;">
                    @for (b of branches(); track b.branchId; let i = $index) {
                      <option [value]="b.branchId">CS{{ i + 1 }}: {{ b.branchName }} ({{ b.address.split(',')[0] }})</option>
                    }
                  </select>
                </div>
              </div>

              <!-- 4. Nút xác nhận đăng ký kiểm tra -->
              <button
                type="submit"
                [disabled]="isSubmitting"
                class="btn-register btn-red"
                style="width: 100%; margin-top: 10px; height: 50px; font-weight: 700; font-size: 0.9375rem; border-radius: 50px; display: inline-flex; align-items: center; justify-content: center; gap: 8px; cursor: pointer; transition: all 0.25s ease;">
                @if (isSubmitting) {
                  <i class="fa-solid fa-spinner fa-spin"></i>
                  <span>Đang xử lý đăng ký...</span>
                } @else {
                  <i class="fa-solid fa-paper-plane"></i>
                  <span>XÁC NHẬN ĐĂNG KÝ KIỂM TRA</span>
                }
              </button>
            </form>
          </div>
        </div>
      </div>
    }
  `
})
export class AssessmentModalComponent implements OnInit {
  modalService = inject(ModalService);
  private fb = inject(FormBuilder);
  private enrollmentService = inject(EnrollmentService);
  private toastService = inject(ToastService);
  private branchService = inject(BranchService);
  private contactService = inject(ContactService);
  private platformId = inject(PLATFORM_ID);

  isSubmitting = false;
  submitted = false;
  branches = signal<Branch[]>([]);
  successMessage = signal<string>('');
  errorMessage = signal<string>('');

  // 1. Reactive Forms với các field và pattern đúng yêu cầu
  form = this.fb.group({
    parentName: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required, Validators.pattern(/^(03|05|07|08|09)+[0-9]{8}$/)]],
    gradeLevel: ['Lớp 9 (Luyện thi 10)', [Validators.required]],
    branchId: [1, [Validators.required]]
  });

  ngOnInit(): void {
    // 2. Binding danh sách cơ sở từ GET /api/branches
    this.branchService.getBranches().subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.branches.set(data);
          const currentBranchId = this.form.get('branchId')?.value;
          if (!currentBranchId || !data.some(b => b.branchId === currentBranchId)) {
            this.form.patchValue({ branchId: data[0].branchId });
          }
        }
      },
      error: (err) => console.error('Lỗi khi tải danh sách cơ sở:', err)
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.form.get(fieldName);
    return !!(control && (control.touched || this.submitted) && control.invalid);
  }

  close(): void {
    this.modalService.closeAssessment();
    this.submitted = false;
    this.errorMessage.set('');
  }

  onBackdropClick(e: MouseEvent): void {
    if ((e.target as HTMLElement).classList.contains('modal-overlay')) {
      this.close();
    }
  }

  onSubmit(): void {
    this.submitted = true;
    this.errorMessage.set('');

    // Kiểm tra validation
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const val = this.form.getRawValue();
    const payload: CreateEnrollmentDto = {
      parentName: val.parentName ? val.parentName.trim() : '',
      phoneNumber: val.phoneNumber ? val.phoneNumber.trim() : '',
      gradeLevel: val.gradeLevel ? val.gradeLevel.trim() : 'Lớp 9 (Luyện thi 10)',
      branchId: Number(val.branchId) || 1,
      sourcePage: 'PlacementTestModal'
    };

    // Gọi API POST /api/enrollments
    this.enrollmentService.createEnrollment(payload).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        const msg = res?.message || 'Đăng ký thành công! SmartEdu sẽ liên hệ với bạn sớm nhất.';
        this.successMessage.set(msg);

        // Hiển thị thông báo (SweetAlert2 nếu có, kết hợp Toastr/ToastService)
        if (isPlatformBrowser(this.platformId) && (window as any).Swal) {
          (window as any).Swal.fire({
            icon: 'success',
            title: 'Thành công!',
            text: msg,
            timer: 1500,
            showConfirmButton: false
          });
        }
        this.toastService.show(msg, 4000);
        this.triggerConfetti();

        // Reset form về giá trị ban đầu
        this.form.reset({
          parentName: '',
          phoneNumber: '',
          gradeLevel: 'Lớp 9 (Luyện thi 10)',
          branchId: this.branches()[0]?.branchId || 1
        });
        this.submitted = false;

        // Tự động đóng Modal sau 1.5s
        setTimeout(() => {
          this.close();
          this.successMessage.set('');
        }, 1500);
      },
      error: (err) => {
        this.isSubmitting = false;
        const errorMsg = err?.error?.message || err?.message || 'Có lỗi xảy ra khi lưu đăng ký. Vui lòng thử lại hoặc gọi Hotline.';
        this.errorMessage.set(errorMsg);
        this.toastService.show(errorMsg, 4000);
      }
    });
  }

  private triggerConfetti(): void {
    if (isPlatformBrowser(this.platformId) && (window as any).confetti) {
      (window as any).confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
    }
  }
}
