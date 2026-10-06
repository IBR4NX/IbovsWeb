import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
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

type FixedFilterKey = keyof PriceFiltersValue;

interface PricesScopePageProps {
  canonicalPath: string;
  description: (value: string, extraValue: string) => string;
  emptyLabel: string;
  extraFixedFilter?: {
    key: FixedFilterKey;
    paramName: string;
    pathSegment?: string;
  };
  fixedFilterKey: FixedFilterKey;
  invalidLabel: string;
  loadingLabel: (value: string, extraValue: string) => string;
  paramName: string;
  summary: (value: string, extraValue: string) => string;
  title: (value: string, extraValue: string) => string;
}

function decodeRouteParam(param?: string) {
  return decodeURIComponent(param ?? "").trim();
}

function fixedOption(value: string): FilterOption[] {
  return value ? [{ id: value, name: value }] : [];
}

function fixedFilters(key: FixedFilterKey, value: string): PriceFiltersValue {
  return {
    cityName: key === "cityName" ? value : "",
    categoryName: key === "categoryName" ? value : "",
    search: key === "search" ? value : "",
  };
}

function withFixedFilter(
  filters: PriceFiltersValue,
  key: FixedFilterKey,
  value: string,
): PriceFiltersValue {
  return {
    ...filters,
    [key]: value,
  };
}

function enforceFixedFilter(
  filters: PriceFiltersValue,
  key: FixedFilterKey,
  value: string,
  extraFilter?: {
    key: FixedFilterKey;
    value: string;
  },
) {
  const nextFilters = withFixedFilter(filters, key, value);

  return extraFilter
    ? withFixedFilter(nextFilters, extraFilter.key, extraFilter.value)
    : nextFilters;
}

function toRequestParams(filters: PriceFiltersValue) {
  return {
    cityName: filters.cityName || undefined,
    categoryName: filters.categoryName || undefined,
    search: filters.search.trim() || undefined,
  };
}

