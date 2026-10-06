import { useTranslation } from "react-i18next";
import { Seo } from "@/lib/seo";
export default function Faq() {
  const { t,ready } = useTranslation("faq");
  const items = t("items", { returnObjects: true }) as Array<{ q: string; a: string }>;

  if (!ready) {
    return null;
  }
  
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <Seo
        canonicalPath="/faq"
        title="أسئلة شائعة عن أسعار المنتجات في اليمن"
        description="إجابات مختصرة عن طريقة عرض أسعار المنتجات في اليمن، وكيفية البحث حسب المدينة أو المنتج أو الفئة داخل Markets YE."
      />
      <h1 className="text-3xl md:text-4xl font-bold mb-6">
        أسئلة شائعة عن أسعار المنتجات
      </h1>
      <p className="mb-6 leading-relaxed">
        هنا تجد إجابات تساعدك على فهم طريقة البحث عن الأسعار، ولماذا قد لا
        يظهر سعر منتج أو مدينة في بعض الأوقات.
      </p>

      <section className="space-y-4">
        {Array.isArray(items) && items.length > 0 ? (
          items.map((it, i) => (
            <details key={i} className="group border rounded p-3">
              <summary className="font-semibold cursor-pointer">{it.q}</summary>
              <div className="mt-2 text-alpha">{it.a}</div>
            </details>
          ))
        ) : (
          <p>{t("noFaqs")}</p>
        )}
      </section>
    </main>
  );
}
