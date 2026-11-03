import { Injectable, inject, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap, timeout } from 'rxjs/operators';
import { MenuItem } from '../models/menu.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  private apiUrl = 'http://localhost:5000/api/menu';

  // Flat menu items matching PostgreSQL tbl_ModuleArticle (3 levels)
  private defaultFlatMenus: MenuItem[] = [
    // Level 1: Root navigation items
    { moduleId: 1, moduleName: 'Trang chủ', moduleKey: 'trang-chu', urlFrontEnd: '/', displayOrder: 1, onTopMenu: true, icon: 'bi bi-house-door-fill', isClickable: true, targetBlank: false, parentId: null },
    { moduleId: 2, moduleName: 'Giới thiệu', moduleKey: 'gioi-thieu', urlFrontEnd: '/gioi-thieu', displayOrder: 2, onTopMenu: true, icon: 'bi bi-info-circle-fill', isClickable: true, targetBlank: false, parentId: null },
    { moduleId: 3, moduleName: 'Chương trình học', moduleKey: 'chuong-trinh-hoc', urlFrontEnd: '/chuong-trinh-hoc', displayOrder: 3, onTopMenu: true, icon: 'bi bi-mortarboard-fill', isClickable: true, targetBlank: false, parentId: null },
    { moduleId: 4, moduleName: 'Ban giảng huấn', moduleKey: 'ban-giang-huan', urlFrontEnd: '/ban-giang-huan', displayOrder: 4, onTopMenu: true, icon: 'bi bi-person-workspace', isClickable: true, targetBlank: false, parentId: null },
    { moduleId: 5, moduleName: 'Tin tức', moduleKey: 'tin-tuc', urlFrontEnd: '/tin-tuc', displayOrder: 5, onTopMenu: true, icon: 'bi bi-newspaper', isClickable: true, targetBlank: false, parentId: null },
    { moduleId: 6, moduleName: 'Thư viện Media', moduleKey: 'thu-vien-media', urlFrontEnd: '/thu-vien-media', displayOrder: 6, onTopMenu: true, icon: 'bi bi-images', isClickable: true, targetBlank: false, parentId: null },
    { moduleId: 7, moduleName: 'Liên hệ', moduleKey: 'lien-he', urlFrontEnd: '/lien-he', displayOrder: 7, onTopMenu: true, icon: 'bi bi-envelope-fill', isClickable: true, targetBlank: false, parentId: null },

    // Level 2: Children of Giới thiệu (parentId = 2)
    { moduleId: 21, moduleName: 'Câu Chuyện SmartEdu', moduleKey: 'cau-chuyen-smartedu', urlFrontEnd: '/gioi-thieu#section-story', displayOrder: 1, onTopMenu: true, icon: 'bi bi-book-half', isClickable: true, targetBlank: false, parentId: 2 },
    { moduleId: 22, moduleName: 'Hệ Giá Trị Cốt Lõi', moduleKey: 'he-gia-tri-cot-loi', urlFrontEnd: '/gioi-thieu#section-core-values', displayOrder: 2, onTopMenu: true, icon: 'bi bi-compass-fill', isClickable: true, targetBlank: false, parentId: 2 },
    { moduleId: 23, moduleName: '4 Cam Kết Vàng', moduleKey: '4-cam-ket-vang', urlFrontEnd: '/gioi-thieu#section-commitments', displayOrder: 3, onTopMenu: true, icon: 'bi bi-shield-fill-check', isClickable: true, targetBlank: false, parentId: 2 },
    { moduleId: 24, moduleName: 'Thông Điệp Giảng Huấn', moduleKey: 'thong-diep-giang-huan', urlFrontEnd: '/gioi-thieu#section-message', displayOrder: 4, onTopMenu: true, icon: 'bi bi-chat-quote-fill', isClickable: true, targetBlank: false, parentId: 2 },
    { moduleId: 25, moduleName: 'Pháp Lý & Công Khai', moduleKey: 'phap-ly-cong-khai', urlFrontEnd: '/gioi-thieu#section-legal', displayOrder: 5, onTopMenu: true, icon: 'bi bi-file-earmark-text-fill', isClickable: true, targetBlank: false, parentId: 2 },

    // Level 2: Columns of Chương trình học (parentId = 3)
    { moduleId: 31, moduleName: 'Khối THCS (Lớp 6 - 9)', moduleKey: 'khoi-thcs-lop-6-9', urlFrontEnd: '/chuong-trinh-hoc?cap=cap2', displayOrder: 1, onTopMenu: true, icon: 'bi bi-book', isClickable: true, targetBlank: false, parentId: 3 },
    { moduleId: 32, moduleName: 'Khối THPT & Luyện Thi', moduleKey: 'khoi-thpt-luyen-thi', urlFrontEnd: '/chuong-trinh-hoc?cap=cap3', displayOrder: 2, onTopMenu: true, icon: 'bi bi-mortarboard', isClickable: true, targetBlank: false, parentId: 3 },

    // Level 3: Subjects under Khối THCS (parentId = 31)
    { moduleId: 311, moduleName: 'Bồi Dưỡng Toán Lớp 6 - 9', moduleKey: 'toan-6-9', urlFrontEnd: '/chuong-trinh-hoc?cap=cap2', displayOrder: 1, onTopMenu: true, icon: 'bi bi-calculator', isClickable: true, targetBlank: false, parentId: 31 },
    { moduleId: 312, moduleName: 'Ngữ Văn & Kỹ Năng Làm Văn', moduleKey: 'van-6-9', urlFrontEnd: '/chuong-trinh-hoc?cap=cap2', displayOrder: 2, onTopMenu: true, icon: 'bi bi-pencil-square', isClickable: true, targetBlank: false, parentId: 31 },
    { moduleId: 313, moduleName: 'Khoa Học Tự Nhiên (Lý - Hóa - Sinh)', moduleKey: 'khtn-6-9', urlFrontEnd: '/chuong-trinh-hoc?cap=cap2', displayOrder: 3, onTopMenu: true, icon: 'bi bi-lightning-charge', isClickable: true, targetBlank: false, parentId: 31 },
    { moduleId: 314, moduleName: 'Tiếng Anh SGK & Nâng Cao', moduleKey: 'anh-6-9', urlFrontEnd: '/chuong-trinh-hoc?cap=cap2', displayOrder: 4, onTopMenu: true, icon: 'bi bi-translate', isClickable: true, targetBlank: false, parentId: 31 },

    // Level 3: Subjects under Khối THPT (parentId = 32)
    { moduleId: 321, moduleName: 'Luyện Thi Tuyển Sinh 10 Công Lập', moduleKey: 'ts10-cong-lap', urlFrontEnd: '/chuong-trinh-hoc?cap=tuyensinh10', displayOrder: 1, onTopMenu: true, icon: 'bi bi-trophy', isClickable: true, targetBlank: false, parentId: 32 },
    { moduleId: 322, moduleName: 'Luyện Thi Vào Lớp 10 Chuyên', moduleKey: 'ts10-chuyen', urlFrontEnd: '/chuong-trinh-hoc?cap=tuyensinh10', displayOrder: 2, onTopMenu: true, icon: 'bi bi-star', isClickable: true, targetBlank: false, parentId: 32 },
    { moduleId: 323, moduleName: 'Toán - Lý - Hóa - Văn - Anh 10-12', moduleKey: 'thpt-10-12', urlFrontEnd: '/chuong-trinh-hoc?cap=cap3', displayOrder: 3, onTopMenu: true, icon: 'bi bi-journal-bookmark', isClickable: true, targetBlank: false, parentId: 32 },
    { moduleId: 324, moduleName: 'Luyện Thi ĐGNL & Tốt Nghiệp THPT', moduleKey: 'dgnl-thptqg', urlFrontEnd: '/chuong-trinh-hoc?cap=daihoc', displayOrder: 4, onTopMenu: true, icon: 'bi bi-award', isClickable: true, targetBlank: false, parentId: 32 }
  ];

  menus = signal<MenuItem[]>(this.defaultFlatMenus);

  /**
   * Phương thức getHeaderMenu() trả về mảng dữ liệu menu phẳng (flat array)
   * để HeaderComponent dùng hàm đệ quy buildTree() tạo cây 3 cấp.
   */
  getHeaderMenu(): Observable<MenuItem[]> {
    if (!isPlatformBrowser(this.platformId)) {
      return of(this.normalizeMenuItems(this.defaultFlatMenus));
    }

    return this.http.get<MenuItem[]>(this.apiUrl).pipe(
      timeout(3000),
      catchError(() => {
        return this.http.get<MenuItem[]>('http://localhost:5206/api/menu').pipe(
          timeout(2000),
          catchError(() => of(this.defaultFlatMenus))
        );
      }),
      map(data => this.normalizeMenuItems(data || [])),
      tap(data => {
        if (data && data.length > 0) {
          this.menus.set(data);
        }
      })
    );
  }

  private normalizeMenuItems(items: MenuItem[]): MenuItem[] {
    return items.map(item => {
      const url = (item.urlFrontEnd || '').trim();
      const key = (item.moduleKey || '').toLowerCase();
      const name = (item.moduleName || '').toLowerCase();

      if (item.parentId === 2 || url.startsWith('/gioi-thieu/')) {
        if (key.includes('cau-chuyen') || url.includes('cau-chuyen') || name.includes('câu chuyện')) {
          return { ...item, urlFrontEnd: '/gioi-thieu#section-story' };
        }
        if (key.includes('gia-tri') || url.includes('gia-tri') || name.includes('giá trị')) {
          return { ...item, urlFrontEnd: '/gioi-thieu#section-core-values' };
        }
        if (key.includes('cam-ket') || url.includes('cam-ket') || name.includes('cam kết')) {
          return { ...item, urlFrontEnd: '/gioi-thieu#section-commitments' };
        }
        if (key.includes('thong-diep') || url.includes('thong-diep') || name.includes('thông điệp')) {
          return { ...item, urlFrontEnd: '/gioi-thieu#section-message' };
        }
        if (key.includes('phap-ly') || url.includes('phap-ly') || name.includes('pháp lý')) {
          return { ...item, urlFrontEnd: '/gioi-thieu#section-legal' };
        }
      }
      return item;
    });
  }

  getMenus(): Observable<MenuItem[]> {
    return this.getHeaderMenu();
  }
}
