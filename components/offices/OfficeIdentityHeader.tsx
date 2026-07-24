"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import type { OfficeConfig } from "@/presentation/offices/types";
import { LEVEL_LABELS } from "@/presentation/offices/types";
import { OfficeHeaderArt, InstitutionSealArt } from "@/presentation/placeholders/art";
import { Icon } from "@/presentation/icons/Icon";
import { fadeIn } from "@/presentation/animations/motion";

/**
 * Office identity header — mirrors the LGA IdentityHeader pattern.
 * Institution seal, office title, level chip, and a back navigation link.
 * The hero artwork is tinted per government level.
 */
export function OfficeIdentityHeader({ office }: { office: OfficeConfig }) {
  const seed = office.title.length;
  const levelLabel = LEVEL_LABELS[office.level];

  return (
    <motion.header
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="relative h-[20rem] w-full overflow-hidden"
    >
      <OfficeHeaderArt level={office.level} seed={seed} />
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/45" />

      {/* Top bar — back link + level chip */}
      <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-3 px-4 pt-safe-t">
        <div className="mt-3 flex w-full items-center justify-between gap-3">
          <Link
            href="/offices"
            className="pressable flex min-h-[40px] min-w-0 items-center gap-2 rounded-chip bg-black/30 px-3.5 py-2 text-sm font-medium text-white backdrop-blur-md transition-colors duration-quick ease-out hover:bg-black/40"
          >
            <Icon name="landmark" size={16} />
            <span className="truncate">Public Offices</span>
            <Icon name="chevron-down" size={14} className="shrink-0 opacity-80" />
          </Link>
          <div className="flex shrink-0 items-center gap-2.5">
            <Link
              href="/search"
              aria-label="Search"
              className="pressable flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-colors duration-quick ease-out hover:bg-white/30"
            >
              <Icon name="search" size={19} />
            </Link>
            <Link
              href="/profile"
              aria-label="Profile"
              className="pressable flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-colors duration-quick ease-out hover:bg-white/30"
            >
              <Icon name="profile" size={19} />
            </Link>
          </div>
        </div>
      </div>

      {/* Institution seal + office title */}
      <div className="absolute inset-x-0 bottom-12 flex items-center gap-4 px-5 py-1">
        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full shadow-lg">
          <InstitutionSealArt label={office.institution} level={office.level} />
        </div>
        <div className="min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-label text-white/70">
            {levelLabel}
          </p>
          <h1 className="text-[1.75rem] font-extrabold leading-tight tracking-display text-white drop-shadow-sm">
            {office.shortTitle}
          </h1>
          <p className="mt-0.5 text-sm text-white/80">{office.institution}</p>
        </div>
      </div>
    </motion.header>
  );
}
