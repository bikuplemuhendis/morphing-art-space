import { Link, useParams, useSearchParams } from "react-router-dom";
import { Shirt, Trophy, Volleyball, Shield, Users, Palette, Package, ChevronDown, ChevronRight, LayoutGrid } from "lucide-react";
import { useState } from "react";
import { products, getClubs } from "@/data/products";
import { cn } from "@/lib/utils";

const categories = [
  { key: "all", label: "Tüm Ürünler", icon: LayoutGrid, href: "/magaza" },
  { key: "futbol", label: "Futbol Formaları", icon: Shirt, href: "/magaza/futbol" },
  { key: "basketbol", label: "Basketbol Formaları", icon: Trophy, href: "/magaza/basketbol" },
  { key: "voleybol", label: "Voleybol Formaları", icon: Volleyball, href: "/magaza/voleybol" },
  { key: "kaleci", label: "Kaleci Formaları", icon: Shield, href: "/magaza/kaleci" },
  { key: "kulupler", label: "Kulüp Formaları", icon: Users, href: "/magaza/kulupler", hasChildren: true },
  { key: "aksesuar", label: "Aksesuarlar", icon: Package, href: "/magaza/aksesuar" },
];

const CategorySidebar = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const clubFilter = searchParams.get("club");
  const activeCategory = category || "all";
  const [clubsOpen, setClubsOpen] = useState(activeCategory === "kulupler");
  const clubs = getClubs();

  return (
    <aside className="w-full lg:w-64 shrink-0">
      <div className="bg-card border border-border rounded-xl p-4 sticky top-4">
        <h3 className="font-display text-xl text-foreground mb-4 px-2">KATEGORİLER</h3>
        <nav className="flex flex-col gap-1">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.key && !clubFilter;
            const count = cat.key === "all"
              ? products.length
              : products.filter(p => p.category === cat.key).length;

            return (
              <div key={cat.key}>
                <div className="flex items-center">
                  <Link
                    to={cat.href}
                    className={cn(
                      "flex-1 flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    )}
                  >
                    <cat.icon className="w-4 h-4 shrink-0" />
                    <span className="flex-1">{cat.label}</span>
                    <span className={cn(
                      "text-xs rounded-full px-2 py-0.5",
                      isActive ? "bg-primary-foreground/20 text-primary-foreground" : "bg-secondary text-muted-foreground"
                    )}>
                      {count}
                    </span>
                  </Link>
                  {cat.hasChildren && (
                    <button
                      onClick={() => setClubsOpen(!clubsOpen)}
                      className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {clubsOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </button>
                  )}
                </div>

                {/* Club sub-items */}
                {cat.hasChildren && clubsOpen && (
                  <div className="ml-4 mt-1 flex flex-col gap-0.5 border-l-2 border-border pl-3">
                    {clubs.map((club) => {
                      const isClubActive = clubFilter === club;
                      const clubCount = products.filter(p => p.club === club).length;
                      return (
                        <Link
                          key={club}
                          to={`/magaza/kulupler?club=${encodeURIComponent(club)}`}
                          className={cn(
                            "flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all",
                            isClubActive
                              ? "bg-primary/10 text-primary font-semibold"
                              : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                          )}
                        >
                          <span>{club}</span>
                          <span className="text-xs">{clubCount}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Design CTA */}
        <div className="mt-6 border-t border-border pt-4">
          <Link
            to="/tasarla"
            className="flex items-center gap-3 px-3 py-3 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-all font-semibold text-sm"
          >
            <Palette className="w-5 h-5" />
            <span>Kendi Formani Tasarla</span>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default CategorySidebar;
