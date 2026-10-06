import { useTranslation } from "react-i18next";
import { Seo } from "@/lib/seo";

export default function Support() {
  const { t,ready } = useTranslation("support");
  const contacts = t("contacts", { returnObjects: true }) as Array<{ type: string; value: string; note?: string }>;

  if (!ready) {
    return null;
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <Seo
        canonicalPath="/help"
        title="مساعدة استخدام أسعار المنتجات في اليمن"
        description="دليل مختصر لاستخدام Markets YE في البحث عن أسعار المنتجات في اليمن والتصفية حسب المدينة أو الفئة أو اسم المنتج."
      />
      <h1 className="text-3xl md:text-4xl font-bold mb-6">
        المساعدة في البحث عن أسعار المنتجات
      </h1>
      <p className="mb-6 leading-relaxed">
        استخدم هذه الصفحة لمعرفة طريقة البحث عن سعر المنتج اليوم في اليمن،
        وكيفية تضييق النتائج حسب المدينة أو الفئة.
      </p>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">
          كيف أبحث عن سعر منتج؟
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          افتح صفحة الأسعار، اكتب اسم المنتج، ثم اختر المدينة أو الفئة عند
          الحاجة. إذا لم تظهر نتيجة فهذا يعني أن البيانات غير متوفرة حالياً.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3">{t("contactTitle")}</h2>
        <ul className="space-y-2">
          {Array.isArray(contacts) && contacts.map((c, i) => (
            <li key={i}>
              <strong>{c.type}:</strong> <span className="text-gray-700 dark:text-gray-200">{c.value}</span>
              {c.note && <div className="text-sm text-gray-500">{c.note}</div>}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
