"use client";

import { motion } from "framer-motion";

import type { ContextEntry, PublicRecord } from "@/sdk/contracts";
import { RELATIONSHIP_SLOTS, type RelationshipSlot } from "@/presentation/relationships";
import { PortraitArt } from "@/presentation/placeholders/art";
import { placeholderCopy } from "@/presentation/placeholders/registry";
import { ConstitutionalMark } from "@/components/shared/ConstitutionalMark";
import { fadeRise } from "@/presentation/animations/motion";
import { cn } from "@/lib/cn";

/**
 * Constitutional relationship row — one fixed presentation slot per office.
 * The projection decides whether an office holder exists for each slot; empty
 * slots render the governed “awaiting public record” state. Order and labels
 * come from the relationship slot registry, never from screens.
 */
export function RelationshipRow({ record }: { record: PublicRecord }) {
  const byProvider = new Map<string, ContextEntry>();
  for (const entry of record.context) byProvider.set(entry.provider, entry);

  return (
    <div className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 pb-1">
      {RELATIONSHIP_SLOTS.map((slot, i) => (
        <RelationshipCard key={slot.slot_code} slot={slot} entry={byProvider.get(slot.provider)} index={i} />
      ))}
    </div>
  );
}

function RelationshipCard({
  slot,
  entry,
  index,
}: {
  slot: RelationshipSlot;
  entry: ContextEntry | undefined;
  index: number;
}) {
  const holder = entry?.display_name ?? null;
  const recognised = Boolean(entry?.person_id);
  const missing = placeholderCopy("MISSING_RELATIONSHIP");
  const missingLabel = entry?.missingness?.label ?? missing.title;
  const blue = slot.accent === "blue";

  return (
    <motion.div
      custom={index}
      variants={fadeRise}
      initial="hidden"
      animate="visible"
      className="w-[8.5rem] shrink-0 rounded-card bg-surface p-2.5 pb-3 text-center shadow-card"
    >
      <p
        className={cn(
          "mb-2 truncate text-[12px] font-bold",
          blue ? "text-accent-blue" : "text-primary",
        )}
      >
        {slot.label}
      </p>
      <div className="relative mx-auto h-24 w-full overflow-hidden rounded-xl bg-surface-sunken">
        <PortraitArt tone={holder ? (blue ? "blue" : "green") : "neutral"} />
        {recognised ? (
          <ConstitutionalMark
            accent={slot.accent}
            size={20}
            className="absolute bottom-1.5 right-1.5"
          />
        ) : null}
      </div>
      {holder ? (
        <>
          <p className="mt-2 truncate text-[13px] font-bold leading-tight text-ink">{holder}</p>
          <p className="mt-0.5 truncate text-[11px] text-ink-soft">
            {entry?.detail ?? slot.label}
          </p>
        </>
      ) : (
        <>
          <p className="mt-2 truncate text-[12px] font-semibold leading-tight text-unknown">
            {missingLabel}
          </p>
          <p className="mt-0.5 truncate text-[11px] text-ink-faint">{missing.body}</p>
        </>
      )}
    </motion.div>
  );
}
