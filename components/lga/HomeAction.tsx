"use client";

import { useEffect, useState } from "react";

import { getHomeLga, setHomeLga } from "@/lib/home-storage";
import { Icon } from "@/presentation/icons/Icon";

/** “Set as Home” — client-only preference; the OS never learns it. */
export function HomeAction({
  slug,
  name,
  onDark = false,
}: {
  slug: string;
  name: string;
  onDark?: boolean;
}) {
  const [isHome, setIsHome] = useState<boolean | null>(null);

  useEffect(() => {
    setIsHome(getHomeLga()?.slug === slug);
  }, [slug]);

  if (isHome === null) return <span className="h-7" aria-hidden="true" />;

  return isHome ? (
    <span
      className={
        onDark
          ? "flex items-center gap-1 whitespace-nowrap rounded-chip bg-white/20 px-3 py-1.5 text-[11px] font-bold text-white backdrop-blur-md"
          : "flex items-center gap-1 whitespace-nowrap rounded-chip bg-primary-soft px-2.5 py-1 text-[11px] font-bold text-primary-deep"
      }
    >
      <Icon name="home" size={12} strokeWidth={2.6} />
      Home
    </span>
  ) : (
    <button
      type="button"
      onClick={() => {
        setHomeLga(slug, name);
        setIsHome(true);
      }}
      className={
        onDark
          ? "flex items-center gap-1 whitespace-nowrap rounded-chip bg-white/20 px-3 py-1.5 text-[11px] font-bold text-white backdrop-blur-md transition-colors hover:bg-white/30"
          : "flex items-center gap-1 whitespace-nowrap rounded-chip border border-primary/40 px-2.5 py-1 text-[11px] font-bold text-primary transition-colors hover:bg-primary-soft"
      }
    >
      <Icon name="home" size={12} strokeWidth={2.6} />
      Set as Home
    </button>
  );
}
