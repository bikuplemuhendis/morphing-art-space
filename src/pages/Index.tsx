import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import Features from "@/components/Features";
import Categories from "@/components/Categories";
import ProductGrid from "@/components/ProductGrid";
import BasketballGrid from "@/components/BasketballGrid";
import CTABanner from "@/components/CTABanner";
import Testimonials from "@/components/Testimonials";
import BrandsStrip from "@/components/BrandsStrip";
import StatsSection from "@/components/StatsSection";
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
      <CTABanner />
      <BasketballGrid />
      <StatsSection />
      <Testimonials />
      <BrandsStrip />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
