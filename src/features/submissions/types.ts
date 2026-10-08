// <##☆##> Submissions Types <##☆##>

export type SubmissionStatus = "pending" | "approved" | "rejected";

export interface Submission {
  id: string;
  product_name: string;
  city_name: string;
  user_name: string;
  price: number;
  note: string | null;
  submitted_at: string;
}

export interface CreateSubmissionInput {
  product_name: string;
  city_name: string;
  price: number;
  note?: string | null;
}

export interface RejectSubmissionInput {
  reason: string;
}