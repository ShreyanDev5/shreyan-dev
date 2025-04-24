
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
        sans: ["Inter", "Roboto", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        background: "#111217",
        "gradient-top": "#111217",
        "gradient-middle": "#13b9fd",
        "gradient-bottom": "#ffffff",
        primary: "#3B82F6",
        secondary: "#64748B",
        accent: "#0EA5E9",
        emerald: {
          500: "#10B981",
          600: "#059669",
        },
        purple: {
          500: "#8B5CF6",
          600: "#7C3AED",
        },
      },
      backgroundImage: {
        "landing-gradient":
          "linear-gradient(180deg, #111217 0%, #13b9fd 50%, #ffffff 100%)",
        "card-gradient": 
          "linear-gradient(to bottom right, rgb(18, 24, 38), rgb(11, 15, 23))",
        "glass-gradient":
          "linear-gradient(to bottom right, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))",
      },
      boxShadow: {
        depth: "0 8px 32px 0 rgba(30,42,68,0.20)",
        glow: "0 0 15px rgba(59, 130, 246, 0.5)",
        card: "0 4px 20px rgba(0, 0, 0, 0.25)",
        "inner-glow": "inset 0 0 20px 5px rgba(59, 130, 246, 0.15)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "float": "float 5s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
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
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#e2e8f0',
            a: {
              color: '#3B82F6',
              '&:hover': {
                color: '#60a5fa',
              },
            },
            h1: {
              color: '#ffffff',
            },
            h2: {
              color: '#ffffff',
            },
            h3: {
              color: '#ffffff',
            },
            h4: {
              color: '#ffffff',
            },
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
