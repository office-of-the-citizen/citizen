"use client";

/**
 * Disclosure — the application's single expand/collapse drawer.
 *
 * Spring-driven height so opening feels like sliding a drawer, not playing
 * a video. Interruptible: re-tapping mid-motion retargets smoothly.
 */
import { AnimatePresence, motion } from "framer-motion";

import { drawerReveal } from "@/presentation/animations/motion";

export function Disclosure({
  open,
  children,
  className,
  onOpenComplete,
}: {
  open: boolean;
  children: React.ReactNode;
  className?: string;
  /** Fires once the drawer's height spring settles open — not on close. */
  onOpenComplete?: () => void;
}) {
  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          variants={drawerReveal}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="overflow-hidden"
          onAnimationComplete={(definition) => {
            if (definition === "visible") onOpenComplete?.();
          }}
        >
          <div className={className}>{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
