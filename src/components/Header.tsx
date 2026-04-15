import { useState, useRef, useEffect } from "react";
import { Menu, X, Phone, Search, ShoppingCart, User, ChevronDown, Shirt, Trophy, Palette, Star, ArrowRight, Shield, Volleyball, Award } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Link } from "react-router-dom";

interface MegaColumn {
  title: string;
  links: { label: string; href: string }[];
  icon: React.ElementType;
}

interface MegaMenuEntry {
  columns: MegaColumn[];
  featured?: {
    image: string;
    title: string;
    subtitle: string;
    href: string;
  };
}

const megaMenuData: Record<string, MegaMenuEntry> = {
  FUTBOL: {
    columns: [
      {
        title: "Halı Saha Formaları",
        links: [
          { label: "Tüm Futbol Formaları", href: "/magaza/futbol" },
          { label: "Takım Setleri", href: "/magaza/futbol" },
          { label: "Antrenman Formaları", href: "/magaza/futbol" },
        ],
        icon: Shirt,
      },
      {
        title: "Kulüp Formaları",
        links: [
          { label: "Galatasaray Konsept", href: "/magaza/kulupler?club=Galatasaray" },
          { label: "Fenerbahçe Konsept", href: "/magaza/kulupler?club=Fenerbahçe" },
          { label: "Beşiktaş Konsept", href: "/magaza/kulupler?club=Beşiktaş" },
          { label: "Trabzonspor Konsept", href: "/magaza/kulupler?club=Trabzonspor" },
          { label: "Tüm Kulüpler", href: "/magaza/kulupler" },
        ],
        icon: Award,
      },
      {
        title: "Forma Tasarla",
        links: [
          { label: "Kendi Formani Tasarla", href: "/tasarla" },
          { label: "Logo & Baskı Hizmeti", href: "/tasarla" },
          { label: "Toplu Sipariş", href: "/tasarla" },
        ],
        icon: Palette,
      },
    ],
    featured: {
      image: "/images/hero-banner.png",
      title: "%50'ye Varan İndirimler",
      subtitle: "Sezon sonu fırsatları!",
      href: "/magaza/futbol",
    },
  },
  BASKETBOL: {
    columns: [
      {
        title: "Basketbol Formaları",
        links: [
          { label: "Tüm Basketbol Formaları", href: "/magaza/basketbol" },
          { label: "Maç Formaları", href: "/magaza/basketbol" },
          { label: "Antrenman Setleri", href: "/magaza/basketbol" },
        ],
        icon: Trophy,
      },
      {
        title: "Özel Tasarım",
        links: [
          { label: "Basketbol Forması Tasarla", href: "/tasarla" },
          { label: "Takım Setleri", href: "/magaza/basketbol" },
        ],
        icon: Palette,
      },
    ],
  },
  VOLEYBOL: {
    columns: [
      {
        title: "Voleybol Formaları",
        links: [
          { label: "Tüm Voleybol Formaları", href: "/magaza/voleybol" },
          { label: "Kadın Formaları", href: "/magaza/voleybol" },
          { label: "Erkek Formaları", href: "/magaza/voleybol" },
        ],
        icon: Volleyball,
      },
      {
        title: "Özel Tasarım",
        links: [
          { label: "Voleybol Forması Tasarla", href: "/tasarla" },
          { label: "Takım Setleri", href: "/magaza/voleybol" },
        ],
        icon: Palette,
      },
    ],
  },
};

