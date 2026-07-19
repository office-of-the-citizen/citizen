import { Icon } from "@/presentation/icons/Icon";

/** Designed state for when the projection surface itself is unreachable. */
export function ProjectionUnavailable() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center bg-surface-sunken px-8 pb-24 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-soft text-primary">
        <Icon name="map" size={26} />
      </span>
      <h1 className="mt-4 text-lg font-bold text-ink">The public record is unreachable</h1>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
        We couldn’t load the national record right now. Please try again shortly — nothing is
        lost; the record is rebuilt from constitutional truth.
      </p>
    </div>
  );
}
