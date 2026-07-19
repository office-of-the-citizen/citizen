"use client";

/**
 * Home LGA persistence — client-only preference storage.
 * The OS never learns which community a citizen calls home.
 */
const HOME_KEY = "caos.citizen.home_lga_slug";
const HOME_NAME_KEY = "caos.citizen.home_lga_name";

export function getHomeLga(): { slug: string; name: string | null } | null {
  if (typeof window === "undefined") return null;
  try {
    const slug = window.localStorage.getItem(HOME_KEY);
    if (!slug) return null;
    return { slug, name: window.localStorage.getItem(HOME_NAME_KEY) };
  } catch {
    return null;
  }
}

export function setHomeLga(slug: string, name: string): void {
  try {
    window.localStorage.setItem(HOME_KEY, slug);
    window.localStorage.setItem(HOME_NAME_KEY, name);
  } catch {
    /* private mode — home simply not persisted */
  }
}

export function clearHomeLga(): void {
  try {
    window.localStorage.removeItem(HOME_KEY);
    window.localStorage.removeItem(HOME_NAME_KEY);
  } catch {
    /* ignore */
  }
}
