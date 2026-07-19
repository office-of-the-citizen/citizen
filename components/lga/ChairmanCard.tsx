"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import type { PublicRecord, RecordSection } from "@/sdk/contracts";
import { PortraitArt } from "@/presentation/placeholders/art";
import { placeholderCopy } from "@/presentation/placeholders/registry";
import { Icon } from "@/presentation/icons/Icon";
import { PresentationBadge } from "@/components/shared/PresentationBadge";
import { formatDateLong } from "@/lib/format";
import { cn } from "@/lib/cn";

interface EvidenceEntry {
  excerpt_text?: string;
  source_reference?: string;
  authority_class?: string;
  retrieved_at?: string;
}

function evidenceEntries(section: RecordSection): EvidenceEntry[] {
  const ev = section.evidence as { entries?: EvidenceEntry[] } | null | undefined;
  return Array.isArray(ev?.entries) ? ev.entries : [];
}

/**
 * Executive Chairman card — rendered purely from the projected chairman
 * section. The verification chip, dates and name all arrive on the
 * projection; missing dates render governed absence copy, never guesses.
 * Tapping the card discloses the evidence behind the answer.
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
  const entries = evidenceEntries(chairman);
  const missingPortrait = placeholderCopy("MISSING_PORTRAIT");

  return (
    <motion.button
      type="button"
      layout
      onClick={() => setOpen((v) => !v)}
      className="w-full rounded-card bg-surface p-4 text-left shadow-card"
      aria-expanded={open}
    >
      <div className="flex items-stretch gap-4">
        <div
          className="h-28 w-24 shrink-0 overflow-hidden rounded-2xl bg-surface-sunken"
          title={portrait ? undefined : missingPortrait.title}
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
            <PresentationBadge badge={chairman.badge} />
            <Icon
              name="chevron-right"
              size={18}
              className={cn(
                "mt-1 shrink-0 text-ink-faint transition-transform",
                open && "rotate-90",
              )}
            />
          </div>

          {name ? (
            <>
              <h2 className="mt-1.5 truncate text-xl font-extrabold text-ink">{name}</h2>
              <p className="text-sm font-medium text-ink-soft">Executive Chairman</p>
            </>
          ) : (
            <>
              <h2 className="mt-1.5 text-lg font-bold text-unknown">
                {chairman.missingness?.label ?? "Not yet on record"}
              </h2>
              <p className="text-sm text-ink-faint">
                {chairman.missingness?.explanation ?? "Awaiting a governed public record."}
              </p>
            </>
          )}
        </div>
      </div>

      {name ? (
        <div className="mt-4 flex divide-x divide-line border-t border-line pt-3">
          <TermCell
            icon="calendar"
            label="In Office Since"
            value={sinceDate}
            fallback={assumed?.missingness?.label ?? "Not on record"}
          />
          <TermCell icon="calendar" label="Term Expires" value={termEnd} fallback="Not on record" />
        </div>
      ) : null}

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="mt-3 rounded-2xl bg-surface-sunken p-3.5 text-xs leading-relaxed text-ink-soft">
              <p className="mb-1 font-bold uppercase tracking-wide text-ink-faint">
                Where this answer comes from
              </p>
              {entries.length ? (
                entries.map((entry, i) => (
                  <div key={i} className="mt-1.5">
                    {entry.excerpt_text ? (
                      <p className="italic">“…{entry.excerpt_text.slice(0, 160)}…”</p>
                    ) : null}
                    {entry.source_reference ? (
                      <p className="mt-1 break-all font-medium text-primary">
                        {entry.source_reference}
                      </p>
                    ) : null}
                  </div>
                ))
              ) : (
                <p>{chairman.missingness?.explanation ?? "No evidence packet projected."}</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
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
      <Icon name={icon} size={18} className="shrink-0 text-ink-faint" />
      <div className="min-w-0">
        <p className="text-[11px] font-medium text-ink-faint">{label}</p>
        {value ? (
          <p className="truncate text-[13px] font-bold text-ink">{value}</p>
        ) : (
          <p className="truncate text-[13px] font-semibold text-unknown">{fallback}</p>
        )}
      </div>
    </div>
  );
}
