import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export default function Support() {
  const { t } = useTranslation("support");
  const contacts = t("contacts", { returnObjects: true }) as Array<{ type: string; value: string; note?: string }>;

  useEffect(() => {
    document.title = t("title") || "Support";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", t("description") || "Support page");
  }, [t]);

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">{t("title")}</h1>
      <p className="mb-6 leading-relaxed">{t("intro")}</p>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">{t("helpCenterTitle")}</h2>
        <p className="text-gray-600 dark:text-gray-300">{t("helpCenterDesc")}</p>
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
