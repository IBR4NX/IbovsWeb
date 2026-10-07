import { useEffect } from "react";
// import "./style.overlay.css";
import { motion } from "framer-motion";

interface OverlayProps {
  onClose: () => void;
  isOpen:boolean;
  children: React.ReactNode;
  title?: string; // prop اختياري (optional) للعنوان
  className?: string; // prop اختياري لإضافة classes CSS إضافية
}

export default function Overlay({ onClose , isOpen  }:OverlayProps) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <>
      <motion.div
      initial={{backdropFilter:0}}
      animate={{backdropFilter:8}}
      transition={{duration:5}}
      onClick={()=>setTimeout(onClose,20)}
        style={{ zIndex: 99 }} className={` fixed top-0 left-0 w-screen h-screen flex max-sm:p-4  sm:p-6 md:p-7 lg:p-9 bg-black/20 backdrop-blur-sm`}>

        <motion.div
        initial={{opacity:0 ,y:-10}}
        animate={{opacity:1,y:0}}
        transition={{duration:0.3}}
         onClick={(e) => e.stopPropagation()} className=" w-full h-full max-w-3xl  m-auto property-bg rounded-xl">
          {isOpen ?"yes":"noo" }
        </motion.div>
      </motion.div>
 
    </>
  );
}