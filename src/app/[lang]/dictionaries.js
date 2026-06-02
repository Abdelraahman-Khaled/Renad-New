import "server-only";

const dictionaries = {
  ar: () => import("./dictionaries/ar.json").then((module) => module.default),
  en: () => import("./dictionaries/en.json").then((module) => module.default),
};

export const locales = ["ar", "en"];
export const defaultLocale = "ar";

export const hasLocale = (locale) => locale in dictionaries;

export const getDictionary = async (locale) => dictionaries[locale]();
