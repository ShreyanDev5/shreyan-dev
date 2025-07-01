
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

interface NavLink {
  label: string;
  to: string;
}

interface MobileNavMenuProps {
  isOpen: boolean;
  navLinks: NavLink[];
  active: string;
  onNavClick: (e: React.MouseEvent, to: string) => void;
}

export default function MobileNavMenu({ isOpen, navLinks, active, onNavClick }: MobileNavMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed inset-x-0 top-[5.5rem] z-[99] flex justify-center"
        >
          <motion.div 
            className="glass-morphism rounded-2xl w-[94vw] max-w-[720px] overflow-hidden"
            style={{ 
              backdropFilter: "blur(24px) saturate(1.3)",
              WebkitBackdropFilter: "blur(24px) saturate(1.3)",
              backgroundColor: "rgba(13, 17, 23, 0.98)", 
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.12)",
              border: "1px solid rgba(255, 255, 255, 0.2)"
            }}
            initial={{ backdropFilter: "blur(0px)" }}
            animate={{ backdropFilter: "blur(24px) saturate(1.3)" }}
            transition={{ duration: 0.3 }}
          >
            <nav className="py-4">
              <ul className="flex flex-col">
                {navLinks.map((nav, index) => (
                  <motion.li 
                    key={nav.label} 
                    className="px-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <motion.a
                      href={nav.to}
                      onClick={e => onNavClick(e, nav.to)}
                      className={clsx(
                        "flex items-center px-6 py-4 rounded-xl text-lg font-medium transition-all duration-200",
                        active === nav.label
                          ? "bg-gradient-to-r from-emerald-500/20 to-purple-500/20 text-white border border-white/8"
                          : "text-gray-300 hover:bg-white/10 hover:text-white"
                      )}
                      whileHover={{ x: 4, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
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
  );
}
