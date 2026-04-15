import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import StatsSection from "@/components/StatsSection";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="container mx-auto px-4 py-16">
        <h1 className="font-display text-5xl text-foreground mb-6">HAKKIMIZDA</h1>
        <div className="max-w-3xl space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Egemen Spor olarak 8 yılı aşkın süredir spor giyim sektöründe faaliyet
            göstermekteyiz. Halı saha, futbol, basketbol ve voleybol formalarında
            özel tasarım ve üretim hizmeti sunuyoruz.
          </p>
          <p>
            Müşteri memnuniyetini ön planda tutarak, kaliteli kumaş ve baskı
            teknolojileri ile takımınıza özel formalar üretiyoruz. İsim, numara ve
            logo baskısı dahil tüm kişiselleştirme seçeneklerini sunuyoruz.
          </p>
          <p>
            Bugüne kadar 500'den fazla takıma hizmet verdik ve 50.000'den fazla
            forma üreterek sektördeki güvenilirliğimizi kanıtladık.
          </p>
        </div>
      </section>
      <StatsSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default About;
