import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import Features from "@/components/Features";
import Categories from "@/components/Categories";
import ProductGrid from "@/components/ProductGrid";
import CollectionShowcase from "@/components/CollectionShowcase";
import CTABanner from "@/components/CTABanner";
import BasketballGrid from "@/components/BasketballGrid";
import ClubsShowcase from "@/components/ClubsShowcase";
import FootballGame from "@/components/FootballGame";
import StatsSection from "@/components/StatsSection";
import Testimonials from "@/components/Testimonials";
import BrandsStrip from "@/components/BrandsStrip";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroBanner />
      <Features />
      <Categories />
      <ProductGrid />
      <CollectionShowcase />
      <CTABanner />
      <BasketballGrid />
      <ClubsShowcase />
      <FootballGame />
      <StatsSection />
      <Testimonials />
      <BrandsStrip />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
