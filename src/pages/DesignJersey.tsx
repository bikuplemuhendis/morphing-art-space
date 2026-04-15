import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { Sparkles, Loader2 } from "lucide-react";

const recentDesigns = [
  "/images/recent-design-1.jpg",
  "/images/recent-design-2.jpg",
  "/images/recent-design-3.jpg",
  "/images/recent-design-4.jpg",
  "/images/recent-design-5.jpg",
  "/images/recent-design-6.jpg",
  "/images/recent-design-7.jpg",
  "/images/recent-design-8.jpg",
];

const DesignJersey = () => {
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setGenerating(true);
    // Simulate AI generation (replace with real AI call later)
    setTimeout(() => {
      setGeneratedImage("/images/design-jersey-preview.jpg");
      setGenerating(false);
    }, 2500);
  };

  const handleWhatsAppOrder = () => {
    const message = `Merhaba, yapay zeka ile tasarladığım formayı sipariş vermek istiyorum.\n\nTasarım detayı: ${prompt}`;
    window.open(`https://wa.me/905312427762?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero section */}
      <section className="container mx-auto px-4 pt-10 pb-6">
        <h1 className="font-display text-4xl sm:text-5xl text-foreground mb-3">
          Halı Saha Forma Tasarla
        </h1>
        <p className="text-muted-foreground max-w-3xl leading-relaxed">
          <strong className="text-foreground">Forma Tasarla</strong> seçeneği ile, hemen yapay zeka desteği ile takımınıza özel ve profesyonel görünümlü formalar tasarlayabilirsiniz. Üstelik teknik bilgiye ihtiyaç duymadan, tüm tasarım sürecini online olarak tamamlayabilirsiniz.
        </p>

        <h2 className="font-display text-2xl text-foreground mt-8 mb-2">
          Forma Tasarla ve Formanı Yaptır
        </h2>
        <p className="text-muted-foreground max-w-3xl leading-relaxed">
          Formalarımızı kendi <strong className="text-foreground">fabrikamızda</strong> üretiyoruz. <strong className="text-foreground">8K dijital baskı teknolojisi</strong>, renklerin ve desenlerin uzun süre canlı kalmasını garanti eder. Üretimin her aşaması titiz kalite kontrolünden geçer.
        </p>
        <p className="text-muted-foreground mt-3">
          Daha fazla bilgi için <strong className="text-foreground">WhatsApp</strong> hattımızdan bize ulaşın! veya{" "}
          <Link to="/iletisim" className="text-primary font-semibold hover:underline">iletişim</Link> sayfamızı ziyaret edin!
        </p>
      </section>

      {/* AI Design Tool */}
      <section className="container mx-auto px-4 py-8">
        <div className="bg-secondary/50 border border-border rounded-2xl p-6 sm:p-10">
          <div className="mb-6">
            <h3 className="font-display text-3xl text-foreground">
              <span className="text-primary">Forma</span> Tasarım
            </h3>
            <p className="text-muted-foreground text-sm mt-1">
              Türkçe olarak stil/tema/renk/logoları yaz, gerisini ben hallederim.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left - Form */}
            <div>
              <label className="font-semibold text-foreground text-sm block mb-2">Tasarım detayı</label>
              <Textarea
                placeholder="Örn: Sarı-lacivert, omuzdan aşağı ince çapraz şeritler, göğüste kulüp logosu..."
                rows={6}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="bg-background border-border resize-none"
              />
              <Button
                onClick={handleGenerate}
                disabled={generating || !prompt.trim()}
                className="mt-4 font-display text-lg tracking-wide gap-2"
                size="lg"
              >
                {generating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Oluşturuluyor...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" /> Oluştur
                  </>
                )}
              </Button>

              {generatedImage && !generating && (
                <Button
                  onClick={handleWhatsAppOrder}
                  variant="outline"
                  className="mt-3 ml-3 font-semibold gap-2"
                  size="lg"
                >
                  📱 WhatsApp ile Sipariş Ver
                </Button>
              )}
            </div>

            {/* Right - Preview */}
            <div className="flex items-center justify-center">
              {generating ? (
                <div className="w-full h-80 rounded-xl bg-background border border-border flex flex-col items-center justify-center gap-4">
                  <Loader2 className="w-12 h-12 text-primary animate-spin" />
                  <p className="text-muted-foreground font-medium">Yapay zeka tasarımınızı oluşturuyor...</p>
                </div>
              ) : generatedImage ? (
                <img
                  src={generatedImage}
                  alt="AI tarafından tasarlanan forma"
                  className="max-h-[400px] rounded-xl object-contain"
                />
              ) : (
                <img
                  src="/images/design-jersey-preview.jpg"
                  alt="Forma tasarım önizleme"
                  className="max-h-[400px] rounded-xl object-contain opacity-50"
                />
              )}
            </div>
          </div>

          {/* Recent designs */}
          <div className="mt-10">
            <h4 className="font-semibold text-foreground mb-4">Son üretilenler</h4>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
              {recentDesigns.map((img, i) => (
                <div key={i} className="aspect-square rounded-lg overflow-hidden border border-border bg-background hover:border-primary transition-colors cursor-pointer">
                  <img
                    src={img}
                    alt={`Son tasarım ${i + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Min order notice */}
      <section className="container mx-auto px-4 py-6">
        <p className="text-center font-display text-2xl sm:text-3xl text-foreground">
          Forma Üretim Sayısı En Az <span className="text-primary">5</span> Adettir. Tekli Forma Üretimimiz{" "}
          <span className="text-primary underline decoration-2">Bulunmamaktadır!</span>
        </p>
      </section>

      {/* Prompt example */}
      <section className="container mx-auto px-4 py-8">
        <h3 className="font-semibold text-foreground mb-4">Prompt Örneği</h3>
        <ul className="space-y-2 text-muted-foreground">
          <li>• <strong className="text-foreground">Renkler:</strong> <span className="text-primary">Kırmızı & Beyaz</span></li>
          <li>• <strong className="text-foreground">Desen:</strong> Göğüs ve kollarda Selçuklu ejder kapısı motifleri</li>
          <li>• <strong className="text-foreground">Yaka:</strong> <span className="text-primary">Yuvarlak</span>, beyaz detaylı</li>
          <li>• <strong className="text-foreground">Sponsor:</strong> Göğüste "SÜPER FORMA", beyaz modern fontla</li>
          <li>• <strong className="text-foreground">Sol Logo:</strong> <span className="text-primary">Türk Bayrağı</span></li>
          <li>• <strong className="text-foreground">Sağ Logo:</strong> <span className="text-primary">Selçuklu Kartalı</span></li>
          <li>• <strong className="text-foreground">Şort:</strong> Beyaz, sol bacakta <span className="text-primary">kırmızı</span> "9" numara</li>
          <li>• <strong className="text-foreground">Çorap:</strong> <span className="text-primary">Kırmızı</span></li>
        </ul>
      </section>

      {/* CTA */}
      <section className="bg-secondary py-8">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <h3 className="font-display text-2xl text-foreground text-center">
            İstediğin Formayı Tasarlayamadın mı?
          </h3>
          <Link to="/magaza">
            <Button variant="default" className="font-display text-lg tracking-wide">
              FORMA MODELLERİ
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default DesignJersey;
