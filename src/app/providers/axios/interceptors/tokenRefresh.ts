import type {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import { setAccessToken, setRefreshToken } from "@/shared/utils/auth";
import { useAuthStore } from "@/app/store/auth";
import type { TokenSubscriber } from "./types";

export class TokenRefreshManager {
  private isAlreadyFetchingAccessToken = false;
  private subscribers: TokenSubscriber[] = [];

  private onAccessTokenFetched(accessToken: string): void {
    this.subscribers.forEach((callback) => callback(accessToken));
    this.subscribers = [];
  }

  private addSubscriber(callback: TokenSubscriber): void {
    this.subscribers.push(callback);
  }

  async handle401Error(error: AxiosError, http: AxiosInstance): Promise<any> {
    const { refreshToken, logout, refreshEndpoint } = useAuthStore();
    const originalRequest = error.config as InternalAxiosRequestConfig;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    const retryOriginalRequest = new Promise((resolve) => {
      this.addSubscriber((accessToken: string) => {
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        }
        resolve(http(originalRequest));
      });
    });

    if (!this.isAlreadyFetchingAccessToken) {
      this.isAlreadyFetchingAccessToken = true;

      try {
        const {
          data: { access, refresh },
        } = await refreshToken();
        this.isAlreadyFetchingAccessToken = false;
        setAccessToken(access);
        if (refresh) {
          setRefreshToken(refresh);
        }
        this.onAccessTokenFetched(access);
      } catch (refreshError) {
        this.isAlreadyFetchingAccessToken = false;
        this.subscribers = [];
        console.error("Token refresh failed:", refreshError);
        return Promise.reject(refreshError);
      }
    } else if (
      this.isAlreadyFetchingAccessToken &&
      originalRequest.url === refreshEndpoint
    ) {
      logout();
      return Promise.reject(error);
    }

    return retryOriginalRequest;
  }

  reset(): void {
    this.isAlreadyFetchingAccessToken = false;
    this.subscribers = [];
  }
}
