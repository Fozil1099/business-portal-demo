export interface CompanyOwnerBrief {
  uuid: string;
  username: string;
  full_name: string;
  phone_numbers: string[] | null;
}

export interface CompanyDetail {
  uuid: string;
  name: string;
  tin: string;
  acron_uz: string;
  logo: string | null;
  is_violator: boolean;
  status: boolean;
  region: string | null;
  district: string | null;
  city: string | null;
  director: CompanyOwnerBrief | null;
  owner: CompanyOwnerBrief | null;
  employees_count: number;
  points: string;
  target_points: string;
  progress_percent: string;
  has_certificate: boolean;
  certificate_number: string | null;
  le_tin: string | null;
  is_basic: boolean;
  legal_location: string | null;
  current_location: string | null;
  phone_numbers: string[] | null;
  created_at: string;
  updated_at: string;
}

export interface UpdateCompanyPayload {
  status?: boolean;
  is_violator?: boolean;
  phone_numbers?: string[] | null;
  legal_location?: string | null;
  current_location?: string | null;
}

export interface CompanyCar {
  id: number;
  name: string;
  number: string;
  serial_number: string;
}

export interface CreateCarPayload {
  name: string;
  number: string;
  serial_number: string;
}

export interface CompanyCertificate {
  id: number;
  file: string;
  file_name: string;
}
