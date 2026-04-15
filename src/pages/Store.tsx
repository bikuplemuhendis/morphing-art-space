import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProductCard from "@/components/ProductCard";
import CategorySidebar from "@/components/CategorySidebar";
import { products, getClubs } from "@/data/products";
import { Link } from "react-router-dom";
import { Filter } from "lucide-react";

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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (category) setActiveCategory(category);
    else setActiveCategory("all");
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

  const clubs = getClubs();
  const showClubFilter = activeCategory === "kulupler" && !clubFilter;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero banner */}
      <div className="gradient-hero py-10">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-4xl sm:text-5xl text-primary-foreground">{title}</h1>
          <p className="text-primary-foreground/70 mt-2">{filtered.length} ürün bulundu</p>
        </div>
      </div>

      <section className="container mx-auto px-4 py-8">
        {/* Mobile filter toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden flex items-center gap-2 mb-4 px-4 py-2 bg-card border border-border rounded-lg text-sm font-semibold text-foreground"
        >
          <Filter className="w-4 h-4" />
          Kategoriler
        </button>

        <div className="flex gap-8">
          {/* Sidebar - desktop always visible, mobile toggle */}
          <div className={`${sidebarOpen ? "block" : "hidden"} lg:block`}>
            <CategorySidebar />
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Club cards */}
            {showClubFilter && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
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

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
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
          </div>
        </div>
      </section>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Store;
