"use client";

/**
 * The discovery journey: Nigeria → State → Local Government → profile.
 *
 * Every input surface — map tap, carousel swipe, dropdown — dispatches into
 * the shared discovery store; the map and panels only ever render from it.
 * Progressive disclosure: one layer of information per step, gently animated.
 */
import { useMemo, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import type { NavigationIndex } from "@/sdk/contracts";
import { useDiscoveryStore } from "@/lib/selection-store";
import { NigeriaMap } from "./NigeriaMap";
import { Icon } from "@/presentation/icons/Icon";
import { fadeRise, springGentle } from "@/presentation/animations/motion";
import { cn } from "@/lib/cn";

export function DiscoveryFlow({ navigation }: { navigation: NavigationIndex }) {
  const router = useRouter();
  const { mode, focusedStateId, focusState, clearState, focusLga } = useDiscoveryStore();

  const groups = navigation.groups;
  const focusedGroup = useMemo(
    () => groups.find((g) => g.group_object_id === focusedStateId) ?? null,
    [groups, focusedStateId],
  );

  const goToLga = (slug: string, source: "MAP_TAP" | "DROPDOWN") => {
    focusLga(slug, source);
    router.push(`/lga/${slug}`);
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-surface-sunken pb-32">
      {/* Opening copy — calm, curious, minimal */}
      <div className="px-6 pt-safe-t">
        <AnimatePresence mode="wait">
          {mode === "NATION" ? (
            <motion.div
              key="nation-copy"
              variants={fadeRise}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -10 }}
              className="pt-10"
            >
              <p className="text-sm font-semibold uppercase tracking-label text-primary">
                Discover Nigeria
              </p>
              <h1 className="mt-3 text-[1.7rem] font-extrabold leading-snug tracking-display text-ink">
                You know your President.
                <br />
                You know your Governor.
                <br />
                <span className="text-primary">
                  But do you know your Local Government Chairman?
                </span>
              </h1>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                Touch the country. Find your state. Discover where you belong.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="state-copy"
              variants={fadeRise}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -10 }}
              className="pt-6"
            >
              <button
                type="button"
                onClick={clearState}
                className="pressable flex min-h-tap items-center gap-1.5 text-sm font-semibold text-ink-soft transition-colors duration-quick ease-out hover:text-ink"
              >
                <Icon name="chevron-left" size={16} />
                All of Nigeria
              </button>
              <h1 className="mt-3 text-[1.6rem] font-extrabold text-ink">
                {focusedGroup?.group_name ?? ""}
              </h1>
              {focusedGroup ? (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.25 } }}
                  className="mt-1 text-[14px] text-ink-soft"
                >
                  {focusedGroup.records.length} Local Government
                  {focusedGroup.records.length === 1 ? "" : "s"}
                </motion.p>
              ) : null}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* The living map */}
      <div className="relative mt-2 px-3">
        <NigeriaMap navigation={navigation} className="h-[19rem] w-full drop-shadow-sm" />
      </div>

      {/* Selection surfaces — carousel + dropdown drive the SAME store */}
      <div className="mt-2 flex-1 px-4">
        <AnimatePresence mode="wait">
          {mode === "NATION" ? (
            <motion.div
              key="state-pickers"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0, transition: springGentle }}
              exit={{ opacity: 0, y: -8 }}
            >
              <StateCarousel navigation={navigation} />
              <label className="mt-4 block">
                <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ink-faint">
                  Or choose a state
                </span>
                <SelectShell>
                  <select
                    aria-label="Select a state"
                    className="w-full appearance-none bg-transparent py-3.5 pl-4 pr-10 text-[15px] font-semibold text-ink outline-none"
                    value=""
                    onChange={(e) => {
                      if (e.target.value) focusState(e.target.value, "DROPDOWN");
                    }}
                  >
                    <option value="" disabled>
                      Select a state…
                    </option>
                    {groups.map((g) => (
                      <option key={g.group_object_id} value={g.group_object_id}>
                        {g.group_name}
                      </option>
                    ))}
                  </select>
                </SelectShell>
              </label>
            </motion.div>
          ) : (
            <motion.div
              key="lga-pickers"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0, transition: { ...springGentle, delay: 0.15 } }}
              exit={{ opacity: 0, y: -8 }}
            >
              <label className="block">
                <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ink-faint">
                  Choose your Local Government
                </span>
                <SelectShell>
                  <select
                    aria-label="Select a Local Government"
                    className="w-full appearance-none bg-transparent py-3.5 pl-4 pr-10 text-[15px] font-semibold text-ink outline-none"
                    value=""
                    onChange={(e) => {
                      if (e.target.value) goToLga(e.target.value, "DROPDOWN");
                    }}
                  >
                    <option value="" disabled>
                      Select a Local Government…
                    </option>
                    {(focusedGroup?.records ?? []).map((r) => (
                      <option key={r.slug} value={r.slug}>
                        {r.name}
                      </option>
                    ))}
                  </select>
                </SelectShell>
              </label>

              <div className="mt-4 grid grid-cols-2 gap-2 pb-4">
                {(focusedGroup?.records ?? []).map((r, i) => (
                  <motion.button
                    key={r.slug}
                    type="button"
                    custom={Math.min(i, 12)}
                    variants={fadeRise}
                    initial="hidden"
                    animate="visible"
                    onClick={() => goToLga(r.slug, "MAP_TAP")}
                    className="pressable min-h-tap truncate rounded-2xl bg-surface px-3.5 py-3 text-left text-[13px] font-semibold text-ink shadow-card transition-colors duration-quick ease-out active:bg-primary-soft"
                  >
                    {r.name}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function SelectShell({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative block overflow-hidden rounded-2xl bg-surface shadow-card">
      {children}
      <Icon
        name="chevron-down"
        size={16}
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-faint"
      />
    </span>
  );
}

/** Swipeable state ribbon — same store as map taps and dropdowns. */
function StateCarousel({ navigation }: { navigation: NavigationIndex }) {
  const { focusedStateId, focusState } = useDiscoveryStore();
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!focusedStateId || !scrollerRef.current) return;
    const chip = scrollerRef.current.querySelector<HTMLElement>(
      `[data-state-id="${CSS.escape(focusedStateId)}"]`,
    );
    chip?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [focusedStateId]);

  return (
    <div
      ref={scrollerRef}
      className="no-scrollbar -mx-4 flex snap-x gap-2 overflow-x-auto px-4 py-1"
      aria-label="Swipe through states"
    >
      {navigation.groups.map((g) => {
        const active = g.group_object_id === focusedStateId;
        return (
          <button
            key={g.group_object_id}
            type="button"
            data-state-id={g.group_object_id}
            onClick={() => focusState(g.group_object_id, "SWIPE")}
            className={cn(
              "pressable min-h-[40px] shrink-0 snap-center rounded-chip px-4 py-2 text-[13px] font-semibold transition-colors duration-quick ease-out",
              active
                ? "bg-primary text-white"
                : "bg-surface text-ink-soft shadow-card hover:text-ink",
            )}
          >
            {g.group_short_name ?? g.group_name}
          </button>
        );
      })}
    </div>
  );
}
