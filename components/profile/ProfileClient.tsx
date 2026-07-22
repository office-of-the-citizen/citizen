"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { clearHomeLga, getHomeLga } from "@/lib/home-storage";
import { AvatarArt } from "@/presentation/placeholders/art";
import { Icon } from "@/presentation/icons/Icon";

/** Profile v1 — manage the Home Local Government. No accounts, no tracking. */
export function ProfileClient() {
  const [home, setHome] = useState<{ slug: string; name: string | null } | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setHome(getHomeLga());
    setLoaded(true);
  }, []);

  return (
    <div className="mx-auto min-h-screen w-full max-w-md bg-surface-sunken px-4 pb-32 pt-safe-t">
      <h1 className="pt-8 text-2xl font-extrabold tracking-display text-ink">Profile</h1>

      <div className="mt-6 flex items-center gap-4 rounded-card bg-surface p-4 shadow-card">
        <span className="h-14 w-14 shrink-0 overflow-hidden rounded-full">
          <AvatarArt />
        </span>
        <div>
          <p className="text-base font-bold text-ink">Citizen</p>
          <p className="text-xs text-ink-soft">
            No account needed. Your choices stay on this device.
          </p>
        </div>
      </div>

      <h2 className="mt-7 px-1 text-xs font-bold uppercase tracking-wide text-ink-faint">
        Home Local Government
      </h2>
      {!loaded ? null : home ? (
        <div className="mt-2 rounded-card bg-surface p-4 shadow-card">
          <div className="flex items-center justify-between gap-3">
            <span className="flex min-w-0 items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <Icon name="home" size={18} />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[15px] font-bold text-ink">
                  {home.name ?? home.slug}
                </span>
                <span className="block text-xs text-ink-soft">Opens when you launch the app</span>
              </span>
            </span>
            <Link href={`/lga/${home.slug}`} aria-label="Open your Home Local Government">
              <Icon name="chevron-right" size={18} className="text-ink-faint" />
            </Link>
          </div>
          <div className="mt-3 flex gap-2 border-t border-line pt-3">
            <Link
              href="/explore"
              className="pressable flex min-h-tap flex-1 items-center justify-center rounded-chip bg-primary-soft py-2 text-center text-[13px] font-bold text-primary-deep"
            >
              Change
            </Link>
            <button
              type="button"
              onClick={() => {
                clearHomeLga();
                setHome(null);
              }}
              className="pressable flex min-h-tap flex-1 items-center justify-center rounded-chip bg-surface-sunken py-2 text-center text-[13px] font-bold text-ink-soft"
            >
              Clear
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-2 rounded-card bg-surface p-4 shadow-card">
          <p className="text-sm text-ink-soft">
            You haven’t chosen a Home Local Government yet.
          </p>
          <Link
            href="/explore"
            className="pressable mt-3 flex min-h-tap items-center justify-center rounded-chip bg-primary py-2.5 text-center text-[13px] font-bold text-white"
          >
            Discover where you belong
          </Link>
        </div>
      )}

      <p className="mt-10 text-center text-[10px] leading-relaxed text-ink-faint">
        Every fact in this application is rendered from a governed public record.
        <br />
        Where the record is silent, this application says so.
      </p>
    </div>
  );
}
