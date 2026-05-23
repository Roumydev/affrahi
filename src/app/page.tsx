import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/home/Hero";
import Stats from "@/components/sections/home/Stats";
import WhyChooseUs from "@/components/sections/home/WhyChoose";
import HowItWorks from "@/components/sections/home/HowItWorks";
import ReadyToBook from "@/components/sections/home/ReadyToBook";
import Testimonials from "@/components/sections/home/Testimonials";
import FeaturedVenues from "@/components/sections/home/FeaturedVenues";
const Spacer = () => {
  return <div className="h-20 w-full" />; // مسافة 80px
};

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-50">
      <Navbar />
      <Hero />
      <Stats />
      {/* 1. علاش يخيرونا */}
      <WhyChooseUs />
      <FeaturedVenues />
      <HowItWorks />
      <Testimonials />

      <ReadyToBook />
      {/* 4. الـ Footer دائماً هو الأخير */}
      <Spacer />

      <Footer />
    </main>
  );
}
