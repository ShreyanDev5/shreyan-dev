import { useEffect, useState } from "react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "About", to: "#about" },
  { label: "Projects", to: "#projects" },
  { label: "Skills", to: "#skills" },
  { label: "Journey", to: "#journey" },
  { label: "Contact", to: "#contact" },
];

export default function IntelligentNavbar() {
  const [active, setActive] = useState("About");
  const [openMobile, setOpenMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);

      // Check if we've reached the bottom of the page
      const isBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 50;

      if (isBottom) {
        setActive(NAV_LINKS[NAV_LINKS.length - 1].label);
        return;
      }

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
          <a href="/" className="flex items-center justify-center pl-2 pr-2.5" aria-label="Home">
            <img src="/my_logo_8.0.png" alt="Logo" className="w-10 h-7 object-contain opacity-90 transition-opacity hover:opacity-100" />
          </a>
          <div className="w-[1px] h-4 bg-white/10 mx-1 shrink-0" />

          {NAV_LINKS.map((nav) => (
            <a
              key={nav.label}
              href={nav.to}
              onClick={(e) => handleNavClick(e, nav.to)}
              className={clsx(
                "px-2.5 py-2 text-sm font-medium rounded-xl transition-colors duration-200",
                active === nav.label
                  ? "text-white"
                  : "text-gray-400 hover:text-gray-200"
              )}
            >
              <span className="relative flex flex-col items-center justify-center">
                {nav.label}
                {active === nav.label && (
                  <motion.div
                    layoutId="navUnderline"
                    className="absolute -bottom-1.5 left-0 right-0 mx-auto w-[50%] h-[1.5px] bg-emerald-500 rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
              </span>
            </a>
          ))}
        </motion.nav>

        {/* Mobile: Expanding pill */}
        <nav
          className="flex md:hidden flex-col w-full max-w-[300px] pointer-events-auto backdrop-blur-3xl backdrop-saturate-[180%] bg-white/[0.06] border border-white/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.06)] overflow-hidden rounded-2xl px-3 py-1.5"
        >
          <div className="flex items-center justify-between w-full">
            <a href="/" aria-label="Home" className="flex items-center pl-1 pr-2">
              <img src="/my_logo_8.0.png" alt="Logo" className="w-10 h-7 object-contain opacity-90" />
            </a>
            <button
              type="button"
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center w-8 h-8 relative focus:outline-none"
              onClick={() => setOpenMobile((v) => !v)}
              aria-label={openMobile ? "Close menu" : "Open menu"}
            >
              <div className="relative w-4 h-3.5 flex flex-col justify-between">
                <span className={clsx(
                  "w-full h-[1.5px] bg-white rounded-full transition-transform duration-300 ease-in-out",
                  openMobile ? "rotate-45 translate-y-[6px]" : ""
                )} />
                <span className={clsx(
                  "w-full h-[1.5px] bg-white rounded-full transition-all duration-300 ease-in-out",
                  openMobile ? "opacity-0 scale-x-0" : ""
                )} />
                <span className={clsx(
                  "w-full h-[1.5px] bg-white rounded-full transition-transform duration-300 ease-in-out",
                  openMobile ? "-rotate-45 -translate-y-[6px]" : ""
                )} />
              </div>
            </button>
          </div>

          <AnimatePresence>
            {openMobile && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="pt-3 pb-1.5">
                  <ul className="flex flex-col gap-1">
                    {NAV_LINKS.map((nav, i) => (
                      <motion.li
                        key={nav.label}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -8 }}
                        transition={{ delay: i * 0.04, duration: 0.2 }}
                      >
                        <motion.a
                          whileTap={{ scale: 0.975 }}
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
                        </motion.a>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </div>
    </>
  );
}
