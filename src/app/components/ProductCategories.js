import { PaperMintsMark, TungMark } from "./BrandMark";

const categories = [
  {
    num: "01",
    title: "Oral & Dental Care",
    desc: "Breath freshening strips, capsules, sprays, and specialized tongue care — redefining daily oral hygiene with globally recognized brands.",
    brands: true,
  },
  {
    num: "02",
    title: "Snacks & Confectionery",
    desc: "An emerging category in development — bringing premium and enjoyable snacking experiences to GCC markets.",
    soon: true,
  },
  {
    num: "03",
    title: "Medical Products",
    desc: "Expanding into adjacent health and medical categories — full details coming soon.",
    soon: true,
  },
];

export default function ProductCategories() {
  return (
    <section id="categories" className="bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-cta">
            Product Categories
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold leading-[1.1] text-slate-900 sm:text-5xl">
            An <span className="text-primary">Evolving Portfolio</span> of
            Everyday Essentials
          </h2>
        </div>

        {/* Cards */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {categories.map(({ num, title, desc, brands, soon }) => (
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
                  {brands ? (
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                        Brands
                      </span>
                      <span className="flex items-center gap-2">
                        <PaperMintsMark className="text-sm" />
                        <span className="text-slate-300">·</span>
                        <TungMark className="text-sm" />
                      </span>
                    </div>
                  ) : (
                    soon && (
                      <span className="inline-flex rounded-full bg-primary/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-primary-dark">
                        Coming Soon
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
