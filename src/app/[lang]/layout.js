import { Poppins, Open_Sans, Tajawal } from "next/font/google";
import { notFound } from "next/navigation";
import ScrollAnimations from "../components/ScrollAnimations";
import { LangProvider } from "./LangContext";
import { getDictionary, hasLocale } from "./dictionaries";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export async function generateStaticParams() {
  return [{ lang: "ar" }, { lang: "en" }];
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.metadata.title,
    description: dict.metadata.description,
  };
}

export default async function LangLayout({ children, params }) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const dir = lang === "ar" ? "rtl" : "ltr";
  const isAr = lang === "ar";

  return (
    <html
      lang={lang}
      dir={dir}
      className={`${poppins.variable} ${openSans.variable} ${tajawal.variable} h-full antialiased`}
    >
      <body
        className={`min-h-full bg-white text-slate-700 ${
          isAr ? "font-arabic" : "font-sans"
        }`}
      >
        <LangProvider lang={lang} dict={dict}>
          <ScrollAnimations />
          {children}
        </LangProvider>
      </body>
    </html>
  );
}
