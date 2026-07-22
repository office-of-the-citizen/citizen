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
    description: "Retained for national responsibilities — defence, foreign affairs, and federal infrastructure.",
    colour: "bg-primary",
    dot: "bg-primary",
  },
  {
    label: "State Government",
    share: 26.72,
    description: "Shared among Nigeria's 36 states, then divided further inside each state for its own priorities.",
    colour: "bg-accent-blue",
    dot: "bg-accent-blue",
  },
  {
    label: "Local Government",
    share: 20.6,
    description: "Shared among all 774 local governments — the tier of government closest to daily life, including this one.",
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
        Every naira the federation collects — oil revenue, company tax, customs duties — is paid
        into one federation account and divided constitutionally among three tiers of government
        before any tier spends it. This is that national split. It explains how funding generally
        flows, not this local government&rsquo;s own budget.
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
        This is the general constitutional revenue-sharing formula fixed in 1992 by the Revenue
        Mobilisation, Allocation and Fiscal Commission, and it is currently under review. It
        explains the system nationwide — not a figure verified for this local government
        specifically.
      </p>
    </motion.section>
  );
}
