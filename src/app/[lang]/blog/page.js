import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PageHeader from "../../components/PageHeader";
import FinalCTA from "../../components/FinalCTA";
import { ArrowRight } from "../../components/icons";
import { getDictionary, hasLocale } from "../dictionaries";
import { getBlogs, blogImage, blogImageAlt, categoryLabel } from "./api";
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

export default async function BlogPage({ params }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const t = dict.blogPage;
  const { blogs } = await getBlogs(lang);

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
          image="/images/blog-hero.png"
        />

        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
            {blogs.length === 0 ? (
              <p className="text-center text-lg text-slate-500">{t.empty}</p>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {blogs.map((post) => (
                  <Link
                    key={post.id}
                    href={`/${lang}/blog/${encodeURIComponent(post.slug)}`}
                    className="group flex flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-card transition-shadow duration-300 hover:shadow-lift"
                  >
                    <div className="relative h-52 overflow-hidden">
                      <Image
                        src={blogImage(post)}
                        alt={blogImageAlt(post)}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {post.category && (
                        <span className="absolute left-4 top-4 rounded-full bg-cta px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm">
                          {categoryLabel(post.category, dict)}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h2 className="font-display text-lg font-bold leading-snug text-slate-900 transition-colors duration-200 group-hover:text-primary">
                        {post.title}
                      </h2>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-500">
                        {post.description}
                      </p>
                      <span className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary transition-colors duration-200 group-hover:text-primary-dark">
                        {t.readMore}
                        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5 rtl:group-hover:translate-x-0" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        <FinalCTA dict={dict} />
      </main>
      <Footer dict={dict} lang={lang} />
    </div>
  );
}
