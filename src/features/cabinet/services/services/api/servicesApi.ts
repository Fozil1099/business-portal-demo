import { http } from "@/app/providers/axios/http";
import type { SubmissionList, SubmissionListParams } from "./types";

export const getSubmissions = (params?: SubmissionListParams) => {
  return http.get<SubmissionList>("/criteria/submissions/", { params });
};
