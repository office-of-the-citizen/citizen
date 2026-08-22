/**
 * Portrait locator on a relationship context entry.
 *
 * `portrait_url` is emitted by CAOS on RELATIONSHIPS context entries, but it
 * was added to `ContextEntrySchema` after the SDK tag this application pins
 * (`caos-sdk#v0.6.0`), so the pinned type does not declare it. Reading it
 * through this accessor keeps the application working with both the pinned
 * contract and any later one, and keeps the "may be absent" fact in a single
 * place instead of scattered casts.
 *
 * Delete this and read `entry.portrait_url` directly once the pin advances to
 * an SDK release that models the field.
 */
export function portraitLocator(entry: unknown): string | null {
  if (!entry || typeof entry !== "object") return null;
  const value = (entry as { portrait_url?: unknown }).portrait_url;
  return typeof value === "string" && value.length > 0 ? value : null;
}
