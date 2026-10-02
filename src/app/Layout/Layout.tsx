import { Outlet } from "react-router-dom"
import { useDispatch } from "react-redux";
import { menu } from "../../features/mobileMenu/mobileMenu";
import {  Animationpage } from "../../components/Animations/Animation.js";
import Header from "../../components/header/Header"
import Footer from '../../components/Footers/Footer.js';
function Layout() {
    const dispatch = useDispatch();
    dispatch(menu(false))

    return (
        <>
         {/* <AnimationHeader>
         </AnimationHeader> */}
         <Header />
         <Animationpage>
         <Outlet />
         </Animationpage>
         {/* <Test/> */}
            <Footer />
        </>
    )
}



export default Layout