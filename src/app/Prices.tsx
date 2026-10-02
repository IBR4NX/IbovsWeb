import { useEffect, useMemo, useState } from "react";
import PriceList from "../components/card/PriceList";
import { getPrices } from "../features/api/pricesApi";
import type { PriceRecord } from "../features/types/prices";

interface FilterOption {
  id: string;
  name: string;
}

function getOptions(items: PriceRecord[], idKey: "city_id" | "category_id", nameKey: "city_name" | "category_name"): FilterOption[] {
  const options = new Map<string, string>();
  for (const item of items) {
    options.set(item[idKey], item[nameKey]);
  }
  return Array.from(options, ([id, name]) => ({ id, name }));
}

export default function Prices() {
  const [prices, setPrices] = useState<PriceRecord[]>([]);
  const [cities, setCities] = useState<FilterOption[]>([]);
  const [categories, setCategories] = useState<FilterOption[]>([]);
  const [search, setSearch] = useState("");
  const [cityId, setCityId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const timer = window.setTimeout(async () => {
      setLoading(true);
      setError("");

      try {
        const data = await getPrices({ cityId, categoryId, search });
        if (cancelled) return;

        setPrices(data);
        if (!cityId && !categoryId && !search.trim()) {
          setCities(getOptions(data, "city_id", "city_name"));
          setCategories(getOptions(data, "category_id", "category_name"));
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "تعذر تحميل الأسعار.",
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, search.trim() ? 300 : 0);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [cityId, categoryId, search, reloadKey]);

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-background px-4 py-6 text-foreground"
    >
      <div className="mx-auto w-full max-w-3xl">

        {/* Header */}
        <div className="mb-5 flex items-center justify-between gap-4">
          <h1 className="text-2xl font-bold tracking-tight">
            أسعار المنتجات
          </h1>

          <button
            type="button"
            onClick={() => setReloadKey((key) => key + 1)}
            disabled={loading}
            className="shrink-0 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted disabled:cursor-wait disabled:opacity-60"
          >
            {loading ? "جارٍ التحميل..." : "تحديث الأسعار"}
          </button>
        </div>

        {/* Filters */}
        <section className="mb-6 rounded-2xl border border-border bg-card p-3 shadow-sm">
          <div className="grid grid-cols-4 gap-2">

            {/* Search */}
            <div className="min-w-30 col-span-2 ">
              <label
                htmlFor="product-search"
                className="mb-1.5 block truncate text-xs font-semibold"
              >
                البحث
              </label>

              <input
                id="product-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="المنتج"
                className="h-11 w-full min-w-0 rounded-xl border border-input bg-background px-2.5 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* City */}
            <div className="min-w-0">
              <label
                htmlFor="city-filter"
                className="mb-1.5 block truncate text-xs font-semibold"
              >
                المدينة
              </label>

              <select
                id="city-filter"
                value={cityId}
                onChange={(event) => setCityId(event.target.value)}
                className="h-11 w-full min-w-0 rounded-xl border border-input bg-background px-2.5 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                <option value="">كل المدن</option>

                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Category */}
            <div className="min-w-0">
              <label
                htmlFor="category-filter"
                className="mb-1.5 block truncate text-xs font-semibold"
              >
                الفئة
              </label>

              <select
                id="category-filter"
                value={categoryId}
                onChange={(event) => setCategoryId(event.target.value)}
                className="h-11 w-full min-w-0 rounded-xl border border-input bg-background px-2.5 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                <option value="">كل الفئات</option>

                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

          </div>
        </section>

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
            <p className="text-base font-semibold">
              {error}
            </p>

            <p className="mt-2 text-sm">
              تحقق من تشغيل الخادم وإعداداته.
            </p>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && prices.length === 0 && (
          <div className="rounded-2xl border border-border bg-card p-6 text-center">
            <p className="text-base font-medium text-muted-foreground">
              {search || cityId || categoryId
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
  );
}