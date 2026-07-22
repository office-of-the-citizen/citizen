import { EmptyState } from "@/components/ui/EmptyState";

/** Designed state for when the projection surface itself is unreachable. */
export function ProjectionUnavailable() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center bg-surface-sunken pb-24">
      <EmptyState
        icon="map"
        tone="primary"
        title="The public record is unreachable"
        body="We couldn’t load the national record right now. Please try again shortly — nothing is lost; the record is rebuilt from constitutional truth."
      />
    </div>
  );
}
