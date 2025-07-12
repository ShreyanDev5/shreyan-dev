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
  { label: "Tools", to: "#tech-stack" },
  { label: "Journey", to: "#journey" },
  { label: "Contact", to: "#contact" },
  { label: "Blog", to: "#blog" },
];

export default function IntelligentNavbar() {
  const [active, setActive] = useState("Home");
  const [showFab, setShowFab] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); // controls pill expansion
  const navRef = useRef<HTMLDivElement>(null); // for focus handling
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
          ref={navRef}
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
            "flex items-center transition-all duration-500 pointer-events-auto group",
            "max-w-[1100px] w-[94vw] justify-between",
            scrolled 
              ? "backdrop-blur-xl bg-background/90 border border-white/15 shadow-lg" 
              : "backdrop-blur-xl bg-background/80 border border-white/10",
            isScrolling && "brightness-105"
          )}
          style={{
            boxShadow: scrolled 
              ? "0 12px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05)" 
              : "0 8px 32px rgba(0, 0, 0, 0.2)",
            borderRadius: 9999,
            overflow: 'hidden',
            height: isExpanded ? 54 : 48, // slightly more increased expanded height
            minHeight: 48,
            paddingLeft: isExpanded ? 40 : 20,
            paddingRight: isExpanded ? 40 : 20,
            transition: 'all 0.5s cubic-bezier(0.77,0,0.18,1)',
            width: isExpanded ? 800 : 400, // decreased expanded width
            minWidth: 400,
          }}
          role="navigation"
          tabIndex={0}
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
          onFocus={() => setIsExpanded(true)}
          onBlur={e => {
            if (!navRef.current?.contains(e.relatedTarget as Node)) setIsExpanded(false);
          }}
        >
          <motion.a 
            href="/" 
            className="flex items-center space-x-2 mr-2 md:mr-6"
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

          {/* Desktop expanding nav (md+) */}
          <motion.div
            className="hidden md:flex items-center relative h-full"
            initial={false}
            animate={{
              opacity: isExpanded ? 1 : 0.7,
              width: isExpanded ? 760 : 0,
              marginLeft: isExpanded ? 16 : 0,
              marginRight: isExpanded ? 16 : 0,
            }}
            transition={{
              width: { duration: 0.5, ease: "easeInOut" },
              opacity: { duration: 0.3 },
              marginLeft: { duration: 0.4 },
              marginRight: { duration: 0.4 },
            }}
            style={{
              minWidth: 0,
              maxWidth: 760,
              overflow: 'hidden',
              background: 'none',
              pointerEvents: isExpanded ? 'auto' : 'none',
              height: '100%',
              alignItems: 'center',
              display: 'flex',
            }}
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
          >
            <motion.ul
              className="flex gap-0.5 w-full justify-center items-center h-full"
              initial={false}
              animate={{ opacity: isExpanded ? 1 : 0, x: isExpanded ? 0 : 16 }}
              transition={{ opacity: { duration: 0.25 }, x: { duration: 0.3 } }}
              style={{ pointerEvents: isExpanded ? 'auto' : 'none', height: '100%' }}
            >
              {NAV_LINKS.map((nav) => (
                <li key={nav.label} className="flex items-center h-full">
                  <motion.a
                    href={nav.to}
                    onClick={e => handleNavClick(e, nav.to)}
                    className={clsx(
                      "px-4 py-2 rounded-full relative transition-all duration-300 flex items-center h-full group overflow-visible",
                      "text-base font-medium",
                      active === nav.label
                        ? "text-white"
                        : "text-gray-300 hover:text-white",
                      "navbar-link"
                    )}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Pill-shaped hover gradient background for inactive links */}
                    {active !== nav.label && (
                      <span
                        className="absolute left-2 right-2 top-[6px] bottom-[6px] rounded-full z-[-2] pointer-events-none transition-all duration-300 opacity-0 navbar-link-bg"
                        style={{
                          background: scrolled
                            ? "linear-gradient(90deg, rgba(16,185,129,0.10) 0%, rgba(124,58,237,0.10) 100%)"
                            : "linear-gradient(90deg, rgba(255,255,255,0.08) 0%, rgba(124,58,237,0.08) 100%)",
                          transition: 'opacity 0.3s cubic-bezier(0.77,0,0.18,1), background 0.4s cubic-bezier(0.77,0,0.18,1)',
                        }}
                      />
                    )}
                    {/* Pill-shaped active background */}
                    {active === nav.label && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute left-2 right-2 top-[6px] bottom-[6px] rounded-full z-[-1]"
                        style={{
                          background: scrolled 
                            ? "linear-gradient(135deg, rgba(16, 185, 129, 0.18), rgba(124, 58, 237, 0.18))"
                            : "rgba(255, 255, 255, 0.13)",
                          borderRadius: 9999,
                        }}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    {nav.label}
                  </motion.a>
                </li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Menu icon (shows when collapsed) */}
          <motion.button
            className={clsx(
              "hidden md:flex items-center justify-center p-0 m-0 rounded-full text-white bg-transparent border-none outline-none transition-all duration-200",
              isExpanded && "opacity-0 pointer-events-none"
            )}
            style={{ width: 40, height: 40, minWidth: 40 }}
            aria-label={isExpanded ? "Close menu" : "Open menu"}
            tabIndex={isExpanded ? -1 : 0}
            initial={false}
            animate={{ opacity: isExpanded ? 0 : 1 }}
            transition={{ duration: 0.2 }}
            type="button"
            onClick={() => setIsExpanded((v) => !v)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: isExpanded ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isExpanded ? <X className="text-white" /> : <Menu className="text-white" />}
            </motion.div>
          </motion.button>

          {/* Mobile menu button (unchanged) */}
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
              className="glass-morphism rounded-2xl w-[94vw] max-w-[720px] overflow-hidden pointer-events-auto"
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
