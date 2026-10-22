import { loginRequest, selectCompanyRequest } from "../api/auth";
import type {
  AuthData,
  CompanySelectionData,
  LoginData,
  LoginPayload,
  SelectCompanyPayload,
} from "../api/types";
import type { AuthCompany } from "@/shared/types";
import {
  clearAuthTokens,
  clearUserData,
  setAccessToken,
  setRefreshToken,
  setUserData,
} from "@/shared/utils/auth";

export const isCompanySelectionRequired = (
  data: LoginData,
): data is CompanySelectionData => "selection_token" in data;

export const useAuth = () => {
  const login = (data: LoginPayload) => loginRequest(data);

  const selectCompany = (data: SelectCompanyPayload) =>
    selectCompanyRequest(data);

  const saveSession = (data: AuthData, company: AuthCompany | null = null) => {
    if (!data.access || !data.refresh) {
      throw new Error("Auth response has no tokens");
    }

    const activeCompany = company ?? data.company ?? null;
 
    setAccessToken(data.access);
    setRefreshToken(data.refresh);
    setUserData({
      ...data.user,
      company: activeCompany,
      company_id: activeCompany?.uuid ?? null,
    });
  };

  const logout = () => {
    clearAuthTokens();
    clearUserData();
  };

  return {
    login,
    selectCompany,
    saveSession,
    logout,
  };
};
