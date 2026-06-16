import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PageHeader from "../../components/PageHeader";
import ProductsExplorer from "../../components/ProductsExplorer";
import FinalCTA from "../../components/FinalCTA";
import { getDictionary, hasLocale } from "../dictionaries";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.productsPage.title,
    description: dict.productsPage.description,
  };
}

export default async function ProductsPage({ params }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const t = dict.productsPage;

  return (
    <div className="relative">
      <Navbar />
      <main>
        <PageHeader
          eyebrow={t.eyebrow}
          title={t.heading}
          subtitle={t.subtitle}
          crumb={t.breadcrumb}
          dict={dict}
          image="/images/products-hero.png"
        />
        <ProductsExplorer />
        <FinalCTA dict={dict} />
      </main>
      <Footer dict={dict} lang={lang} />
    </div>
  );
}
