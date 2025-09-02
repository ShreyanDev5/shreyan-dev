import React, { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPastTechStack, setIsPastTechStack] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Get scroll position
      const scrollTop = window.scrollY;
      
      // Check if we're past the Tech Stack section
      const techStackSection = document.getElementById("tech-stack");
      if (techStackSection) {
        const techStackTop = techStackSection.offsetTop;
        setIsPastTechStack(scrollTop >= techStackTop);
      }
      
      // Show button when scrolled down 300px
      setIsVisible(scrollTop > 300);
    };

    // Attach scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Initial check
    handleScroll();
    
    // Cleanup
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // Only show the button if we're past the Tech Stack section and have scrolled down
  const shouldShowButton = isPastTechStack && isVisible;

  return (
    <AnimatePresence>
      {shouldShowButton && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            y: 0,
            transition: { 
              type: "spring", 
              stiffness: 300, 
              damping: 25 
            }
          }}
          exit={{ 
            opacity: 0, 
            scale: 0.8, 
            y: 20,
            transition: { duration: 0.2 }
          }}
          whileHover={{ 
            y: -3,
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-20 right-4 md:bottom-8 md:right-8 z-50 p-3 rounded-full bg-gray-900/80 backdrop-blur-lg border border-gray-700/50 text-gray-200 hover:text-white shadow-lg hover:shadow-xl hover:bg-gray-800/80 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 focus:ring-offset-gray-900"
          aria-label="Scroll to top"
        >
          <ChevronUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;