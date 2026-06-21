import LegalPage from "../../components/LegalPage";
import { getDictionary, hasLocale } from "../dictionaries";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.termsPage.title,
    description: dict.termsPage.description,
  };
}

export default async function TermsPage({ params }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  return <LegalPage dict={dict} lang={lang} t={dict.termsPage} />;
}
