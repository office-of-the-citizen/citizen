"use client";

/**
 * useLongPress — press-and-hold with continuous progress.
 *
 * Powers the verification ritual: feedback begins on pointer-down (never on
 * release), progress is reported every frame, and letting go before the
 * hold completes snaps progress back. Pointer capture keeps the hold alive
 * if the finger drifts; a second touch is ignored.
 */
import { useCallback, useRef, useState } from "react";

export function useLongPress({
  durationMs,
  onComplete,
  disabled = false,
}: {
  durationMs: number;
  onComplete: () => void;
  disabled?: boolean;
}) {
  const [progress, setProgress] = useState(0);
  const [holding, setHolding] = useState(false);
  const raf = useRef<number | null>(null);
  const startedAt = useRef<number | null>(null);
  const completed = useRef(false);

  const stop = useCallback(() => {
    if (raf.current !== null) cancelAnimationFrame(raf.current);
    raf.current = null;
    startedAt.current = null;
    setHolding(false);
    setProgress(0);
  }, []);

  const tick = useCallback(
    (now: number) => {
      if (startedAt.current === null) return;
      const p = Math.min(1, (now - startedAt.current) / durationMs);
      setProgress(p);
      if (p >= 1) {
        if (!completed.current) {
          completed.current = true;
          onComplete();
        }
        stop();
        return;
      }
      raf.current = requestAnimationFrame(tick);
    },
    [durationMs, onComplete, stop],
  );

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (disabled || startedAt.current !== null) return;
      completed.current = false;
      e.currentTarget.setPointerCapture(e.pointerId);
      startedAt.current = performance.now();
      setHolding(true);
      raf.current = requestAnimationFrame(tick);
    },
    [disabled, tick],
  );

  const cancel = useCallback(() => {
    if (startedAt.current !== null) stop();
  }, [stop]);

  return {
    progress,
    holding,
    /** True on the click that follows a completed hold — suppress it. */
    consumeCompletion: () => {
      const was = completed.current;
      completed.current = false;
      return was;
    },
    handlers: {
      onPointerDown,
      onPointerUp: cancel,
      onPointerCancel: cancel,
      onContextMenu: (e: React.MouseEvent) => e.preventDefault(),
    },
  };
}
