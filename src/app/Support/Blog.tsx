import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export default function Blog() {
  const { t } = useTranslation("blog");
  const posts = t("posts", { returnObjects: true }) as Array<{ title: string; excerpt: string }>;

  useEffect(() => {
    document.title = t("title") || "Blog";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", t("description") || "Blog page");
  }, [t]);

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">{t("title")}</h1>
      <p className="mb-6 leading-relaxed">{t("intro")}</p>

      {Array.isArray(posts) && posts.length > 0 ? (
        <section className="space-y-6">
          {posts.map((p, i) => (
            <article key={i}>
              <h2 className="text-xl font-semibold">{p.title}</h2>
              <p className="text-gray-600 dark:text-gray-300">{p.excerpt}</p>
            </article>
          ))}
        </section>
      ) : (
        <p className="mb-4 leading-relaxed">{t("noPosts")}</p>
      )}
    </main>
  );
}
