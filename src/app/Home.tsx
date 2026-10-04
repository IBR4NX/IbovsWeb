import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import PriceList from "../components/card/PriceList";
import { getPrices } from "../features/api/pricesApi";
import type { PriceRecord } from "../features/types/prices";
import { api } from "@/features/api";

interface CityOption {
  id: string;
  name: string;
}

export default function Home() {
  const [prices, setPrices] = useState<PriceRecord[]>([]);
  const [cities, setCities] = useState<CityOption[]>([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect( () => {
    async function fetchCities(){
      const response = await api.get("/cities");
      setCities(response.data.data);
      console.log("citiesList", cities);
    }
    fetchCities();
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadPrices() {
      setLoading(true);
      setError("");

      try {
        const data = await getPrices({
          cityId: selectedCity,
          categoryId: "",
          search: "",
        });

        if (cancelled) return;

        setPrices(data);

        if (!selectedCity) {
          const cityMap = new Map<string, string>();

          data.forEach((item) => {
            cityMap.set(item.city_id, item.city_name);
          });

          // setCities(
          //     Array.from(cityMap, ([id, name]) => ({
          //         id,
          //         name,
          //     })),
          // );
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "تعذر تحميل أسعار السوق.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadPrices();

    return () => {
      cancelled = true;
    };
  }, [selectedCity]);

  const productCount = new Set(prices.map((item) => item.product_id)).size;

  const cityCount = new Set(prices.map((item) => item.city_id)).size;

  return (
    <main dir="rtl" className="min-h-screen bg-background text-foreground">
      <div className="mx-auto w-full  px-4 pb-12 pt-5">
        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-3xl border border-border bg-card p-5 shadow-sm"
        >
          <Badge variant="secondary" className="rounded-lg px-3 py-1 text-sm">
            مؤشر أسعار السوق
          </Badge>

          <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight">
            اعرف سعر المنتج في مدينتك
          </h1>

          <p className="mt-3 text-base leading-7 text-muted-foreground">
            استعرض أسعار السلع والمواد وقارن الأسعار بين المدن بسهولة.
          </p>

          <Link to="/prices">
            <Button className="mt-6 h-12 w-full rounded-xl text-base font-bold">
              استعرض كل الأسعار
            </Button>
          </Link>
        </motion.section>

        {/* Statistics */}
        <section
          className="mt-5 grid grid-cols-3 gap-2"
          aria-label="ملخص الأسعار"
        >
          <Card className="border-border shadow-none">
            <CardContent className="p-3 text-center">
              <p className="text-xs leading-5 text-muted-foreground">
                سجلات الأسعار
              </p>

              <p className="mt-1 text-2xl font-extrabold tabular-nums">
                {loading ? "—" : prices.length}
              </p>
            </CardContent>
          </Card>

          <Card className="border-border shadow-none">
            <CardContent className="p-3 text-center">
              <p className="text-xs leading-5 text-muted-foreground">
                المنتجات
              </p>

              <p className="mt-1 text-2xl font-extrabold tabular-nums">
                {loading ? "—" : productCount}
              </p>
            </CardContent>
          </Card>

          <Card className="border-border shadow-none">
            <CardContent className="p-3 text-center">
              <p className="text-xs leading-5 text-muted-foreground">المدن</p>

              <p className="mt-1 text-2xl font-extrabold tabular-nums">
                {loading ? "—" : cityCount}
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Prices Section */}
        <section className="mt-9" aria-labelledby="home-prices-title">
          <div className="flex items-end justify-between gap-3">
            <div className="min-w-0">
              <h2
                id="home-prices-title"
                className="text-2xl font-bold tracking-tight"
              >
                أسعار السوق
              </h2>

              <p className="mt-1.5 text-sm text-muted-foreground">
                اختر مدينة لعرض الأسعار.
              </p>
            </div>

            <Button size="sm" className="shrink-0 px-2 text-sm font-semibold">
              <Link to="/prices">كل الأسعار</Link>
            </Button>
          </div>

          {/* Cities */}
          <div
            className="mt-5 -mx-4 overflow-x-auto px-4 pb-1"
            role="tablist"
            aria-label="اختيار المدينة"
          >
            <div className="flex w-max gap-2">
              <Button
                type="button"
                role="tab"
                aria-selected={!selectedCity}
                onClick={() => setSelectedCity("")}
                variant={!selectedCity ? "default" : "outline"}
                className="h-10 rounded-full px-4"
              >
                كل المدن
              </Button>

              {cities.map((city) => {
                const selected = selectedCity === city.id;

                return (
                  <Button
                    key={city.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setSelectedCity(city.id)}
                    variant={selected ? "default" : "outline"}
                    className="h-10 rounded-full px-4"
                  >
                    {city.name}
                  </Button>
                );
              })}
            </div>
          </div>

          <Separator className="my-5" />

          {/* Loading */}
          {loading && (
            <Card className="border-border shadow-none">
              <CardContent className="p-6 text-center">
                <p role="status" className="text-base text-muted-foreground">
                  جارٍ تحميل الأسعار...
                </p>
              </CardContent>
            </Card>
          )}

          {/* Error */}
          {!loading && error && (
            <Card className="border-destructive/30 bg-destructive/5 shadow-none">
              <CardContent className="p-5">
                <p role="alert" className="font-semibold text-destructive">
                  {error}
                </p>

                <p className="mt-2 text-sm text-muted-foreground">
                  تأكد من تشغيل الخادم وإعداد عنوانه في ملف .env.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Empty */}
          {!loading && !error && prices.length === 0 && (
            <Card className="border-border shadow-none">
              <CardContent className="p-6 text-center">
                <p className="text-base font-medium text-muted-foreground">
                  لا توجد أسعار مسجلة لهذه المدينة حاليًا.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Price List */}
          {!loading && !error && prices.length > 0 && (
            <>
              <PriceList
                items={prices.slice(0, 3)}
                labels={{
                  price: "السعر",
                  quantity: "الكمية",
                  updated: "آخر تحديث",
                }}
              />

              {prices.length > 3 && (
                <Button
                  variant="outline"
                  className="mt-5 h-11 w-full rounded-xl text-base font-semibold"
                >
                  <Link to="/prices">
                    عرض بقية الأسعار
                    <span className="ms-1">({prices.length - 3})</span>
                  </Link>
                </Button>
              )}
            </>
          )}
        </section>
      </div>
    </main>
  );
}
