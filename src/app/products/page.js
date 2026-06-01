import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import ProductsExplorer from "../components/ProductsExplorer";
import FinalCTA from "../components/FinalCTA";

export const metadata = {
  title: "Products — Renad International Trading",
  description:
    "Explore the brands Renad distributes across the GCC — PaperMints breath care, TUNG tongue care, and more categories coming soon.",
};

export default function ProductsPage() {
  return (
    <div className="relative">
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Products & Brands"
          title="Our Products"
          subtitle="The consumer brands we bring to retail and pharmacy shelves across the GCC — with new categories on the way."
          crumb="Products"
        />
        <ProductsExplorer />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
