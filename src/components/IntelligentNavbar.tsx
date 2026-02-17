import React, { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "About", to: "#about" },
  { label: "Projects", to: "#projects" },
  { label: "Experience", to: "#experience" },
  { label: "Contact", to: "#contact" },
];

export default function IntelligentNavbar() {
  const [active, setActive] = useState("About");
  const [openMobile, setOpenMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      let found = "About";
      for (const section of NAV_LINKS) {
        const elem = document.getElementById(section.to.slice(1));
        if (elem && window.scrollY + 120 >= elem.offsetTop) {
          found = section.label;
        }
      }
      setActive(found);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, to: string) => {
    e.preventDefault();
    setOpenMobile(false);
    const target = document.getElementById(to.slice(1));
    if (target) {
      setTimeout(() => {
        window.scrollTo({ top: target.offsetTop - 80, behavior: "smooth" });
      }, 50);
    }
  };

  return (
    <>
      <div className="fixed z-50 top-4 left-0 right-0 flex justify-center w-full pointer-events-none">
        {/* Desktop: always-visible slim pill */}
        <motion.nav
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={clsx(
            "hidden md:flex items-center gap-1 px-2 py-1.5 pointer-events-auto rounded-2xl transition-all duration-500",
            "backdrop-blur-3xl border border-white/[0.08] backdrop-saturate-[180%]",
            scrolled
              ? "bg-white/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.1)]"
              : "bg-white/[0.03] shadow-[0_4px_20px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.05)]"
          )}
          role="navigation"
        >
          <a href="/" className="flex items-center px-3" aria-label="Home">
            <img src="/my_logo_7.1.svg" alt="Logo" className="w-7 h-7 rounded-lg" />
          </a>

          {NAV_LINKS.map((nav) => (
            <a
              key={nav.label}
              href={nav.to}
              onClick={(e) => handleNavClick(e, nav.to)}
              className={clsx(
                "relative px-4 py-2 text-sm font-medium rounded-xl transition-colors duration-200",
                active === nav.label
                  ? "text-white"
                  : "text-gray-400 hover:text-gray-200"
              )}
            >
              {nav.label}
              {active === nav.label && (
                <motion.div
                  layoutId="navUnderline"
                  className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-emerald-500 rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
            </a>
          ))}
        </motion.nav>

        {/* Mobile: Expanding liquid pill */}
        <motion.nav
          layout
          initial={{ borderRadius: 24 }}
          animate={openMobile ? { borderRadius: 24, height: "auto" } : { borderRadius: 16, height: "auto" }}
          transition={{
            type: "spring",
            damping: 30,
            stiffness: 400,
            mass: 0.8,
          }}
          className={clsx(
            "flex md:hidden flex-col w-full max-w-[300px] pointer-events-auto backdrop-blur-3xl backdrop-saturate-[180%] bg-white/[0.06] border border-white/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.06)] overflow-hidden",
            openMobile ? "px-3 py-3 rounded-[24px]" : "px-3 py-1.5 rounded-2xl"
          )}
        >
          <div className="flex items-center justify-between w-full">
            <a href="/" aria-label="Home" className="flex-shrink-0">
              <img src="/my_logo_7.1.svg" alt="Logo" className="w-7 h-7 rounded-lg" />
            </a>
            <button
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/15 transition-colors"
              onClick={() => setOpenMobile((v) => !v)}
              aria-label={openMobile ? "Close menu" : "Open menu"}
            >
              {openMobile ? (
                <X size={18} className="text-white" />
              ) : (
                <Menu size={18} className="text-white" />
              )}
            </button>
          </div>

          <AnimatePresence>
            {openMobile && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-4 pb-2">
                  <ul className="flex flex-col gap-1">
                    {NAV_LINKS.map((nav, i) => (
                      <motion.li
                        key={nav.label}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <a
                          href={nav.to}
                          onClick={(e) => handleNavClick(e, nav.to)}
                          className={clsx(
                            "flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                            active === nav.label
                              ? "text-white bg-white/10"
                              : "text-gray-400 hover:text-white hover:bg-white/5"
                          )}
                        >
                          {nav.label}
                          {active === nav.label && (
                            <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          )}
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </div>
    </>
  );
}
