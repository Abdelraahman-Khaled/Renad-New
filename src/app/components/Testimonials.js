"use client";

import { useRef, useState } from "react";

function QuoteMark({ className }) {
  return (
    <svg viewBox="0 0 48 48" fill="currentColor" aria-hidden className={className}>
      <path d="M20 10c-6 2.6-9 7-9 14.5V38h11.5V24.6h-5.3c.2-3.9 1.8-6.4 5.1-7.8L20 10Zm18 0c-6 2.6-9 7-9 14.5V38h11.5V24.6h-5.3c.2-3.9 1.8-6.4 5.1-7.8L38 10Z" />
    </svg>
  );
}

function Chevron({ dir = "right", className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <path d={dir === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"} />
    </svg>
  );
}

const testimonials = [
  {
    quote:
      "Renad gave our brand a real route into the Gulf. Within months we moved from zero presence to consistent shelf space across multiple markets.",
    name: "Brand Partner",
    role: "Global FMCG Manufacturer",
    initials: "BP",
    color: "bg-primary",
  },
  {
    quote:
      "They understand both the regulatory maze and the retail relationships. Rare to find one partner who handles compliance and distribution this well.",
    name: "Procurement Lead",
    role: "GCC Pharmacy Chain",
    initials: "PL",
    color: "bg-cta",
  },
  {
    quote:
      "Professional, executive, and genuinely regional. Renad operates like a partner invested in our long-term growth — not just another distributor.",
    name: "Category Director",
    role: "Consumer Health Brand",
    initials: "CD",
    color: "bg-primary-dark",
  },
  {
    quote:
      "Their regional reach meant our launch covered all six markets at once — scale that would have taken us years to build alone.",
    name: "Export Manager",
    role: "European Personal-Care Brand",
    initials: "EM",
    color: "bg-cta",
  },
  {
    quote:
      "Clear reporting, on-time delivery, and a team that knows every buyer. Exactly the partner a growing brand needs in the Gulf.",
    name: "Managing Director",
    role: "Regional Distribution Partner",
    initials: "MD",
    color: "bg-primary",
  },
];

export default function Testimonials() {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);

  const scrollToIdx = (i) => {
    const track = trackRef.current;
    if (!track) return;
    const idx = Math.max(0, Math.min(testimonials.length - 1, i));
    const card = track.children[idx];
    if (card) {
      // Temporarily disable CSS scroll snapping so it doesn't fight smooth scroll
      track.style.scrollSnapType = "none";
      isScrollingRef.current = true;

      const targetScroll =
        card.getBoundingClientRect().left -
        track.getBoundingClientRect().left +
        track.scrollLeft;

      track.scrollTo({ left: targetScroll, behavior: "smooth" });
      setActive(idx);

      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        track.style.scrollSnapType = "";
        isScrollingRef.current = false;
      }, 500); // Wait for smooth scroll animation to finish
    }
  };

  const onScroll = () => {
    if (isScrollingRef.current) return;
    const track = trackRef.current;
    if (!track) return;
    const children = Array.from(track.children);
    if (children.length === 0) return;
    const trackLeft = track.getBoundingClientRect().left;
    let closestIdx = 0;
    let minDiff = Infinity;
    children.forEach((child, idx) => {
      const diff = Math.abs(child.getBoundingClientRect().left - trackLeft);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = idx;
      }
    });
    setActive(closestIdx);
  };

  return (
    <section id="markets" className="bg-surface">
      <style>{`.tm-track::-webkit-scrollbar{display:none}`}</style>
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        {/* Header */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-cta">
              Testimonials
            </span>
            <h2 className="mt-3 font-display text-4xl font-bold leading-[1.1] text-slate-900 sm:text-5xl">
              Trusted by global brands &amp; GCC retailers
            </h2>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => scrollToIdx(active - 1)}
              aria-label="Previous testimonial"
              className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-colors duration-200 hover:border-primary hover:text-primary"
            >
              <Chevron dir="left" className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollToIdx(active + 1)}
              aria-label="Next testimonial"
              className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-colors duration-200 hover:border-primary hover:text-primary"
            >
              <Chevron dir="right" className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Swipeable track */}
        <div
          ref={trackRef}
          onScroll={onScroll}
          className="tm-track mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2"
          style={{ scrollbarWidth: "none" }}
        >
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex shrink-0 basis-[85%] snap-start flex-col rounded-3xl border border-slate-100 bg-white p-8 shadow-card sm:basis-[47%] lg:basis-[31.5%]"
            >
              <QuoteMark className="h-9 w-9 text-primary/20" />
              <blockquote className="mt-4 flex-1 text-base leading-relaxed text-slate-700">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-4 border-t border-slate-100 pt-5">
                <span
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-display text-sm font-bold text-white ${t.color}`}
                >
                  {t.initials}
                </span>
                <span>
                  <p className="font-display text-sm font-bold text-slate-900">
                    {t.name}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-400">{t.role}</p>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Dots */}
        <div className="mt-8 flex justify-center gap-2.5">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollToIdx(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              aria-current={i === active}
              className={`h-2.5 cursor-pointer rounded-full transition-all duration-300 ${
                i === active ? "w-8 bg-cta" : "w-2.5 bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
