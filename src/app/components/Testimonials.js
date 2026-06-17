"use client";

import { useRef, useState } from "react";
import SideDecor from "./Decor";
import { useLang } from "../[lang]/LangContext";

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

const colors = ["bg-primary", "bg-cta", "bg-primary-dark", "bg-cta", "bg-primary"];
const initials = ["BP", "PL", "CD", "EM", "MD"];

export default function Testimonials() {
  const { dict } = useLang();
  const t = dict.testimonials;
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);

  const scrollToIdx = (i) => {
    const track = trackRef.current;
    if (!track) return;
    const idx = Math.max(0, Math.min(t.items.length - 1, i));
    const card = track.children[idx];
    if (card) {
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
      }, 500);
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
    <section id="markets" className="relative overflow-hidden bg-surface">
      <style>{`.tm-track::-webkit-scrollbar{display:none}`}</style>
      <SideDecor variant="a" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-10">
        {/* Header */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <span className="text-base font-semibold uppercase tracking-[0.18em] text-cta">
              {t.eyebrow}
            </span>
            <h2 className="mt-3 font-display text-4xl font-bold leading-[1.1] text-slate-900 sm:text-5xl">
              {t.heading}
            </h2>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => scrollToIdx(active - 1)}
              aria-label={t.prevLabel}
              className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-colors duration-200 hover:border-primary hover:text-primary"
            >
              <Chevron dir="left" className="h-5 w-5 rtl:rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => scrollToIdx(active + 1)}
              aria-label={t.nextLabel}
              className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-colors duration-200 hover:border-primary hover:text-primary"
            >
              <Chevron dir="right" className="h-5 w-5 rtl:rotate-180" />
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
          {t.items.map((item, i) => (
            <figure
              key={i}
              className="flex shrink-0 basis-[85%] snap-start flex-col rounded-3xl border border-slate-100 bg-white p-8 shadow-card sm:basis-[47%] lg:basis-[31.5%]"
            >
              <QuoteMark className="h-9 w-9 text-primary/20 rtl:-scale-x-100" />
              <blockquote className="mt-4 flex-1 text-base leading-relaxed text-slate-700">
                {item.quote}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-4 border-t border-slate-100 pt-5">
                <span
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-display text-sm font-bold text-white ${colors[i]}`}
                >
                  {initials[i]}
                </span>
                <span>
                  <p className="font-display text-sm font-bold text-slate-900">
                    {item.name}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-400">{item.role}</p>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Dots */}
        <div className="mt-8 flex justify-center gap-2.5">
          {t.items.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollToIdx(i)}
              aria-label={`${t.goToLabel} ${i + 1}`}
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
