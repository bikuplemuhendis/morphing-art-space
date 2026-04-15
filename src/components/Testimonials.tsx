import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Mehmet K.",
    team: "Yıldırım SK",
    text: "Formalarımız tam istediğimiz gibi oldu. Baskı kalitesi ve kumaş harika, teşekkürler Egemen Spor!",
    rating: 5,
  },
  {
    name: "Ali D.",
    team: "Kartal FC",
    text: "Halı saha takımımız için sipariş verdik, hızlı kargo ve mükemmel kalite. Kesinlikle tavsiye ederim.",
    rating: 5,
  },
  {
    name: "Burak S.",
    team: "Fırtına Spor",
    text: "Tasarım aşamasında çok yardımcı oldular. Sonuç beklentilerin çok üstünde çıktı.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="bg-secondary py-16">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-4xl text-foreground text-center mb-2">
          MÜŞTERİ YORUMLARI
        </h2>
        <p className="text-muted-foreground text-center mb-10">
          Takımların Egemen Spor deneyimi
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-xl p-6 flex flex-col gap-3"
            >
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-foreground leading-relaxed">"{t.text}"</p>
              <div className="mt-auto pt-3 border-t border-border">
                <p className="font-semibold text-foreground">{t.name}</p>
                <p className="text-muted-foreground text-sm">{t.team}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
