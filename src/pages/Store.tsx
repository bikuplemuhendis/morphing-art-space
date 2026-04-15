import { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { Link } from "react-router-dom";

const categoryTitles: Record<string, string> = {
  futbol: "FUTBOL FORMALARI",
  basketbol: "BASKETBOL FORMALARI",
  voleybol: "VOLEYBOL FORMALARI",
};

const Store = () => {
  const { category } = useParams();
  const [activeCategory, setActiveCategory] = useState(category || "all");

  const filtered = activeCategory === "all" ? products : products.filter((p) => p.category === activeCategory);
  const title = activeCategory === "all" ? "TÜM ÜRÜNLER" : categoryTitles[activeCategory] || "MAĞAZA";

  const tabs = [
    { key: "all", label: "Tümü" },
    { key: "futbol", label: "Futbol" },
    { key: "basketbol", label: "Basketbol" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="container mx-auto px-4 py-8">
        <h1 className="font-display text-4xl sm:text-5xl text-foreground mb-6">{title}</h1>

        {/* Category tabs */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveCategory(tab.key)}
              className={`px-5 py-2 rounded-lg font-semibold text-sm transition-all ${
                activeCategory === tab.key
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground hover:bg-secondary/80"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <p className="text-muted-foreground mb-6">{filtered.length} ürün bulundu</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filtered.map((product) => (
            <Link key={product.id} to={`/urun/${product.id}`}>
              <ProductCard {...product} />
            </Link>
          ))}
        </div>
      </section>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Store;
