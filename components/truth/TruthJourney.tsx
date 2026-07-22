"use client";

/**
 * TruthJourney — the expandable constitutional journey behind an answer.
 *
 * Replaces the flat “Where this answer comes from” panel with drawers that
 * unfold one at a time:
 *
 *   Why we know this → How it was verified → Evidence used →
 *   The authority it rests on → What you can rely on →
 *   Verification record → [seal] the full record
 *
 * Projected truth (labels, excerpts, claim ids, hashes) renders verbatim
 * from the projection. The connective civic education comes from the status
 * registry and explains the SYSTEM, never a specific fact. Where the record
 * is silent, the journey says so with governed absence copy.
 */
import { useRouter } from "next/navigation";

import type { PublicRecord, RecordSection } from "@/sdk/contracts";
import { Icon } from "@/presentation/icons/Icon";
import { statusEducation } from "@/presentation/status/registry";
import { formatDateLong } from "@/lib/format";
import { FactRow } from "@/components/ui/FactRow";
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
  const label = section.badge?.label ?? "on record";

  const layers: RevealLayer[] = [
    {
      key: "meaning",
      title: "Why we know this",
      body: (
        <Body>
          <p>
            This answer is published as{" "}
            <span className="font-bold text-ink">“{label}”</span>. {education.meaning}
          </p>
        </Body>
      ),
    },
    {
      key: "mechanics",
      title: `How “${label}” is decided`,
      body: (
        <Body>
          <p>{education.mechanics}</p>
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
      key: "authority",
      title: "The authority it rests on",
      body: (
        <Body>
          {authorities.length ? (
            <ul className="space-y-2">
              {authorities.map((a) => (
                <li key={a.className} className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-status-reference-soft text-status-reference">
                    <Icon name="landmark" size={13} strokeWidth={2.4} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[12px] font-bold uppercase tracking-label text-ink">
                      {a.className}
                    </span>
                    {a.references.map((ref) => (
                      <span key={ref} className="block break-all text-[12px] text-ink-soft">
                        {ref}
                      </span>
                    ))}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              The record names no legal authority for this answer yet — when
              authority is admitted as evidence, it appears here with its class
              and source.
            </p>
          )}
        </Body>
      ),
    },
    {
      key: "reliance",
      title: "What you can rely on",
      body: (
        <Body>
          <p>{education.implication}</p>
        </Body>
      ),
    },
    {
      key: "history",
      title: "Verification record",
      body: (
        <Body>
          <dl className="space-y-1.5">
            {section.valid_from ? (
              <FactRow label="Valid from" value={formatDateLong(section.valid_from)} />
            ) : null}
            {section.valid_to ? (
              <FactRow label="Valid until" value={formatDateLong(section.valid_to)} />
            ) : null}
            <FactRow label="Record built" value={formatDateLong(record.provenance.built_at)} />
            <FactRow label="Built by" value={record.provenance.builder} />
            <FactRow label="Input hash" mono value={record.provenance.build_input_hash} />
          </dl>
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
            label="Open the constitutional record"
            sublabel="Hold the seal to open the full record"
            onUnseal={() => router.push(recordHref)}
          />
        ) : undefined
      }
    />
  );
}
