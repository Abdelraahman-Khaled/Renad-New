import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "./icons";
import SideDecor from "./Decor";
import { blogImage, blogImageAlt, categoryLabel } from "../[lang]/blog/api";

export default function LatestNews({ dict, lang, blogs = [] }) {
  const t = dict.latestNews;
  if (blogs.length === 0) return null;

  const [featured, ...rest] = blogs;
  const side = rest.slice(0, 2);
  const href = (post) => `/${lang}/blog/${encodeURIComponent(post.slug)}`;

  return (
    <section id="news" className="relative overflow-hidden bg-white">
      <SideDecor variant="b" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-10">
        {/* Header */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <span className="text-base font-semibold uppercase tracking-[0.18em] text-cta">
              {t.eyebrow}
            </span>
            <h2 className="mt-3 font-display text-4xl font-bold leading-[1.1] text-slate-900 sm:text-5xl">
              {t.heading}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-500">
              {t.subheading}
            </p>
          </div>
          <Link
            href={`/${lang}/blog`}
            className="group inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:border-primary hover:text-primary"
          >
            {t.viewAll}
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5 rtl:group-hover:translate-x-0" />
          </Link>
        </div>

        {/* Featured + list */}
        <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-2">
          {/* Featured */}
          <Link
            href={href(featured)}
            className="group flex flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-card transition-shadow duration-300 hover:shadow-lift"
          >
            <div className="relative h-64 overflow-hidden sm:h-80">
              <Image
                src={blogImage(featured)}
                alt={blogImageAlt(featured)}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
              {featured.category && (
                <span className="absolute left-5 top-5 rounded-full bg-cta px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm">
                  {categoryLabel(featured.category, dict)}
                </span>
              )}
            </div>
            <div className="flex flex-1 flex-col p-7">
              <h3 className="font-display text-2xl font-bold leading-snug text-slate-900 transition-colors duration-200 group-hover:text-primary">
                {featured.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-500">
                {featured.description}
              </p>
              <span className="mt-5 inline-flex w-fit cursor-pointer items-center gap-2 text-sm font-semibold text-primary transition-colors duration-200 group-hover:text-primary-dark">
                {t.readMore}
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5 rtl:group-hover:translate-x-0" />
              </span>
            </div>
          </Link>

          {/* Side list */}
          {side.length > 0 && (
            <div className="flex flex-col gap-6">
              {side.map((p) => (
                <Link
                  key={p.id}
                  href={href(p)}
                  className="group flex flex-1 gap-4 rounded-3xl border border-slate-100 bg-white p-4 shadow-card transition-shadow duration-300 hover:shadow-lift sm:gap-5"
                >
                  <div className="relative aspect-[4/3] w-28 shrink-0 overflow-hidden rounded-2xl sm:w-44 lg:w-56">
                    <Image
                      src={blogImage(p)}
                      alt={blogImageAlt(p)}
                      fill
                      sizes="224px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {p.category && (
                      <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-primary-dark backdrop-blur">
                        {categoryLabel(p.category, dict)}
                      </span>
                    )}
                  </div>
                  <div className="flex min-w-0 flex-col justify-center py-1 pe-2">
                    <h3 className="font-display text-lg font-bold leading-snug text-slate-900 transition-colors duration-200 group-hover:text-primary">
                      {p.title}
                    </h3>
                    <span className="mt-3 inline-flex w-fit cursor-pointer items-center gap-1.5 text-sm font-semibold text-primary transition-colors duration-200 group-hover:text-primary-dark">
                      {t.readMore}
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5 rtl:group-hover:translate-x-0" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
