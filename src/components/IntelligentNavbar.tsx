import { useEffect, useState } from "react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "About", to: "#about" },
  { label: "Projects", to: "#projects" },
  { label: "GitHub", to: "#github" },
  { label: "Skills", to: "#skills" },
  { label: "Journey", to: "#journey" },
  { label: "Contact", to: "#contact" },
];



export default function IntelligentNavbar() {
  const [active, setActive] = useState("");
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

      let found = "";
      for (const section of NAV_LINKS) {
        const elem = document.getElementById(section.to.slice(1));
        if (elem && window.scrollY + 140 >= elem.offsetTop) {
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
    const targetId = to.slice(1);
    const target = document.getElementById(targetId);
    if (target) {
      setTimeout(() => {
        const targetPosition = window.scrollY + target.getBoundingClientRect().top - 80;
        window.scrollTo({ top: Math.max(0, targetPosition), behavior: "smooth" });
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
            "backdrop-blur-3xl border border-white/10 backdrop-saturate-[180%]",
            scrolled
              ? "bg-[#151413]/90 shadow-[0_8px_30px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.08)]"
              : "bg-[#151413]/75 shadow-[0_4px_20px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.04)]"
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
                "px-2 py-2 text-xs font-mono tracking-normal font-medium rounded-xl transition-colors duration-200",
                active === nav.label
                  ? "text-warm-100"
                  : "text-warm-400 hover:text-warm-100"
              )}
            >
              <span className="relative flex flex-col items-center justify-center">
                {nav.label}
                {active === nav.label && (
                  <motion.div
                    layoutId="navUnderline"
                    className="absolute -bottom-1.5 left-0 right-0 mx-auto w-3/5 h-[1.75px] bg-emerald-400 rounded-full shadow-[0_0_4px_rgba(52,211,153,0.35)]"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                      mass: 0.8,
                    }}
                  />
                )}
              </span>
            </a>
          ))}
        </motion.nav>

        {/* Mobile: Expanding pill */}
        <nav
          className="flex md:hidden flex-col w-full max-w-[270px] pointer-events-auto backdrop-blur-3xl backdrop-saturate-[180%] bg-[#151413]/95 border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.05)] overflow-hidden rounded-2xl px-2.5 py-1.5"
        >
          <div className="flex items-center justify-between w-full">
            <a href="/" aria-label="Home" className="flex items-center pl-1 pr-2">
              <img src="/my_logo_8.0.png" alt="Logo" className="w-10 h-7 object-contain opacity-90" />
            </a>
            <button
              type="button"
              className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 active:scale-95 transition-all flex items-center justify-center w-8 h-8 focus:outline-none"
              onClick={() => setOpenMobile((v) => !v)}
              aria-label={openMobile ? "Close menu" : "Open menu"}
            >
              <div className="relative w-4 h-3.5 flex flex-col justify-between items-center">
                <motion.span
                  animate={openMobile ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                  className="w-full h-[1.5px] bg-warm-100 rounded-full origin-center"
                />
                <motion.span
                  animate={openMobile ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="w-full h-[1.5px] bg-warm-100 rounded-full"
                />
                <motion.span
                  animate={openMobile ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                  className="w-full h-[1.5px] bg-warm-100 rounded-full origin-center"
                />
              </div>
            </button>
          </div>

          <AnimatePresence>
            {openMobile && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                className="overflow-hidden"
              >
                <div className="pt-2 pb-1">
                  <ul className="flex flex-col gap-0.5">
                    {NAV_LINKS.map((nav, i) => (
                      <motion.li
                        key={nav.label}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -6 }}
                        transition={{ delay: i * 0.03, duration: 0.18 }}
                      >
                        <a
                          href={nav.to}
                          onClick={(e) => handleNavClick(e, nav.to)}
                          className={clsx(
                            "flex items-center px-3 py-2 rounded-xl text-xs font-mono tracking-normal font-medium transition-all duration-150 active:scale-[0.98]",
                            active === nav.label
                              ? "text-warm-100 bg-white/10 font-semibold"
                              : "text-warm-400 hover:text-warm-100 hover:bg-white/5"
                          )}
                        >
                          {nav.label}
                        </a>
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
