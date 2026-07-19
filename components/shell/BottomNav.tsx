"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/cn";
import { Icon } from "@/presentation/icons/Icon";
import type { IconAlias } from "@/presentation/icons/registry";

interface NavItem {
  href: string;
  label: string;
  icon: IconAlias;
}

const LEFT: NavItem[] = [
  { href: "/", label: "Home", icon: "home" },
  { href: "/explore", label: "Explore", icon: "explore" },
];

const RIGHT: NavItem[] = [
  { href: "/alerts", label: "Alerts", icon: "alerts" },
  { href: "/profile", label: "Profile", icon: "profile" },
];

function NavLink({ item, active }: { item: NavItem; active: boolean }) {
  return (
    <Link
      href={item.href}
      className={cn(
        "flex min-w-[64px] flex-col items-center gap-1 py-1 text-[11px] font-medium transition-colors",
        active ? "text-primary" : "text-ink-faint hover:text-ink-soft",
      )}
    >
      <Icon name={item.icon} size={24} strokeWidth={active ? 2.4 : 2} />
      {item.label}
    </Link>
  );
}

export function BottomNav() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" || pathname.startsWith("/lga") : pathname.startsWith(href);

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 mx-auto w-full max-w-md rounded-t-3xl bg-surface pb-safe-b shadow-nav"
    >
      <div className="relative flex items-end justify-between px-6 pb-2 pt-3">
        <div className="flex flex-1 justify-around">
          {LEFT.map((item) => (
            <NavLink key={item.href} item={item} active={isActive(item.href)} />
          ))}
        </div>

        <Link
          href="/search"
          aria-label="Search"
          className="relative -top-6 mx-2 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/30 ring-4 ring-surface transition-transform active:scale-95"
        >
          <Icon name="search" size={26} />
        </Link>

        <div className="flex flex-1 justify-around">
          {RIGHT.map((item) => (
            <NavLink key={item.href} item={item} active={isActive(item.href)} />
          ))}
        </div>
      </div>
    </nav>
  );
}
