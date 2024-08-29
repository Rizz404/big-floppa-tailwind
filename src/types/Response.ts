import { AxiosError } from "axios";

export interface MutationResponse<T> {
  data: T;
  message: string;
}

export interface PaginationState {
  totalData: number;
  dataPerpage: number;
  currentPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface PaginatedResponse<T> {
  paginationState: PaginationState;
  data: T[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  additionalInfo?: Record<string, any>;
}

export interface ErrorResponse {
  message: string;
}

export type CustomAxiosError = AxiosError<ErrorResponse>;
