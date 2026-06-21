import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import FinalCTA from "../../../components/FinalCTA";
import { ArrowRight } from "../../../components/icons";
import { getDictionary, hasLocale } from "../../dictionaries";
import {
  getBlog,
  getBlogs,
  blogImage,
  blogHeroImage,
  categoryLabel,
} from "../api";

export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const post = await getBlog(lang, slug);
  if (!post) return {};
  return {
    title: post.meta_title || post.title,
    description: post.meta_description || "",
  };
}

export default async function BlogPostPage({ params }) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const t = dict.blogPage;

  // Fetch the article and the list (for the hero fallback + related strip) in
  // parallel — they don't depend on each other.
  const [post, { blogs }] = await Promise.all([
    getBlog(lang, slug),
    getBlogs(lang),
  ]);
  if (!post) notFound();

  const heroImage = blogHeroImage(post, blogs);
  const related = blogs.filter((b) => b.slug !== post.slug).slice(0, 3);

  return (
    <div className="relative">
      <Navbar />
      <main>
        {/* Article header */}
        <section className="relative overflow-hidden bg-primary-dark">
          <Image
            src={heroImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-linear-to-b from-primary-dark/70 via-primary-dark/80 to-primary-dark" />
          <div className="relative mx-auto max-w-3xl px-6 pb-16 pt-36 text-center lg:pb-20 lg:pt-44">
            {post.category && (
              <span className="inline-block rounded-full bg-cta px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm">
                {categoryLabel(post.category, dict)}
              </span>
            )}
            <h1 className="mx-auto mt-5 max-w-2xl font-display text-3xl font-bold leading-[1.12] text-white sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <nav className="mt-6 flex items-center justify-center gap-2 text-sm text-white/60">
              <Link href={`/${lang}`} className="transition-colors hover:text-white">
                {dict.pageHeader.home}
              </Link>
              <span>/</span>
              <Link href={`/${lang}/blog`} className="transition-colors hover:text-white">
                {t.breadcrumb}
              </Link>
            </nav>
          </div>
        </section>

        {/* Article body */}
        <article className="bg-white">
          <div className="mx-auto max-w-3xl px-6 py-16 lg:py-20">
            {post.meta_description && (
              <p className="text-lg font-medium leading-relaxed text-slate-700">
                {post.meta_description}
              </p>
            )}

            <BlogContent contents={post.contents} />
            <BlogFaqs faqs={post.faqs} heading={t.faqsHeading} />

            <div className="mt-12 border-t border-slate-100 pt-8">
              <Link
                href={`/${lang}/blog`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
              >
                <ArrowRight className="h-4 w-4 rotate-180 rtl:rotate-0" />
                {t.backToBlog}
              </Link>
            </div>
          </div>
        </article>

        {/* Related reading */}
        {related.length > 0 && (
          <section className="bg-surface">
            <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
              <h2 className="font-display text-2xl font-bold text-slate-900 sm:text-3xl">
                {t.relatedReading}
              </h2>
              <div className="mt-8 grid gap-8 md:grid-cols-3">
                {related.map((p) => (
                  <Link
                    key={p.id}
                    href={`/${lang}/blog/${encodeURIComponent(p.slug)}`}
                    className="group flex flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-card transition-shadow duration-300 hover:shadow-lift"
                  >
                    <div className="relative h-44 overflow-hidden">
                      <Image
                        src={blogImage(p)}
                        alt={p.photos?.[0]?.alt || ""}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {p.category && (
                        <span className="absolute left-4 top-4 rounded-full bg-cta px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm">
                          {categoryLabel(p.category, dict)}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="font-display text-lg font-bold leading-snug text-slate-900 transition-colors duration-200 group-hover:text-primary">
                        {p.title}
                      </h3>
                      <span className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary transition-colors duration-200 group-hover:text-primary-dark">
                        {t.readMore}
                        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5 rtl:group-hover:translate-x-0" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <FinalCTA dict={dict} />
      </main>
      <Footer dict={dict} lang={lang} />
    </div>
  );
}

// Renders the article body. The backend's `contents` shape isn't finalized (it's
// empty for now), so this handles the likely shapes defensively: plain strings,
// or objects with a heading (title/heading) and a body (body/content/text/
// description). Rich-text HTML is detected and rendered as markup.
function BlogContent({ contents }) {
  if (!Array.isArray(contents) || contents.length === 0) return null;
  return (
    <div className="mt-8 space-y-6">
      {contents.map((item, i) => {
        if (typeof item === "string") {
          return (
            <div
              key={i}
              className="space-y-4 text-base leading-relaxed text-slate-600"
            >
              {renderRichText(item)}
            </div>
          );
        }
        const heading = item.title || item.heading;
        const body =
          item.body ?? item.content ?? item.text ?? item.description ?? "";
        return (
          <section key={item.id ?? i} className="space-y-3">
            {heading && (
              <h2 className="font-display text-2xl font-bold text-slate-900">
                {heading}
              </h2>
            )}
            <div className="space-y-4 text-base leading-relaxed text-slate-600">
              {renderRichText(body)}
            </div>
          </section>
        );
      })}
    </div>
  );
}

// Renders a string as either sanitized-trusted HTML (when it contains markup
// from the CMS) or as plain paragraphs split on blank lines.
function renderRichText(value) {
  if (typeof value !== "string" || value.trim() === "") return null;
  const looksLikeHtml = /<[a-z][\s\S]*>/i.test(value);
  if (looksLikeHtml) {
    return (
      <div
        className="space-y-4 [&_a]:text-primary [&_a]:underline [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-slate-900 [&_li]:my-1 [&_ol]:list-decimal [&_ol]:ps-5 [&_ul]:list-disc [&_ul]:ps-5"
        // Content comes from the trusted in-house CMS backend.
        dangerouslySetInnerHTML={{ __html: value }}
      />
    );
  }
  return value
    .split(/\n{2,}/)
    .map((para) => para.trim())
    .filter(Boolean)
    .map((para, i) => <p key={i}>{para}</p>);
}

// Renders FAQs. Expects `{ question, answer }`, but tolerates a few alternate
// field names.
function BlogFaqs({ faqs, heading }) {
  if (!Array.isArray(faqs) || faqs.length === 0) return null;
  return (
    <div className="mt-12 border-t border-slate-100 pt-8">
      <h2 className="font-display text-2xl font-bold text-slate-900">
        {heading}
      </h2>
      <dl className="mt-6 space-y-4">
        {faqs.map((faq, i) => (
          <div
            key={faq.id ?? i}
            className="rounded-2xl border border-slate-100 bg-surface p-5"
          >
            <dt className="font-semibold text-slate-900">
              {faq.question || faq.title}
            </dt>
            <dd className="mt-2 text-base leading-relaxed text-slate-600">
              {faq.answer || faq.body || faq.content}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
