import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export default function Faq() {
  const { t } = useTranslation("faq");
  const items = t("items", { returnObjects: true }) as Array<{ q: string; a: string }>;

  useEffect(() => {
    document.title = t("title") || "FAQ";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", t("description") || "Frequently asked questions");
  }, [t]);

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">{t("title")}</h1>
      <p className="mb-6 leading-relaxed">{t("intro")}</p>

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
