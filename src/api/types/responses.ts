export interface ApiResponse<T> {
  ok: boolean;
  data: T;
}

export interface ErrorResponse {
  message: string;
}
