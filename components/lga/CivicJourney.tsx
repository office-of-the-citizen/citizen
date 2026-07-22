"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import type { PublicRecord } from "@/sdk/contracts";
import { Icon } from "@/presentation/icons/Icon";
import { Disclosure } from "@/components/ui/Disclosure";
import { cn } from "@/lib/cn";

/** Quiet civic-education accordion — projected copy, deliberately subtle. */
export function CivicJourney({ record }: { record: PublicRecord }) {
  const steps = record.civic_journey;
  const [openStep, setOpenStep] = useState<string | null>(null);
  if (!steps.length) return null;

  const title = record.vocabulary?.CIVIC_JOURNEY_TITLE ?? "";

  return (
    <section className="rounded-card bg-surface p-4 shadow-card" aria-label={title}>
      <h3 className="text-base font-bold text-ink">{title}</h3>
      <div className="mt-2 divide-y divide-line">
        {steps.map((step) => {
          const open = openStep === step.step_code;
          return (
            <div key={step.step_code}>
              <button
                type="button"
                onClick={() => setOpenStep(open ? null : step.step_code)}
                className="pressable-subtle flex min-h-tap w-full items-center justify-between gap-3 py-3 text-left"
                aria-expanded={open}
              >
                <span
                  className={cn(
                    "text-[14px] font-semibold transition-colors duration-quick ease-out",
                    open ? "text-ink" : "text-ink-soft",
                  )}
                >
                  {step.title}
                </span>
                <motion.span
                  animate={{ rotate: open ? 180 : 0 }}
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  className="shrink-0 text-ink-hint"
                >
                  <Icon name="chevron-down" size={16} />
                </motion.span>
              </button>
              <Disclosure open={open}>
                <p className="pb-3 text-[13px] leading-relaxed text-ink-soft">{step.body}</p>
                <p className="pb-3 text-[11px] font-medium text-ink-faint">
                  {step.source_reference}
                </p>
              </Disclosure>
            </div>
          );
        })}
      </div>
    </section>
  );
}
