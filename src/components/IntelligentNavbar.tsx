
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
  const sectionsRef = useRef<Record<string, HTMLElement | null>>({});
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
    window.addEventListener("scroll", handleIntersect, { passive: true });
    handleIntersect();
    return () => window.removeEventListener("scroll", handleIntersect);
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

  // Mobile FAB action
  const handleFabClick = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      {/* Main container for centering */}
      <div className="fixed z-50 top-6 left-0 right-0 flex justify-center w-full pointer-events-none">
        {/* Navbar pill */}
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={clsx(
            "flex items-center px-6 py-2 rounded-full",
            "backdrop-blur-xl bg-background/80 border border-white/10",
            "max-w-[630px] w-[92vw] justify-between transition-all duration-300 pointer-events-auto",
          )}
          style={{
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
          }}
          role="navigation"
        >
          <a 
            href="/" 
            className="flex items-center space-x-2"
            aria-label="Go to homepage"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-bold">
              D
            </div>
          </a>
          
          {/* Desktop nav links */}
          <ul className="hidden md:flex gap-2 pr-2">
            {NAV_LINKS.map((nav) => (
              <li key={nav.label}>
                <a
                  href={nav.to}
                  onClick={e => handleNavClick(e, nav.to)}
                  className={clsx(
                    "px-4 py-2 rounded-full relative transition-all duration-300",
                    "text-base font-medium",
                    active === nav.label
                      ? "text-white bg-white/10"
                      : "text-gray-300 hover:text-white hover:bg-white/5",
                  )}
                >
                  {nav.label}
                  {active === nav.label && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute inset-0 rounded-full bg-emerald-500/10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>
          
          {/* Mobile menu button */}
          <button
            className="flex md:hidden items-center justify-center p-2 rounded-full bg-white/5 hover:bg-white/10 transition"
            aria-label={openMobile ? "Close menu" : "Open menu"}
            onClick={() => setOpenMobile((v) => !v)}
            type="button"
          >
            {openMobile ? <X className="text-white" /> : <Menu className="text-white" />}
          </button>
        </motion.nav>
      </div>

      {/* Mobile menu drawer - using AnimatePresence for smooth transitions */}
      <AnimatePresence>
        {openMobile && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-x-0 top-[5.5rem] z-[99] flex justify-center pointer-events-none"
          >
            <motion.div 
              className="glass-morphism rounded-2xl w-[92vw] max-w-[630px] overflow-hidden pointer-events-auto"
              style={{ 
                backdropFilter: "blur(16px)",
                backgroundColor: "rgba(13, 17, 23, 0.85)", 
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                border: "1px solid rgba(255, 255, 255, 0.1)"
              }}
            >
              <nav className="py-4">
                <ul className="flex flex-col">
                  {NAV_LINKS.map((nav) => (
                    <li key={nav.label} className="px-2">
                      <a
                        href={nav.to}
                        onClick={e => handleNavClick(e, nav.to)}
                        className={clsx(
                          "flex items-center px-6 py-4 rounded-xl text-lg font-medium transition-all duration-200",
                          active === nav.label
                            ? "bg-emerald-500/10 text-white"
                            : "text-gray-300 hover:bg-white/5 hover:text-white"
                        )}
                      >
                        <span>{nav.label}</span>
                        {active === nav.label && (
                          <span className="ml-auto w-2 h-2 rounded-full bg-emerald-500"></span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Floating-action button (FAB) for mobile */}
      <button
        className={clsx(
          "fixed z-[98] bottom-8 right-6 md:hidden rounded-full bg-indigo-500 hover:bg-indigo-600 shadow-lg text-white p-3",
          "transition-transform duration-200",
          showFab ? "scale-100 animate-fade-in" : "scale-0 pointer-events-none"
        )}
        style={{
          boxShadow: "0 4px 22px 0 rgba(30,42,68,0.18)",
        }}
        aria-label="Scroll to top"
        onClick={handleFabClick}
      >
        <ArrowUp />
      </button>
    </>
  );
}
