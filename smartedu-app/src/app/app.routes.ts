import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
    title: 'SmartEdu Academy — Bồi Dưỡng Văn Hóa & Luyện Thi Chất Lượng Cao'
  },
  {
    path: 'gioi-thieu',
    loadComponent: () => import('./features/about/about.component').then(m => m.AboutComponent),
    title: 'Giới Thiệu Về SmartEdu Academy — Giáo Dục Cho Sự Trọn Vẹn'
  },
  {
    path: 'gioi-thieu/:section',
    loadComponent: () => import('./features/about/about.component').then(m => m.AboutComponent),
    title: 'Giới Thiệu Về SmartEdu Academy — Giáo Dục Cho Sự Trọn Vẹn'
  },
  {
    path: 'chuong-trinh-hoc',
    loadComponent: () => import('./features/courses/courses.component').then(m => m.CoursesComponent),
    title: 'Chương Trình Đào Tạo Bồi Dưỡng Chất Lượng Cao — SmartEdu Academy'
  },
  {
    path: 'chuong-trinh-hoc/:slug',
    loadComponent: () => import('./features/course-detail/course-detail.component').then(m => m.CourseDetailComponent),
    title: 'Chi Tiết Khóa Học — SmartEdu Academy'
  },
  {
    path: 'ban-giang-huan',
    loadComponent: () => import('./features/faculty/faculty.component').then(m => m.FacultyComponent),
    title: 'Hội Đồng Ban Giảng Huấn 100% ĐH Sư Phạm — SmartEdu Academy'
  },
  {
    path: 'tin-tuc',
    loadComponent: () => import('./features/news/news.component').then(m => m.NewsComponent),
    title: 'Tin Tức Giáo Dục & Cẩm Nang Luyện Thi — SmartEdu Academy'
  },
  {
    path: 'thu-vien-media',
    loadComponent: () => import('./features/media-gallery/media-gallery.component').then(m => m.MediaGalleryComponent),
    title: 'Thư Viện Không Gian & Hoạt Động Giảng Huấn — SmartEdu Academy'
  },
  {
    path: 'lien-he',
    loadComponent: () => import('./features/contact/contact.component').then(m => m.ContactComponent),
    title: 'Liên Hệ & Hệ Thống Cơ Sở Bình Phú Quận 6 — SmartEdu Academy'
  },
  {
    path: 'bai-viet-chi-tiet',
    loadComponent: () => import('./features/news-detail/news-detail.component').then(m => m.NewsDetailComponent),
    title: 'Cẩm Nang & Lộ Trình Luyện Thi — SmartEdu Academy'
  },
  {
    path: 'tin-tuc/:slug',
    loadComponent: () => import('./features/news-detail/news-detail.component').then(m => m.NewsDetailComponent),
    title: 'Chi Tiết Bài Viết — SmartEdu Academy'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
