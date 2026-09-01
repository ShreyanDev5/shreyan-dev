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
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        signature: ['"Caveat"', 'cursive'],
      },
      colors: {
        background: "#100f0e",
        foreground: "#F0EFEA",
        warm: {
          50: "#F7F6F4",
          100: "#F0EFEA", // Primary text / Alabaster
          200: "#E8E7E4", // Accent white / Card headings
          300: "#D4D1CA", // Secondary body text
          400: "#C8C5BD", // Soft warm text
          500: "#9A9790", // Muted metadata / taupe
          600: "#8A8780", // Section counters (01 //)
          700: "#4A4844",
          800: "#222120",
          900: "#151413",
          950: "#100f0e",
        },
        emerald: {
          300: "#34d399",
          400: "#10b981",
          500: "#059669",
          600: "#047857",
          700: "#065f46",
          800: "#064e3b",
          900: "#022c22",
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
        'button-emerald': '0 4px 14px 0 rgba(16, 185, 129, 0.39)',
        'contact-card': '0 8px 30px rgba(0, 0, 0, 0.12)',
      },
      backgroundImage: {
        'multi-gradient': 'linear-gradient(to right, #3b82f6, #8b5cf6, #10b981)',
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "blink": "blink 1.8s steps(1) infinite",
        "terminal-blink": "terminalBlink 1.5s ease-in-out infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        terminalBlink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.15" },
        },
      },
    },
  },
  plugins: [tailwindAnimate],
} satisfies Config;

export default config;
