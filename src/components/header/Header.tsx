import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import List from "./List";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/Store";
import { menu } from "../../features/mobileMenu/mobileMenu";
import { useTranslation } from "react-i18next";
import ThemeBtn from "../../features/theme/ThemeBtn";
function Header() {
  const mobileMenuOpen = useSelector((state: RootState) => state.menu.value);
  // const theme = useSelector((state: RootState) => state.theme.value);
  const dispatch = useDispatch()
  const { i18n } = useTranslation();
  const [atTop, setAtTop] = useState(true);
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
    const onResize = () => {
      if (mobileMenuOpen && window.innerWidth > 1024) {
        dispatch(menu(false));
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [mobileMenuOpen, dispatch]);

  return (
    <>

      <header className={` `}>
        <div className={` bgst fixed inset-x-0 top-0 z-20 backdrop-blur-xs bg-background/30  border-b border-black/20 dark:border-white/20 transition-all duration-300 ease-in-out
          ${!mobileMenuOpen && !atTop ? "drop-shadow-md/25" : ""} drop-shadow-black dark:drop-shadow-white `}>
          <div className="bg-opacity-98   pr-(--scrollbar-padding)  ">
            <nav className="flex z-20 justify-between items-center  px-5 py-auto h-16 lg *:max-h-16">
              {/* Mobile menu button */}
              <div className=" flex h-full gap-1 flex-1 min-w-1/2 ">
                <button
                  onClick={() => dispatch(menu(!mobileMenuOpen))}
                  className="  h-full w-16 rounded-full hover:bg-gray-950/10 cursor-pointer rking ring-gray-950/5"
                >
                  <svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className=" m-auto"
                  >{mobileMenuOpen ?
                    <>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                      <line x1="6" y1="18" x2="18" y2="6"></line>
                    </>
                    :
                    <>
                      <line x1="3" y1="6" x2="21" y2="6"></line>
                      <line x1="3" y1="12" x2="21" y2="12"></line>
                      <line x1="3" y1="18" x2="21" y2="18"></line>
                    </>
                    }
                  </svg>
                </button>
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 h-full">
                  <span className=" cabin-sketch font-medium text-xl " >السوق اليمني</span>
                </Link>
              </div>
              <div className="flex flex-1 gap-2 h-full *:h-full  justify-end items-center  ">
                <div className="">
                  {/* input Search */}
                  {/* <input type="text" placeholder="Search" onChange={handleTestChange} className="px-1.5 text-xs border border-gray-950/50 rounded-full w-20 h-7" /> */}
                  {/* <button type="button" className="inline-flex items-center gap-1 rounded-full bg-gray-950/2 px-2 py-1 inset-ring inset-ring-gray-950/8 dark:bg-white/5 dark:inset-ring-white/2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="-ml-0.5 size-4 fill-gray-600 dark:fill-gray-500"><path fill-rule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clip-rule="evenodd"></path></svg><kbd className="hidden font-sans text-xs/4 text-gray-500 dark:text-gray-400 [.os-macos_&amp;]:block">⌘K</kbd><kbd className="hidden font-sans text-xs/4 text-gray-500 not-[.os-macos_&amp;]:block dark:text-gray-400">Ctrl&nbsp;K</kbd></button> */}
                </div>
                {/* Theme and Language Toggle */}
                <div className=" *:-full *:w-full flex items-center gap-2 bg-alpha-5 **:bg-none! *:my-auto cursor-pointer    rounded-2xl px-1 ">
                  <ThemeBtn />
                  {/* <ChangeLang en="EN" ar="AR" /> */}
                </div>
                {/* More Options */}
                {/* <div className="*:h-full flex items-center gap-2">
                  <span className={`  cursor-pointer md:hidden p-1 flex it `}>
                    <PiDotsThreeOutlineVertical size="24" className="" />
                  </span>
                </div> */}
              </div>
            </nav>
          </div>
        </div>
        {/* Mobile menu overlay */}

        <div
          onClick={() => dispatch(menu(!mobileMenuOpen))}
          className={` fixed top-0 pt-12 z-10 bg-alpha-10 transition-opacity   w-full h-screen  
          ${!mobileMenuOpen && " opacity-0 max-w-0 "} `}
        >
          <div onClick={(e) => e.stopPropagation()}
            className={`sm:max-w-xs h-full shadow-2xl transition-all ease-out   duration-300 ${i18n.language === "ar" ? "translate-x-full" : "-translate-x-full"} ${mobileMenuOpen && "translate-x-0!"}
                 dark:border-white/10`}>
            {/* Mobile menu items */}
            <div   onClick={() => dispatch(menu(!mobileMenuOpen))}
             className=" h-full divide-y divide-black/20 dark:divide-white/20  *:py-4p gap-4  flex flex-col p-6 backdrop-blur-lg bg-background/50 bg-opacity-9 overflow-hidden ">

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
    </>
  );
}

export default Header;
