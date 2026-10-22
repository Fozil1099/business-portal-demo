import { http } from "@/app/providers/axios/http";
import type { CompanyPk } from "@/shared/types";
import type { CompanyCriteriaScore } from "./types";

// Все критерии с баллами компании по каждому, включая нулевые
export const getCompanyCriteriaScore = (companyUuid: CompanyPk) => {
  return http.get<CompanyCriteriaScore>(`/criteria/score/${companyUuid}/`);
};
