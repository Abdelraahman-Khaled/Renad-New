import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Progress from "./components/Progress";
import Pillars from "./components/Pillars";
import GccMap from "./components/GccMap";
import BrandShowcase from "./components/BrandShowcase";
import ProductCategories from "./components/ProductCategories";
import Marquee from "./components/Marquee";
import HowWeWork from "./components/HowWeWork";
import VisionMission from "./components/VisionMission";
import LatestNews from "./components/LatestNews";
import Testimonials from "./components/Testimonials";
import Partners from "./components/Partners";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="relative">
      <Navbar />
      <main>
        <Hero />
        <Progress />
        <Pillars />
        {/* <BrandShowcase /> */}
        <ProductCategories />
        <Marquee />
        <HowWeWork />
        <VisionMission />
        <LatestNews />
        <Testimonials />
        <Partners />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
