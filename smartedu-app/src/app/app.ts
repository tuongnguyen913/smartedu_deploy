import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { MobileDrawerComponent } from './shared/components/mobile-drawer/mobile-drawer.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { BackToTopComponent } from './shared/components/back-to-top/back-to-top.component';
import { ToastComponent } from './shared/components/toast/toast.component';
import { AssessmentModalComponent } from './shared/components/modals/assessment-modal/assessment-modal.component';
import { FacultyModalComponent } from './shared/components/modals/faculty-modal/faculty-modal.component';
import { VideoModalComponent } from './shared/components/modals/video-modal/video-modal.component';
import { SuccessModalComponent } from './shared/components/modals/success-modal/success-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    MobileDrawerComponent,
    FooterComponent,
    BackToTopComponent,
    ToastComponent,
    AssessmentModalComponent,
    FacultyModalComponent,
    VideoModalComponent,
    SuccessModalComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
