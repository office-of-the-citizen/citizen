"use client";

/**
 * Share this place — the public record travels.
 *
 * Uses the device share sheet where it exists, and falls back to copying the
 * link. Nothing is sent anywhere by the application itself; the citizen
 * decides where the link goes.
 */
import { useCallback, useEffect, useState } from "react";

import { Icon } from "@/presentation/icons/Icon";
import { cn } from "@/lib/cn";

type Posture = "idle" | "copied" | "failed";

export function ShareAction({
  slug,
  name,
  owner,
  onDark = false,
}: {
  slug: string;
  name: string;
  owner?: string | null;
  onDark?: boolean;
}) {
  const [posture, setPosture] = useState<Posture>("idle");

  useEffect(() => {
    if (posture === "idle") return;
    const timer = setTimeout(() => setPosture("idle"), 2000);
    return () => clearTimeout(timer);
  }, [posture]);

  const share = useCallback(async () => {
    const url = `${window.location.origin}/lga/${slug}`;
    const title = owner ? `${name}, ${owner}` : name;
    const text = `The public record of ${title}.`;
    try {
      if (typeof navigator.share === "function") {
        await navigator.share({ title, text, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setPosture("copied");
    } catch (err) {
      // A cancelled share sheet is not a failure — only report real ones.
      if (err instanceof DOMException && err.name === "AbortError") return;
      setPosture("failed");
    }
  }, [slug, name, owner]);

  return (
    <button
      type="button"
      onClick={share}
      aria-label={`Share ${name}`}
      className={cn(
        "pressable flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-quick ease-out",
        onDark
          ? "bg-white/20 text-white backdrop-blur-md hover:bg-white/30"
          : "bg-primary-soft text-primary hover:bg-primary-soft/80",
      )}
    >
      <Icon name={posture === "copied" ? "check" : "arrow-up-right"} size={18} />
      <span role="status" aria-live="polite" className="sr-only">
        {posture === "copied"
          ? "Link copied"
          : posture === "failed"
            ? "Could not share this link"
            : ""}
      </span>
    </button>
  );
}
