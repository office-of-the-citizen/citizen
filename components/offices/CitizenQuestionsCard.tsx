"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import type { CitizenQuestionsData } from "@/presentation/offices/types";
import { Icon } from "@/presentation/icons/Icon";

/**
 * Citizen questions card — mirrors ParticipateCard pattern.
 * Shows question counts and a link to submit questions about the office.
 */
export function CitizenQuestionsCard({
  data,
  officeSlug,
}: {
  data: CitizenQuestionsData;
  officeSlug: string;
}) {
  return (
    <motion.section
      layout
      className="rounded-card bg-surface p-4 shadow-card"
      aria-label="Citizen Questions"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary-soft text-primary">
          <Icon name="question" size={20} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[14px] font-bold text-ink">
            Ask questions about this office
          </p>
          <p className="mt-0.5 text-[12px] leading-relaxed text-ink-soft">
            Request information, submit contributions, or challenge a record.
          </p>
        </div>
        <Icon name="chevron-right" size={16} className="shrink-0 text-ink-faint" />
      </div>

      {/* Question stats */}
      <div className="mt-4 flex divide-x divide-line border-t border-line pt-3">
        <StatCell label="Total" value={data.total} />
        <StatCell label="Answered" value={data.answered} tone="verified" />
        <StatCell label="Pending" value={data.pending} tone="pending" />
      </div>

      {/* Link to participate */}
      <Link
        href={`/participate?subject=${encodeURIComponent(officeSlug)}`}
        className="pressable-subtle mt-3 flex items-center justify-center gap-2 rounded-2xl bg-primary-soft px-4 py-2.5 text-sm font-bold text-primary transition-colors duration-quick ease-out hover:bg-primary/10"
      >
        <Icon name="hand-raise" size={16} />
        Submit a question
      </Link>
    </motion.section>
  );
}

function StatCell({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone?: "verified" | "pending";
}) {
  const valueClass =
    tone === "verified"
      ? "text-status-verified"
      : tone === "pending"
        ? "text-status-pending"
        : "text-ink";

  return (
    <div className="flex flex-1 flex-col items-center px-3 first:pl-0 last:pr-0">
      <p className="text-[11px] font-medium text-ink-faint">{label}</p>
      <p className={`mt-0.5 text-lg font-bold tabular-nums ${valueClass}`}>{value}</p>
    </div>
  );
}
