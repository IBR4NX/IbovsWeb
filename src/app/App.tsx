import React, { Suspense, useEffect, useState } from 'react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter, Routes, Route, useLocation, Navigate,   } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

const Home = React.lazy(() => import("@/pages/home/HomePage"));
const About = React.lazy(() => import("@/pages/support/AboutPage"));
const Prices = React.lazy(() => import("@/pages/prices/PricesPage"));
// const Blog = React.lazy(() => import("@/pages/support/BlogPage"));
const Careers = React.lazy(() => import("@/pages/support/CareersPage"));
const Help = React.lazy(() => import("@/pages/support/HelpPage"));
const Faq = React.lazy(() => import("@/pages/support/FaqPage"));
const NotFound = React.lazy(() => import("@/pages/not-found/NotFoundPage"));
import Layout from "@/components/layout/SiteLayout";
import Spinner from "@/components/feedback/Spinner";
import PrivacyPolicy from "@/pages/support/PrivacyPolicyPage";
import Contact from "@/pages/support/ContactPage";
const Login = React.lazy(() => import("@/pages/auth/LoginPage"));
const Products = React.lazy(() => import("@/pages/catalog/ProductsPage"));
const Categories = React.lazy(() => import("@/pages/catalog/CategoriesPage"));
const Cities = React.lazy(() => import("@/pages/catalog/CitiesPage"));
const Dashboard = React.lazy(() => import("@/pages/dashboard/DashboardPage"));
const Catalog = React.lazy(() => import("@/pages/catalog/CatalogPage"));

/*
const Search = React.lazy(() => import("@/pages/Search"));
const Info = React.lazy(() => import("@/pages/Info"));
const Profile = React.lazy(() => import("@/pages/Profile"));
*/
import { Sys } from "@/features/theme/themeSlice";
import Register from "@/pages/auth/RegisterPage";
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
     <Spinner outTime={loading}/>
     <div id='top' className=""></div>

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
        <Suspense fallback={<Spinner outTime={true} />}>
          <Routes location={location} key={location.pathname}>
            <Route path="search" element={<Navigate to="/" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route  element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/prices" element={<Prices />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/catalog/products" element={<Products />} />
              <Route path="/catalog/categories" element={<Categories />} />
              <Route path="/catalog/cities" element={<Cities />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/about" element={<About />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/help" element={<Help />} />
              <Route path="/faq" element={<Faq />} />
              {/* 
              <Route path="/search" element={ <Search /> } />
              <Route path="/info" element={ <Info /> } />
              <Route path="/profile" element={ <Profile /> } />
              <Route path="*" element={<NotFound />} />
              */}
            <Route path='/services' element={<Contact/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            </Route>
         <Route path="notfound" element={<NotFound />} />
          </Routes>
        </Suspense>
      </AnimatePresence>
    </>
  );
}

export default App;
