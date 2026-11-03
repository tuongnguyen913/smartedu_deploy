import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../../../core/services/modal.service';

@Component({
  selector: 'app-faculty-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (modalService.isFacultyOpen() && modalService.selectedFaculty()) {
      @let teacher = modalService.selectedFaculty()!;
      <div class="modal-overlay active" (click)="onBackdropClick($event)">
        <div class="modal-box" style="max-width: 680px;">
          <button type="button" class="modal-close-btn" (click)="close()">&times;</button>
          <div style="padding: 36px 32px;" class="faculty-modal-grid">
            <div>
              <img
                [src]="teacher.avatarUrl"
                [alt]="teacher.fullName"
                style="width: 100%; height: 260px; object-fit: cover; border-radius: 12px; box-shadow: 0 4px 14px rgba(0,0,0,0.1);"
              >
            </div>
            <div>
              <span style="color: var(--color-primary); font-size: 0.75rem; font-weight: 700; text-transform: uppercase;">
                {{ teacher.position || teacher.subject }}
              </span>
              <h3 style="font-size: 1.35rem; font-weight: 800; color: var(--color-navy-dark); margin: 4px 0 10px;">
                {{ teacher.fullName }}
              </h3>
              
              <div style="font-size: 0.84375rem; margin-bottom: 12px;">
                <strong><i class="fa-solid fa-graduation-cap" style="color: var(--color-navy);"></i> Bằng cấp &amp; Học vị:</strong>
                <p style="color: var(--color-text-muted); margin-top: 2px;">{{ teacher.academicDegree }}</p>
              </div>

              <div style="font-size: 0.84375rem; margin-bottom: 12px;">
                <strong><i class="fa-solid fa-building-columns" style="color: var(--color-navy);"></i> Trường đào tạo:</strong>
                <p style="color: var(--color-text-muted); margin-top: 2px;">{{ teacher.graduatedUniversity }}</p>
              </div>

              @if (teacher.timelineEvents && teacher.timelineEvents.length > 0) {
                <div style="font-size: 0.8125rem; margin-bottom: 14px;">
                  <strong><i class="fa-solid fa-timeline" style="color: var(--color-navy);"></i> Quá trình giảng huấn:</strong>
                  <ul style="padding-left: 18px; margin: 4px 0 0; color: var(--color-text-muted);">
                    @for (item of teacher.timelineEvents; track item.year) {
                      <li style="margin-bottom: 4px;"><strong>{{ item.year }}:</strong> {{ item.event }}</li>
                    }
                  </ul>
                </div>
              }

              @if (teacher.teachingPhilosophy) {
                <div style="font-size: 0.8125rem; background: var(--color-primary-soft); padding: 12px; border-radius: 8px; border-left: 3px solid var(--color-primary);">
                  <strong style="color: var(--color-primary);">Triết lý sư phạm:</strong>
                  <p style="font-style: italic; color: var(--color-text-dark); margin-top: 4px;">"{{ teacher.teachingPhilosophy }}"</p>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    }
  `
})
export class FacultyModalComponent {
  modalService = inject(ModalService);

  close() {
    this.modalService.closeFaculty();
  }

  onBackdropClick(e: MouseEvent) {
    if ((e.target as HTMLElement).classList.contains('modal-overlay')) {
      this.close();
    }
  }
}
