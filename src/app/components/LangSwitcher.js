"use client";

import { usePathname } from "next/navigation";
import { useLang } from "../[lang]/LangContext";

export default function LangSwitcher({ light }) {
  const { lang } = useLang();
  const pathname = usePathname();

  // Swap locale prefix in pathname
  const otherLang = lang === "ar" ? "en" : "ar";
  const newPath = pathname.replace(/^\/(ar|en)/, `/${otherLang}`);
  const label = lang === "ar" ? "EN" : "عربي";

  return (
    <a
      href={newPath}
      className={`flex h-8 items-center justify-center rounded-full px-3 text-xs font-bold tracking-wide transition-colors duration-200 ${
        light
          ? "bg-white/15 text-white hover:bg-white/25"
          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
      }`}
      aria-label={`Switch to ${otherLang === "ar" ? "Arabic" : "English"}`}
    >
      {label}
    </a>
  );
}
