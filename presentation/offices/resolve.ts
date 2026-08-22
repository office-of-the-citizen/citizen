/**
 * Resolve an office URL from a relationship context entry.
 *
 * Maps the projection's relationship labels (President, Governor, Senator,
 * Representative, Chairman) to the corresponding office profile route.
 *
 * This is the bridge between the LGA page's "People responsible for this LGA"
 * and the office profile pages — every relationship card becomes a doorway.
 */
import type { ContextEntry } from "@office-of-the-citizen/caos-sdk";

/** Map a relationship label to an office route segment. */
const LABEL_TO_OFFICE: Record<string, { level: string; slug: string }> = {
  president:        { level: "federal", slug: "president" },
  governor:         { level: "state",   slug: "governor" },
  senator:          { level: "federal", slug: "senate" },
  representative:   { level: "federal", slug: "house" },
  chairman:         { level: "local",   slug: "chairman" },
};

/**
 * Resolve the office profile URL for a relationship entry.
 * Returns null if the label doesn't map to a known office.
 *
 * @param entry   The context entry from the projection
 * @param lgaSlug Optional LGA slug for "from" context in the URL
 */
export function resolveOfficeUrl(entry: ContextEntry, lgaSlug?: string): string | null {
  const label = (entry.label || "").toLowerCase().trim();
  const mapping = LABEL_TO_OFFICE[label];
  if (!mapping) return null;

  const base = `/offices/${mapping.level}/${mapping.slug}`;

  // Build query params for context
  const params = new URLSearchParams();
  if (lgaSlug) params.set("from", lgaSlug);
  if (entry.detail) params.set("district", entry.detail);

  const qs = params.toString();
  return qs ? `${base}?${qs}` : base;
}
