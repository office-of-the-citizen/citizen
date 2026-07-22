"use client";

import { motion } from "framer-motion";

import type { ActivityEntry, PublicRecord } from "@/sdk/contracts";
import { osIcon, osRole } from "@/presentation/os-visuals";
import { Icon } from "@/presentation/icons/Icon";
import { fadeRise } from "@/presentation/animations/motion";
import { formatDateShort } from "@/lib/format";

/**
 * Latest Updates — the constitutional activity stream. Every row is a
 * projected truth event; titles, categories, presentation and empty-state
 * copy all arrive on the projection.
 */
export function ActivityTimeline({ record }: { record: PublicRecord }) {
  const activity = record.activity ?? [];
  const missing = record.placeholders?.MISSING_TIMELINE;

  return (
    <motion.section
      variants={fadeRise}
      initial="hidden"
      animate="visible"
      className="rounded-card bg-surface p-4 shadow-card"
      aria-label={record.vocabulary?.ACTIVITY_REGION_TITLE ?? ""}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-ink">
          {record.vocabulary?.ACTIVITY_REGION_TITLE}
        </h3>
        {activity.length && record.vocabulary?.VIEW_ALL ? (
          <span className="text-sm font-semibold text-primary">{record.vocabulary.VIEW_ALL}</span>
        ) : null}
      </div>

      {activity.length ? (
        <ol className="mt-4">
          {activity.map((item, i) => (
            <TimelineRow key={`${item.activity_code}-${i}`} item={item} last={i === activity.length - 1} />
          ))}
        </ol>
      ) : (
        <div className="mt-3 flex items-start gap-3.5">
          <div className="relative flex flex-col items-center">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-surface-sunken text-ink-faint">
              <Icon name="document" size={22} />
            </div>
            <div className="mt-1 h-10 w-0.5 rounded bg-line" />
            <div className="mt-1 h-2.5 w-2.5 rounded-full bg-line" />
          </div>
          <div>
            <p className="text-sm font-bold text-ink">{missing?.title}</p>
            <p className="mt-0.5 text-[13px] leading-relaxed text-ink-soft">{missing?.body}</p>
          </div>
        </div>
      )}
    </motion.section>
  );
}

function TimelineRow({ item, last }: { item: ActivityEntry; last: boolean }) {
  const role = osRole(item.presentation?.colour_role);
  const glyph = osIcon(item.presentation?.icon);
  const date = formatDateShort(item.occurred_at);

  return (
    <li className="flex gap-3.5">
      <div className="flex flex-col items-center">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${role.bubble}`}
        >
          <Icon name={glyph} size={18} />
        </div>
        {!last ? <div className="my-1 w-0.5 flex-1 rounded bg-line" /> : null}
      </div>
      <div className="min-w-0 flex-1 pb-5">
        <p className={`text-[11px] font-bold uppercase tracking-wide ${role.text}`}>
          {item.category}
          {date ? <span className="font-medium text-ink-faint">{`  ·  ${date}`}</span> : null}
        </p>
        <div className="mt-0.5 flex items-center justify-between gap-2">
          <p className="truncate text-[15px] font-bold text-ink">{item.title}</p>
          <span className="flex shrink-0 items-center gap-1.5">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-status-verified text-white">
              <Icon name="check" size={12} strokeWidth={3} />
            </span>
            <Icon name="chevron-right" size={15} className="text-ink-hint" />
          </span>
        </div>
        {item.summary ? (
          <p className="mt-0.5 truncate text-[13px] text-ink-soft">{item.summary}</p>
        ) : null}
      </div>
    </li>
  );
}
