// <##☆##> Submissions API <##☆##>

import { api } from "@/lib/api";
import type {
  CreateSubmissionInput,
  RejectSubmissionInput,
  Submission,
} from "./types";

interface ApiResponse<T> {
  statusCode: string;
  message: string;
  data: T[];
}

type RawSubmission = Record<string, unknown>;

// Postgres returns DECIMAL as string — normalize once at the boundary
// so every consumer receives a proper typed Submission.
const toSubmission = (raw: RawSubmission): Submission => ({
  id: String(raw.id),
  product_name: String(raw.product_name),
  city_name: String(raw.city_name),
  user_name: String(raw.user_name),
  price: Number(raw.price),
  note: raw.note == null ? null : String(raw.note),
  submitted_at: String(raw.submitted_at),
});

export const submissionsApi = {
  async getAll(): Promise<Submission[]> {
    const { data } = await api.get<ApiResponse<RawSubmission>>("/submission");
    return data.data.map(toSubmission);
  },

  async create(input: CreateSubmissionInput): Promise<Submission> {
    const { data } = await api.post<ApiResponse<RawSubmission>>(
      "/submission",
      input,
    );
    return toSubmission(data.data[0]);
  },

  async approve(id: string): Promise<Submission> {
    const { data } = await api.patch<ApiResponse<RawSubmission>>(
      `/submission/${id}/approve`,
    );
    return toSubmission(data.data[0]);
  },

  async reject(id: string, input: RejectSubmissionInput): Promise<Submission> {
    const { data } = await api.patch<ApiResponse<RawSubmission>>(
      `/submission/${id}/reject`,
      input,
    );
    return toSubmission(data.data[0]);
  },
};