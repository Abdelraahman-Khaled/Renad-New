"use client";

import { useState, useEffect } from "react";
import { Search, ArrowRight, BadgeCheck } from "./icons";
import { PaperMintsMark, TungMark } from "./BrandMark";

/* ---- inline icons ---- */
const Clock = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);
const Bell = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
    <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.7 21a2 2 0 0 1-3.4 0" />
  </svg>
);
const Close = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);
const Share = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <path d="m8.6 13.5 6.8 4M15.4 6.5 8.6 10.5" />
  </svg>
);

const brandMeta = {
  papermints: { color: "#1f9d57", soft: "#a7e8c4", Mark: PaperMintsMark, label: "Breath Care" },
  tung: { color: "#1c8fd6", soft: "#a9dbf6", Mark: TungMark, label: "Tongue Care" },
};

function Pack({ brand, color }) {
  if (brand === "tung") {
    return (
      <svg viewBox="0 0 120 150" className="h-3/5 w-auto drop-shadow-lg" aria-hidden>
        <rect x="48" y="10" width="24" height="16" rx="4" fill={color} />
        <path d="M44 26 H76 L82 130 Q60 142 38 130 Z" fill="#fff" />
        <rect x="40" y="74" width="40" height="34" fill={color} fillOpacity="0.16" />
        <circle cx="60" cy="52" r="9" fill={color} fillOpacity="0.28" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 120 150" className="h-3/5 w-auto drop-shadow-lg" aria-hidden>
      <rect x="50" y="10" width="20" height="10" rx="3" fill="#fff" />
      <rect x="34" y="18" width="52" height="118" rx="12" fill="#fff" />
      <line x1="34" y1="44" x2="86" y2="44" stroke={color} strokeOpacity="0.25" strokeWidth="2" />
      <rect x="34" y="70" width="52" height="40" fill={color} fillOpacity="0.15" />
    </svg>
  );
}

function Thumb({ brand, className = "" }) {
  const m = brandMeta[brand];
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{ background: `linear-gradient(150deg, ${m.color}, ${m.soft})` }}
    >
      <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full border-8 border-white/15" aria-hidden />
      <Pack brand={brand} color={m.color} />
    </div>
  );
}

const products = [
  { id: "pm-strips", brand: "papermints", name: "PaperMints Strips", short: "Ultra-thin dissolving breath-freshening strips.", long: "Sugar-free strips that dissolve instantly on the tongue for discreet, on-the-go breath freshness. A pocket-sized icon of oral freshness, distributed by Renad across GCC pharmacies and modern trade.", features: ["Sugar-free", "Pocket format", "Instant freshness"] },
  { id: "pm-drops", brand: "papermints", name: "PaperMints Drops", short: "Long-lasting breath-freshening drops.", long: "Concentrated mint drops delivering hours of fresh breath in a refillable tin — a premium everyday essential for the modern Gulf consumer.", features: ["Long-lasting", "Refillable tin", "Strong mint"] },
  { id: "pm-spray", brand: "papermints", name: "PaperMints Spray", short: "Fast, fine breath-freshening spray.", long: "A fine-mist spray for an instant burst of freshness anywhere. Compact, travel-friendly, and registered for retail across all six GCC markets.", features: ["Fine mist", "Travel-friendly", "Instant"] },
  { id: "pm-caps", brand: "papermints", name: "PaperMints Capsules", short: "Single-dose freshness capsules.", long: "Convenient single-dose capsules that release a clean, lasting mint — ideal for impulse pharmacy and checkout placement.", features: ["Single-dose", "Clean mint", "Impulse-ready"] },
  { id: "tung-brush", brand: "tung", name: "TUNG Brush", short: "Specialist tongue-cleaning brush.", long: "Ergonomically designed to reach and clean the back of the tongue — the real source of bad breath. The category-defining tool in modern tongue care.", features: ["Targets odor source", "Ergonomic", "Category-defining"] },
  { id: "tung-gel", brand: "tung", name: "TUNG Gel", short: "Tongue-cleaning gel with fresh finish.", long: "A purpose-built gel that pairs with the TUNG Brush to neutralize odor and leave a clean, fresh finish. Sold as a system for maximum effect.", features: ["Neutralizes odor", "Pairs with brush", "Fresh finish"] },
  { id: "tung-kit", brand: "tung", name: "TUNG Fresh Kit", short: "Complete tongue-care system.", long: "The full TUNG system — brush plus gel — packaged for retail and education. The simplest way to bring tongue care to a new market.", features: ["Brush + gel", "Retail-ready", "Education pack"] },
];

const filters = [
  { id: "all", label: "All Products" },
  { id: "papermints", label: "PaperMints" },
  { id: "tung", label: "TUNG" },
  { id: "food", label: "Food & Confectionery", soon: true },
];

/* ---- modal shell ---- */
function Overlay({ onClose, children }) {
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div onClick={(e) => e.stopPropagation()} className="w-full">
        {children}
      </div>
    </div>
  );
}

