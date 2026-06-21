import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PageHeader from "../../components/PageHeader";
import ContactForm from "../../components/ContactForm";
import { MapPin, Mail, Phone, Linkedin, XTwitter, Instagram } from "../../components/icons";
import { getDictionary, hasLocale } from "../dictionaries";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.contactPage.title,
    description: dict.contactPage.description,
  };
}

const detailIcons = [MapPin, Mail, Phone];
const detailHrefs = [null, "mailto:partners@renadtrading.com", "tel:+97140000000"];

const socials = [
  { Icon: Linkedin, label: "LinkedIn" },
  { Icon: XTwitter, label: "X" },
  { Icon: Instagram, label: "Instagram" },
];

export default async function ContactPage({ params }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const t = dict.contactPage;
  const markets = dict.footer.markets;

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
          image="/images/contact-hero.png"
        />

        <section className="bg-white">
          <div className="mx-auto grid max-w-7xl items-start gap-12 px-6 py-24 lg:grid-cols-[1.3fr_1fr] lg:gap-16 lg:px-10">
            {/* Form */}
            <div className="min-w-0">
              <h2 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl">
                {t.formHeading}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-500">
                {t.formSubtext}
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>

            {/* Details */}
            <div className="flex min-w-0 flex-col gap-6">
              <div className="rounded-3xl border border-slate-100 bg-surface p-8 shadow-card">
                <h3 className="font-display text-lg font-bold text-slate-900">
                  {t.detailsHeading}
                </h3>
                <ul className="mt-6 space-y-5">
                  {t.details.map((detail, i) => {
                    const Icon = detailIcons[i];
                    const href = detailHrefs[i];
                    return (
                      <li key={detail.label} className="flex items-start gap-4">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-primary shadow-sm">
                          <Icon className="h-5 w-5" />
                        </span>
                        <span className="min-w-0 wrap-break-word">
                          <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                            {detail.label}
                          </span>
                          {href ? (
                            <a
                              href={href}
                              className="font-display text-base font-semibold text-slate-800 transition-colors hover:text-primary"
                            >
                              {/* Phone/email read left-to-right even inside the RTL card */}
                              <bdi dir="ltr">{detail.value}</bdi>
                            </a>
                          ) : (
                            <span className="font-display text-base font-semibold text-slate-800">
                              {detail.value}
                            </span>
                          )}
                        </span>
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-7 border-t border-slate-200 pt-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    {t.followUs}
                  </span>
                  <div className="mt-3 flex gap-3">
                    {socials.map(({ Icon, label }) => (
                      <a
                        key={label}
                        href="#"
                        aria-label={label}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-500 shadow-sm transition-colors duration-200 hover:bg-primary hover:text-white"
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Markets */}
              <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-card">
                <h3 className="font-display text-lg font-bold text-slate-900">
                  {t.marketsTitle}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {markets.map((m) => (
                    <span
                      key={m}
                      className="rounded-full bg-surface px-3.5 py-1.5 text-sm font-medium text-primary-dark"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer dict={dict} lang={lang} />
    </div>
  );
}
