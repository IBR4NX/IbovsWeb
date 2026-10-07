import { useTranslation } from "react-i18next";
import { Seo } from "@/lib/seo";

export default function Contact() {
  const { t } = useTranslation();
  return (
    <main className="max-w-3xl  px-4 py-12 ">
      <Seo
        canonicalPath="/contact"
        title="تواصل معنا بخصوص أسعار المنتجات في اليمن"
        description="تواصل مع فريق Markets YE للاستفسارات المتعلقة بعرض أسعار المنتجات أو المدن أو التصنيفات داخل المنصة."
      />
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold mb-6 ">تواصل معنا</h1>

      {/* Intro */}
      <p className="mb-8 leading-relaxed">
        إذا عندك ملاحظة بخصوص منتج أو مدينة أو تصنيف في أسعار اليمن، يمكنك
        التواصل معنا عبر البريد الموضح أدناه.
      </p>

      {/* Contact Info Card */}
      <div className=" rounded-xl p-6 shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">
          {t("contacts.infoTitle")}
        </h2>

        <p className="mb-3">{t("contacts.emailPrompt")}</p>

        <p className="text-lg font-medium">
          📧{" "}
          <a
            href={`mailto:${t("contacts.email")}`}
            className="text-blue-600 underline"
          >
            {t("contacts.email")}
          </a>
        </p>

        <p className="mt-6 text-sm text-gray-600">{t("contacts.note")}</p>
        <form
          name="contact"
          method="POST"
          data-netlify="true"
          className="mx-auto mt-5 w-full max-w-sm space-y-4 rounded-xl border bg-card p-6 shadow-sm"
        >
          {/* مهم لـ Netlify */}
          <input type="hidden" name="form-name" value="contact" />
          <h1 className=" text-center text-2xl" >التواصل مبأشرة</h1>
          <div className="space-y-4">
            <label htmlFor="name" className="text-sm font-medium">
              الاسم
            </label>

            <input
              id="name"
              type="text"
              name="name"
              required
              placeholder="أدخل اسمك"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/20"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              البريد الإلكتروني
            </label>

            <input
              id="email"
              type="email"
              name="email"
              required
              placeholder="example@email.com"
              dir="ltr"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/20"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              الرسالة
            </label>

            <textarea
              id="message"
              name="message"
              required
              rows={5}
              placeholder="اكتب رسالتك هنا..."
              className="flex min-h-32 w-full resize-y rounded-md border border-input bg-background px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/20"
            />
          </div>

          <button
            type="submit"
            className="inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
          >
            إرسال الرسالة
          </button>
        </form>
      </div>
    </main>
  );
}
