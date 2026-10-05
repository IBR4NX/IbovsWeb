import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { PriceFilters } from "@/components/prices/PriceFilters";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import PriceList from "@/components/prices/PriceList";
import type {
  FilterOption,
  PriceFiltersValue,
  PriceRecord,
  PricesResponse,
} from "@/features/catalog/types";

interface OptionsResponse {
  data: FilterOption[];
}

const initialFilters: PriceFiltersValue = {
  cityName: "",
  categoryName: "",
  search: "",
};

export default function Prices() {
  const [prices, setPrices] = useState<PriceRecord[]>([]);
  const [cities, setCities] = useState<FilterOption[]>([]);
  const [categories, setCategories] = useState<FilterOption[]>([]);
  const [filters, setFilters] = useState<PriceFiltersValue>(initialFilters);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  // function to fetch cities and categories for the filters
  useEffect(() => {
    let cancelled = false;

    async function loadFilterOptions() {
      try {
        const [citiesResponse, categoriesResponse] = await Promise.all([
          api.get<OptionsResponse>("/cities"),
          api.get<OptionsResponse>("/categories"),
        ]);

        if (!cancelled) {
          setCities(citiesResponse.data.data);
          setCategories(categoriesResponse.data.data);
        }
      } catch {
        if (!cancelled) setError("تعذر تحميل خيارات الفلترة.");
      }
    }

    loadFilterOptions();
    return () => {
      cancelled = true;
    };
  }, []);
  //#region  //   function to fetch prices based on the filters and reloadKey
  useEffect(() => {
    const controller = new AbortController();
    const timer = window.setTimeout(
      async () => {
        setLoading(true);
        setError("");

        try {
          const response = await api.get<PricesResponse>("/prices", {
            params: {
              cityName: filters.cityName || undefined,
              categoryName: filters.categoryName || undefined,
              search: filters.search.trim() || undefined,
            },
            signal: controller.signal,
          });

          if (!response.data.success || !Array.isArray(response.data.data)) {
            throw new Error(response.data.message || "تعذر تحميل الأسعار.");
          }

          setPrices(response.data.data);
        } catch (loadError) {
          if (!controller.signal.aborted) {
            setError(
              loadError instanceof Error
                ? loadError.message
                : "تعذر تحميل الأسعار.",
            );
          }
        } finally {
          if (!controller.signal.aborted) setLoading(false);
        }
      },
      filters.search.trim() ? 350 : 0,
    );

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [filters, reloadKey]);
  //#endregion
  return (
    <>
      <Helmet>
        <title>أسعار المنتجات في اليمن | Markets YE</title>

        <meta
          name="description"
          content="تعرّف على أحدث أسعار المنتجات في اليمن حسب المنتج والمدينة، مع إمكانية البحث والتصفية حسب التصنيف والمدينة."
        />
      </Helmet>
      <main
        dir="rtl"
        className="min-h-screen bg-background px-4 py-6 text-foreground"
      >
        <div className="mx-auto w-full max-w-3xl">
          {/* Header */}
          <div className="mb-5 flex items-center justify-between gap-4">
            <h1 className="text-2xl font-bold tracking-tight">
              أسعار المنتجات في اليمن
            </h1>

            <Button
              type="button"
              onClick={() => setReloadKey((key) => key + 1)}
              disabled={loading}
              variant="outline"
              className="shrink-0"
            >
              <RefreshCw className={loading ? "animate-spin" : ""} />
              {loading ? "جارٍ التحميل..." : "تحديث الأسعار"}
            </Button>
          </div>

          <PriceFilters
            filters={filters}
            cities={cities}
            categories={categories}
            onChange={(changes) =>
              setFilters((currentFilters) => ({
                ...currentFilters,
                ...changes,
              }))
            }
            onClear={() => setFilters(initialFilters)}
          />

          {/* Loading */}
          {loading && (
            <div
              role="status"
              className="rounded-2xl border border-border bg-card p-5 text-center text-base font-medium text-muted-foreground"
            >
              جارٍ تحميل الأسعار...
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div
              role="alert"
              className="rounded-2xl border border-red-300 bg-red-50 p-5 text-red-800 dark:border-red-400/30 dark:bg-red-950/30 dark:text-red-200"
            >
              <p className="text-base font-semibold">{error}</p>

              <p className="mt-2 text-sm">تحقق من تشغيل الخادم وإعداداته.</p>
            </div>
          )}

          {/* Empty */}
          {!loading && !error && prices.length === 0 && (
            <div className="rounded-2xl border border-border bg-card p-6 text-center">
              <p className="text-base font-medium text-muted-foreground">
                {filters.search || filters.cityName || filters.categoryName
                  ? "لا توجد أسعار تطابق الفلاتر المحددة."
                  : "لا توجد بيانات أسعار حاليًا."}
              </p>
            </div>
          )}

          {/* Results */}
          {!loading && !error && prices.length > 0 && (
            <PriceList
              items={prices}
              labels={{
                price: "السعر",
                quantity: "الكمية",
                updated: "آخر تحديث",
              }}
            />
          )}
        </div>
      </main>
    </>
  );
}
