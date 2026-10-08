// <##☆##> Submission Status Badge <##☆##>

import { Badge } from "@/components/ui/badge";
import { STATUS_LABELS, STATUS_STYLES } from "../constants";
import type { SubmissionStatus } from "../types";

interface Props {
  status: SubmissionStatus;
}

export function SubmissionStatusBadge({ status }: Props) {
  return (
    <Badge className={STATUS_STYLES[status]}>{STATUS_LABELS[status]}</Badge>
  );
}