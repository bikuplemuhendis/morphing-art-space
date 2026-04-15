import { Link } from "react-router-dom";
import { Shirt, Trophy, Palette, Users, Shield, Volleyball } from "lucide-react";

const categories = [
  { icon: Shirt, label: "Futbol Formaları", count: 8, color: "bg-primary/10 text-primary", href: "/magaza/futbol" },
  { icon: Trophy, label: "Basketbol Formaları", count: 4, color: "bg-accent/10 text-accent", href: "/magaza/basketbol" },
  { icon: Volleyball, label: "Voleybol Formaları", count: 2, color: "bg-sport-green/10 text-sport-green", href: "/magaza/voleybol" },
  { icon: Shield, label: "Kaleci Formaları", count: 2, color: "bg-primary/10 text-primary", href: "/magaza/kaleci" },
  { icon: Users, label: "Kulüp Formaları", count: 4, color: "bg-accent/10 text-accent", href: "/magaza/kulupler" },
  { icon: Palette, label: "Forma Tasarla", count: null, color: "bg-sport-green/10 text-sport-green", href: "/tasarla" },
];

const Categories = () => {
  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="font-display text-4xl text-foreground text-center mb-8">KATEGORİLER</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((cat, i) => (
          <Link
            to={cat.href}
            key={i}
            className="group cursor-pointer bg-card border border-border rounded-xl p-6 flex flex-col items-center gap-3 transition-all hover:border-primary hover:shadow-lg hover:-translate-y-1 duration-300"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${cat.color} transition-transform group-hover:scale-110 duration-300`}>
              <cat.icon className="w-7 h-7" />
            </div>
            <h3 className="font-display text-lg text-card-foreground text-center">{cat.label}</h3>
            {cat.count && (
              <p className="text-muted-foreground text-sm">{cat.count} ürün</p>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Categories;
