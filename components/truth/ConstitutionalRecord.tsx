"use client";

/**
 * ConstitutionalRecord — the full record, rendered as a document.
 *
 * The deepest layer of the information-reveal journey. Every value on this
 * page arrives on the projection and renders verbatim: questions, answers,
 * claims, evidence excerpts, context references, provenance hashes.
 * Governed silence renders as silence, never as blanks.
 */
import Link from "next/link";
import { motion } from "framer-motion";

import type { PermanentSpatialObject } from "@office-of-the-citizen/caos-sdk";
import type { PublicRecord, RecordSection } from "@/sdk/contracts";
import { Icon } from "@/presentation/icons/Icon";
import { Card } from "@/components/ui/Card";
import { FactRow } from "@/components/ui/FactRow";
import { StatusChip } from "@/components/ui/StatusChip";
import { statusEducation } from "@/presentation/status/registry";
import { cardIn, fadeIn } from "@/presentation/animations/motion";
import { formatDateLong } from "@/lib/format";

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

export function ConstitutionalRecord({
  permanent,
  breadcrumb,
  record,
}: {
  permanent: PermanentSpatialObject;
  breadcrumb: PermanentSpatialObject[];
  record: PublicRecord;
}) {
  const name = record.display.subject_name ?? permanent.primary_name;
  const lineage = breadcrumb
    .slice(0, -1)
    .map((b) => b.primary_name)
    .reverse()
    .join(", ");
  const sections = Object.values(record.sections ?? {}).filter(Boolean) as RecordSection[];

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="mx-auto min-h-screen w-full max-w-md bg-surface-sunken pb-32"
    >
      {/* Document header */}
      <header className="bg-primary-deep px-4 pb-8 pt-safe-t text-white">
        <div className="flex items-center justify-between pt-3">
          <Link
            href={`/lga/${record.slug}`}
            className="pressable flex min-h-tap items-center gap-1.5 rounded-chip py-2 pr-3 text-sm font-semibold text-white/85 transition-colors duration-quick ease-out hover:text-white"
          >
            <Icon name="chevron-left" size={17} />
            {name}
          </Link>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
            <Icon name="shield" size={18} />
          </span>
        </div>
        <p className="mt-6 text-[11px] font-bold uppercase tracking-label text-white/60">
          Constitutional record
        </p>
        <h1 className="mt-1.5 text-[1.65rem] font-extrabold leading-tight tracking-display">
          {name}
        </h1>
        {lineage ? <p className="mt-1 text-sm text-white/70">{lineage}</p> : null}
      </header>

      <div className="space-y-4 px-4 pt-4">
        {/* Every governed question, answered or honestly silent */}
        {sections.map((section, i) => {
          const entries = evidenceEntries(section);
          const education = statusEducation(
            section.badge?.badge_code ?? section.verification?.verification_status,
          );
          return (
            <motion.div
              key={section.section_code}
              custom={i}
              variants={cardIn}
              initial="hidden"
              animate="visible"
            >
              <Card as="section">
                <p className="text-[11px] font-bold uppercase tracking-label text-ink-faint">
                  {section.question}
                </p>
                <div className="mt-2 flex items-start justify-between gap-3">
                  <p className="text-lg font-extrabold tracking-display text-ink">
                    {section.answer?.display_name ??
                      formatDateLong(section.answer?.value) ??
                      section.answer?.value ??
                      section.missingness?.label ??
                      "—"}
                  </p>
                  <StatusChip badge={section.badge} interactive className="mt-0.5 shrink-0" />
                </div>
                {section.display_label ? (
                  <p className="mt-0.5 text-[13px] text-ink-soft">{section.display_label}</p>
                ) : null}

                <dl className="mt-3 space-y-1.5 border-t border-line pt-3">
                  {section.claim_ref ? (
                    <FactRow label="Claim" mono value={section.claim_ref} />
                  ) : null}
                  {section.valid_from ? (
                    <FactRow label="Valid from" value={formatDateLong(section.valid_from)} />
                  ) : null}
                  {section.valid_to ? (
                    <FactRow label="Valid until" value={formatDateLong(section.valid_to)} />
                  ) : null}
                  {section.verification?.verification_status ? (
                    <FactRow
                      label="Verification"
                      value={section.verification.verification_status}
                    />
                  ) : null}
                </dl>

                {entries.length ? (
                  <div className="mt-3 rounded-2xl bg-surface-sunken p-3.5">
                    <p className="text-[11px] font-bold uppercase tracking-label text-ink-faint">
                      Evidence
                    </p>
                    {entries.map((entry, j) => (
                      <div key={j} className="mt-2 text-[13px] leading-relaxed text-ink-soft">
                        {entry.excerpt_text ? (
                          <p className="italic">“…{entry.excerpt_text}…”</p>
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
                        {entry.retrieved_at ? (
                          <p className="mt-0.5 text-[11px] text-ink-faint">
                            Retrieved {formatDateLong(entry.retrieved_at)}
                          </p>
                        ) : null}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mt-3 rounded-2xl bg-surface-sunken p-3.5 text-[13px] leading-relaxed text-ink-soft">
                    {section.missingness?.explanation ?? education.meaning}
                  </p>
                )}
              </Card>
            </motion.div>
          );
        })}

        {/* Constitutional references shown by governed relationship */}
        {record.context.length ? (
          <Card as="section">
            <h2 className="text-base font-bold text-ink">Recognised offices</h2>
            <div className="mt-2 divide-y divide-line">
              {record.context.map((entry) => (
                <div key={entry.provider} className="flex items-center justify-between gap-3 py-2.5">
                  <div className="min-w-0">
                    <p className="text-[13px] font-bold text-ink">{entry.label}</p>
                    <p className="mt-0.5 truncate text-[12px] text-ink-soft">
                      {entry.display_name ?? entry.missingness?.label}
                    </p>
                  </div>
                  <StatusChip badge={entry.badge} interactive className="shrink-0" />
                </div>
              ))}
            </div>
          </Card>
        ) : null}

        {/* Provenance — the record's own fingerprint */}
        <Card as="section">
          <div className="flex items-center gap-2">
            <Icon name="hash" size={16} className="text-ink-faint" />
            <h2 className="text-base font-bold text-ink">Provenance</h2>
          </div>
          <dl className="mt-3 space-y-1.5">
            <FactRow label="Built" value={formatDateLong(record.provenance.built_at)} />
            <FactRow label="Builder" value={record.provenance.builder} />
            <FactRow
              label="Projection"
              value={`v${record.provenance.projection_version}`}
            />
            <FactRow label="Input hash" mono value={record.provenance.build_input_hash} />
          </dl>
          <p className="mt-3 border-t border-line pt-3 text-[12px] leading-relaxed text-ink-faint">
            This record is derived from admitted constitutional sources. It can
            always be rebuilt from the evidence it stands on — nothing here is
            opinion, and nothing is lost when it refreshes.
          </p>
        </Card>
      </div>
    </motion.div>
  );
}
