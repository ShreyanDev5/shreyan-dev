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
          300: "#1EAEDB",
          500: "#0FA0CE",
          700: "#0B86AF",
        },
        emerald: {
          500: "#10B981",
          600: "#059669",
        },
        cream: {
          50: "#F9FAFB",
          100: "#F3F4F6",
        },
      },
      backgroundImage: {
        "hero-pattern": "radial-gradient(circle at center, rgba(16, 185, 129, 0.05) 0%, transparent 70%)",
        "section-gradient": "linear-gradient(180deg, rgba(10, 17, 40, 0.8) 0%, rgba(10, 17, 40, 0.95) 100%)",
        "noise-texture": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        glow: "0 0 15px rgba(16, 185, 129, 0.3)",
        "glow-strong": "0 0 25px rgba(16, 185, 129, 0.4)",
      },
      borderRadius: {
        "2xl": "1rem",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
