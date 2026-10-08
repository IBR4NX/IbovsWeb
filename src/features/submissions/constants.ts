// <##☆##> Submissions Constants <##☆##>

import type { SubmissionStatus } from "./types";

export const STATUS_LABELS: Record<SubmissionStatus, string> = {
  pending: "قيد المراجعة",
  approved: "مقبول",
  rejected: "مرفوض",
};

export const STATUS_STYLES: Record<SubmissionStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
  approved: "bg-green-100 text-green-800 hover:bg-green-100",
  rejected: "bg-red-100 text-red-800 hover:bg-red-100",
};