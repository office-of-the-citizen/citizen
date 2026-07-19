"use client";

import { MotionConfig } from "framer-motion";

/**
 * Framer Motion animates inline styles from JavaScript, so the CSS
 * prefers-reduced-motion guard in globals.css cannot reach it. MotionConfig
 * reducedMotion="user" makes every motion component honour the user's
 * preference natively: transforms are skipped and opacity resolves to its
 * final value instead of freezing mid-entrance.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
