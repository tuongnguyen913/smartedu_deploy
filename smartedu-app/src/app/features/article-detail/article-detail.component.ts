import { Component } from '@angular/core';
import { NewsDetailComponent } from '../news-detail/news-detail.component';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [NewsDetailComponent],
  template: `<app-news-detail></app-news-detail>`
})
export class ArticleDetailComponent {}
