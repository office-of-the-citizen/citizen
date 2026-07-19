"use client";

/**
 * Stylised presentation map of Nigeria — NOT GIS, NOT boundary truth.
 * Geometry: @svg-maps/nigeria (CC-BY-4.0), crosswalked to CAOS state object
 * ids. The map renders ONLY from the shared discovery store; taps dispatch
 * into the same store the dropdown and carousel use (one interaction model).
 */
import { useEffect, useRef, useState } from "react";
import nigeriaMap from "@svg-maps/nigeria";
import { animate, useReducedMotion } from "framer-motion";

import { SVG_TO_CAOS, CAOS_TO_SVG } from "@/assets/map/state-crosswalk";
import { useDiscoveryStore } from "@/lib/selection-store";

interface MapLocation {
  id: string;
  name: string;
  path: string;
}

interface MapData {
  viewBox: string;
  locations: MapLocation[];
}

const MAP = nigeriaMap as unknown as MapData;
const FULL_VB = MAP.viewBox.split(" ").map(Number) as [number, number, number, number];

type ViewBox = { x: number; y: number; w: number; h: number };
const NATION_VB: ViewBox = { x: FULL_VB[0], y: FULL_VB[1], w: FULL_VB[2], h: FULL_VB[3] };

export function NigeriaMap({ className }: { className?: string }) {
  const { mode, focusedStateId, focusState } = useDiscoveryStore();
  const reduceMotion = useReducedMotion();
  const pathRefs = useRef<Map<string, SVGPathElement>>(new Map());
  const [viewBox, setViewBox] = useState<ViewBox>(NATION_VB);
  const vbRef = useRef<ViewBox>(NATION_VB);

  const focusedSvgId = focusedStateId ? (CAOS_TO_SVG[focusedStateId] ?? null) : null;

  useEffect(() => {
    let target = NATION_VB;
    if (mode === "STATE" && focusedSvgId) {
      const el = pathRefs.current.get(focusedSvgId);
      if (el) {
        const b = el.getBBox();
        const pad = Math.max(b.width, b.height) * 0.45;
        target = {
          x: b.x - pad,
          y: b.y - pad,
          w: b.width + pad * 2,
          h: b.height + pad * 2,
        };
      }
    }
    const from = { ...vbRef.current };
    if (reduceMotion) {
      vbRef.current = target;
      setViewBox(target);
      return;
    }
    const controls = animate(0, 1, {
      type: "spring",
      stiffness: 110,
      damping: 22,
      onUpdate: (t) => {
        const next = {
          x: from.x + (target.x - from.x) * t,
          y: from.y + (target.y - from.y) * t,
          w: from.w + (target.w - from.w) * t,
          h: from.h + (target.h - from.h) * t,
        };
        vbRef.current = next;
        setViewBox(next);
      },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, focusedSvgId, reduceMotion]);

  return (
    <svg
      viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`}
      className={className}
      role="group"
      aria-label="Map of Nigeria's states"
    >
      {MAP.locations.map((loc) => {
        const caosId = SVG_TO_CAOS[loc.id];
        const isFocused = focusedSvgId === loc.id;
        const dimmed = mode === "STATE" && !isFocused;
        return (
          <path
            key={loc.id}
            ref={(el) => {
              if (el) pathRefs.current.set(loc.id, el);
            }}
            d={loc.path}
            role="button"
            aria-label={loc.name}
            tabIndex={0}
            onClick={() => caosId && focusState(caosId, "MAP_TAP")}
            onKeyDown={(e) => {
              if ((e.key === "Enter" || e.key === " ") && caosId) {
                e.preventDefault();
                focusState(caosId, "MAP_TAP");
              }
            }}
            className="cursor-pointer outline-none transition-[fill,opacity] duration-300"
            style={{
              fill: isFocused ? "rgb(14 138 76)" : "rgb(207 228 216)",
              opacity: dimmed ? 0.28 : 1,
              stroke: "#ffffff",
              strokeWidth: viewBox.w / 500,
            }}
          />
        );
      })}
    </svg>
  );
}
