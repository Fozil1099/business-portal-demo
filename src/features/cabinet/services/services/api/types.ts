import type { Pagination, ResponseData } from "@/shared/types";
import type { Submission, SubmissionStatus } from "@/entities/submission";

export interface SubmissionListParams extends Pagination {
  // код критерия, не uuid
  criterion?: string;
  search?: string;
  status?: SubmissionStatus;
}

export type SubmissionList = ResponseData<Submission>;
