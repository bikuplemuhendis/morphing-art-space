import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Palette, Shirt, Type, Hash, Image, Send } from "lucide-react";

const colors = [
  { name: "Kırmızı", value: "hsl(0, 72%, 51%)" },
  { name: "Mavi", value: "hsl(220, 80%, 50%)" },
  { name: "Yeşil", value: "hsl(142, 71%, 35%)" },
  { name: "Siyah", value: "hsl(0, 0%, 10%)" },
  { name: "Beyaz", value: "hsl(0, 0%, 95%)" },
  { name: "Turuncu", value: "hsl(25, 95%, 53%)" },
  { name: "Mor", value: "hsl(270, 60%, 50%)" },
  { name: "Sarı", value: "hsl(48, 96%, 53%)" },
  { name: "Lacivert", value: "hsl(220, 60%, 25%)" },
  { name: "Bordo", value: "hsl(345, 60%, 35%)" },
];

const jerseyTypes = ["Halı Saha", "Futbol", "Basketbol", "Voleybol", "Kaleci"];

const DesignJersey = () => {
  const [primaryColor, setPrimaryColor] = useState(colors[0].value);
  const [secondaryColor, setSecondaryColor] = useState(colors[3].value);
  const [jerseyType, setJerseyType] = useState("Halı Saha");
  const [teamName, setTeamName] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [playerNumber, setPlayerNumber] = useState("");
  const [quantity, setQuantity] = useState("11");
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    const message = `Merhaba, forma tasarlamak istiyorum:\n\nForma Tipi: ${jerseyType}\nTakım Adı: ${teamName || "Belirtilmedi"}\nAna Renk: ${colors.find(c => c.value === primaryColor)?.name || primaryColor}\nİkinci Renk: ${colors.find(c => c.value === secondaryColor)?.name || secondaryColor}\nÖrnek İsim: ${playerName || "-"}\nÖrnek Numara: ${playerNumber || "-"}\nAdet: ${quantity}\nNotlar: ${notes || "Yok"}`;
    window.open(`https://wa.me/905312427762?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <div className="gradient-hero py-12">
        <div className="container mx-auto px-4 text-center">
          <Palette className="w-12 h-12 text-primary-foreground/80 mx-auto mb-3" />
          <h1 className="font-display text-4xl sm:text-5xl text-primary-foreground mb-2">FORMANI TASARLA</h1>
          <p className="text-primary-foreground/80 max-w-lg mx-auto">
            Takımının renklerini seç, isim ve numaranı belirle. Biz senin için üretelim!
          </p>
        </div>
      </div>

      <section className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Preview */}
          <div className="relative">
            <div className="sticky top-28">
              <div className="bg-secondary rounded-2xl p-8 flex items-center justify-center min-h-[400px]">
                <div className="relative w-64">
                  {/* Simple jersey SVG preview */}
                  <svg viewBox="0 0 200 260" className="w-full drop-shadow-xl">
                    {/* Body */}
                    <path d="M40,60 L40,220 C40,230 45,240 60,240 L140,240 C155,240 160,230 160,220 L160,60 L130,40 L100,50 L70,40 Z" fill={primaryColor} stroke={secondaryColor} strokeWidth="3"/>
                    {/* Sleeves */}
                    <path d="M40,60 L10,90 L10,130 L40,120 Z" fill={secondaryColor} stroke={primaryColor} strokeWidth="2"/>
                    <path d="M160,60 L190,90 L190,130 L160,120 Z" fill={secondaryColor} stroke={primaryColor} strokeWidth="2"/>
                    {/* Collar */}
                    <path d="M70,40 L100,50 L130,40 L120,30 Q100,20 80,30 Z" fill={secondaryColor}/>
                    {/* Number */}
                    <text x="100" y="160" textAnchor="middle" fill={secondaryColor} fontFamily="Bebas Neue, sans-serif" fontSize="60" fontWeight="bold">
                      {playerNumber || "10"}
                    </text>
                    {/* Name */}
                    <text x="100" y="200" textAnchor="middle" fill={secondaryColor} fontFamily="Bebas Neue, sans-serif" fontSize="18" fontWeight="bold" letterSpacing="2">
                      {(playerName || "OYUNCU").toUpperCase()}
                    </text>
                  </svg>
                  {teamName && (
                    <p className="text-center font-display text-2xl text-foreground mt-4">{teamName.toUpperCase()}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Jersey Type */}
            <div>
              <h3 className="font-display text-xl text-foreground mb-3 flex items-center gap-2">
                <Shirt className="w-5 h-5 text-primary" /> Forma Tipi
              </h3>
              <div className="flex flex-wrap gap-2">
                {jerseyTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setJerseyType(type)}
                    className={`px-4 py-2 rounded-lg border font-semibold text-sm transition-all ${
                      jerseyType === type
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border text-foreground hover:border-primary"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Primary Color */}
            <div>
              <h3 className="font-display text-xl text-foreground mb-3 flex items-center gap-2">
                <Palette className="w-5 h-5 text-primary" /> Ana Renk
              </h3>
              <div className="flex flex-wrap gap-2">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setPrimaryColor(color.value)}
                    className={`w-10 h-10 rounded-lg border-2 transition-transform hover:scale-110 ${primaryColor === color.value ? "border-primary scale-110 ring-2 ring-primary ring-offset-2 ring-offset-background" : "border-border"}`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Secondary Color */}
            <div>
              <h3 className="font-display text-xl text-foreground mb-3 flex items-center gap-2">
                <Palette className="w-5 h-5 text-accent" /> İkinci Renk
              </h3>
              <div className="flex flex-wrap gap-2">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSecondaryColor(color.value)}
                    className={`w-10 h-10 rounded-lg border-2 transition-transform hover:scale-110 ${secondaryColor === color.value ? "border-accent scale-110 ring-2 ring-accent ring-offset-2 ring-offset-background" : "border-border"}`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Team Name */}
            <div>
              <h3 className="font-display text-xl text-foreground mb-3 flex items-center gap-2">
                <Type className="w-5 h-5 text-primary" /> Takım Adı
              </h3>
              <Input
                placeholder="Takımınızın adını girin"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
              />
            </div>

            {/* Player Name & Number */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-display text-xl text-foreground mb-3 flex items-center gap-2">
                  <Type className="w-5 h-5 text-primary" /> Örnek İsim
                </h3>
                <Input
                  placeholder="Oyuncu ismi"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                />
              </div>
              <div>
                <h3 className="font-display text-xl text-foreground mb-3 flex items-center gap-2">
                  <Hash className="w-5 h-5 text-primary" /> Numara
                </h3>
                <Input
                  placeholder="10"
                  type="number"
                  min={1}
                  max={99}
                  value={playerNumber}
                  onChange={(e) => setPlayerNumber(e.target.value)}
                />
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-display text-xl text-foreground mb-3">Toplam Adet</h3>
              <Input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <p className="text-muted-foreground text-xs mt-1">Minimum sipariş: 1 adet</p>
            </div>

            {/* Logo note */}
            <div>
              <h3 className="font-display text-xl text-foreground mb-3 flex items-center gap-2">
                <Image className="w-5 h-5 text-primary" /> Logo & Notlar
              </h3>
              <Textarea
                placeholder="Logonuzu ve özel isteklerinizi burada belirtebilirsiniz. Logo dosyanızı WhatsApp üzerinden gönderebilirsiniz."
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <Button size="lg" className="w-full font-display text-lg tracking-wide gap-2" onClick={handleSubmit}>
              <Send className="w-5 h-5" /> WHATSAPP İLE SİPARİŞ VER
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Tasarımınız WhatsApp üzerinden ekibimize iletilecek ve size özel fiyat teklifi sunulacaktır.
            </p>
          </div>
        </div>
      </section>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default DesignJersey;
