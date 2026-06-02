function MarqueeRow({ items, reverse = false, duration = 24 }) {
  const all = [...items, ...items, ...items];
  return (
    <div className="overflow-hidden">
      <div
        className="flex w-max items-center gap-6 whitespace-nowrap"
        style={{
          animation: `marquee${reverse ? "Rev" : ""} ${duration}s linear infinite`,
        }}
      >
        {all.map((w, i) => (
          <span key={i} className="flex items-center gap-6">
            <span className="font-display text-base font-semibold uppercase tracking-wide text-white sm:text-lg">
              {w}
            </span>
            <span
              className="inline-block h-1.5 w-1.5 rounded-full bg-white/70"
              aria-hidden
            />
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Marquee({ dict }) {
  const t = dict.marquee;

  return (
    <>
      <style>{`
        @keyframes marquee    { from { transform:translateX(0) } to { transform:translateX(-33.333%) } }
        @keyframes marqueeRev { from { transform:translateX(-33.333%) } to { transform:translateX(0) } }
        @media (prefers-reduced-motion: reduce) {
          [style*="marquee"] { animation: none !important; }
        }
      `}</style>

      {/* Two ribbons crossing into an X */}
      <div className="bg-surface py-16 overflow-hidden">
        <div className="relative h-[180px] w-full sm:h-[210px]">
          {/* Teal ribbon — leans up */}
          <div className="absolute left-1/2 top-1/2 w-[130%] -translate-x-1/2 -translate-y-1/2 rotate-[5deg] bg-primary py-3 shadow-lift">
            <MarqueeRow items={t.row1} duration={26} />
          </div>
          {/* Red ribbon — leans down, crosses on top */}
          <div className="absolute left-1/2 top-1/2 w-[130%] -translate-x-1/2 -translate-y-1/2 -rotate-[5deg] bg-cta py-3 shadow-lift">
            <MarqueeRow items={t.row2} reverse duration={22} />
          </div>
        </div>
      </div>
    </>
  );
}
