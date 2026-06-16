"use client";

import { useState, useEffect, useCallback } from "react";
import { useLang } from "../[lang]/LangContext";

function ArrowUpRight({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <path d="M7 7h10v10M7 17 17 7" />
    </svg>
  );
}

export default function Hero() {
  const { dict } = useLang();
  const slides = dict.hero.slides;
  const [active, setActive] = useState(0);
  const n = slides.length;
  const go = useCallback((idx) => setActive(((idx % n) + n) % n), [n]);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const t = setInterval(() => setActive((p) => (p + 1) % n), 6000);
    return () => clearInterval(t);
  }, [n]);

  const s = slides[active];

  return (
    <section id="top" className="bg-white px-3 pt-3 sm:px-4 lg:px-6 mb-6">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl">
        {/* Full-bleed background */}
        <div className="relative" style={{ minHeight: "clamp(560px, 82vh, 780px)" }}>
          <video
            src="/images/b01.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Legibility gradients */}
          <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/35 to-black/45" />
          <div className="absolute inset-0 bg-linear-to-r from-black/55 to-transparent rtl:bg-linear-to-l" />

          {/* Content (bottom) */}
          <div className="absolute inset-0 z-10 flex flex-col justify-end p-7 pb-12 sm:p-10 lg:p-14">
            <div key={active} style={{ animation: "heroFade 0.6s ease" }}>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-cta" />
                {s.tag}
              </span>

              <div className="mt-5 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                <h1 className="max-w-3xl font-display text-5xl font-bold leading-[0.98] text-white sm:text-6xl lg:text-7xl">
                  {s.pre} <span className="text-cta">{s.hi}</span>
                </h1>

                <div className="max-w-sm lg:pb-2">
                  <p className="text-sm leading-relaxed text-white/85 sm:text-base">
                    {s.text}
                  </p>
                  <a
                    href="#brands"
                    className="group mt-5 inline-flex items-center gap-2 rounded-full bg-white py-1.5 ps-6 pe-1.5 text-sm font-semibold text-primary-dark transition-colors duration-200 hover:bg-cyan-50"
                  >
                    {dict.hero.ourBrands}
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white transition-transform duration-200 group-hover:rotate-45 rtl:group-hover:-rotate-45">
                      <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Vertical slider dots (right edge) */}
          <div className="absolute end-4 top-1/2 z-20 flex -translate-y-1/2 flex-col items-center gap-2.5 lg:end-6">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => go(i)}
                aria-label={`${dict.hero.goToSlide} ${i + 1}`}
                aria-current={i === active}
                className={`w-2.5 cursor-pointer rounded-full transition-all duration-300 ${
                  i === active ? "h-9 bg-cta" : "h-2.5 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
     
    </section>
  );
}
