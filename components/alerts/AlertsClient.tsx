"use client";

/**
 * Alerts — a designed forward-promise, never a fabricated feed.
 *
 * The application does not invent activity. What it can honestly show today
 * is *what it is watching on this device*: the citizen's Home Local
 * Government, and the places they have opened. Until CAOS publishes change
 * events, the page says so plainly and gives the citizen somewhere to go.
 */
import { useEffect, useState } from "react";
import Link from "next/link";

import { getHomeLga } from "@/lib/home-storage";
import { getRecentPlaces, type RecentPlace } from "@/lib/recent-storage";
import { EmptyState } from "@/components/ui/EmptyState";
import { Icon } from "@/presentation/icons/Icon";

export function AlertsClient() {
  const [home, setHome] = useState<{ slug: string; name: string | null } | null>(null);
  const [recent, setRecent] = useState<RecentPlace[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setHome(getHomeLga());
    setRecent(getRecentPlaces());
    setLoaded(true);
  }, []);

  const watching = home
    ? recent.filter((p) => p.slug !== home.slug)
    : recent;

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-surface-sunken px-4 pb-32 pt-safe-t">
      <h1 className="pt-8 text-2xl font-extrabold tracking-display text-ink">Alerts</h1>
      <p className="mt-1 text-sm text-ink-soft">
        Changes to the public record of the places you follow.
      </p>

      {!loaded ? null : (
        <>
          <EmptyState
            icon="alerts"
            tone="primary"
            title="Quiet, for now"
            body="When a Local Government you follow changes — a budget admitted, a chairman changed, a project updated — you’ll hear about it here. Nothing is invented in the meantime."
            className="mt-12"
          />

          <section className="mt-12" aria-label="What you are following">
            <h2 className="mb-2 px-1 text-xs font-bold uppercase tracking-wide text-ink-faint">
              You’re following
            </h2>

            {home ? (
              <FollowRow
                slug={home.slug}
                name={home.name ?? home.slug}
                caption="Your Home Local Government"
                icon="home"
              />
            ) : (
              <div className="rounded-card bg-surface p-4 shadow-card">
                <p className="text-sm text-ink-soft">
                  Choose a Home Local Government and it will be the first place
                  you hear about.
                </p>
                <Link
                  href="/explore"
                  className="pressable mt-3 flex min-h-tap items-center justify-center rounded-chip bg-primary py-2.5 text-center text-[13px] font-bold text-white"
                >
                  Discover where you belong
                </Link>
              </div>
            )}

            {watching.length ? (
              <div className="mt-2 space-y-2">
                {watching.map((place) => (
                  <FollowRow
                    key={place.slug}
                    slug={place.slug}
                    name={place.name}
                    caption={place.owner ?? "Recently opened"}
                    icon="clock"
                  />
                ))}
              </div>
            ) : null}
          </section>

          <Link
            href="/participate"
            className="pressable-subtle mt-6 flex items-center gap-3 rounded-card bg-surface p-4 shadow-card"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary-soft text-primary">
              <Icon name="hand-raise" size={19} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[15px] font-bold text-ink">
                Waiting is not the only option
              </span>
              <span className="mt-0.5 block text-[13px] leading-relaxed text-ink-soft">
                Ask a question or request information — and the record changes.
              </span>
            </span>
            <Icon name="chevron-right" size={16} className="shrink-0 text-ink-faint" />
          </Link>
        </>
      )}
    </div>
  );
}

function FollowRow({
  slug,
  name,
  caption,
  icon,
}: {
  slug: string;
  name: string;
  caption: string;
  icon: "home" | "clock";
}) {
  return (
    <Link
      href={`/lga/${slug}`}
      className="pressable-subtle flex min-h-tap items-center gap-3 rounded-card bg-surface px-4 py-3 shadow-card"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
        <Icon name={icon} size={16} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[15px] font-bold text-ink">{name}</span>
        <span className="block truncate text-xs text-ink-soft">{caption}</span>
      </span>
      <Icon name="chevron-right" size={16} className="shrink-0 text-ink-faint" />
    </Link>
  );
}
