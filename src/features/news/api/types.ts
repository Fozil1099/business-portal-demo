import type { Pagination, ResponseData } from "@/shared/types";

export interface NewsListItem {
  uuid: string;
  slug: string;
  title: string;
  excerpt: string;
  cover: string | null;
  cover_alt: string;
  published_at: string | null;
}

// ArticleDetail из схемы: публичная форма GET /news/{slug}/
export interface NewsArticle extends NewsListItem {
  // Санитизированный на бэке HTML
  body: string;
  created_at: string;
  updated_at: string;
}

export interface NewsListParams extends Pagination {
  search?: string;
}

export type NewsList = ResponseData<NewsListItem>;
