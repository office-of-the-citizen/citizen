"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import type { OfficeEducation } from "@/presentation/offices/types";
import { Icon } from "@/presentation/icons/Icon";
import { Disclosure } from "@/components/ui/Disclosure";
import { cn } from "@/lib/cn";

/**
 * Office education card — "Did you know?" civic education section.
 * Mirrors the CivicJourney pattern with a hook, facts, and citizen rights.
 */
export function OfficeEducationCard({
  education,
}: {
  education: OfficeEducation;
}) {
  const [openSection, setOpenSection] = useState<string | null>(null);

  return (
    <motion.section
      layout
      className="rounded-card bg-surface p-4 shadow-card"
      aria-label="Civic Education"
    >
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary-soft text-primary">
          <Icon name="info" size={18} />
        </span>
        <h2 className="text-base font-bold text-ink">Did you know?</h2>
      </div>

      <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">
        {education.hook}
      </p>

      <div className="mt-4 divide-y divide-line">
        {/* Facts section */}
        <FactsRow
          label="About this office"
          icon="info"
          facts={education.facts}
          isOpen={openSection === "facts"}
          onToggle={() => setOpenSection(openSection === "facts" ? null : "facts")}
        />

        {/* Rights section */}
        <FactsRow
          label="Your rights"
          icon="shield"
          facts={education.rights}
          isOpen={openSection === "rights"}
          onToggle={() => setOpenSection(openSection === "rights" ? null : "rights")}
        />
      </div>
    </motion.section>
  );
}

function FactsRow({
  label,
  icon,
  facts,
  isOpen,
  onToggle,
}: {
  label: string;
  icon: string;
  facts: string[];
  isOpen: boolean;
  onToggle: () => void;
}) {
  if (facts.length === 0) return null;

  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        className="pressable-subtle flex min-h-tap w-full items-center justify-between gap-3 py-3 text-left"
        aria-expanded={isOpen}
      >
        <span
          className={cn(
            "text-[14px] font-semibold transition-colors duration-quick ease-out",
            isOpen ? "text-ink" : "text-ink-soft",
          )}
        >
          {label}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 420, damping: 34 }}
          className="shrink-0 text-ink-hint"
        >
          <Icon name="chevron-down" size={16} />
        </motion.span>
      </button>
      <Disclosure open={isOpen}>
        <ul className="space-y-2 pb-3">
          {facts.map((fact, i) => (
            <li key={i} className="flex items-start gap-2 text-[13px] leading-relaxed text-ink-soft">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              {fact}
            </li>
          ))}
        </ul>
      </Disclosure>
    </div>
  );
}
