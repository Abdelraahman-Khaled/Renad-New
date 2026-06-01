import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import FinalCTA from "../components/FinalCTA";
import { ArrowRight } from "../components/icons";

export const metadata = {
  title: "Blog — Renad International Trading",
  description:
    "Insights and updates on consumer-brand distribution, market entry, and retail growth across the GCC from Renad International Trading.",
};

const posts = [
  {
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1000&q=80",
    tag: "Market Entry",
    title: "How International Brands Win Shelf Space in GCC Pharmacy Chains",
    excerpt:
      "From registration to retail negotiation — the playbook for landing a global brand on Gulf shelves, and the pitfalls that slow new entrants down.",
    date: "May 28, 2026",
    read: "5 min read",
  },
  {
    img: "https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&w=800&q=80",
    tag: "Oral Care",
    title: "The Growing Demand for Premium Mouth Care Across the Gulf",
    excerpt:
      "Why breath and tongue care is one of the fastest-growing personal-care segments in the region — and what it means for brands.",
    date: "May 14, 2026",
    read: "4 min read",
  },
  {
    img: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
    tag: "Distribution",
    title: "Building a Compliant, Reliable Route to Retail in Six Markets",
    excerpt:
      "Inside the distribution backbone that moves products from import to shelf across all six GCC countries.",
    date: "Apr 30, 2026",
    read: "6 min read",
  },
  {
    img: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=800&q=80",
    tag: "Retail",
    title: "Modern Trade vs. Traditional Retail: Where Brands Should Focus",
    excerpt:
      "A look at the shifting balance between modern trade and traditional channels in the Gulf consumer market.",
    date: "Apr 12, 2026",
    read: "5 min read",
  },
  {
    img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80",
    tag: "Regulation",
    title: "Navigating Product Registration and Labeling in the GCC",
    excerpt:
      "The regulatory essentials every consumer brand needs to know before entering Saudi Arabia and the wider Gulf.",
    date: "Mar 25, 2026",
    read: "7 min read",
  },
  {
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
    tag: "Insights",
    title: "Five Signals Your Brand Is Ready to Expand into the Gulf",
    excerpt:
      "Practical indicators that it's time to take your consumer brand into the GCC — and how a distribution partner accelerates it.",
    date: "Mar 08, 2026",
    read: "4 min read",
  },
];

export default function BlogPage() {
  return (
    <div className="relative">
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Newsroom"
          title="Insights & Updates"
          subtitle="Perspectives on consumer-brand distribution, market entry, and retail growth across the GCC."
          crumb="Blog"
        />

        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <article
                  key={p.title}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-card transition-shadow duration-300 hover:shadow-lift"
                >
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={p.img}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-cta px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm">
                      {p.tag}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-3 text-xs font-medium text-slate-400">
                      <span>{p.date}</span>
                      <span className="h-1 w-1 rounded-full bg-slate-300" />
                      <span>{p.read}</span>
                    </div>
                    <h2 className="mt-3 font-display text-lg font-bold leading-snug text-slate-900 transition-colors duration-200 group-hover:text-primary">
                      {p.title}
                    </h2>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-500">
                      {p.excerpt}
                    </p>
                    <a
                      href="#"
                      className="mt-5 inline-flex w-fit cursor-pointer items-center gap-2 text-sm font-semibold text-primary transition-colors duration-200 hover:text-primary-dark"
                    >
                      Read more
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
