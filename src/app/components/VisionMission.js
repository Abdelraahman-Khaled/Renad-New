function Eye({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <path d="M2.5 12S5.5 5.5 12 5.5 21.5 12 21.5 12 18.5 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
function Target({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" />
    </svg>
  );
}

export default function VisionMission() {
  return (
    <section className="relative overflow-hidden bg-primary-dark">
      {/* ambient accents */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-primary/30 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-cta/20 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-28 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.22em] text-cta">
            Vision &amp; Mission
          </span>
          <p className="mt-6 font-display text-2xl font-semibold leading-snug text-white sm:text-3xl lg:text-4xl">
            To be the most trusted bridge between international consumer brands
            and the people of the Gulf.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-8 backdrop-blur">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cta/20 text-white">
              <Eye className="h-6 w-6" />
            </span>
            <h3 className="mt-5 font-display text-xl font-bold text-white">
              Our Vision
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              A Gulf market where the world&apos;s best consumer brands are
              within every shopper&apos;s reach — introduced, trusted, and made
              local by Renad.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-8 backdrop-blur">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cta/20 text-white">
              <Target className="h-6 w-6" />
            </span>
            <h3 className="mt-5 font-display text-xl font-bold text-white">
              Our Mission
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              To give international brands a single, dependable partner for GCC
              growth — handling market access, compliance, and distribution with
              executive discipline.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
