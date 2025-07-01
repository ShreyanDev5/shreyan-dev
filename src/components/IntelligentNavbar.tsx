
import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import Logo from "./navbar/Logo";
import DesktopNavLinks from "./navbar/DesktopNavLinks";
import MobileMenuButton from "./navbar/MobileMenuButton";
import MobileNavMenu from "./navbar/MobileNavMenu";
import ScrollToTopFAB from "./navbar/ScrollToTopFAB";

// Define the navigation sections
const NAV_LINKS = [
  { label: "Home", to: "#home" },
  { label: "About", to: "#about" },
  { label: "Projects", to: "#projects" },
  { label: "Tools", to: "#tech-stack" },
  { label: "Contact", to: "#contact" },
  { label: "Blog", to: "#blog" },
];

export default function IntelligentNavbar() {
  const [active, setActive] = useState("Home");
  const [showFab, setShowFab] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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
      
      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
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
      {/* Sticky navbar container - Enhanced positioning */}
      <div className="sticky top-0 inset-x-0 z-[100] flex justify-center w-full pt-6">
        {/* Navbar pill with consistent glass-morphism styling */}
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ 
            y: 0, 
            opacity: 1,
          }}
          transition={{ 
            duration: 0.5, 
            ease: "easeOut",
          }}
          className={clsx(
            "flex items-center px-8 py-2 rounded-full transition-all duration-300",
            "max-w-[720px] w-[94vw] justify-between relative",
            // Consistent glass-morphism styling regardless of scroll state
            "backdrop-blur-xl bg-black/70 border border-white/20 shadow-2xl"
          )}
          style={{
            // Enhanced glass-morphism effect with consistent styling
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.15)", 
            backdropFilter: "blur(20px) saturate(1.8)",
            WebkitBackdropFilter: "blur(20px) saturate(1.8)", // Safari support
          }}
          role="navigation"
        >
          <Logo scrolled={scrolled} />
          
          <DesktopNavLinks 
            navLinks={NAV_LINKS}
            active={active}
            scrolled={scrolled}
            onNavClick={handleNavClick}
          />
          
          <MobileMenuButton 
            isOpen={openMobile}
            scrolled={scrolled}
            onToggle={() => setOpenMobile((v) => !v)}
          />
        </motion.nav>
      </div>

      <MobileNavMenu 
        isOpen={openMobile}
        navLinks={NAV_LINKS}
        active={active}
        onNavClick={handleNavClick}
      />
      
      <ScrollToTopFAB 
        show={showFab}
        onClick={handleFabClick}
      />
    </>
  );
}
