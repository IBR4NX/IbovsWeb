import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, RefreshCw } from "lucide-react";

import { PriceFilters } from "@/components/prices/PriceFilters";
import PriceList from "@/components/prices/PriceList";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import type {
  FilterOption,
  PriceFiltersValue,
  PriceRecord,
  PricesResponse,
} from "@/features/catalog/types";

import { api } from "@/lib/api";
import { Seo, absoluteUrl } from "@/lib/seo";

interface OptionsResponse {
  data: FilterOption[];
}

function fixedOption(value: string): FilterOption[] {
  return value ? [{ id: value, name: value }] : [];
}

function fixedFilters(city: string): PriceFiltersValue {
  return {
    cityName: city,
    categoryName: "",
    search: "",
  };
}

function toRequestParams(filters: PriceFiltersValue) {
  return {
    cityName: filters.cityName || undefined,
    categoryName: filters.categoryName || undefined,
    search: filters.search.trim() || undefined,
  };
}

export default function CityPricesPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const fixedValue = searchParams.get("city")?.trim() ?? "";

  const [prices, setPrices] = useState<PriceRecord[]>([]);
  const [cities, setCities] = useState<FilterOption[]>([]);
  const [categories, setCategories] = useState<FilterOption[]>([]);

  const [filters, setFilters] = useState<PriceFiltersValue>(() =>
    fixedFilters(fixedValue),
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  const pageTitle = fixedValue
    ? `أسعار المنتجات في ${fixedValue} اليوم`
    : "أسعار المنتجات في اليمن اليوم";

  const description = fixedValue
    ? `تعرف على أسعار المنتجات والسلع في ${fixedValue} اليوم، وتابع الأسعار حسب الفئة.`
    : "تابع أسعار المنتجات والسلع في اليمن حسب المدينة والفئة.";

  const summary = fixedValue
    ? `تعرف على أسعار المنتجات والسلع في ${fixedValue}، مع إمكانية البحث والتصفية حسب الفئة.`
    : "تابع أسعار المنتجات والسلع في اليمن، وابحث حسب المدينة والفئة.";

  const cityOptions = useMemo(
    () => (fixedValue ? fixedOption(fixedValue) : cities),
    [fixedValue, cities],
  );

  useEffect(() => {
    setFilters((current) => ({
      ...current,
      cityName: fixedValue,
    }));
  }, [fixedValue]);

  useEffect(() => {
    let cancelled = false;

    async function loadFilterOptions() {
      try {
        const [citiesResponse, categoriesResponse] = await Promise.all([
          api.get<OptionsResponse>("/cities"),
          api.get<OptionsResponse>("/categories"),
        ]);

        if (cancelled) return;

        setCities(citiesResponse.data.data);
        setCategories(categoriesResponse.data.data);
      } catch {
        if (!cancelled) {
          setError("تعذر تحميل خيارات الفلترة.");
        }
      }
    }

    loadFilterOptions();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const currentFilters: PriceFiltersValue = {
      ...filters,
      cityName: fixedValue,
    };

    const timer = window.setTimeout(
      async () => {
        setLoading(true);
        setError("");

        try {
          const response = await api.get<PricesResponse>("/prices", {
            params: toRequestParams(currentFilters),
            signal: controller.signal,
          });

          if (
            !response.data.success ||
            !Array.isArray(response.data.data)
          ) {
            throw new Error(
              response.data.message || "تعذر تحميل الأسعار.",
            );
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
          if (!controller.signal.aborted) {
            setLoading(false);
          }
        }
      },
      filters.search.trim() ? 350 : 0,
    );

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [filters, fixedValue, reloadKey]);

  function handleFiltersChange(changes: Partial<PriceFiltersValue>) {
    setFilters((current) => ({
      ...current,
      ...changes,
      cityName: fixedValue,
    }));
  }

  function handleClearFilters() {
    setFilters(fixedFilters(fixedValue));
  }

  function handleCityChange(city: string) {
    const nextParams = new URLSearchParams(searchParams);

    if (city) {
      nextParams.set("city", city);
    } else {
      nextParams.delete("city");
    }

    setSearchParams(nextParams);
  }

  return (
    <>
      <Seo
        canonicalPath="/"
        title={pageTitle}
        description={description}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: pageTitle,
          description,
          url: absoluteUrl("/"),
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
          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Button
                render={<Link to="/" />}
                type="button"
                variant="ghost"
                size="sm"
                className="mb-2 px-0 text-muted-foreground hover:bg-transparent"
              >
                <ArrowRight />
                كل الأسعار
              </Button>

              <h1 className="text-2xl font-bold tracking-tight">
                {pageTitle}
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">
                {summary}
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
            cities={cityOptions}
            categories={categories}
            onChange={handleFiltersChange}
            onClear={handleClearFilters}
          />

          {!fixedValue && (
            <Card className="mt-4">
              <CardContent className="p-4">
                <label
                  htmlFor="city"
                  className="mb-2 block text-sm font-medium"
                >
                  اختر المدينة
                </label>

                <select
                  id="city"
                  value={fixedValue}
                  onChange={(event) =>
                    handleCityChange(event.target.value)
                  }
                  className="w-full rounded-md border border-input bg-background p-2"
                >
                  <option value="">كل المدن</option>

                  {cities.map((city) => (
                    <option key={city.id} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </CardContent>
            </Card>
          )}

          <Card className="mb-6 mt-5 border-border/70 bg-muted/30 py-0">
            <CardContent className="p-4 text-sm leading-7 text-muted-foreground">
              <h2 className="mb-1 font-semibold text-foreground">
                نتائج مخصصة حسب البيانات المتاحة
              </h2>

              <p>
                يتم عرض الأسعار المطابقة للفلاتر الحالية فقط. إذا لم تظهر
                نتيجة، فقد تكون البيانات غير متوفرة حاليًا لهذا البحث أو
                تحتاج الفلاتر إلى التغيير.
              </p>
            </CardContent>
          </Card>

          {loading && (
            <Card>
              <CardContent className="p-5 text-center text-base font-medium text-muted-foreground">
                جارٍ تحميل الأسعار...
              </CardContent>
            </Card>
          )}

          {!loading && error && (
            <Card className="border-red-300 bg-red-50 dark:border-red-400/30 dark:bg-red-950/30">
              <CardContent className="p-5 text-red-800 dark:text-red-200">
                <p className="text-base font-semibold">{error}</p>

                <p className="mt-2 text-sm">
                  تحقق من تشغيل الخادم وإعداداته.
                </p>
              </CardContent>
            </Card>
          )}

          {!loading && !error && prices.length === 0 && (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-base font-medium text-muted-foreground">
                  لا توجد أسعار متاحة حاليًا.
                </p>
              </CardContent>
            </Card>
          )}

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