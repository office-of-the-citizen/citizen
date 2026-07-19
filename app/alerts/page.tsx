import type { Metadata } from "next";

import { Icon } from "@/presentation/icons/Icon";

export const metadata: Metadata = { title: "Alerts" };

/**
 * Alerts v1 stub — a designed forward-promise, not a fake feed. Alerts will
 * be generated from constitutional activity on the citizen's Home LGA.
 */
export default function AlertsPage() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-surface-sunken px-4 pb-32 pt-safe-t">
      <h1 className="pt-8 text-2xl font-extrabold text-ink">Alerts</h1>
      <div className="mt-16 flex flex-col items-center px-6 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-primary-soft text-primary">
          <Icon name="alerts" size={30} />
        </span>
        <h2 className="mt-5 text-lg font-bold text-ink">Quiet, for now</h2>
        <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-ink-soft">
          When your Home Local Government’s public record changes — a budget admitted, a chairman
          changed, a project updated — you’ll hear about it here.
        </p>
      </div>
    </div>
  );
}
