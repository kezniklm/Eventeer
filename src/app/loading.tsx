"use client";

import { AnimatePresence, motion } from "motion/react";

const LoadingPage = () => (
  <AnimatePresence>
    <motion.div
      className="flex flex-col items-center space-y-4"
      initial={{ scale: 0.95 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="border-t-primary h-10 w-10 animate-spin rounded-full border-4 border-gray-300" />
      <span className="text-lg font-medium">Loading...</span>
    </motion.div>
  </AnimatePresence>
);

export default LoadingPage;
