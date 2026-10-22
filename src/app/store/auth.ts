import { clearAuthTokens, clearUserData } from "@/shared/utils/auth";
import { defineStore } from "pinia";
import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  REFRESH_ENDPOINT,
} from "@/shared/config/auth";
import { getRefreshToken } from "@/shared/utils/auth";
import { http } from "@/app/providers/axios/http";
import type { RefreshTokenResponse } from "@/app/providers/axios/interceptors/types";

export const useAuthStore = defineStore("auth-store", () => {
  const refreshEndpoint = REFRESH_ENDPOINT;
  const refreshTokenKeyName = REFRESH_TOKEN_KEY;
  const accessTokenKeyName = ACCESS_TOKEN_KEY;

  const refreshToken = () => {
    return http.post<RefreshTokenResponse>(REFRESH_ENDPOINT, {
      refresh: getRefreshToken(),
    });
  };

  const logout = () => {
    clearAuthTokens();
    clearUserData();
  };

  return {
    refreshEndpoint,
    refreshTokenKeyName,
    accessTokenKeyName,
    refreshToken,
    logout,
  };
});
