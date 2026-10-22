import type { SubmissionStatus } from "../model/types";

export const statusColor: Record<
  SubmissionStatus,
  "gray" | "yellow" | "primary" | "danger"
> = {
  DRAFT: "gray",
  SUBMITTED: "yellow",
  APPROVED: "primary",
  REJECTED: "danger",
};

// Компания может править только черновик и отклонённую заявку
export const isEditable = (status: SubmissionStatus) =>
  status === "DRAFT" || status === "REJECTED";

// "10.00" -> "10"
export const formatPoints = (value: string | number | null) =>
  value === null ? "0" : String(Number(value));
