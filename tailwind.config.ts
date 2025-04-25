
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
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: "#0A1128",
        electric: {
          300: "#00D4FF", // Electric cyan
          500: "#3399FF", // Sky blue
          700: "#0033FF", // Royal blue
        },
        navy: {
          900: "#000033", // Midnight navy
        },
        emerald: {
          400: "#34D399", // Lighter emerald
          500: "#10B981", 
          600: "#059669",
        },
        cream: {
          50: "#F9FAFB",
          100: "#F3F4F6",
        },
      },
      backgroundImage: {
        // Updated neo gradient with vertical flow
        "neo-gradient": "linear-gradient(to bottom, #00D4FF 0%, #3399FF 40%, #0033FF 70%, #000033 100%)",
        "neo-glow": "radial-gradient(circle at 25% 70%, rgba(0, 212, 255, 0.6), transparent 60%)",
        "hero-pattern": "radial-gradient(circle at center, rgba(16, 185, 129, 0.05) 0%, transparent 70%)",
        "section-gradient": "linear-gradient(180deg, rgba(10, 17, 40, 0.8) 0%, rgba(10, 17, 40, 0.95) 100%)",
        "noise-texture": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        glow: "0 0 15px rgba(0, 212, 255, 0.3)",
        "glow-strong": "0 0 25px rgba(0, 212, 255, 0.4)",
        "electric-glow": "0 0 30px rgba(0, 212, 255, 0.5)",
        "emerald-glow": "0 0 20px rgba(16, 185, 129, 0.4)",
      },
      borderRadius: {
        "2xl": "1rem",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "glow-pulse": "glowPulse 4s ease-in-out infinite",
        "smooth-scroll": "smoothScroll 0.8s ease-out",
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '0.8' },
        },
        smoothScroll: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
