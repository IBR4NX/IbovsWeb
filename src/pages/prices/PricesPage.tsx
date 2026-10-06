import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import { PriceFilters } from "@/components/prices/PriceFilters";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/lib/api";
import PriceList from "@/components/prices/PriceList";
import type {
  FilterOption,
  PriceFiltersValue,
  PriceRecord,
  PricesResponse,
} from "@/features/catalog/types";
import { Seo, absoluteUrl } from "@/lib/seo";

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
      <Seo
        canonicalPath="/prices"
        title="أسعار المنتجات والسلع في اليمن اليوم"
        description="ابحث في أسعار المنتجات في اليمن حسب المدينة أو الفئة، وقارن أسعار السلع والمواد الغذائية المتاحة في صنعاء وتعز وعدن وبقية المدن."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "أسعار المنتجات والسلع في اليمن",
          description:
            "صفحة لعرض أسعار المنتجات في اليمن مع فلترة حسب المدينة والفئة واسم المنتج.",
          url: absoluteUrl("/prices"),
          isPartOf: {
            "@type": "WebSite",
            name: "Markets YE",
            url: absoluteUrl("/"),
          },
        }}
      />
      <main
        dir="rtl"
        className="min-h-screen bg-background px-4 py-6 text-foreground"
      >
        <div className="mx-auto w-full max-w-3xl">
          {/* Header */}
          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                أسعار المنتجات والسلع في اليمن اليوم
              </h1>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                استخدم البحث والفلاتر لمتابعة أسعار المنتجات حسب المدينة
                والفئة. النتائج تعتمد على البيانات المتاحة حالياً من النظام.
              </p>
            </div>

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

          <Card className="mb-6 border-border/70 bg-muted/30 py-0">
            <CardContent className="p-4 text-sm leading-7 text-muted-foreground">
              <h2 className="mb-1 font-semibold text-foreground">
                كيف تستخدم صفحة الأسعار؟
              </h2>
              <p>
                اكتب اسم المنتج لمعرفة سعره اليوم في اليمن، أو اختر مدينة مثل
                صنعاء أو تعز أو عدن عند توفرها في القائمة. يمكنك أيضاً اختيار
                فئة لمتابعة أسعار المواد الغذائية أو السلع ضمن نفس التصنيف.
              </p>
            </CardContent>
          </Card>

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
