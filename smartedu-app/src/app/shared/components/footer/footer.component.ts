import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../../core/services/toast.service';
import { ContactService } from '../../../core/services/contact.service';
import { BranchService } from '../../../core/services/branch.service';
import { Branch } from '../../../core/models/branch.model';
import { FooterConfig } from '../../../core/models/footer-config.model';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, FormsModule],
  styles: [`
    .footer-top-grid-compact {
      display: grid;
      grid-template-columns: 1.25fr 1fr;
      gap: 60px;
      padding-bottom: 50px;
      border-bottom: 1px solid var(--color-border);
      align-items: start;
    }
    @media (max-width: 860px) {
      .footer-top-grid-compact {
        grid-template-columns: 1fr;
        gap: 40px;
      }
    }
  `],
  template: `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-top-grid-compact">
          
          <!-- Cột 1: Logo, Giới thiệu & Mạng xã hội -->
          <div class="footer-col footer-col-about">
            <a routerLink="/" style="display: inline-block; margin-bottom: 16px;">
              <img src="assets/images/branding/logo-smartedu.png" alt="SmartEdu Academy Logo" height="52" style="width: auto;">
            </a>
            <p style="font-size: 0.9375rem; color: #475569; line-height: 1.7; margin-bottom: 20px;">
              <strong>{{ footerConfig().companyName }}</strong> &mdash; Hệ thống bồi dưỡng văn hóa và luyện thi chất lượng cao tại TP.HCM. Tôn chỉ "Giáo dục cho sự trọn vẹn", đồng hành kiên nhẫn phát triển toàn diện tri thức học thuật, tư duy tự chủ và nhân cách cho thế hệ trẻ.
            </p>
            <div class="social-links" style="margin-bottom: 16px;">
              <a href="https://facebook.com" target="_blank" rel="noopener" class="social-link" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
              <a href="https://youtube.com" target="_blank" rel="noopener" class="social-link" aria-label="YouTube"><i class="fa-brands fa-youtube"></i></a>
              <a [href]="zaloUrl()" target="_blank" rel="noopener" class="social-link" aria-label="Zalo"><i class="fa-solid fa-comment-dots"></i></a>
            </div>
            <div>
              <span style="font-size: 0.75rem; color: #64748B;"><i class="fa-solid fa-shield-check" style="color: #34D399;"></i> Đã đăng ký với Sở GD&amp;ĐT TP.HCM &bull; DMCA Protected</span>
            </div>
          </div>

          <!-- Cột 2: Thông Tin Liên Hệ & Cơ Sở -->
          <div class="footer-col">
            <h4 class="footer-col-title">Thông Tin Liên Hệ</h4>
            <ul class="footer-menu-links" style="margin-bottom: 24px;">
              <li><i class="fa-solid fa-phone" style="color: var(--color-primary); margin-right: 6px;"></i> Hotline: <strong>{{ footerConfig().hotline }}</strong></li>
              <li><i class="fa-solid fa-envelope" style="color: var(--color-primary); margin-right: 6px;"></i> Email: <strong>{{ footerConfig().email }}</strong></li>
              @for (b of branches(); track b.branchId; let idx = $index) {
                <li><i class="fa-solid fa-location-dot" style="color: var(--color-primary); margin-right: 6px;"></i> CS{{ idx + 1 }}: {{ b.address }}</li>
              }
            </ul>

            <h5 style="color: var(--color-text-dark); font-size: 0.84375rem; font-weight: 700; margin-bottom: 8px;">Nhận Cẩm Nang Ôn Thi Miễn Phí</h5>
            <form class="footer-newsletter-form" (submit)="onSubscribe($event)">
              <input type="email" [(ngModel)]="email" name="email" class="footer-newsletter-input" placeholder="Nhập email của bạn..." required>
              <button type="submit" class="footer-newsletter-btn">Gửi</button>
            </form>
          </div>

        </div>

        <div class="footer-bottom">
          <div>
            {{ footerConfig().copyrightText || '© 2026 SmartEdu Academy. Tất cả quyền được bảo lưu.' }} Giấy phép GD&amp;ĐT TP.HCM.
          </div>
          <div class="footer-legal-links">
            <a routerLink="/gioi-thieu" fragment="section-legal">Quy chế hoạt động</a>
            <a routerLink="/gioi-thieu" fragment="section-legal">Chính sách bảo mật</a>
            <a routerLink="/lien-he">Bản đồ chỉ đường</a>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent implements OnInit {
  private toastService = inject(ToastService);
  private contactService = inject(ContactService);
  private branchService = inject(BranchService);

  email: string = '';
  branches = signal<Branch[]>([]);

  footerConfig = computed(() => this.contactService.footerConfig());

  zaloUrl = computed(() => {
    const raw = (this.footerConfig().hotline || '0906716727').split('-')[0].trim();
    const clean = raw.replace(/[^0-9]/g, '');
    return `https://zalo.me/${clean}`;
  });

  ngOnInit() {
    this.contactService.getFooterConfig().subscribe();
    this.branchService.getBranches().subscribe(data => {
      if (data && data.length > 0) {
        this.branches.set(data);
      }
    });
  }

  onSubscribe(e: Event) {
    e.preventDefault();
    if (this.email) {
      this.toastService.show('Đăng ký nhận tài liệu ôn thi thành công!');
      this.email = '';
    }
  }
}
