import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ModalService } from '../../../core/services/modal.service';
import { EnrollmentService } from '../../../core/services/enrollment.service';
import { ToastService } from '../../../core/services/toast.service';
import { BranchService } from '../../../core/services/branch.service';
import { ContactService } from '../../../core/services/contact.service';
import { Branch } from '../../../core/models/branch.model';

@Component({
  selector: 'app-lead-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="leadForm" (ngSubmit)="onSubmit()" class="reg-form">
      <div class="form-group">
        <label class="form-label">Họ và tên Phụ huynh / Học sinh *</label>
        <div class="input-icon-wrapper">
          <i class="fa-solid fa-user input-icon"></i>
          <input type="text" formControlName="parentName" class="form-input" placeholder="Ví dụ: Nguyễn Văn An">
        </div>
        @if (leadForm.get('parentName')?.touched && leadForm.get('parentName')?.invalid) {
          <span class="form-error" style="color: #fff; font-size: 0.75rem; margin-top: 4px; display: block;">Vui lòng nhập họ và tên</span>
        }
      </div>

      <div class="form-group">
        <label class="form-label">Số điện thoại liên hệ (Zalo) *</label>
        <div class="input-icon-wrapper">
          <i class="fa-solid fa-phone input-icon"></i>
          <input type="tel" formControlName="phoneNumber" class="form-input" placeholder="Ví dụ: 0906716727">
        </div>
        @if (leadForm.get('phoneNumber')?.touched && leadForm.get('phoneNumber')?.invalid) {
          <span class="form-error" style="color: #fff; font-size: 0.75rem; margin-top: 4px; display: block;">Vui lòng nhập số điện thoại Việt Nam hợp lệ (10 số)</span>
        }
      </div>

      <div class="form-row-2">
        <div class="form-group">
          <label class="form-label">Khối lớp quan tâm *</label>
          <div class="input-icon-wrapper">
            <i class="fa-solid fa-graduation-cap input-icon"></i>
            <select formControlName="gradeLevel" class="form-select">
              <option value="Tiểu học (Lớp 1-5)">Tiểu học (Lớp 1 - 5)</option>
              <option value="Khối THCS (Lớp 6-8)">Khối THCS (Lớp 6 - 8)</option>
              <option value="Lớp 9 (Luyện thi vào 10)">Lớp 9 (Luyện thi vào 10)</option>
              <option value="Khối THPT (Lớp 10-12)">Khối THPT (Lớp 10 - 12)</option>
              <option value="Luyện thi ĐGNL & Đại Học">Luyện thi ĐGNL &amp; Đại Học</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Cơ sở thuận tiện nhất *</label>
          <div class="input-icon-wrapper">
            <i class="fa-solid fa-location-dot input-icon"></i>
            <select formControlName="branchId" class="form-select">
              @for (b of branches(); track b.branchId; let i = $index) {
                <option [value]="b.branchId">CS{{ i + 1 }}: {{ b.address }}</option>
              }
            </select>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Nhu cầu học tập / Ghi chú cho Thầy Cô</label>
        <div class="input-icon-wrapper">
          <i class="fa-solid fa-pen-to-square input-icon"></i>
          <input type="text" formControlName="learningNeed" class="form-input" placeholder="Ví dụ: Muốn cải thiện môn Toán, đăng ký kiểm tra 1:1...">
        </div>
      </div>

      <button type="submit" [disabled]="isSubmitting" class="btn-register btn-red btn-submit-lead" style="width: 100%; height: 54px; font-size: 1.05rem; font-weight: 700; margin-top: 8px;">
        <span>{{ isSubmitting ? 'ĐANG GỬI THÔNG TIN...' : 'ĐĂNG KÝ HỌC THỬ 02 BUỔI &amp; NHẬN TƯ VẤN' }} <i class="fa-solid fa-arrow-right"></i></span>
      </button>

      <p class="form-guarantee-text" style="text-align: center; font-size: 0.8125rem; color: rgba(255,255,255,0.85); margin-top: 14px;">
        <i class="fa-solid fa-shield-halved"></i> Cam kết bảo mật thông tin 100% &bull; Hoàn toàn không mất phí khi kiểm tra đầu vào
      </p>
    </form>
  `
})
export class LeadFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private enrollmentService = inject(EnrollmentService);
  private modalService = inject(ModalService);
  private toastService = inject(ToastService);
  private branchService = inject(BranchService);
  private contactService = inject(ContactService);

  isSubmitting = false;
  branches = signal<Branch[]>([]);

  leadForm = this.fb.group({
    parentName: ['', [Validators.required, Validators.minLength(2)]],
    phoneNumber: ['', [Validators.required, Validators.pattern(/^(03|05|07|08|09)+[0-9]{8}$/)]],
    gradeLevel: ['Lớp 9 (Luyện thi vào 10)', Validators.required],
    branchId: [1, Validators.required],
    learningNeed: ['']
  });

  ngOnInit() {
    this.branchService.getBranches().subscribe(data => {
      if (data && data.length > 0) {
        this.branches.set(data);
        if (!this.leadForm.get('branchId')?.value) {
          this.leadForm.patchValue({ branchId: data[0].branchId });
        }
      }
    });
    this.contactService.getContactInfo().subscribe();
  }

  onSubmit() {
    if (this.leadForm.invalid) {
      this.leadForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const val = this.leadForm.getRawValue();
    const payload = {
      parentName: val.parentName || '',
      phoneNumber: val.phoneNumber || '',
      gradeLevel: val.gradeLevel || '',
      branchId: Number(val.branchId) || 1,
      learningNeed: val.learningNeed || '',
      sourcePage: 'Homepage Lead Form'
    };

    this.enrollmentService.createEnrollment(payload).subscribe({
      next: () => {
        this.isSubmitting = false;
        if (typeof window !== 'undefined' && (window as any).confetti) {
          (window as any).confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
        }
        this.modalService.openSuccess(payload);
        this.toastService.show('Đăng ký tư vấn thành công! SmartEdu sẽ liên hệ lại trong 15 phút.');
        this.leadForm.reset({
          gradeLevel: 'Lớp 9 (Luyện thi vào 10)',
          branchId: this.branches()[0]?.branchId || 1,
          learningNeed: ''
        });
      },
      error: () => {
        this.isSubmitting = false;
        const hotline = this.contactService.contactInfo().hotline || '0906.716.727';
        alert(`Có lỗi xảy ra, vui lòng liên hệ hotline ${hotline}`);
      }
    });
  }
}

