import { Boxes, ChartNoAxesCombined, CheckCircle2, Clock3, MapPinned, Package, Tags, Users, XCircle } from "lucide-react";
import { useEffect, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { getDashboardStatistics, type DashboardStatistics } from "@/features/dashboard/dashboardApi";

const numberFormat = new Intl.NumberFormat("ar-YE");

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
  { key: "total_products", label: "المنتجات النشطة", icon: Package },
  { key: "total_categories", label: "الفئات النشطة", icon: Tags },
  { key: "total_cities", label: "المدن النشطة", icon: MapPinned },
  { key: "total_users", label: "إجمالي المستخدمين", icon: Users },
] as const;

const submissionCards = [
  { key: "pending_submissions", label: "بانتظار المراجعة", icon: Clock3, color: "text-amber-600" },
  { key: "approved_submissions", label: "تم اعتمادها", icon: CheckCircle2, color: "text-green-600" },
  { key: "rejected_submissions", label: "تم رفضها", icon: XCircle, color: "text-destructive" },
] as const;

export default function DashboardPage() {
  const [statistics, setStatistics] = useState<DashboardStatistics>(emptyStatistics);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    getDashboardStatistics()
      .then((result) => {
        if (!cancelled) setStatistics(result);
      })
      .catch((loadError) => {
        if (!cancelled) setError(loadError instanceof Error ? loadError.message : "تعذر تحميل الإحصاءات.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const format = (value: string | number) => numberFormat.format(Number(value) || 0);

  return (
    <main dir="rtl" className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div>
        <p className="text-sm font-medium text-primary">نظرة عامة</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">لوحة التحكم</h1>
        <p className="mt-2 text-sm text-muted-foreground">ملخص مباشر للمنتجات والأسعار وطلبات المراجعة.</p>
      </div>

      {error && <p role="alert" className="mt-5 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}

      <section className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {overviewCards.map(({ key, label, icon: Icon }) => <Card key={key} className="py-0"><CardContent className="p-4 sm:p-5"><Icon className="size-5 text-primary" /><p className="mt-5 text-2xl font-bold tabular-nums sm:text-3xl">{loading ? "—" : format(statistics[key])}</p><p className="mt-1 text-xs leading-5 text-muted-foreground sm:text-sm">{label}</p></CardContent></Card>)}
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-[1fr_2fr]">
        <Card className="bg-primary py-0 text-primary-foreground"><CardContent className="p-5 sm:p-6"><ChartNoAxesCombined className="size-6" /><p className="mt-8 text-4xl font-black tabular-nums">{loading ? "—" : format(statistics.current_prices_count)}</p><h2 className="mt-2 text-lg font-bold">الأسعار الحالية المتاحة</h2><p className="mt-1 text-sm leading-6 text-primary-foreground/75">عدد الأسعار المعتمدة التي تظهر حاليًا للمستخدمين.</p></CardContent></Card>
        <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
          {submissionCards.map(({ key, label, icon: Icon, color }) => <Card key={key} className="py-0"><CardContent className="p-5"><Icon className={`size-5 ${color}`} /><p className="mt-6 text-3xl font-bold tabular-nums">{loading ? "—" : format(statistics[key])}</p><p className="mt-1 text-sm text-muted-foreground">{label}</p></CardContent></Card>)}
        </div>
      </section>

    </main>
  );
}
