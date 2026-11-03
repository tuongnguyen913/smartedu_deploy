import { Component, HostListener, signal } from '@angular/core';

@Component({
  selector: 'app-back-to-top',
  standalone: true,
  template: `
    <button
      type="button"
      class="back-to-top"
      [class.visible]="isVisible()"
      [class.active]="isVisible()"
      (click)="scrollToTop()"
      aria-label="Lên đầu trang"
      title="Lên đầu trang"
    >
      <i class="fa-solid fa-chevron-up"></i>
    </button>
  `
})
export class BackToTopComponent {
  isVisible = signal<boolean>(false);

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (typeof window !== 'undefined') {
      this.isVisible.set(window.scrollY > 300);
    }
  }

  scrollToTop() {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
