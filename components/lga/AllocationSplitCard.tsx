"use client";

import { motion } from "framer-motion";

import { Icon } from "@/presentation/icons/Icon";
import { fadeRise } from "@/presentation/animations/motion";

/**
 * Allocation Split — civic education, not projected truth.
 *
 * Explains the constitutional formula that divides federally collected
 * revenue among the three tiers of government, nationwide. Static by
 * design: the figures are the standing legal formula, not a fact about
 * this local government, so they never come from the SDK or a projection.
 * BudgetCard, beside it, carries this local government's own appropriated
 * budget — the two are deliberately kept separate.
 */
interface AllocationTier {
  label: string;
  share: number;
  description: string;
  colour: string;
  dot: string;
}

const TIERS: AllocationTier[] = [
  {
    label: "Federal Government",
    share: 52.68,
    description:
      "Supports nationwide responsibilities — defence, foreign affairs, national infrastructure and federal institutions.",
    colour: "bg-primary",
    dot: "bg-primary",
  },
  {
    label: "State Government",
    share: 26.72,
    description:
      "Distributed among Nigeria's 36 states. Each state applies its share to state-level services and priorities.",
    colour: "bg-accent-blue",
    dot: "bg-accent-blue",
  },
  {
    label: "Local Government",
    share: 20.6,
    description:
      "Shared among all 774 local governments. Since July 2024, each council receives its portion directly from the Federation Account — the tier closest to daily life, including this one.",
    colour: "bg-accent-amber",
    dot: "bg-accent-amber",
  },
];

export function AllocationSplitCard() {
  return (
    <motion.section
      variants={fadeRise}
      initial="hidden"
      animate="visible"
      className="rounded-card bg-surface p-4 shadow-card"
      aria-label="How public funding is shared"
    >
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-primary-soft text-primary">
          <Icon name="budget" size={18} />
        </span>
        <div className="min-w-0">
          <h3 className="text-base font-bold text-ink">How public funding is shared</h3>
          <p className="text-xs font-medium text-ink-faint">The constitutional split, before it reaches any tier</p>
        </div>
      </div>

      <p className="mt-3 text-[13px] leading-relaxed text-ink-soft">
        Every naira collected across the country — from oil, company tax, customs and other
        sources — enters one shared account called the Federation Account. Before any government
        spends, the Constitution requires that this account be divided among three tiers: federal,
        state, and local government. The percentages below are the standing national formula — they
        explain how funding is shared across the country, not this local government&rsquo;s own
        budget.
      </p>

      <div className="mt-4 flex h-2.5 w-full overflow-hidden rounded-chip bg-surface-sunken">
        {TIERS.map((tier) => (
          <div key={tier.label} className={tier.colour} style={{ width: `${tier.share}%` }} />
        ))}
      </div>

      <div className="mt-3 space-y-3">
        {TIERS.map((tier) => (
          <div key={tier.label} className="flex items-start gap-2.5">
            <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${tier.dot}`} />
            <div className="min-w-0">
              <p className="text-sm font-bold text-ink">
                {tier.share.toFixed(2)}% <span className="font-medium text-ink-soft">— {tier.label}</span>
              </p>
              <p className="text-[12px] leading-relaxed text-ink-faint">{tier.description}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-3.5 text-[11px] leading-relaxed text-ink-faint">
        This formula was set in 1992 by the Revenue Mobilisation Allocation and Fiscal Commission
        (RMAFC) and remains the basis for monthly sharing. RMAFC has initiated the first
        comprehensive review in over thirty years, which may change these percentages. Following
        the Supreme Court&rsquo;s July 2024 ruling, local governments now receive their share
        directly from the Federation Account rather than through state joint accounts.
      </p>
    </motion.section>
  );
}
