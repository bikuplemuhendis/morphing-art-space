import { Button } from "@/components/ui/button";
import { ArrowRight, Palette } from "lucide-react";

const CTABanner = () => {
  return (
    <section className="gradient-hero py-16">
      <div className="container mx-auto px-4 text-center">
        <Palette className="w-12 h-12 text-primary-foreground/80 mx-auto mb-4" />
        <h2 className="font-display text-4xl sm:text-5xl text-primary-foreground mb-3">
          KENDİ FORMANI TASARLA
        </h2>
        <p className="text-primary-foreground/80 max-w-lg mx-auto mb-6">
          Takımının renklerini, logosunu, isim ve numaralarını seç. Egemen Spor
          ile hayalindeki formayı gerçeğe dönüştür.
        </p>
        <Button
          size="lg"
          variant="secondary"
          className="font-display text-lg tracking-wide gap-2"
        >
          HEMEN TASARLA <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </section>
  );
};

export default CTABanner;
