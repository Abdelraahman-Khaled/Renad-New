import { ArrowRight } from "./icons";

export default function FinalCTA({ dict, lang }) {
  const t = dict.finalCTA;

  return (
    <section id="contact" className="bg-white">
      <div className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-linear-to-br from-primary-dark via-primary to-primary px-8 py-20 text-center shadow-lift sm:px-12 lg:pb-28 pt-18">
          {/* decorative accents */}
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-white/15 blur-3xl" />
            <div className="absolute -bottom-28 -right-20 h-80 w-80 rounded-full bg-black/20 blur-3xl" />
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full border-[28px] border-white/10" />
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />
          </div>

          <div className="relative mx-auto max-w-2xl">
            <span className="inline-flex rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur">
              {t.eyebrow}
            </span>
            <h2 className="mt-6 font-display text-4xl font-bold leading-[1.05] text-white sm:text-5xl lg:text-6xl">
              {t.heading}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white/80">
              {t.text}
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="/contact"
                className="group inline-flex cursor-pointer items-center gap-2 rounded-full bg-cta px-8 py-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-cta-dark"
              >
                {t.cta}
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
              </a>
              <a
                href={`/${lang}/products`}
                className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/30 px-8 py-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10"
              >
                {t.secondary}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
