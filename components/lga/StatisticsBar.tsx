/**
 * Four-cell statistics bar — matches the ratified LGA profile reference:
 * grey icons left of label/value stacks, thin separators, no colour chrome.
 *
 * Values:
 *   Population        → CAOS truth (may be unavailable)
 *   Area              → permanent snapshot
 *   Wards             → permanent snapshot
 *   Polling Units     → permanent snapshot
 *
 * Layout never collapses when live truth is missing.
 */

import { Icon } from "@/presentation/icons/Icon";
import { cn } from "@/lib/cn";
import type { StatCell } from "@/lib/statistics-cells";

export type { StatCell } from "@/lib/statistics-cells";
export { buildStatisticsCells } from "@/lib/statistics-cells";

export function StatisticsBar({ cells }: { cells: StatCell[] }) {
  return (
    <section aria-label="Place statistics" className="w-full">
      <div className="grid grid-cols-4">
        {cells.map((cell, index) => (
          <div
            key={cell.key}
            className={cn(
              "flex min-w-0 items-center gap-2 px-2 py-1",
              index > 0 && "border-l border-slate-200/90",
              index === 0 && "pl-0",
              index === cells.length - 1 && "pr-0",
            )}
          >
            <Icon
              name={cell.icon}
              size={20}
              strokeWidth={1.75}
              className="shrink-0 text-slate-400"
            />
            <div className="min-w-0 leading-none">
              <p className="truncate text-[11px] font-medium text-slate-400">
                {cell.label}
              </p>
              <p
                className={cn(
                  "mt-1 truncate text-[15px] font-bold tabular-nums tracking-tight",
                  cell.unavailable ? "text-slate-300" : "text-slate-800",
                )}
              >
                {cell.display}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
