
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
        navy: "#0c1120",
        darkBlue: "#0a192f", 
        darkEmerald: "#059669", // Updated to match required emerald green
        emerald: {
          400: "#34d399", // Added for text
          500: "#10b981",
          600: "#059669", // Updated to match required emerald green
          900: "#052e16",
        },
        blue: {
          500: "#3b82f6", // Base blue color
          600: "#2563eb", // Hover blue color
        },
        gray: {
          600: "#4b5563",
        }
      },
      backgroundImage: {
        "hero-pattern": "radial-gradient(circle at 20% 30%, #0f172a, #0a0a0f 70%)",
        "section-gradient": "linear-gradient(180deg, rgba(10, 25, 47, 0.8) 0%, rgba(10, 25, 47, 0.95) 100%)",
      },
      boxShadow: {
        "contact-card": "0px 4px 12px rgba(0, 0, 0, 0.25)",
        "button-blue": "0 4px 12px rgba(37, 99, 235, 0.5)",
      },
      borderRadius: {
        "2xl": "1rem",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in": "fadeIn 0.5s ease-in-out forwards",
        "bounce-slow": "bounce 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "typewriter": "typewriter 2s steps(12) forwards, blink 1s steps(12) infinite",
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        typewriter: {
          '0%': { width: '0' },
          '100%': { width: '12ch' },
        },
        blink: {
          '0%, 100%': { borderRightColor: 'transparent' },
          '50%': { borderRightColor: '#10b981' },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
