import { Injectable, signal } from '@angular/core';
import { Teacher } from '../models/teacher.model';
import { CreateEnrollmentDto } from '../models/enrollment.model';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  // Modal visibility signals
  isAssessmentOpen = signal<boolean>(false);
  isVideoOpen = signal<boolean>(false);
  isFacultyOpen = signal<boolean>(false);
  isSuccessOpen = signal<boolean>(false);
  isMobileDrawerOpen = signal<boolean>(false);

  // Payload states
  selectedFaculty = signal<Teacher | null>(null);
  selectedVideoUrl = signal<string>('assets/video/video-lop-hoc.mp4');
  lastEnrollment = signal<CreateEnrollmentDto | null>(null);
  preselectedGrade = signal<string>('Lớp 9 (Luyện thi vào 10)');

  // Assessment Modal
  openAssessment(grade?: string) {
    if (grade) {
      this.preselectedGrade.set(grade);
    }
    this.isAssessmentOpen.set(true);
    this.lockBodyScroll(true);
  }

  closeAssessment() {
    this.isAssessmentOpen.set(false);
    this.lockBodyScroll(false);
  }

  // Video Modal
  openVideo(url?: string) {
    if (url) {
      this.selectedVideoUrl.set(url);
    }
    this.isVideoOpen.set(true);
    this.lockBodyScroll(true);
  }

  closeVideo() {
    this.isVideoOpen.set(false);
    this.lockBodyScroll(false);
  }

  // Faculty Bio Modal
  openFaculty(teacher: Teacher) {
    this.selectedFaculty.set(teacher);
    this.isFacultyOpen.set(true);
    this.lockBodyScroll(true);
  }

  closeFaculty() {
    this.isFacultyOpen.set(false);
    this.selectedFaculty.set(null);
    this.lockBodyScroll(false);
  }

  // Success Modal
  openSuccess(payload: CreateEnrollmentDto) {
    this.lastEnrollment.set(payload);
    this.isSuccessOpen.set(true);
    this.lockBodyScroll(true);
  }

  closeSuccess() {
    this.isSuccessOpen.set(false);
    this.lockBodyScroll(false);
  }

  // Mobile Menu Drawer
  openMobileDrawer() {
    this.isMobileDrawerOpen.set(true);
    this.lockBodyScroll(true);
  }

  closeMobileDrawer() {
    this.isMobileDrawerOpen.set(false);
    this.lockBodyScroll(false);
  }

  toggleMobileDrawer() {
    if (this.isMobileDrawerOpen()) {
      this.closeMobileDrawer();
    } else {
      this.openMobileDrawer();
    }
  }

  private lockBodyScroll(lock: boolean) {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = lock ? 'hidden' : '';
    }
  }
}

