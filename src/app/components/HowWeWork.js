import { Globe, ShieldCheck, Box, Network, Store } from "./icons";

const steps = [
  { num: "01", title: "Global Brand", Icon: Globe, desc: "We partner with international brands and onboard their portfolio." },
  { num: "02", title: "Import & Compliance", Icon: ShieldCheck, desc: "Registration, labeling, and customs handled for every market." },
  { num: "03", title: "Warehousing", Icon: Box, desc: "Goods stored and managed in compliant regional facilities." },
  { num: "04", title: "Distribution", Icon: Network, desc: "Reliable fulfilment to retail and pharmacy networks at speed." },
  { num: "05", title: "Retail & Consumer", Icon: Store, desc: "Brands reach the shelf — and the shopper — across the GCC." },
];

export default function HowWeWork() {
  return (
    <section id="how-we-work" className="bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-[0.18em] text-cta">
            The Partner Journey
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold leading-[1.1] text-slate-900 sm:text-5xl">
            From global brand to GCC consumer
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-slate-500">
            One accountable path from a brand&apos;s factory to the
            consumer&apos;s hand — managed end to end by Renad.
          </p>
        </div>

        {/* Icon stepper */}
        <div className="relative mt-16">
          <div className="absolute left-[10%] right-[10%] top-7 hidden h-10 -translate-y-1/2 lg:block" aria-hidden>
            <svg
              className="h-full w-full text-slate-300"
              viewBox="0 0 800 40"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M 0 20 C 50 2, 150 38, 200 20 C 250 2, 350 38, 400 20 C 450 2, 550 38, 600 20 C 650 2, 750 38, 800 20"
                stroke="currentColor"
                strokeWidth="3"
                strokeDasharray="1 12"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
            {steps.map(({ num, title, Icon, desc }) => (
              <li key={num} className="relative flex flex-col items-center text-center">
                <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-white text-primary shadow-card">
                  <Icon className="h-6 w-6" />
                  <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-cta text-[10px] font-bold text-white">
                    {Number(num)}
                  </span>
                </span>
                <h3 className="mt-4 font-display text-base font-semibold text-slate-800">
                  {title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
