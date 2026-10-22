import type { Pagination, ResponseData } from "@/shared/types";

export interface Employee {
  uuid: string;
  username: string;
  email: string;
  full_name: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  phone_numbers: string[] | null;
  position: string | null;
  is_active: boolean;
  user_is_active: boolean;
  company: string;
  company_name: string;
  created_at: string;
  updated_at: string;
}

export interface EmployeeListParams extends Pagination {
  is_active?: boolean;
  search?: string;
}

export type EmployeeList = ResponseData<Employee>;

export interface EmployeeCreatePayload {
  username: string;
  password: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  middle_name?: string;
  phone_numbers?: string[];
  position?: string;
}

export interface EmployeeUpdatePayload {
  first_name?: string;
  last_name?: string;
  middle_name?: string;
  email?: string;
  phone_numbers?: string[];
  position?: string;
  is_active?: boolean;
}
