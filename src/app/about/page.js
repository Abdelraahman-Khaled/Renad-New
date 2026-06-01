import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Pillars from "../components/Pillars";
import VisionMission from "../components/VisionMission";
import FinalCTA from "../components/FinalCTA";
import { MapPin, Globe, Store, BadgeCheck } from "../components/icons";

export const metadata = {
  title: "About Us — Renad International Trading",
  description:
    "Renad International Trading FZCO is a UAE-based distribution partner connecting international consumer brands with retail networks across the GCC.",
};

const HERO_IMG =
  "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1920&q=80";

const facts = [
  { Icon: MapPin, label: "Headquarters", value: "Dubai, United Arab Emirates" },
  { Icon: Globe, label: "Markets", value: "6 GCC countries" },
  { Icon: Store, label: "Channels", value: "Pharmacy, modern trade & retail" },
  { Icon: BadgeCheck, label: "Flagship brands", value: "PaperMints & TUNG" },
];

const stats = [
  { value: "17+", label: "Distribution Partners" },
  { value: "5+", label: "KSA Regions" },
  { value: "2", label: "Brand Families", highlight: true },
  { value: "100%", label: "GCC Focused" },
];

export default function AboutPage() {
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
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-linear-to-b from-primary-dark/85 to-primary-dark/95" />
          <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-36 text-center lg:px-10 lg:pb-28 lg:pt-44">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-cta">
              About Us
            </span>
            <h1 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-bold leading-[1.05] text-white sm:text-5xl lg:text-6xl">
              Connecting global brands with the Gulf
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
              A UAE-based distribution partner built to bring the world&apos;s
              leading consumer brands to retail and pharmacy shelves across the
              GCC.
            </p>
            <nav className="mt-8 flex items-center justify-center gap-2 text-sm text-white/60">
              <a href="/" className="transition-colors hover:text-white">
                Home
              </a>
              <span>/</span>
              <span className="text-white">About</span>
            </nav>
          </div>
        </section>

        {/* Story */}
        <section className="bg-white">
          <div className="mx-auto grid max-w-7xl items-start gap-16 px-6 py-24 lg:grid-cols-2 lg:px-10">
            <div>
              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-cta">
                Who We Are
              </span>
              <h2 className="mt-4 font-display text-4xl font-bold leading-[1.1] text-slate-900 sm:text-5xl">
                A distribution partner, not just a distributor
              </h2>
              <div className="mt-6 space-y-4 text-lg leading-relaxed text-slate-500">
                <p>
                  Renad International Trading FZCO is a UAE-based trading and
                  distribution company specializing in bringing international
                  consumer brands into GCC markets.
                </p>
                <p>
                  We act as the bridge between global brands and regional retail
                  networks across Saudi Arabia, the UAE, Qatar, Kuwait, Bahrain,
                  and Oman — managing market access, regulatory compliance,
                  warehousing, and last-stage distribution end to end.
                </p>
                <p>
                  Our focus is everyday consumer goods, anchored in mouth care
                  with brands like PaperMints and TUNG and expanding into new
                  categories. Logistics is a supporting capability — our core
                  value is connecting global brands with GCC markets.
                </p>
              </div>
            </div>

            {/* Facts card */}
            <div className="rounded-3xl border border-slate-100 bg-surface p-8 shadow-card lg:mt-4">
              <h3 className="font-display text-lg font-bold text-slate-900">
                At a glance
              </h3>
              <ul className="mt-6 divide-y divide-slate-200">
                {facts.map(({ Icon, label, value }) => (
                  <li key={label} className="flex items-center gap-4 py-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-primary shadow-sm">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                        {label}
                      </span>
                      <span className="font-display text-base font-semibold text-slate-800">
                        {value}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-surface">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
            <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className={`rounded-2xl p-7 text-center ${
                    s.highlight ? "bg-primary text-white shadow-lift" : "bg-white shadow-card"
                  }`}
                >
                  <p
                    className={`font-display text-4xl font-bold sm:text-5xl ${
                      s.highlight ? "text-white" : "text-primary"
                    }`}
                  >
                    {s.value}
                  </p>
                  <p
                    className={`mt-2 text-sm font-medium ${
                      s.highlight ? "text-white/80" : "text-slate-500"
                    }`}
                  >
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Pillars />
        <VisionMission />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
}
