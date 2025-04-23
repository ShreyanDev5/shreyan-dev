
import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        roboto: ["Roboto", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        background: "#111217",
        "gradient-top": "#111217",
        "gradient-middle": "#13b9fd",
        "gradient-bottom": "#ffffff",
        primary: "#3B82F6",
        secondary: "#64748B",
        accent: "#0EA5E9",
      },
      backgroundImage: {
        "landing-gradient":
          "linear-gradient(180deg, #111217 0%, #13b9fd 50%, #ffffff 100%)",
      },
      boxShadow: {
        depth: "0 8px 32px 0 rgba(30,42,68,0.20)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
