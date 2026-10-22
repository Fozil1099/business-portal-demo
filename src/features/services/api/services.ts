import { http } from "@/app/providers/axios/http";
import type { CriteriaList, CriteriaListParams } from "./types";

// Публичный каталог: сервисы сайта — это критерии оценки
export const getCriteria = (params?: CriteriaListParams) => {
  return http.get<CriteriaList>("/criteria/", {
    params,
    headers: { no_add_token: true },
  });
};
