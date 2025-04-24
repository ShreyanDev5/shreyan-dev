
import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        background: "#111217",
        emerald: {
          500: "#10B981",
          600: "#059669",
        },
        electric: {
          300: "#1EAEDB",
          500: "#0FA0CE",
        },
        cream: {
          50: "#F9FAFB",
          100: "#F3F4F6",
        },
      },
      backgroundImage: {
        "hero-pattern": "radial-gradient(circle at center, rgba(16, 185, 129, 0.05) 0%, transparent 70%)",
        "section-gradient": "linear-gradient(180deg, rgba(17, 18, 23, 0.8) 0%, rgba(17, 18, 23, 0.95) 100%)",
      },
      boxShadow: {
        glow: "0 0 15px rgba(16, 185, 129, 0.3)",
        "glow-strong": "0 0 25px rgba(16, 185, 129, 0.4)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
