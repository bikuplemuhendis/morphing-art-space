import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Check, Zap, Sparkles, Phone, HeadphonesIcon, ShieldCheck, Truck, Printer } from "lucide-react";

type JerseyType = "jersey" | "jersey_shorts";

interface AddOn {
  id: string;
  label: string;
  description: string;
  pricePerUnit: number;
  emoji: string;
}

const PRICES: Record<JerseyType, number> = {
  jersey: 280,
  jersey_shorts: 400,
};

const ADD_ONS: AddOn[] = [
  { id: "socks", label: "Çorap Ekle", description: "Tüm formalar için", pricePerUnit: 50, emoji: "🧦" },
  { id: "goalkeeper", label: "Kaleci Forması Ekle", description: "Ana siparişe ek olarak", pricePerUnit: 0, emoji: "🧤" },
];

const INCLUDED_PRINTS = ["Oyuncu İsmi", "Sırt Numarası", "Takım Logosu", "Sponsor Logosu"];

const BulkOrder = () => {
  const [jerseyType, setJerseyType] = useState<JerseyType>("jersey_shorts");
  const [quantity, setQuantity] = useState(10);
  const [addOns, setAddOns] = useState<Record<string, boolean>>({ socks: false, goalkeeper: false });

  const basePrice = PRICES[jerseyType] * quantity;
  const addOnPrice = Object.entries(addOns).reduce((sum, [id, active]) => {
    if (!active) return sum;
    const addon = ADD_ONS.find((a) => a.id === id);
    return sum + (addon ? addon.pricePerUnit * quantity : 0);
  }, 0);
  const totalPrice = basePrice + addOnPrice;

  const discount = quantity >= 15 ? Math.round(totalPrice * 0.05) : 0;
  const finalPrice = totalPrice - discount;

  const toggleAddOn = (id: string) => {
    setAddOns((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleWhatsAppOrder = () => {
    const type = jerseyType === "jersey" ? "Sadece Forma" : "Forma + Şort";
    const addOnText = Object.entries(addOns)
      .filter(([, v]) => v)
      .map(([id]) => ADD_ONS.find((a) => a.id === id)?.label)
      .join(", ");
    const message = `Merhaba, toplu sipariş vermek istiyorum.\n\nÜrün: ${type}\nAdet: ${quantity}\n${addOnText ? `Ekstralar: ${addOnText}\n` : ""}Toplam: ${finalPrice.toLocaleString("tr-TR")} ₺${discount > 0 ? ` (${discount.toLocaleString("tr-TR")} ₺ indirim)` : ""}`;
    window.open(`https://wa.me/905423833860?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-card via-secondary to-card overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,hsl(var(--primary)/0.08),transparent_50%)]" />
        <div className="container mx-auto px-4 py-12 text-center relative z-10">
          <span className="inline-flex items-center gap-2 bg-primary/10 text-primary font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
            <Zap className="w-4 h-4" /> Anında Fiyat Hesaplayıcı
          </span>
          <h1 className="font-display text-5xl sm:text-6xl text-foreground mb-2">
            Forma Fiyatı
          </h1>
          <h2 className="font-display text-4xl sm:text-5xl text-primary mb-4">Hesapla</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Takımınız için özel forma fiyatını 30 saniyede öğrenin
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="container mx-auto px-4 -mt-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
          {/* Left - Configuration */}
          <div className="lg:col-span-3 space-y-5">
            {/* Jersey Type */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">🛒</span>
                <h3 className="font-display text-xl text-foreground">Spor Formaları</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setJerseyType("jersey")}
                  className={`relative rounded-xl border-2 p-4 text-center transition-all ${
                    jerseyType === "jersey"
                      ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                      : "border-border hover:border-muted-foreground/30"
                  }`}
                >
                  <span className="text-3xl block mb-2">👕</span>
                  <p className="font-semibold text-foreground text-sm">Sadece Forma</p>
                  <p className="text-primary font-bold text-lg">{PRICES.jersey}₺</p>
                  {jerseyType === "jersey" && (
                    <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                      <Check className="w-3 h-3 text-primary-foreground" />
                    </div>
                  )}
                </button>
                <button
                  onClick={() => setJerseyType("jersey_shorts")}
                  className={`relative rounded-xl border-2 p-4 text-center transition-all ${
                    jerseyType === "jersey_shorts"
                      ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                      : "border-border hover:border-muted-foreground/30"
                  }`}
                >
                  <span className="text-3xl block mb-2">👕👟</span>
                  <p className="font-semibold text-foreground text-sm">Forma + Şort</p>
                  <p className="text-primary font-bold text-lg">{PRICES.jersey_shorts}₺</p>
                  {jerseyType === "jersey_shorts" && (
                    <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                      <Check className="w-3 h-3 text-primary-foreground" />
                    </div>
                  )}
                </button>
              </div>
            </div>

            {/* Quantity */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-xl text-foreground">Adet</h3>
                <span className="w-12 h-12 rounded-xl bg-primary text-primary-foreground font-display text-2xl flex items-center justify-center">
                  {quantity}
                </span>
              </div>
              <Slider
                value={[quantity]}
                onValueChange={(v) => setQuantity(v[0])}
                min={5}
                max={50}
                step={1}
                className="mb-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>5 adet</span>
                <span>50 adet</span>
              </div>
            </div>

            {/* Add-ons */}
            <div className="space-y-3">
              {ADD_ONS.map((addon) => (
                <button
                  key={addon.id}
                  onClick={() => toggleAddOn(addon.id)}
                  className={`w-full flex items-center justify-between bg-card border rounded-2xl p-5 transition-all ${
                    addOns[addon.id]
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-muted-foreground/30"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                      addOns[addon.id] ? "bg-primary border-primary" : "border-muted-foreground/40"
                    }`}>
                      {addOns[addon.id] && <Check className="w-3 h-3 text-primary-foreground" />}
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-foreground flex items-center gap-2">
                        <span>{addon.emoji}</span> {addon.label}
                      </p>
                      <p className="text-muted-foreground text-xs">{addon.description}</p>
                    </div>
                  </div>
                  {addon.pricePerUnit > 0 && (
                    <span className="text-primary font-bold">+{addon.pricePerUnit}₺</span>
                  )}
                </button>
              ))}
            </div>

            {/* Included prints */}
            <div className="bg-accent/10 border border-accent/20 rounded-2xl p-5">
              <p className="font-semibold text-foreground flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-accent" /> Tüm Baskılar Fiyata Dahil!
              </p>
              <div className="grid grid-cols-2 gap-2">
                {INCLUDED_PRINTS.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-3.5 h-3.5 text-accent" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Summary */}
          <div className="lg:col-span-2 space-y-5">
            {/* Price card */}
            <div className="bg-gradient-to-br from-primary via-primary/90 to-accent rounded-2xl p-6 text-primary-foreground">
              <p className="text-primary-foreground/70 text-sm font-semibold uppercase tracking-wider mb-1">Toplam Tutar</p>
              <p className="font-display text-5xl mb-4">
                {finalPrice.toLocaleString("tr-TR")} <span className="text-3xl">₺</span>
              </p>

              <div className="bg-primary-foreground/10 backdrop-blur rounded-xl p-4 space-y-2 mb-5">
                <div className="flex justify-between text-sm">
                  <span className="text-primary-foreground/70">
                    Spor Formaları ({quantity} adet):
                  </span>
                  <span className="font-semibold">{basePrice.toLocaleString("tr-TR")} ₺</span>
                </div>
                {addOnPrice > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-primary-foreground/70">Ekstralar:</span>
                    <span className="font-semibold">+{addOnPrice.toLocaleString("tr-TR")} ₺</span>
                  </div>
                )}
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-accent">
                    <span>15+ adet indirimi:</span>
                    <span className="font-semibold">-{discount.toLocaleString("tr-TR")} ₺</span>
                  </div>
                )}
                <p className="text-primary-foreground/50 text-xs pt-1 border-t border-primary-foreground/10">
                  Adet başı: {PRICES[jerseyType]}₺ ({jerseyType === "jersey" ? "forma" : "forma+şort"})
                </p>
              </div>

              <Button
                onClick={handleWhatsAppOrder}
                size="lg"
                className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-display text-lg tracking-wide gap-2 mb-3"
              >
                💬 Hızlı Sipariş
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-display text-lg tracking-wide gap-2"
                onClick={handleWhatsAppOrder}
              >
                📋 Detaylı Sipariş Formu
              </Button>
            </div>

            {/* Features grid */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Zap, title: "5-7 Gün", desc: "Hızlı Teslimat" },
                { icon: Printer, title: "HD Baskı", desc: "Dijital Kalite" },
                { icon: Sparkles, title: "Ücretsiz", desc: "Tasarım Desteği" },
                { icon: HeadphonesIcon, title: "7/24", desc: "Müşteri Desteği" },
              ].map((feat, i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-4">
                  <feat.icon className="w-5 h-5 text-primary mb-2" />
                  <p className="font-bold text-foreground text-sm">{feat.title}</p>
                  <p className="text-muted-foreground text-xs">{feat.desc}</p>
                </div>
              ))}
            </div>

            {/* Why us */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <p className="font-semibold text-foreground flex items-center gap-2 mb-3">
                <ShieldCheck className="w-4 h-4 text-primary" /> Neden Egemen Spor?
              </p>
              <ul className="space-y-2">
                {[
                  "10+ yıllık tecrübe",
                  "5000+ mutlu müşteri",
                  "%100 memnuniyet garantisi",
                  "Tüm baskılar fiyata dahil",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-3.5 h-3.5 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom notes */}
        <div className="text-center mt-10 space-y-1">
          <p className="text-muted-foreground text-sm flex items-center justify-center gap-2">
            🏷️ 15+ adet siparişlerde otomatik indirim uygulanır
          </p>
          <p className="text-muted-foreground text-sm flex items-center justify-center gap-2">
            📦 Minimum sipariş: 5 adet • Türkiye geneline ücretsiz kargo
          </p>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default BulkOrder;
