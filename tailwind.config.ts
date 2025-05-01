
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
      fontFamily: {
        heading: ['Sora', 'system-ui', 'sans-serif'],
        body: ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: "#0d1117",
        electric: {
          300: "#40A3FF",
          500: "#1E90FF",
          700: "#0070DC",
        },
        emerald: {
          500: "#10B981",
          600: "#059669",
        },
        indigo: {
          500: "#6366F1",
          600: "#4F46E5",
        }
      },
      backgroundImage: {
        "hero-pattern": "radial-gradient(circle at 25% 50%, rgba(30, 144, 255, 0.15) 0%, transparent 50%)",
        "section-gradient": "linear-gradient(180deg, rgba(10, 17, 40, 0.8) 0%, rgba(10, 17, 40, 0.95) 100%)",
      },
      boxShadow: {
        glow: "0 0 15px rgba(30, 144, 255, 0.3)",
        "glow-strong": "0 0 25px rgba(30, 144, 255, 0.4)",
      },
      borderRadius: {
        "2xl": "1rem",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in": "fadeIn 0.5s ease-in-out forwards",
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
