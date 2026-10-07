import {
  ArrowLeft,
  BadgeCheck,
  ChartNoAxesCombined,
  MapPin,
  PackageSearch,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Seo, absoluteUrl } from "@/lib/seo";

const highlights = [
  {
    title: "ابحث عن سعر المنتج اليوم",
    description: "اكتب اسم المنتج وشوف الأسعار المتاحة له في المدن اليمنية.",
    icon: PackageSearch,
  },
  {
    title: "حدد المدينة أو الفئة",
    description: "فلتر الأسعار حسب صنعاء أو تعز أو عدن أو حسب فئة المنتج.",
    icon: MapPin,
  },
  {
    title: "قارن قبل الشراء",
    description: "راجع السعر والكمية وآخر تحديث لتعرف فرق الأسعار بين المدن.",
    icon: TrendingUp,
  },
];

const stats = [
  { label: "بحث عن السعر", value: "بالمنتج" },
  { label: "مقارنة", value: "بين المدن" },
  { label: "الفلاتر", value: "مدينة وفئة" },
  { label: "الوصول", value: "من الجوال" },
];

export default function HomePage() {
  return (
    <>
      <Seo
        canonicalPath="/"
        title="أسعار اليوم في اليمن للمنتجات والسلع"
        description="تابع أسعار المنتجات والسلع في اليمن حسب المدينة والفئة، وابحث عن سعر المنتج اليوم في صنعاء أو تعز أو عدن من مكان واحد."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "أسعار المنتجات في اليمن",
          url: absoluteUrl("/"),
          potentialAction: {
            "@type": "SearchAction",
            target: `${absoluteUrl("/prices")}?search={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        }}
      />
      <main dir="rtl" className="overflow-x-clip bg-background text-foreground">
        <section className="relative isolate overflow-hidden">
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-80 bg-linear-to-b from-primary/10 via-primary/5 to-transparent sm:h-96" />

          <div className="mx-auto w-full max-w-7xl px-4 pt-28 pb-12 sm:px-6 sm:pt-36 sm:pb-16 lg:px-8 lg:pt-44 lg:pb-24">
            <div className="max-w-3xl">
              <Badge
                variant="secondary"
                className="mb-5 h-7 px-3 text-xs sm:text-sm"
              >
                <BadgeCheck />
                دليل أسعار اليمن
              </Badge>
              <h1 className="text-4xl font-black tracking-tight text-balance sm:text-5xl lg:text-6xl">
                أسعار اليوم في اليمن للمنتجات والسلع
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground sm:mt-6 sm:text-lg sm:leading-9">
                ابحث عن أسعار المنتجات في اليمن حسب المدينة والفئة، وقارن
                السعر المتاح في صنعاء وتعز وعدن وبقية المدن عند توفر البيانات.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center">
                <Button
                  render={<Link to="/prices" />}
                  size="lg"
                  className="h-11 w-full sm:w-auto"
                >
                  استعرض الأسعار
                  <ArrowLeft />
                </Button>
                <Button
                  render={<a href="#how-it-works" />}
                  variant="outline"
                  size="lg"
                  className="h-11 w-full sm:w-auto"
                >
                  كيف أبحث عن السعر؟
                </Button>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-14 sm:grid-cols-4 sm:gap-4">
              {stats.map((stat) => (
                <Card
                  key={stat.label}
                  className="border-border/70 bg-card/80 py-0 shadow-sm backdrop-blur"
                >
                  <CardContent className="p-4 sm:p-5">
                    <p className="text-lg font-bold sm:text-xl">{stat.value}</p>
                    <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                      {stat.label}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section
          id="how-it-works"
          className="mx-auto w-full max-w-7xl scroll-mt-20 px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
        >
          <div className="max-w-2xl">
            <span className="text-sm font-semibold text-primary">
              طريقة متابعة أسعار المنتجات
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              من اسم المنتج إلى مقارنة الأسعار بين المدن اليمنية
            </h2>
          </div>
          <div className="mt-7 grid gap-4 sm:mt-9 sm:grid-cols-2 lg:grid-cols-3">
            {highlights.map(({ title, description, icon: Icon }) => (
              <Card key={title} className="py-0 ">
                <CardContent className="p-5 sm:p-6">
                  <div className="flex items-center justify- gap-4">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                      <Icon className="size-5" />
                    </div>
                    <h3 className=" text-xl font-bold">{title}</h3>
                  </div>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    {description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 pb-14 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
          <Card className="overflow-hidden bg-primary py-0 text-primary-foreground">
            <CardContent className="flex flex-col gap-6 p-6 sm:p-8 md:flex-row md:items-center md:justify-between lg:p-10">
              <div className="max-w-xl">
                <div className="flex size-10 items-center justify-center rounded-full bg-primary-foreground/15">
                  <ShieldCheck className="size-5" />
                </div>
                <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
                  ابحث عن سعر المنتج اليوم في اليمن
                </h2>
                <p className="mt-2 text-sm leading-7 text-primary-foreground/75 sm:text-base">
                  استخدم صفحة الأسعار للوصول إلى أسعار المواد الغذائية
                  والمنتجات المتاحة حسب المدينة والتصنيف، بدون ادعاءات أو
                  أرقام غير موجودة في البيانات.
                </p>
              </div>
              <Button
                render={<Link to="/prices" />}
                size="lg"
                variant="secondary"
                className="h-11 w-full shrink-0 sm:w-auto"
              >
                <ChartNoAxesCombined />
                عرض الأسعار
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>
    </>
  );
}
