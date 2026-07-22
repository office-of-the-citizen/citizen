"use client";

/**
 * WatchButton — toggle watching a governed object.
 *
 * A simple toggle: "Watch" to begin following a constitutional object,
 * "Watching" to confirm the subscription is active. Teaches the citizen
 * that they can monitor what matters to them.
 */
import { useState } from "react";
import { participationSource } from "@/sdk/participation";
import { Icon } from "@/presentation/icons/Icon";
import { cn } from "@/lib/cn";

interface WatchButtonProps {
  /** The CRN of the governed object to watch. */
  crn: string;
  /** Scope of the watch — what level to observe. */
  scope: string;
}

export function WatchButton({ crn, scope }: WatchButtonProps) {
  const [watching, setWatching] = useState(false);
  const [watchId, setWatchId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function toggle() {
    if (loading) return;
    setLoading(true);
    try {
      const source = participationSource();
      if (watching && watchId) {
        await source.removeWatch(watchId);
        setWatching(false);
        setWatchId(null);
      } else {
        const result = await source.watchObject(crn, scope);
        setWatching(result.active);
        setWatchId(result.watch_id);
      }
    } catch {
      // Silently fail — the watch toggle is a convenience, not a governed action.
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={loading}
      className={cn(
        "pressable-subtle inline-flex min-h-tap items-center gap-1.5 rounded-chip px-3.5 py-2",
        "text-[12px] font-bold transition-colors duration-quick ease-out",
        watching
          ? "bg-primary-soft text-primary"
          : "bg-surface-sunken text-ink-soft hover:bg-primary-soft/50 hover:text-primary",
        loading && "opacity-60",
      )}
    >
      <Icon name="eye" size={14} />
      {watching ? "Watching" : "Watch"}
    </button>
  );
}
