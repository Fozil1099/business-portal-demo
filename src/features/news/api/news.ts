import { http } from "@/app/providers/axios/http";
import type { NewsArticle, NewsList, NewsListParams } from "./types";

// Без токена: админу GET /news/ отдаёт черновики и архив в другом формате
export const getNews = (params?: NewsListParams) => {
  return http.get<NewsList>("/news/", {
    params,
    headers: { no_add_token: true },
  });
};

// Без токена по той же причине: админу отдаётся форма редактирования
export const getNewsArticle = (slug: string) => {
  return http.get<NewsArticle>(`/news/${encodeURIComponent(slug)}/`, {
    headers: { no_add_token: true },
  });
};
