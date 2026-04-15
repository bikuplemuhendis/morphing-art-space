import { useState, useEffect, useMemo } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProductCard from "@/components/ProductCard";
import CategorySidebar from "@/components/CategorySidebar";
import { products, getClubs } from "@/data/products";
import { Link } from "react-router-dom";
import { Filter, LayoutGrid, List, ChevronLeft, ChevronRight } from "lucide-react";

const categoryTitles: Record<string, string> = {
  futbol: "FUTBOL FORMALARI",
  basketbol: "BASKETBOL FORMALARI",
  voleybol: "VOLEYBOL FORMALARI",
  kaleci: "KALECİ FORMALARI",
  aksesuar: "AKSESUARLAR",
  kulupler: "KULÜP FORMALARI",
  "yeni-sezon": "YENİ SEZON ÜRÜNLERİ",
};

type SortOption = "newest" | "price-asc" | "price-desc" | "name-asc" | "name-desc" | "discount";

const sortLabels: Record<SortOption, string> = {
  newest: "En yeniye göre",
  "price-asc": "Fiyat: Düşükten Yükseğe",
  "price-desc": "Fiyat: Yüksekten Düşüğe",
  "name-asc": "İsim: A-Z",
  "name-desc": "İsim: Z-A",
  discount: "En çok indirim",
};

const perPageOptions = [12, 24, 48, 100];

const Store = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const clubFilter = searchParams.get("club");
  const [activeCategory, setActiveCategory] = useState(category || "all");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [perPage, setPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (category) setActiveCategory(category);
    else setActiveCategory("all");
  }, [category]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, clubFilter, sortBy, perPage]);

  // Filter
  let filtered = activeCategory === "all" ? products : products.filter((p) => p.category === activeCategory);
  if (clubFilter) {
    filtered = filtered.filter((p) => p.club === clubFilter);
  }

  // Sort
  const sorted = useMemo(() => {
    const arr = [...filtered];
    switch (sortBy) {
      case "price-asc": return arr.sort((a, b) => a.salePrice - b.salePrice);
      case "price-desc": return arr.sort((a, b) => b.salePrice - a.salePrice);
      case "name-asc": return arr.sort((a, b) => a.name.localeCompare(b.name, "tr"));
      case "name-desc": return arr.sort((a, b) => b.name.localeCompare(a.name, "tr"));
      case "discount": return arr.sort((a, b) => b.discount - a.discount);
      default: return arr;
    }
  }, [filtered, sortBy]);

  // Pagination
  const totalPages = Math.ceil(sorted.length / perPage);
  const paginatedProducts = sorted.slice((currentPage - 1) * perPage, currentPage * perPage);

  const title = clubFilter
    ? `${clubFilter.toUpperCase()} FORMALARI`
    : activeCategory === "all"
      ? "TÜM ÜRÜNLER"
      : categoryTitles[activeCategory] || "MAĞAZA";

  const clubs = getClubs();
  const showClubFilter = activeCategory === "kulupler" && !clubFilter;

  const pageNumbers = useMemo(() => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  }, [currentPage, totalPages]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero banner */}
      <div className="gradient-hero py-10">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-4xl sm:text-5xl text-primary-foreground">{title}</h1>
          <p className="text-primary-foreground/70 mt-2">{sorted.length} ürün bulundu</p>
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
          {/* Sidebar */}
          <div className={`${sidebarOpen ? "block" : "hidden"} lg:block`}>
            <CategorySidebar />
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="bg-card border border-border rounded-xl px-4 py-3 mb-6 flex flex-wrap items-center gap-3">
              {/* Sort */}
              <div className="flex items-center gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer"
                >
                  {Object.entries(sortLabels).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>

              {/* View mode */}
              <div className="flex items-center border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 transition-colors ${viewMode === "grid" ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground hover:text-foreground"}`}
                  title="Izgara görünüm"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 transition-colors ${viewMode === "list" ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground hover:text-foreground"}`}
                  title="Liste görünüm"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Spacer */}
              <div className="flex-1" />

              {/* Per page */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground hidden sm:inline">Gösterim</span>
                <select
                  value={perPage}
                  onChange={(e) => setPerPage(Number(e.target.value))}
                  className="bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer"
                >
                  {perPageOptions.map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
            </div>

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

            {/* Products - Grid view */}
            {viewMode === "grid" && (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {paginatedProducts.map((product) => (
                  <Link key={product.id} to={`/urun/${product.id}`}>
                    <ProductCard {...product} />
                  </Link>
                ))}
              </div>
            )}

            {/* Products - List view */}
            {viewMode === "list" && (
              <div className="flex flex-col gap-4">
                {paginatedProducts.map((product) => (
                  <Link
                    key={product.id}
                    to={`/urun/${product.id}`}
                    className="bg-card border border-border rounded-xl p-4 flex gap-4 items-center hover:border-primary hover:shadow-lg transition-all group"
                  >
                    <div className="w-24 h-24 rounded-lg overflow-hidden bg-secondary shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-1 mt-0.5">{product.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-muted-foreground text-sm line-through">
                          {product.originalPrice.toFixed(2)}₺
                        </span>
                        <span className="text-primary font-bold text-lg">
                          {product.salePrice.toFixed(2)}₺
                        </span>
                        <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-0.5 rounded-full">
                          %{product.discount}
                        </span>
                      </div>
                    </div>
                    <div className="hidden sm:flex flex-col items-end gap-1">
                      <span className="text-xs text-muted-foreground">{product.sku}</span>
                      <div className="flex gap-1">
                        {product.sizes.slice(0, 4).map(s => (
                          <span key={s} className="text-xs border border-border rounded px-1.5 py-0.5 text-muted-foreground">{s}</span>
                        ))}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {paginatedProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">Bu kategoride henüz ürün bulunmuyor.</p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-1.5 mt-10">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary disabled:opacity-30 disabled:pointer-events-none transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {pageNumbers.map((page, i) =>
                  page === "..." ? (
                    <span key={`dots-${i}`} className="w-9 h-9 flex items-center justify-center text-muted-foreground text-sm">...</span>
                  ) : (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page as number)}
                      className={`w-9 h-9 rounded-lg text-sm font-semibold transition-all ${
                        currentPage === page
                          ? "bg-primary text-primary-foreground"
                          : "border border-border text-foreground hover:border-primary hover:text-primary"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}

                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary disabled:opacity-30 disabled:pointer-events-none transition-all"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Page info */}
            {sorted.length > 0 && (
              <p className="text-center text-sm text-muted-foreground mt-3">
                {(currentPage - 1) * perPage + 1}-{Math.min(currentPage * perPage, sorted.length)} / {sorted.length} ürün gösteriliyor
              </p>
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
