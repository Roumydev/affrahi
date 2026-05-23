import Navbar from "@/components/layout/Navbar";
import AboutHero from "@/components/sections/about/AboutHero";
import OurStory from "@/components/sections/about/OurStory";
import Stats from "@/components/sections/about/Stats";
import OurValues from "@/components/sections/about/OurValues";
import MissionVision from "@/components/sections/about/MissionVision";
import AboutCTA from "@/components/sections/about/AboutCTA";
import Footer from "@/components/layout/Footer";
export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <AboutHero />
      <OurStory />
      <Stats />
      <OurValues />
      <MissionVision />
      <AboutCTA />
      <Footer />
    </main>
  );
}
