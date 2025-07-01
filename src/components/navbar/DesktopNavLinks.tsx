
import React from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

interface NavLink {
  label: string;
  to: string;
}

interface DesktopNavLinksProps {
  navLinks: NavLink[];
  active: string;
  scrolled: boolean;
  onNavClick: (e: React.MouseEvent, to: string) => void;
}

export default function DesktopNavLinks({ navLinks, active, scrolled, onNavClick }: DesktopNavLinksProps) {
  return (
    <ul className="hidden md:flex gap-2 pr-2">
      {navLinks.map((nav) => (
        <li key={nav.label}>
          <motion.a
            href={nav.to}
            onClick={e => onNavClick(e, nav.to)}
            className={clsx(
              "px-4 py-2 rounded-full relative transition-all duration-300",
              "text-base font-medium",
              active === nav.label
                ? "text-white"
                : "text-gray-300 hover:text-white",
            )}
            whileHover={{ 
              scale: 1.02,
              backgroundColor: active === nav.label ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.1)"
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            {nav.label}
            {active === nav.label && (
              <motion.div
                layoutId="activeSection"
                className="absolute inset-0 rounded-full"
                style={{
                  background: scrolled 
                    ? "linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(124, 58, 237, 0.2))"
                    : "rgba(255, 255, 255, 0.15)"
                }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </motion.a>
        </li>
      ))}
    </ul>
  );
}
