import { Helmet } from "react-helmet-async";
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

const highlights = [
  {
    title: "ابحث عن المنتج",
    description: "اكتب اسم المنتج الذي تريد معرفة سعره في خانة البحث.",
    icon: PackageSearch,
  },
  {
    title: "اختر المدينة والفئة",
    description: "حدّد المدينة والفئة بالاسم لتضييق النتائج المناسبة لك.",
    icon: MapPin,
  },
  {
    title: "قارن السعر",
    description: "اطّلع على السعر والكمية وآخر تحديث قبل اتخاذ قرار الشراء.",
    icon: TrendingUp,
  },
];

const stats = [
  { label: "طريقة بحث", value: "بسيطة" },
  { label: "الفلاتر", value: "بالاسم" },
  { label: "التحديث", value: "مستمر" },
  { label: "الوصول", value: "من أي جهاز" },
];

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Markets YE | أسعار المنتجات في اليمن</title>

        <meta
          name="description"
          content="Markets YE منصة لعرض أسعار المنتجات في اليمن حسب المنتج والمدينة، مع مراجعة الأسعار المرسلة من المستخدمين واعتمادها."
        />
      </Helmet>
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
                دليل الأسعار المحلي
              </Badge>
              <h1 className="text-4xl font-black tracking-tight text-balance sm:text-5xl lg:text-6xl">
                أسعار المنتجات في اليمن
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground sm:mt-6 sm:text-lg sm:leading-9">
                السوق اليمني يجمع لك أسعار المنتجات بطريقة سهلة، لتقارن وتبحث
                حسب المدينة والفئة من أي جهاز.
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
                  كيف يعمل الموقع؟
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
            <p className="text-sm font-semibold text-primary">
              كيف يعمل الموقع؟
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              ثلاث خطوات للوصول للسعر المناسب
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
                  ابدأ بالبحث الآن
                </h2>
                <p className="mt-2 text-sm leading-7 text-primary-foreground/75 sm:text-base">
                  استخدم الفلاتر النصية للوصول إلى المنتج والمدينة والفئة التي
                  تهمك.
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
