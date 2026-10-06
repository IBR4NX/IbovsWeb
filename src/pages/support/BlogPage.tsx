import { useTranslation } from "react-i18next";
import { Seo } from "@/lib/seo";

export default function Blog() {
  const { t } = useTranslation("blog");
  const posts = t("posts", { returnObjects: true }) as Array<{ title: string; excerpt: string }>;

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <Seo
        canonicalPath="/blog"
        title="مقالات وتحديثات أسعار المنتجات في اليمن"
        description="مقالات وتحديثات حول متابعة أسعار المنتجات والسلع في اليمن عند توفر محتوى منشور داخل Markets YE."
      />
      <h1 className="text-3xl md:text-4xl font-bold mb-6">
        مقالات وتحديثات أسعار المنتجات
      </h1>
      <p className="mb-6 leading-relaxed">
        مساحة للمقالات والتحديثات المرتبطة بأسعار المنتجات في اليمن، وطريقة
        قراءة تغير الأسعار بين المدن عند توفر منشورات.
      </p>

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
