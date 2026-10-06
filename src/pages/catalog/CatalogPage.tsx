import {
  Building2,
  LayoutDashboard,
  MapPinned,
  Package,
  Tags,
} from "lucide-react";
import { Link } from "react-router-dom";

import { Card, CardContent } from "@/components/ui/card";
import { Seo } from "@/lib/seo";

const destinations = [
  {
    title: "لوحة التحكم",
    description: "الإحصاءات وطلبات المراجعة.",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "المنتجات",
    description: "إضافة المنتجات وتعديل بياناتها.",
    href: "/catalog/products",
    icon: Package,
  },
  {
    title: "الفئات",
    description: "تنظيم المنتجات ضمن فئات.",
    href: "/catalog/categories",
    icon: Tags,
  },
  {
    title: "المدن",
    description: "إدارة المدن التي تظهر في المنصة.",
    href: "/catalog/cities",
    icon: MapPinned,
  },
];

export default function CatalogPage() {
  return (
    <main
      dir="rtl"
      className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8"
    >
      <Seo
        canonicalPath="/catalog"
        title="إدارة الكتالوج"
        description="صفحة داخلية لإدارة منتجات وفئات ومدن Markets YE."
        noindex
      />
      <div className="max-w-2xl">
        <p className="text-sm font-medium text-primary">إدارة المنصة</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
          الكتالوج ولوحة التحكم
        </h1>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">
          اختر القسم الذي تريد إدارته. جميع النماذج والبيانات متصلة بنفس API.
        </p>
      </div>
      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {destinations.map(({ title, description, href, icon: Icon }) => (
          <Link key={href} to={href} className="group">
            <Card className="h-full py-0 transition-transform duration-200 group-hover:-translate-y-1">
              <CardContent className="p-5">
                <div className="flex items-center gap-4">

                <div className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Icon className="size-5" />
                </div>
                <h2 className="mt-5 text-xl font-bold">{title}</h2>
                </div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      <div className="mt-6 flex items-center gap-2 rounded-xl border bg-muted/30 p-4 text-sm text-muted-foreground">
        <Building2 className="size-4" /> ابدأ بإضافة الفئات، ثم أضف المنتجات ضمن
        الفئة المناسبة.
      </div>
    </main>
  );
}
