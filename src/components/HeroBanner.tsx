import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const slides = [
  {
    image: "/images/hero-slide-1.jpg",
    subtitle: "Özel Tasarım Spor Formaları",
    title1: "TAKIMININ",
    highlight: "FORMASINI",
    title2: "TASARLA",
    desc: "Halı saha, futbol, basketbol ve voleybol formaları. İsim, numara ve logo baskısı ile özel tasarım.",
    cta1: { label: "ALIŞVERİŞE BAŞLA", href: "/magaza" },
    cta2: { label: "TASARLA", href: "/tasarla" },
  },
  {
    image: "/images/hero-slide-2.jpg",
    subtitle: "Basketbol Koleksiyonu",
    title1: "SAHAYA",
    highlight: "DAMGANI",
    title2: "VUR",
    desc: "Profesyonel basketbol formaları ile takımını bir adım öne taşı. Özel tasarım, premium kalite.",
    cta1: { label: "BASKETBOL FORMALARI", href: "/magaza/basketbol" },
    cta2: { label: "FORMA TASARLA", href: "/tasarla" },
  },
  {
    image: "/images/hero-slide-3.jpg",
    subtitle: "Profesyonel Üretim",
    title1: "HAYALİNDEKİ",
    highlight: "FORMAYI",
    title2: "ÜRETELİM",
    desc: "Sublimation baskı teknolojisi ile solmayan, yıkanmaya dayanıklı, profesyonel kalitede formalar.",
    cta1: { label: "SİPARİŞ VER", href: "/magaza" },
    cta2: { label: "İLETİŞİM", href: "/iletisim" },
  },
];

const HeroBanner = () => {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent(index);
    setTimeout(() => setIsTransitioning(false), 700);
  }, [isTransitioning]);

  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo]);
  const prev = useCallback(() => goTo((current - 1 + slides.length) % slides.length), [current, goTo]);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative w-full h-[75vh] min-h-[500px] max-h-[750px] overflow-hidden bg-sport-dark">
      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${
            i === current ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.subtitle}
            className="absolute inset-0 w-full h-full object-cover"
            width={1920}
            height={1080}
            {...(i === 0 ? {} : { loading: "lazy" as const })}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-sport-dark/90 via-sport-dark/60 to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 container mx-auto h-full flex flex-col justify-center px-4">
        <div className="max-w-xl">
          <p
            key={`sub-${current}`}
            className="text-accent font-semibold text-sm uppercase tracking-widest mb-2 animate-fade-in"
          >
            {slides[current].subtitle}
          </p>
          <h1
            key={`title-${current}`}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-primary-foreground leading-none mb-4 animate-fade-in"
            style={{ animationDelay: "0.1s", animationFillMode: "both" }}
          >
            {slides[current].title1} <br />
            <span className="text-primary">{slides[current].highlight}</span> {slides[current].title2}
          </h1>
          <p
            key={`desc-${current}`}
            className="text-primary-foreground/80 text-base sm:text-lg mb-6 animate-fade-in max-w-md"
            style={{ animationDelay: "0.2s", animationFillMode: "both" }}
          >
            {slides[current].desc}
          </p>
          <div
            key={`cta-${current}`}
            className="flex flex-wrap gap-3 animate-fade-in"
            style={{ animationDelay: "0.3s", animationFillMode: "both" }}
          >
            <Link to={slides[current].cta1.href}>
              <Button size="lg" className="font-display text-base sm:text-lg tracking-wide gap-2">
                {slides[current].cta1.label} <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to={slides[current].cta2.href}>
              <Button size="lg" variant="outline" className="font-display text-base sm:text-lg tracking-wide border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                {slides[current].cta2.label}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-black/50 transition-colors"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
      <button
        onClick={next}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-black/50 transition-colors"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? "w-8 bg-primary" : "w-2 bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 h-1 bg-white/10">
        <div
          key={current}
          className="h-full bg-primary"
          style={{ animation: "progress 6s linear" }}
        />
      </div>

      <style>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  );
};

export default HeroBanner;
