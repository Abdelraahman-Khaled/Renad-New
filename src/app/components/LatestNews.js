import Image from "next/image";
import { ArrowRight } from "./icons";
import SideDecor from "./Decor";

const images = [
  "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80",
];

export default function LatestNews({ dict }) {
  const t = dict.latestNews;
  const posts = t.posts;
  const [featured, ...rest] = posts;

  return (
    <section id="news" className="relative overflow-hidden bg-white">
      <SideDecor variant="b" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-10">
        {/* Header */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-cta">
              {t.eyebrow}
            </span>
            <h2 className="mt-3 font-display text-4xl font-bold leading-[1.1] text-slate-900 sm:text-5xl">
              {t.heading}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-500">
              {t.subheading}
            </p>
          </div>
          <a
            href="#"
            className="group inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:border-primary hover:text-primary"
          >
            {t.viewAll}
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5 rtl:group-hover:translate-x-0" />
          </a>
        </div>

        {/* Featured + list */}
        <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-2">
          {/* Featured */}
          <article className="group flex flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-card transition-shadow duration-300 hover:shadow-lift">
            <div className="relative h-64 overflow-hidden sm:h-80">
              <Image
                src={images[0]}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
              <span className="absolute left-5 top-5 rounded-full bg-cta px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm">
                {featured.tag}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-7">
              <div className="flex items-center gap-3 text-xs font-medium text-slate-400">
                <span>{featured.date}</span>
                <span className="h-1 w-1 rounded-full bg-slate-300" />
                <span>{featured.read}</span>
              </div>
              <h3 className="mt-3 font-display text-2xl font-bold leading-snug text-slate-900 transition-colors duration-200 group-hover:text-primary">
                {featured.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-500">
                {featured.excerpt}
              </p>
              <a
                href="#"
                className="mt-5 inline-flex w-fit cursor-pointer items-center gap-2 text-sm font-semibold text-primary transition-colors duration-200 hover:text-primary-dark"
              >
                {t.readMore}
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5 rtl:group-hover:translate-x-0" />
              </a>
            </div>
          </article>

          {/* Side list */}
          <div className="flex flex-col gap-6">
            {rest.map((p, i) => (
              <article
                key={p.title}
                className="group flex flex-1 gap-5 rounded-3xl border border-slate-100 bg-white p-4 shadow-card transition-shadow duration-300 hover:shadow-lift"
              >
                <div className="relative aspect-[4/3] w-48 shrink-0 overflow-hidden rounded-2xl sm:w-56">
                  <Image
                    src={images[i + 1]}
                    alt=""
                    fill
                    sizes="224px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-primary-dark backdrop-blur">
                    {p.tag}
                  </span>
                </div>
                <div className="flex min-w-0 flex-col justify-center py-1 pe-2">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                    <span>{p.date}</span>
                    <span className="h-1 w-1 rounded-full bg-slate-300" />
                    <span>{p.read}</span>
                  </div>
                  <h3 className="mt-2 font-display text-lg font-bold leading-snug text-slate-900 transition-colors duration-200 group-hover:text-primary">
                    {p.title}
                  </h3>
                  <a
                    href="#"
                    className="mt-3 inline-flex w-fit cursor-pointer items-center gap-1.5 text-sm font-semibold text-primary transition-colors duration-200 hover:text-primary-dark"
                  >
                    {t.readMore}
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5 rtl:group-hover:translate-x-0" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
