"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import type { OfficeResponsibility } from "@/presentation/offices/types";
import { Icon } from "@/presentation/icons/Icon";
import { Disclosure } from "@/components/ui/Disclosure";

const CATEGORY_META: Record<
  string,
  { icon: string; colour: string }
> = {
  constitutional: { icon: "scale", colour: "text-status-verified" },
  statutory: { icon: "building", colour: "text-status-pending" },
  conventional: { icon: "star", colour: "text-status-contested" },
};

/**
 * Responsibilities section — accordion of constitutional, statutory, and
 * conventional duties with citations. Uses Disclosure for progressive disclosure.
 */
export function ResponsibilitiesSection({
  responsibilities,
}: {
  responsibilities: OfficeResponsibility[];
}) {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  if (responsibilities.length === 0) return null;

  return (
    <motion.section
      layout
      className="rounded-card bg-surface p-4 shadow-card"
    >
      <h2 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-label text-ink-soft">
        <Icon name="scale" size={16} className="text-ink-hint" />
        Responsibilities
      </h2>

      <div className="space-y-2">
        {responsibilities.map((group) => {
          const meta = CATEGORY_META[group.category] ?? { icon: "document", colour: "text-ink-hint" };
          const isOpen = openCategory === group.category;

          return (
            <div key={group.category} className="rounded-2xl bg-surface-sunken">
              <button
                type="button"
                onClick={() => setOpenCategory(isOpen ? null : group.category)}
                aria-expanded={isOpen}
                className="pressable-subtle flex w-full items-center justify-between gap-3 px-3.5 py-3 text-left"
              >
                <div className="flex items-center gap-2.5">
                  <Icon name={meta.icon as any} size={16} className={meta.colour} />
                  <span className="text-sm font-bold text-ink">{group.label}</span>
                  <span className="text-[11px] font-medium text-ink-faint">
                    {group.items.length}
                  </span>
                </div>
                <motion.span
                  animate={{ rotate: isOpen ? 90 : 0 }}
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  className="shrink-0 text-ink-hint"
                >
                  <Icon name="chevron-right" size={16} />
                </motion.span>
              </button>

              <Disclosure open={isOpen}>
                <div className="px-3.5 pb-3">
                  <ul className="space-y-2">
                    {group.items.map((item, i) => (
                      <li key={i} className="text-[13px] leading-relaxed text-ink-soft">
                        <p className="font-medium text-ink">{item.title}</p>
                        {item.description && (
                          <p className="mt-0.5 text-ink-soft">{item.description}</p>
                        )}
                        {item.citation && (
                          <p className="mt-1 text-[11px] italic text-ink-faint">
                            {item.citation}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </Disclosure>
            </div>
          );
        })}
      </div>
    </motion.section>
  );
}
