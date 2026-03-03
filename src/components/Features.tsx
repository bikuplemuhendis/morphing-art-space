import { Truck, RotateCcw, Headphones, Shield } from "lucide-react";

const features = [
  { icon: Truck, title: "Ücretsiz Kargo", desc: "500₺ üzeri siparişlerde" },
  { icon: RotateCcw, title: "Kolay İade", desc: "14 gün içinde iade" },
  { icon: Headphones, title: "7/24 Destek", desc: "WhatsApp ile ulaşın" },
  { icon: Shield, title: "Güvenli Ödeme", desc: "256-bit SSL şifreleme" },
];

const Features = () => {
  return (
    <section className="bg-secondary py-10">
      <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <div key={i} className="flex flex-col items-center text-center gap-2">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <f.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-display text-lg text-foreground">{f.title}</h3>
            <p className="text-muted-foreground text-sm">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
