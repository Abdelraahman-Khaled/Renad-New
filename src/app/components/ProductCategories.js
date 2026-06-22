import { PaperMintsMark, TungMark } from "./BrandMark";
import SideDecor from "./Decor";

export default function ProductCategories({ dict }) {
  const t = dict.productCategories;

  return (
    <section id="categories" className="relative overflow-hidden bg-surface">
      <SideDecor variant="b" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-10">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-lg font-semibold uppercase tracking-[0.2em] text-cta">
            {t.eyebrow}
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold leading-[1.1] text-slate-900 sm:text-5xl">
            {t.headingPrefix}{" "}
            <span className="text-primary">{t.headingHighlight}</span>{" "}
            {t.headingSuffix}
          </h2>
        </div>

        {/* Cards */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {t.categories.map(({ num, title, desc }, i) => {
            const hasBrands = i === 0;
            const isSoon = i > 0;
            return (
              <div
                key={num}
                className="group flex flex-col rounded-3xl border border-slate-100 bg-white p-8 shadow-card transition-shadow duration-300 hover:shadow-lift"
              >
                <span className="font-display text-3xl font-bold text-primary">
                  {num}
                </span>
                <h3 className="mt-5 font-display text-xl font-bold text-slate-900">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-500">
                  {desc}
                </p>

                {/* Footer pinned to bottom */}
                <div className="mt-auto pt-8">
                  <div className="border-t border-slate-100 pt-5">
                    {hasBrands ? (
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                          {t.brands}
                        </span>
                        <span className="flex items-center gap-2">
                          <PaperMintsMark className="text-sm" />
                          <span className="text-slate-300">·</span>
                          <TungMark className="text-sm" />
                        </span>
                      </div>
                    ) : (
                      isSoon && (
                        <span className="inline-flex rounded-full bg-primary/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-primary-dark">
                          {t.comingSoon}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
