export interface PriceRecord {
  product_id: string;
  product_name: string;
  category_id: string;
  category_name: string;
  city_id: string;
  city_name: string;
  price: string | number;
  quantity: string | number;
  unit: string;
  updated_at: string;
}

export interface PricesResponse {
  success: boolean;
  data: PriceRecord[];
  message?: string;
}
