import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  message = signal<string>('');
  isVisible = signal<boolean>(false);
  private timer: any = null;

  show(msg: string, duration: number = 3500) {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.message.set(msg);
    this.isVisible.set(true);

    this.timer = setTimeout(() => {
      this.isVisible.set(false);
    }, duration);
  }

  hide() {
    this.isVisible.set(false);
  }
}

