import { useState } from "react";
import { Menu, X, Phone, Search, ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "ANA SAYFA", href: "#" },
  { label: "FUTBOL", href: "#futbol" },
  { label: "BASKETBOL", href: "#basketbol" },
  { label: "VOLEYBOL", href: "#voleybol" },
  { label: "AKSESUAR", href: "#aksesuar" },
  { label: "İLETİŞİM", href: "#iletisim" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

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
        <a href="#" className="font-display text-3xl tracking-wider text-foreground">
          SÜPER<span className="text-primary">FORMA</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-display text-lg tracking-wide text-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </a>
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
          <button className="p-2 text-foreground hover:text-primary transition-colors relative">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
              0
            </span>
          </button>
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden border-t border-border bg-card">
          <nav className="container mx-auto py-4 px-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-display text-xl tracking-wide text-foreground hover:text-primary transition-colors py-1"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
