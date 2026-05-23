import Navbar from "@/components/layout/Navbar";
import ContactHero from "@/components/sections/contact/ContactHero";
import ContactInfoCards from "@/components/sections/contact/ContactInfoCards";
import ContactForm from "@/components/sections/contact/ContactForm";
import OfficeMap from "@/components/sections/contact/OfficeMap";
import ImmediateAssistance from "@/components/sections/contact/ImmediateAssistance";
import FAQPreview from "@/components/sections/contact/FAQPreview";
import Footer from "@/components/layout/Footer";
export default function ContactPage() {
  return (
    <main>
      <Navbar />
      <ContactHero />
      <ContactInfoCards />
      <ContactForm />
      <OfficeMap />
      <ImmediateAssistance />
      <FAQPreview />
      <Footer />
    </main>
  );
}
