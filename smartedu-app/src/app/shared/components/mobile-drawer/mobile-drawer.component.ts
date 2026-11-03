import { Component, inject, OnInit, signal, computed, ChangeDetectorRef, PLATFORM_ID } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ModalService } from '../../../core/services/modal.service';
import { ContactService } from '../../../core/services/contact.service';
import { MenuService } from '../../../core/services/menu.service';
import { MenuItem } from '../../../core/models/menu.model';

@Component({
  selector: 'app-mobile-drawer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  styles: [`
    .mobile-menu-drawer {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(15, 23, 42, 0.65);
      backdrop-filter: blur(6px);
      z-index: 9999;
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
      transition: opacity 0.25s ease, visibility 0.25s ease;
    }
    .mobile-menu-drawer.open,
    .mobile-menu-drawer.active {
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
    }
    .drawer-content {
      position: absolute;
      top: 0;
      right: 0;
      width: 330px;
      max-width: 86vw;
      height: 100%;
      background: #ffffff;
      box-shadow: -6px 0 24px rgba(15, 23, 42, 0.2);
      display: flex;
      flex-direction: column;
      transform: translateX(100%);
      transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1);
      overflow-y: auto;
    }
    .mobile-menu-drawer.open .drawer-content,
    .mobile-menu-drawer.active .drawer-content {
      transform: translateX(0);
    }
    .drawer-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 20px;
      border-bottom: 1px solid #e2e8f0;
      background: #ffffff;
      position: sticky;
      top: 0;
      z-index: 10;
    }
    .drawer-close-btn {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      border: none;
      background: #f1f5f9;
      color: #334155;
      font-size: 1.15rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .drawer-close-btn:hover {
      background: #fee2e2;
      color: #dc2626;
    }
    .drawer-nav {
      flex: 1;
      padding: 16px 20px;
      overflow-y: auto;
    }
    .mobile-nav-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .mobile-nav-parent {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 14px;
      border-radius: 8px;
      font-size: 0.95rem;
      font-weight: 700;
      color: #0f172a;
      cursor: pointer;
      transition: background 0.2s ease, color 0.2s ease;
    }
    .mobile-nav-parent:hover,
    .mobile-nav-parent.active {
      background: #fff1f2;
      color: #d81824;
    }
    .mobile-nav-arrow {
      font-size: 0.8rem;
      transition: transform 0.25s ease;
      color: #64748b;
    }
    .mobile-nav-arrow.rotated {
      transform: rotate(180deg);
      color: #d81824;
    }
    .mobile-nav-link {
      display: flex;
      align-items: center;
      padding: 12px 14px;
      border-radius: 8px;
      font-size: 0.95rem;
      font-weight: 700;
      color: #0f172a;
      text-decoration: none;
      transition: all 0.2s ease;
      cursor: pointer;
    }
    .mobile-nav-link:hover {
      background: #fff1f2;
      color: #d81824;
    }
    .mobile-submenu-list {
      list-style: none;
      padding: 4px 0 6px 12px;
      margin: 4px 0 6px 6px;
      border-left: 2px solid #fee2e2;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .mobile-subcat-title {
      font-size: 0.78rem;
      font-weight: 800;
      color: #d81824;
      text-transform: uppercase;
      letter-spacing: 0.03em;
      padding: 8px 12px 4px;
      margin-top: 4px;
    }
    .mobile-subcat-list {
      list-style: none;
      padding: 0 0 0 6px;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .mobile-submenu-item a {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 9px 12px;
      border-radius: 6px;
      font-size: 0.875rem;
      font-weight: 500;
      color: #334155;
      text-decoration: none;
      transition: all 0.2s ease;
      cursor: pointer;
    }
    .mobile-submenu-item a:hover {
      background: #f8fafc;
      color: #d81824;
      padding-left: 16px;
    }
    .drawer-footer {
      padding: 20px;
      border-top: 1px solid #e2e8f0;
      background: #f8fafc;
    }
    .drawer-hotline {
      font-size: 0.875rem;
      color: #475569;
      margin-bottom: 14px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .drawer-hotline strong {
      color: #0f172a;
    }
    .btn-drawer-cta {
      width: 100%;
      padding: 12px 18px;
      background: #d81824;
      color: #ffffff;
      border: none;
      border-radius: 50px;
      font-weight: 700;
      font-size: 0.875rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(216, 24, 36, 0.25);
      transition: all 0.2s ease;
    }
    .btn-drawer-cta:hover {
      background: #b91c1c;
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(216, 24, 36, 0.35);
    }
  `],
  template: `
    <div class="mobile-menu-drawer"
         [class.open]="modalService.isMobileDrawerOpen()"
         [class.active]="modalService.isMobileDrawerOpen()"
         (click)="onBackdropClick($event)">
      <div class="drawer-content" (click)="$event.stopPropagation()">
        
        <!-- Drawer Header -->
        <div class="drawer-header">
          <a routerLink="/" (click)="close()">
            <img src="assets/images/branding/logo-smartedu.png" alt="SmartEdu Logo" style="height: 38px; width: auto;">
          </a>
          <button type="button" class="drawer-close-btn" (click)="close()" aria-label="Đóng menu">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        <!-- Drawer Navigation Links -->
        <nav class="drawer-nav">
          <ul class="mobile-nav-list">
            @for (item of menuTree(); track item.moduleId) {
              <li class="mobile-nav-item">
                @if (item.children && item.children.length > 0) {
                  <!-- Parent with submenu (e.g. Giới thiệu, Chương trình học) -->
                  <div class="mobile-nav-parent" 
                       [class.active]="isExpanded(item.moduleId)"
                       (click)="toggleSubmenu(item.moduleId, $event)">
                    <span class="mobile-nav-title">{{ item.moduleName }}</span>
                    <i class="fa-solid fa-chevron-down mobile-nav-arrow" [class.rotated]="isExpanded(item.moduleId)"></i>
                  </div>

                  @if (isExpanded(item.moduleId)) {
                    <ul class="mobile-submenu-list">
                      @for (child of item.children; track child.moduleId) {
                        <li class="mobile-submenu-item">
                          @if (child.children && child.children.length > 0) {
                            <!-- Level 2 category title (e.g. Khối THCS, Khối THPT) -->
                            <div class="mobile-subcat-title">
                              <i *ngIf="child.icon" [class]="child.icon + ' me-1'"></i>
                              {{ child.moduleName }}
                            </div>
                            <ul class="mobile-subcat-list">
                              @for (subChild of child.children; track subChild.moduleId) {
                                <li>
                                  <a [routerLink]="parseUrl(subChild.urlFrontEnd).path"
                                     [queryParams]="parseUrl(subChild.urlFrontEnd).queryParams"
                                     [fragment]="parseUrl(subChild.urlFrontEnd).fragment"
                                     (click)="close()" 
                                     class="mobile-nav-link sub">
                                    <i class="fa-solid fa-angle-right"></i>
                                    <span>{{ subChild.moduleName }}</span>
                                  </a>
                                </li>
                              }
                            </ul>
                          } @else {
                            <!-- Single Level 2 item (e.g. Câu chuyện SmartEdu, 4 Cam Kết Vàng) -->
                            <a [routerLink]="parseUrl(child.urlFrontEnd).path"
                               [queryParams]="parseUrl(child.urlFrontEnd).queryParams"
                               [fragment]="parseUrl(child.urlFrontEnd).fragment"
                               (click)="onNavigate(child.urlFrontEnd, $event)" 
                               class="mobile-nav-link">
                              <i *ngIf="child.icon" [class]="child.icon + ' me-2'"></i>
                              <span>{{ child.moduleName }}</span>
                            </a>
                          }
                        </li>
                      }
                    </ul>
                  }
                } @else {
                  <!-- Single Level 1 item (Trang chủ, Ban giảng huấn, Tin tức, Thư viện Media, Liên hệ) -->
                  <a [routerLink]="parseUrl(item.urlFrontEnd).path"
                     [queryParams]="parseUrl(item.urlFrontEnd).queryParams"
                     [fragment]="parseUrl(item.urlFrontEnd).fragment"
                     (click)="close()" 
                     class="mobile-nav-link root">
                    <span>{{ item.moduleName }}</span>
                  </a>
                }
              </li>
            }
          </ul>
        </nav>

        <!-- Drawer Footer Actions -->
        <div class="drawer-footer">
          <div class="drawer-hotline">
            <i class="fa-solid fa-phone" style="color: #d81824;"></i> Hotline: <strong>{{ hotline() }}</strong>
          </div>
          <button type="button" class="btn-drawer-cta" (click)="openAssessment()">
            <span>ĐĂNG KÝ TEST ĐẦU VÀO 0Đ</span>
            <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>

      </div>
    </div>
  `
})
export class MobileDrawerComponent implements OnInit {
  modalService = inject(ModalService);
  private contactService = inject(ContactService);
  private menuService = inject(MenuService);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  menuTree = signal<MenuItem[]>([]);
  expandedIds = signal<Set<number>>(new Set<number>());

  hotline = computed(() => this.contactService.contactInfo().hotline || '0906.716.727');

  ngOnInit() {
    this.contactService.getContactInfo().subscribe();
    this.loadMenuData();
  }

  loadMenuData(): void {
    // 1. Tải trước từ dữ liệu mặc định để render tức thì 0ms
    const initialTree = this.buildTree(this.menuService.menus(), null);
    this.menuTree.set(initialTree);

    // 2. Tải dữ liệu cập nhật mới nhất từ API MenuService
    this.menuService.getHeaderMenu().subscribe({
      next: (data: MenuItem[]) => {
        const flatList = this.flattenItems(data);
        const treeData = this.buildTree(flatList, null);
        this.menuTree.set(treeData);
        this.cdr.markForCheck();
      },
      error: (err) => console.error('Lỗi khi tải Menu cho Mobile Drawer:', err)
    });
  }

  buildTree(items: MenuItem[], parentId: number | null = null): MenuItem[] {
    return items
      .filter(item => {
        if (parentId === null) {
          return item.parentId === null || item.parentId === 0 || item.parentId === undefined;
        }
        return item.parentId === parentId;
      })
      .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0))
      .map(item => ({
        ...item,
        children: this.buildTree(items, item.moduleId)
      }));
  }

  private flattenItems(items: MenuItem[]): MenuItem[] {
    const result: MenuItem[] = [];
    const traverse = (list: MenuItem[]) => {
      for (const it of list) {
        result.push(it);
        if (it.children && it.children.length > 0) {
          traverse(it.children);
        }
      }
    };
    traverse(items);
    return result;
  }

  toggleSubmenu(id: number, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    const current = new Set(this.expandedIds());
    if (current.has(id)) {
      current.delete(id);
    } else {
      current.add(id);
    }
    this.expandedIds.set(current);
  }

  isExpanded(id: number): boolean {
    return this.expandedIds().has(id);
  }

  parseUrl(url?: string): { path: string; queryParams?: Record<string, string>; fragment?: string } {
    if (!url) return { path: '/gioi-thieu' };

    const lower = url.toLowerCase();
    if (lower.includes('cau-chuyen') || lower.includes('story')) {
      return { path: '/gioi-thieu', fragment: 'section-story' };
    }
    if (lower.includes('gia-tri') || lower.includes('core-values') || lower.includes('cot-loi')) {
      return { path: '/gioi-thieu', fragment: 'section-core-values' };
    }
    if (lower.includes('cam-ket') || lower.includes('commitments')) {
      return { path: '/gioi-thieu', fragment: 'section-commitments' };
    }
    if (lower.includes('thong-diep') || lower.includes('message')) {
      return { path: '/gioi-thieu', fragment: 'section-message' };
    }
    if (lower.includes('phap-ly') || lower.includes('legal')) {
      return { path: '/gioi-thieu', fragment: 'section-legal' };
    }

    const [baseAndQuery, fragment] = url.split('#');
    const [path, queryString] = baseAndQuery.split('?');
    const queryParams: Record<string, string> = {};
    if (queryString) {
      new URLSearchParams(queryString).forEach((val, key) => {
        queryParams[key] = val;
      });
    }

    const cleanPath = path ? (path.startsWith('/') ? path : '/' + path) : '/gioi-thieu';

    return {
      path: cleanPath,
      queryParams: Object.keys(queryParams).length > 0 ? queryParams : undefined,
      fragment: fragment || undefined
    };
  }

  onNavigate(url?: string, event?: Event): void {
    this.close();
    if (!url) return;
    if (event) {
      event.preventDefault();
    }
    const parsed = this.parseUrl(url);
    if (!isPlatformBrowser(this.platformId)) return;

    const currentUrl = this.router.url.split('?')[0].split('#')[0];
    const targetPath = parsed.path;

    if (currentUrl === targetPath || (currentUrl === '/gioi-thieu' && targetPath === '/gioi-thieu')) {
      if (parsed.fragment) {
        window.history.replaceState(null, '', `${targetPath}#${parsed.fragment}`);
        setTimeout(() => {
          const el = document.getElementById(parsed.fragment!);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 150);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      this.router.navigate([targetPath], {
        queryParams: parsed.queryParams,
        fragment: parsed.fragment
      });
    }
  }

  onBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  close() {
    this.modalService.closeMobileDrawer();
  }

  openAssessment() {
    this.close();
    this.modalService.openAssessment();
  }
}
