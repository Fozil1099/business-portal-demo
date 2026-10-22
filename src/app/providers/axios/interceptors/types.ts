export type TokenSubscriber = (accessToken: string) => void;

export interface ErrorResponseData {
  message?: string;
  [key: string]: any;
}

export interface RefreshTokenResponse {
  access: string;
  refresh?: string;
}
