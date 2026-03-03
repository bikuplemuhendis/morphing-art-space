import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import Features from "@/components/Features";
import Categories from "@/components/Categories";
import ProductGrid from "@/components/ProductGrid";
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
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
