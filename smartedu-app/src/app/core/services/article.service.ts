import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NewsService } from './news.service';
import { Article, ArticleCategory } from '../models/article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private newsService = inject(NewsService);

  getCategories(): Observable<ArticleCategory[]> {
    return this.newsService.getCategoriesWithArticles().pipe(
      map(res => res.categories.map(c => ({
        categoryId: c.categoryId,
        title: c.title,
        userKey: c.userkey
      })))
    );
  }

  getArticles(): Observable<Article[]> {
    return this.newsService.getCategoriesWithArticles().pipe(
      map(res => res.articles.map(a => ({
        articleId: a.articleId,
        title: a.title,
        slug: a.userkey || `article-${a.articleId}`,
        summary: a.brief || '',
        picture: a.picture,
        createdDate: a.published ? new Date(a.published).toLocaleDateString('vi-VN') : '',
        category: a.categoryName,
        categoryKey: a.categoryId ? `cat-${a.categoryId}` : 'all',
        author: a.author
      })))
    );
  }
}
