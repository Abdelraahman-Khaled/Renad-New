import Image from "next/image";
import SideDecor from "./Decor";

const collage = [
  {
    src: "/images/stats3.png",
    alt: "Consumer brands stocked across modern GCC retail shelves",
    cls: "row-span-2",
  },
  {
    src: "/images/stats1.png",
    alt: "Pharmacy retail aisle",
    cls: "",
  },
  {
    src: "/images/stats2 .png",
    alt: "Retail partner",
    cls: "",
  },
];

function CircleBadge({ text }) {
  const isAr = /[\u0600-\u06FF]/.test(text);
  return (
    <div className="absolute left-1/2 top-1/2 z-10 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary shadow-lift ring-8 ring-white">
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full animate-[spin_16s_linear_infinite]"
        aria-hidden
        style={{ direction: "ltr" }}
      >
        <defs>
          <path
            id="badge-arc"
            d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0"
          />
        </defs>
        <text
          fill="#ffffff"
          fontSize={isAr ? "10" : "8.5"}
          fontWeight="600"
          letterSpacing={isAr ? "0" : "1.6"}
        >
          <textPath href="#badge-arc" startOffset="50%" textAnchor="middle">
            {text}
          </textPath>
        </text>
      </svg>
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="#e0241c"
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
          aria-hidden
        >
          <path d="M7 17 17 7M8 7h9v9" />
        </svg>
      </span>
    </div>
  );
}

export default function Progress({ dict }) {
  const t = dict.progress;

  return (
    <section id="about" className="relative overflow-hidden bg-white">
      <SideDecor variant="b" />
      <div className="relative z-10 mx-auto grid max-w-7xl items-start gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-16 lg:px-10">
        {/* Left: heading + stat cards */}
        <div>
          <span className="text-sm font-semibold uppercase tracking-[0.18em] text-cta">
            {t.eyebrow}
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold leading-[1.1] text-slate-900 sm:text-5xl">
            {t.heading}
          </h2>

          <div className="mt-10 grid max-w-lg grid-cols-2 gap-4 sm:gap-5">
            {t.stats.map((s, i) => {
              const highlight = i === 2;
              return (
                <div
                  key={s.label}
                  className={`rounded-2xl p-6 sm:p-7 ${
                    highlight
                      ? "bg-primary text-white shadow-lift"
                      : "bg-surface"
                  }`}
                >
                  <p
                    className={`font-display text-4xl font-bold sm:text-5xl ${
                      highlight ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {s.value}
                  </p>
                  <p
                    className={`mt-2 text-sm font-medium ${
                      highlight ? "text-white/80" : "text-slate-500"
                    }`}
                  >
                    {s.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: description + image collage */}
        <div className="flex flex-col gap-8">
          <p className="max-w-md text-base leading-relaxed text-slate-500 lg:ms-auto lg:text-end">
            {t.description}
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
            <CircleBadge text={t.badgeText} />
          </div>
        </div>
      </div>
    </section>
  );
}