export default function PricesScopePage({
  canonicalPath,
  description,
  emptyLabel,
  extraFixedFilter,
  fixedFilterKey,
  invalidLabel,
  loadingLabel,
  paramName,
  summary,
  title,
}: PricesScopePageProps) {
  const params = useParams();
  const fixedValue = useMemo(
    () => decodeRouteParam(params[paramName]),
    [paramName, params],
  );
  const extraFixedValue = useMemo(
    () => decodeRouteParam(params[extraFixedFilter?.paramName ?? ""]),
    [extraFixedFilter?.paramName, params],
  );

  const [prices, setPrices] = useState<PriceRecord[]>([]);
  const [cities, setCities] = useState<FilterOption[]>([]);
  const [categories, setCategories] = useState<FilterOption[]>([]);
  const [filters, setFilters] = useState<PriceFiltersValue>(() =>
    fixedFilters(fixedFilterKey, fixedValue),
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  const canonicalUrl = `${window.location.origin}${canonicalPath}/${encodeURIComponent(fixedValue)}`;
  const canonicalUrlWithExtra = extraFixedFilter
    ? `${canonicalUrl}/${extraFixedFilter.pathSegment ?? extraFixedFilter.paramName}/${encodeURIComponent(extraFixedValue)}`
    : canonicalUrl;
  const pageTitle = title(fixedValue, extraFixedValue);
  const cityOptions = fixedFilterKey === "cityName" ? fixedOption(fixedValue) : cities;
  const categoryOptions =
    fixedFilterKey === "categoryName" ? fixedOption(fixedValue) : categories;

  useEffect(() => {
    setFilters(
      enforceFixedFilter(
        fixedFilters(fixedFilterKey, fixedValue),
        fixedFilterKey,
        fixedValue,
        extraFixedFilter
          ? { key: extraFixedFilter.key, value: extraFixedValue }
          : undefined,
      ),
    );
  }, [extraFixedFilter, extraFixedValue, fixedFilterKey, fixedValue]);

  useEffect(() => {
    let cancelled = false;

    async function loadFilterOptions() {
      try {
        const requests = [];

        if (fixedFilterKey !== "cityName" && extraFixedFilter?.key !== "cityName") {
          requests.push(api.get<OptionsResponse>("/cities"));
        }
        if (fixedFilterKey !== "categoryName" && extraFixedFilter?.key !== "categoryName") {
          requests.push(api.get<OptionsResponse>("/categories"));
        }

        const responses = await Promise.all(requests);
        if (cancelled) return;

        let responseIndex = 0;
        if (fixedFilterKey !== "cityName" && extraFixedFilter?.key !== "cityName") {
          setCities(responses[responseIndex].data.data);
          responseIndex += 1;
        }
        if (fixedFilterKey !== "categoryName" && extraFixedFilter?.key !== "categoryName") {
          setCategories(responses[responseIndex].data.data);
        }
      } catch {
        if (!cancelled) setError("تعذر تحميل خيارات الفلترة.");
      }
    }

    loadFilterOptions();
    return () => {
      cancelled = true;
    };
  }, [extraFixedFilter?.key, fixedFilterKey]);

  useEffect(() => {
    if (!fixedValue || (extraFixedFilter && !extraFixedValue)) {
      setPrices([]);
      setLoading(false);
      setError(invalidLabel);
      return;
    }

    const controller = new AbortController();
    const fixedCurrentFilters = enforceFixedFilter(
      filters,
      fixedFilterKey,
      fixedValue,
      extraFixedFilter
        ? { key: extraFixedFilter.key, value: extraFixedValue }
        : undefined,
    );
    const timer = window.setTimeout(
      async () => {
        setLoading(true);
        setError("");

        try {
          const response = await api.get<PricesResponse>("/prices", {
            params: toRequestParams(fixedCurrentFilters),
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
      fixedCurrentFilters.search.trim() &&
        fixedFilterKey !== "search"
        ? 350
        : 0,
    );

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [extraFixedFilter, extraFixedValue, filters, fixedFilterKey, fixedValue, invalidLabel, reloadKey]);

  return (
    <>
      <Seo
        canonicalPath={new URL(canonicalUrlWithExtra).pathname}
        title={pageTitle}
        description={description(fixedValue, extraFixedValue)}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: pageTitle,
          description: description(fixedValue, extraFixedValue),
          url: absoluteUrl(new URL(canonicalUrlWithExtra).pathname),
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
                render={<Link to="/prices" />}
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
                {summary(fixedValue, extraFixedValue)}
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
            categories={categoryOptions}
            onChange={(changes) =>
              setFilters((currentFilters) =>
                enforceFixedFilter(
                  {
                    ...currentFilters,
                    ...changes,
                  },
                  fixedFilterKey,
                  fixedValue,
                  extraFixedFilter
                    ? { key: extraFixedFilter.key, value: extraFixedValue }
                    : undefined,
                ),
              )
            }
            onClear={() =>
              setFilters(
                enforceFixedFilter(
                  fixedFilters(fixedFilterKey, fixedValue),
                  fixedFilterKey,
                  fixedValue,
                  extraFixedFilter
                    ? { key: extraFixedFilter.key, value: extraFixedValue }
                    : undefined,
                ),
              )
            }
          />

          <Card className="mb-6 border-border/70 bg-muted/30 py-0">
            <CardContent className="p-4 text-sm leading-7 text-muted-foreground">
              <h2 className="mb-1 font-semibold text-foreground">
                نتائج مخصصة حسب البيانات المتاحة
              </h2>
              <p>
                يتم عرض الأسعار المطابقة للفلاتر الحالية فقط. إذا لم تظهر
                نتيجة، فهذا يعني أن البيانات غير متوفرة حالياً لهذا البحث أو أن
                الفلاتر بحاجة لتغيير.
              </p>
            </CardContent>
          </Card>

          {loading && (
            <Card>
              <CardContent className="p-5 text-center text-base font-medium text-muted-foreground">
                {loadingLabel(fixedValue, extraFixedValue)}
              </CardContent>
            </Card>
          )}

          {!loading && error && (
            <Card className="border-red-300 bg-red-50 dark:border-red-400/30 dark:bg-red-950/30">
              <CardContent className="p-5 text-red-800 dark:text-red-200">
                <p className="text-base font-semibold">{error}</p>
                <p className="mt-2 text-sm">تحقق من تشغيل الخادم وإعداداته.</p>
              </CardContent>
            </Card>
          )}

          {!loading && !error && prices.length === 0 && (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-base font-medium text-muted-foreground">
                  {emptyLabel}
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
