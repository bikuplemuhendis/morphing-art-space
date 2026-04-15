import { useState, useRef, useEffect } from "react";
import { Menu, X, Phone, Search, ShoppingCart, User, ChevronDown, Shirt, Trophy, Palette, Star, ArrowRight, Shield, Volleyball, Award, Mail, MessageCircle } from "lucide-react";
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
      <div className="bg-primary">
        <div className="container mx-auto flex items-center justify-between py-2 px-4 text-sm text-primary-foreground">
          <div className="flex items-center gap-2">
            <Mail className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">info@egemenspor.com</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5" />
            <span className="font-semibold">Sipariş: 0542 383 3860</span>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <Search className="w-4 h-4 cursor-pointer hover:opacity-80 transition-opacity" />
            <span className="text-primary-foreground/40">|</span>
            <a href="https://wa.me/905423833860" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
          </div>
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
