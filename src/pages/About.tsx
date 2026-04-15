import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import StatsSection from "@/components/StatsSection";
import { Award, Target, Eye, CheckCircle, Shirt, Palette, Truck, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const timeline = [
  { year: "2016", title: "Kuruluş", desc: "Egemen Spor, İstanbul'da küçük bir atölye olarak kuruldu." },
  { year: "2018", title: "Dijital Baskı", desc: "8K sublimation baskı teknolojisine geçiş yapıldı." },
  { year: "2020", title: "Online Satış", desc: "E-ticaret platformu ile Türkiye genelinde satışa başladık." },
  { year: "2022", title: "Büyüme", desc: "500+ takım ve 50.000+ forma üretimine ulaşıldı." },
  { year: "2024", title: "AI Tasarım", desc: "Yapay zeka destekli forma tasarım aracını hayata geçirdik." },
];

const values = [
  {
    icon: Award,
    title: "Kalite Garantisi",
    desc: "En kaliteli polyester kumaş ve 8K dijital sublimation baskı teknolojisi kullanıyoruz. Formalarımız yıkamada solmaz, renkleri canlı kalır.",
  },
  {
    icon: Palette,
    title: "Özel Tasarım",
    desc: "Her takımın hikayesi farklıdır. Size özel tasarımlar oluşturuyor, isim, numara ve logo baskısını dahil ediyoruz.",
  },
  {
    icon: Truck,
    title: "Hızlı Teslimat",
    desc: "3 iş günü içinde üretim ve kargo. Kapıda ödeme seçeneğiyle güvenli alışveriş imkanı sunuyoruz.",
  },
  {
    icon: Users,
    title: "Müşteri Odaklı",
    desc: "7/24 WhatsApp desteğiyle yanınızdayız. Siparişten teslimata kadar her adımda bilgilendirilirsiniz.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/about-factory.jpg"
            alt="Egemen Spor Fabrika"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>
        <div className="relative container mx-auto px-4 py-20 sm:py-28">
          <div className="max-w-2xl">
            <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">Hakkımızda</p>
            <h1 className="font-display text-4xl sm:text-6xl text-white mb-4 leading-tight">
              SPOR GİYİMDE<br />
              <span className="text-primary">GÜVEN</span> VE KALİTE
            </h1>
            <p className="text-white/70 text-lg leading-relaxed max-w-xl">
              2016'dan bu yana Türkiye'nin dört bir yanındaki takımlara profesyonel spor giyim çözümleri sunuyoruz.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <StatsSection />

      {/* Hikayemiz */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-2">Hikayemiz</p>
            <h2 className="font-display text-4xl text-foreground mb-6">BİR TUTKU HİKAYESİ</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Egemen Spor, spora olan tutkumuzla 2016 yılında İstanbul'da küçük bir atölyede kuruldu. 
                Amacımız basitti: her takıma profesyonel kalitede, uygun fiyatlı ve benzersiz tasarımlı 
                formalar sunmak.
              </p>
              <p>
                Bugün, kendi fabrikamızda <strong className="text-foreground">8K dijital sublimation baskı teknolojisi</strong> ile 
                üretim yapıyoruz. Her formanın üretim aşamasını titizlikle kontrol ediyor, kaliteden ödün vermiyoruz.
              </p>
              <p>
                Halı saha takımlarından profesyonel kulüplere, okullardan kurumsal takımlara kadar 
                geniş bir yelpazede hizmet veriyoruz. Her sipariş bizim için özel ve her müşteri 
                bizim için değerli.
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src="/images/about-team.jpg"
              alt="Takım çalışması"
              className="rounded-2xl shadow-2xl w-full object-cover aspect-square"
              loading="lazy"
            />
            <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground rounded-2xl p-6 shadow-xl">
              <p className="font-display text-4xl">8+</p>
              <p className="text-sm font-medium opacity-80">Yıllık Deneyim</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vizyon & Misyon */}
      <section className="bg-secondary py-16">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-card border border-border rounded-2xl p-8">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
              <Target className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-display text-2xl text-foreground mb-3">MİSYONUMUZ</h3>
            <p className="text-muted-foreground leading-relaxed">
              Her bütçeye uygun, profesyonel kalitede spor giyim ürünleri sunarak amatör ve profesyonel 
              takımların sahada en iyi şekilde temsil edilmesini sağlamak. Müşteri memnuniyetini her zaman 
              ön planda tutarak, yenilikçi tasarım ve üretim süreçleriyle sektöre öncülük etmek.
            </p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-8">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
              <Eye className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-display text-2xl text-foreground mb-3">VİZYONUMUZ</h3>
            <p className="text-muted-foreground leading-relaxed">
              Türkiye'nin en güvenilir ve yenilikçi spor giyim markası olmak. Yapay zeka destekli 
              tasarım araçları ve sürdürülebilir üretim süreçleriyle sektörde fark yaratmak. 
              Global pazarda Türk spor giyim kalitesini temsil etmek.
            </p>
          </div>
        </div>
      </section>

      {/* Neden Biz */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-2">Neden Biz?</p>
          <h2 className="font-display text-4xl text-foreground">FARKIMIZ</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-2xl p-6 text-center hover:border-primary hover:shadow-xl transition-all duration-300 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <v.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-display text-xl text-foreground mb-2">{v.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-secondary py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-2">Yolculuğumuz</p>
            <h2 className="font-display text-4xl text-foreground">ZAMAN ÇİZELGESİ</h2>
          </div>
          <div className="relative max-w-3xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-0.5 bg-border sm:-translate-x-px" />

            {timeline.map((item, i) => (
              <div
                key={i}
                className={`relative flex items-start gap-6 mb-10 last:mb-0 ${
                  i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                }`}
              >
                {/* Dot */}
                <div className="absolute left-6 sm:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background -translate-x-1/2 mt-1.5 z-10" />

                {/* Content */}
                <div className={`ml-14 sm:ml-0 sm:w-[calc(50%-2rem)] ${i % 2 === 0 ? "sm:pr-8 sm:text-right" : "sm:pl-8"}`}>
                  <span className="text-primary font-display text-2xl">{item.year}</span>
                  <h4 className="font-display text-xl text-foreground mt-1">{item.title}</h4>
                  <p className="text-muted-foreground text-sm mt-1">{item.desc}</p>
                </div>

                {/* Spacer for opposite side */}
                <div className="hidden sm:block sm:w-[calc(50%-2rem)]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="gradient-hero py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-4xl text-primary-foreground mb-4">TAKIMINIZ İÇİN HAZIR MISINIZ?</h2>
          <p className="text-primary-foreground/70 mb-8 max-w-lg mx-auto">
            Hemen forma tasarlamaya başlayın veya ürünlerimizi inceleyin.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/tasarla">
              <Button size="lg" className="font-display text-lg tracking-wide gap-2">
                <Shirt className="w-5 h-5" /> FORMA TASARLA
              </Button>
            </Link>
            <Link to="/magaza">
              <Button size="lg" variant="outline" className="font-display text-lg tracking-wide border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                MAĞAZAYA GİT
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default About;
