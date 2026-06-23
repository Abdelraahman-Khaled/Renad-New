"use client";

import { useState } from "react";
import { Store, MapPin } from "./icons";
import { useLang } from "../[lang]/LangContext";

// Local fallback SVGs
const PillIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
    <path d="m8.5 8.5 7 7" />
  </svg>
);

const ShoppingBagIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
    <path d="M3 6h18" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

const HeartPulseIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    <path d="M3.22 12H9.5l1.5-4.5 2 9 1.5-4.5h6.27" />
  </svg>
);

const ActivityIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);

const MonitorSmartphoneIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h3" />
    <rect x="12" y="12" width="10" height="10" rx="2" />
  </svg>
);

const FuelIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="3" x2="15" y1="22" y2="22" />
    <path d="M4 22V4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v18" />
    <path d="M14 13h2a2 2 0 0 1 2 2v5a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5" />
    <rect x="6" y="6" width="4" height="4" />
  </svg>
);

const ShoppingCartIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="8" cy="21" r="1" />
    <circle cx="19" cy="21" r="1" />
    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
  </svg>
);

const Building2Icon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 22V8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14" />
    <path d="M3 10h18" />
    <path d="M3 14h18" />
    <path d="M3 18h18" />
    <path d="M9 22V16h6v6" />
  </svg>
);

