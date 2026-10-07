import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import type { RootState } from "@/lib/store";
import { menu } from "@/features/navigation/mobileMenuSlice";
import ThemeBtn from "@/features/theme/ThemeToggle";

import List from "./Navigation";

function Header() {
  const mobileMenuOpen = useSelector((state: RootState) => state.menu.value);
  const dispatch = useDispatch();

  const { i18n, t } = useTranslation("common");
  const [close, setclose] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [atTop, setAtTop] = useState(true);

  function handleMenuToggle() {
    // console.log("mobileMenuOpen", mobileMenuOpen, "close", close, "disabled", disabled);
    setDisabled(true);
    dispatch(menu(!mobileMenuOpen));
        if (mobileMenuOpen) {
      setTimeout(() => {
        setclose(true);
      }, 300);
      //  setTimeout(() => {
      // }, 500);
    }else {
      setclose(false);
    }
   setTimeout(() => {
        setDisabled(false);
      }, 310);
  }

  // useEffect(() => {

  //   },[mobileMenuOpen]);
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(() => {
          setAtTop(window.scrollY === 0);
          ticking = false;
        });
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll as EventListener);
  }, []);
  useEffect(() => {
    const closeOnDesktop = () => {
      if (window.innerWidth >= 768) dispatch(menu(false));
    };

    window.addEventListener("resize", closeOnDesktop);
    return () => window.removeEventListener("resize", closeOnDesktop);
  }, [dispatch]);

  const closeMenu = () => dispatch(menu(false));

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b bg-backkground/90 backdrhop-blur transition-all duration-300 ease-in-out ">
      <nav className={`mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8
        backdrop-blur-sm bg-background/20 transition-all duration-300 ease-in ${!mobileMenuOpen && !atTop ? "drop-shadow-md/25" : ""} drop-shadow-black dark:drop-shadow-white `} >
        <Button
            type="button"
            variant="ghost"
            size="icon"
            disabled={disabled}
            className="md:hidden size-10 *:size-8! "
            onClick={handleMenuToggle}
            aria-label={mobileMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        <Link to="/" className="shrink-0 text-lg font-bold tracking-tight sm:text-xl" onClick={closeMenu}>
          السوق اليمني
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          <Link to="/" className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            {t("home")}
          </Link>
          <Link to="/prices" className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            {t("prices")}
          </Link>
          <Link to="/help" className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            {t("help")}
          </Link>
        </div>

        <div className="flex items-center gap-1">
          <ThemeBtn />
          
        </div>
      </nav>

      {/* {mobileMenuOpen && (
        <div className={`fixed inset-x-0 top-16 z-50 min-h-[calc(100dvh-4rem)] bg-foreground/20 md:hidden ${mobileMenuOpen && "translate-x-0!"} `}
         onClick={closeMenu} >
          <div
          
            className={`min-h-[calc(100dvh-4rem)] w-[min(20rem,calc(100vw-1rem))] border-s bg-background p-5 shadow-xl ${i18n.language === "ar" ? "translate-x-full" : "-translate-x-full"} ${mobileMenuOpen && "translate-x-0!"}`}
            onClick={(event) => event.stopPropagation()}
          >
            <List lang={i18n.language} />
          </div>
        </div>
      )} */}
        <div
           onClick={() =>  handleMenuToggle}
          className={` fixed top-0 pt-12 -z-10 bg-alpha-10 transition-opacity   w-full h-screen  
          ${close && " opacity-0 max-w-0 overflow-hidden "} `}
        >
          <div onClick={(e) => e.stopPropagation()}
            className={`sm:max-w-xs h-full shadow-2xl transition-all ease-out  backdrop-blur-sm bg-background/50 duration-300 ${i18n.language === "ar" ? "translate-x-full" : "-translate-x-full"} ${mobileMenuOpen && "translate-x-0!"}
                 dark:border-white/10`}>
            {/* Mobile menu items */}
            <div   onClick={handleMenuToggle}
             className={` h-full divide-y divide-black/20 dark:divide-white/20  *:py-4p gap-4  flex flex-col p-6   overflow-hidden `} >

              <div className="  pb-4 scroll-yk-auto overflokw-y-auto overflow-x-hidden ">
                <List lang={i18n.language} />
              </div>
              {/* Login/Logout */}
              {/* <div className=" relative bottom-0 h-fit flex justify-center items-center  rounded-lg  ">
                <Link to="/login" className=" w-full text-center  px-4 py-2  rounded-full bg-amber-600 hover:bg-amber-700 text-white font-medium ">
                  Login / Sign Up
                </Link>
              </div> */}
            </div>
          </div>
        </div>

    </header>
  );
}

export default Header;
