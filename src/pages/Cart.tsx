import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { items, updateQuantity, removeItem, clearCart, totalPrice, totalItems } = useCart();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="container mx-auto px-4 py-8">
        <h1 className="font-display text-4xl text-foreground mb-8">SEPETİM ({totalItems} Ürün)</h1>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-xl text-muted-foreground mb-4">Sepetiniz boş</p>
            <Button onClick={() => navigate("/magaza")} className="font-display tracking-wide">
              ALIŞVERİŞE BAŞLA
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.size}`} className="bg-card border border-border rounded-xl p-4 flex gap-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-24 h-24 object-cover rounded-lg cursor-pointer"
                    onClick={() => navigate(`/urun/${item.product.id}`)}
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground line-clamp-1">{item.product.name}</h3>
                    <p className="text-muted-foreground text-sm">Beden: {item.size}</p>
                    <p className="text-primary font-bold text-lg mt-1">{item.product.salePrice.toFixed(2)}₺</p>
                    <div className="flex items-center gap-3 mt-2">
                      <button onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)} className="w-8 h-8 rounded border border-border flex items-center justify-center hover:border-primary transition-colors">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-bold text-sm">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)} className="w-8 h-8 rounded border border-border flex items-center justify-center hover:border-primary transition-colors">
                        <Plus className="w-3 h-3" />
                      </button>
                      <button onClick={() => removeItem(item.product.id, item.size)} className="ml-auto text-muted-foreground hover:text-destructive transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <button onClick={clearCart} className="text-sm text-muted-foreground hover:text-destructive transition-colors">
                Sepeti Temizle
              </button>
            </div>

            {/* Summary */}
            <div className="bg-card border border-border rounded-xl p-6 h-fit sticky top-28">
              <h2 className="font-display text-2xl text-foreground mb-4">SİPARİŞ ÖZETİ</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Ara Toplam</span>
                  <span className="text-foreground font-semibold">{totalPrice.toFixed(2)}₺</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Kargo</span>
                  <span className="text-sport-green font-semibold">{totalPrice >= 500 ? "Ücretsiz" : "29.90₺"}</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between text-lg">
                  <span className="font-bold text-foreground">Toplam</span>
                  <span className="font-bold text-primary">
                    {(totalPrice + (totalPrice >= 500 ? 0 : 29.9)).toFixed(2)}₺
                  </span>
                </div>
              </div>
              <Button size="lg" className="w-full mt-6 font-display text-lg tracking-wide">
                SİPARİŞİ TAMAMLA
              </Button>
              <p className="text-xs text-muted-foreground text-center mt-3">
                WhatsApp üzerinden sipariş onayı yapılacaktır.
              </p>
            </div>
          </div>
        )}
      </section>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Cart;
