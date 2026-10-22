import type { AuthCompany, AuthUser } from "@/shared/types";

export interface LoginPayload {
  username: string;
  password: string;
}

export interface SelectCompanyPayload {
  selection_token: string;
  company: string;
}

/** Authorized session: returned by login and by select-company. */
export interface AuthData {
  access: string;
  refresh: string;
  token_type: string;
  expires_in: number;
  idle_timeout_in: number;
  user: AuthUser;
  company?: AuthCompany | null;
}

/**
 * Returned by login (`id: "COMPANY_SELECTION_REQUIRED"`) when the user has
 * companies. The user is not authorized until one is confirmed via
 * select-company with this `selection_token`.
 */
export interface CompanySelectionData {
  selection_token: string;
  expires_in: number;
  companies: AuthCompany[];
}

export type LoginData = AuthData | CompanySelectionData;
