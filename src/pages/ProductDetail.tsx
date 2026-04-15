import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { getProductById } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Minus, Plus, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProductById(id || "");
  const { addItem } = useCart();
  const { toast } = useToast();
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-display text-4xl text-foreground mb-4">ÜRÜN BULUNAMADI</h1>
          <Button onClick={() => navigate("/magaza")} variant="outline">Mağazaya Dön</Button>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({ title: "Beden seçiniz", description: "Lütfen bir beden seçin.", variant: "destructive" });
      return;
    }
    addItem(product, selectedSize, quantity);
    toast({ title: "Sepete Eklendi!", description: `${product.name} (${selectedSize}) sepetinize eklendi.` });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="container mx-auto px-4 py-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Geri Dön
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Image */}
          <div className="relative bg-secondary rounded-xl overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full aspect-square object-cover" />
            {product.discount > 0 && (
              <span className="absolute top-4 left-4 bg-primary text-primary-foreground font-bold px-3 py-1 rounded-lg text-sm">
                %{product.discount} İNDİRİM
              </span>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-1">
                {product.category === "futbol" ? "Futbol Forması" : product.category === "basketbol" ? "Basketbol Forması" : "Voleybol Forması"}
              </p>
              <h1 className="font-display text-3xl sm:text-4xl text-foreground">{product.name}</h1>
            </div>

            <div className="flex items-baseline gap-3">
              {product.discount > 0 && (
                <span className="text-muted-foreground text-xl line-through">{product.originalPrice.toFixed(2)}₺</span>
              )}
              <span className="text-primary font-bold text-3xl">{product.salePrice.toFixed(2)}₺</span>
            </div>

            <p className="text-foreground/70 leading-relaxed">{product.description}</p>

            {/* Size */}
            <div>
              <p className="font-semibold text-foreground mb-2">Beden Seçimi</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg border font-semibold text-sm transition-all ${
                      selectedSize === size
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border text-foreground hover:border-primary"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <p className="font-semibold text-foreground mb-2">Adet</p>
              <div className="flex items-center gap-3">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 rounded-lg border border-border flex items-center justify-center hover:border-primary transition-colors">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-bold text-lg w-8 text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 rounded-lg border border-border flex items-center justify-center hover:border-primary transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <Button size="lg" className="font-display text-lg tracking-wide gap-2 mt-2" onClick={handleAddToCart}>
              <ShoppingCart className="w-5 h-5" /> SEPETE EKLE
            </Button>
            <a
              href={`https://wa.me/905312427762?text=${encodeURIComponent(`Merhaba, bu ürünü sipariş vermek istiyorum:\n\n${product.name}\nBeden: ${selectedSize || "Seçilmedi"}\nAdet: ${quantity}\nFiyat: ${product.salePrice.toFixed(2)}₺`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 h-11 px-8 rounded-md font-display text-lg tracking-wide bg-[hsl(var(--whatsapp))] text-primary-foreground hover:opacity-90 transition-opacity"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WHATSAPP İLE SİPARİŞ VER
            </a>
          </div>
        </div>
      </section>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ProductDetail;
