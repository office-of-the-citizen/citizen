"use client";

/**
 * LayeredReveal — the information-reveal model.
 *
 * Knowledge unfolds in drawers: opening a layer shows its content AND the
 * handle for the next layer. Curiosity is rewarded one drawer at a time;
 * nothing is forced open, nothing overwhelms. The optional terminal slot
 * renders after the last layer — typically the transition to a dedicated
 * constitutional record page.
 */
import { useRef, useState } from "react";
import { motion } from "framer-motion";

import { Icon } from "@/presentation/icons/Icon";
import { cn } from "@/lib/cn";
import { Disclosure } from "./Disclosure";

export interface RevealLayer {
  key: string;
  title: string;
  body: React.ReactNode;
  /**
   * When this layer opens, smoothly scroll it toward the centre of the
   * viewport once its drawer has started expanding — the record unfolding
   * toward the citizen, not the citizen hunting for what changed.
   */
  centerOnOpen?: boolean;
}

export function LayeredReveal({
  layers,
  terminal,
  className,
}: {
  layers: RevealLayer[];
  /** Rendered after the deepest layer opens — the doorway out. */
  terminal?: React.ReactNode;
  className?: string;
}) {
  /** How deep the citizen has opened: layers[0..depth-1] are visible. */
  const [depth, setDepth] = useState(0);
  const layerRefs = useRef<Array<HTMLDivElement | null>>([]);

  if (!layers.length) return null;

  return (
    <div className={cn("select-text", className)}>
      {layers.map((layer, i) => {
        const opened = i < depth;
        const isNext = i === depth;
        // A layer's handle exists once every previous layer is open.
        if (i > depth) return null;
        return (
          <div
            key={layer.key}
            ref={(node) => {
              layerRefs.current[i] = node;
            }}
          >
            <button
              type="button"
              onClick={() => setDepth(opened ? i : i + 1)}
              aria-expanded={opened}
              className={cn(
                "pressable-subtle flex min-h-tap w-full items-center justify-between gap-3 py-2.5 text-left",
                i > 0 && "border-t border-line/70",
              )}
            >
              <span
                className={cn(
                  "text-[13px] font-semibold",
                  opened ? "text-ink" : "text-ink-soft",
                )}
              >
                {layer.title}
              </span>
              <motion.span
                animate={{ rotate: opened ? 90 : 0 }}
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
                className={cn("shrink-0", isNext ? "text-primary" : "text-ink-hint")}
              >
                <Icon name="chevron-right" size={15} strokeWidth={2.4} />
              </motion.span>
            </button>
            <Disclosure
              open={opened}
              className="pb-3 pl-0.5 pr-1"
              onOpenComplete={
                layer.centerOnOpen
                  ? () => layerRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" })
                  : undefined
              }
            >
              {layer.body}
            </Disclosure>
          </div>
        );
      })}
      {terminal ? (
        <Disclosure open={depth >= layers.length} className="border-t border-line/70 pt-3">
          {terminal}
        </Disclosure>
      ) : null}
    </div>
  );
}
