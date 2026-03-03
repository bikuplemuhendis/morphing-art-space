interface ProductCardProps {
  image: string;
  name: string;
  originalPrice: number;
  salePrice: number;
  discount: number;
}

const ProductCard = ({ image, name, originalPrice, salePrice, discount }: ProductCardProps) => {
  return (
    <div className="product-card group cursor-pointer">
      <div className="relative overflow-hidden bg-secondary">
        <img
          src={image}
          alt={name}
          className="w-full aspect-[3/4] object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {discount > 0 && (
          <span className="badge-sale absolute top-3 left-3">%{discount}</span>
        )}
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-sm text-card-foreground line-clamp-2 mb-2">{name}</h3>
        <div className="flex items-center gap-2">
          {discount > 0 && (
            <span className="text-muted-foreground text-sm line-through">
              {originalPrice.toFixed(2)}₺
            </span>
          )}
          <span className="text-primary font-bold text-lg">
            {salePrice.toFixed(2)}₺
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
