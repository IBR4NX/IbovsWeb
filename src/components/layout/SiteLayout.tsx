import { Toaster } from "sonner";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { menu } from "@/features/navigation/mobileMenuSlice";
import { Animationpage } from "@/components/feedback/PageAnimation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
function Layout() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(menu(false));
  }, [dispatch]);

  return (
    <div className="flex min-h-screen min-w-0 flex-col overflow-x-clip">
      <Header />
      <div className="flex-1 pt-16">
        <Animationpage>
          <Outlet />
        </Animationpage>
      </div>
      <Footer />
      {/* <Toaster position="top-center" richColors /> */}
    </div>
  );
}

export default Layout;
