/**
 * Constitutional placeholder artwork.
 *
 * Missing truth and missing media are designed states, never grey boxes.
 * Each piece is deterministic SVG so every page always feels visually
 * complete. Replacing this artwork with commissioned art means editing this
 * file (or the media manifest) only — never a React screen component.
 */

/** Soft rolling-landscape artwork used when no header photograph exists. */
export function HeaderArt({ seed = 0 }: { seed?: number }) {
  const hueShift = (seed % 5) * 6 - 12;
  return (
    <svg
      viewBox="0 0 400 240"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="ph-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={`hsl(${160 + hueShift} 45% 22%)`} />
          <stop offset="100%" stopColor={`hsl(${152 + hueShift} 40% 34%)`} />
        </linearGradient>
      </defs>
      <rect width="400" height="240" fill="url(#ph-sky)" />
      <circle cx="322" cy="58" r="26" fill="#f8fafc" opacity="0.22" />
      <path
        d="M0 150 Q60 108 130 138 T280 132 T400 150 V240 H0 Z"
        fill={`hsl(${150 + hueShift} 38% 26%)`}
        opacity="0.85"
      />
      <path
        d="M0 178 Q80 140 170 168 T340 162 T400 176 V240 H0 Z"
        fill={`hsl(${148 + hueShift} 42% 19%)`}
        opacity="0.95"
      />
      <path
        d="M0 206 Q100 178 210 198 T400 200 V240 H0 Z"
        fill={`hsl(${146 + hueShift} 45% 13%)`}
      />
      <g fill="#f8fafc" opacity="0.16">
        <rect x="252" y="150" width="10" height="26" rx="1.5" />
        <rect x="266" y="140" width="12" height="36" rx="1.5" />
        <rect x="282" y="156" width="9" height="20" rx="1.5" />
      </g>
    </svg>
  );
}

/** Portrait artwork — “Official photograph unavailable.” */
export function PortraitArt({ tone = "green" }: { tone?: "green" | "blue" | "neutral" }) {
  const palette = {
    green: { bg: "#e7f6ee", mid: "#bfe6d2", fg: "#0e8a4c" },
    blue: { bg: "#eff6ff", mid: "#c9e0fb", fg: "#2563eb" },
    neutral: { bg: "#f1f5f9", mid: "#d8e0e9", fg: "#64748b" },
  }[tone];
  return (
    <svg viewBox="0 0 96 96" className="h-full w-full" aria-hidden="true">
      <rect width="96" height="96" fill={palette.bg} />
      <circle cx="48" cy="38" r="15" fill={palette.mid} />
      <path d="M18 88c3-18 15-26 30-26s27 8 30 26z" fill={palette.mid} />
      <circle cx="48" cy="38" r="15" fill="none" stroke={palette.fg} strokeOpacity="0.35" strokeWidth="2" />
      <path
        d="M24 84c4-14 13-20 24-20s20 6 24 20"
        fill="none"
        stroke={palette.fg}
        strokeOpacity="0.35"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Circular seal used when no official government logo has been admitted. */
export function SealArt({ label }: { label: string }) {
  const initials = label
    .split(/\s+/)
    .filter((w) => !["state", "of", "the", "local", "government"].includes(w.toLowerCase()))
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
  return (
    <svg viewBox="0 0 96 96" className="h-full w-full" aria-hidden="true">
      <circle cx="48" cy="48" r="46" fill="#f8fafc" />
      <circle cx="48" cy="48" r="46" fill="none" stroke="#0e8a4c" strokeWidth="3" />
      <circle cx="48" cy="48" r="37" fill="none" stroke="#0e8a4c" strokeOpacity="0.35" strokeWidth="1.5" />
      <g fill="none" stroke="#0e8a4c" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="m48 26 13 7.4H35z" transform="translate(0 4)" />
        <path d="M38 38v12M44.7 38v12M51.4 38v12M58 38v12M35 52h26" transform="translate(0 4)" />
      </g>
      <text
        x="48"
        y="78"
        textAnchor="middle"
        fontSize="11"
        fontWeight="700"
        fill="#095c33"
        fontFamily="ui-sans-serif, system-ui"
      >
        {initials || "NG"}
      </text>
      <g fill="#0e8a4c">
        <circle cx="20" cy="48" r="1.8" />
        <circle cx="76" cy="48" r="1.8" />
      </g>
    </svg>
  );
}

/** Small abstract flag/crest for the citizen avatar slot (no account in v1). */
export function AvatarArt() {
  return (
    <svg viewBox="0 0 48 48" className="h-full w-full" aria-hidden="true">
      <rect width="48" height="48" fill="#e7f6ee" />
      <circle cx="24" cy="19" r="8" fill="#0e8a4c" opacity="0.75" />
      <path d="M8 44c2-9 8-13 16-13s14 4 16 13z" fill="#0e8a4c" opacity="0.55" />
    </svg>
  );
}
