import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export default function Careers() {
  const { t } = useTranslation("careers");
  const positions = t("positions", { returnObjects: true }) as Array<{
    id: string;
    title: string;
    location?: string;
    type?: string;
    summary?: string;
  }>;

  useEffect(() => {
    document.title = t("title") || "Careers";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", t("description") || "Careers page");
  }, [t]);

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">{t("title")}</h1>
      <p className="mb-6 leading-relaxed">{t("intro")}</p>

      {Array.isArray(positions) && positions.length > 0 ? (
        <ul className="space-y-6">
          {positions.map((pos) => (
            <li key={pos.id} className="border rounded p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-semibold">{pos.title}</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{pos.location} • {pos.type}</p>
                </div>
              </div>
              {pos.summary && <p className="mt-2 text-gray-700 dark:text-gray-200">{pos.summary}</p>}
              <div className="mt-3">
                <a className="text-amber-600 dark:text-amber-400 hover:underline" href={`mailto:jobs@ibovs.com?subject=${encodeURIComponent(pos.title)}`}>{t("apply")}</a>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>{t("noOpenings")}</p>
      )}
    </main>
  );
}
