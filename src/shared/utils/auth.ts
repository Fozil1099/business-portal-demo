import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/shared/config/auth";
import type { UserData } from "@/shared/types";

export function setAccessToken(value: string): void {
  setCookie(ACCESS_TOKEN_KEY, value, 7);
}

export function getAccessToken(): string {
  return getCookie(ACCESS_TOKEN_KEY);
}

export function setRefreshToken(value: string): void {
  setCookie(REFRESH_TOKEN_KEY, value, 7);
}

export function getRefreshToken(): string {
  return getCookie(REFRESH_TOKEN_KEY);
}

export function clearAuthTokens(): void {
  deleteCookie(ACCESS_TOKEN_KEY);
  deleteCookie(REFRESH_TOKEN_KEY);
}

export function getUserData(): UserData | null {
  const userData = getCookie("userData");
  if (!userData) return null;

  try {
    return JSON.parse(userData);
  } catch {
    return null;
  }
}

export function setUserData(data: UserData): void {
  setCookie("userData", JSON.stringify(data), 7);
}

export function clearUserData(): void {
  deleteCookie("userData");
}

function setCookie(name: string, value: string, expirationDays: number): void {
  const date = new Date();
  date.setTime(date.getTime() + expirationDays * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie =
    name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/";
}

function getCookie(name: string): string {
  for (const cookie of document.cookie.split("; ")) {
    const separatorIndex = cookie.indexOf("=");
    if (cookie.slice(0, separatorIndex) === name) {
      const value = cookie.slice(separatorIndex + 1);
      try {
        return decodeURIComponent(value);
      } catch {
        return value;
      }
    }
  }
  return "";
}

function deleteCookie(name: string): void {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
}

export const check = (_role: string[] | string): boolean => {
  // !TODO should finish it

  // if (role) {
  //   const staffRoles = getUserData()?.modules?.map((item) => item.name) || [];

  //   if (Array.isArray(role)) {
  //     return role.some((item) => staffRoles.includes(item));
  //   }
  //   return staffRoles.includes(role);
  // }

  return true;
};

/**
 * Return if user is logged in
 * This is completely up to you and how you want to store the token in your frontend application
 * e.g. If you are using cookies to store the application please update this function
 */

export const isUserLoggedIn = () => !!(getAccessToken() && getRefreshToken());
