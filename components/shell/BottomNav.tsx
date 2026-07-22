"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

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
      aria-current={active ? "page" : undefined}
      className={cn(
        "pressable relative flex min-h-tap min-w-[64px] flex-col items-center justify-center gap-1 rounded-xl py-1 text-[11px] font-medium transition-colors duration-quick ease-out",
        active ? "text-primary" : "text-ink-faint hover:text-ink-soft",
      )}
    >
      <Icon name={item.icon} size={24} strokeWidth={active ? 2.4 : 2} />
      {item.label}
      {active ? (
        // The indicator slides between tabs — one object moving, not two blinking.
        <motion.span
          layoutId="nav-active-dot"
          transition={{ type: "spring", stiffness: 420, damping: 34 }}
          className="absolute -bottom-0.5 h-1 w-1 rounded-full bg-primary"
          aria-hidden="true"
        />
      ) : null}
    </Link>
  );
}

/**
 * Primary navigation — a translucent material floating over the content,
 * never an opaque strip. Content scrolls beneath it.
 */
export function BottomNav() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" || pathname.startsWith("/lga") : pathname.startsWith(href);

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 mx-auto w-full max-w-md rounded-t-3xl border-t border-white/60 bg-surface/85 pb-safe-b shadow-nav backdrop-blur-xl"
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
          className="pressable relative -top-6 mx-2 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/30 ring-4 ring-surface"
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
