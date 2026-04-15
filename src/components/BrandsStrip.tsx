const brands = ["Nike", "Adidas", "Puma", "Joma", "Kappa", "Macron", "Umbro", "Lotto"];

const BrandsStrip = () => {
  return (
    <section className="py-10 border-y border-border">
      <div className="container mx-auto px-4">
        <p className="text-muted-foreground text-center text-sm mb-6 font-medium uppercase tracking-widest">
          Çalıştığımız Markalar
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-14">
          {brands.map((b) => (
            <span
              key={b}
              className="font-display text-2xl text-muted-foreground/40 hover:text-foreground transition-colors cursor-default"
            >
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandsStrip;
