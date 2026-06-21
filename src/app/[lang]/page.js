import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Progress from "../components/Progress";
import Pillars from "../components/Pillars";
import ProductCategories from "../components/ProductCategories";
import Marquee from "../components/Marquee";
import HowWeWork from "../components/HowWeWork";
import VisionMission from "../components/VisionMission";
import LatestNews from "../components/LatestNews";
import Testimonials from "../components/Testimonials";
import Partners from "../components/Partners";
import FinalCTA from "../components/FinalCTA";
import Footer from "../components/Footer";
import { getDictionary, hasLocale } from "./dictionaries";
import { getBlogs } from "./blog/api";
import { notFound } from "next/navigation";

export default async function Home({ params }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const { blogs } = await getBlogs(lang);

  return (
    <div className="relative">
      <Navbar />
      <main>
        <Hero />
        <Progress dict={dict} />
        <Pillars dict={dict} />
        {/* <BrandShowcase /> */}
        <ProductCategories dict={dict} />
        <Marquee dict={dict} />
        <HowWeWork dict={dict} />
        <VisionMission dict={dict} />
        <LatestNews dict={dict} lang={lang} blogs={blogs} />
        <Testimonials />
        <Partners />
        <FinalCTA dict={dict} />
      </main>
      <Footer dict={dict} lang={lang} />
    </div>
  );
}
