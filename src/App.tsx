import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import UrgencyBand from "@/components/UrgencyBand";
import SectorSelector from "@/components/SectorSelector";
import WhyNotConsultant from "@/components/WhyNotConsultant";
import HowItWorks from "@/components/HowItWorks";
import Community from "@/components/Community";
import Testimonials from "@/components/Testimonials";
import BookCredibility from "@/components/BookCredibility";
import Pricing from "@/components/Pricing";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function App() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <UrgencyBand />
        <SectorSelector />
        <WhyNotConsultant />
        <HowItWorks />
        <Community />
        <Testimonials />
        <BookCredibility />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
