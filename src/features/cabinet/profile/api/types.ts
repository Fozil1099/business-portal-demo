import type { UserType } from "@/shared/types";

export interface CompanyBrief {
  uuid: string;
  name: string;
  tin: string;
  acron_uz: string;
  logo: string | null;
  is_certified: boolean;
}

export interface OperatorTerritory {
  region: string;
  region_uuid: string;
  district: string;
  district_uuid: string;
  village: string | null;
  village_uuid: string | null;
  position: string;
}

export interface UserProfile {
  uuid: string;
  username: string;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  middle_name: string | null;
  full_name: string;
  user_type: UserType;
  is_validated: boolean;
  is_identified: boolean;
  phone_numbers: string[] | null;
  birth_date: string | null;
  is_active: boolean;
  company: CompanyBrief;
  available_companies: unknown[];
  operator: OperatorTerritory | null;
  menu: unknown[];
  permissions?: unknown[];
}

export interface UpdateProfilePayload {
  username?: string;
  first_name?: string | null;
  last_name?: string | null;
  middle_name?: string | null;
  email?: string | null;
  phone_numbers?: string[] | null;
  birth_date?: string | null;
}

export interface ChangePasswordPayload {
  old_password: string;
  new_password: string;
  confirm_password: string;
}
