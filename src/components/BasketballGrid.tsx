import ProductCard from "./ProductCard";

const products = [
  { image: "/images/jersey-orange.png", name: "Turuncu Basketbol Forması", originalPrice: 600, salePrice: 290, discount: 50 },
  { image: "/images/jersey-blue.png", name: "Mavi Beyaz Basketbol Forması", originalPrice: 600, salePrice: 290, discount: 50 },
  { image: "/images/jersey-black.png", name: "Siyah Gold Basketbol Forması", originalPrice: 600, salePrice: 310, discount: 48 },
  { image: "/images/jersey-red.png", name: "Kırmızı Basketbol Forması", originalPrice: 600, salePrice: 290, discount: 50 },
];

const BasketballGrid = () => {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-display text-4xl text-foreground">BASKETBOL FORMALARI</h2>
          <p className="text-muted-foreground mt-1">Takımınız için profesyonel basketbol formaları</p>
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

export default BasketballGrid;
