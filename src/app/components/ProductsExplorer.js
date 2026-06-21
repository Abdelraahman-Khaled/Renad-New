"use client";

import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { Search, ArrowRight } from "./icons";
import { useLang } from "../[lang]/LangContext";

/* ---- inline icons ---- */
const Clock = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);
const Bell = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
    <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.7 21a2 2 0 0 1-3.4 0" />
  </svg>
);
const Close = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);
const Share = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <path d="m8.6 13.5 6.8 4M15.4 6.5 8.6 10.5" />
  </svg>
);

const FALLBACK_IMAGE = "/images/products-hero.png";

const productImage = (p) => p?.photos?.[0]?.url || FALLBACK_IMAGE;
const productImageAlt = (p) => p?.photos?.[0]?.alt || "";

function Overlay({ onClose, children }) {
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div onClick={(e) => e.stopPropagation()} className="w-full">
        {children}
      </div>
    </div>
  );
}

export default function ProductsExplorer({ products = [] }) {
  const { dict, lang } = useLang();
  const t = dict.productsExplorer;

  // Fixed filter set defined in the dictionary — the filter bar stays the same
  // regardless of which categories the API currently returns. Categories listed
  // in `comingSoonCategories` have no products yet, so their chips open a
  // "coming soon" prompt instead of filtering.
  const categoryFilters = useMemo(() => {
    const soonIds = (t.comingSoonCategories || []).map(Number);
    return Object.entries(t.categories || {}).map(([id, label]) => ({
      id: Number(id),
      label,
      soon: soonIds.includes(Number(id)),
    }));
  }, [t.categories, t.comingSoonCategories]);
  const categoryLabel = (id) =>
    t.categories?.[String(id)] || `${t.categoryFallback} ${id}`;

  const [active, setActive] = useState("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [comingSoon, setComingSoon] = useState(null); // category id, or null
  const [notified, setNotified] = useState(false);
  const [copied, setCopied] = useState(false);

  const open = Boolean(selected) || comingSoon !== null;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setSelected(null);
        setComingSoon(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const q = query.trim().toLowerCase();
  const visible = products.filter((p) => {
    const inCategory = active === "all" || p.category === active;
    const text = `${p.description || ""} ${p.size || ""}`.toLowerCase();
    return inCategory && (q === "" || text.includes(q));
  });

  const handleShare = async (p) => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.share) {
      try {
        await navigator.share({ title: "Renad", text: p.description || "", url });
        return;
      } catch {
        /* user cancelled */
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
  };

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        {/* Search */}
        <div className="mx-auto max-w-xl">
          <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-5 py-3 shadow-sm focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/30">
            <Search className="h-5 w-5 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
              aria-label={t.searchLabel}
            />
          </div>
        </div>

        {/* Filters */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => setActive("all")}
            className={`inline-flex cursor-pointer items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-200 ${
              active === "all"
                ? "bg-primary text-white"
                : "border border-slate-200 bg-white text-slate-600 hover:border-primary hover:text-primary"
            }`}
          >
            {t.filters.all}
          </button>

          {categoryFilters.map((f) =>
            f.soon ? (
              <button
                key={f.id}
                type="button"
                onClick={() => setComingSoon(f.id)}
                className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 transition-colors duration-200 hover:border-primary hover:text-primary"
              >
                {f.label}
                <span className="rounded-full bg-cta/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-cta">
                  {t.soon}
                </span>
              </button>
            ) : (
              <button
                key={f.id}
                type="button"
                onClick={() => setActive(f.id)}
                className={`inline-flex cursor-pointer items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-200 ${
                  active === f.id
                    ? "bg-primary text-white"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-primary hover:text-primary"
                }`}
              >
                {f.label}
              </button>
            )
          )}
        </div>

        {/* Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setSelected(p)}
              className="group flex cursor-pointer flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white text-start shadow-card transition-shadow duration-300 hover:shadow-lift"
            >
              <div className="relative h-44 overflow-hidden bg-surface">
                <Image
                  src={productImage(p)}
                  alt={productImageAlt(p)}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {p.category !== null && p.category !== undefined && (
                  <span className="absolute left-4 top-4 rounded-full bg-cta px-3 py-1 text-[11px] font-semibold text-white shadow-sm">
                    {categoryLabel(p.category)}
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="line-clamp-2 font-display text-base font-bold text-slate-900">
                  {p.description}
                </h3>
                {p.size && (
                  <p className="mt-1.5 text-xs font-medium text-slate-400">
                    {t.sizeLabel}: {p.size}
                  </p>
                )}
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors group-hover:text-primary-dark">
                  {t.viewDetails}
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5 rtl:group-hover:translate-x-0" />
                </span>
              </div>
            </button>
          ))}
        </div>

        {visible.length === 0 && (
          <p className="mt-16 text-center text-slate-400">
            {products.length === 0 ? t.empty : t.noResults}
          </p>
        )}
      </div>

      {/* Product detail modal */}
      {selected && (
        <Overlay onClose={() => setSelected(null)}>
          <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl bg-white shadow-lift">
            <button
              type="button"
              onClick={() => setSelected(null)}
              aria-label="Close"
              className="absolute end-4 top-4 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/90 text-slate-500 shadow-sm transition-colors hover:bg-slate-100"
            >
              <Close className="h-5 w-5" />
            </button>
            <div className="grid sm:grid-cols-2">
              <div className="relative h-56 bg-surface sm:h-full">
                <Image
                  src={productImage(selected)}
                  alt={productImageAlt(selected)}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="p-7">
                {(selected.category !== null && selected.category !== undefined) && (
                  <span className="inline-block rounded-full bg-surface px-3 py-1 text-xs font-semibold text-primary-dark">
                    {categoryLabel(selected.category)}
                  </span>
                )}
                <p className="mt-4 text-sm leading-relaxed text-slate-600">
                  {selected.description}
                </p>
                {selected.size && (
                  <p className="mt-4 text-sm text-slate-700">
                    <span className="font-semibold text-slate-900">
                      {t.sizeLabel}:
                    </span>{" "}
                    {selected.size}
                  </p>
                )}
                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <a
                    href={`/${lang}/contact`}
                    className="group inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-primary-dark"
                  >
                    {t.inquire}
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5 rtl:group-hover:translate-x-0" />
                  </a>
                  <button
                    type="button"
                    onClick={() => handleShare(selected)}
                    className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:border-primary hover:text-primary"
                  >
                    <Share className="h-4 w-4" />
                    {copied ? t.linkCopied : t.share}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Overlay>
      )}

      {/* Coming soon modal */}
      {comingSoon !== null && (
        <Overlay
          onClose={() => {
            setComingSoon(null);
            setNotified(false);
          }}
        >
          <div className="relative mx-auto max-w-md rounded-3xl bg-white p-8 text-center shadow-lift">
            <button
              type="button"
              onClick={() => {
                setComingSoon(null);
                setNotified(false);
              }}
              aria-label="Close"
              className="absolute end-4 top-4 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-slate-200"
            >
              <Close className="h-5 w-5" />
            </button>

            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cta/10 text-cta">
              <Clock className="h-8 w-8" />
            </span>
            <h3 className="mt-5 font-display text-xl font-bold text-slate-900">
              {categoryLabel(comingSoon)}
            </h3>

            {notified ? (
              <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-slate-500">
                {t.comingSoonNotified}
              </p>
            ) : (
              <>
                <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-slate-500">
                  {t.comingSoonText}
                </p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setNotified(true);
                  }}
                  className="mt-6 space-y-3"
                >
                  <input
                    type="email"
                    required
                    placeholder={t.emailPlaceholder}
                    aria-label="Email"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition-shadow placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/30"
                  />
                  <button
                    type="submit"
                    className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-primary-dark"
                  >
                    <Bell className="h-4 w-4" />
                    {t.notifyMe}
                  </button>
                </form>
              </>
            )}
          </div>
        </Overlay>
      )}
    </section>
  );
}
