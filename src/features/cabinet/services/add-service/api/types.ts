export interface SubmissionItemWriteRequest {
  option: string;
  quantity: number;
}

export interface SubmissionCreateRequest {
  criterion: string;
  region: string;
  district: string;
  latitude?: string | null;
  longitude?: string | null;
  note?: string;
  items?: SubmissionItemWriteRequest[];
}

export type PatchedSubmissionUpdateRequest = Partial<SubmissionCreateRequest>;
