// <##☆##> Catalog Options Hook <##☆##>

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export interface CatalogOption {
  id: string;
  name: string;
  is_active: boolean;
}

interface ApiResponse<T> {
  statusCode: string;
  message: string;
  data: T[];
}

const fetchCatalog = async (endpoint: string): Promise<CatalogOption[]> => {
  const { data } = await api.get<ApiResponse<CatalogOption>>(endpoint);
  return data.data.filter((item) => item.is_active);
};

export function useCatalogOptions() {
  const [cities, setCities] = useState<CatalogOption[]>([]);
  const [products, setProducts] = useState<CatalogOption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const [citiesData, productsData] = await Promise.all([
          fetchCatalog("/cities"),
          fetchCatalog("/products"),
        ]);
        if (!cancelled) {
          setCities(citiesData);
          setProducts(productsData);
        }
      } catch {
        if (!cancelled) {
          setCities([]);
          setProducts([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return { cities, products, loading };
}