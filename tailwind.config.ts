import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        gold: {
          light: "#F5E6B3",
          DEFAULT: "#C9A84C",
          dark: "#8B6914",
        },
        cream: {
          DEFAULT: "#FDF9F3",
          warm: "#F7F0E6",
          card: "#FFFFFF",
          border: "#EAE3D8",
        },
        ink: {
          DEFAULT: "#1C1A17",
          muted: "#786E60",
          faint: "#B5AC9F",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-lato)", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 1.2s ease-out forwards",
        "slide-up": "slideUp 1s ease-out forwards",
        "pulse-glow": "pulseGlow 2.5s ease-in-out infinite",
        "scroll-hint": "scrollHint 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(201, 168, 76, 0)" },
          "50%": { boxShadow: "0 0 24px 6px rgba(201, 168, 76, 0.2)" },
        },
        scrollHint: {
          "0%, 100%": { transform: "translateY(0)", opacity: "0.4" },
          "50%": { transform: "translateY(8px)", opacity: "0.9" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
