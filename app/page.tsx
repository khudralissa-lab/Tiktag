import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import UseCasesStrip from "@/components/landing/UseCasesStrip";
import HowItWorks from "@/components/landing/HowItWorks";
import Products from "@/components/landing/Products";
import SmartProfile from "@/components/landing/SmartProfile";
import ForBusinesses from "@/components/landing/ForBusinesses";
import AnalyticsSection from "@/components/landing/AnalyticsSection";
import AIReady from "@/components/landing/AIReady";
import Pricing from "@/components/landing/Pricing";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <main className="bg-black text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <UseCasesStrip />
      <HowItWorks />
      <Products />
      <SmartProfile />
      <ForBusinesses />
      <AnalyticsSection />
      <AIReady />
      <Pricing />
      <FinalCTA />
      <Footer />
    </main>
  );
}
