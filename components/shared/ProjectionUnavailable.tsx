import { EmptyState } from "@/components/ui/EmptyState";

/** Designed state for when the record surface itself is unreachable. */
export function ProjectionUnavailable() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center bg-surface-sunken pb-24">
      <EmptyState
        icon="map"
        tone="primary"
        title="The record is temporarily unavailable"
        body="We couldn't reach the constitutional record right now. Please try again shortly — nothing is lost; the record rebuilds itself from admitted sources."
      />
    </div>
  );
}
