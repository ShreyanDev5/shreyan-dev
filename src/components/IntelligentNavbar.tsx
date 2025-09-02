import React, { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
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
      setScrolled(scrollTop > 10);
      setIsScrolling(true);
      
      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      // Set new timeout to detect when scrolling stops with slower transition
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 200);
      
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

  // Close mobile menu when window is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && openMobile) {
        // Add a slight delay for smoother transition
        setTimeout(() => setOpenMobile(false), 150);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [openMobile]);

  // Smooth scroll with slower, more elegant animation
  const handleNavClick = (e: React.MouseEvent, to: string) => {
    e.preventDefault();
    setOpenMobile(false);
    const target = document.getElementById(to.slice(1));
    if (target) {
      // Use a slower, more elegant scroll behavior
      window.scrollTo({ 
        top: target.offsetTop - 80, 
        behavior: "smooth" 
      });
      
      // Add a slight delay before closing mobile menu for better UX
      if (openMobile) {
        setTimeout(() => setOpenMobile(false), 300);
      }
    }
  };

  return (
    <>
      {/* Main container for centering - now fixed at top-4 for better visibility */}
      <div className="fixed z-50 top-4 left-0 right-0 flex justify-center w-full pointer-events-none">
        {/* Desktop Navbar - enhanced with better fixed positioning and smoother transitions */}
        <motion.nav
          ref={navRef}
          initial={{ y: -30, opacity: 0 }}
          animate={{ 
            y: 0, 
            opacity: 1,
            scale: scrolled ? 0.98 : 1,
          }}
          transition={{ 
            duration: 0.7, 
            ease: "easeOut",
            scale: { duration: 0.4, ease: "easeInOut" }
          }}
          className={clsx(
            "items-center transition-all duration-500 pointer-events-auto group",
            "max-w-[1100px] w-[94vw] justify-between",
            scrolled 
              ? "backdrop-blur-xl bg-background/95 border border-white/15 shadow-xl" 
              : "backdrop-blur-xl bg-background/90 border border-white/10 shadow-lg",
            isScrolling && "brightness-105",
            "hidden md:flex"
          )}
          style={{
            boxShadow: scrolled 
              ? "0 10px 30px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.08)" 
              : "0 6px 24px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.05)",
            borderRadius: 9999,
            overflow: 'hidden',
            height: isExpanded ? 56 : 48,
            minHeight: 48,
            paddingLeft: isExpanded ? 24 : 16,
            paddingRight: isExpanded ? 24 : 16,
            transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
            width: isExpanded ? 780 : 400,
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
            transition={{ duration: 0.3 }}
          >
            <motion.img 
              src="/my_logo_7.1.svg" 
              alt="Logo" 
              className="w-8 h-8 rounded-lg object-cover"
              animate={{
                filter: scrolled ? "brightness(1.15)" : "brightness(1)"
              }}
              transition={{ duration: 0.4 }}
            />
          </motion.a>

          {/* Desktop expanding nav (md+) - improved animations */}
          <motion.div
            className="flex items-center relative h-full"
            initial={false}
            animate={{
              opacity: isExpanded ? 1 : 0.8,
              width: isExpanded ? 800 : 0,
              marginLeft: isExpanded ? 40 : 0,
              marginRight: isExpanded ? 8 : 0,
            }}
            transition={{
              width: { duration: 0.6, ease: "easeInOut" },
              opacity: { duration: 0.4 },
              marginLeft: { duration: 0.5 },
              marginRight: { duration: 0.5 },
            }}
            style={{
              minWidth: 0,
              maxWidth: 800,
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
              className="flex gap-0 w-full justify-center items-center h-full"
              initial={false}
              animate={{ opacity: isExpanded ? 1 : 0, x: isExpanded ? 0 : 12 }}
              transition={{ opacity: { duration: 0.35 }, x: { duration: 0.4 } }}
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
                        ? "text-gray-100"
                        : "text-gray-400 hover:text-gray-200",
                      "navbar-link"
                    )}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    {/* Pill-shaped hover gradient background for inactive links */}
                    {active !== nav.label && (
                      <span
                        className="absolute inset-y-1.5 inset-x-2 rounded-full z-[-2] pointer-events-none transition-all duration-300 opacity-0 navbar-link-bg"
                        style={{
                          background: "linear-gradient(45deg, rgba(59, 130, 246, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)",
                          boxShadow: "0 0 6px rgba(59, 130, 246, 0.1)",
                          transition: 'opacity 0.4s cubic-bezier(0.23, 1, 0.32, 1), background 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
                        }}
                      />
                    )}
                    {/* Pill-shaped active background with enhanced animation */}
                    {active === nav.label && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute inset-y-1.5 inset-x-2 rounded-full z-[-1]"
                        style={{
                          background: "linear-gradient(45deg, rgba(59, 130, 246, 0.25) 0%, rgba(16, 185, 129, 0.25) 100%)",
                          boxShadow: "0 0 10px rgba(59, 130, 246, 0.25)",
                          borderRadius: 9999,
                        }}
                        transition={{ type: "spring", bounce: 0.25, duration: 0.8 }}
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
              "items-center justify-center p-0 m-0 rounded-full text-white bg-transparent border-none outline-none transition-all duration-300",
              isExpanded && "opacity-0 pointer-events-none",
              "hidden md:flex"
            )}
            style={{ width: 40, height: 40, minWidth: 40 }}
            aria-label={isExpanded ? "Close menu" : "Open menu"}
            tabIndex={isExpanded ? -1 : 0}
            initial={false}
            animate={{ opacity: isExpanded ? 0 : 1 }}
            transition={{ duration: 0.25 }}
            type="button"
            onClick={() => setIsExpanded((v) => !v)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: isExpanded ? 90 : 0 }}
              transition={{ duration: 0.4 }}
            >
              {isExpanded ? <X className="text-white" /> : <Menu className="text-white" />}
            </motion.div>
          </motion.button>
        </motion.nav>

        {/* Mobile Navbar: Only logo and hamburger - improved styling and positioning */}
        <motion.nav
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className={clsx(
            "flex md:hidden items-center justify-between w-full max-w-[300px] px-3 py-1.5 pointer-events-auto",
            "backdrop-blur-xl bg-background/95 border border-white/15 shadow-xl rounded-full"
          )}
          style={{ minHeight: 40 }}
        >
          <a href="/" aria-label="Go to homepage" className="flex items-center">
            <img src="/my_logo_7.1.svg" alt="Logo" className="w-7 h-7 rounded-lg object-cover" />
          </a>
          <motion.button
            className={clsx(
              "flex items-center justify-center p-1.5 rounded-full transition-all duration-300",
              scrolled ? "bg-white/20 hover:bg-white/25" : "bg-white/15 hover:bg-white/20"
            )}
            aria-label={openMobile ? "Close menu" : "Open menu"}
            onClick={() => setOpenMobile((v) => !v)}
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <motion.div
              animate={{ rotate: openMobile ? 90 : 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {openMobile ? <X className="text-white" /> : <Menu className="text-white" />}
            </motion.div>
          </motion.button>
        </motion.nav>
      </div>

      {/* Mobile menu overlay/modal - enhanced with smoother animations */}
      <AnimatePresence>
        {openMobile && (
          <motion.div 
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed inset-x-0 top-[4.5rem] z-[99] flex justify-center pointer-events-none"
          >
            <motion.div 
              className="rounded-2xl w-full max-w-[280px] overflow-hidden pointer-events-auto"
              style={{ 
                backdropFilter: "blur(28px)",
                backgroundColor: "rgba(10, 15, 30, 0.96)", 
                boxShadow: "0 20px 50px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.18)",
                border: "1px solid rgba(255, 255, 255, 0.18)"
              }}
              initial={{ backdropFilter: "blur(0px)" }}
              animate={{ backdropFilter: "blur(24px)" }}
              transition={{ duration: 0.4 }}
              onClick={e => e.stopPropagation()}
            >
              <nav className="py-2">
                <ul className="flex flex-col gap-0.5">
                  {NAV_LINKS.map((nav, index) => (
                    <motion.li 
                      key={nav.label} 
                      className="px-1"
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.12, duration: 0.4, ease: "easeOut" }}
                    >
                      <motion.a
                        href={nav.to}
                        onClick={e => { handleNavClick(e, nav.to); setOpenMobile(false); }}
                        className={clsx(
                          "flex items-center px-4 py-2.5 rounded-xl text-base font-medium transition-all duration-300",
                          active === nav.label
                            ? "bg-gradient-to-r from-emerald-500/25 to-purple-500/25 text-white border border-white/15 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                            : "text-gray-300 hover:bg-white/10 hover:text-white"
                        )}
                        whileHover={{ 
                          x: 5, 
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                          boxShadow: "0 0 10px rgba(255, 255, 255, 0.1)"
                        }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                      >
                        <span>{nav.label}</span>
                        {active === nav.label && (
                          <motion.span 
                            className="ml-auto w-2.5 h-2.5 rounded-full bg-gradient-to-r from-emerald-600 to-purple-700"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.25, type: "spring", stiffness: 300, damping: 25 }}
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
      
      </>
  );
}
