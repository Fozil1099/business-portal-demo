import axios, { type AxiosRequestConfig } from "axios";
import type { ApiResponse } from "@/shared/types";
import { setupInterceptors } from "./interceptors";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  timeout: 10000,
});

setupInterceptors(instance);

/**
 * The response interceptor returns the body, and every endpoint wraps its
 * payload as `{ id, message, data, success }`. `T` is the type of `data`.
 */
export interface HttpClient {
  get<T = unknown>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>>;
  delete<T = unknown>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>>;
  post<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>>;
  put<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>>;
  patch<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>>;
  /** Binary download: the body is a Blob, not the JSON wrapper. */
  getFile(url: string, config?: AxiosRequestConfig): Promise<Blob>;
}

const http: HttpClient = {
  get: (url, config) => instance.get(url, config),
  delete: (url, config) => instance.delete(url, config),
  post: (url, data, config) => instance.post(url, data, config),
  put: (url, data, config) => instance.put(url, data, config),
  patch: (url, data, config) => instance.patch(url, data, config),
  getFile: (url, config) =>
    instance.get(url, { ...config, responseType: "blob" }),
};

export { http };
