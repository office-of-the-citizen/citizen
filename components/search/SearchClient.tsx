"use client";

/**
 * Search across the 774 Local Government public records — filters the
 * navigation projection locally (works offline once loaded).
 */
import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import type { NavigationIndex } from "@/sdk/contracts";
import { Icon } from "@/presentation/icons/Icon";
import { fadeRise } from "@/presentation/animations/motion";

interface Hit {
  slug: string;
  name: string;
  stateName: string;
}

export function SearchClient({ navigation }: { navigation: NavigationIndex }) {
  const [query, setQuery] = useState("");

  const all = useMemo<Hit[]>(
    () =>
      navigation.groups.flatMap((g) =>
        g.records.map((r) => ({ slug: r.slug, name: r.name, stateName: g.group_name })),
      ),
    [navigation],
  );

  const hits = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    return all
      .filter((h) => h.name.toLowerCase().includes(q) || h.stateName.toLowerCase().includes(q))
      .slice(0, 30);
  }, [all, query]);

  return (
    <div className="mx-auto min-h-screen w-full max-w-md bg-surface-sunken px-4 pb-32 pt-safe-t">
      <h1 className="pt-8 text-2xl font-extrabold text-ink">Search</h1>
      <p className="mt-1 text-sm text-ink-soft">
        Find any of Nigeria’s 774 Local Governments.
      </p>

      <div className="relative mt-4">
        <Icon
          name="search"
          size={18}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint"
        />
        <input
          type="search"
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Try “Ibadan” or “Oyo”…"
          className="w-full rounded-2xl bg-surface py-3.5 pl-11 pr-4 text-[15px] font-medium text-ink shadow-card outline-none placeholder:text-ink-faint focus:ring-2 focus:ring-primary/40"
        />
      </div>

      <div className="mt-4 space-y-2">
        {hits.map((hit, i) => (
          <motion.div
            key={hit.slug}
            custom={Math.min(i, 10)}
            variants={fadeRise}
            initial="hidden"
            animate="visible"
          >
            <Link
              href={`/lga/${hit.slug}`}
              className="flex items-center justify-between gap-3 rounded-2xl bg-surface px-4 py-3.5 shadow-card transition-colors active:bg-primary-soft"
            >
              <span className="flex min-w-0 items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <Icon name="pin" size={16} />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[15px] font-bold text-ink">{hit.name}</span>
                  <span className="block truncate text-xs text-ink-soft">{hit.stateName}</span>
                </span>
              </span>
              <Icon name="chevron-right" size={16} className="shrink-0 text-ink-faint" />
            </Link>
          </motion.div>
        ))}
        {query.trim().length >= 2 && !hits.length ? (
          <p className="px-2 pt-6 text-center text-sm text-ink-soft">
            No Local Government matches “{query.trim()}”.
          </p>
        ) : null}
      </div>
    </div>
  );
}
