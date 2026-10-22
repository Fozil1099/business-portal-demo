export type ScoringType = "BOOLEAN" | "QUANTITY";

export interface CriterionOption {
  uuid: string;
  code: string;
  title: string;
  title_ru: string | null;
  title_uz: string | null;
  unit: string;
  unit_ru: string | null;
  unit_uz: string | null;
  points_per_unit: string;
  is_active: boolean;
}

export interface Criterion {
  uuid: string;
  code: string;
  title: string;
  title_ru: string | null;
  title_uz: string | null;
  description: string;
  description_ru: string | null;
  description_uz: string | null;
  group: string;
  group_code: string;
  scoring_type: ScoringType;
  points: string;
  max_points: string | null;
  requires_photo: boolean;
  requires_location: boolean;
  allows_multiple: boolean;
  order: number;
  is_active: boolean;
  image_url: string | null;
  options: CriterionOption[];
}
