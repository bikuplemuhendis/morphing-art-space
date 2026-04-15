import { Truck, Headphones, Award, Clock } from "lucide-react";

const features = [
  { icon: Truck, title: "Kapıda Ödeme Kargo", desc: "Kapıda nakit veya kartla ödeme imkanı" },
  { icon: Award, title: "Kaliteli İşçilik", desc: "Profesyonel sublimation baskı teknolojisi" },
  { icon: Clock, title: "3 İş Gününde Teslimat", desc: "Hızlı üretim ve kargo süreci" },
  { icon: Headphones, title: "7/24 Müşteri Desteği", desc: "WhatsApp ile her zaman ulaşın" },
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
