"use client";

/**
 * Recently visited Local Governments — client-only navigation history.
 *
 * The same posture as `home-storage`: a convenience the citizen owns on their
 * own device. The operating system never learns where anyone has been. This
 * is navigation memory only — it holds no constitutional truth, just the
 * place identity the citizen already saw on screen.
 */
const RECENT_KEY = "caos.citizen.recent_lgas";
const LIMIT = 6;

export interface RecentPlace {
  slug: string;
  name: string;
  /** Owning state, when known — disambiguates same-named Local Governments. */
  owner?: string | null;
  /** Epoch millis of the last visit; ordering only. */
  at: number;
}

function read(): RecentPlace[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(RECENT_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (p): p is RecentPlace =>
          !!p &&
          typeof p === "object" &&
          typeof (p as RecentPlace).slug === "string" &&
          typeof (p as RecentPlace).name === "string",
      )
      .slice(0, LIMIT);
  } catch {
    return [];
  }
}

export function getRecentPlaces(): RecentPlace[] {
  return read().sort((a, b) => (b.at ?? 0) - (a.at ?? 0));
}

/** Record a visit. Most recent first, de-duplicated by slug, capped at six. */
export function rememberPlace(place: Omit<RecentPlace, "at">): void {
  if (typeof window === "undefined") return;
  try {
    const next = [
      { ...place, at: Date.now() },
      ...read().filter((p) => p.slug !== place.slug),
    ].slice(0, LIMIT);
    window.localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  } catch {
    /* private mode — history simply not kept */
  }
}

export function clearRecentPlaces(): void {
  try {
    window.localStorage.removeItem(RECENT_KEY);
  } catch {
    /* ignore */
  }
}