export default function ProductsExplorer() {
  const [active, setActive] = useState("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [comingSoon, setComingSoon] = useState(false);
  const [notified, setNotified] = useState(false);
  const [copied, setCopied] = useState(false);

  const open = Boolean(selected) || comingSoon;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setSelected(null);
        setComingSoon(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const q = query.trim().toLowerCase();
  const visible = products.filter(
    (p) =>
      (active === "all" || p.brand === active) &&
      (q === "" || p.name.toLowerCase().includes(q) || p.short.toLowerCase().includes(q))
  );

  const handleFilter = (f) => {
    if (f.soon) {
      setComingSoon(true);
      return;
    }
    setActive(f.id);
  };

  const handleShare = async (p) => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.share) {
      try {
        await navigator.share({ title: `Renad — ${p.name}`, text: p.short, url });
        return;
      } catch {
        /* user cancelled */
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
  };

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        {/* Search */}
        <div className="mx-auto max-w-xl">
          <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-5 py-3 shadow-sm focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/30">
            <Search className="h-5 w-5 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products…"
              className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
              aria-label="Search products"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {filters.map((f) => {
            const isActive = active === f.id && !f.soon;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => handleFilter(f)}
                className={`inline-flex cursor-pointer items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-200 ${
                  isActive
                    ? "bg-primary text-white"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-primary hover:text-primary"
                }`}
              >
                {f.label}
                {f.soon && (
                  <span className="rounded-full bg-cta/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-cta">
                    Soon
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((p) => {
            const m = brandMeta[p.brand];
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelected(p)}
                className="group flex cursor-pointer flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white text-left shadow-card transition-shadow duration-300 hover:shadow-lift"
              >
                <Thumb brand={p.brand} className="h-44" />
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center justify-between">
                    <m.Mark className="text-sm" />
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      {m.label}
                    </span>
                  </div>
                  <h3 className="mt-2 font-display text-base font-bold text-slate-900">
                    {p.name}
                  </h3>
                  <p className="mt-1 flex-1 text-sm leading-relaxed text-slate-500">
                    {p.short}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors group-hover:text-primary-dark">
                    View details
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {visible.length === 0 && (
          <p className="mt-16 text-center text-slate-400">
            No products match your search.
          </p>
        )}
      </div>

      {/* Product detail modal */}
      {selected && (
        <Overlay onClose={() => setSelected(null)}>
          <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl bg-white shadow-lift">
            <button
              type="button"
              onClick={() => setSelected(null)}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/90 text-slate-500 shadow-sm transition-colors hover:bg-slate-100"
            >
              <Close className="h-5 w-5" />
            </button>
            <div className="grid sm:grid-cols-2">
              <Thumb brand={selected.brand} className="h-56 sm:h-full" />
              <div className="p-7">
                {(() => {
                  const m = brandMeta[selected.brand];
                  return (
                    <>
                      <div className="flex items-center gap-3">
                        <m.Mark className="text-lg" />
                        <span className="rounded-full bg-surface px-3 py-1 text-xs font-semibold text-primary-dark">
                          {m.label}
                        </span>
                      </div>
                      <h2 className="mt-4 font-display text-2xl font-bold text-slate-900">
                        {selected.name}
                      </h2>
                      <p className="mt-3 text-sm leading-relaxed text-slate-500">
                        {selected.long}
                      </p>
                      <ul className="mt-5 space-y-2.5">
                        {selected.features.map((f) => (
                          <li key={f} className="flex items-center gap-2.5 text-sm text-slate-700">
                            <BadgeCheck className="h-5 w-5 text-primary" />
                            {f}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-7 flex flex-wrap items-center gap-3">
                        <a
                          href="/contact"
                          className="group inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-primary-dark"
                        >
                          Inquire about this product
                          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                        </a>
                        <button
                          type="button"
                          onClick={() => handleShare(selected)}
                          className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:border-primary hover:text-primary"
                        >
                          <Share className="h-4 w-4" />
                          {copied ? "Link copied!" : "Share"}
                        </button>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        </Overlay>
      )}

      {/* Coming soon modal */}
      {comingSoon && (
        <Overlay
          onClose={() => {
            setComingSoon(false);
            setNotified(false);
          }}
        >
          <div className="relative mx-auto max-w-md rounded-3xl bg-white p-8 text-center shadow-lift">
            <button
              type="button"
              onClick={() => {
                setComingSoon(false);
                setNotified(false);
              }}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-slate-200"
            >
              <Close className="h-5 w-5" />
            </button>

            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cta/10 text-cta">
              <Clock className="h-8 w-8" />
            </span>
            <h3 className="mt-5 font-display text-xl font-bold text-slate-900">
              Food &amp; Confectionery
            </h3>

            {notified ? (
              <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-slate-500">
                You&apos;re on the list! We&apos;ll email you the moment this
                category launches.
              </p>
            ) : (
              <>
                <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-slate-500">
                  We&apos;re working on launching this category soon. Sign up to
                  be the first to know when products launch.
                </p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setNotified(true);
                  }}
                  className="mt-6 space-y-3"
                >
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    aria-label="Email"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition-shadow placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/30"
                  />
                  <button
                    type="submit"
                    className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-primary-dark"
                  >
                    <Bell className="h-4 w-4" />
                    Notify me at launch
                  </button>
                </form>
              </>
            )}
          </div>
        </Overlay>
      )}
    </section>
  );
}
