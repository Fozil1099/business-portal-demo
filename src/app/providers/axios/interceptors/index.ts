import type { AxiosInstance } from "axios";
import { setupRequestInterceptor } from "./requestInterceptor";
import { ResponseInterceptorHandler } from "./responseInterceptor";
import { TokenRefreshManager } from "./tokenRefresh";

export function setupInterceptors(http: AxiosInstance): void {
  const tokenRefreshManager = new TokenRefreshManager();
  const responseHandler = new ResponseInterceptorHandler(tokenRefreshManager);

  // Настройка request interceptor
  const [onFulfilled, onRejected] = setupRequestInterceptor();
  http.interceptors.request.use(onFulfilled, onRejected);

  // Настройка response interceptor
  http.interceptors.response.use(
    (response) => responseHandler.handleSuccess(response),
    (error) => responseHandler.handleError(error, http)
  );
}
