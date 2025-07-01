
import React from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import clsx from "clsx";

interface MobileMenuButtonProps {
  isOpen: boolean;
  scrolled: boolean;
  onToggle: () => void;
}

export default function MobileMenuButton({ isOpen, scrolled, onToggle }: MobileMenuButtonProps) {
  return (
    <motion.button
      className={clsx(
        "flex md:hidden items-center justify-center p-2 rounded-full transition-all duration-300",
        scrolled ? "bg-white/12 hover:bg-white/18" : "bg-white/8 hover:bg-white/15"
      )}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      onClick={onToggle}
      type="button"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        animate={{ rotate: isOpen ? 90 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {isOpen ? <X className="text-white" /> : <Menu className="text-white" />}
      </motion.div>
    </motion.button>
  );
}
