/** Presentation-only formatting. Never invents facts — formats projected ones. */

export function formatDateLong(iso: string | null | undefined): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export function formatDateShort(iso: string | null | undefined): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

/** ₦5.42 Billion style headline figure. */
export function formatNairaCompact(amount: number): string {
  const abs = Math.abs(amount);
  if (abs >= 1e12) return `₦${(amount / 1e12).toFixed(2)} Trillion`;
  if (abs >= 1e9) return `₦${(amount / 1e9).toFixed(2)} Billion`;
  if (abs >= 1e6) return `₦${(amount / 1e6).toFixed(2)} Million`;
  return `₦${amount.toLocaleString("en-NG")}`;
}

/** ₦3.36B style legend figure. */
export function formatNairaShort(amount: number): string {
  const abs = Math.abs(amount);
  if (abs >= 1e12) return `₦${(amount / 1e12).toFixed(2)}T`;
  if (abs >= 1e9) return `₦${(amount / 1e9).toFixed(2)}B`;
  if (abs >= 1e6) return `₦${(amount / 1e6).toFixed(1)}M`;
  return `₦${amount.toLocaleString("en-NG")}`;
}
