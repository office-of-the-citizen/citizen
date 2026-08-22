"use client";

/**
 * Jump back in — the places this citizen has already opened, plus their Home.
 *
 * Pure navigation memory rendered from the device. It asserts nothing about
 * any record; it only shortens the walk back to a place already visited.
 */
import { useEffect, useState } from "react";
import Link from "next/link";

import { getRecentPlaces, type RecentPlace } from "@/lib/recent-storage";
import { getHomeLga } from "@/lib/home-storage";
import { Icon } from "@/presentation/icons/Icon";
import { cn } from "@/lib/cn";

export function RecentPlaces({
  title = "Jump back in",
  className,
}: {
  title?: string;
  className?: string;
}) {
  const [places, setPlaces] = useState<RecentPlace[] | null>(null);
  const [homeSlug, setHomeSlug] = useState<string | null>(null);

  useEffect(() => {
    const home = getHomeLga();
    setHomeSlug(home?.slug ?? null);
    // Home always leads, even before it has been visited on this device.
    // `getRecentPlaces` is already sorted, so Home is prepended after sorting.
    const recent = getRecentPlaces();
    const merged =
      home && !recent.some((p) => p.slug === home.slug)
        ? [{ slug: home.slug, name: home.name ?? home.slug, at: 0 }, ...recent]
        : recent;
    setPlaces(merged);
  }, []);

  if (!places || places.length === 0) return null;

  return (
    <section className={cn("", className)} aria-label={title}>
      <h2 className="mb-1.5 px-1 text-xs font-bold uppercase tracking-wide text-ink-faint">
        {title}
      </h2>
      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 py-1">
        {places.map((place) => {
          const isHome = place.slug === homeSlug;
          return (
            <Link
              key={place.slug}
              href={`/lga/${place.slug}`}
              className="pressable flex min-h-tap shrink-0 items-center gap-2 rounded-chip bg-surface px-3.5 py-2 text-[13px] font-semibold text-ink shadow-card transition-colors duration-quick ease-out active:bg-primary-soft"
            >
              <Icon
                name={isHome ? "home" : "clock"}
                size={14}
                className={isHome ? "text-primary" : "text-ink-faint"}
              />
              <span className="max-w-[10rem] truncate">{place.name}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
