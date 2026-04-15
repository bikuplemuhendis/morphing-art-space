import { useState, useRef, useEffect } from "react";
import { Menu, X, Phone, Search, ShoppingCart, User, ChevronDown, Shirt, Trophy, Palette, Star, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Link } from "react-router-dom";

const megaMenuData = {
  MAĞAZA: {
    columns: [
      {
        title: "Futbol",
        links: [
          { label: "Tüm Futbol Formaları", href: "/magaza/futbol" },
          { label: "Halı Saha Formaları", href: "/magaza/futbol" },
          { label: "Antrenman Formaları", href: "/magaza/futbol" },
          { label: "Kaleci Formaları", href: "/magaza/futbol" },
        ],
        icon: Shirt,
      },
      {
        title: "Basketbol",
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
          { label: "Forma Tasarla", href: "/magaza" },
          { label: "Takım Setleri", href: "/magaza" },
          { label: "Logo & Baskı", href: "/magaza" },
        ],
        icon: Palette,
      },
    ],
    featured: {
      image: "/images/hero-banner.png",
      title: "%50'ye Varan İndirimler",
      subtitle: "Sezon sonu fırsatlarını kaçırma!",
      href: "/magaza",
    },
  },
};

const simpleLinks = [
  { label: "ANA SAYFA", href: "/" },
  { label: "HAKKIMIZDA", href: "/hakkimizda" },
  { label: "İLETİŞİM", href: "/iletisim" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const { totalItems } = useCart();
  const megaRef = useRef<HTMLDivElement>(null);
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
        <Link to="/" className="font-display text-3xl tracking-wider text-foreground">
          EGEMEN<span className="text-primary"> SPOR</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {simpleLinks.slice(0, 1).map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="font-display text-lg tracking-wide text-foreground hover:text-primary transition-colors px-4 py-2"
            >
              {link.label}
            </Link>
          ))}

          {/* Mega menu triggers */}
          {Object.entries(megaMenuData).map(([key]) => (
            <div
              key={key}
              className="relative"
              onMouseEnter={() => handleMouseEnter(key)}
              onMouseLeave={handleMouseLeave}
            >
              <button className={`font-display text-lg tracking-wide transition-colors px-4 py-2 flex items-center gap-1 ${activeMega === key ? "text-primary" : "text-foreground hover:text-primary"}`}>
                {key}
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeMega === key ? "rotate-180" : ""}`} />
              </button>
            </div>
          ))}

          {simpleLinks.slice(1).map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="font-display text-lg tracking-wide text-foreground hover:text-primary transition-colors px-4 py-2"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-3">
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
      {activeMega && megaMenuData[activeMega as keyof typeof megaMenuData] && (
        <div
          ref={megaRef}
          className="hidden lg:block absolute left-0 right-0 bg-card border-b border-border shadow-2xl z-50 animate-fade-in"
          onMouseEnter={() => handleMouseEnter(activeMega)}
          onMouseLeave={handleMouseLeave}
        >
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-4 gap-8">
              {megaMenuData[activeMega as keyof typeof megaMenuData].columns.map((col, i) => (
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
              {megaMenuData[activeMega as keyof typeof megaMenuData].featured && (
                <Link
                  to={megaMenuData[activeMega as keyof typeof megaMenuData].featured.href}
                  onClick={() => setActiveMega(null)}
                  className="relative rounded-xl overflow-hidden group"
                >
                  <img
                    src={megaMenuData[activeMega as keyof typeof megaMenuData].featured.image}
                    alt="Featured"
                    className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="relative z-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent h-full flex flex-col justify-end p-5">
                    <p className="text-accent font-bold text-xs uppercase tracking-wider flex items-center gap-1">
                      <Star className="w-3 h-3" /> Öne Çıkan
                    </p>
                    <h4 className="font-display text-2xl text-white mt-1">
                      {megaMenuData[activeMega as keyof typeof megaMenuData].featured.title}
                    </h4>
                    <p className="text-white/70 text-sm">
                      {megaMenuData[activeMega as keyof typeof megaMenuData].featured.subtitle}
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

            {simpleLinks.slice(1).map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="font-display text-xl tracking-wide text-foreground hover:text-primary py-2"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
