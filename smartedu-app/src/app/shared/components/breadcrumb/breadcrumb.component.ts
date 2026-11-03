import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface BreadcrumbCrumb {
  label: string;
  url?: string;
  icon?: string;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <nav class="breadcrumb-wrapper" aria-label="breadcrumb">
      <ol class="breadcrumb-list">
        <li class="breadcrumb-item">
          <a routerLink="/"><i class="fa-solid fa-house"></i> Trang chủ</a>
        </li>
        @for (item of items; track $index) {
          <li class="breadcrumb-separator">
            <i class="fa-solid fa-chevron-right"></i>
          </li>
          @if (item.url) {
            <li class="breadcrumb-item">
              <a [routerLink]="item.url">
                @if (item.icon) { <i [class]="item.icon"></i> }
                {{ item.label }}
              </a>
            </li>
          } @else {
            <li class="breadcrumb-item active" aria-current="page">
              @if (item.icon) { <i [class]="item.icon"></i> }
              {{ item.label }}
            </li>
          }
        }
        @if (pageTitle && (!items || items.length === 0)) {
          <li class="breadcrumb-separator">
            <i class="fa-solid fa-chevron-right"></i>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            {{ pageTitle }}
          </li>
        }
      </ol>
    </nav>
  `,
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {
  @Input() pageTitle = '';
  @Input() items: BreadcrumbCrumb[] = [];
}

