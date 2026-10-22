import type { Pagination, ResponseData } from "@/shared/types";
import type { Criterion } from "@/entities/criterion";

export type {
  Criterion,
  CriterionOption,
  ScoringType,
} from "@/entities/criterion";

export interface CriteriaListParams extends Pagination {
  group?: string;
}

export type CriteriaList = ResponseData<Criterion>;
