import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="container mx-auto px-4 py-16">
        <h1 className="font-display text-5xl text-foreground mb-10">İLETİŞİM</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Info */}
          <div className="space-y-6">
            <p className="text-foreground/80 leading-relaxed">
              Sorularınız, sipariş talepleriniz veya özel tasarım istekleriniz için
              bizimle iletişime geçebilirsiniz.
            </p>
            <div className="space-y-4">
              {[
                { icon: Phone, label: "Telefon", value: "0531 242 7762" },
                { icon: Mail, label: "E-posta", value: "info@egemenspor.com" },
                { icon: MapPin, label: "Adres", value: "İstanbul, Türkiye" },
                { icon: Clock, label: "Çalışma Saatleri", value: "Pzt-Cmt: 09:00 - 18:00" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{item.label}</p>
                    <p className="text-muted-foreground text-sm">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Form */}
          <div className="bg-card border border-border rounded-xl p-6 space-y-4">
            <h2 className="font-display text-2xl text-foreground">BİZE YAZIN</h2>
            <Input placeholder="Adınız Soyadınız" />
            <Input placeholder="E-posta Adresiniz" type="email" />
            <Input placeholder="Konu" />
            <Textarea placeholder="Mesajınız" rows={5} />
            <Button className="w-full font-display text-lg tracking-wide">
              GÖNDER
            </Button>
          </div>
        </div>
      </section>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Contact;
