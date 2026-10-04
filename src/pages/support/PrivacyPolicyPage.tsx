import { useTranslation } from "react-i18next";
// import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export default function PrivacyPolicy() {
const { t, ready } = useTranslation("privacy");

useEffect(() => {
  document.title = "Privacy Policy | Ibovs";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "سياسة الخصوصية الخاصة بموقع Ibovs وكيفية التعامل مع بيانات المستخدمين."
      );
    }
  }, []);
if (!ready) {
      return <div>Loading...</div>;
  } 
  const getList = (key: string): string[] => {
    const val = t(key, { returnObjects: true });
    if (Array.isArray(val)) return val as string[];
    if (typeof val === "string" && val) return [val];
    return [];
  };

  const section2PersonalList = getList("section2.personal.list");
  const section2NonPersonalList = getList("section2.nonPersonal.list");
  const section4OtherList = getList("section4.otherList");
  const usageList = getList("usage.list");
  const sharingList = getList("sharing.list");

  const renderParagraphs = (items: string[]) =>
    items.map((it, idx) => (
      <p key={idx} className="mb-2">
        {it}
      </p>
    ));

  // const navigate = useNavigate();

  return (
    <div className="*:max-w-4xl    px-5 py-12  leading-relaxed">
 
     
      <h1 className="text-3xl md:text-4xl font-bold mb-6 ">{t("title")}</h1>

      <p className="mb-4">{t("intro1")}</p>
      <p className="mb-8">{t("intro2")}</p>

      <h2 className="text-2xl font-semibold mt-10 mb-3">{t("section1.title")}</h2>
      <p>{t("section1.content")}</p>

      <h2 className="text-2xl font-semibold mt-10 mb-3">{t("section2.title")}</h2>

      <h3 className="text-xl font-medium mt-6 mb-2">{t("section2.personal.title")}</h3>
      <p className="mb-3">{t("section2.personal.p1")}</p>
      {renderParagraphs(section2PersonalList)}
      <p>{t("section2.personal.p2")}</p>

      <h3 className="text-xl font-medium mt-6 mb-2">{t("section2.nonPersonal.title")}</h3>
      <p className="mb-3">{t("section2.nonPersonal.p1")}</p>
      {renderParagraphs(section2NonPersonalList)}
      <p>{t("section2.nonPersonal.p2")}</p>

      <h2 className="text-2xl font-semibold mt-10 mb-3">{t("cookies.title")}</h2>
      <p className="mb-3">{t("cookies.p1")}</p>
      <p>{t("cookies.p2")}</p>

      <h2 className="text-2xl font-semibold mt-10 mb-3">{t("section4.title")}</h2>
      <h3 className="text-xl font-medium mt-6 mb-2">{t("section4.adSenseTitle")}</h3>
      <p className="mb-3">{t("section4.adSenseP1")}</p>
      <p className="mb-3">{t("section4.adSenseP2")}</p>
      <p>{t("section4.otherP")}</p>

      <h3 className="text-xl font-medium mt-6 mb-2">{t("section4.otherTitle")}</h3>
      {renderParagraphs(section4OtherList)}

      <h2 className="text-2xl font-semibold mt-10 mb-3">{t("usage.title")}</h2>
      {renderParagraphs(usageList)}

      <h2 className="text-2xl font-semibold mt-10 mb-3">{t("sharing.title")}</h2>
      <p>{t("sharing.p1")}</p>
      {renderParagraphs(sharingList)}

      <h2 className="text-2xl font-semibold mt-10 mb-3">{t("security.title")}</h2>
      <p>{t("security.content")}</p>

      <h2 className="text-2xl font-semibold mt-10 mb-3">{t("rights.title")}</h2>
      <p>
        {t("rights.content")} <a href="/contact" className="text-blue-600 underline">{t('rights.contactLink') || t('contact.linkText') || t('contact.linkText', { ns: 'privacy' }) || 'Contact'}</a>.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-3">{t("children.title")}</h2>
      <p>{t("children.content")}</p>

      <h2 className="text-2xl font-semibold mt-10 mb-3">{t("externalLinks.title")}</h2>
      <p>{t("externalLinks.content")}</p>

      <h2 className="text-2xl font-semibold mt-10 mb-3">{t("liability.title")}</h2>
      <p>{t("liability.content")}</p>

      <h2 className="text-2xl font-semibold mt-10 mb-3">{t("changes.title")}</h2>
      <p>{t("changes.content")}</p>

      <h2 className="text-2xl font-semibold mt-10 mb-3">{t("governingLaw.title")}</h2>
      <p>{t("governingLaw.content")}</p>

      <h2 className="text-2xl font-semibold mt-10 mb-3">{t("contact.title")}</h2>
      <p>
        {t("contact.p1")} <a href={t("contact.linkHref") || "/contact"} className="text-blue-600 underline">{t("contact.linkText")}</a>.
      </p>
    </div>
  );
}