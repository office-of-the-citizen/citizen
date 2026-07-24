/**
 * Office registry — the single source of truth for which offices exist and
 * how they are configured. Maps (level, slug) pairs to OfficeConfig objects.
 *
 * This is presentation configuration, not constitutional truth. When CAOS
 * Engine begins projecting office records, the registry will be populated
 * from ProjectionSource instead of static data.
 */
import type { OfficeConfig, OfficeLevel } from "./types";
import { FEDERAL_OFFICES } from "./data/federal";
import { STATE_OFFICES } from "./data/state";
import { LOCAL_OFFICES } from "./data/local";

const BY_LEVEL: Record<OfficeLevel, Record<string, OfficeConfig>> = {
  federal: FEDERAL_OFFICES,
  state: STATE_OFFICES,
  local: LOCAL_OFFICES,
};

/** Resolve an office config by level and slug. Returns null if not found. */
export function getOfficeConfig(level: string, slug: string): OfficeConfig | null {
  const offices = BY_LEVEL[level as OfficeLevel];
  if (!offices) return null;
  return offices[slug] ?? null;
}

/** All offices at a given level, in registry order. */
export function getOfficesByLevel(level: OfficeLevel): OfficeConfig[] {
  return Object.values(BY_LEVEL[level] ?? {});
}

/** Every office across all levels. */
export function getAllOffices(): OfficeConfig[] {
  return [
    ...getOfficesByLevel("federal"),
    ...getOfficesByLevel("state"),
    ...getOfficesByLevel("local"),
  ];
}
