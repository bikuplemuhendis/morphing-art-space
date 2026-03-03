import ProductCard from "./ProductCard";

const products = [
  { image: "/images/jersey-red.png", name: "Pro Kırmızı Siyah Halı Saha Forma", originalPrice: 540, salePrice: 250, discount: 50 },
  { image: "/images/jersey-blue.png", name: "Mavi Beyaz Çizgili Halı Saha Forma", originalPrice: 540, salePrice: 250, discount: 50 },
  { image: "/images/jersey-black.png", name: "Siyah Gold Premium Halı Saha Forma", originalPrice: 540, salePrice: 250, discount: 50 },
  { image: "/images/jersey-green.png", name: "Kamuflaj Yeşil Halı Saha Forma", originalPrice: 540, salePrice: 250, discount: 50 },
  { image: "/images/jersey-white.png", name: "Türkiye Ay Yıldız Halı Saha Forma", originalPrice: 540, salePrice: 250, discount: 50 },
  { image: "/images/jersey-purple.png", name: "Mor Siyah Gradient Halı Saha Forma", originalPrice: 540, salePrice: 250, discount: 50 },
  { image: "/images/jersey-orange.png", name: "Turuncu Lacivert Yıldırım Forma", originalPrice: 540, salePrice: 250, discount: 50 },
  { image: "/images/jersey-red.png", name: "Geometrik Kırmızı Halı Saha Forma", originalPrice: 540, salePrice: 270, discount: 50 },
];

const ProductGrid = () => {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-display text-4xl text-foreground">FUTBOL FORMALARI</h2>
          <p className="text-muted-foreground mt-1">Özel tasarım halı saha formaları</p>
        </div>
        <a href="#" className="text-primary font-semibold hover:underline text-sm">
          Tümünü Gör →
        </a>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product, i) => (
          <ProductCard key={i} {...product} />
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
