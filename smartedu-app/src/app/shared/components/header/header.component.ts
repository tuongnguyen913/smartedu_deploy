import { Component, HostListener, OnInit, inject, signal, ChangeDetectorRef, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { ModalService } from '../../../core/services/modal.service';
import { MenuService } from '../../../core/services/menu.service';
import { MenuItem } from '../../../core/models/menu.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  // 1. Chuyển menuTree thành Signal
  menuTree = signal<MenuItem[]>([]);
  isScrolled = signal<boolean>(false);

  private modalService = inject(ModalService);
  private menuService = inject(MenuService);
  private cdr = inject(ChangeDetectorRef); // Inject ChangeDetectorRef
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    this.loadMenuData();
  }

  loadMenuData(): void {
    this.menuService.getHeaderMenu().subscribe({
      next: (data: MenuItem[]) => {
        const flatList = this.flattenItems(data);
        const treeData = this.buildTree(flatList, null);

        // 2. Gán dữ liệu vào Signal và báo cho Angular re-render DOM ngay lập tức
        this.menuTree.set(treeData);
        this.cdr.markForCheck();
      },
      error: (err) => console.error('Lỗi khi tải Menu từ API:', err)
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

  isMegaMenu(item: MenuItem): boolean {
    if (item.moduleKey === 'chuong-trinh-hoc' || item.urlFrontEnd?.includes('chuong-trinh-hoc')) {
      return true;
    }
    return !!(
      item.children &&
      item.children.length > 0 &&
      item.children.some(child => child.children && child.children.length > 0)
    );
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
        const el = document.getElementById(parsed.fragment);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
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

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (typeof window !== 'undefined') {
      this.isScrolled.set(window.scrollY > 40);
    }
  }

  openAssessment() {
    this.modalService.openAssessment();
  }

  toggleMobileDrawer() {
    this.modalService.toggleMobileDrawer();
  }
}