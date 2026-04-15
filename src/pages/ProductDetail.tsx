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
          </div>
        </div>
      </section>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ProductDetail;
