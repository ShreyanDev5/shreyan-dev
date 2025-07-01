
import React from "react";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import clsx from "clsx";

interface ScrollToTopFABProps {
  show: boolean;
  onClick: () => void;
}

export default function ScrollToTopFAB({ show, onClick }: ScrollToTopFABProps) {
  return (
    <motion.button
      className={clsx(
        "fixed z-[98] bottom-20 right-6 md:hidden rounded-full text-white p-3",
        "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700",
        "transition-all duration-300 shadow-lg hover:shadow-xl",
        show ? "scale-100" : "scale-0 pointer-events-none"
      )}
      style={{
        boxShadow: show 
          ? "0 12px 36px rgba(99, 102, 241, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)" 
          : "0 6px 24px rgba(30,42,68,0.2)",
        backdropFilter: "blur(8px)",
      }}
      aria-label="Scroll to top"
      onClick={onClick}
      whileHover={{ 
        scale: 1.1, 
        y: -2,
        boxShadow: "0 16px 48px rgba(99, 102, 241, 0.5)"
      }}
      whileTap={{ 
        scale: 0.9,
        transition: { duration: 0.1 }
      }}
      animate={{ 
        scale: show ? 1 : 0,
        rotate: show ? 0 : 180
      }}
      transition={{ 
        duration: 0.4,
        type: "spring",
        stiffness: 200,
        damping: 15
      }}
    >
      <ArrowUp size={20} />
    </motion.button>
  );
}
