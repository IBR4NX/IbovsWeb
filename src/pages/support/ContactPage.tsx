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
            <h1 className="text-3xl md:text-4xl font-bold mb-6 ">
                تواصل معنا
            </h1>

            {/* Intro */}
            <p className="mb-8 leading-relaxed">
                إذا عندك ملاحظة بخصوص منتج أو مدينة أو تصنيف في أسعار اليمن،
                يمكنك التواصل معنا عبر البريد الموضح أدناه.
            </p>

            {/* Contact Info Card */}
            <div className=" rounded-xl p-6 shadow-sm">
                <h2 className="text-2xl font-semibold mb-4">{t("contacts.infoTitle")}</h2>

                <p className="mb-3">{t("contacts.emailPrompt")}</p>

                <p className="text-lg font-medium">
                    📧{" "}
                    <a href={`mailto:${t("contacts.email")}`} className="text-blue-600 underline">
                        {t("contacts.email")}
                    </a>
                </p>

                <p className="mt-6 text-sm text-gray-600">{t("contacts.note")}</p>
            </div>
        </main>
    );
}
