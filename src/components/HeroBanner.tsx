import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroBanner = () => {
  return (
    <section className="relative w-full h-[65vh] min-h-[450px] max-h-[650px] overflow-hidden">
      <img
        src="/images/hero-banner.png"
        alt="Halı saha formaları"
        className="absolute inset-0 w-full h-full object-cover animate-[scale-in_1.2s_ease-out]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-sport-dark/90 via-sport-dark/60 to-transparent" />
      <div className="relative z-10 container mx-auto h-full flex flex-col justify-center px-4">
        <div className="max-w-xl">
          <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-2 animate-fade-in">
            Özel Tasarım Spor Formaları
          </p>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl text-primary-foreground leading-none mb-4 animate-fade-in" style={{ animationDelay: "0.15s", animationFillMode: "both" }}>
            TAKIMININ <br />
            <span className="text-primary">FORMASINI</span> TASARLA
          </h1>
          <p className="text-primary-foreground/80 text-lg mb-6 animate-fade-in" style={{ animationDelay: "0.3s", animationFillMode: "both" }}>
            Halı saha, futbol, basketbol ve voleybol formaları. İsim, numara ve logo baskısı ile özel tasarım.
          </p>
          <div className="flex gap-3 animate-fade-in" style={{ animationDelay: "0.45s", animationFillMode: "both" }}>
            <Link to="/magaza">
              <Button size="lg" className="font-display text-lg tracking-wide gap-2">
                ALIŞVERİŞE BAŞLA <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/tasarla">
              <Button size="lg" variant="outline" className="font-display text-lg tracking-wide border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                TASARLA
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
