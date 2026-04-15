import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProductCard from "@/components/ProductCard";
import { products, getClubs } from "@/data/products";
import { Link } from "react-router-dom";

const categoryTitles: Record<string, string> = {
  futbol: "FUTBOL FORMALARI",
  basketbol: "BASKETBOL FORMALARI",
  voleybol: "VOLEYBOL FORMALARI",
  kaleci: "KALECİ FORMALARI",
  aksesuar: "AKSESUARLAR",
  kulupler: "KULÜP FORMALARI",
};

const Store = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const clubFilter = searchParams.get("club");
  const [activeCategory, setActiveCategory] = useState(category || "all");

  useEffect(() => {
    if (category) setActiveCategory(category);
  }, [category]);

  let filtered = activeCategory === "all" ? products : products.filter((p) => p.category === activeCategory);
  if (clubFilter) {
    filtered = filtered.filter((p) => p.club === clubFilter);
  }

  const title = clubFilter
    ? `${clubFilter.toUpperCase()} FORMALARI`
    : activeCategory === "all"
      ? "TÜM ÜRÜNLER"
      : categoryTitles[activeCategory] || "MAĞAZA";

  const tabs = [
    { key: "all", label: "Tümü" },
    { key: "futbol", label: "Futbol" },
    { key: "basketbol", label: "Basketbol" },
    { key: "voleybol", label: "Voleybol" },
    { key: "kaleci", label: "Kaleci" },
    { key: "kulupler", label: "Kulüpler" },
    { key: "aksesuar", label: "Aksesuar" },
  ];

  const clubs = getClubs();
  const showClubFilter = activeCategory === "kulupler" && !clubFilter;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero banner for category */}
      <div className="gradient-hero py-10">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-4xl sm:text-5xl text-primary-foreground">{title}</h1>
          <p className="text-primary-foreground/70 mt-2">{filtered.length} ürün bulundu</p>
        </div>
      </div>

      <section className="container mx-auto px-4 py-8">
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

        {/* Club cards */}
        {showClubFilter && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {clubs.map((club) => (
              <Link
                key={club}
                to={`/magaza/kulupler?club=${encodeURIComponent(club)}`}
                className="bg-card border border-border rounded-xl p-6 text-center hover:border-primary hover:shadow-lg transition-all group"
              >
                <h3 className="font-display text-2xl text-foreground group-hover:text-primary transition-colors">{club}</h3>
                <p className="text-muted-foreground text-sm mt-1">
                  {products.filter(p => p.club === club).length} ürün
                </p>
              </Link>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filtered.map((product) => (
            <Link key={product.id} to={`/urun/${product.id}`}>
              <ProductCard {...product} />
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">Bu kategoride henüz ürün bulunmuyor.</p>
          </div>
        )}
      </section>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Store;
