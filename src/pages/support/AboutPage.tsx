import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Seo, absoluteUrl } from "@/lib/seo";

export default function AboutPage() {
  return (
    <>
      <Seo
        canonicalPath="/about"
        title="من نحن - منصة متابعة أسعار المنتجات في اليمن"
        description="تعرف على Markets YE ودورها في تنظيم عرض أسعار المنتجات في اليمن حسب المدن والتصنيفات اعتماداً على البيانات المتاحة والمراجعة."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "من نحن",
          url: absoluteUrl("/about"),
          about: {
            "@type": "Organization",
            name: "Markets YE",
            url: absoluteUrl("/"),
          },
        }}
      />

      <main className="container mx-auto max-w-5xl px-4 py-10">
        {/* Hero */}
        <section className="text-center">
          <Badge variant="secondary" className="mb-4">
            Markets YE
          </Badge>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            من نحن في Markets YE
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            منصة تساعد المستخدم في اليمن على متابعة أسعار المنتجات والسلع حسب
            المدينة والتصنيف، مع عرض البيانات المتاحة بطريقة واضحة ومنظمة.
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
              والمدينة والتصنيف. الهدف هو تسهيل البحث عن سعر المنتج اليوم
              ومقارنة الأسعار بين المدن اليمنية عند توفر البيانات.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>كيف نحصل على الأسعار؟</CardTitle>
            </CardHeader>

            <CardContent className="leading-7 text-muted-foreground">
              تعتمد المنصة على الأسعار الموجودة في النظام والبيانات التي تتم
              مراجعتها قبل عرضها. لا نضيف أسعاراً غير متوفرة، ولا نعرض ادعاءات
              لا تدعمها البيانات.
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
