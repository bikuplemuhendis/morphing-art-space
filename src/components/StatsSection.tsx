const stats = [
  { value: "10.000+", label: "Mutlu Müşteri" },
  { value: "500+", label: "Takım" },
  { value: "50.000+", label: "Forma Üretimi" },
  { value: "8+", label: "Yıllık Deneyim" },
];

const StatsSection = () => {
  return (
    <section className="gradient-dark py-14">
      <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((s, i) => (
          <div key={i}>
            <p className="font-display text-4xl sm:text-5xl text-primary mb-1">
              {s.value}
            </p>
            <p className="text-primary-foreground/70 text-sm font-medium">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
