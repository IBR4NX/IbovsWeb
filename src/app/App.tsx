import React, { Suspense } from "react";
import { RecoilRoot } from "recoil";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";

const Home = React.lazy(() => import("@/pages/home/HomePage"));
const About = React.lazy(() => import("@/pages/support/AboutPage"));
const Prices = React.lazy(() => import("@/pages/prices/PricesPage"));
const CityPrices = React.lazy(() => import("@/pages/prices/CityPricesPage"));
const CityPage = React.lazy(() => import("@/pages/prices/CityPage"));
const CityProductPrice = React.lazy(
  () => import("@/pages/prices/CityProductPrice"),
);
const CatalogPrices = React.lazy(
  () => import("@/pages/prices/CatalogPricesPage"),
);
const ProductPrices = React.lazy(
  () => import("@/pages/prices/ProductPricesPage"),
);
const Blog = React.lazy(() => import("@/pages/support/BlogPage"));
const Help = React.lazy(() => import("@/pages/support/HelpPage"));
const Careers = React.lazy(() => import("@/pages/support/CareersPage"));
const Faq = React.lazy(() => import("@/pages/support/FaqPage"));
const NotFound = React.lazy(() => import("@/pages/not-found/NotFoundPage"));
const PrivacyPolicy = React.lazy(
  () => import("@/pages/support/PrivacyPolicyPage"),
);
const Register = React.lazy(() => import("@/pages/auth/RegisterPage"));
const Contact = React.lazy(() => import("@/pages/support/ContactPage"));
const Login = React.lazy(() => import("@/pages/auth/LoginPage"));
const Products = React.lazy(() => import("@/pages/catalog/ProductsPage"));
const Categories = React.lazy(() => import("@/pages/catalog/CategoriesPage"));
const Cities = React.lazy(() => import("@/pages/catalog/CitiesPage"));
const Dashboard = React.lazy(() => import("@/pages/dashboard/DashboardPage"));
const Catalog = React.lazy(() => import("@/pages/catalog/CatalogPage"));
const SubmissionsPage = React.lazy(
  () => import("@/pages/admin/SubmissionsPage"),
);
const AddSubmissionPage = React.lazy(
  () => import("@/pages/admin/AddSubmissionPage"),
);

import Layout from "@/components/layout/SiteLayout";
import Spinner from "@/components/feedback/Spinner";
import { Sys } from "@/features/theme/themeSlice";

function App() {
  Sys();
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const onLoad = () => setLoading(false);

  //   if (document.readyState === "complete") {
  //     // eslint-disable-next-line react-hooks/set-state-in-effect
  //     setLoading(false);
  //   } else {
  //     window.addEventListener("load", onLoad);
  //   }
  //   loading;
  //   return () => window.removeEventListener("load", onLoad);
  // }, []);

  return (
    <>
    {/* <Spinner outTime={true} /> */}
      <div id="start" className=""></div>

      <div className="isolate">
        <RecoilRoot>
          <BrowserRouter>
            <AnimatedRoutes />
          </BrowserRouter>
        </RecoilRoot>
      </div>
      <div id="end" className=""></div>
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
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/prices" element={<Prices />} />
              <Route path="/services" element={<Prices />} />
              <Route path="/cities/" element={<CityPage />} />
              <Route
                path="/categories/:categoryName"
                element={<CatalogPrices />}
              />

              <Route path="/city" element={<Cities />} />
              <Route path="/city/:cityName" element={<CityPrices />} />

              <Route
                path="/city/:cityName/product/:productName"
                element={<CityProductPrice />}
              />
              <Route path="/category" element={<Categories />} />
              <Route
                path="/category/:categoryName"
                element={<CatalogPrices />}
              />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:productName" element={<ProductPrices />} />

              <Route path="/catalog" element={<Catalog />} />
              <Route path="/catalog/products" element={<Products />} />
              <Route path="/catalog/categories" element={<Categories />} />
              <Route path="/catalog/cities" element={<Cities />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/sub" element={<SubmissionsPage />} />
              <Route path="/add" element={<AddSubmissionPage />} />

              <Route path="/about" element={<About />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/help" element={<Help />} />
              <Route path="/support" element={<Help />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/blog" element={<Blog />} />
              {/* 
              <Route path="/info" element={ <Info /> } />
              <Route path="/profile" element={ <Profile /> } />
              */}
              <Route path="/contact" element={<Contact />} />
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
