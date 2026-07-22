/**
 * Motion vocabulary — every animation the application uses, in one place.
 * Screens compose these variants; they never define their own timings.
 *
 * The vocabulary follows one law: motion is a conversation, not a script.
 * Springs are critically damped by default (no overshoot); bounce is
 * reserved for gestures that carried momentum. Framer Motion respects
 * prefers-reduced-motion via MotionConfig reducedMotion="user".
 */
import type { Transition, Variants } from "framer-motion";

/* ── Springs ─────────────────────────────────────────────────────────── */

/** Default UI spring — critically damped, settles ~0.4s. */
export const springGentle: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 30,
};

/** Larger focus movements (map zoom, sheet slides). */
export const springFocus: Transition = {
  type: "spring",
  stiffness: 180,
  damping: 26,
};

/** Snappy press/reveal responses — fast settle, no overshoot. */
export const springSnappy: Transition = {
  type: "spring",
  stiffness: 420,
  damping: 34,
};

/** Momentum spring — slight bounce; ONLY after a gesture with velocity. */
export const springMomentum: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 22,
};

/* ── Entrances ───────────────────────────────────────────────────────── */

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

/** Cards materialise — never from nothing (scale 0.96, not 0). */
export const cardIn: Variants = {
  hidden: { opacity: 0, y: 10, scale: 0.98 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: 0.04 * i, ...springGentle },
  }),
};

export const sheetUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: springGentle },
};

/* ── Disclosure drawers ──────────────────────────────────────────────── */

/** Height drawer used by every progressive-disclosure surface. */
export const drawerReveal: Variants = {
  hidden: { height: 0, opacity: 0 },
  visible: {
    height: "auto",
    opacity: 1,
    transition: {
      height: { type: "spring", stiffness: 320, damping: 34 },
      opacity: { duration: 0.18, delay: 0.06 },
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: {
      height: { type: "spring", stiffness: 420, damping: 40 },
      opacity: { duration: 0.12 },
    },
  },
};

/** The seal stamp — a single earned flourish at the end of the ritual. */
export const sealStamp: Variants = {
  hidden: { opacity: 0, scale: 1.35, rotate: -8 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 380, damping: 20 },
  },
};
