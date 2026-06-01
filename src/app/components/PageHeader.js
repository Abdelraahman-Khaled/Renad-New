import Image from "next/image";

const HERO_IMG =
  "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1920&q=80";

export default function PageHeader({ eyebrow, title, subtitle, crumb }) {
  return (
    <section className="relative overflow-hidden bg-primary-dark">
      <Image src={HERO_IMG} alt="" fill priority sizes="100vw" className="object-cover opacity-25" />
      <div className="absolute inset-0 bg-linear-to-b from-primary-dark/85 to-primary-dark/95" />
      <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-36 text-center lg:px-10 lg:pb-24 lg:pt-44">
        {eyebrow && (
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-cta">
            {eyebrow}
          </span>
        )}
        <h1 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-bold leading-[1.05] text-white sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
            {subtitle}
          </p>
        )}
        <nav className="mt-8 flex items-center justify-center gap-2 text-sm text-white/60">
          <a href="/" className="transition-colors hover:text-white">
            Home
          </a>
          <span>/</span>
          <span className="text-white">{crumb}</span>
        </nav>
      </div>
    </section>
  );
}
