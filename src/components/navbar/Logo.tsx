
import React from "react";
import { motion } from "framer-motion";

interface LogoProps {
  scrolled: boolean;
}

export default function Logo({ scrolled }: LogoProps) {
  return (
    <motion.a 
      href="/" 
      className="flex items-center space-x-2 mr-8"
      aria-label="Go to homepage"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <motion.img 
        src="/my_logo_7.0.png" 
        alt="Logo" 
        className="w-8 h-8 rounded-lg object-cover"
        animate={{
          filter: scrolled ? "brightness(1.2) contrast(1.15)" : "brightness(1.1) contrast(1.05)"
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.a>
  );
}
