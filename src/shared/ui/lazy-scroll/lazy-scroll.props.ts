import type { ResponsePagination } from "@/shared/types";

export interface LazyScrollProps {
  onLoadMore: () => Promise<void> | void;
  isLoading?: boolean;
  pagination: ResponsePagination;
  threshold?: number;
}
