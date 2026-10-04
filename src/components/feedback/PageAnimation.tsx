import React from 'react';
import {  motion } from "framer-motion";

function AnimationHeader({ children }: { children: React.ReactNode }) {
    return (
        <>
            <motion.div
                initial={{ opacity: 1, y: -50,zIndex:20 }}
                animate={{ opacity: 1, y: 0,zIndex:200 }}
                exit={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="Header   "
            >
                {children}
            </motion.div>

        </>
    );
}

function Animationpage({ children }: { children: React.ReactNode }) {

    return (
        <motion.main
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 0 }}
            transition={{ duration: 0.25 }}
            className=" min-h-screen "
        >
            {children}
        </motion.main>
    );
}

function AnimationTest({ children }: { children: React.ReactNode }) {
  return (
   <>
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="flex-1 min-h-screegn"
    >
      {children}
    </motion.div>

   </>
  );
}
export {AnimationHeader,Animationpage,AnimationTest};