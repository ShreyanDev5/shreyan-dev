
import React, { useEffect, useRef, useState } from "react";
import { ArrowUp, Menu, X } from "lucide-react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

// Define the navigation sections
const NAV_LINKS = [
  { label: "Home", to: "#home" },
  { label: "About", to: "#about" },
  { label: "Projects", to: "#projects" },
  { label: "Contact", to: "#contact" },
  { label: "Blog", to: "#blog" },
];

export default function IntelligentNavbar() {
  const [active, setActive] = useState("Home");
  const [showFab, setShowFab] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const sectionsRef = useRef<Record<string, HTMLElement | null>>({});
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isMobile = useIsMobile();

  // Set up Intersection Observer for highlighting nav links
  useEffect(() => {
    const handleIntersect = () => {
      let found = "Home";
      for (const section of NAV_LINKS) {
        const elem = document.getElementById(section.to.slice(1));
        if (elem && window.scrollY + 100 >= elem.offsetTop) {
          found = section.label;
        }
      }
      setActive(found);
    };
    
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 20);
      setIsScrolling(true);
      
      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      // Set new timeout to detect when scrolling stops
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
      
      handleIntersect();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // Show/hide FAB based on scroll position
  useEffect(() => {
    function updateScroll() {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      setShowFab(scrollTop > 64);
    }
    window.addEventListener("scroll", updateScroll, { passive: true });
    updateScroll();
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  // Close mobile menu when window is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && openMobile) {
        setOpenMobile(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [openMobile]);

  // Smooth scroll
  const handleNavClick = (e: React.MouseEvent, to: string) => {
    e.preventDefault();
    setOpenMobile(false);
    const target = document.getElementById(to.slice(1));
    if (target) {
      window.scrollTo({ top: target.offsetTop - 24, behavior: "smooth" });
    }
  };

  // Enhanced mobile FAB action with smoother animation
  const handleFabClick = () => {
    // Use requestAnimationFrame for smoother animation
    const scrollToTop = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 0) {
        window.requestAnimationFrame(scrollToTop);
        // Easing function for smoother deceleration
        const scrollStep = Math.max(scrollTop * 0.15, 10);
        window.scrollTo(0, scrollTop - scrollStep);
      }
    };
    
    // Fallback to native smooth scroll for better mobile support
    if ('scrollBehavior' in document.documentElement.style) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      scrollToTop();
    }
  };

  return (
    <>
      {/* Main container for centering */}
      <div className="fixed z-50 top-6 left-0 right-0 flex justify-center w-full pointer-events-none">
        {/* Navbar pill */}
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ 
            y: 0, 
            opacity: 1,
            scale: scrolled ? 0.98 : 1,
          }}
          transition={{ 
            duration: 0.5, 
            ease: "easeOut",
            scale: { duration: 0.3, ease: "easeInOut" }
          }}
          className={clsx(
            "flex items-center px-6 py-2 rounded-full transition-all duration-300 pointer-events-auto",
            "max-w-[630px] w-[92vw] justify-between",
            scrolled 
              ? "backdrop-blur-xl bg-background/90 border border-white/15 shadow-lg" 
              : "backdrop-blur-xl bg-background/80 border border-white/10",
            isScrolling && "brightness-105"
          )}
          style={{
            boxShadow: scrolled 
              ? "0 12px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05)" 
              : "0 8px 32px rgba(0, 0, 0, 0.2)",
          }}
          role="navigation"
        >
          <motion.a 
            href="/" 
            className="flex items-center space-x-2"
            aria-label="Go to homepage"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <motion.img 
              src="/my_logo_7.0.png" 
              alt="Logo" 
              className="w-8 h-8 rounded-lg object-cover"
              animate={{
                filter: scrolled ? "brightness(1.1)" : "brightness(1)"
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>

          
          {/* Desktop nav links */}
          <ul className="hidden md:flex gap-2 pr-2">
            {NAV_LINKS.map((nav) => (
              <li key={nav.label}>
                <motion.a
                  href={nav.to}
                  onClick={e => handleNavClick(e, nav.to)}
                  className={clsx(
                    "px-4 py-2 rounded-full relative transition-all duration-300",
                    "text-base font-medium",
                    active === nav.label
                      ? "text-white"
                      : "text-gray-300 hover:text-white",
                  )}
                  whileHover={{ 
                    scale: 1.02,
                    backgroundColor: active === nav.label ? "rgba(255, 255, 255, 0.12)" : "rgba(255, 255, 255, 0.08)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  {nav.label}
                  {active === nav.label && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: scrolled 
                          ? "linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(124, 58, 237, 0.15))"
                          : "rgba(255, 255, 255, 0.1)"
                      }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </motion.a>
              </li>
            ))}
          </ul>
          
          {/* Mobile menu button */}
          <motion.button
            className={clsx(
              "flex md:hidden items-center justify-center p-2 rounded-full transition-all duration-300",
              scrolled ? "bg-white/8 hover:bg-white/12" : "bg-white/5 hover:bg-white/10"
            )}
            aria-label={openMobile ? "Close menu" : "Open menu"}
            onClick={() => setOpenMobile((v) => !v)}
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              animate={{ rotate: openMobile ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {openMobile ? <X className="text-white" /> : <Menu className="text-white" />}
            </motion.div>
          </motion.button>
        </motion.nav>
      </div>

      {/* Mobile menu drawer - using AnimatePresence for smooth transitions */}
      <AnimatePresence>
        {openMobile && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-x-0 top-[5.5rem] z-[99] flex justify-center pointer-events-none"
          >
            <motion.div 
              className="glass-morphism rounded-2xl w-[92vw] max-w-[630px] overflow-hidden pointer-events-auto"
              style={{ 
                backdropFilter: "blur(20px)",
                backgroundColor: scrolled ? "rgba(13, 17, 23, 0.9)" : "rgba(13, 17, 23, 0.85)", 
                boxShadow: "0 12px 40px rgba(0, 0, 0, 0.4)",
                border: scrolled ? "1px solid rgba(255, 255, 255, 0.15)" : "1px solid rgba(255, 255, 255, 0.1)"
              }}
              initial={{ backdropFilter: "blur(0px)" }}
              animate={{ backdropFilter: "blur(20px)" }}
              transition={{ duration: 0.3 }}
            >
              <nav className="py-4">
                <ul className="flex flex-col">
                  {NAV_LINKS.map((nav, index) => (
                    <motion.li 
                      key={nav.label} 
                      className="px-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                      <motion.a
                        href={nav.to}
                        onClick={e => handleNavClick(e, nav.to)}
                        className={clsx(
                          "flex items-center px-6 py-4 rounded-xl text-lg font-medium transition-all duration-200",
                          active === nav.label
                            ? "bg-gradient-to-r from-emerald-500/15 to-purple-500/15 text-white border border-white/5"
                            : "text-gray-300 hover:bg-white/8 hover:text-white"
                        )}
                        whileHover={{ x: 4, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span>{nav.label}</span>
                        {active === nav.label && (
                          <motion.span 
                            className="ml-auto w-2 h-2 rounded-full bg-gradient-to-r from-emerald-500 to-purple-500"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2 }}
                          />
                        )}
                      </motion.a>
                    </motion.li>
                  ))}
                </ul>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Enhanced Floating-action button (FAB) for mobile with better positioning */}
      <motion.button
        className={clsx(
          "fixed z-[98] bottom-20 right-6 md:hidden rounded-full text-white p-3",
          "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700",
          "transition-all duration-300 shadow-lg hover:shadow-xl",
          showFab ? "scale-100" : "scale-0 pointer-events-none"
        )}
        style={{
          boxShadow: showFab 
            ? "0 8px 30px rgba(99, 102, 241, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)" 
            : "0 4px 22px rgba(30,42,68,0.18)",
        }}
        aria-label="Scroll to top"
        onClick={handleFabClick}
        whileHover={{ 
          scale: 1.1, 
          y: -2,
          boxShadow: "0 12px 40px rgba(99, 102, 241, 0.4)"
        }}
        whileTap={{ 
          scale: 0.9,
          transition: { duration: 0.1 }
        }}
        animate={{ 
          scale: showFab ? 1 : 0,
          rotate: showFab ? 0 : 180
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
    </>
  );
}
