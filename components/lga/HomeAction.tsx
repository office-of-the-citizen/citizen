"use client";

import { useEffect, useState } from "react";

import { getHomeLga, setHomeLga } from "@/lib/home-storage";
import { Icon } from "@/presentation/icons/Icon";
import { cn } from "@/lib/cn";

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

  const chip = "flex items-center gap-1 whitespace-nowrap rounded-chip text-[11px] font-bold";

  if (isHome === null) return <span className="h-7" aria-hidden="true" />;

  return isHome ? (
    <span
      className={cn(
        chip,
        onDark
          ? "bg-white/20 px-3 py-1.5 text-white backdrop-blur-md"
          : "bg-primary-soft px-2.5 py-1 text-primary-deep",
      )}
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
      className={cn(
        chip,
        "pressable transition-colors duration-quick ease-out",
        onDark
          ? "bg-white/20 px-3 py-1.5 text-white backdrop-blur-md hover:bg-white/30"
          : "border border-primary/40 px-2.5 py-1 text-primary hover:bg-primary-soft",
      )}
    >
      <Icon name="home" size={12} strokeWidth={2.6} />
      Set as Home
    </button>
  );
}
