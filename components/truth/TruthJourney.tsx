"use client";

/**
 * TruthJourney — the expandable constitutional journey behind an answer.
 *
 * A continuous constitutional document that unfolds in three layers:
 *
 *   How We Know → Evidence → Constitutional Authority → full record
 *
 * The first layer merges "why this status" and "how the answer was decided"
 * into one flowing institutional narrative — CAOS explaining itself, not
 * documentation. Evidence expands in place and scrolls to centre. The
 * authority layer shows the nearest governing constitutional source so the
 * citizen immediately understands what this answer ultimately rests on.
 *
 * Projected truth (labels, excerpts, claim ids) renders verbatim from the
 * projection. The connective civic education comes from the status
 * registry and explains the SYSTEM, never a specific fact. Where the record
 * is silent, the journey says so with governed absence copy.
 */
import { useRouter } from "next/navigation";

import type { PublicRecord, RecordSection } from "@/sdk/contracts";
import { Icon } from "@/presentation/icons/Icon";
import { statusEducation } from "@/presentation/status/registry";
import { LayeredReveal, type RevealLayer } from "@/components/ui/LayeredReveal";
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

interface AuthorityGroup {
  className: string;
  references: string[];
}

/** Group projected evidence by its authority class — the law it rests on. */
function authorityGroups(entries: EvidenceEntry[]): AuthorityGroup[] {
  const byClass = new Map<string, Set<string>>();
  for (const entry of entries) {
    if (!entry.authority_class) continue;
    const refs = byClass.get(entry.authority_class) ?? new Set<string>();
    if (entry.source_reference) refs.add(entry.source_reference);
    byClass.set(entry.authority_class, refs);
  }
  return Array.from(byClass, ([className, refs]) => ({
    className,
    references: Array.from(refs),
  }));
}

/**
 * Nearest-governing-authority ranking — TRANSITIONAL.
 *
 * The projection does not yet carry a governed "primary authority" field.
 * Until CAOS projects that judgment directly, this client-side hierarchy
 * picks the single nearest-governing authority class from what the
 * projection already supplies, so the Constitutional Authority layer has
 * one answer instead of a list. Replace with a projected field when ready.
 */
const AUTHORITY_RANK: RegExp[] = [
  /constitution/i,
  /supreme court|judg[e]?ment/i,
  /\bact\b/i,
  /\blaw\b/i,
  /gazette/i,
];

function rankAuthorityClass(className: string): number {
  const rank = AUTHORITY_RANK.findIndex((pattern) => pattern.test(className));
  return rank === -1 ? AUTHORITY_RANK.length : rank;
}

/** The single nearest-governing authority among the groups on record. */
function nearestAuthority(groups: AuthorityGroup[]): AuthorityGroup | undefined {
  if (!groups.length) return undefined;
  return [...groups].sort((a, b) => rankAuthorityClass(a.className) - rankAuthorityClass(b.className))[0];
}

/** Friendly label for a constitutional authority class. */
function authorityLabel(className: string): string {
  if (/constitution/i.test(className)) return "The Constitution";
  if (/supreme court|judg[e]?ment/i.test(className)) return "Court Judgment";
  if (/\bact\b/i.test(className)) return "Act of the National Assembly";
  if (/\blaw\b/i.test(className)) return "State Law";
  if (/gazette/i.test(className)) return "Official Gazette";
  return className;
}

function Body({ children }: { children: React.ReactNode }) {
  return <div className="text-[13px] leading-relaxed text-ink-soft">{children}</div>;
}

export function TruthJourney({
  section,
  record,
  recordHref,
}: {
  section: RecordSection;
  record: PublicRecord;
  /** Destination of the final layer — the dedicated constitutional record. */
  recordHref?: string;
}) {
  const router = useRouter();
  const code = section.badge?.badge_code ?? section.verification?.verification_status;
  const education = statusEducation(code);
  const entries = evidenceEntries(section);
  const authorities = authorityGroups(entries);
  const primaryAuthority = nearestAuthority(authorities);
  const label = section.badge?.label ?? "on record";

  const layers: RevealLayer[] = [
    {
      key: "how-we-know",
      title: "How We Know",
      body: (
        <Body>
          <p>
            This answer is published as{" "}
            <span className="font-bold text-ink">"{label}"</span>.{" "}
            {education.narrative}
          </p>
          {section.claim_ref ? (
            <p className="mt-2 text-[12px] text-ink-faint">
              Claim reference:{" "}
              <span className="font-mono text-[11px]">{section.claim_ref}</span>
            </p>
          ) : null}
        </Body>
      ),
    },
    {
      key: "evidence",
      title: "Evidence",
      centerOnOpen: true,
      body: (
        <Body>
          {entries.length ? (
            <div className="space-y-3">
              {entries.map((entry, i) => (
                <div
                  key={i}
                  className={cn(
                    "rounded-xl bg-surface px-3.5 py-2.5",
                    i > 0 && "border-t border-line/50",
                  )}
                >
                  {entry.excerpt_text ? (
                    <p className="italic text-ink">
                      "…{entry.excerpt_text.slice(0, 220)}…"
                    </p>
                  ) : null}
                  {entry.authority_class ? (
                    <p className="mt-1.5 text-[11px] font-bold uppercase tracking-label text-ink-faint">
                      {entry.authority_class}
                    </p>
                  ) : null}
                  {entry.source_reference ? (
                    <p className="mt-1 break-all text-[12px] font-medium text-primary">
                      {entry.source_reference}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          ) : (
            <p>
              {section.missingness?.explanation ??
                record.placeholders?.MISSING_FACT?.body ??
                "The record is honestly silent here — no evidence has been admitted for this answer yet."}
            </p>
          )}
        </Body>
      ),
    },
    {
      key: "constitutional-authority",
      title: "Constitutional Authority",
      body: (
        <Body>
          {primaryAuthority ? (
            <>
              <div className="flex items-center gap-2.5">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-status-reference-soft text-status-reference">
                  <Icon name="landmark" size={14} strokeWidth={2.4} />
                </span>
                <span className="text-[13px] font-bold text-ink">
                  {authorityLabel(primaryAuthority.className)}
                </span>
              </div>
              <p className="mt-2">
                This answer ultimately rests on{" "}
                <span className="font-semibold text-ink">
                  {primaryAuthority.className}
                </span>
                .
              </p>
              {primaryAuthority.references.length > 0 ? (
                <div className="mt-2 space-y-0.5">
                  {primaryAuthority.references.map((ref) => (
                    <p
                      key={ref}
                      className="break-all text-[12px] text-ink-faint"
                    >
                      {ref}
                    </p>
                  ))}
                </div>
              ) : null}
            </>
          ) : (
            <p>
              The record does not yet name a governing legal authority for
              this answer. When authority is admitted as evidence, the
              nearest constitutional source will appear here.
            </p>
          )}
        </Body>
      ),
    },
  ];

  return (
    <LayeredReveal
      layers={layers}
      terminal={
        recordHref ? (
          <button
            type="button"
            onClick={() => router.push(recordHref)}
            className="pressable-subtle flex min-h-tap w-full items-center justify-between gap-3 py-2.5 text-left"
          >
            <span className="text-[13px] font-semibold text-primary">
              View the full constitutional record
            </span>
            <span className="shrink-0 text-primary">
              <Icon name="arrow-up-right" size={15} strokeWidth={2.4} />
            </span>
          </button>
        ) : undefined
      }
    />
  );
}
