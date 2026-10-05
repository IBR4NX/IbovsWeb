import {
  ChartNoAxesCombined,
  CheckCircle2,
  Clock3,
  MapPinned,
  Package,
  Tags,
  Users,
  XCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";

import { Card, CardContent, CardDescription } from "@/components/ui/card";
import {
  getDashboardStatistics,
  type DashboardStatistics,
} from "@/features/dashboard/dashboardApi";

const numberFormat = new Intl.NumberFormat("en-US");

const emptyStatistics: DashboardStatistics = {
  total_users: 0,
  total_products: 0,
  total_categories: 0,
  total_cities: 0,
  pending_submissions: 0,
  approved_submissions: 0,
  rejected_submissions: 0,
  current_prices_count: 0,
};

const overviewCards = [
  {
    key: "total_products",
    href: "/catalog/products",
    label: "المنتجات النشطة",
    icon: Package,
  },
  {
    key: "total_categories",
    href: "/catalog/categories",
    label: "الفئات النشطة",
    icon: Tags,
  },
  {
    key: "total_cities",
    href: "/catalog/cities",
    label: "المدن النشطة",
    icon: MapPinned,
  },
  {
    key: "total_users",
    href: "/admin/users",
    label: "إجمالي المستخدمين",
    icon: Users,
  },
] as const;

const submissionCards = [
  {
    key: "pending_submissions",
    label: "بانتظار المراجعة",
    icon: Clock3,
    color: "text-amber-600",
  },
  {
    key: "approved_submissions",
    label: "تم اعتمادها",
    icon: CheckCircle2,
    color: "text-green-600",
  },
  {
    key: "rejected_submissions",
    label: "تم رفضها",
    icon: XCircle,
    color: "text-destructive",
  },
] as const;

export default function DashboardPage() {
  const [statistics, setStatistics] =
    useState<DashboardStatistics>(emptyStatistics);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    getDashboardStatistics()
      .then((result) => {
        if (!cancelled) setStatistics(result);
      })
      .catch((loadError) => {
        if (!cancelled)
          setError(
            loadError instanceof Error
              ? loadError.message
              : "تعذر تحميل الإحصاءات.",
          );
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const format = (value: string | number) =>
    numberFormat.format(Number(value) || 0);

  return (
    <main
      dir="rtl"
      className="mx-auto w-full transition-all  duration-300 ease-in max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8"
    >
      <div>
        <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
          لوحة التحكم
        </h1>
        <h3 className="mt-2 text-sm text-muted-foreground">
          ملخص مباشر للمنتجات والأسعار وطلبات المراجعة.
        </h3>
      </div>
      <section className="mt-6 grid gap-4 lg:grid-cols-[1fr_2fr]">
        <Card className="bg-primary transition-all duration-500 py-0 text-primary-foreground">
          <CardContent className="p-5   sm:p-6">
            <ChartNoAxesCombined className="size-6" />
            <p className="mt-8 text-4xl font-black tabular-nums">
              {loading ? "—" : format(statistics.current_prices_count)}
            </p>
            <h2 className="mt-2 text-lg font-bold">الأسعار الحالية المتاحة</h2>
            <p className="mt-1 text-sm leading-6 text-primary-foreground/75">
              عدد الأسعار المعتمدة التي تظهر حاليًا للمستخدمين.
            </p>
          </CardContent>
        </Card>
      </section>

      {error && (
        <p
          role="alert"
          className="mt-5 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive"
        >
          {error}
        </p>
      )}

      <section className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {overviewCards.map(({ key, label, href, icon: Icon }) => (
          <Link key={href} to={href} className="group">
            <Card key={key} className="py-0">
              <CardContent className="p-4 sm:p-5">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex size-11 transition-all duration-1000 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <Icon className="size-5" />
                  </div>
                  <p className="text-2xl font-bold px-4 ">
                    {loading ? "—" : format(statistics[key])}
                  </p>
                </div>
                <CardDescription className="p-2 pt-4">{label}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>

      <div className="my-4 ">
        <Card className="py-0 grid grid-cols-3  col-span-1">
          {submissionCards.map(({ key, label, icon: Icon, color }) => (
            <CardContent key={key} className="p-5">
              <div className=" flex items-center gap-2">
                <Icon className={`size-5 ${color}`} />
                <p className={` text-2xl font-bold tabular-nums ${color} `}>
                  {loading ? "—" : format(statistics[key])}
                </p>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{label}</p>
            </CardContent>
          ))}
        </Card>
      </div>
    </main>
  );
}
