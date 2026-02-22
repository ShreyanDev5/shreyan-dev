import type { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";

const config = {
  darkMode: ["class"],
  content: [
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
        background: "#0a0a0a",
        foreground: "#ffffff",
        emerald: {
          500: "#10B981",
          600: "#059669",
        },
        // Added missing colors based on usage
        darkBlue: "#0A192F",
        darkPurple: "#2e1065", // deeply purple
        darkEmerald: "#022c22", // deeply emerald
        electric: {
          300: "#93c5fd",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
        },
        border: "hsl(0 0% 14.9%)",
        input: "hsl(0 0% 14.9%)",
        ring: "hsl(142 71% 45%)",
        primary: {
          DEFAULT: "hsl(142 71% 45%)",
          foreground: "hsl(0 0% 100%)",
        },
        secondary: {
          DEFAULT: "hsl(0 0% 9%)",
          foreground: "hsl(0 0% 98%)",
        },
        muted: {
          DEFAULT: "hsl(0 0% 15%)",
          foreground: "hsl(0 0% 64%)",
        },
        accent: {
          DEFAULT: "hsl(0 0% 15%)",
          foreground: "hsl(0 0% 98%)",
        },
        destructive: {
          DEFAULT: "hsl(0 62% 30%)",
          foreground: "hsl(0 0% 98%)",
        },
      },
      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem",
      },
      borderWidth: {
        "1.5": "1.5px",
        "1.75": "1.75px",
      },
      boxShadow: {
        // Added missing shadows based on usage
        'glow': '0 0 15px rgba(255, 255, 255, 0.1)',
        'glow-electric': '0 0 20px rgba(59, 130, 246, 0.5)',
        'glow-purple': '0 0 20px rgba(124, 58, 237, 0.5)',
        'button-purple': '0 4px 14px 0 rgba(124, 58, 237, 0.39)',
        'button-emerald': '0 4px 14px 0 rgba(16, 185, 129, 0.39)',
        'contact-card': '0 8px 30px rgba(0, 0, 0, 0.12)',
      },
      backgroundImage: {
        'multi-gradient': 'linear-gradient(to right, #3b82f6, #8b5cf6, #10b981)',
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "blink": "blink 1.8s steps(1) infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [tailwindAnimate],
} satisfies Config;

export default config;
