import type { PriceRecord, PricesResponse } from "../types/prices";

const API_BASE_URL = import.meta.env.VITE_API_URL?.replace(/\/+$/, "");

export interface PriceFilters {
  cityId: string;
  categoryId: string;
  search: string;
}

export async function getPrices(filters: PriceFilters): Promise<PriceRecord[]> {
  if (!API_BASE_URL) {
    throw new Error("أضف VITE_API_URL إلى ملف .env ثم أعد تشغيل Vite.");
  }

  const params = new URLSearchParams({
    cityId: filters.cityId,
    categoryId: filters.categoryId,
    search: filters.search.trim(),
  });

  const response = await fetch(`${API_BASE_URL}/prices?${params.toString()}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`تعذر جلب الأسعار (HTTP ${response.status})`);
  }

  const result = (await response.json()) as PricesResponse;

  if (!result.success) {
    throw new Error(result.message || "لم يتمكن الخادم من جلب الأسعار.");
  }

  if (!Array.isArray(result.data)) {
    throw new Error("تنسيق بيانات الأسعار غير صحيح.");
  }

  return result.data;
}