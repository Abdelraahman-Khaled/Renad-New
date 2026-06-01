import { Globe, TrendingUp, Network, BadgeCheck } from "./icons";

const pillars = [
  {
    label: "Market Access",
    Icon: Globe,
    desc: "Instant reach into established GCC retail and pharmacy networks — no groundwork required.",
    highlight: true,
  },
  {
    label: "Brand Growth",
    Icon: TrendingUp,
    desc: "Localized positioning and in-market activation that turn shelf space into sell-through.",
  },
  {
    label: "Regulatory Compliance",
    Icon: BadgeCheck,
    desc: "Registration, labeling, and import compliance for every market — handled for you.",
  },
  {
    label: "Distribution Excellence",
    Icon: Network,
    desc: "A unified, reliable supply chain engineered to move your brand from import to shelf.",
  },
];

export default function Pillars() {
  return (
    <section id="why" className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.18em] text-cta">
            Why Renad
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold leading-[1.1] text-slate-900 sm:text-5xl">
            Built to grow your brand across the GCC
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-500">
            From market entry to the shelf, Renad combines regional
            relationships, regulatory know-how, and disciplined distribution
            into one accountable partner.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {pillars.map(({ label, Icon, desc, highlight }) => (
            <div
              key={label}
              className={`group flex cursor-pointer items-start gap-5 rounded-3xl px-7 py-12 transition-colors duration-300 sm:px-8 ${
                highlight
                  ? "bg-primary text-white shadow-lift hover:bg-primary-dark"
                  : "bg-surface hover:bg-primary"
              }`}
            >
              <span
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-colors duration-300 ${
                  highlight
                    ? "bg-white/15 text-white"
                    : "bg-white text-primary shadow-sm group-hover:bg-white/15 group-hover:text-white"
                }`}
              >
                <Icon className="h-6 w-6" />
              </span>
              <div>
                <h3
                  className={`font-display text-lg font-bold transition-colors duration-300 ${
                    highlight ? "text-white" : "text-slate-900 group-hover:text-white"
                  }`}
                >
                  {label}
                </h3>
                <p
                  className={`mt-1.5 text-sm leading-relaxed transition-colors duration-300 ${
                    highlight ? "text-white/80" : "text-slate-500 group-hover:text-white/80"
                  }`}
                >
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
