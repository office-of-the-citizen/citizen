"use client";

import { motion } from "framer-motion";

import type { RightToKnowItem } from "@/presentation/offices/types";
import { Icon } from "@/presentation/icons/Icon";

/**
 * Right to Know card — "Unavailable" card with reason + FOI link.
 * Uses EmptyState pattern for governed-absence copy.
 */
export function RightToKnowCard({
  items,
  officeInstitution,
}: {
  items: RightToKnowItem[];
  officeInstitution: string;
}) {
  if (items.length === 0) return null;

  return (
    <motion.section
      layout
      className="rounded-card bg-surface p-4 shadow-card"
      aria-label="Right to Know"
    >
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-status-contested/10 text-status-contested">
          <Icon name="mail" size={18} />
        </span>
        <h2 className="text-base font-bold text-ink">Right to Know</h2>
      </div>

      <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">
        The following information is not currently available in the public record. You have the right to request it.
      </p>

      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div key={item.metricKey} className="rounded-2xl bg-surface-sunken p-3.5">
            <p className="text-[14px] font-bold text-ink">{item.title}</p>
            <p className="mt-1 text-[12px] leading-relaxed text-ink-soft">{item.reason}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-2xl border border-line p-3.5">
        <p className="text-[12px] leading-relaxed text-ink-soft">
          Under the <span className="font-semibold text-ink">Freedom of Information Act 2011</span>, you have the right to request information from {officeInstitution}. The FOI Act empowers every citizen to access public records and information.
        </p>
        <a
          href="https://foi.gov.ng"
          target="_blank"
          rel="noopener noreferrer"
          className="pressable-subtle mt-2 inline-flex items-center gap-1.5 text-[12px] font-bold text-primary"
        >
          <Icon name="arrow-up-right" size={12} />
          Learn about your FOI rights
        </a>
      </div>
    </motion.section>
  );
}
