/**
 * Motion vocabulary — every animation the application uses, in one place.
 * Screens compose these variants; they never define their own timings.
 * Framer Motion respects prefers-reduced-motion via the global CSS guard.
 */
import type { Transition, Variants } from "framer-motion";

export const springGentle: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 30,
};

export const springFocus: Transition = {
  type: "spring",
  stiffness: 180,
  damping: 26,
};

export const fadeRise: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.05 * i, ...springGentle },
  }),
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.35 } },
};

export const sheetUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: springGentle },
};
