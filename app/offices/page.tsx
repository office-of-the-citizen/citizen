"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import type { OfficeLevel, OfficeConfig } from "@/presentation/offices/types";
import { LEVEL_LABELS } from "@/presentation/offices/types";
import { getOfficesByLevel } from "@/presentation/offices/registry";
import { InstitutionSealArt } from "@/presentation/placeholders/art";
import { Icon } from "@/presentation/icons/Icon";
import { cardIn } from "@/presentation/animations/motion";

const LEVEL_ORDER: OfficeLevel[] = ["federal", "state", "local"];

const LEVEL_DESCRIPTIONS: Record<OfficeLevel, string> = {
  federal: "Offices established by the Constitution of the Federal Republic of Nigeria.",
  state: "Offices established by State Constitutions and governance structures.",
  local: "Offices established by the Local Government system.",
};

/**
 * Offices hub — three sections (Federal / State / Local) with office cards
 * linking to individual profiles. Uses cardIn motion, Card primitive, and
 * institution seals.
 */
export default function OfficesHubPage() {
  return (
    <div className="mx-auto min-h-screen w-full max-w-md bg-surface-sunken pb-32">
      {/* Header */}
      <div className="bg-surface px-4 pb-4 pt-safe-t">
        <div className="flex items-center gap-3 pt-4">
          <Link
            href="/"
            className="pressable flex h-10 w-10 items-center justify-center rounded-full bg-surface-sunken text-ink-soft transition-colors duration-quick ease-out hover:text-ink"
          >
            <Icon name="chevron-left" size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold tracking-display text-ink">
              Public Offices
            </h1>
            <p className="text-[13px] text-ink-soft">
              Explore the constitutional offices of Nigeria.
            </p>
          </div>
        </div>
      </div>

      {/* Level sections */}
      <div className="space-y-6 px-4 pt-4">
        {LEVEL_ORDER.map((level) => {
          const offices = getOfficesByLevel(level);
          if (offices.length === 0) return null;

          return (
            <motion.section
              key={level}
              variants={cardIn}
              initial="hidden"
              animate="visible"
            >
              <div className="mb-3">
                <h2 className="text-lg font-bold text-ink">
                  {LEVEL_LABELS[level]}
                </h2>
                <p className="text-[12px] leading-relaxed text-ink-soft">
                  {LEVEL_DESCRIPTIONS[level]}
                </p>
              </div>

              <div className="space-y-2">
                {offices.map((office) => (
                  <OfficeHubCard key={office.slug} office={office} />
                ))}
              </div>
            </motion.section>
          );
        })}
      </div>
    </div>
  );
}

function OfficeHubCard({ office }: { office: OfficeConfig }) {
  const holderName = office.holder.name;

  return (
    <Link
      href={`/offices/${office.level}/${office.slug}`}
      className="pressable-subtle block rounded-card bg-surface p-4 shadow-card transition-shadow duration-quick ease-out hover:shadow-card-hover"
    >
      <div className="flex items-center gap-3.5">
        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full">
          <InstitutionSealArt label={office.institution} level={office.level} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-bold text-ink">
            {office.shortTitle}
          </p>
          <p className="truncate text-[12px] text-ink-soft">{office.institution}</p>
          {holderName && (
            <p className="mt-0.5 truncate text-[11px] text-ink-faint">
              {holderName}
            </p>
          )}
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1">
          <Icon name="chevron-right" size={16} className="text-ink-faint" />
          <span className="text-[10px] font-medium text-ink-faint">
            {office.currentTerm}
          </span>
        </div>
      </div>
    </Link>
  );
}
