"use client";

/**
 * Discovery selection store — the single interaction model.
 *
 * Map taps, carousel swipes and dropdown selections all dispatch into this
 * store; the map and every panel render from it. There is exactly one
 * interaction path (Founder: "No separate interaction models should exist").
 */
import { create } from "zustand";

export type SelectionSource = "MAP_TAP" | "SWIPE" | "DROPDOWN" | "GEOLOCATION" | "DEEP_LINK";

export type DiscoveryMode = "NATION" | "STATE";

interface DiscoveryState {
  mode: DiscoveryMode;
  /** CAOS state object id, e.g. "caos:obj:oy". */
  focusedStateId: string | null;
  focusedLgaSlug: string | null;
  source: SelectionSource | null;
  focusState: (stateId: string, source: SelectionSource) => void;
  clearState: () => void;
  focusLga: (slug: string, source: SelectionSource) => void;
}

export const useDiscoveryStore = create<DiscoveryState>((set) => ({
  mode: "NATION",
  focusedStateId: null,
  focusedLgaSlug: null,
  source: null,
  focusState: (stateId, source) =>
    set({ mode: "STATE", focusedStateId: stateId, focusedLgaSlug: null, source }),
  clearState: () => set({ mode: "NATION", focusedStateId: null, focusedLgaSlug: null }),
  focusLga: (slug, source) => set({ focusedLgaSlug: slug, source }),
}));
