
import React, { useEffect, useRef, useState } from "react";
import { ArrowUp, Menu } from "lucide-react";
import clsx from "clsx";

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
          className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-300 transition-all"
          style={{ height: SCROLL_PROGRESS_HEIGHT, width: `${progress}%` }}
        />
      </div>
      {/* Navbar pill */}
      <nav
        className={clsx(
          "fixed z-50 top-6 left-1/2 -translate-x-1/2 flex items-center px-6 py-2 rounded-full shadow-depth",
          "backdrop-blur-xl bg-[#141922e6]/90 border border-white/10",
          "max-w-[630px] w-[92vw] justify-between transition-all duration-300",
          "mx-auto"
        )}
        style={{
          boxShadow: "0 6px 32px 0 rgba(30,42,68,0.16), 0 1.5px 8px 0 rgba(30,42,68,0.09)",
        }}
        role="navigation"
      >
        <span className="font-bold tracking-wider text-lg text-white select-none ml-2">
          SaaS Brand
        </span>
        {/* Desktop nav links */}
        <ul className="hidden md:flex gap-2 pr-2">
          {NAV_LINKS.map((nav) => (
            <li key={nav.label}>
              <a
                href={nav.to}
                onClick={e => handleNavClick(e, nav.to)}
                className={clsx(
                  "px-4 py-2 rounded-full relative transition",
                  "hover:after:opacity-100 after:transition after:duration-300 after:content-[''] after:absolute after:inset-0 after:rounded-full",
                  "text-base font-semibold",
                  active === nav.label
                    ? "text-white bg-white/10 after:shadow-[0_0_18px_6px_rgba(19,185,253,0.30)]"
                    : "text-gray-200/90 hover:text-white",
                  "hover:after:shadow-[0_0_16px_4px_rgba(19,185,253,0.25)]"
                )}
                style={{
                  transition: "box-shadow 0.3s, background 0.2s, color 0.2s",
                }}
              >
                {nav.label}
              </a>
            </li>
          ))}
        </ul>
        {/* Mobile menu button */}
        <button
          className="flex md:hidden items-center justify-center p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
          aria-label="Open menu"
          onClick={() => setOpenMobile((v) => !v)}
          type="button"
        >
          <Menu className="text-white" />
        </button>
        {/* Mobile menu drawer */}
        {openMobile && (
          <div className="fixed inset-0 bg-black/70 z-[100] flex flex-col items-center pt-28 animate-fade-in" style={{backdropFilter: "blur(3px)"}}>
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
