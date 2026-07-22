"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import type { PublicRecord } from "@/sdk/contracts";
import { Icon } from "@/presentation/icons/Icon";
import { Disclosure } from "@/components/ui/Disclosure";
import { fadeRise } from "@/presentation/animations/motion";
import { formatNairaCompact, formatNairaShort } from "@/lib/format";

/**
 * Monthly Federal Allocation — FAAC transfers to this local government.
 *
 * Every figure arrives on the projection from admitted FAAC circulars;
 * the application authors no fiscal vocabulary. Maximum 12 recent months
 * are shown; older entries collapse into annual summaries. The caption
 * is educational, not dynamic — it explains what the federation account
 * is and how monthly transfers reach this tier.
 */
export function MonthlyAllocationCard({ record }: { record: PublicRecord }) {
  const faac = record.faac ?? null;
  const [showAll, setShowAll] = useState(false);

  if (!faac || !faac.months.length) return null;

  const title = faac.title ?? "Monthly Federal Allocation";
  const caption =
    faac.caption ??
    "Each month, the Federation Account transfers this local government's share of nationally collected revenue. These are the recorded transfers.";
  const visibleMonths = showAll ? faac.months : faac.months.slice(0, 6);
  const latest = faac.months[0];

  return (
    <motion.section
      variants={fadeRise}
      initial="hidden"
      animate="visible"
      className="rounded-card bg-surface p-4 shadow-card"
      aria-label={title}
    >
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-primary-soft text-primary">
          <Icon name="budget" size={18} />
        </span>
        <div className="min-w-0">
          <h3 className="text-base font-bold text-ink">{title}</h3>
          {latest ? (
            <p className="text-xs font-medium text-ink-faint">
              Latest: {latest.label}
            </p>
          ) : null}
        </div>
      </div>

      <p className="mt-3 text-[13px] leading-relaxed text-ink-soft">{caption}</p>

      {/* Latest figure headline */}
      {latest ? (
        <div className="mt-4 rounded-2xl bg-surface-sunken p-3.5">
          <p className="text-[11px] font-bold uppercase tracking-label text-ink-faint">
            {latest.label}
          </p>
          <p className="mt-1 text-[1.7rem] font-extrabold leading-none text-ink">
            {formatNairaCompact(latest.amount)}
          </p>
          {faac.authority ? (
            <p className="mt-1.5 text-[11px] text-ink-faint">{faac.authority}</p>
          ) : null}
        </div>
      ) : null}

      {/* Monthly list */}
      <div className="mt-3 divide-y divide-line">
        {visibleMonths.map((month) => (
          <div key={month.period} className="flex items-center justify-between py-2.5">
            <span className="text-[13px] font-medium text-ink-soft">{month.label}</span>
            <span className="text-[13px] font-bold text-ink">
              {formatNairaShort(month.amount)}
            </span>
          </div>
        ))}
      </div>

      {/* Show more / fewer */}
      {faac.months.length > 6 ? (
        <button
          type="button"
          onClick={() => setShowAll((v) => !v)}
          className="pressable-subtle mt-2 flex min-h-tap w-full items-center justify-center gap-1.5 rounded-chip py-2 text-[13px] font-semibold text-primary transition-colors duration-quick ease-out"
        >
          {showAll ? "Show fewer months" : `Show all ${faac.months.length} months`}
          <motion.span
            animate={{ rotate: showAll ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 420, damping: 34 }}
          >
            <Icon name="chevron-down" size={14} />
          </motion.span>
        </button>
      ) : null}

      {/* Older years collapsed */}
      {faac.years.length ? (
        <YearCollapse faac={faac} />
      ) : null}
    </motion.section>
  );
}

function YearCollapse({ faac }: { faac: NonNullable<PublicRecord["faac"]> }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-2 border-t border-line pt-2">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="pressable-subtle flex min-h-tap w-full items-center justify-between gap-3 py-2 text-left"
        aria-expanded={open}
      >
        <span className="text-[13px] font-semibold text-ink-soft">Earlier years</span>
        <motion.span
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ type: "spring", stiffness: 420, damping: 34 }}
          className="shrink-0 text-ink-hint"
        >
          <Icon name="chevron-right" size={14} />
        </motion.span>
      </button>
      <Disclosure open={open}>
        <div className="divide-y divide-line pb-2">
          {faac.years.map((year) => (
            <div key={year.year} className="flex items-center justify-between py-2.5">
              <span className="text-[13px] font-medium text-ink-soft">
                {year.year}
                <span className="ml-1.5 text-[11px] text-ink-faint">
                  ({year.months_count} months)
                </span>
              </span>
              <span className="text-[13px] font-bold text-ink">
                {formatNairaShort(year.total)}
              </span>
            </div>
          ))}
        </div>
      </Disclosure>
    </div>
  );
}
