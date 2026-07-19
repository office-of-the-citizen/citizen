"use client";

import { motion } from "framer-motion";

import type { PublicRecord } from "@/sdk/contracts";
import { placeholderCopy } from "@/presentation/placeholders/registry";
import { Icon } from "@/presentation/icons/Icon";
import { fadeRise } from "@/presentation/animations/motion";
import { formatNairaCompact, formatNairaShort } from "@/lib/format";

const COMPONENT_COLOURS = ["bg-primary", "bg-accent-blue", "bg-ink-faint", "bg-accent-amber"];
const DOT_COLOURS = ["bg-primary", "bg-accent-blue", "bg-ink-faint", "bg-accent-amber"];

/**
 * Budget card — “Latest Approved/Known Budget”, projected fiscal truth only.
 * The recency label derives strictly from the projected posture (IR-C2); when
 * no budget has been admitted the card renders the governed placeholder,
 * never an invented figure (IR-C3).
 */
export function BudgetCard({ record }: { record: PublicRecord }) {
  const budget = record.budget ?? null;
  const hasBudget = Boolean(budget && budget.posture !== "MISSING" && budget.total !== null);
  const missing = placeholderCopy("MISSING_BUDGET");

  const title = !budget || budget.posture === "MISSING"
    ? "Budget"
    : budget.posture === "APPROVED_LATEST"
      ? "Latest Approved Budget"
      : "Latest Known Budget";

  return (
    <motion.section
      variants={fadeRise}
      initial="hidden"
      animate="visible"
      className="rounded-card bg-surface p-4 shadow-card"
      aria-label={title}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-ink">{title}</h3>
        {hasBudget ? (
          <span className="flex items-center gap-0.5 text-sm font-semibold text-primary">
            View details
            <Icon name="chevron-right" size={15} />
          </span>
        ) : null}
      </div>

      {hasBudget && budget ? (
        <>
          {budget.fiscal_year ? (
            <p className="mt-0.5 text-xs font-medium text-ink-faint">
              Fiscal Year {budget.fiscal_year}
            </p>
          ) : null}
          <p className="mt-2 text-[2.1rem] font-extrabold leading-none text-ink">
            {formatNairaCompact(budget.total as number)}
          </p>
          <p className="mt-1.5 text-sm text-ink-soft">
            Total {budget.posture === "APPROVED_LATEST" ? "Approved" : "Known"} Budget
          </p>

          {budget.components.length ? (
            <>
              <div className="mt-4 flex h-2.5 w-full overflow-hidden rounded-chip bg-surface-sunken">
                {budget.components.map((c, i) => (
                  <div
                    key={c.component_code}
                    className={COMPONENT_COLOURS[i % COMPONENT_COLOURS.length]}
                    style={{ width: `${Math.max(2, (c.amount / (budget.total as number)) * 100)}%` }}
                  />
                ))}
              </div>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                {budget.components.map((c, i) => (
                  <div key={c.component_code} className="min-w-[30%]">
                    <p className="flex items-center gap-1.5 text-xs text-ink-soft">
                      <span
                        className={`h-2 w-2 rounded-full ${DOT_COLOURS[i % DOT_COLOURS.length]}`}
                      />
                      {Math.round((c.amount / (budget.total as number)) * 100)}% {c.label}
                    </p>
                    <p className="mt-0.5 pl-3.5 text-base font-extrabold text-ink">
                      {formatNairaShort(c.amount)}
                    </p>
                  </div>
                ))}
              </div>
            </>
          ) : null}
        </>
      ) : (
        <div className="mt-3 flex items-start gap-3.5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary-soft text-primary">
            <Icon name="budget" size={22} />
          </div>
          <div>
            <p className="text-sm font-bold text-ink">{missing.title}</p>
            <p className="mt-0.5 text-[13px] leading-relaxed text-ink-soft">{missing.body}</p>
            <div className="mt-3 flex h-2.5 w-full gap-0.5 overflow-hidden rounded-chip">
              <div className="w-[55%] bg-surface-sunken" />
              <div className="w-[30%] bg-surface-sunken" />
              <div className="w-[15%] bg-surface-sunken" />
            </div>
          </div>
        </div>
      )}
    </motion.section>
  );
}
