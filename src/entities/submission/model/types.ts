export type SubmissionStatus = "DRAFT" | "SUBMITTED" | "APPROVED" | "REJECTED";

export interface SubmissionItem {
  uuid: string;
  option: string;
  option_code: string;
  option_title: string;
  unit: string;
  quantity: number;
  unit_points: string | null;
  current_points_per_unit: string;
}

export interface SubmissionPhoto {
  uuid: string;
  image_url: string;
  original_name: string;
  mime_type: string;
  size: number;
  created_at: string;
}

export interface Submission {
  uuid: string;
  company: string;
  company_name: string;
  criterion: string;
  criterion_code: string;
  criterion_title: string;
  region: string;
  region_title: string;
  district: string;
  district_title: string;
  latitude: string | null;
  longitude: string | null;
  status: SubmissionStatus;
  note: string;
  submitted_at: string | null;
  reviewed_at: string | null;
  reviewed_by: string | null;
  reviewed_by_name: string;
  rejection_reason: string;
  awarded_points: string | null;
  potential_points: string;
  criterion_max_points: string | null;
  criterion_points_held: string;
  items: SubmissionItem[];
  photos: SubmissionPhoto[];
  created_at: string;
  updated_at: string;
}
