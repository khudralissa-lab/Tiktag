import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import CollectionsStrip from "@/components/landing/UseCasesStrip";
import ProductShowcase from "@/components/landing/Products";
import ProductConfigurator from "@/components/landing/ProductConfigurator";
import CinematicScene from "@/components/landing/HowItWorks";
import SmartProfile from "@/components/landing/SmartProfile";
import AnalyticsSection from "@/components/landing/AnalyticsSection";
import IntelligenceSection from "@/components/landing/AIReady";
import ForBusinesses from "@/components/landing/ForBusinesses";
import Pricing from "@/components/landing/Pricing";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <main className="bg-black text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <CollectionsStrip />
      <ProductShowcase />
      <ProductConfigurator />
      <CinematicScene />
      <SmartProfile />
      <AnalyticsSection />
      <IntelligenceSection />
      <ForBusinesses />
      <Pricing />
      <FinalCTA />
      <Footer />
    </main>
  );
}
