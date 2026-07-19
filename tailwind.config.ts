import type { Config } from "tailwindcss";

/**
 * Semantic colour names resolve to CSS custom properties declared in
 * presentation/tokens/theme.css. Components never reference raw hex —
 * retheming the application means editing the token sheet only.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./presentation/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--c-primary) / <alpha-value>)",
        "primary-deep": "rgb(var(--c-primary-deep) / <alpha-value>)",
        "primary-soft": "rgb(var(--c-primary-soft) / <alpha-value>)",
        "accent-blue": "rgb(var(--c-accent-blue) / <alpha-value>)",
        "accent-blue-soft": "rgb(var(--c-accent-blue-soft) / <alpha-value>)",
        "accent-purple": "rgb(var(--c-accent-purple) / <alpha-value>)",
        "accent-purple-soft": "rgb(var(--c-accent-purple-soft) / <alpha-value>)",
        "accent-amber": "rgb(var(--c-accent-amber) / <alpha-value>)",
        "accent-amber-soft": "rgb(var(--c-accent-amber-soft) / <alpha-value>)",
        ink: "rgb(var(--c-ink) / <alpha-value>)",
        "ink-soft": "rgb(var(--c-ink-soft) / <alpha-value>)",
        "ink-faint": "rgb(var(--c-ink-faint) / <alpha-value>)",
        surface: "rgb(var(--c-surface) / <alpha-value>)",
        "surface-sunken": "rgb(var(--c-surface-sunken) / <alpha-value>)",
        line: "rgb(var(--c-line) / <alpha-value>)",
        unknown: "rgb(var(--c-unknown) / <alpha-value>)",
      },
      borderRadius: {
        card: "var(--r-card)",
        chip: "var(--r-chip)",
      },
      boxShadow: {
        card: "var(--shadow-card)",
        nav: "var(--shadow-nav)",
      },
      fontFamily: {
        sans: "var(--font-sans)",
      },
      spacing: {
        "safe-b": "env(safe-area-inset-bottom)",
        "safe-t": "env(safe-area-inset-top)",
      },
    },
  },
  plugins: [],
};

export default config;
