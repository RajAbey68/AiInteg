import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import WhoItsFor from "@/components/WhoItsFor";
import HowItWorks from "@/components/HowItWorks";
import Community from "@/components/Community";
import BookCredibility from "@/components/BookCredibility";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <Hero />
        <WhoItsFor />
        <HowItWorks />
        <Community />
        <BookCredibility />
        <Testimonials />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
