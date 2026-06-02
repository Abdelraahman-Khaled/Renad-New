"use client";

import { useState, useEffect } from "react";
import Logo from "./Logo";
import LangSwitcher from "./LangSwitcher";
import { Menu, Search, Linkedin, XTwitter, Instagram } from "./icons";
import { useLang } from "../[lang]/LangContext";

const socials = [Linkedin, XTwitter, Instagram];

export default function Navbar() {
  const { lang, dict } = useLang();
  const [scrolled, setScrolled] = useState(false);

  const links = [
    { label: dict.nav.aboutUs, href: `/${lang}/about` },
    { label: dict.nav.productsBrands, href: `/${lang}/products` },
    { label: dict.nav.blog, href: `/${lang}/blog` },
    { label: dict.nav.contactUs, href: `/${lang}/contact` },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const light = !scrolled;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 lg:px-6">
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full px-4 py-2.5 transition-colors duration-300 ${
          scrolled
            ? "border border-slate-100 bg-white/95 shadow-card backdrop-blur"
            : ""
        }`}
      >
        <Logo light={light} />

        {/* Links */}
        <ul className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  light
                    ? "text-white/85 hover:text-white"
                    : "text-slate-600 hover:text-primary"
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right cluster */}
        <div className="flex items-center gap-2">
          <LangSwitcher light={light} />

          <div className="hidden items-center gap-1 xl:flex">
            {socials.map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social link"
                className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-200 ${
                  light
                    ? "text-white/80 hover:bg-white/15"
                    : "text-slate-500 hover:bg-slate-100"
                }`}
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>

          <a
            href={`/${lang}/contact`}
            className={`group hidden items-center gap-2 rounded-full py-1.5 ps-5 pe-1.5 text-sm font-semibold transition-colors duration-200 sm:inline-flex ${
              light
                ? "bg-white text-primary-dark hover:bg-cyan-50"
                : "bg-primary text-white hover:bg-primary-dark"
            }`}
          >
            {dict.nav.partnerWithUs}
            <span
              className={`flex h-7 w-7 items-center justify-center rounded-full ${
                light ? "bg-primary text-white" : "bg-white text-primary"
              }`}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3.5 w-3.5 rtl:-scale-x-100"
                aria-hidden
              >
                <path d="M7 7h10v10M7 17 17 7" />
              </svg>
            </span>
          </a>

          <button
            type="button"
            aria-label="Open menu"
            className={`flex h-9 w-9 items-center justify-center rounded-full lg:hidden ${
              light
                ? "text-white hover:bg-white/15"
                : "text-slate-700 hover:bg-slate-100"
            }`}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </nav>
    </header>
  );
}
