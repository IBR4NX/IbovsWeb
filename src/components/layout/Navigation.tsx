import {  Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
// import { hover } from "framer-motion";
 const navigation = [
  { name: "home", href: "/" },
  { name: "prices", href: "/prices" },
  { name: "search", href: "/prices" },
  { name: "contact", href: "/contact" },
  {name:"products", href:"/catalog/products" },
  {name:"cities", href:"/catalog/cities" },
  {name:"categories", href:"/catalog/categories" },
  { name: "services", href: "/#" },
  { name: "profile", href: "/#" },
  { name: "help", href: "/help" }, 
];
function List({lang}: {lang: string}) {
  const { t } = useTranslation('common');
  
  return (
    <>
        <ul dir={lang.startsWith("ar") ? "rtl" : "ltr"} className="flex flex-col gap-1">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link to={item.href} 
              className="block rounded-lg px-3 py-3 text-xl font-medium transition-colors hover:bg-muted">
                {t(item.name)}
              </Link>
            </li>
          ))}
        </ul>
    </>
  );
}

export default List;
