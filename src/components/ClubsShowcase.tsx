import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const clubs = [
  { name: "Galatasaray", colors: ["#FDB913", "#C8102E"], initials: "GS" },
  { name: "Fenerbahçe", colors: ["#FFED00", "#00296B"], initials: "FB" },
  { name: "Beşiktaş", colors: ["#000000", "#FFFFFF"], initials: "BJK" },
  { name: "Trabzonspor", colors: ["#6B1D2A", "#003DA5"], initials: "TS" },
  { name: "Başakşehir", colors: ["#F26522", "#1A2B5F"], initials: "IBB" },
  { name: "Adana Demirspor", colors: ["#005DAA", "#FFFFFF"], initials: "ADS" },
  { name: "Antalyaspor", colors: ["#C8102E", "#FFFFFF"], initials: "ANT" },
  { name: "Konyaspor", colors: ["#006B3F", "#FFFFFF"], initials: "KON" },
  { name: "Samsunspor", colors: ["#C8102E", "#FFFFFF"], initials: "SAM" },
  { name: "Sivasspor", colors: ["#C8102E", "#003DA5"], initials: "SVS" },
  { name: "Kasımpaşa", colors: ["#003DA5", "#FFFFFF"], initials: "KAS" },
  { name: "Hatayspor", colors: ["#C8102E", "#006B3F"], initials: "HTY" },
  { name: "Kayserispor", colors: ["#FDB913", "#C8102E"], initials: "KYS" },
  { name: "Rizespor", colors: ["#003DA5", "#006B3F"], initials: "RZS" },
  { name: "Gaziantep FK", colors: ["#C8102E", "#000000"], initials: "GFK" },
];

const ClubCard = ({ club, index }: { club: typeof clubs[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), index * 80);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      <Link
        to={`/magaza/kulupler?club=${encodeURIComponent(club.name)}`}
        className="group flex flex-col items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
      >
        {/* Club badge */}
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center font-display text-xl font-bold shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
          style={{
            background: `linear-gradient(135deg, ${club.colors[0]}, ${club.colors[1]})`,
            color: club.colors[1] === "#FFFFFF" || club.colors[1] === "#FFED00" ? "#000" : "#FFF",
          }}
        >
          {club.initials}
        </div>
        <p className="font-semibold text-sm text-foreground text-center group-hover:text-primary transition-colors leading-tight">
          {club.name}
        </p>
      </Link>
    </div>
  );
};

const ClubsShowcase = () => {
  return (
    <section className="container mx-auto px-4 py-14">
      <div className="text-center mb-10">
        <h2 className="font-display text-4xl sm:text-5xl text-foreground mb-2">KULÜP FORMALARI</h2>
        <p className="text-muted-foreground">Favori takımının konsept formasını bul</p>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 gap-4">
        {clubs.map((club, i) => (
          <ClubCard key={club.name} club={club} index={i} />
        ))}
      </div>
      <div className="text-center mt-8">
        <Link
          to="/magaza/kulupler"
          className="text-primary font-semibold hover:underline inline-flex items-center gap-1"
        >
          Tüm Kulüp Formalarını Gör →
        </Link>
      </div>
    </section>
  );
};

export default ClubsShowcase;
