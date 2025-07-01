
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
  const [isScrolling, setIsScrolling] = useState(false);
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
      {/* Main container for centering - Fixed positioning and z-index */}
      <div className="fixed inset-x-0 top-6 z-[100] flex justify-center w-full">
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
            "flex items-center px-8 py-2 rounded-full transition-all duration-300",
            "max-w-[720px] w-[94vw] justify-between relative",
            scrolled 
              ? "backdrop-blur-2xl bg-background/98 border border-white/25 shadow-2xl" 
              : "backdrop-blur-xl bg-background/95 border border-white/20 shadow-lg",
            isScrolling && "brightness-105"
          )}
          style={{
            boxShadow: scrolled 
              ? "0 20px 60px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)" 
              : "0 16px 48px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.08)",
            backdropFilter: "blur(24px) saturate(1.3)",
            WebkitBackdropFilter: "blur(24px) saturate(1.3)", // Safari support
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
