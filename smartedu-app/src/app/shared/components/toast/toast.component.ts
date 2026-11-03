import { Component, inject } from '@angular/core';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  template: `
    <div class="toast-notice" [class.active]="toastService.isVisible()">
      <i class="fa-solid fa-circle-check" style="color: var(--color-green); margin-right: 8px;"></i>
      <span style="font-size: 0.875rem; font-weight: 600; color: var(--color-text-dark);">
        {{ toastService.message() }}
      </span>
    </div>
  `
})
export class ToastComponent {
  toastService = inject(ToastService);
}

