"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

function ArrowUpRight({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <path d="M7 7h10v10M7 17 17 7" />
    </svg>
  );
}

const HERO_IMG =
  "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1920&q=80";

const slides = [
  {
    tag: "International Distribution · GCC",
    pre: "Connecting Global Brands",
    hi: "with GCC Markets",
    text: "We bring the world's leading consumer brands to retail and pharmacy shelves across Saudi Arabia, the UAE, Qatar, Kuwait, Bahrain, and Oman.",
  },
  {
    tag: "Brand Spotlight · Breath Care",
    pre: "PaperMints —",
    hi: "Fresh Breath, Gulf-wide",
    text: "Sugar-free breath-freshening strips, distributed by Renad into pharmacies and modern trade across all six GCC markets.",
  },
  {
    tag: "Brand Spotlight · Tongue Care",
    pre: "TUNG — Specialist",
    hi: "Tongue Care for the Region",
    text: "Dedicated tongue-cleaning brushes and gel, building a fast-growing oral-care category across the Gulf with Renad.",
  },
];

const partners = ["PaperMints", "TUNG", "GULF RETAIL", "PHARMA+", "MODERN TRADE", "GCC CARE"];

export default function Hero() {
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
          <Image
            src={HERO_IMG}
            alt="The Gulf skyline — Renad's regional distribution stage"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          {/* Legibility gradients */}
          <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/35 to-black/45" />
          <div className="absolute inset-0 bg-linear-to-r from-black/55 to-transparent" />

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
                    className="group mt-5 inline-flex items-center gap-2 rounded-full bg-white py-1.5 pl-6 pr-1.5 text-sm font-semibold text-primary-dark transition-colors duration-200 hover:bg-cyan-50"
                  >
                    Our Brands
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white transition-transform duration-200 group-hover:rotate-45">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Vertical slider dots (right edge) */}
          <div className="absolute right-4 top-1/2 z-20 flex -translate-y-1/2 flex-col items-center gap-2.5 lg:right-6">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => go(i)}
                aria-label={`Go to slide ${i + 1}`}
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
