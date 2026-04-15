import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const clubs = [
  { name: "Real Madrid", colors: ["#FEBE10", "#00529F"], initials: "RM" },
  { name: "Barcelona", colors: ["#A50044", "#004D98"], initials: "FCB" },
  { name: "Manchester United", colors: ["#DA291C", "#FBE122"], initials: "MU" },
  { name: "Liverpool", colors: ["#C8102E", "#00B2A9"], initials: "LFC" },
  { name: "Bayern München", colors: ["#DC052D", "#0066B2"], initials: "FCB" },
  { name: "Juventus", colors: ["#000000", "#FFFFFF"], initials: "JUV" },
  { name: "PSG", colors: ["#004170", "#DA291C"], initials: "PSG" },
  { name: "Manchester City", colors: ["#6CABDD", "#1C2C5B"], initials: "MC" },
  { name: "AC Milan", colors: ["#FB090B", "#000000"], initials: "ACM" },
  { name: "Inter Milan", colors: ["#010E80", "#000000"], initials: "INT" },
  { name: "Chelsea", colors: ["#034694", "#DBA111"], initials: "CFC" },
  { name: "Arsenal", colors: ["#EF0107", "#063672"], initials: "ARS" },
  { name: "Borussia Dortmund", colors: ["#FDE100", "#000000"], initials: "BVB" },
  { name: "Atletico Madrid", colors: ["#CB3524", "#272E61"], initials: "ATM" },
  { name: "Ajax", colors: ["#D2122E", "#FFFFFF"], initials: "AJX" },
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
        <h2 className="font-display text-4xl sm:text-5xl text-foreground mb-2">Kulüpler</h2>
        <p className="text-muted-foreground">Dünyanın en büyük kulüplerinin konsept formalarını üretiyoruz</p>
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
