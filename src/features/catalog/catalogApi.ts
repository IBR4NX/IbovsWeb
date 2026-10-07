import { api } from "@/lib/api";

import type { ApiResponse, CatalogEntity, CatalogPayload } from "./adminTypes";

function unwrap<T>(response: ApiResponse<T>): T {
  if (response.statusCode !== "10000") {
    throw new Error(response.message || "تعذر إكمال الطلب.");
  }

  return response.data;
}

export async function getCatalogItems<T extends CatalogEntity>(
  resource: string,
  options: {
    includeInactive: boolean;
    search?: string;
    categoryId?: string;
    cityId?: string;
  },
): Promise<T[]> {
  const response = await api.get<ApiResponse<T[]>>(resource, {
    params: {
      includeInactive: options.includeInactive || undefined,
      search: options.search?.trim() || undefined,
      categoryId: options.categoryId || undefined,
      cityId: options.cityId || undefined,
    },
  });
  return unwrap(response.data);
}

export async function createCatalogItem<T extends CatalogEntity>(
  resource: string,
  payload: CatalogPayload,
): Promise<T> {
  const response = await api.post<ApiResponse<T>>(resource, payload);
  return unwrap(response.data);
}

export async function updateCatalogItem<T extends CatalogEntity>(
  resource: string,
  id: string,
  payload: CatalogPayload,
): Promise<T> {
  const response = await api.patch<ApiResponse<T>>(`${resource}/${id}`, payload);
  return unwrap(response.data);
}
