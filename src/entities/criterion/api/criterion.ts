import { http } from "@/app/providers/axios/http";
import type { Criterion } from "../model/types";

export const getCriterion = (uuid: string) => {
  return http.get<Criterion>(`/criteria/${uuid}/`);
};
