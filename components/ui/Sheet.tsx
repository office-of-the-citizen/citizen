"use client";

/**
 * Sheet — the application's single bottom-sheet surface.
 *
 * A translucent scrim dims the page; the sheet slides up from the bottom
 * edge and can be dismissed three ways: tapping the scrim, pressing Escape,
 * or dragging it down. The drag is 1:1 with the finger, rubber-bands past
 * the top, and commits on release velocity — not just position — so a flick
 * always feels heard. Enter and exit share the same path (spatial
 * consistency: what slides up leaves downward).
 */
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/cn";

export function Sheet({
  open,
  onClose,
  label,
  children,
  className,
}: {
  open: boolean;
  onClose: () => void;
  /** Accessible name for the dialog. */
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  // Portal into the device screen so the sheet stays INSIDE the phone on
  // desktop (the screen's transform makes it the fixed-position root).
  const [host, setHost] = useState<Element | null>(null);
  useEffect(() => {
    setHost(document.querySelector(".device-screen") ?? document.body);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!host) return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[70] flex items-end justify-center">
          {/* Scrim — dim to focus; tap anywhere outside to leave */}
          <motion.button
            type="button"
            aria-label="Close"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-surface-overlay/45"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={label}
            initial={reduceMotion ? { opacity: 0 } : { y: "100%" }}
            animate={reduceMotion ? { opacity: 1 } : { y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { y: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            drag={reduceMotion ? false : "y"}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0.04, bottom: 0.6 }}
            onDragEnd={(_, info) => {
              // Commit on where the gesture is GOING, not only where it is.
              if (info.velocity.y > 500 || info.offset.y > 140) onClose();
            }}
            className={cn(
              "relative w-full max-w-md rounded-t-sheet bg-surface pb-safe-b shadow-raised",
              className,
            )}
          >
            {/* Grab handle — signals the sheet is a physical, draggable object */}
            <div className="flex justify-center pb-1 pt-2.5" aria-hidden="true">
              <div className="h-1 w-10 rounded-full bg-line-strong" />
            </div>
            {children}
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>,
    host,
  );
}
