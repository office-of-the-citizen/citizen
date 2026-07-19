"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import type { PublicRecord } from "@/sdk/contracts";
import { Icon } from "@/presentation/icons/Icon";
import { cn } from "@/lib/cn";

/** Quiet civic-education accordion — projected copy, deliberately subtle. */
export function CivicJourney({ record }: { record: PublicRecord }) {
  const steps = record.civic_journey;
  const [openStep, setOpenStep] = useState<string | null>(null);
  if (!steps.length) return null;

  return (
    <section className="rounded-card bg-surface p-4 shadow-card" aria-label="Understanding your Local Government">
      <h3 className="text-base font-bold text-ink">Understanding your Local Government</h3>
      <div className="mt-2 divide-y divide-line">
        {steps.map((step) => {
          const open = openStep === step.step_code;
          return (
            <div key={step.step_code}>
              <button
                type="button"
                onClick={() => setOpenStep(open ? null : step.step_code)}
                className="flex w-full items-center justify-between gap-3 py-3 text-left"
                aria-expanded={open}
              >
                <span className="text-[14px] font-semibold text-ink-soft">{step.title}</span>
                <Icon
                  name="chevron-down"
                  size={16}
                  className={cn("shrink-0 text-ink-faint transition-transform", open && "rotate-180")}
                />
              </button>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-3 text-[13px] leading-relaxed text-ink-soft">{step.body}</p>
                    <p className="pb-3 text-[11px] font-medium text-ink-faint">{step.source_reference}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
