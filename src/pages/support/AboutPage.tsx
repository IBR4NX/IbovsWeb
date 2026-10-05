import { Helmet } from "react-helmet-async";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>من نحن | Markets YE</title>

        <meta
          name="description"
          content="تعرف على Markets YE، منصة تهدف إلى توفير معلومات محدثة عن أسعار المنتجات في اليمن حسب المدن والتصنيفات."
        />
      </Helmet>

      <main className="container mx-auto max-w-5xl px-4 py-10">
        {/* Hero */}
        <section className="text-center">
          <Badge variant="secondary" className="mb-4">
            Markets YE
          </Badge>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            من نحن
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            منصة تساعدك على معرفة أسعار المنتجات في مختلف المدن اليمنية
            بطريقة سهلة ومنظمة.
          </p>
        </section>

        <Separator className="my-10" />

        {/* About */}
        <section className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>ما هي Markets YE؟</CardTitle>
            </CardHeader>

            <CardContent className="leading-7 text-muted-foreground">
              Markets YE منصة لعرض أسعار المنتجات في اليمن حسب المنتج
              والمدينة والتصنيف، بهدف تسهيل الوصول إلى معلومات الأسعار
              بطريقة واضحة ومنظمة.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>كيف نحصل على الأسعار؟</CardTitle>
            </CardHeader>

            <CardContent className="leading-7 text-muted-foreground">
              يمكن للمستخدمين إرسال أسعار المنتجات التي يجدونها في الأسواق،
              ثم تتم مراجعة البيانات من قبل الموظفين قبل اعتمادها وعرضها
              ضمن الأسعار الحالية.
            </CardContent>
          </Card>
        </section>

        {/* Process */}
        <section className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>كيف تعمل المنصة؟</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="grid gap-6 sm:grid-cols-3">
                <div>
                  <div className="mb-2 text-2xl font-bold">01</div>
                  <h3 className="font-semibold">إرسال السعر</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    يرسل المستخدم سعر المنتج والمدينة التي وجد فيها السعر.
                  </p>
                </div>

                <div>
                  <div className="mb-2 text-2xl font-bold">02</div>
                  <h3 className="font-semibold">المراجعة</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    تتم مراجعة السعر والبيانات المرسلة من قبل الموظف.
                  </p>
                </div>

                <div>
                  <div className="mb-2 text-2xl font-bold">03</div>
                  <h3 className="font-semibold">اعتماد السعر</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    بعد التحقق، يتم اعتماد السعر وتحديث السعر المعروض.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </>
  );
}