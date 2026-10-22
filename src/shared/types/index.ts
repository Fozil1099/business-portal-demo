export type UserType = "ADMIN" | (string & {});

export interface AuthUser {
  uuid: string;
  username: string;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  middle_name: string | null;
  full_name: string | null;
  user_type: UserType;
  is_validated: boolean;
  is_identified: boolean;
}

export interface AuthCompany {
  uuid: string;
  name: string;
  tin: string;
  acron_uz: string | null;
  logo: string | null;
  is_certified: boolean;
}

export interface ApiResponse<T> {
  id: string;
  message: string;
  data: T;
  success: boolean;
}

export type CompanyPk = number | string;

export interface UserData extends AuthUser {
  company: AuthCompany | null;
  company_id: CompanyPk | null;
}

export type Lang = {
  uz: string;
  ru: string;
};
export interface ResponsePagination {
    total_items?: number;
    total_pages?: number;
    current_page: number;
    page_size: number;
    count?: number;
    next_page?: number | null;
    prev_page?: number | null;
  }

export interface ResponseData<T> {
  pagination: ResponsePagination;
  results: T[];
}

export interface Pagination {
  page?: number;
  page_size?: number;
}
