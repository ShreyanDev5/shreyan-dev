
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sun, Moon, CircleHalf } from "lucide-react";

type Theme = "light" | "dark" | "system";

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<Theme>("dark");
  
  // Initialize theme from localStorage or default to system
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as Theme | null;
    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      // Default to system preference
      setTheme("system");
    }
  }, []);
  
  // Apply theme changes
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else if (theme === "light") {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      // System preference
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      localStorage.setItem("theme", "system");
    }
  }, [theme]);
  
  // Toggle through themes
  const toggleTheme = () => {
    setTheme(currentTheme => {
      if (currentTheme === "light") return "dark";
      if (currentTheme === "dark") return "system";
      return "light";
    });
  };
  
  // Icon mapping
  const icons = {
    light: <Sun className="h-[1.2rem] w-[1.2rem]" />,
    dark: <Moon className="h-[1.2rem] w-[1.2rem]" />,
    system: <CircleHalf className="h-[1.2rem] w-[1.2rem]" />
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Button
        variant="outline"
        size="icon"
        onClick={toggleTheme}
        className="rounded-full bg-white/5 border-white/10 hover:bg-white/10 backdrop-blur-sm"
        aria-label={`Switch to ${theme === "light" ? "dark" : theme === "dark" ? "system" : "light"} theme`}
      >
        <motion.div
          key={theme}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {icons[theme]}
        </motion.div>
        <span className="sr-only">
          {theme === "light" ? "Light" : theme === "dark" ? "Dark" : "System"} theme
        </span>
      </Button>
    </motion.div>
  );
};

export default ThemeToggle;
