import type { Metadata } from "next";

import { EmptyState } from "@/components/ui/EmptyState";

export const metadata: Metadata = { title: "Alerts" };

/**
 * Alerts v1 stub — a designed forward-promise, not a fake feed. Alerts will
 * be generated from constitutional activity on the citizen's Home LGA.
 */
export default function AlertsPage() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-surface-sunken px-4 pb-32 pt-safe-t">
      <h1 className="pt-8 text-2xl font-extrabold tracking-display text-ink">Alerts</h1>
      <EmptyState
        icon="alerts"
        tone="primary"
        title="Quiet, for now"
        body="When your Home Local Government’s public record changes — a budget admitted, a chairman changed, a project updated — you’ll hear about it here."
        className="mt-16"
      />
    </div>
  );
}
