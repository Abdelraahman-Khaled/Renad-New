import Image from "next/image";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PageHeader from "../../components/PageHeader";
import FinalCTA from "../../components/FinalCTA";
import { ArrowRight } from "../../components/icons";
import { getDictionary, hasLocale } from "../dictionaries";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.blogPage.title,
    description: dict.blogPage.description,
  };
}

const images = [
  "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
];

export default async function BlogPage({ params }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const t = dict.blogPage;

  return (
    <div className="relative">
      <Navbar />
      <main>
        <PageHeader
          eyebrow={t.eyebrow}
          title={t.heading}
          subtitle={t.subtitle}
          crumb={t.breadcrumb}
          dict={dict}
        />

        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {t.posts.map((p, i) => (
                <article
                  key={p.title}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-card transition-shadow duration-300 hover:shadow-lift"
                >
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={images[i]}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-cta px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm">
                      {p.tag}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-3 text-xs font-medium text-slate-400">
                      <span>{p.date}</span>
                      <span className="h-1 w-1 rounded-full bg-slate-300" />
                      <span>{p.read}</span>
                    </div>
                    <h2 className="mt-3 font-display text-lg font-bold leading-snug text-slate-900 transition-colors duration-200 group-hover:text-primary">
                      {p.title}
                    </h2>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-500">
                      {p.excerpt}
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
              ))}
            </div>
          </div>
        </section>

        <FinalCTA dict={dict} />
      </main>
      <Footer dict={dict} />
    </div>
  );
}
