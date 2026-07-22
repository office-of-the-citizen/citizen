"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import type { PublicRecord } from "@/sdk/contracts";
import { PortraitArt } from "@/presentation/placeholders/art";
import { Icon } from "@/presentation/icons/Icon";
import { StatusChip } from "@/components/ui/StatusChip";
import { Disclosure } from "@/components/ui/Disclosure";
import { TruthJourney } from "@/components/truth/TruthJourney";
import { formatDateLong } from "@/lib/format";
import { cn } from "@/lib/cn";

/**
 * Primary-facts card — rendered purely from the projected chairman section.
 * The office title, term labels, status chip, dates and name all arrive on
 * the projection; missing values render governed absence copy, never
 * guesses. Tapping the card unfolds the constitutional journey behind the
 * answer, one drawer at a time.
 */
export function ChairmanCard({ record }: { record: PublicRecord }) {
  const [open, setOpen] = useState(false);
  const chairman = record.sections.chairman;
  if (!chairman) return null;

  const assumed = record.sections.assumed_office;
  const name = chairman.answer?.display_name ?? null;
  const portrait = chairman.answer?.portrait ?? null;
  const sinceDate = assumed?.answer ? formatDateLong(assumed.answer.value) : null;
  const termEnd = formatDateLong(chairman.valid_to);
  const missingPortrait = record.placeholders?.MISSING_PORTRAIT;
  const missingTerm = record.placeholders?.MISSING_TERM;

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
            title={portrait ? undefined : missingPortrait?.title}
          >
            {portrait ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={portrait} alt={name ?? ""} className="h-full w-full object-cover" />
            ) : (
              <PortraitArt tone="green" />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <StatusChip badge={chairman.badge} />
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
                {chairman.display_label ? (
                  <p className="text-sm font-medium text-ink-soft">{chairman.display_label}</p>
                ) : null}
              </>
            ) : (
              <>
                <h2 className="mt-1.5 text-lg font-bold text-status-unknown">
                  {chairman.missingness?.label}
                </h2>
                <p className="text-sm text-ink-faint">{chairman.missingness?.explanation}</p>
              </>
            )}
          </div>
        </div>

        {name ? (
          <div className="mt-4 flex divide-x divide-line border-t border-line pt-3">
            <TermCell
              icon="calendar"
              label={assumed?.display_label ?? ""}
              value={sinceDate}
              fallback={assumed?.missingness?.label ?? missingTerm?.title ?? ""}
            />
            <TermCell
              icon="calendar"
              label={record.vocabulary?.TERM_END ?? ""}
              value={termEnd}
              fallback={missingTerm?.title ?? ""}
            />
          </div>
        ) : null}
      </button>

      <Disclosure open={open}>
        <div className="mt-3 rounded-2xl bg-surface-sunken px-3.5 py-2">
          <TruthJourney
            section={chairman}
            record={record}
            recordHref={`/lga/${record.slug}/record`}
          />
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
