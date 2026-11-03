export interface NewsCategory {
  categoryId: number;
  title: string;
  userkey: string;
  displayOrder: number;
}

export interface NewsArticle {
  articleId: number;
  title: string;
  brief?: string;
  picture?: string;
  published?: string;
  userkey?: string;
  categoryId?: number;
  categoryName: string;
  author?: string;
}

export interface NewsCategoriesWithArticlesResponse {
  categories: NewsCategory[];
  articles: NewsArticle[];
}

export interface ArticleDetail {
  articleId: number;
  title: string;
  brief?: string;
  contentd?: string;
  picture?: string;
  author?: string;
  published?: string;
  views: number;
  categoryId?: number;
  categoryName: string;
  slug?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeyword?: string;
}

export interface RelatedArticle {
  articleId: number;
  title: string;
  brief?: string;
  picture?: string;
  slug?: string;
  published?: string;
  categoryId?: number;
  categoryName: string;
}

// Backward compatibility interfaces
export interface ArticleCategory {
  categoryId: number;
  title: string;
  userKey: string;
}

export interface Article {
  articleId: number;
  moduleId?: number;
  title: string;
  slug: string;
  summary: string;
  detailContent?: string;
  picture?: string;
  createdDate: string;
  category?: string;
  categoryKey?: string;
  author?: string;
  viewsCount?: number;
  isFeatured?: boolean;
  isActive?: boolean;
}
