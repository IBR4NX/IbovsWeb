import { FaFacebook, FaGithub, FaInstagram, FaWhatsapp, FaX } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import ThemeBtn from "@/features/theme/ThemeToggle";

import ChangeLang from "./LanguageSwitcher";

export default function Footer() {
  const { t } = useTranslation("footer");

  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr] lg:gap-12">
          <div dir="rtl" >
            <div className="mt-4 flex justify-between  r gap-2">
            <Link to="/" className="text-lg font-bold">السوق اليمني</Link>
            <div className="flex">
              <ThemeBtn />
              <ChangeLang en="English" ar="العربية" />
            </div>
            </div>
            <p className="mt-3 max-w-sm text-sm leading-7 text-muted-foreground">
              منصة مبسطة لمتابعة أسعار المنتجات والبحث عنها حسب المدينة والفئة.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold">{t("quickLinks")}</h2>
            <div className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">
              <Link to="/prices" className="w-fit hover:text-foreground hover:underline">{t("links.services")}</Link>
              <Link to="/privacy-policy" className="w-fit hover:text-foreground hover:underline">{t("links.privacy")}</Link>
              <Link to="/contact" className="w-fit hover:text-foreground hover:underline">{t("links.contact")}</Link>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold">{t("followUs")}</h2>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-muted-foreground">
              <a href="https://www.facebook.com/ibr4nx" aria-label="Facebook" className="rounded-md p-2 hover:bg-muted hover:text-foreground"><FaFacebook /></a>
              <a href="https://www.instagram.com/ibr4nx" aria-label="Instagram" className="rounded-md p-2 hover:bg-muted hover:text-foreground"><FaInstagram /></a>
              <a href="https://www.twitter.com/ibr4nx" aria-label="X" className="rounded-md p-2 hover:bg-muted hover:text-foreground"><FaX /></a>
              <a href="https://www.whatsapp.com/+967738386364" aria-label="WhatsApp" className="rounded-md p-2 hover:bg-muted hover:text-foreground"><FaWhatsapp /></a>
              <a href="https://github.com/ibr4nx" aria-label="GitHub" className="rounded-md p-2 hover:bg-muted hover:text-foreground"><FaGithub /></a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t pt-5 text-center text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:text-start">
          <p>{t("copyright", { year: new Date().getFullYear() })}</p>
          {/* <a href="#top" className="hover:text-foreground">{t("madeWith")}</a> */}
        </div>
      </div>
    </footer>
  );
}
