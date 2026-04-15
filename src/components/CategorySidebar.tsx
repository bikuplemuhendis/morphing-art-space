import { Link, useParams, useSearchParams } from "react-router-dom";
import { ChevronDown, ChevronRight, Palette } from "lucide-react";
import { useState } from "react";
import { products, getClubs } from "@/data/products";
import { cn } from "@/lib/utils";

const categoryTree = [
  {
    key: "basketbol",
    label: "BASKETBOL",
    href: "/magaza/basketbol",
  },
  {
    key: "all",
    label: "BÜTÜN ÜRÜNLER",
    href: "/magaza",
  },
  {
    key: "futbol",
    label: "FUTBOL",
    href: "/magaza/futbol",
    children: [
      { label: "Futbol Formaları", href: "/magaza/futbol" },
      { label: "Futbol Şortları", href: "/magaza/aksesuar" },
      { label: "Çorap / Tozluk", href: "/magaza/aksesuar" },
      { label: "Kaptanlık Pazubantları", href: "/magaza/aksesuar" },
      { label: "Tekmelik", href: "/magaza/aksesuar" },
    ],
  },
  {
    key: "kaleci",
    label: "KALECİ ÜRÜNLERİ",
    href: "/magaza/kaleci",
  },
  {
    key: "kulupler",
    label: "KULÜPLER",
    href: "/magaza/kulupler",
    children: "clubs",
  },
  {
    key: "voleybol",
    label: "VOLEYBOL",
    href: "/magaza/voleybol",
  },
  {
    key: "aksesuar",
    label: "SPOR AKSESUARLARI",
    href: "/magaza/aksesuar",
  },
];

const productTags = [
  "Halı Saha", "Futbol Forması", "Basketbol", "Voleybol",
  "Kaleci Forması", "Dijital Forma", "Forma Tasarla",
  "Kırmızı Siyah", "Sarı Siyah", "Mavi Beyaz",
  "Siyah Beyaz", "Turuncu Beyaz", "Forma Sipariş",
  "Halı Saha Çorap", "Halı Saha Şort", "Kaleci Eldiveni",
  "Antrenman Yeleği", "Takım Yeleği",
];

const CategorySidebar = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const clubFilter = searchParams.get("club");
  const activeCategory = category || "all";
  const [expanded, setExpanded] = useState<string | null>(
    activeCategory === "futbol" ? "futbol" : activeCategory === "kulupler" ? "kulupler" : null
  );
  const clubs = getClubs();

  // Get 5 newest (last added) products for "Yeni Ürünler"
  const newProducts = [...products].reverse().slice(0, 5);

  const toggleExpand = (key: string) => {
    setExpanded(expanded === key ? null : key);
  };

  return (
    <aside className="w-full lg:w-72 shrink-0 space-y-6">
      {/* Categories */}
      <div className="bg-card border border-border rounded-xl overflow-hidden sticky top-20">
        <div className="bg-secondary px-5 py-3 border-b border-border">
          <h3 className="font-display text-lg text-foreground tracking-wide">KATEGORİLER</h3>
        </div>
        <nav className="p-3 flex flex-col gap-0.5">
          {categoryTree.map((cat) => {
            const isActive = activeCategory === cat.key && !clubFilter;
            const hasChildren = cat.children;
            const isExpanded = expanded === cat.key;

            return (
              <div key={cat.key}>
                <div className="flex items-center">
                  <Link
                    to={cat.href}
                    className={cn(
                      "flex-1 px-3 py-2 text-sm font-medium transition-all rounded-lg",
                      isActive
                        ? "text-primary font-semibold"
                        : "text-foreground hover:text-primary"
                    )}
                  >
                    {cat.label}
                  </Link>
                  {hasChildren && (
                    <button
                      onClick={() => toggleExpand(cat.key)}
                      className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                  )}
                </div>

                {/* Subcategories */}
                {hasChildren && isExpanded && (
                  <div className="ml-3 border-l-2 border-primary/20 pl-3 mb-1 flex flex-col gap-0.5">
                    {cat.children === "clubs"
                      ? clubs.map((club) => (
                          <Link
                            key={club}
                            to={`/magaza/kulupler?club=${encodeURIComponent(club)}`}
                            className={cn(
                              "px-3 py-1.5 text-sm rounded-md transition-all",
                              clubFilter === club
                                ? "text-primary font-semibold bg-primary/5"
                                : "text-muted-foreground hover:text-primary hover:bg-secondary"
                            )}
                          >
                            {club}
                          </Link>
                        ))
                      : (cat.children as { label: string; href: string }[]).map((child, i) => (
                          <Link
                            key={i}
                            to={child.href}
                            className="px-3 py-1.5 text-sm text-muted-foreground hover:text-primary hover:bg-secondary rounded-md transition-all"
                          >
                            {child.label}
                          </Link>
                        ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Design CTA */}
        <div className="p-3 border-t border-border">
          <Link
            to="/tasarla"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-all font-semibold text-sm"
          >
            <Palette className="w-5 h-5" />
            <span>Kendi Formanı Tasarla</span>
          </Link>
        </div>
      </div>

      {/* New Products */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="bg-secondary px-5 py-3 border-b border-border">
          <h3 className="font-display text-lg text-foreground tracking-wide">YENİ ÜRÜNLER</h3>
        </div>
        <div className="p-3 flex flex-col gap-3">
          {newProducts.map((product) => (
            <Link
              key={product.id}
              to={`/urun/${product.id}`}
              className="flex items-center gap-3 group hover:bg-secondary rounded-lg p-2 transition-colors"
            >
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-secondary shrink-0 border border-border">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                  {product.name}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-muted-foreground line-through">
                    {product.originalPrice.toFixed(2)}₺
                  </span>
                  <span className="text-sm font-bold text-primary">
                    {product.salePrice.toFixed(2)}₺
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Product Tags */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="bg-secondary px-5 py-3 border-b border-border">
          <h3 className="font-display text-lg text-foreground tracking-wide">ÜRÜN ETİKETLERİ</h3>
        </div>
        <div className="p-4 flex flex-wrap gap-2">
          {productTags.map((tag) => (
            <Link
              key={tag}
              to={`/magaza?q=${encodeURIComponent(tag)}`}
              className="px-3 py-1.5 text-xs border border-border rounded-full text-muted-foreground hover:text-primary hover:border-primary transition-all"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default CategorySidebar;
