import React, { Suspense, useEffect, useState } from 'react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter, Routes, Route, useLocation, Navigate,   } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

const Home = React.lazy(() => import("./app/Home"));
const About = React.lazy(() => import("./app/About.js"));
const Blog = React.lazy(() => import("./app/Blog.js"));
const Careers = React.lazy(() => import("./app/Careers.js"));
const Support = React.lazy(() => import("./app/Support.js"));
const Faq = React.lazy(() => import("./app/Faq.js"));
const NotFound = React.lazy(() => import("./components/notfound/notfound"));
import Layout from './app/Layout/Layout';
import Sping from './components/Animations/Sping.js';
import PrivacyPolicy from './app/PrivacyPolicy.js';
import Contact from './app/Contact.js';
const Login = React.lazy(() => import("./app/Login"));

/*
const Search = React.lazy(() => import("@/pages/Search"));
const Info = React.lazy(() => import("@/pages/Info"));
const Profile = React.lazy(() => import("@/pages/Profile"));
*/
import { Sys } from "./features/theme/themeSlice.ts";
import Register from './app/register.tsx';
function App() {
   Sys()
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const onLoad = () => setLoading(false);

    if (document.readyState === "complete") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false);
    } else {
      window.addEventListener("load", onLoad);
    }
    return () => window.removeEventListener("load", onLoad);
  }, []);

  
  return (
    <>
     <Sping outTime={loading}/>
     <div id='top' className=""></div>
     < div  className="fixed bg-radial from-black/10 dark:from-cyan-950/20 w-screen bg-center -z-50 h-screen  ">
     <div className="bg-[url(/favicons/logo.png)] bg-center bg-contain bg-no-repeat bg-origin-content px-20 m-auto opacity-30 h-full max-w-2xl"></div>
     </div>
      <div className="isolate">
        <div className="">
          <RecoilRoot>
            <BrowserRouter>
              <AnimatedRoutes />
            </BrowserRouter>
          </RecoilRoot>
        </div>
      </div>
    </>
  );
}



function AnimatedRoutes() {
  const location = useLocation();
  return (
    <>
      <AnimatePresence mode="wait">
        <Suspense fallback={<Sping outTime={true} />}>
          <Routes location={location} key={location.pathname}>
            <Route path="search" element={<Navigate to="/" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route  element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/support" element={<Support />} />
              <Route path="/faq" element={<Faq />} />
              {/* 
              <Route path="/search" element={ <Search /> } />
              <Route path="/info" element={ <Info /> } />
              <Route path="/profile" element={ <Profile /> } />
              */}
            <Route path='/services' element={<Contact/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            </Route>
              <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </AnimatePresence>
    </>
  );
}

export default App;