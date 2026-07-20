"use client";

import { motion } from "framer-motion";

import type { ContextEntry, PublicRecord } from "@/sdk/contracts";
import { PortraitArt } from "@/presentation/placeholders/art";
import { osRole } from "@/presentation/os-visuals";
import { ConstitutionalMark } from "@/components/shared/ConstitutionalMark";
import { fadeRise } from "@/presentation/animations/motion";
import { cn } from "@/lib/cn";

/**
 * Constitutional relationship row — renders the projection's RELATIONSHIPS
 * context verbatim. Order, labels, accents and missingness copy all arrive
 * ON the projection; the application declares nothing.
 */
export function RelationshipRow({ record }: { record: PublicRecord }) {
  const entries = record.context.filter((e) => e.layout_slot === "RELATIONSHIPS");
  if (!entries.length) return null;

  return (
    <div className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 pb-1">
      {entries.map((entry, i) => (
        <RelationshipCard key={entry.provider} entry={entry} index={i} />
      ))}
    </div>
  );
}

function RelationshipCard({ entry, index }: { entry: ContextEntry; index: number }) {
  const holder = entry.display_name ?? null;
  const recognised = Boolean(entry.person_id);
  const role = osRole(entry.presentation?.accent_role);

  return (
    <motion.div
      custom={index}
      variants={fadeRise}
      initial="hidden"
      animate="visible"
      className="w-[8.5rem] shrink-0 rounded-card bg-surface p-2.5 pb-3 text-center shadow-card"
    >
      <p className={cn("mb-2 truncate text-[12px] font-bold", role.text)}>{entry.label}</p>
      <div className="relative mx-auto h-24 w-full overflow-hidden rounded-xl bg-surface-sunken">
        <PortraitArt tone={holder ? (role.blue ? "blue" : "green") : "neutral"} />
        {recognised ? (
          <ConstitutionalMark
            accent={role.blue ? "blue" : "green"}
            size={20}
            className="absolute bottom-1.5 right-1.5"
          />
        ) : null}
      </div>
      {holder ? (
        <>
          <p className="mt-2 truncate text-[13px] font-bold leading-tight text-ink">{holder}</p>
          <p className="mt-0.5 truncate text-[11px] text-ink-soft">
            {entry.detail ?? entry.label}
          </p>
        </>
      ) : (
        <>
          <p className="mt-2 truncate text-[12px] font-semibold leading-tight text-unknown">
            {entry.missingness?.label}
          </p>
          <p className="mt-0.5 truncate text-[11px] text-ink-faint">
            {entry.missingness?.explanation}
          </p>
        </>
      )}
    </motion.div>
  );
}
