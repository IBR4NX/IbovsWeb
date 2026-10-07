export interface CatalogEntity {
  id: string;
  name: string;
  is_active: boolean;
  created_at: string;
  updated_at?: string;
}

export interface Category extends CatalogEntity {
  description: string | null;
}

export type City = CatalogEntity;

export interface Product extends CatalogEntity {
  category_id: string;
  category_name: string;
  description: string | null;
  quantity: string | number;
  unit: string;
}

export type CatalogPayload = Record<string, string | number | boolean | null>;

export interface ApiResponse<T> {
  statusCode: string;
  data: T;
  message?: string;
}
