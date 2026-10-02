import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
// import { hover } from "framer-motion";
 const navigation = [
  { name: "home", href: "/" },
  { name: "prices", href: "/prices" },
  { name: "search", href: "/prices" },
  { name: "contact", href: "/contact" },

  { name: "services", href: "/#" },
  { name: "profile", href: "/#" },
  { name: "help", href: "/help" }, 
];
function List({lang}: {lang: string}) {
  const { t } = useTranslation('common');
  
  return (
    <>
        <ul className="  flex flex-col gap-4 m-px -ml-1 border-gray-950/10   dark:border-white/25 ">
          {navigation.map((item) => (
            <li key={item.name} className={`   ${lang==="en" ? "hover:border-l" : "hover:border-r"}    border-blue-500  `}>
              <Link to={item.href} 
              className={`
               hover:transform-cpu  hover:pl-4 block w-full py-1 px-3  rounded-r-full transition-[padding] duration-200 ease-in-out rounded-4xlxl text-base/6 font-semibold `}>
                {t(item.name)}
              </Link>
            </li>
          ))}
        </ul>
    </>
  );
}

export default List;
