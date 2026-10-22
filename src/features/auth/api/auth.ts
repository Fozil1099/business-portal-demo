import { http } from "@/app/providers/axios/http";
import type {
  AuthData,
  LoginData,
  LoginPayload,
  SelectCompanyPayload,
} from "./types";

export const loginRequest = (data: LoginPayload) =>
  http.post<LoginData>("/users/login/", data, {
    headers: {
      no_add_token: true,
    },
  });

export const selectCompanyRequest = (data: SelectCompanyPayload) =>
  http.post<AuthData>("/users/login/select-company/", data, {
    headers: {
      no_add_token: true,
    },
  });
