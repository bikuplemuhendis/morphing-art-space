import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CollectionShowcase = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[350px] sm:h-[400px]">
        <img
          src="/images/collection-banner.jpg"
          alt="Forma Koleksiyonu"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          width={1920}
          height={768}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-sport-dark/90 via-sport-dark/70 to-sport-dark/40" />
        <div className="relative z-10 container mx-auto h-full flex items-center px-4">
          <div className="max-w-lg">
            <p className="text-accent font-bold text-sm uppercase tracking-widest mb-2">Yeni Koleksiyon</p>
            <h2 className="font-display text-4xl sm:text-5xl text-white mb-3">
              2024-2025 SEZONU<br />
              <span className="text-primary">YENİ MODELLER</span>
            </h2>
            <p className="text-white/70 mb-6">
              En yeni tasarımlar ve trendler ile takımınızı bir adım öne taşıyın.
            </p>
            <Link to="/magaza">
              <Button size="lg" className="font-display text-lg tracking-wide gap-2">
                KOLEKSİYONU İNCELE <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollectionShowcase;
