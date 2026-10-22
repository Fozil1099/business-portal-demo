import { http } from "@/app/providers/axios/http";
import { changeToFormData } from "@/shared/utils/formatter";
import type { Submission, SubmissionPhoto } from "@/entities/submission";
import type {
  PatchedSubmissionUpdateRequest,
  SubmissionCreateRequest,
} from "./types";

// Поток заявки: черновик -> фото -> отправка на проверку

export const createSubmission = (data: SubmissionCreateRequest) => {
  return http.post<Submission>("/criteria/submissions/", data);
};

export const updateSubmission = (
  uuid: string,
  data: PatchedSubmissionUpdateRequest,
) => {
  return http.patch<Submission>(`/criteria/submissions/${uuid}/`, data);
};

export const uploadSubmissionPhoto = (uuid: string, image: File) => {
  return http.post<SubmissionPhoto>(
    `/criteria/submissions/${uuid}/photos/`,
    changeToFormData({ image }),
  );
};

export const deleteSubmissionPhoto = (photoUuid: string) => {
  return http.delete(`/criteria/photos/${photoUuid}/`);
};

export const submitSubmission = (uuid: string) => {
  return http.post<Submission>(`/criteria/submissions/${uuid}/submit/`);
};
