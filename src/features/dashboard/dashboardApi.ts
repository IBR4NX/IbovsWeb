import { api } from "@/lib/api";

export interface DashboardStatistics {
  total_users: string | number;
  total_products: string | number;
  total_categories: string | number;
  total_cities: string | number;
  pending_submissions: string | number;
  approved_submissions: string | number;
  rejected_submissions: string | number;
  current_prices_count: string | number;
}

interface DashboardResponse {
  statusCode: string;
  message?: string;
  data: DashboardStatistics;
}

export async function getDashboardStatistics(): Promise<DashboardStatistics> {
  const response = await api.get<DashboardResponse>("/dashboard/statistics");

  if (response.data.statusCode !== "10000") {
    throw new Error(response.data.message || "تعذر تحميل إحصاءات لوحة التحكم.");
  }

  return response.data.data;
}