const getFavicon = (domain) =>
  `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

const partners = [
  { en: "Abdullah Bawazir", ar: "عبد الله باوزير", Icon: Store, logoUrl: getFavicon("abawazir.net"), url: "https://abawazir.net", category: "retail" },
  { en: "Nice One", ar: "نايس ون", Icon: MonitorSmartphoneIcon, logoUrl: getFavicon("niceonesa.com"), url: "https://niceonesa.com/en", category: "retail" },
  { en: "Whites Pharmacies", ar: "صيدليات وايتس", Icon: ActivityIcon, logoUrl: getFavicon("whites.net"), url: "https://whites.net", category: "pharmacy" },
  { en: "Nahdi Pharmacies", ar: "صيدليات النهدي", Icon: HeartPulseIcon, logoUrl: getFavicon("nahdionline.com"), url: "https://www.nahdionline.com", category: "pharmacy" },
  { en: "Al Dawaa Pharmacies", ar: "صيدليات الدواء", Icon: PillIcon, logoUrl: getFavicon("al-dawaa.com"), url: "https://www.al-dawaa.com/ar/", category: "pharmacy" },
  { en: "Dar Al Amirat", ar: "دار الإمارات", Icon: ShoppingBagIcon, logoUrl: getFavicon("daralamirat.com.sa"), url: "https://daralamirat.com.sa/ar/", category: "retail" },
  { en: "Makhazen Al Enaya", ar: "مخازن العناية", Icon: Store, logoUrl: getFavicon("makhazenalenaya.sa"), url: "https://makhazenalenaya.sa", category: "retail" },
  { en: "Adam Pharmacies", ar: "صيدليات آدم", Icon: HeartPulseIcon, logoUrl: getFavicon("adamonline.com"), url: "https://adamonline.com", category: "pharmacy" },
  { en: "Ocean Pharmacies", ar: "صيدليات أوشن", Icon: PillIcon, logoUrl: getFavicon("oceanpharmacy.sa"), url: "https://oceanpharmacy.sa", category: "pharmacy" },
  { en: "Vaneer Al Kharj", ar: "فانير الخرج", Icon: ShoppingBagIcon, logoUrl: getFavicon("vaneersa.com"), url: "https://vaneersa.com", category: "retail" },
  { en: "Bahr Al Alamiah", ar: "بحر العالمية", Icon: Store, logoUrl: getFavicon("bader-intl.com"), url: "https://bader-intl.com", category: "retail" },
  { en: "SASCO Stations", ar: "محطات ساسكو", Icon: FuelIcon, logoUrl: getFavicon("sasco.com.sa"), url: "https://sasco.com.sa", category: "convenience" },
  { en: "Nojoom Al Batra", ar: "نجوم البتراء", Icon: MapPin, logoUrl: getFavicon("petrastars.com"), url: "https://petrastars.com", category: "pharmacy" },
  { en: "NMA Dammam", ar: "نما الدمام", Icon: Building2Icon, logoUrl: getFavicon("nmastores.com"), url: "https://nmastores.com", category: "retail" },
  { en: "Trolley", ar: "ترولي", Icon: ShoppingCartIcon, logoUrl: getFavicon("trolley.com.sa"), url: "https://trolley.com.sa", category: "convenience" },
  { en: "Outlet Stores", ar: "معارض اوتلت", Icon: Store, logoUrl: "", url: "", category: "retail" },
  { en: "Orange Pharmacies", ar: "صيدليات اورانج", Icon: ActivityIcon, logoUrl: getFavicon("orangepharmacy.sa"), url: "https://orangepharmacy.sa", category: "pharmacy" },
];

function PartnerLogo({ partner }) {
  const [imgError, setImgError] = useState(false);

  if (partner.logoUrl && !imgError) {
    return (
      <img
        src={partner.logoUrl}
        alt={partner.en}
        onError={() => setImgError(true)}
        className="h-10 w-10 object-contain opacity-80 contrast-125 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
      />
    );
  }

  const FallbackIcon = partner.Icon;
  return (
    <FallbackIcon className="h-7 w-7 text-primary/60 transition-colors duration-300 group-hover:text-primary" />
  );
}

export default function Partners() {
  const { lang, dict } = useLang();
  const t = dict.partners;
  const isAr = lang === "ar";

  const CATEGORIES = [
    { id: "all", label: t.categories.all },
    { id: "pharmacy", label: t.categories.pharmacy },
    { id: "retail", label: t.categories.retail },
    { id: "convenience", label: t.categories.convenience },
  ];

  const [activeCat, setActiveCat] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPartners = partners.filter((p) => {
    const matchesCat = activeCat === "all" || p.category === activeCat;
    const matchesSearch =
      p.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.ar.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section id="partners" className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        {/* Header Section with Search */}
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="inline-flex rounded-full bg-surface px-4 py-1.5 text-sm font-semibold text-primary-dark">
              {t.badge}
            </span>
            <h2 className="mt-4 max-w-xl font-display text-4xl font-bold leading-[1.1] text-slate-900 sm:text-5xl">
              {t.heading}
            </h2>
          </div>

          {/* Search bar */}
          <div className="relative w-full max-w-xs shrink-0">
            <span className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none text-slate-400">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </span>
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-slate-200 bg-white py-2.5 ps-10 pe-4 text-sm outline-hidden transition-colors duration-200 placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="mt-12 flex flex-wrap gap-2.5 border-b border-slate-100 pb-6">
          {CATEGORIES.map((cat) => {
            const count = partners.filter(p => cat.id === 'all' || p.category === cat.id).length;
            const isActive = activeCat === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCat(cat.id)}
                className={`flex items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-primary text-white shadow-md shadow-primary/20 scale-[1.02]"
                    : "bg-surface text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {cat.label}
                <span className={`inline-flex items-center justify-center rounded-full px-1.5 py-0.5 text-[9px] font-bold ${
                  isActive ? "bg-white/20 text-white" : "bg-slate-200 text-slate-500"
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Logo grid */}
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {filteredPartners.map((p) => {
            const Wrapper = p.url ? "a" : "div";
            const wrapperProps = p.url
              ? {
                  href: p.url,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  "aria-label": p.en,
                }
              : {};
            return (
              <Wrapper
                key={p.en}
                {...wrapperProps}
                className="group relative flex flex-col items-center justify-center gap-4 rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-card"
              >
                {/* Category indicator pill */}
                <span className="absolute end-3 top-3 scale-90 rounded-full bg-slate-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-slate-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {t.categoryLabels[p.category]}
                </span>

                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-50/50 p-2.5 transition-colors duration-300 group-hover:bg-primary/5">
                  <PartnerLogo partner={p} />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-display text-xs font-bold text-slate-700 transition-colors duration-300 group-hover:text-primary">
                    {isAr ? p.ar : p.en}
                  </span>
                  {isAr && (
                    <span
                      dir="ltr"
                      lang="en"
                      className="text-[11px] text-slate-400"
                    >
                      {p.en}
                    </span>
                  )}
                </div>
              </Wrapper>
            );
          })}

          {/* Empty search state */}
          {filteredPartners.length === 0 && (
            <div className="col-span-full py-16 text-center">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </span>
              <p className="mt-4 text-sm font-semibold text-slate-900">{t.noResults}</p>
              <p className="mt-1 text-xs text-slate-400">{t.noResultsHint}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
