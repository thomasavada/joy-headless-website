import type { Config } from "tailwindcss";

const animate = require("tailwindcss-animate");
const typography = require('@tailwindcss/typography');

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ["class"],
  safelist: ["dark"],
  prefix: "",

  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
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
      colors: {
        border: "#1D2939",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "#0B1121",
        foreground: "white",
        primary: "#00A6ED",
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "white",
          foreground: "white"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "collapsible-down": {
          from: { height: 0 },
          to: { height: "var(--radix-collapsible-content-height)" },
        },
        "collapsible-up": {
          from: { height: "var(--radix-collapsible-content-height)" },
          to: { height: 0 },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' }
        },
        "reveal-up": {
          "0%": { 
            transform: "translateY(20px)",
            opacity: "0"
          },
          "100%": { 
            transform: "translateY(0)",
            opacity: "1"
          }
        },
        "reveal-down": {
          "0%": { 
            transform: "translateY(-20px)",
            opacity: "0"
          },
          "100%": { 
            transform: "translateY(0)",
            opacity: "1"
          }
        },
        "reveal-left": {
          "0%": { 
            transform: "translateX(-20px)",
            opacity: "0"
          },
          "100%": { 
            transform: "translateX(0)",
            opacity: "1"
          }
        },
        "reveal-right": {
          "0%": { 
            transform: "translateX(20px)",
            opacity: "0"
          },
          "100%": { 
            transform: "translateX(0)",
            opacity: "1"
          }
        },
        "reveal-fade": {
          "0%": { 
            opacity: "0"
          },
          "100%": { 
            opacity: "1"
          }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "collapsible-down": "collapsible-down 0.2s ease-in-out",
        "collapsible-up": "collapsible-up 0.2s ease-in-out",
        blink: 'blink 1s step-end infinite',
        "reveal-up": "reveal-up 0.5s ease-out forwards",
        "reveal-down": "reveal-down 0.5s ease-out forwards",
        "reveal-left": "reveal-left 0.5s ease-out forwards",
        "reveal-right": "reveal-right 0.5s ease-out forwards",
        "reveal-fade": "reveal-fade 0.5s ease-out forwards"
      },
      typography: {
        DEFAULT: {
          css: {
            'code::before': {
              content: '""'
            },
            'code::after': {
              content: '""'
            }
          }
        }
      }
    },
  },
  plugins: [
    animate,
    typography,
  ],
} satisfies Config;

export default config;
