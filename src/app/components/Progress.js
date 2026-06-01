import Image from "next/image";

const stats = [
  { value: "17+", label: "Distribution Partners" },
  { value: "5+", label: "KSA Regions" },
  { value: "2", label: "Brand Families", highlight: true },
  { value: "100%", label: "GCC Focused" },
];

const collage = [
  {
    src: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=800&q=80",
    alt: "Consumer brands stocked across modern GCC retail shelves",
    cls: "row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&w=600&q=80",
    alt: "Pharmacy retail aisle",
    cls: "",
  },
  {
    src: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80",
    alt: "Retail partner",
    cls: "",
  },
];

function CircleBadge() {
  return (
    <div className="absolute left-1/2 top-1/2 z-10 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary shadow-lift ring-8 ring-white">
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full animate-[spin_16s_linear_infinite]"
        aria-hidden
      >
        <defs>
          <path id="badge-arc" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
        </defs>
        <text fill="#ffffff" fontSize="8.5" fontWeight="600" letterSpacing="1.6">
          <textPath href="#badge-arc">
            RENAD • INTERNATIONAL TRADING • GCC •
          </textPath>
        </text>
      </svg>
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white">
        <svg viewBox="0 0 24 24" fill="none" stroke="#e0241c" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden>
          <path d="M7 17 17 7M8 7h9v9" />
        </svg>
      </span>
    </div>
  );
}

export default function Progress() {
  return (
    <section id="about" className="bg-white">
      <div className="mx-auto grid max-w-7xl items-start gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-16 lg:px-10">
        {/* Left: heading + stat cards */}
        <div>
          <span className="text-sm font-semibold uppercase tracking-[0.18em] text-cta">
            About Us
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold leading-[1.1] text-slate-900 sm:text-5xl">
            A UAE-based distribution partner, built for the GCC
          </h2>

          <div className="mt-10 grid max-w-lg grid-cols-2 gap-4 sm:gap-5">
            {stats.map((s) => (
              <div
                key={s.label}
                className={`rounded-2xl p-6 sm:p-7 ${
                  s.highlight ? "bg-primary text-white shadow-lift" : "bg-surface"
                }`}
              >
                <p
                  className={`font-display text-4xl font-bold sm:text-5xl ${
                    s.highlight ? "text-white" : "text-slate-900"
                  }`}
                >
                  {s.value}
                </p>
                <p
                  className={`mt-2 text-sm font-medium ${
                    s.highlight ? "text-white/80" : "text-slate-500"
                  }`}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: description + image collage */}
        <div className="flex flex-col gap-8">
          <p className="max-w-md text-base leading-relaxed text-slate-500 lg:ml-auto lg:text-right">
            Renad International Trading specializes in bringing international
            consumer brands into the Gulf. We are the bridge between global
            brands and regional retail networks across Saudi Arabia, the UAE,
            Qatar, Kuwait, Bahrain, and Oman — managing market access,
            compliance, and distribution end to end.
          </p>

          <div className="relative">
            <div className="grid h-[360px] grid-cols-2 grid-rows-2 gap-3 sm:h-[420px]">
              {collage.map((img) => (
                <div
                  key={img.src}
                  className={`relative overflow-hidden rounded-2xl ${img.cls}`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <CircleBadge />
          </div>
        </div>
      </div>
    </section>
  );
}
