"use client";

/**
 * SealHold — the verification ritual.
 *
 * One deliberate, tactile interaction: press and hold the constitutional
 * seal. A ring fills while you hold — slow, because breaking a seal should
 * feel intentional — and when it completes the seal stamps and the record
 * opens. Releasing early snaps back instantly (slow to decide, fast to
 * respond).
 *
 * Accessibility: the same element is a normal button — Enter/Space or a
 * simple tap performs the action without the hold. The hold is the delight,
 * never the toll.
 */
import { useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { Icon } from "@/presentation/icons/Icon";
import { useLongPress } from "@/lib/use-long-press";
import { sealStamp } from "@/presentation/animations/motion";
import { cn } from "@/lib/cn";

const RING_R = 24;
const RING_C = 2 * Math.PI * RING_R;

export function SealHold({
  label,
  sublabel,
  onUnseal,
  className,
}: {
  label: string;
  sublabel?: string;
  onUnseal: () => void;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const unsealing = useRef(false);

  const fire = () => {
    if (unsealing.current) return;
    unsealing.current = true;
    // Let the stamp land before leaving — the flourish is the confirmation.
    window.setTimeout(onUnseal, reduceMotion ? 0 : 420);
  };

  const { progress, holding, consumeCompletion, handlers } = useLongPress({
    durationMs: 1600,
    onComplete: fire,
  });

  const complete = unsealing.current;

  return (
    <button
      type="button"
      {...handlers}
      onClick={() => {
        // A completed hold ends in a click — don't fire twice.
        if (!consumeCompletion()) fire();
      }}
      className={cn(
        "group flex min-h-tap w-full items-center gap-3.5 rounded-2xl bg-primary-soft/60 px-3.5 py-3 text-left transition-colors duration-quick ease-out hover:bg-primary-soft",
        className,
      )}
      aria-label={`${label}. Press and hold, or activate, to open.`}
    >
      <span className="relative flex h-14 w-14 shrink-0 items-center justify-center">
        {/* The seal face */}
        <motion.span
          animate={{ scale: holding && !reduceMotion ? 0.92 : 1 }}
          transition={{ type: "spring", stiffness: 420, damping: 34 }}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white shadow-seal"
        >
          <AnimatePresence mode="wait" initial={false}>
            {complete ? (
              <motion.span
                key="stamped"
                variants={sealStamp}
                initial="hidden"
                animate="visible"
                className="flex"
              >
                <Icon name="seal-check" size={22} strokeWidth={2.2} />
              </motion.span>
            ) : (
              <motion.span key="sealed" exit={{ opacity: 0 }} className="flex">
                <Icon name="shield" size={20} strokeWidth={2.2} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.span>

        {/* Progress ring — driven per-frame by the hold itself */}
        <svg
          viewBox="0 0 56 56"
          className="absolute inset-0 h-full w-full -rotate-90"
          aria-hidden="true"
        >
          <circle
            cx="28"
            cy="28"
            r={RING_R}
            fill="none"
            strokeWidth="2.5"
            className="stroke-primary/15"
          />
          <circle
            cx="28"
            cy="28"
            r={RING_R}
            fill="none"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="stroke-primary"
            strokeDasharray={RING_C}
            strokeDashoffset={RING_C * (1 - (complete ? 1 : progress))}
          />
        </svg>
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-[14px] font-bold text-primary-deep">{label}</span>
        {sublabel ? (
          <span className="mt-0.5 block text-[12px] leading-snug text-ink-soft">
            {holding ? "Keep holding…" : sublabel}
          </span>
        ) : null}
      </span>
      <Icon
        name="arrow-up-right"
        size={17}
        className="shrink-0 text-primary/70 transition-transform duration-quick ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </button>
  );
}
