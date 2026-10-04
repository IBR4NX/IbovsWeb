import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export default function Contact() {
    const { t } = useTranslation();
    useEffect(() => {
    document.title = "Contact Us | Ibovs";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "تواصل معنا عبر نموذج الاتصال أو وسائل التواصل الخاصة بموقع Ibovs."
      );
    }
  }, []);
    return (
        <main className="max-w-3xl  px-4 py-12 ">
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold mb-6 ">{t("contacts.title")}</h1>

            {/* Intro */}
            <p className="mb-8 leading-relaxed">{t("contacts.intro")}</p>

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