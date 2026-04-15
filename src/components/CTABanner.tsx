import { Button } from "@/components/ui/button";
import { ArrowRight, Palette } from "lucide-react";
import { Link } from "react-router-dom";

const CTABanner = () => {
  return (
    <section className="gradient-hero py-16 relative overflow-hidden">
      {/* Animated background shapes */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute w-64 h-64 rounded-full bg-white/20 -top-20 -left-20 animate-[pulse_4s_ease-in-out_infinite]" />
        <div className="absolute w-48 h-48 rounded-full bg-white/15 bottom-0 right-10 animate-[pulse_5s_ease-in-out_infinite_1s]" />
        <div className="absolute w-32 h-32 rounded-full bg-white/10 top-10 right-1/3 animate-[pulse_6s_ease-in-out_infinite_2s]" />
      </div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <Palette className="w-12 h-12 text-primary-foreground/80 mx-auto mb-4" />
        <h2 className="font-display text-4xl sm:text-5xl text-primary-foreground mb-3">
          KENDİ FORMANI TASARLA
        </h2>
        <p className="text-primary-foreground/80 max-w-lg mx-auto mb-6">
          Takımının renklerini, logosunu, isim ve numaralarını seç. Egemen Spor
          ile hayalindeki formayı gerçeğe dönüştür.
        </p>
        <Link to="/tasarla">
          <Button
            size="lg"
            variant="secondary"
            className="font-display text-lg tracking-wide gap-2"
          >
            HEMEN TASARLA <ArrowRight className="w-5 h-5" />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default CTABanner;
