export interface CompanyBriefScore {
  uuid: string;
  name: string;
  tin: string;
}

export type CertificateStatus = "ACTIVE" | "REVOKED";

export interface Certificate {
  uuid: string;
  number: string;
  company: string;
  company_name: string;
  company_tin: string;
  issued_at: string;
  points_at_issue: string;
  target_at_issue: string;
  status: CertificateStatus;
  revoked_at: string | null;
  revoked_reason: string;
  revoked_until: string | null;
  pdf_url: string;
  image_url: string;
}

export interface CriterionScore {
  criterion: string;
  code: string;
  title: string;
  group_code: string;
  group_title: string;
  scoring_type: string;
  is_active: boolean;
  image_url: string | null;
  points: string;
  max_points: string | null;
  remaining_points: string | null;
  approved_claims: number;
  last_awarded_at: string | null;
  pending_claims: number;
  pending_points: string;
}

export interface CompanyCriteriaScore {
  company: CompanyBriefScore;
  points: string;
  target_points: string;
  remaining_points: string;
  progress_percent: string;
  target_reached: boolean;
  certificate: Certificate | null;
  criteria: CriterionScore[];
}
