import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { Branch } from '../models/branch.model';

@Injectable({
  providedIn: 'root'
})
export class BranchService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  private apiUrl = 'http://localhost:5000/api/branches';

  // Dữ liệu chuẩn từ bảng Branches trong file smartedudb.sql
  private mockBranches: Branch[] = [
    {
      branchId: 1,
      branchName: 'Cơ sở 1 - Bình Phú',
      address: 'Số 01 Đường Số 6, Phường Bình Phú, Quận 6, TP.HCM',
      phone: '028.3876.5432',
      hotline: '0906.716.727',
      email: 'smartedu.academy.vn@gmail.com',
      workingHours: 'Thứ 2 - Chủ Nhật: 07:30 - 21:00',
      googleMapsEmbedUrl: 'https://maps.google.com/maps?q=10.7456,106.6345&z=17&output=embed',
      googleMapsDirectionsUrl: 'https://maps.google.com/?q=10.7456,106.6345',
      latitude: 10.7456000,
      longitude: 106.6345000,
      imageUrl: 'assets/images/campus/campus-co-so-moi-khai-truong.jpg',
      displayOrder: 1,
      isActive: true
    },
    {
      branchId: 2,
      branchName: 'Cơ sở 2 - Chợ Lớn',
      address: 'Số 17 Đường Chợ Lớn, Phường Bình Phú, Quận 6, TP.HCM',
      phone: '028.3876.5433',
      hotline: '0901.873.466',
      email: 'smartedu.academy.vn@gmail.com',
      workingHours: 'Thứ 2 - Chủ Nhật: 07:30 - 21:00',
      googleMapsEmbedUrl: 'https://maps.google.com/maps?q=10.7482,106.6321&z=17&output=embed',
      googleMapsDirectionsUrl: 'https://maps.google.com/?q=10.7482,106.6321',
      latitude: 10.7482000,
      longitude: 106.6321000,
      imageUrl: 'assets/images/campus/campus-co-so-2-cho-lon.jpg',
      displayOrder: 2,
      isActive: true
    }
  ];

  getBranches(): Observable<Branch[]> {
    if (!isPlatformBrowser(this.platformId)) {
      return of(this.mockBranches);
    }
    return this.http.get<Branch[]>(this.apiUrl).pipe(
      timeout(3000),
      catchError(() => {
        return this.http.get<Branch[]>('http://localhost:5206/api/branches').pipe(
          timeout(2000),
          catchError(() => of(this.mockBranches))
        );
      })
    );
  }

  getBranchById(id: number): Observable<Branch | undefined> {
    const fallback = this.mockBranches.find(b => b.branchId === id);
    if (!isPlatformBrowser(this.platformId)) {
      return of(fallback);
    }
    return this.http.get<Branch>(`${this.apiUrl}/${id}`).pipe(
      timeout(3000),
      catchError(() => {
        return this.http.get<Branch>(`/api/branches/${id}`).pipe(
          timeout(2000),
          catchError(() => of(fallback))
        );
      })
    );
  }
}
