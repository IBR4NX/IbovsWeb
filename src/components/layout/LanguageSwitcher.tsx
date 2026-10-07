import { useTranslation } from "react-i18next";
import { IoLanguage } from "react-icons/io5";
export default function ChangeLang({   en,ar }: {en:string, ar:string }) {
 //const { t } = useTranslation("footer");
  const { i18n } = useTranslation();
  const changeLang = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  
  //const test = document.useMemo(() => first, [second]) ;
  return (
   <>
    
    <button dir="ltr" onClick={() => changeLang(i18n.language.startsWith('ar') ? 'en' : 'ar')}
    className=" flex text-center cursor-pointer rounded-md gap-1 p-0.5 pb-1  *:h-6 items-center justify-between " > 
    <IoLanguage className="  " />
    {en&&ar? i18n.language.startsWith('en')?ar:en
     :
     ""
    }
    </button>
    </>
  )
}