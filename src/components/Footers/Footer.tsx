
import ChangeLang from '../change/ChangeLang';
import { useTranslation } from "react-i18next";
import { FaInstagram, FaFacebook, FaX, FaWhatsapp, FaGithub } from "react-icons/fa6";
import ThemeBtn from "../../features/theme/ThemeBtn";

export default function Footer() {
  const { t } = useTranslation("footer");
  return (
    <footer className="*:py-5 mx-5 border-t divide-y divide-gray-950/10 dark:divide-white/5 border-gray-950/10 dark:border-white/10 mt-20">
      <div className="container mx-5">
        <div className=" flex justify-around items-center mb-4 pt-4 pb-2 mb-4">
          <h2 className="text-xl col-aputo self-center min-w2xs text-center border-b justify-self-center font-bold  border-gray-950/10 dark:border-white/10">{t("quickLinks")}</h2>
          <div className="  flex items-center gap-2 rounded-2xl px-1 ">
            <ThemeBtn /> 
          {/*        
            <button onClick={() => changeLang(i18n.language.startsWith('ar') ? 'en' : 'ar')} > {i18n.language.startsWith('ar') ? 'EN(English)' : 'AR (عربي)'} </button>
               <p>{i18n.language}</p>
             */}
            <ChangeLang en="English" ar="Arabic" >
            </ChangeLang>

          </div>
        </div>
        <div className="  grid grid-cols-2 gap-4  md:grid-cols-2">
          <div className=" *:block *:w-fit gap-3 flex flex-col">
            <a href="/services " className="hover:underline">{t("links.services")}</a>
            <a href="/privacy-policy " className="hover:underline">{t("links.privacy")}</a>
            <a href="/contact " className="hover:underline">{t("links.contact")}</a>
          </div>

          <div className=" *:block *:w-fit gap-3 flex flex-col">
            <a href="/careers " className="hover:underline">{t("links.careers")}</a>
            <a href="/help " className="hover:underline">{t("links.support")}</a>
            <a href="/faq " className="hover:underline">{t("links.faq")}</a>
          </div>

        </div>
      </div>
      <div className="container mx-auto grid grid-cols-1    px-4">

        {/* <div>
        </div> */}
        <div className="container mx-auto flex items-center justify-around text-alpha ">
          <h2 className="text-lg font-bold ">{t("followUs")}:</h2>
          <div className="flex items-center gap-4 **:size-6 mb-3 *:hover:text-black *:dark:hover:text-white transition-colors duration-200">
            <a href="https://www.facebook.com/ibr4nx" aria-label="facebook"><FaFacebook /></a>
            <a href="https://www.instagram.com/ibr4nx" aria-label="instagram"><FaInstagram /></a>
            <a href="https://www.twitter.com/ibr4nx" aria-label="twitter"><FaX /></a>
            <a href="https://www.whatsapp.com/+967738386364" aria-label="whatsapp"><FaWhatsapp /></a>
            <a href="https://github.com/ibr4nx" aria-label="github"><FaGithub /></a>
          </div>
        </div>

      </div>
      <div className="container mx-auto px-4 flex justify-between mt-6 text-center text-sm">
        <div className="flex items-center  gap-2">
          <p className="text-sm text-alpha ">{t("copyright", { year: new Date().getFullYear() })}</p>
        </div>
        <a href='#top'>{t("madeWith")}</a>
      </div>
    </footer>
  );
}