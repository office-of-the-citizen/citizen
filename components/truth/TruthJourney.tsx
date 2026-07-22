"use client";

/**
 * TruthJourney — the expandable constitutional journey behind an answer.
 *
 * A continuous constitutional document, not a sequence of pages: three
 * drawers that unfold one at a time —
 *
 *   How this was established → Evidence used → Constitutional Authority →
 *   [seal] the full record
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
import { SealHold } from "./SealHold";

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
 * The projection does not yet carry a governed "primary authority" field
 * (checked: absent from both the SDK contract and Engine 10's presentation
 * registry). Until CAOS projects that judgment directly, this client-side
 * hierarchy picks the single nearest-governing authority class from what
 * the projection already supplies, so the Constitutional Authority layer
 * has one answer instead of a list. Ties, and anything unrecognised, keep
 * first-encountered order. Replace this with a projected field, not a
 * richer heuristic, when Engine 10 is ready to own the judgment.
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
      key: "established",
      title: "How this was established",
      body: (
        <Body>
          <p>
            This answer is published as{" "}
            <span className="font-bold text-ink">“{label}”</span>. {education.established}
          </p>
          {section.claim_ref ? (
            <p className="mt-2 text-[12px] text-ink-faint">
              Claim on record:{" "}
              <span className="font-mono text-[11px]">{section.claim_ref}</span>
            </p>
          ) : null}
        </Body>
      ),
    },
    {
      key: "evidence",
      title: "Evidence used",
      centerOnOpen: true,
      body: (
        <Body>
          {entries.length ? (
            entries.map((entry, i) => (
              <div key={i} className={i > 0 ? "mt-3" : undefined}>
                {entry.excerpt_text ? (
                  <p className="italic">“…{entry.excerpt_text.slice(0, 220)}…”</p>
                ) : null}
                {entry.authority_class ? (
                  <p className="mt-1 text-[11px] font-bold uppercase tracking-label text-ink-faint">
                    {entry.authority_class}
                  </p>
                ) : null}
                {entry.source_reference ? (
                  <p className="mt-1 break-all font-medium text-primary">
                    {entry.source_reference}
                  </p>
                ) : null}
              </div>
            ))
          ) : (
            <p>
              {section.missingness?.explanation ??
                record.placeholders?.MISSING_FACT?.body ??
                "The record is honestly silent here."}
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
              <p>
                This answer ultimately rests on{" "}
                <span className="font-bold text-ink">{primaryAuthority.className}</span>.
              </p>
              <div className="mt-2.5 flex items-start gap-2.5">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-status-reference-soft text-status-reference">
                  <Icon name="landmark" size={13} strokeWidth={2.4} />
                </span>
                <span className="min-w-0">
                  {primaryAuthority.references.map((ref) => (
                    <span key={ref} className="block break-all text-[12px] text-ink-soft">
                      {ref}
                    </span>
                  ))}
                </span>
              </div>
            </>
          ) : (
            <p>
              The record names no legal authority for this answer yet — when
              authority is admitted as evidence, the nearest governing source
              appears here.
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
          <SealHold
            label="More"
            sublabel="Hold to open the full constitutional record"
            onUnseal={() => router.push(recordHref)}
          />
        ) : undefined
      }
    />
  );
}
