import { Shirt, Trophy, Palette, Users } from "lucide-react";

const categories = [
  { icon: Shirt, label: "Futbol Formaları", count: 120, color: "bg-primary/10 text-primary" },
  { icon: Trophy, label: "Basketbol Formaları", count: 45, color: "bg-accent/10 text-accent" },
  { icon: Palette, label: "Forma Tasarla", count: null, color: "bg-sport-green/10 text-sport-green" },
  { icon: Users, label: "Takım Setleri", count: 30, color: "bg-primary/10 text-primary" },
];

const Categories = () => {
  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="font-display text-4xl text-foreground text-center mb-8">KATEGORİLER</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat, i) => (
          <div
            key={i}
            className="group cursor-pointer bg-card border border-border rounded-xl p-6 flex flex-col items-center gap-3 transition-all hover:border-primary hover:shadow-lg"
          >
            <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${cat.color} transition-transform group-hover:scale-110`}>
              <cat.icon className="w-8 h-8" />
            </div>
            <h3 className="font-display text-xl text-card-foreground">{cat.label}</h3>
            {cat.count && (
              <p className="text-muted-foreground text-sm">{cat.count} ürün</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
