import Navbar from "./Navbar";
import Footer from "./Footer";
import PageHeader from "./PageHeader";
import FinalCTA from "./FinalCTA";

// Shared layout for legal/static text pages (Privacy Policy, Terms of Service).
// `t` is the dictionary node for the page: { eyebrow, heading, subtitle,
// breadcrumb, lastUpdated, sections: [{ heading, body: [paragraph, ...] }] }.
export default function LegalPage({ dict, lang, t }) {
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
          <div className="mx-auto max-w-3xl px-6 py-16 lg:py-20">
            {t.lastUpdated && (
              <p className="text-sm font-medium text-slate-400">
                {t.lastUpdated}
              </p>
            )}
            <div className="mt-8 space-y-10">
              {t.sections.map((s, i) => (
                <section key={i} className="space-y-3">
                  <h2 className="font-display text-xl font-bold text-slate-900 sm:text-2xl">
                    {s.heading}
                  </h2>
                  {s.body.map((para, j) => (
                    <p
                      key={j}
                      className="text-base leading-relaxed text-slate-600"
                    >
                      {para}
                    </p>
                  ))}
                </section>
              ))}
            </div>
          </div>
        </section>

        <FinalCTA dict={dict} />
      </main>
      <Footer dict={dict} lang={lang} />
    </div>
  );
}
