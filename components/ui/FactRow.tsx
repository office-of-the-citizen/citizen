/**
 * FactRow — the one label/value row for record metadata.
 *
 * Every provenance and verification listing in the application uses this
 * row, so label casing, value weight and mono treatment stay identical
 * everywhere a fact is itemised.
 */
export function FactRow({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: React.ReactNode;
  /** Hashes, claim ids and other machine identity render monospaced. */
  mono?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt className="shrink-0 text-[11px] font-bold uppercase tracking-label text-ink-faint">
        {label}
      </dt>
      <dd
        className={
          mono
            ? "min-w-0 break-all text-right font-mono text-[11px] font-medium text-ink"
            : "min-w-0 text-right text-[12px] font-semibold text-ink"
        }
      >
        {value}
      </dd>
    </div>
  );
}
