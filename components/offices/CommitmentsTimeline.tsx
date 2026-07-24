"use client";

import { motion } from "framer-motion";

import type { OfficeCommitment, CommitmentStatus } from "@/presentation/offices/types";
import { Icon } from "@/presentation/icons/Icon";
import { formatDateShort } from "@/lib/format";
import { cn } from "@/lib/cn";

const STATUS_META: Record<CommitmentStatus, { label: string; colour: string; icon: string }> = {
  fulfilled: { label: "Fulfilled", colour: "text-status-verified", icon: "check" },
  ongoing: { label: "Ongoing", colour: "text-status-pending", icon: "clock" },
  broken: { label: "Broken", colour: "text-status-contested", icon: "close" },
  disputed: { label: "Disputed", colour: "text-status-contested", icon: "alert-triangle" },
  unverified: { label: "Unverified", colour: "text-ink-faint", icon: "question" },
};

/**
 * Commitments timeline — public promises with status (fulfilled/ongoing/broken).
 * Mirrors the ActivityTimeline pattern but for campaign pledges and public commitments.
 */
export function CommitmentsTimeline({
  commitments,
}: {
  commitments: OfficeCommitment[];
}) {
  if (commitments.length === 0) {
    return (
      <motion.section
        layout
        className="rounded-card bg-surface p-4 shadow-card"
        aria-label="Public Commitments"
      >
        <h2 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-label text-ink-soft">
          <Icon name="promise" size={16} className="text-ink-hint" />
          Public Commitments
        </h2>
        <div className="flex items-start gap-3.5">
          <div className="relative flex flex-col items-center">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-surface-sunken text-ink-faint">
              <Icon name="promise" size={22} />
            </div>
          </div>
          <div>
            <p className="text-sm font-bold text-ink">No commitments tracked yet</p>
            <p className="mt-0.5 text-[13px] leading-relaxed text-ink-soft">
              When public promises are admitted into the record with evidence, they will appear here — dated, categorised, and verifiable.
            </p>
          </div>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section
      layout
      className="rounded-card bg-surface p-4 shadow-card"
      aria-label="Public Commitments"
    >
      <h2 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-label text-ink-soft">
        <Icon name="promise" size={16} className="text-ink-hint" />
        Public Commitments
      </h2>

      <ol className="space-y-0">
        {commitments.map((c, i) => {
          const meta = STATUS_META[c.status];
          const date = formatDateShort(c.dateMade);

          return (
            <li key={i} className="flex gap-3.5">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                    c.status === "fulfilled" && "bg-status-verified/10 text-status-verified",
                    c.status === "ongoing" && "bg-status-pending/10 text-status-pending",
                    c.status === "broken" && "bg-status-contested/10 text-status-contested",
                    c.status === "disputed" && "bg-status-contested/10 text-status-contested",
                    c.status === "unverified" && "bg-surface-sunken text-ink-faint",
                  )}
                >
                  <Icon name={meta.icon as any} size={18} />
                </div>
                {i < commitments.length - 1 && (
                  <div className="my-1 w-0.5 flex-1 rounded bg-line" />
                )}
              </div>
              <div className="min-w-0 flex-1 pb-5">
                <p className={cn("text-[11px] font-bold uppercase tracking-wide", meta.colour)}>
                  {meta.label}
                  {date && (
                    <span className="font-medium text-ink-faint">{`  ·  ${date}`}</span>
                  )}
                </p>
                <p className="mt-0.5 text-[15px] font-bold text-ink">{c.promise}</p>
                {c.evidenceSummary && (
                  <p className="mt-0.5 text-[13px] leading-relaxed text-ink-soft">
                    {c.evidenceSummary}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </motion.section>
  );
}
