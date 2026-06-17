import { MapPin } from "./icons";

const W = 600;
const H = 460;
const markets = [
  { code: "KW", country: "Kuwait", city: "Kuwait City", x: 168, y: 70 },
  { code: "SA", country: "Saudi Arabia", city: "Riyadh", x: 150, y: 250 },
  { code: "BH", country: "Bahrain", city: "Manama", x: 322, y: 165 },
  { code: "QA", country: "Qatar", city: "Doha", x: 356, y: 210 },
  { code: "AE", country: "United Arab Emirates", city: "Dubai", x: 420, y: 258, hq: true },
  { code: "OM", country: "Oman", city: "Muscat", x: 500, y: 320 },
];
const hub = markets.find((m) => m.hq);
const pct = (v, t) => `${(v / t) * 100}%`;

export default function GccMap() {
  return (
    <section id="network" className="bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="max-w-2xl">
          <span className="text-base font-semibold uppercase tracking-[0.18em] text-cta">
            Regional Presence
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold leading-[1.1] text-slate-900 sm:text-5xl">
            One distribution network, six GCC markets
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-slate-500">
            Headquartered in the UAE, Renad operates a unified distribution
            backbone that gives international brands a single, reliable route to
            retail across the Gulf.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.55fr_1fr]">
          {/* Map panel */}
          <div className="relative overflow-hidden rounded-3xl bg-primary-dark p-6 shadow-lift">
            <div
              className="absolute inset-0 opacity-[0.16]"
              style={{
                backgroundImage: "radial-gradient(rgba(255,255,255,0.7) 1px, transparent 1px)",
                backgroundSize: "22px 22px",
              }}
              aria-hidden
            />
            <div className="relative aspect-[600/460] w-full">
              <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
                {markets.map((m) =>
                  m.hq ? null : (
                    <line key={m.code} x1={hub.x} y1={hub.y} x2={m.x} y2={m.y} stroke="#E0241C" strokeWidth="1.5" strokeDasharray="4 7" opacity="0.8" />
                  )
                )}
                {markets.map((m) => (
                  <g key={`d${m.code}`}>
                    <circle cx={m.x} cy={m.y} r={m.hq ? 17 : 12} fill="#ffffff" opacity="0.12" style={{ transformOrigin: `${m.x}px ${m.y}px`, animation: `pulse-node ${3 + m.x / 220}s ease-in-out infinite` }} />
                    <circle cx={m.x} cy={m.y} r={m.hq ? 7 : 5} fill={m.hq ? "#E0241C" : "#ffffff"} />
                    {m.hq && <circle cx={m.x} cy={m.y} r="11" fill="none" stroke="#E0241C" strokeWidth="2" />}
                  </g>
                ))}
              </svg>
              {markets.map((m) => (
                <div key={`l${m.code}`} className="absolute -translate-x-1/2 translate-y-3 text-center" style={{ left: pct(m.x, W), top: pct(m.y, H) }}>
                  <p className="whitespace-nowrap text-[11px] font-semibold text-white sm:text-xs">
                    {m.city}
                  </p>
                  {m.hq && (
                    <span className="mt-1 inline-block rounded-full bg-cta px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white">
                      HQ
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Market list */}
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {markets.map((m) => (
              <li key={`m${m.code}`} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-card">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface text-primary">
                  <MapPin className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="flex items-center gap-2">
                    <span className="font-display text-sm font-bold text-slate-800">
                      {m.country}
                    </span>
                    {m.hq && (
                      <span className="rounded-full bg-primary px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white">
                        HQ
                      </span>
                    )}
                  </span>
                  <span className="block text-xs text-slate-400">{m.city}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
