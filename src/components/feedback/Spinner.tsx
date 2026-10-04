import { ImSpinner6 } from "react-icons/im";
import { motion } from "framer-motion";
import {  useState } from "react";
export default function Sping({ outTime }: { outTime: boolean }) {
  const [showIntro, setShowIntro] = useState(true);
  if(outTime===false){
      setTimeout(()=>setShowIntro(false),100);
    }
      
  return (
    <>
      { showIntro &&
        <div style={{ zIndex: 999 }}
          className=" fixed inset-0 h-screen w-screen bg-white/90 dark:bg-black/90 transition-colors  backdrop-blur-xs text-3xl flex items-center justify-center">
          <motion.div
            initial={{ opacity: 1, scale: 0.8, y: 0 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="  flex items-center pb-20 size-40 min-w-sm lg:min-w-md rounded-2xl m-auto ">
            <ImSpinner6 size="60" className=" text-black dark:text-white m-auto backdrop rounded-full bg-white/10 animate-spin " />
          </motion.div>
        </div>
      }
    </>
  )
}
