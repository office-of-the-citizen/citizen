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
        "primary-faint": "rgb(var(--c-primary-faint) / <alpha-value>)",
        "accent-blue": "rgb(var(--c-accent-blue) / <alpha-value>)",
        "accent-blue-soft": "rgb(var(--c-accent-blue-soft) / <alpha-value>)",
        "accent-purple": "rgb(var(--c-accent-purple) / <alpha-value>)",
        "accent-purple-soft": "rgb(var(--c-accent-purple-soft) / <alpha-value>)",
        "accent-amber": "rgb(var(--c-accent-amber) / <alpha-value>)",
        "accent-amber-soft": "rgb(var(--c-accent-amber-soft) / <alpha-value>)",
        /* Constitutional status postures */
        "status-verified": "rgb(var(--c-status-verified) / <alpha-value>)",
        "status-verified-soft": "rgb(var(--c-status-verified-soft) / <alpha-value>)",
        "status-reference": "rgb(var(--c-status-reference) / <alpha-value>)",
        "status-reference-soft": "rgb(var(--c-status-reference-soft) / <alpha-value>)",
        "status-contested": "rgb(var(--c-status-contested) / <alpha-value>)",
        "status-contested-soft": "rgb(var(--c-status-contested-soft) / <alpha-value>)",
        "status-pending": "rgb(var(--c-status-pending) / <alpha-value>)",
        "status-pending-soft": "rgb(var(--c-status-pending-soft) / <alpha-value>)",
        "status-unknown": "rgb(var(--c-status-unknown) / <alpha-value>)",
        "status-unknown-soft": "rgb(var(--c-status-unknown-soft) / <alpha-value>)",
        "status-historical": "rgb(var(--c-status-historical) / <alpha-value>)",
        "status-historical-soft": "rgb(var(--c-status-historical-soft) / <alpha-value>)",
        ink: "rgb(var(--c-ink) / <alpha-value>)",
        "ink-soft": "rgb(var(--c-ink-soft) / <alpha-value>)",
        "ink-faint": "rgb(var(--c-ink-faint) / <alpha-value>)",
        "ink-hint": "rgb(var(--c-ink-hint) / <alpha-value>)",
        surface: "rgb(var(--c-surface) / <alpha-value>)",
        "surface-sunken": "rgb(var(--c-surface-sunken) / <alpha-value>)",
        "surface-overlay": "rgb(var(--c-surface-overlay) / <alpha-value>)",
        line: "rgb(var(--c-line) / <alpha-value>)",
        "line-strong": "rgb(var(--c-line-strong) / <alpha-value>)",
        "frame-night": "rgb(var(--c-frame-night) / <alpha-value>)",
        "frame-body": "rgb(var(--c-frame-body) / <alpha-value>)",
        focus: "rgb(var(--c-focus) / <alpha-value>)",
        unknown: "rgb(var(--c-unknown) / <alpha-value>)",
      },
      borderRadius: {
        card: "var(--r-card)",
        chip: "var(--r-chip)",
        sheet: "var(--r-sheet)",
        field: "var(--r-field)",
      },
      boxShadow: {
        card: "var(--shadow-card)",
        raised: "var(--shadow-raised)",
        nav: "var(--shadow-nav)",
        seal: "var(--shadow-seal)",
        device: "var(--shadow-device)",
      },
      fontFamily: {
        sans: "var(--font-sans)",
      },
      letterSpacing: {
        display: "var(--tracking-display)",
        label: "var(--tracking-label)",
      },
      transitionTimingFunction: {
        out: "var(--ease-out)",
        "in-out": "var(--ease-in-out)",
        drawer: "var(--ease-drawer)",
      },
      transitionDuration: {
        press: "var(--duration-press)",
        quick: "var(--duration-quick)",
        drawer: "var(--duration-drawer)",
      },
      spacing: {
        /* Shell-aware safe areas: device insets on hardware, shell insets
         * inside the desktop device frame. */
        "safe-b": "max(env(safe-area-inset-bottom), var(--shell-bottom-inset))",
        "safe-t": "max(env(safe-area-inset-top), var(--shell-top-inset))",
        tap: "var(--tap-target)",
      },
      minHeight: {
        tap: "var(--tap-target)",
      },
      minWidth: {
        tap: "var(--tap-target)",
      },
    },
  },
  plugins: [],
};

export default config;
