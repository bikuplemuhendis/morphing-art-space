import ProductCard from "./ProductCard";
import { products } from "@/data/products";
import { Link } from "react-router-dom";

const footballProducts = products.filter((p) => p.category === "futbol");

const ProductGrid = () => {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-display text-4xl text-foreground">FUTBOL FORMALARI</h2>
          <p className="text-muted-foreground mt-1">Özel tasarım halı saha formaları</p>
        </div>
        <Link to="/magaza/futbol" className="text-primary font-semibold hover:underline text-sm">
          Tümünü Gör →
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {footballProducts.map((product) => (
          <Link key={product.id} to={`/urun/${product.id}`}>
            <ProductCard {...product} />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
