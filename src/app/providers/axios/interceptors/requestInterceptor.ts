import type { InternalAxiosRequestConfig } from "axios";
import { getAccessToken } from "@/shared/utils/auth";
import i18n from "@/app/providers/i18n";

const DEFAULT_LANGUAGE = i18n.global.locale.value as string;

type RequestInterceptorFulfilled = (
  config: InternalAxiosRequestConfig
) => InternalAxiosRequestConfig;
type RequestInterceptorRejected = (error: any) => Promise<never>;

export function setupRequestInterceptor(): [
  RequestInterceptorFulfilled,
  RequestInterceptorRejected
] {
  return [
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
      const token = getAccessToken();

      // Инициализируем headers, если их нет
      if (!config.headers) {
        config.headers = {} as any;
      }

      const headers = config.headers as Record<string, any>;

      // Добавляем токен авторизации, если он есть и не запрещено
      if (token && !headers.no_add_token) {
        headers.Authorization = `Bearer ${token}`;
      }

      // Удаляем флаг no_add_token после использования
      if (headers.no_add_token) {
        delete headers.no_add_token;
      }

      // Устанавливаем язык по умолчанию
      headers["Accept-Language"] = DEFAULT_LANGUAGE;

      return config;
    },
    (error: any) => {
      return Promise.reject(error);
    },
  ];
}
