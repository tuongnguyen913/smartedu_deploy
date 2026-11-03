import { Injectable, inject, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, timeout } from 'rxjs/operators';
import { ContactInfo } from '../models/contact-info.model';
import { FooterConfig } from '../models/footer-config.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  private contactApiUrl = 'http://localhost:5000/api/ContactInfo';
  private footerApiUrl = 'http://localhost:5000/api/FooterConfig';

  // Dữ liệu hạt giống chuẩn từ bảng ContactInfo trong smartedudb.sql
  private defaultContactInfo: ContactInfo = {
    id: 1,
    companyName: 'SmartEdu Academy - Trung Tâm Bồi Dưỡng Văn Hóa & Luyện Thi',
    address: 'Số 01 Đường Số 6, P. Bình Phú, Quận 6, TP.HCM',
    phone: '028.3876.5432',
    hotline: '0906.716.727',
    email: 'smartedu.academy.vn@gmail.com',
    mapEmbed: 'https://maps.google.com/maps?q=10.7456,106.6345&z=17&output=embed',
    isActive: true
  };

  // Dữ liệu hạt giống chuẩn từ bảng tbl_FooterConfig trong smartedudb.sql
  private defaultFooterConfig: FooterConfig = {
    id: 1,
    companyName: 'Trung Tâm Bồi Dưỡng Văn Hóa SmartEdu Academy',
    address: 'Cơ sở 1: Số 01 Đường Số 6 / Cơ sở 2: Số 17 Đường Chợ Lớn, P. Bình Phú, Q.6, TP.HCM',
    phone: '028.3876.5432',
    hotline: '0906.716.727 - 0901.873.466',
    email: 'smartedu.academy.vn@gmail.com',
    website: 'https://smartedu.edu.vn',
    copyrightText: '© 2026 SmartEdu Academy. All rights reserved.',
    isActive: true
  };

  contactInfo = signal<ContactInfo>(this.defaultContactInfo);
  footerConfig = signal<FooterConfig>(this.defaultFooterConfig);

  getContactInfo(): Observable<ContactInfo> {
    if (!isPlatformBrowser(this.platformId)) {
      return of(this.defaultContactInfo);
    }
    return this.http.get<ContactInfo>(this.contactApiUrl).pipe(
      timeout(3000),
      catchError(() => {
        return this.http.get<ContactInfo>('http://localhost:5206/api/ContactInfo').pipe(
          timeout(2000),
          catchError(() => of(this.defaultContactInfo))
        );
      }),
      tap(data => {
        if (data) {
          this.contactInfo.set(data);
        }
      })
    );
  }

  getFooterConfig(): Observable<FooterConfig> {
    if (!isPlatformBrowser(this.platformId)) {
      return of(this.defaultFooterConfig);
    }
    return this.http.get<FooterConfig>(this.footerApiUrl).pipe(
      timeout(3000),
      catchError(() => {
        return this.http.get<FooterConfig>('http://localhost:5206/api/FooterConfig').pipe(
          timeout(2000),
          catchError(() => of(this.defaultFooterConfig))
        );
      }),
      tap(data => {
        if (data) {
          this.footerConfig.set(data);
        }
      })
    );
  }
}

