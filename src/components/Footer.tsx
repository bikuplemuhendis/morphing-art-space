import { Phone, Mail, MapPin, Instagram, Facebook, Twitter, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="gradient-dark text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <img src="/images/logo.webp" alt="Egemen Spor" className="h-14 w-auto mb-4" />
            <p className="text-primary-foreground/70 text-sm leading-relaxed max-w-sm mb-6">
              Egemen Spor - Türkiye'nin önde gelen özel tasarım spor forması üreticisi. 
              Halı saha, futbol, basketbol, voleybol ve hentbol formaları.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Ürünler */}
          <div>
            <h4 className="font-display text-xl mb-5 tracking-wide">ÜRÜNLER</h4>
            <ul className="space-y-2.5 text-sm text-primary-foreground/70">
              <li><Link to="/magaza/futbol" className="hover:text-primary transition-colors">Futbol Formaları</Link></li>
              <li><Link to="/magaza/basketbol" className="hover:text-primary transition-colors">Basketbol Formaları</Link></li>
              <li><Link to="/magaza/voleybol" className="hover:text-primary transition-colors">Voleybol Formaları</Link></li>
              <li><Link to="/magaza/hali-saha" className="hover:text-primary transition-colors">Halı Saha Formaları</Link></li>
              <li><Link to="/magaza" className="hover:text-primary transition-colors">Eşofman Takımları</Link></li>
              <li><Link to="/magaza" className="hover:text-primary transition-colors">Antrenman Ürünleri</Link></li>
            </ul>
          </div>

          {/* Kurumsal */}
          <div>
            <h4 className="font-display text-xl mb-5 tracking-wide">KURUMSAL</h4>
            <ul className="space-y-2.5 text-sm text-primary-foreground/70">
              <li><Link to="/hakkimizda" className="hover:text-primary transition-colors">Hakkımızda</Link></li>
              <li><Link to="/iletisim" className="hover:text-primary transition-colors">İletişim</Link></li>
              <li><Link to="/toplu-siparis" className="hover:text-primary transition-colors">Toplu Sipariş</Link></li>
              <li><Link to="/tasarla" className="hover:text-primary transition-colors">Forma Tasarla</Link></li>
              <li><a href="#" className="hover:text-primary transition-colors">Beden Tablosu</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">SSS</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">İade & Değişim</a></li>
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h4 className="font-display text-xl mb-5 tracking-wide">İLETİŞİM</h4>
            <ul className="space-y-3.5 text-sm text-primary-foreground/70">
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                0531 242 7762
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                info@egemenspor.com
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Merter, Güngören<br />İstanbul, Türkiye</span>
              </li>
            </ul>
            <div className="mt-6 p-3 rounded-lg bg-primary-foreground/5 border border-primary-foreground/10">
              <p className="text-xs text-primary-foreground/50 mb-1">Çalışma Saatleri</p>
              <p className="text-sm text-primary-foreground/80">Pzt - Cmt: 09:00 - 18:00</p>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/50">
          <p>© 2026 Egemen Spor. Tüm hakları saklıdır.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-primary-foreground/80 transition-colors">Gizlilik Politikası</a>
            <a href="#" className="hover:text-primary-foreground/80 transition-colors">Kullanım Koşulları</a>
            <a href="#" className="hover:text-primary-foreground/80 transition-colors">KVKK</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
