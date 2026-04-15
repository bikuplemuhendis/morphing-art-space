import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="gradient-dark text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <img src="/images/logo.webp" alt="Egemen Spor" className="h-14 w-auto mb-4" />
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Egemen Spor - Özel tasarım spor formaları. Halı saha, futbol, basketbol ve voleybol formaları.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-xl mb-4">HIZLI BAĞLANTILAR</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><a href="#" className="hover:text-primary transition-colors">Ana Sayfa</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Futbol Formaları</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Basketbol Formaları</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Forma Tasarla</a></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-display text-xl mb-4">YARDIM</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><a href="#" className="hover:text-primary transition-colors">Sipariş Takibi</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">İade & Değişim</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Beden Tablosu</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">SSS</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-xl mb-4">İLETİŞİM</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                0531 242 7762
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                info@egemenspor.com
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary mt-0.5" />
                İstanbul, Türkiye
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-10 pt-6 text-center text-sm text-primary-foreground/50">
          © 2026 Egemen Spor. Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
