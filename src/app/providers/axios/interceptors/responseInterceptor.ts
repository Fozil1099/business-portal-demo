import type { AxiosResponse, AxiosError } from "axios";
import { toast } from "vue3-toastify";
import type { AxiosInstance } from "axios";
import type { ErrorResponseData } from "./types";
import { TokenRefreshManager } from "./tokenRefresh";

const SUCCESS_MESSAGE_DELAY = 200;
const HTTP_UNAUTHORIZED = 401;
const HTTP_LOCKED = 423;

export class ResponseInterceptorHandler {
  private tokenRefreshManager: TokenRefreshManager;

  constructor(tokenRefreshManager: TokenRefreshManager) {
    this.tokenRefreshManager = tokenRefreshManager;
  }

  handleSuccess(response: AxiosResponse): AxiosResponse {
    if (
      response.data?.message &&
      response.config.method !== "get" &&
      response.status == 200
    ) {
      setTimeout(() => {
        toast.success(response.data.message);
      }, SUCCESS_MESSAGE_DELAY);
    }
    return response.data;
  }

  async handleError(
    error: AxiosError<ErrorResponseData>,
    http: AxiosInstance,
  ): Promise<any> {
    // Обработка 401 ошибки (Unauthorized).
    // Запросы без токена (логин, выбор компании) не обновляют токен.
    if (
      error.response?.status === HTTP_UNAUTHORIZED &&
      error.config?.headers?.Authorization
    ) {
      return this.tokenRefreshManager.handle401Error(error, http);
    }

    // Обработка других ошибок
    this.handleOtherErrors(error);
    return Promise.reject(error);
  }

  private handleOtherErrors(error: AxiosError<ErrorResponseData>): void {
    const { response } = error;

    if (
      response &&
      typeof response.data === "object" &&
      response.data !== null &&
      response.status !== HTTP_LOCKED &&
      response.data.message
    ) {
      toast.error(response.data.message);
    }
  }
}
