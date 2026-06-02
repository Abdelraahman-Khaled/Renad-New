"use client";

import { createContext, useContext } from "react";

const LangContext = createContext({
  lang: "ar",
  dir: "rtl",
  dict: {},
});

export function LangProvider({ lang, dict, children }) {
  const dir = lang === "ar" ? "rtl" : "ltr";
  return (
    <LangContext.Provider value={{ lang, dir, dict }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
