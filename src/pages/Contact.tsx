import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const contactInfo = [
  {
    icon: Phone,
    title: "Telefon",
    value: "0542 383 3860",
    sub: "Pzt-Cmt: 09:00 - 18:00",
    href: "tel:+905423833860",
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "0542 383 3860",
    sub: "7/24 yazabilirsiniz",
    href: "https://wa.me/905423833860",
    color: "bg-green-500/10 text-green-500",
  },
  {
    icon: Mail,
    title: "E-posta",
    value: "info@egemenspor.com",
    sub: "24 saat içinde yanıt",
    href: "mailto:info@egemenspor.com",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: MapPin,
    title: "Adres",
    value: "İstanbul, Türkiye",
    sub: "Fabrika & Showroom",
    href: "#harita",
    color: "bg-orange-500/10 text-orange-500",
  },
];

const faqItems = [
  {
    q: "Minimum sipariş adedi kaçtır?",
    a: "Minimum sipariş adedimiz 5 adettir. Tekli forma üretimi bulunmamaktadır.",
  },
  {
    q: "Teslimat süresi ne kadar?",
    a: "Siparişiniz onaylandıktan sonra 3 iş günü içinde kargoya verilir. Kargo süresi bulunduğunuz şehre göre 1-2 gün sürmektedir.",
  },
  {
    q: "Kapıda ödeme var mı?",
    a: "Evet, kapıda nakit veya kredi kartı ile ödeme yapabilirsiniz. Havale/EFT ile ön ödeme seçeneğimiz de mevcuttur.",
  },
  {
    q: "Logo ve isim baskısı dahil mi?",
    a: "Evet, tüm formalarımızda isim, numara ve logo baskısı fiyata dahildir. Sublimation baskı teknolojisi kullanıyoruz.",
  },
  {
    q: "Formayı tasarlatabilir miyim?",
    a: "Evet, yapay zeka destekli forma tasarım aracımız ile istediğiniz formayı tasarlayabilirsiniz. Ayrıca WhatsApp üzerinden tasarım ekibimizle de iletişime geçebilirsiniz.",
  },
  {
    q: "İade ve değişim yapılıyor mu?",
    a: "Özel üretim ürünlerde iade kabul edilmemektedir ancak beden değişimi ücretsiz olarak yapılmaktadır.",
  },
];

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Mesajınız alındı!",
      description: "En kısa sürede size dönüş yapacağız.",
    });
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <div className="gradient-hero py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl sm:text-5xl text-primary-foreground mb-2">İLETİŞİM</h1>
          <p className="text-primary-foreground/70 max-w-lg mx-auto">
            Sorularınız, sipariş talepleriniz veya özel tasarım istekleriniz için bizimle iletişime geçin.
          </p>
        </div>
      </div>

      {/* Contact Cards */}
      <section className="container mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {contactInfo.map((item, i) => (
            <a
              key={i}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="bg-card border border-border rounded-xl p-5 hover:border-primary hover:shadow-lg transition-all group"
            >
              <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="font-display text-lg text-foreground">{item.title}</h3>
              <p className="text-foreground font-semibold text-sm mt-1">{item.value}</p>
              <p className="text-muted-foreground text-xs mt-0.5">{item.sub}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Form + Map */}
      <section className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Form */}
          <div>
            <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-2">Bize Ulaşın</p>
            <h2 className="font-display text-3xl text-foreground mb-6">MESAJ GÖNDERIN</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Ad Soyad *</label>
                  <Input
                    required
                    placeholder="Adınız Soyadınız"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">E-posta *</label>
                  <Input
                    required
                    type="email"
                    placeholder="ornek@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Telefon</label>
                  <Input
                    type="tel"
                    placeholder="05XX XXX XX XX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Konu *</label>
                  <Input
                    required
                    placeholder="Sipariş / Tasarım / Genel"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Mesajınız *</label>
                <Textarea
                  required
                  rows={5}
                  placeholder="Mesajınızı buraya yazın..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <Button type="submit" size="lg" className="w-full sm:w-auto font-display text-lg tracking-wide gap-2">
                <Send className="w-5 h-5" /> MESAJ GÖNDER
              </Button>
            </form>
          </div>

          {/* Map + Working Hours */}
          <div className="space-y-6">
            <div id="harita" className="rounded-2xl overflow-hidden border border-border h-[300px] bg-secondary">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d385396.3509351748!2d28.731994399999998!3d41.00498225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caa7040068086b%3A0xe1ccfe98bc01b0d0!2zxLBzdGFuYnVs!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Egemen Spor Konum"
              />
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display text-xl text-foreground">ÇALIŞMA SAATLERİ</h3>
              </div>
              <div className="space-y-2">
                {[
                  { day: "Pazartesi - Cuma", hours: "09:00 - 18:00", active: true },
                  { day: "Cumartesi", hours: "10:00 - 16:00", active: true },
                  { day: "Pazar", hours: "Kapalı", active: false },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <span className="text-foreground font-medium text-sm">{item.day}</span>
                    <span className={`text-sm font-semibold ${item.active ? "text-green-500" : "text-muted-foreground"}`}>
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-secondary py-14">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-2">SSS</p>
            <h2 className="font-display text-4xl text-foreground">SIK SORULAN SORULAR</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-3">
            {faqItems.map((faq, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                >
                  <span className="font-semibold text-foreground text-sm pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-200 ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4">
                    <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="container mx-auto px-4 py-12">
        <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-8 sm:p-10 text-center">
          <MessageCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h3 className="font-display text-3xl text-foreground mb-2">HIZLI İLETİŞİM İÇİN WHATSAPP</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Sipariş, tasarım veya herhangi bir soru için WhatsApp üzerinden anında bize ulaşabilirsiniz.
          </p>
          <a
            href="https://wa.me/905423833860"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" className="font-display text-lg tracking-wide gap-2 bg-green-600 hover:bg-green-700">
              <MessageCircle className="w-5 h-5" /> WHATSAPP'TAN YAZ
            </Button>
          </a>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Contact;
