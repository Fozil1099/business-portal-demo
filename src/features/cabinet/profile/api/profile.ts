import { http } from "@/app/providers/axios/http";
import type {
  UserProfile,
  UpdateProfilePayload,
  ChangePasswordPayload,
} from "./types";

export const getCurrentUser = () => {
  return http.get<UserProfile>("/users/me/");
};

export const updateProfile = (data: UpdateProfilePayload) => {
  return http.patch<UserProfile>("/users/me/", data);
};

export const changePassword = (data: ChangePasswordPayload) => {
  return http.post<null>("/users/me/password/", data);
};
