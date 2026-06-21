import Image from "next/image";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Pillars from "../../components/Pillars";
import VisionMission from "../../components/VisionMission";
import FinalCTA from "../../components/FinalCTA";
import Faqs from "../../components/Faqs";
import { MapPin, Globe, Store, BadgeCheck } from "../../components/icons";
import { getDictionary, hasLocale } from "../dictionaries";
import { getFaqs } from "./api";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.aboutPage.title,
    description: dict.aboutPage.description,
  };
}

const HERO_IMG = "/images/about.jpeg";

const factIcons = [MapPin, Globe, Store, BadgeCheck];

export default async function AboutPage({ params }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const t = dict.aboutPage;
  const stats = dict.progress.stats;
  const faqs = await getFaqs(lang);

  return (
    <div className="relative">
      <Navbar />

      <main>
        {/* Header */}
        <section className="relative overflow-hidden bg-primary-dark">
          <Image
            src={HERO_IMG}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-primary-dark to-transparent" />
          <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-36 text-center lg:px-10 lg:pb-28 lg:pt-44">
            <span className="text-base font-semibold uppercase tracking-[0.2em] text-cta">
              {t.eyebrow}
            </span>
            <h1 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-bold leading-[1.05] text-white sm:text-5xl lg:text-6xl">
              {t.heading}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
              {t.subtitle}
            </p>
            <nav className="mt-8 flex items-center justify-center gap-2 text-sm text-white/60">
              <a
                href={`/${lang}`}
                className="transition-colors hover:text-white"
              >
                {dict.pageHeader.home}
              </a>
              <span>/</span>
              <span className="text-white">{t.breadcrumb}</span>
            </nav>
          </div>
        </section>

        {/* Story */}
        <section className="bg-white">
          <div className="mx-auto grid max-w-7xl items-start gap-16 px-6 py-24 lg:grid-cols-2 lg:px-10">
            <div>
              <span className="text-base font-semibold uppercase tracking-[0.18em] text-cta">
                {t.whoWeAreEyebrow}
              </span>
              <h2 className="mt-4 font-display text-4xl font-bold leading-[1.1] text-slate-900 sm:text-5xl">
                {t.whoWeAreHeading}
              </h2>
              <div className="mt-6 space-y-4 text-lg leading-relaxed text-slate-500">
                <p>{t.whoWeAreP1}</p>
                <p>{t.whoWeAreP2}</p>
                <p>{t.whoWeAreP3}</p>
              </div>
            </div>

            {/* Facts card */}
            <div className="rounded-3xl border border-slate-100 bg-surface p-8 shadow-card lg:mt-4">
              <h3 className="font-display text-lg font-bold text-slate-900">
                {t.atAGlance}
              </h3>
              <ul className="mt-6 divide-y divide-slate-200">
                {t.facts.map((fact, i) => {
                  const Icon = factIcons[i];
                  return (
                    <li
                      key={fact.label}
                      className="flex items-center gap-4 py-4"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-primary shadow-sm">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                          {fact.label}
                        </span>
                        <span className="font-display text-base font-semibold text-slate-800">
                          {fact.value}
                        </span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-surface">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
            <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
              {stats.map((s, i) => {
                const highlight = i === 2;
                return (
                  <div
                    key={s.label}
                    className={`rounded-2xl p-7 text-center ${
                      highlight
                        ? "bg-primary text-white shadow-lift"
                        : "bg-white shadow-card"
                    }`}
                  >
                    <p
                      className={`font-display text-4xl font-bold sm:text-5xl ${
                        highlight ? "text-white" : "text-primary"
                      }`}
                    >
                      {s.value}
                    </p>
                    <p
                      className={`mt-2 text-sm font-medium ${
                        highlight ? "text-white/80" : "text-slate-500"
                      }`}
                    >
                      {s.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <Pillars dict={dict} />
        <VisionMission dict={dict} />
        {faqs.length > 0 && <Faqs faqs={faqs} dict={dict} />}
        <FinalCTA dict={dict} />
      </main>

      <Footer dict={dict} lang={lang} />
    </div>
  );
}
