import { ArrowRight, BadgeCheck } from "./icons";
import { PaperMintsMark, TungMark } from "./BrandMark";
import ProductVisual from "./ProductVisual";

const brands = {
  papermints: {
    key: "papermints",
    Mark: PaperMintsMark,
    category: "Breath Care",
    color: "#1f9d57",
    soft: "#a7e8c4",
    tint: "#e7f8ee",
    headline: "The discreet way to stay fresh — now across the Gulf",
    body: "PaperMints delivers instant, sugar-free breath freshening in an ultra-thin dissolving strip. A trusted international name in oral freshness, distributed by Renad into pharmacy and modern-trade shelves region-wide.",
    points: [
      "Sugar-free, pocket-sized format",
      "Registered & compliant across GCC markets",
      "Stocked in leading pharmacy chains",
    ],
    stat: { value: "6", label: "GCC markets" },
  },
  tung: {
    key: "tung",
    Mark: TungMark,
    category: "Tongue Care",
    color: "#1c8fd6",
    soft: "#a9dbf6",
    tint: "#e7f3fb",
    headline: "Specialist tongue care for the modern oral routine",
    body: "TUNG pioneers dedicated tongue cleaning — brushes and gel engineered to target the real source of bad breath. A fast-growing category Renad is building across the region with targeted retail and education.",
    points: [
      "Category-defining tongue-care system",
      "High-growth niche in modern oral care",
      "Expanding retail & pharmacy footprint",
    ],
    stat: { value: "100%", label: "tongue-focused" },
  },
};

function Spotlight({ b, reverse }) {
  return (
    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
      {/* Text */}
      <div className={reverse ? "lg:order-2" : ""}>
        <span className="text-sm font-semibold uppercase tracking-[0.18em] text-cta">
          Brand Spotlight
        </span>
        <div className="mt-4 flex items-center gap-3">
          <b.Mark className="text-3xl sm:text-4xl" />
          <span
            className="rounded-full px-3 py-1 text-xs font-semibold"
            style={{ backgroundColor: b.tint, color: b.color }}
          >
            {b.category}
          </span>
        </div>
        <h3 className="mt-5 font-display text-3xl font-bold leading-snug text-slate-900 sm:text-4xl">
          {b.headline}
        </h3>
        <p className="mt-5 text-lg leading-relaxed text-slate-500">{b.body}</p>
        <ul className="mt-6 space-y-3">
          {b.points.map((p) => (
            <li key={p} className="flex items-center gap-3 text-base text-slate-700">
              <span className="shrink-0" style={{ color: b.color }}>
                <BadgeCheck className="h-5 w-5" />
              </span>
              {p}
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="group mt-8 inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
        >
          Distribute this brand with Renad
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </a>
      </div>

      {/* Visual */}
      <div className={reverse ? "lg:order-1" : ""}>
        <div
          className="relative flex aspect-[5/4] items-center justify-center overflow-hidden rounded-3xl p-10 shadow-lift"
          style={{ background: `linear-gradient(150deg, ${b.color}, ${b.soft})` }}
        >
          <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full border-[20px] border-white/15" aria-hidden />
          <div className="pointer-events-none absolute -bottom-14 -left-10 h-56 w-56 rounded-full border-[18px] border-white/10" aria-hidden />
          <ProductVisual brand={b.key} size="lg" />
          <div className="absolute bottom-5 left-5 rounded-2xl bg-white/95 px-4 py-2.5 shadow-lift">
            <p className="font-display text-xl font-bold text-slate-900">{b.stat.value}</p>
            <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
              {b.stat.label}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BrandShowcase() {
  return (
    <section id="brands" className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        {/* Intro / ecosystem */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.18em] text-cta">
            Our Brands
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold leading-[1.1] text-slate-900 sm:text-5xl">
            Mouth care brands, made local
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-slate-500">
            We start where we have deep expertise — mouth care — and grow trusted
            international brands category by category across the GCC.
          </p>
        </div>

        <div className="mt-20 space-y-24">
          <Spotlight b={brands.papermints} />
          <Spotlight b={brands.tung} reverse />
        </div>
      </div>
    </section>
  );
}
