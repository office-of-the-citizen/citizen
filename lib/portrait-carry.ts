import type { PublicRecord } from "@/sdk/contracts";

/**
 * Re-attach relationship portraits across the contract boundary.
 *
 * CAOS emits `portrait_url` on RELATIONSHIPS context entries, but the SDK
 * contract this application pins (`caos-sdk#v0.6.0`) does not model the field
 * yet — and a zod object schema silently strips keys it does not declare. So
 * a valid parse quietly throws the portraits away.
 *
 * The application does not invent the value and does not reshape the record:
 * it copies a locator the operating system already published back onto the
 * parsed entry, matched by position. Delete this once the pin advances to an
 * SDK release that declares `portrait_url`.
 */
export function withPortraits(parsed: PublicRecord, raw: unknown): PublicRecord {
  const rawContext = (raw as { context?: unknown })?.context;
  if (!Array.isArray(rawContext)) return parsed;
  parsed.context.forEach((entry, i) => {
    if ("portrait_url" in entry) return; // Contract already carries it.
    const locator = (rawContext[i] as { portrait_url?: unknown } | undefined)?.portrait_url;
    if (typeof locator === "string" && locator.length > 0) {
      (entry as { portrait_url?: string | null }).portrait_url = locator;
    }
  });
  return parsed;
}
