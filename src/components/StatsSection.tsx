import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 10000, suffix: "+", label: "Mutlu Müşteri" },
  { value: 500, suffix: "+", label: "Takım" },
  { value: 50000, suffix: "+", label: "Forma Üretimi" },
  { value: 8, suffix: "+", label: "Yıllık Deneyim" },
];

const AnimatedCounter = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLParagraphElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          const duration = 2000;
          const start = performance.now();
          const step = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <p ref={ref} className="font-display text-4xl sm:text-5xl text-primary mb-1">
      {count.toLocaleString("tr-TR")}{suffix}
    </p>
  );
};

const StatsSection = () => {
  return (
    <section className="gradient-dark py-14">
      <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((s, i) => (
          <div key={i}>
            <AnimatedCounter target={s.value} suffix={s.suffix} />
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
