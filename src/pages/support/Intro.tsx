import { motion } from "framer-motion";

const Intro = () => {
  return (
    <motion.div
    style={{zIndex:9999}}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0  flex items-center justify-center bg-black/20 text-white"
    >
      <motion.h1
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-3xl font-bold"
      >
        Your Marketplace
      </motion.h1>
    </motion.div>
  );
};

export default Intro;