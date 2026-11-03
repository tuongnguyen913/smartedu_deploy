import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BranchService } from '../../../core/services/branch.service';
import { ContactService } from '../../../core/services/contact.service';
import { Branch } from '../../../core/models/branch.model';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="nav-header-top">
      <div class="container">
        <ul class="nav-header-flex">
          <li class="nav-header-item tag-accent">
            <a routerLink="/chuong-trinh-hoc"><i class="fa-solid fa-graduation-cap"></i> #LỚP 6 - 12</a>
          </li>
          <li class="nav-header-item">
            <a routerLink="/chuong-trinh-hoc" [queryParams]="{ cap: 'tuyensinh10' }">#LUYỆN THI LỚP 10</a>
          </li>
          <li class="nav-header-item">
            <a routerLink="/lien-he">#2 CƠ SỞ BÌNH PHÚ Q.6</a>
          </li>
        </ul>
        <div class="top-contact">
          <div class="top-campuses">
            <i class="fa-solid fa-location-dot"></i> {{ campusesSummary() }}
          </div>
          <a [href]="'tel:' + hotlineClean()" class="top-hotline">
            <i class="fa-solid fa-phone-volume"></i> Hotline: <span>{{ hotline() }}</span>
          </a>
        </div>
      </div>
    </div>
  `
})
export class TopbarComponent implements OnInit {
  private branchService = inject(BranchService);
  private contactService = inject(ContactService);

  branches = signal<Branch[]>([]);

  hotline = computed(() => {
    return this.contactService.contactInfo().hotline || '0906.716.727';
  });

  hotlineClean = computed(() => {
    const raw = this.hotline().split('-')[0].trim();
    return raw.replace(/[^0-9]/g, '');
  });

  campusesSummary = computed(() => {
    const list = this.branches();
    if (list.length === 0) {
      return 'CS1: Số 01 Đ.Số 6 • CS2: Số 17 Đ.Chợ Lớn, Q.6';
    }
    return list.map((b, idx) => {
      // Tóm tắt ngắn gọn địa chỉ cơ sở
      const shortAddr = b.address.split(',')[0].replace('Số ', 'Số ').replace('Đường ', 'Đ.');
      return `CS${idx + 1}: ${shortAddr}`;
    }).join(' • ');
  });

  ngOnInit() {
    this.branchService.getBranches().subscribe(data => {
      if (data && data.length > 0) {
        this.branches.set(data);
      }
    });

    this.contactService.getContactInfo().subscribe();
  }
}
