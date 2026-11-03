import { Component, inject, OnInit, signal } from '@angular/core';
import { ModalService } from '../../../../core/services/modal.service';
import { BranchService } from '../../../../core/services/branch.service';
import { Branch } from '../../../../core/models/branch.model';

@Component({
  selector: 'app-success-modal',
  standalone: true,
  template: `
    @if (modalService.isSuccessOpen() && modalService.lastEnrollment()) {
      @let data = modalService.lastEnrollment()!;
      <div class="modal-overlay active" (click)="onBackdropClick($event)">
        <div class="modal-box" style="max-width: 520px; text-align: center;">
          <button type="button" class="modal-close-btn" (click)="close()">&times;</button>
          <div style="padding: 40px 32px;">
            <div style="width: 72px; height: 72px; background: #D1FAE5; color: #10B981; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2.2rem; margin: 0 auto 20px;">
              <i class="fa-solid fa-circle-check"></i>
            </div>
            <h3 style="font-size: 1.5rem; font-weight: 800; color: var(--color-navy-dark); margin-bottom: 8px;">Đăng Ký Thành Công!</h3>
            <p style="font-size: 0.9375rem; color: var(--color-text-muted); margin-bottom: 24px;">SmartEdu Academy đã tiếp nhận thông tin và sẽ gọi điện cho Quý Phụ huynh trong vòng 15-30 phút để xác nhận lịch học.</p>
            
            <div style="background: var(--bg-slate); border-radius: 12px; padding: 18px; text-align: left; font-size: 0.84375rem; margin-bottom: 24px; border: 1px solid var(--color-border);">
              <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                <span style="color: var(--color-text-muted);">Họ tên:</span>
                <strong style="color: var(--color-text-dark);">{{ data.parentName }}</strong>
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                <span style="color: var(--color-text-muted);">Số điện thoại:</span>
                <strong style="color: var(--color-text-dark);">{{ data.phoneNumber }}</strong>
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                <span style="color: var(--color-text-muted);">Khối lớp quan tâm:</span>
                <strong style="color: var(--color-primary);">{{ data.gradeLevel || 'Theo tư vấn' }}</strong>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: var(--color-text-muted);">Cơ sở hẹn gặp:</span>
                <strong style="color: var(--color-navy);">{{ getBranchName(data.branchId) }}</strong>
              </div>
            </div>

            <button type="button" class="btn-register btn-red" (click)="close()" style="width: 100%;">
              <span>Hoàn tất &bull; Đóng thông báo</span>
            </button>
          </div>
        </div>
      </div>
    }
  `
})
export class SuccessModalComponent implements OnInit {
  modalService = inject(ModalService);
  private branchService = inject(BranchService);

  branches = signal<Branch[]>([]);

  ngOnInit() {
    this.branchService.getBranches().subscribe(data => {
      if (data && data.length > 0) {
        this.branches.set(data);
      }
    });
  }

  getBranchName(branchId?: number): string {
    const found = this.branches().find(b => b.branchId === branchId);
    if (found) {
      return `${found.branchName} (${found.address.split(',')[0]})`;
    }
    return branchId === 2 ? 'Cơ sở 2 - Chợ Lớn' : 'Cơ sở 1 - Bình Phú';
  }

  close() {
    this.modalService.closeSuccess();
  }

  onBackdropClick(e: MouseEvent) {
    if ((e.target as HTMLElement).classList.contains('modal-overlay')) {
      this.close();
    }
  }
}

