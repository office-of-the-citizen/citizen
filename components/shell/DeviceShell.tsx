/**
 * DeviceShell — the locked window into the operating system.
 *
 * On phones the application IS the screen: children render edge-to-edge and
 * this shell adds nothing. On large screens the citizen experience renders
 * inside a fixed device frame that never moves, never floats and cannot be
 * dragged — the website around it holds still, only the content inside the
 * phone changes. `transform` on the screen (globals.css, lg+) makes it the
 * containing block for fixed chrome, so the bottom navigation anchors to
 * the device rather than the browser window.
 */
export function DeviceShell({
  children,
  chrome,
}: {
  children: React.ReactNode;
  /** Fixed app chrome (bottom navigation) — a sibling of the scroller so it
   * pins to the device frame instead of scrolling away with content. */
  chrome?: React.ReactNode;
}) {
  return (
    <div className="lg:fixed lg:inset-0 lg:flex lg:items-center lg:justify-center lg:gap-20 lg:bg-frame-night lg:px-10">
      {/* Ambient website layer — calm, not competing with the screen */}
      <div className="pointer-events-none hidden lg:block" aria-hidden="true">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-40 top-[-20%] h-[36rem] w-[36rem] rounded-full bg-primary/15 blur-[140px]" />
          <div className="absolute bottom-[-25%] right-[-10%] h-[40rem] w-[40rem] rounded-full bg-accent-blue/10 blur-[160px]" />
        </div>
      </div>

      {/* The website speaks quietly beside the device */}
      <aside className="relative z-10 hidden w-full max-w-sm select-none xl:block">
        <p className="text-[11px] font-bold uppercase tracking-label text-primary-faint/80">
          Office of the Citizen
        </p>
        <h1 className="mt-4 text-4xl font-extrabold leading-[1.1] tracking-display text-white">
          The public record,
          <br />
          in your hands.
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-white/60">
          Every fact on this screen is rendered from a governed constitutional
          record. Where the record is silent, it says so.
        </p>
        <p className="mt-10 text-[12px] leading-relaxed text-white/35">
          Best experienced on your phone — this is the same application,
          exactly as citizens hold it.
        </p>
      </aside>

      {/* The device. It does not move. */}
      <div className="relative z-10 lg:h-[min(92vh,53rem)] lg:shrink-0 lg:rounded-[3.4rem] lg:bg-frame-body lg:p-[0.55rem] lg:shadow-device lg:ring-1 lg:ring-white/15">
        <div className="device-screen relative bg-surface-sunken lg:aspect-[390/844] lg:h-full lg:w-auto lg:overflow-hidden lg:rounded-[2.9rem]">
          {/* Hardware chrome — visual only, never interactive */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 z-[60] hidden justify-center pt-2.5 lg:flex"
            aria-hidden="true"
          >
            <div className="h-[1.65rem] w-28 rounded-full bg-frame-body" />
          </div>
          <div className="device-viewport">{children}</div>
          {chrome}
        </div>
      </div>
    </div>
  );
}
