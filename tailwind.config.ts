import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Couleurs pilotées par variables CSS (thème clair / sombre, voir globals.css)
        night: {
          DEFAULT: "rgb(var(--c-night) / <alpha-value>)",
          soft: "rgb(var(--c-night-soft) / <alpha-value>)",
          card: "rgb(var(--c-night-card) / <alpha-value>)",
        },
        bone: {
          DEFAULT: "rgb(var(--c-bone) / <alpha-value>)",
          muted: "rgb(var(--c-bone-muted) / <alpha-value>)",
          faint: "rgb(var(--c-bone-faint) / <alpha-value>)",
        },
        line: "rgb(var(--c-bone) / 0.09)",
        gold: {
          light: "rgb(var(--c-gold-light) / <alpha-value>)",
          DEFAULT: "rgb(var(--c-gold) / <alpha-value>)",
          dark: "rgb(var(--c-gold-dark) / <alpha-value>)",
        },
        // Voiles « blancs » : clairs sur fond sombre, foncés sur fond clair
        white: "rgb(var(--c-overlay) / <alpha-value>)",
        // Texte posé sur les aplats dorés, identique dans les deux thèmes
        ink: "#0A0908",
        ember: "#E07A3F",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 1.2s ease-out forwards",
        marquee: "marquee 40s linear infinite",
        aurora: "aurora 18s ease-in-out infinite alternate",
        shimmer: "shimmer 3s linear infinite",
        float: "float 6s ease-in-out infinite",
        pop: "pop 0.45s cubic-bezier(0.34,1.56,0.64,1) forwards",
        "rise-in": "riseIn 0.4s cubic-bezier(0.22,1,0.36,1) both",
        heartbeat: "heartbeat 1s ease-in-out infinite",
        tip: "tip 2s ease-in-out infinite",
      },
      keyframes: {
        pop: {
          "0%": { transform: "scale(0.94)" },
          "60%": { transform: "scale(1.06)" },
          "100%": { transform: "scale(1.02)" },
        },
        riseIn: {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        heartbeat: {
          "0%, 100%": { transform: "scale(1)" },
          "15%": { transform: "scale(1.25)" },
          "30%": { transform: "scale(1)" },
          "45%": { transform: "scale(1.15)" },
        },
        tip: {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.5)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        aurora: {
          "0%": { transform: "translate(0,0) scale(1)" },
          "50%": { transform: "translate(6%,-4%) scale(1.15)" },
          "100%": { transform: "translate(-4%,5%) scale(0.95)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