const navLinks = [
  { label: "KALECİ", href: "/magaza/kaleci" },
  { label: "AKSESUAR", href: "/magaza/aksesuar" },
  { label: "TASARLA", href: "/tasarla" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const { totalItems } = useCart();
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const handleMouseEnter = (key: string) => {
    clearTimeout(timeoutRef.current);
    setActiveMega(key);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveMega(null), 200);
  };

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      {/* Top bar */}
      <div className="gradient-hero">
        <div className="container mx-auto flex items-center justify-between py-1.5 px-4 text-sm font-medium text-primary-foreground">
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5" />
            <span>Sipariş Hattı: 0531 242 7762</span>
          </div>
          <span className="hidden sm:block">%50'ye Varan İndirimler!</span>
        </div>
      </div>

      {/* Main nav */}
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src="/images/logo.webp" alt="Egemen Spor" className="h-10 w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-0.5">
          <Link to="/" className="font-display text-[17px] tracking-wide text-foreground hover:text-primary transition-colors px-3 py-2">
            ANA SAYFA
          </Link>

          {/* Mega menu triggers */}
          {Object.entries(megaMenuData).map(([key]) => (
            <div
              key={key}
              className="relative"
              onMouseEnter={() => handleMouseEnter(key)}
              onMouseLeave={handleMouseLeave}
            >
              <button className={`font-display text-[17px] tracking-wide transition-colors px-3 py-2 flex items-center gap-1 ${activeMega === key ? "text-primary" : "text-foreground hover:text-primary"}`}>
                {key}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMega === key ? "rotate-180" : ""}`} />
              </button>
            </div>
          ))}

          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className={`font-display text-[17px] tracking-wide transition-colors px-3 py-2 ${link.label === "TASARLA" ? "text-primary hover:text-primary/80" : "text-foreground hover:text-primary"}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-2">
          <button className="p-2 text-foreground hover:text-primary transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <button className="p-2 text-foreground hover:text-primary transition-colors">
            <User className="w-5 h-5" />
          </button>
          <Link to="/sepet" className="p-2 text-foreground hover:text-primary transition-colors relative">
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Desktop Mega Menu Dropdown */}
      {activeMega && megaMenuData[activeMega] && (
        <div
          className="hidden lg:block absolute left-0 right-0 bg-card border-b border-border shadow-2xl z-50 animate-fade-in"
          onMouseEnter={() => handleMouseEnter(activeMega)}
          onMouseLeave={handleMouseLeave}
        >
          <div className="container mx-auto px-4 py-8">
            <div className={`grid gap-8 ${megaMenuData[activeMega].featured ? `grid-cols-${megaMenuData[activeMega].columns.length + 1}` : `grid-cols-${megaMenuData[activeMega].columns.length}`}`} style={{ gridTemplateColumns: megaMenuData[activeMega].featured ? `repeat(${megaMenuData[activeMega].columns.length}, 1fr) 1fr` : `repeat(${megaMenuData[activeMega].columns.length}, 1fr)` }}>
              {megaMenuData[activeMega].columns.map((col, i) => (
                <div key={i}>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <col.icon className="w-4 h-4 text-primary" />
                    </div>
                    <h3 className="font-display text-xl text-foreground">{col.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {col.links.map((link, j) => (
                      <li key={j}>
                        <Link
                          to={link.href}
                          onClick={() => setActiveMega(null)}
                          className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-1 group"
                        >
                          <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Featured card */}
              {megaMenuData[activeMega].featured && (
                <Link
                  to={megaMenuData[activeMega].featured!.href}
                  onClick={() => setActiveMega(null)}
                  className="relative rounded-xl overflow-hidden group min-h-[180px]"
                >
                  <img
                    src={megaMenuData[activeMega].featured!.image}
                    alt="Featured"
                    className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="relative z-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent h-full flex flex-col justify-end p-5">
                    <p className="text-accent font-bold text-xs uppercase tracking-wider flex items-center gap-1">
                      <Star className="w-3 h-3" /> Öne Çıkan
                    </p>
                    <h4 className="font-display text-2xl text-white mt-1">
                      {megaMenuData[activeMega].featured!.title}
                    </h4>
                    <p className="text-white/70 text-sm">
                      {megaMenuData[activeMega].featured!.subtitle}
                    </p>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden border-t border-border bg-card max-h-[70vh] overflow-y-auto">
          <nav className="container mx-auto py-4 px-4 flex flex-col gap-1">
            <Link to="/" className="font-display text-xl tracking-wide text-foreground hover:text-primary py-2" onClick={() => setMenuOpen(false)}>
              ANA SAYFA
            </Link>

            {/* Mobile mega sections */}
            {Object.entries(megaMenuData).map(([key, data]) => (
              <div key={key}>
                <button
                  onClick={() => setMobileExpanded(mobileExpanded === key ? null : key)}
                  className="w-full flex items-center justify-between font-display text-xl tracking-wide text-foreground hover:text-primary py-2"
                >
                  {key}
                  <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${mobileExpanded === key ? "rotate-180" : ""}`} />
                </button>
                {mobileExpanded === key && (
                  <div className="pl-4 pb-3 space-y-3 animate-fade-in">
                    {data.columns.map((col, i) => (
                      <div key={i}>
                        <p className="font-semibold text-foreground text-sm mb-1">{col.title}</p>
                        <div className="flex flex-col gap-1">
                          {col.links.map((link, j) => (
                            <Link
                              key={j}
                              to={link.href}
                              className="text-muted-foreground text-sm hover:text-primary py-0.5"
                              onClick={() => setMenuOpen(false)}
                            >
                              {link.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`font-display text-xl tracking-wide py-2 ${link.label === "TASARLA" ? "text-primary" : "text-foreground hover:text-primary"}`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <Link to="/hakkimizda" className="font-display text-xl tracking-wide text-foreground hover:text-primary py-2" onClick={() => setMenuOpen(false)}>
              HAKKIMIZDA
            </Link>
            <Link to="/iletisim" className="font-display text-xl tracking-wide text-foreground hover:text-primary py-2" onClick={() => setMenuOpen(false)}>
              İLETİŞİM
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
