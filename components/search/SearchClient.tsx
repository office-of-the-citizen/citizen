"use client";

/**
 * Search — a thin client over Engine 11. The query goes to the application's
 * search proxy, which asks the operating system through the SDK. Ranking,
 * filtering and result composition are OS truth; this component only renders.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import type { NavigationIndex, SearchResult } from "@/sdk/contracts";
import { Icon } from "@/presentation/icons/Icon";
import { fadeRise } from "@/presentation/animations/motion";
import { RecentPlaces } from "@/components/discovery/RecentPlaces";

interface SearchState {
  status: "idle" | "loading" | "ready" | "unavailable";
  results: SearchResult[];
}

export function SearchClient({ navigation }: { navigation: NavigationIndex }) {
  const [query, setQuery] = useState("");
  const [state, setState] = useState<SearchState>({ status: "idle", results: [] });
  const abortRef = useRef<AbortController | null>(null);

  const total = useMemo(
    () => navigation.groups.reduce((n, g) => n + g.records.length, 0),
    [navigation],
  );

  useEffect(() => {
    const q = query.trim();
    abortRef.current?.abort();
    if (q.length < 2) {
      setState({ status: "idle", results: [] });
      return;
    }
    const controller = new AbortController();
    abortRef.current = controller;
    const timer = setTimeout(async () => {
      setState((s) => ({ ...s, status: "loading" }));
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`, {
          signal: controller.signal,
        });
        const body = await res.json();
        if (controller.signal.aborted) return;
        if (!body.available) {
          setState({ status: "unavailable", results: [] });
        } else {
          setState({ status: "ready", results: body.results ?? [] });
        }
      } catch {
        if (!controller.signal.aborted) setState({ status: "unavailable", results: [] });
      }
    }, 180);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  return (
    <div className="mx-auto min-h-screen w-full max-w-md bg-surface-sunken px-4 pb-32 pt-safe-t">
      <h1 className="pt-8 text-2xl font-extrabold tracking-display text-ink">Search</h1>
      <p className="mt-1 text-sm text-ink-soft">
        Search all {total.toLocaleString()} public records.
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

      {/* Announce result changes to screen readers without stealing focus */}
      <p role="status" aria-live="polite" className="sr-only">
        {state.status === "ready"
          ? `${state.results.length} result${state.results.length === 1 ? "" : "s"}`
          : state.status === "unavailable"
            ? "Search is temporarily unavailable"
            : ""}
      </p>

      <div className="mt-4 space-y-2">
        {state.results.map((hit, i) => (
          <motion.div
            key={`${hit.record_type}:${hit.slug}`}
            custom={Math.min(i, 10)}
            variants={fadeRise}
            initial="hidden"
            animate="visible"
          >
            <Link
              href={`/${hit.record_type}/${hit.slug}`}
              className="pressable-subtle flex min-h-tap items-center justify-between gap-3 rounded-2xl bg-surface px-4 py-3.5 shadow-card transition-colors duration-quick ease-out active:bg-primary-soft"
            >
              <span className="flex min-w-0 items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <Icon name="pin" size={16} />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[15px] font-bold text-ink">{hit.title}</span>
                  <span className="block truncate text-xs text-ink-soft">
                    {hit.group_name}
                    {hit.answer_summary ? ` · ${hit.answer_summary}` : ""}
                  </span>
                </span>
              </span>
              <Icon name="chevron-right" size={16} className="shrink-0 text-ink-faint" />
            </Link>
          </motion.div>
        ))}
        {state.status === "ready" && !state.results.length ? (
          <div className="px-2 pt-6 text-center">
            <p className="text-sm text-ink-soft">
              No public record matches “{query.trim()}”.
            </p>
            <BrowseInstead label="Browse Nigeria instead" />
          </div>
        ) : null}
        {state.status === "unavailable" ? (
          <div className="px-2 pt-6 text-center">
            <p className="text-sm text-ink-soft">
              Search is temporarily unavailable. Every Local Government can
              still be reached by browsing the map.
            </p>
            <BrowseInstead label="Browse Nigeria" />
          </div>
        ) : null}
      </div>

      {/* Idle doorways — an empty search box should never be a dead end. */}
      {state.status === "idle" ? (
        <div className="mt-6 space-y-6">
          <RecentPlaces />
          <StateShortcuts navigation={navigation} />
        </div>
      ) : null}
    </div>
  );
}

/** A calm doorway back to discovery whenever search has nothing to give. */
function BrowseInstead({ label }: { label: string }) {
  return (
    <Link
      href="/explore"
      className="pressable mt-4 inline-flex min-h-tap items-center gap-2 rounded-chip bg-primary-soft px-4 py-2.5 text-[13px] font-bold text-primary-deep"
    >
      <Icon name="map" size={15} />
      {label}
    </Link>
  );
}

/**
 * Every state, as a shortcut into discovery. Permanent geography only — this
 * is navigation, not a reconstruction of Engine 11 search.
 */
function StateShortcuts({ navigation }: { navigation: NavigationIndex }) {
  return (
    <section aria-label="Browse by state">
      <h2 className="mb-1.5 px-1 text-xs font-bold uppercase tracking-wide text-ink-faint">
        Browse by state
      </h2>
      <div className="flex flex-wrap gap-2">
        {navigation.groups.map((group) => (
          <Link
            key={group.group_object_id}
            href={`/explore?state=${encodeURIComponent(group.group_object_id)}`}
            className="pressable min-h-[40px] rounded-chip bg-surface px-3.5 py-2 text-[13px] font-semibold text-ink-soft shadow-card transition-colors duration-quick ease-out active:bg-primary-soft"
          >
            {group.group_short_name ?? group.group_name}
          </Link>
        ))}
      </div>
    </section>
  );
}
