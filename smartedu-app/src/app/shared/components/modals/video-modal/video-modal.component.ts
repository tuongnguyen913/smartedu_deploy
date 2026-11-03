import { Component, inject } from '@angular/core';
import { ModalService } from '../../../../core/services/modal.service';

@Component({
  selector: 'app-video-modal',
  standalone: true,
  template: `
    @if (modalService.isVideoOpen()) {
      <div class="modal-overlay active" (click)="onBackdropClick($event)">
        <div class="modal-box modal-video-box">
          <button type="button" class="modal-close-btn" (click)="close()" style="background: rgba(255,255,255,0.8);">&times;</button>
          <video controls autoplay playsinline style="width:100%; border-radius:12px; display:block;">
            <source [src]="modalService.selectedVideoUrl()" type="video/mp4">
            Trình duyệt của bạn không hỗ trợ phát video HTML5.
          </video>
        </div>
      </div>
    }
  `
})
export class VideoModalComponent {
  modalService = inject(ModalService);

  close() {
    this.modalService.closeVideo();
  }

  onBackdropClick(e: MouseEvent) {
    if ((e.target as HTMLElement).classList.contains('modal-overlay')) {
      this.close();
    }
  }
}

