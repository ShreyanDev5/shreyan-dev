import React, { useEffect, useRef, useState } from "react";
import { ArrowUp, Menu } from "lucide-react";
import clsx from "clsx";
import { motion } from "framer-motion";

// Define the navigation sections
const NAV_LINKS = [
  { label: "Home", to: "#home" },
  { label: "About", to: "#about" },
  { label: "Projects", to: "#projects" },
  { label: "Contact", to: "#contact" },
  { label: "Blog", to: "#blog" },
];

const SCROLL_PROGRESS_HEIGHT = 4;

export default function IntelligentNavbar() {
  const [active, setActive] = useState("Home");
  const [progress, setProgress] = useState(0);
  const [showFab, setShowFab] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);
  const sectionsRef = useRef<Record<string, HTMLElement | null>>({});

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

  // Scroll progress indicator
  useEffect(() => {
    function updateProgress() {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight =
        (document.documentElement.scrollHeight || document.body.scrollHeight) -
        (document.documentElement.clientHeight || document.body.clientHeight);
      setProgress(scrollHeight ? (scrollTop / scrollHeight) * 100 : 0);

      setShowFab(scrollTop > 64);
    }
    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

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
      {/* Scroll progress bar */}
      <div
        className="fixed top-0 left-0 w-full z-[60] pointer-events-none"
        aria-hidden
      >
        <div
          className="bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-300 transition-all"
          style={{ height: 2, width: `${progress}%` }}
        />
      </div>
      {/* Navbar pill */}
      <nav
        className={clsx(
          "fixed z-50 top-6 left-1/2 -translate-x-1/2 flex items-center px-6 py-2 rounded-full",
          "backdrop-blur-xl bg-background/80 border border-white/10",
          "max-w-[630px] w-[92vw] justify-between transition-all duration-300",
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
          aria-label="Open menu"
          onClick={() => setOpenMobile((v) => !v)}
          type="button"
        >
          <Menu className="text-white" />
        </button>

        {/* Mobile menu drawer */}
        {openMobile && (
          <div className="fixed inset-0 bg-black/90 z-[100] flex flex-col items-center pt-28 animate-fade-in">
            <button
              className="absolute top-8 right-6 md:hidden text-white text-2xl"
              onClick={() => setOpenMobile(false)}
            >
              ×
            </button>
            <ul className="flex flex-col gap-8">
              {NAV_LINKS.map((nav) => (
                <li key={nav.label}>
                  <a
                    href={nav.to}
                    onClick={e => handleNavClick(e, nav.to)}
                    className={clsx(
                      "text-2xl font-semibold px-4 py-2 rounded-full transition relative",
                      active === nav.label
                        ? "text-white bg-blue-600/20 after:shadow-[0_0_22px_10px_rgba(19,185,253,0.35)]"
                        : "text-gray-200/90 hover:text-white",
                      "after:transition after:duration-300 after:content-[''] after:absolute after:inset-0 after:rounded-full hover:after:shadow-[0_0_18px_6px_rgba(19,185,253,0.22)]"
                    )}
                  >
                    {nav.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
      {/* Floating-action button (FAB) for mobile */}
      <button
        className={clsx(
          "fixed z-[98] bottom-8 right-6 md:hidden rounded-full bg-blue-500/80 hover:bg-blue-600 shadow-lg text-white p-3",
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
