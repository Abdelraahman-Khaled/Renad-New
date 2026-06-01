import { PaperMintsMark, TungMark } from "./BrandMark";

const config = {
  papermints: {
    Mark: PaperMintsMark,
    category: "Breath Care",
    color: "#1f9d57",
    soft: "#a7e8c4",
  },
  tung: {
    Mark: TungMark,
    category: "Tongue Care",
    color: "#1c8fd6",
    soft: "#a9dbf6",
  },
};

function Pack({ brand, color }) {
  if (brand === "tung") {
    // Gel tube with coloured cap
    return (
      <svg viewBox="0 0 120 150" className="h-full w-auto drop-shadow-lg" aria-hidden>
        <rect x="48" y="10" width="24" height="16" rx="4" fill={color} />
        <path d="M44 26 H76 L82 130 Q60 142 38 130 Z" fill="#ffffff" />
        <path d="M44 26 H76 L82 130 Q60 142 38 130 Z" fill="none" stroke={color} strokeOpacity="0.25" strokeWidth="1.5" />
        <rect x="40" y="74" width="40" height="34" fill={color} fillOpacity="0.16" />
        <circle cx="60" cy="52" r="9" fill={color} fillOpacity="0.28" />
      </svg>
    );
  }
  // PaperMints flip pack
  return (
    <svg viewBox="0 0 120 150" className="h-full w-auto drop-shadow-lg" aria-hidden>
      <rect x="50" y="10" width="20" height="10" rx="3" fill="#ffffff" />
      <rect x="34" y="18" width="52" height="118" rx="12" fill="#ffffff" />
      <rect x="34" y="18" width="52" height="118" rx="12" fill="none" stroke={color} strokeOpacity="0.22" strokeWidth="1.5" />
      <line x1="34" y1="44" x2="86" y2="44" stroke={color} strokeOpacity="0.25" strokeWidth="2" />
      <rect x="34" y="70" width="52" height="40" fill={color} fillOpacity="0.15" />
      <path
        d="M60 78c-7 0-12 5-12 12 7 0 12-5 12-12zm0 0c7 0 12 5 12 12-7 0-12-5-12-12z"
        fill={color}
        fillOpacity="0.5"
      />
    </svg>
  );
}

/* Premium product card — swap the silhouette for real photography later. */
export default function ProductVisual({ brand, size = "md", className = "", style }) {
  const b = config[brand];
  const dims =
    size === "lg"
      ? { card: "w-60", inner: "h-64", pack: "h-44" }
      : size === "sm"
      ? { card: "w-40", inner: "h-36", pack: "h-28" }
      : { card: "w-48", inner: "h-48", pack: "h-36" };

  return (
    <div
      className={`overflow-hidden rounded-2xl bg-white p-3 shadow-lift ring-1 ring-black/5 ${dims.card} ${className}`}
      style={style}
    >
      <div
        className={`relative flex ${dims.inner} items-center justify-center overflow-hidden rounded-xl`}
        style={{ background: `linear-gradient(150deg, ${b.color}, ${b.soft})` }}
      >
        <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full border-8 border-white/15" aria-hidden />
        <div className={`relative ${dims.pack}`}>
          <Pack brand={brand} color={b.color} />
        </div>
      </div>
      <div className="px-1 pt-3 text-center">
        <b.Mark className={size === "lg" ? "text-xl" : "text-base"} />
        <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          {b.category}
        </p>
      </div>
    </div>
  );
}
