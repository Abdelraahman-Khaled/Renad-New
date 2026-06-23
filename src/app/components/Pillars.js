import { Globe, TrendingUp, Network, BadgeCheck } from "./icons";
import SideDecor from "./Decor";

const pillarIcons = [Globe, TrendingUp, BadgeCheck, Network];

export default function Pillars({ dict }) {
  const t = dict.pillars;

  return (
    <section id="why" className="relative overflow-hidden bg-white">
      <SideDecor variant="a" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 lg:px-10">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-base font-semibold uppercase tracking-[0.18em] text-cta">
            {t.eyebrow}
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold leading-[1.1] text-slate-900 sm:text-5xl">
            {t.heading}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-500">
            {t.subheading}
          </p>
        </div>

        {/* Cards */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {t.items.map((item, i) => {
            const Icon = pillarIcons[i];
            const highlight = i === 0;
            return (
              <div
                key={item.label}
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
                    {item.label}
                  </h3>
                  <p
                    className={`mt-1.5 text-sm leading-relaxed transition-colors duration-300 ${
                      highlight ? "text-white/80" : "text-slate-500 group-hover:text-white/80"
                    }`}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
