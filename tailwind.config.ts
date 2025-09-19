
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
      transitionTimingFunction: {
        'custom': 'cubic-bezier(0.2, 0, 0, 1)',
      },
      fontFamily: {
        heading: ['Sora', 'system-ui', 'sans-serif'],
        body: ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: "#090D17",  // Even deeper, more premium navy
        navy: "#000E1A",        // Refined ultra-deep navy
        darkBlue: "#0F1522",    // More saturated dark blue-gray
        darkEmerald: "#163D2D", // Richer, deeper emerald
        darkPurple: "#2E1542",  // More intense deep purple
        emerald: {
          500: "#0DA271", // More saturated, premium emerald
          600: "#047857", // Deeper Apple-style emerald
          900: "#031A0F",
        },
        indigo: {
          500: "#5859E3", // More vibrant indigo
          600: "#4338CA", // Richer indigo
        },
        purple: {
          500: "#6D28D9", // Deeper, more elegant purple
          600: "#5B21B6", // Significantly darker
          900: "#121A2C", // Deeper background
        },
        electric: {
          300: "#3B82F6", // More vibrant electric blue
          500: "#2563EB", // Richer, more refined blue
          600: "#1D4ED8", // Deeper hover state
          700: "#1E3A8A", // Even deeper base color
        },
        gray: {
          600: "#374151", // Deeper gray
        },
        neon: {
          blue: "#0284C7",   // Deeper, more premium blue
          green: "#0DA271",  // Match emerald for consistency
          purple: "#7C3AED"  // Deeper purple
        }
      },
      backgroundImage: {
        "hero-pattern": "radial-gradient(circle at 20% 30%, #001A33, #090c14 70%)",
        "section-gradient": "linear-gradient(180deg, rgba(9, 13, 23, 0.85) 0%, rgba(9, 13, 23, 0.98) 100%)",
        "circuit-pattern": "url('data:image/svg+xml;base64,IyM3YzNhZWQiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMC41IiBmaWxsPSJub25lIi8+')",
        "multi-gradient": "linear-gradient(90deg, #0DA271, #3B82F6, #6D28D9)",
        "tech-gradient": "linear-gradient(90deg, #00FFFF, #39FF14, #BC13FE)",
        "elegant-gradient": "linear-gradient(to right, #0F172A, #1E293B)",
        "dark-radial": "radial-gradient(ellipse at center, #090D17 0%, #05080E 100%)"
      },
      boxShadow: {
        glow: "0 0 15px rgba(13, 162, 113, 0.35)", 
        "glow-strong": "0 0 25px rgba(13, 162, 113, 0.45)",
        "glow-purple": "0 0 15px rgba(109, 40, 217, 0.35)",
        "glow-electric": "0 0 15px rgba(37, 99, 235, 0.35)",
        "contact-card": "0px 4px 12px rgba(0, 0, 0, 0.3)",
        "button-emerald": "0 4px 12px rgba(13, 162, 113, 0.45)",
        "button-blue": "0 4px 12px rgba(9, 21, 66, 0.45)",
        "button-purple": "0 4px 12px rgba(109, 40, 217, 0.55)",
      },
      borderRadius: {
        "2xl": "1rem",
        "xl": "0.75rem",
        "lg": "0.5rem",
      },
      opacity: {
        '15': '0.15',
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in": "fadeIn 0.5s ease-in-out forwards",
        "bounce-slow": "bounce 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "typewriter": "typewriter 2s steps(12) forwards, blink 1s steps(12) infinite",
        "gradient-x": "gradient-x 3s ease infinite",
        "gradient-shift": "gradientShift 18s ease infinite",
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
          '50%': { borderRightColor: '#64ffda' },
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        'gradientShift': {
          '0%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
          '100%': { 'background-position': '0% 50%' },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
