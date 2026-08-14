import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#EBEEF3",
        paper2: "#E2E6EE",
        panel: "#FFFFFF",
        ink: "#1C2541",
        inkSoft: "#5B6B8C",
        inkFaint: "#8A97B3",
        accent: "#C1440E",
        accentSoft: "#E9DCD4",
        accent2: "#2F6F5E",
        accent2Soft: "#DCE7E3",
        grid: "#D6DBE5",
        tape: "#1C2541",
        tapeText: "#F3C98B",
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
