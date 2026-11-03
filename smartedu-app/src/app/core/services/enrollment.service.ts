import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CreateEnrollmentDto, EnrollmentResponse } from '../models/enrollment.model';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5000/api/enrollments';
  private fallbackUrl = 'http://localhost:5206/api/enrollments';

  createEnrollment(dto: CreateEnrollmentDto): Observable<EnrollmentResponse> {
    return this.http.post<EnrollmentResponse>(this.apiUrl, dto).pipe(
      catchError((err: HttpErrorResponse) => {
        // Nếu lỗi 400 từ Backend, trả về lỗi chi tiết để hiển thị cho người dùng
        if (err.status >= 400 && err.status < 500) {
          return throwError(() => err);
        }
        // Nếu không kết nối được port 5000, thử fallback port 5206
        return this.http.post<EnrollmentResponse>(this.fallbackUrl, dto).pipe(
          catchError((err2: HttpErrorResponse) => {
            if (err2.status >= 400 && err2.status < 500) {
              return throwError(() => err2);
            }
            return this.http.post<EnrollmentResponse>('/api/enrollments', dto);
          })
        );
      })
    );
  }
}
