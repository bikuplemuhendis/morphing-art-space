import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const clubs = [
  { name: "Galatasaray", colors: ["#FDB913", "#C8102E"], initials: "GS" },
  { name: "Fenerbahçe", colors: ["#FFED00", "#00296B"], initials: "FB" },
  { name: "Beşiktaş", colors: ["#000000", "#FFFFFF"], initials: "BJK" },
  { name: "Trabzonspor", colors: ["#6B1D2A", "#003DA5"], initials: "TS" },
  { name: "Bursaspor", colors: ["#006B3F", "#FFFFFF"], initials: "BRS" },
  { name: "Antalyaspor", colors: ["#C8102E", "#FFFFFF"], initials: "ANT" },
  { name: "Konyaspor", colors: ["#006B3F", "#FFFFFF"], initials: "KON" },
  { name: "Sivasspor", colors: ["#C8102E", "#003DA5"], initials: "SVS" },
  { name: "Kasımpaşa", colors: ["#003DA5", "#FFFFFF"], initials: "KAS" },
  { name: "Rizespor", colors: ["#003DA5", "#006B3F"], initials: "RZS" },
  { name: "Samsunspor", colors: ["#C8102E", "#FFFFFF"], initials: "SAM" },
  { name: "Adana Demirspor", colors: ["#005DAA", "#FFFFFF"], initials: "ADS" },
  { name: "Başakşehir", colors: ["#F26522", "#1A2B5F"], initials: "IBB" },
  { name: "Hatayspor", colors: ["#C8102E", "#006B3F"], initials: "HTY" },
  { name: "Kayserispor", colors: ["#FDB913", "#C8102E"], initials: "KYS" },
];

const ClubsShowcase = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 5);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.6;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section className="py-14">
      <div className="text-center mb-10">
        <h2 className="font-display text-4xl sm:text-5xl text-foreground mb-2">Kulüplerimiz</h2>
        <p className="text-muted-foreground">Türkiye'nin önde gelen kulüplerine hizmet veriyoruz</p>
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Left arrow */}
        <button
          onClick={() => scroll("left")}
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-card border border-border shadow-lg flex items-center justify-center transition-all hover:bg-secondary ${
            canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>

        {/* Right arrow */}
        <button
          onClick={() => scroll("right")}
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-card border border-border shadow-lg flex items-center justify-center transition-all hover:bg-secondary ${
            canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <ChevronRight className="w-5 h-5 text-foreground" />
        </button>

        {/* Scrollable clubs */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide px-8 justify-center flex-nowrap"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {clubs.map((club) => (
            <Link
              key={club.name}
              to={`/magaza/kulupler?club=${encodeURIComponent(club.name)}`}
              className="group flex flex-col items-center gap-3 shrink-0"
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center font-display text-lg font-bold shadow-md border-2 border-border bg-card transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:border-primary"
                style={{
                  background: `linear-gradient(135deg, ${club.colors[0]}22, ${club.colors[1]}22)`,
                }}
              >
                <span
                  className="font-display text-xl font-bold"
                  style={{
                    background: `linear-gradient(135deg, ${club.colors[0]}, ${club.colors[1]})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {club.initials}
                </span>
              </div>
              <p className="text-sm text-muted-foreground text-center group-hover:text-foreground transition-colors font-medium whitespace-nowrap">
                {club.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClubsShowcase;
