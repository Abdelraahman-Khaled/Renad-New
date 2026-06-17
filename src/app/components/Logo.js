"use client";

import Image from "next/image";
import { useLang } from "../[lang]/LangContext";

export default function Logo({ className = "", ...props }) {
  const { lang } = useLang();
  return (
    <a href={`/${lang}`} className={`flex items-center ${className}`}>
      <Image
        src="/logo.webp"
        alt="Renad International Trading"
        width={978}
        height={610}
        priority
        className="h-14 w-auto"
      />
    </a>
  );
}
