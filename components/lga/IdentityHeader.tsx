"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import type { PublicRecord } from "@/sdk/contracts";
import { AvatarArt, HeaderArt, SealArt } from "@/presentation/placeholders/art";
import { Icon } from "@/presentation/icons/Icon";
import { fadeIn } from "@/presentation/animations/motion";
import { HomeAction } from "./HomeAction";

/**
 * Identity layer — hero imagery, location chip, seal and place name.
 * Media resolves: projected identity media → placeholder artwork (Founder
 * media doctrine). The place, not the office holder, is the dominant
 * identity. The location line derives from the projected breadcrumb chain;
 * the application names no jurisdiction itself.
 */
export function IdentityHeader({ record }: { record: PublicRecord }) {
  const name = record.display.subject_name;
  const owner = record.display.owner?.name ?? null;
  const headerUrl = record.identity?.header?.locator ?? null;
  const logoUrl = record.identity?.logo?.locator ?? null;
  const seed = name.length + (owner?.length ?? 0);
  // Breadcrumb is root-first: [Nigeria, Owner State, Subject]. The location
  // line under the title reads the chain above the subject, nearest first.
  const lineage = record.display.breadcrumb
    .slice(0, -1)
    .map((b) => b.name)
    .reverse();

  return (
    <motion.header
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="relative h-[22rem] w-full overflow-hidden"
    >
      {headerUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={headerUrl} alt="" className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <HeaderArt seed={seed} />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/45" />

      {/* Top chrome: location chip · search · profile */}
      <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-3 px-4 pt-safe-t">
        <div className="mt-3 flex w-full items-center justify-between gap-3">
          <Link
            href="/explore"
            className="flex min-w-0 items-center gap-2 rounded-chip bg-black/30 px-3.5 py-2 text-sm font-medium text-white backdrop-blur-md transition-colors hover:bg-black/40"
          >
            <Icon name="pin" size={16} />
            <span className="truncate">
              {name}
              {owner ? `, ${owner}` : ""}
            </span>
            <Icon name="chevron-down" size={14} className="shrink-0 opacity-80" />
          </Link>
          <div className="flex shrink-0 items-center gap-2.5">
            <Link
              href="/search"
              aria-label="Search"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-colors hover:bg-white/30"
            >
              <Icon name="search" size={19} />
            </Link>
            <Link
              href="/profile"
              aria-label="Profile"
              className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-white/60"
            >
              <AvatarArt />
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-primary ring-2 ring-white" />
            </Link>
          </div>
        </div>
      </div>

      {/* Set as Home — floats over the hero, above the sheet edge */}
      <div className="absolute bottom-[9.5rem] right-4 z-10">
        <HomeAction slug={record.slug} name={name} onDark />
      </div>

      {/* Identity block: seal + name + state */}
      <div className="absolute inset-x-0 bottom-12 flex items-center gap-4 px-5 py-1">
        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full shadow-lg">
          {logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logoUrl} alt="" className="h-full w-full object-cover" />
          ) : (
            <SealArt label={owner ?? name} />
          )}
        </div>
        <div className="min-w-0">
          <h1 className="text-[2rem] font-extrabold leading-tight text-white drop-shadow-sm">
            {name}
          </h1>
          {lineage.length ? (
            <p className="mt-0.5 text-base text-white/85">{lineage.join(", ")}</p>
          ) : null}
        </div>
      </div>
    </motion.header>
  );
}
