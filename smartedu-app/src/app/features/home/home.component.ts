import { Component } from '@angular/core';
import { HeroBannerComponent } from './components/hero-banner/hero-banner.component';
import { CourseFilterComponent } from './components/course-filter/course-filter.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { FacultyComponent } from './components/faculty/faculty.component';
import { FeaturedCoursesComponent } from './components/featured-courses/featured-courses.component';
import { NewsEventsComponent } from './components/news-events/news-events.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { QuickContactComponent } from './components/quick-contact/quick-contact.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroBannerComponent,
    CourseFilterComponent,
    StatisticsComponent,
    FacultyComponent,
    FeaturedCoursesComponent,
    NewsEventsComponent,
    TestimonialsComponent,
    QuickContactComponent
  ],
  template: `
    <main>
      <!-- 3. HERO BANNER -->
      <app-hero-banner></app-hero-banner>

      <!-- 4 & 5. CHOOSE-COURSE QUICK FILTER & COURSES SHOWCASE -->
      <app-course-filter></app-course-filter>

      <!-- PROOF STATS STRIP & 6. 4 CAM KẾT VÀNG -->
      <app-statistics></app-statistics>

      <!-- 7. FACULTY SPOTLIGHT -->
      <app-faculty></app-faculty>

      <!-- 8. GƯƠNG MẶT XUẤT SẮC (HALL OF GREATNESS) -->
      <app-featured-courses></app-featured-courses>

      <!-- 9. MULTIMEDIA & VIDEO LỚP HỌC -->
      <app-news-events></app-news-events>

      <!-- 11. PHỤ HUYNH NÓI GÌ (TESTIMONIALS) -->
      <app-testimonials></app-testimonials>

      <!-- 12 & 13. HỆ THỐNG CƠ SỞ & FORM ĐĂNG KÝ (QUICK CONTACT) -->
      <app-quick-contact></app-quick-contact>
    </main>
  `
})
export class HomeComponent {}
