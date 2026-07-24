"use client";

import { motion } from "framer-motion";

import type { OfficeTimelineEntry, OfficeTimelineCategory } from "@/presentation/offices/types";
import { Icon } from "@/presentation/icons/Icon";
import { fadeRise } from "@/presentation/animations/motion";
import { formatDateShort } from "@/lib/format";
import { cn } from "@/lib/cn";

const CATEGORY_LABELS: Record<OfficeTimelineCategory, string> = {
  INAUGURATION: "Inauguration",
  LEGISLATIVE: "Legislative",
  OVERSIGHT: "Oversight",
  COMMITTEE: "Committee",
  FOI: "FOI",
  BUDGET: "Budget",
  JUDICIAL: "Judicial",
  CONSTITUENCY: "Constituency",
  PUBLIC_STATEMENT: "Public Statement",
};

const COLOUR_CLASSES: Record<string, { bubble: string; text: string }> = {
  verified: { bubble: "bg-status-verified/10 text-status-verified", text: "text-status-verified" },
  reference: { bubble: "bg-reference/10 text-reference", text: "text-reference" },
  contested: { bubble: "bg-status-contested/10 text-status-contested", text: "text-status-contested" },
  pending: { bubble: "bg-status-pending/10 text-status-pending", text: "text-status-pending" },
  unknown: { bubble: "bg-surface-sunken text-ink-faint", text: "text-ink-faint" },
};

/**
 * Office timeline — office activity events (took office, bills, FOI, etc.).
 * Reuses the ActivityTimeline visual pattern for consistency.
 */
export function OfficeTimeline({
  entries,
  officeTitle,
}: {
  entries: OfficeTimelineEntry[];
  officeTitle: string;
}) {
  if (entries.length === 0) {
    return (
      <motion.section
        variants={fadeRise}
        initial="hidden"
        animate="visible"
        className="rounded-card bg-surface p-4 shadow-card"
        aria-label="Office Activity"
      >
        <h3 className="text-base font-bold text-ink">Office Activity</h3>
        <div className="mt-3 flex items-start gap-3.5">
          <div className="relative flex flex-col items-center">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-surface-sunken text-ink-faint">
              <Icon name="clock" size={22} />
            </div>
            <div className="mt-1 h-10 w-0.5 rounded bg-line" />
            <div className="mt-1 h-2.5 w-2.5 rounded-full bg-line" />
          </div>
          <div>
            <p className="text-sm font-bold text-ink">The record is quiet here</p>
            <p className="mt-0.5 text-[13px] leading-relaxed text-ink-soft">
              When constitutional events affect this office, they appear here — admitted, dated and sourced.
            </p>
          </div>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section
      variants={fadeRise}
      initial="hidden"
      animate="visible"
      className="rounded-card bg-surface p-4 shadow-card"
      aria-label="Office Activity"
    >
      <h3 className="text-base font-bold text-ink">Office Activity</h3>

      <ol className="mt-4">
        {entries.map((entry, i) => {
          const colours = COLOUR_CLASSES[entry.colourRole] ?? COLOUR_CLASSES.unknown;
          const date = formatDateShort(entry.occurredAt);
          const categoryLabel = CATEGORY_LABELS[entry.category] ?? entry.category;

          return (
            <li key={entry.code} className="flex gap-3.5">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                    colours.bubble,
                  )}
                >
                  <Icon name={entry.icon} size={18} />
                </div>
                {i < entries.length - 1 && (
                  <div className="my-1 w-0.5 flex-1 rounded bg-line" />
                )}
              </div>
              <div className="min-w-0 flex-1 pb-5">
                <p className={cn("text-[11px] font-bold uppercase tracking-wide", colours.text)}>
                  {categoryLabel}
                  {date && (
                    <span className="font-medium text-ink-faint">{`  ·  ${date}`}</span>
                  )}
                </p>
                <div className="mt-0.5 flex items-center justify-between gap-2">
                  <p className="truncate text-[15px] font-bold text-ink">{entry.title}</p>
                  <Icon name="chevron-right" size={15} className="shrink-0 text-ink-hint" />
                </div>
                {entry.summary && (
                  <p className="mt-0.5 truncate text-[13px] text-ink-soft">{entry.summary}</p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </motion.section>
  );
}
