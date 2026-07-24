"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import type { OfficeMetricGroup, OfficeMetric } from "@/presentation/offices/types";
import { Icon } from "@/presentation/icons/Icon";
import { Disclosure } from "@/components/ui/Disclosure";
import { cn } from "@/lib/cn";

/**
 * Office metrics grid — mirrors the StatisticsBar pattern but for office
 * evidence metrics. Each group renders as an expandable section with
 * individual metric cells. Unavailable metrics show reason text.
 */
export function OfficeMetricsGrid({
  groups,
}: {
  groups: OfficeMetricGroup[];
}) {
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  if (groups.length === 0) return null;

  return (
    <motion.section
      layout
      className="rounded-card bg-surface p-4 shadow-card"
    >
      <h2 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-label text-ink-soft">
        <Icon name="chart-bar" size={16} className="text-ink-hint" />
        Office Metrics
      </h2>

      <div className="space-y-2">
        {groups.map((group) => {
          const isOpen = openGroup === group.title;
          const availableCount = group.metrics.filter((m) => m.status === "available").length;

          return (
            <div key={group.title} className="rounded-2xl bg-surface-sunken">
              <button
                type="button"
                onClick={() => setOpenGroup(isOpen ? null : group.title)}
                aria-expanded={isOpen}
                className="pressable-subtle flex w-full items-center justify-between gap-3 px-3.5 py-3 text-left"
              >
                <div className="flex items-center gap-2.5">
                  <Icon name={group.icon} size={16} className="text-ink-hint" />
                  <span className="text-sm font-bold text-ink">{group.title}</span>
                  {availableCount > 0 && (
                    <span className="text-[11px] font-medium text-status-verified">
                      {availableCount}/{group.metrics.length}
                    </span>
                  )}
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
                  <div className="grid grid-cols-2 gap-2">
                    {group.metrics.map((metric) => (
                      <MetricCard key={metric.key} metric={metric} />
                    ))}
                  </div>
                </div>
              </Disclosure>
            </div>
          );
        })}
      </div>
    </motion.section>
  );
}

function MetricCard({ metric }: { metric: OfficeMetric }) {
  const [expanded, setExpanded] = useState(false);
  const hasBreakdown = metric.breakdown && metric.breakdown.length > 0;
  const isAvailable = metric.status === "available";

  return (
    <button
      type="button"
      onClick={() => hasBreakdown && setExpanded((v) => !v)}
      className={cn(
        "pressable-subtle rounded-2xl bg-surface p-3 text-left transition-shadow duration-quick ease-out",
        hasBreakdown && "hover:shadow-card",
      )}
    >
      <div className="flex items-start gap-2">
        <Icon
          name={metric.icon}
          size={16}
          className={cn(
            "mt-0.5 shrink-0",
            isAvailable ? "text-status-verified" : "text-ink-faint",
          )}
        />
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-medium text-ink-faint">{metric.label}</p>
          {isAvailable ? (
            <p className="mt-0.5 text-[15px] font-bold tabular-nums text-ink">
              {metric.value}
            </p>
          ) : (
            <p className="mt-0.5 text-[12px] font-semibold text-ink-hint">
              {metric.status === "unavailable" ? "Unavailable" : "Pending"}
            </p>
          )}
        </div>
      </div>

      {hasBreakdown && (
        <Disclosure open={expanded}>
          <div className="mt-2 space-y-1 border-t border-line pt-2">
            {metric.breakdown!.map((b) => (
              <div key={b.label} className="flex items-center justify-between text-[11px]">
                <span className="text-ink-faint">{b.label}</span>
                <span className="font-semibold tabular-nums text-ink-soft">{b.value}</span>
              </div>
            ))}
          </div>
        </Disclosure>
      )}

      {!isAvailable && metric.unavailableReason && (
        <p className="mt-1.5 text-[10px] leading-relaxed text-ink-faint">
          {metric.unavailableReason}
        </p>
      )}
    </button>
  );
}
