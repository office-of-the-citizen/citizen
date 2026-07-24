"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import type { OfficeHolderData } from "@/presentation/offices/types";
import { PortraitArt } from "@/presentation/placeholders/art";
import { Icon } from "@/presentation/icons/Icon";
import { StatusChip } from "@/components/ui/StatusChip";
import { Disclosure } from "@/components/ui/Disclosure";
import { formatDateLong } from "@/lib/format";
import { cn } from "@/lib/cn";

/**
 * Office holder card — mirrors ChairmanCard pattern.
 * Shows the current officeholder with portrait, term dates, and status.
 * The office comes first; the holder is the current occupant.
 */
export function OfficeHolderCard({
  holder,
  officeTitle,
  verificationLabel,
  verificationCode,
}: {
  holder: OfficeHolderData;
  officeTitle: string;
  verificationLabel: string;
  verificationCode: string;
}) {
  const [open, setOpen] = useState(false);
  const name = holder.name;
  const portrait = holder.portrait;
  const sinceDate = formatDateLong(holder.assumedDate);
  const termEnd = formatDateLong(holder.termEnd);

  const badge = {
    label: verificationLabel,
    badge_code: verificationCode,
    colour_role: verificationCode,
    colour_hex: "#095c33",
    surface_mark: "#095c33",
    surface_mark_treatment: "soft",
  };

  return (
    <motion.section layout className="rounded-card bg-surface p-4 shadow-card">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="pressable-subtle w-full text-left"
      >
        <div className="flex items-stretch gap-4">
          <div
            className="h-28 w-24 shrink-0 overflow-hidden rounded-2xl bg-surface-sunken"
            title={portrait ? undefined : holder.missingLabel ?? undefined}
          >
            {portrait ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={portrait} alt={name ?? ""} className="h-full w-full object-cover" />
            ) : (
              <PortraitArt tone={name ? "green" : "neutral"} />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <StatusChip badge={badge} />
              <motion.span
                animate={{ rotate: open ? 90 : 0 }}
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
                className="mt-1 shrink-0 text-ink-hint"
              >
                <Icon name="chevron-right" size={18} />
              </motion.span>
            </div>

            {name ? (
              <>
                <h2 className="mt-1.5 truncate text-xl font-extrabold tracking-display text-ink">
                  {name}
                </h2>
                <p className="text-sm font-medium text-ink-soft">{officeTitle}</p>
                {holder.party ? (
                  <p className="mt-0.5 text-[12px] text-ink-faint">{holder.party}</p>
                ) : null}
              </>
            ) : (
              <>
                <h2 className="mt-1.5 text-lg font-bold text-status-unknown">
                  {holder.missingLabel ?? "Officeholder not yet in the record"}
                </h2>
                <p className="text-sm text-ink-faint">
                  {holder.missingExplanation ?? "The current occupant will appear here when the constitutional record is compiled."}
                </p>
              </>
            )}
          </div>
        </div>

        {name ? (
          <div className="mt-4 flex divide-x divide-line border-t border-line pt-3">
            <TermCell
              icon="calendar"
              label="Assumed Office"
              value={sinceDate}
              fallback="Date not yet in the record"
            />
            <TermCell
              icon="calendar"
              label="Term Ends"
              value={termEnd}
              fallback="Not yet determined"
            />
          </div>
        ) : null}
      </button>

      <Disclosure open={open}>
        <div className="mt-3 rounded-2xl bg-surface-sunken px-3.5 py-3">
          <p className="text-[12px] leading-relaxed text-ink-soft">
            This office is a recognised entry in the constitutional record. The officeholder
            information shown is referenced from the governed repository — not re-verified on
            every page load. When the CAOS Engine begins projecting office records with full
            verification trails, the complete evidence chain will appear here.
          </p>
          <p className="mt-2 text-[11px] font-medium text-ink-faint">
            Constitutional basis: verification trail pending Engine projection.
          </p>
        </div>
      </Disclosure>
    </motion.section>
  );
}

function TermCell({
  icon,
  label,
  value,
  fallback,
}: {
  icon: "calendar";
  label: string;
  value: string | null;
  fallback: string;
}) {
  return (
    <div className="flex flex-1 items-center gap-2.5 px-3 first:pl-0 last:pr-0">
      <Icon name={icon} size={18} className="shrink-0 text-ink-hint" />
      <div className="min-w-0">
        <p className="text-[11px] font-medium text-ink-faint">{label}</p>
        {value ? (
          <p className={cn("truncate text-[13px] font-bold text-ink")}>{value}</p>
        ) : (
          <p className="truncate text-[13px] font-semibold text-status-unknown">{fallback}</p>
        )}
      </div>
    </div>
  );
}
