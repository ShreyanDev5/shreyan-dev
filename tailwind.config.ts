
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
        navy: "#001F3F",      // Deep navy
        darkBlue: "#0A192F",  // Updated base color
        darkEmerald: "#09735b", // More subdued emerald color
        darkPurple: "#4a235a", // End gradient color
        emerald: {
          500: "#09735b", // More subdued emerald
          600: "#075e4a", // Slightly darker
          700: "#054535", // Even darker for better contrast
          800: "#043a2d", // Most subdued version
          900: "#032e24",
        },
        indigo: {
          500: "#5a55c9",
          600: "#4841bd",
        },
        purple: {
          500: "#7946ad", // More subdued purple
          600: "#5a2ea6",
          900: "#1e293b",
        },
        electric: {
          300: "#3079b8",
          500: "#1a5c9a",
          600: "#0f4475", // Hover state
          700: "#0a3159", // Base color
        },
        gray: {
          600: "#4b5563",
        },
        neon: {
          blue: "#0099cc",
          green: "#09735b",
          purple: "#7946ad"
        }
      },
      backgroundImage: {
        "hero-pattern": "radial-gradient(circle at 20% 30%, #041830, #0a0a0f 70%)",
        "section-gradient": "linear-gradient(180deg, rgba(10, 25, 47, 0.8) 0%, rgba(10, 25, 47, 0.95) 100%)",
        "circuit-pattern": "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZGVmcz48cGF0dGVybiBpZD0iY2lyY3VpdCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiPjxwYXRoIGQ9Ik0gMTAgMTAgTCA5MCA5MCBNIDI1IDEwIEwgOTAgNzUgTSAxMCAyNSBMIDc1IDkwIE0gNTAgMTAgTCA5MCA1MCBNIDY1IDEwIEwgOTAgMzUgTSA4MCAxMCBMIDkwIDIwIE0gMTAgNTAgTCAzNSA5MCBNIDM1IDEwIEwgMTAgMzUgTSAyMCAxMCBMIDEwIDIwIE0gMTAgNjUgTCAxMCA5MCBNIDM1IDkwIEwgOTAgMzUgTSA1MCA5MCBMIDU1IDg1IiBzdHJva2U9IiM4YjVjZjYiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMC41IiBmaWxsPSJub25lIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2NpcmN1aXQpIi8+PC9zdmc+')",
        "multi-gradient": "linear-gradient(90deg, #09735b, #1a5c9a, #5a2ea6)",
        "tech-gradient": "linear-gradient(90deg, #0099cc, #09735b, #7946ad)",
        "elegant-gradient": "linear-gradient(to right, #141e30, #243b55)",
        "dark-radial": "radial-gradient(ellipse at center, #0A192F 0%, #060c16 100%)"
      },
      boxShadow: {
        glow: "0 0 15px rgba(9, 115, 91, 0.3)", 
        "glow-strong": "0 0 25px rgba(9, 115, 91, 0.4)",
        "glow-purple": "0 0 15px rgba(90, 46, 166, 0.3)",
        "glow-electric": "0 0 15px rgba(26, 92, 154, 0.3)",
        "contact-card": "0px 4px 12px rgba(0, 0, 0, 0.25)",
        "button-emerald": "0 4px 12px rgba(9, 115, 91, 0.4)",
        "button-blue": "0 4px 12px rgba(10, 49, 89, 0.4)",
        "button-purple": "0 4px 12px rgba(90, 46, 166, 0.5)",
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
          '50%': { borderRightColor: '#09735b' },
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
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
