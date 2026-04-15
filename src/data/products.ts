export interface Product {
  id: string;
  image: string;
  name: string;
  originalPrice: number;
  salePrice: number;
  discount: number;
  category: "futbol" | "basketbol" | "voleybol";
  description: string;
  sizes: string[];
}

export const products: Product[] = [
  // Futbol
  { id: "f1", image: "/images/jersey-red.png", name: "Pro Kırmızı Siyah Halı Saha Forma", originalPrice: 540, salePrice: 250, discount: 50, category: "futbol", description: "Profesyonel kalitede kırmızı-siyah halı saha forması. Nefes alan kumaş, terletmez teknoloji.", sizes: ["S", "M", "L", "XL", "XXL"] },
  { id: "f2", image: "/images/jersey-blue.png", name: "Mavi Beyaz Çizgili Halı Saha Forma", originalPrice: 540, salePrice: 250, discount: 50, category: "futbol", description: "Mavi beyaz çizgili tasarım. Yüksek kalite baskı, dayanıklı kumaş.", sizes: ["S", "M", "L", "XL", "XXL"] },
  { id: "f3", image: "/images/jersey-black.png", name: "Siyah Gold Premium Halı Saha Forma", originalPrice: 540, salePrice: 250, discount: 50, category: "futbol", description: "Premium siyah-gold tasarım. Özel baskı teknolojisi ile uzun ömürlü.", sizes: ["S", "M", "L", "XL"] },
  { id: "f4", image: "/images/jersey-green.png", name: "Kamuflaj Yeşil Halı Saha Forma", originalPrice: 540, salePrice: 250, discount: 50, category: "futbol", description: "Kamuflaj desenli yeşil forma. Takımınıza farklı bir tarz katın.", sizes: ["S", "M", "L", "XL", "XXL"] },
  { id: "f5", image: "/images/jersey-white.png", name: "Türkiye Ay Yıldız Halı Saha Forma", originalPrice: 540, salePrice: 250, discount: 50, category: "futbol", description: "Türkiye temalı ay yıldız tasarım. Milli takım ruhuyla sahaya çıkın.", sizes: ["S", "M", "L", "XL"] },
  { id: "f6", image: "/images/jersey-purple.png", name: "Mor Siyah Gradient Halı Saha Forma", originalPrice: 540, salePrice: 250, discount: 50, category: "futbol", description: "Gradient geçişli mor-siyah tasarım. Modern ve şık görünüm.", sizes: ["S", "M", "L", "XL", "XXL"] },
  { id: "f7", image: "/images/jersey-orange.png", name: "Turuncu Lacivert Yıldırım Forma", originalPrice: 540, salePrice: 250, discount: 50, category: "futbol", description: "Dinamik turuncu-lacivert yıldırım deseni. Enerjik bir tasarım.", sizes: ["M", "L", "XL"] },
  { id: "f8", image: "/images/jersey-red.png", name: "Geometrik Kırmızı Halı Saha Forma", originalPrice: 540, salePrice: 270, discount: 50, category: "futbol", description: "Geometrik desenli kırmızı forma. Modern çizgiler, profesyonel görünüm.", sizes: ["S", "M", "L", "XL", "XXL"] },
  // Basketbol
  { id: "b1", image: "/images/jersey-orange.png", name: "Turuncu Basketbol Forması", originalPrice: 600, salePrice: 290, discount: 50, category: "basketbol", description: "Profesyonel basketbol forması. Geniş kesim, rahat hareket.", sizes: ["S", "M", "L", "XL", "XXL"] },
  { id: "b2", image: "/images/jersey-blue.png", name: "Mavi Beyaz Basketbol Forması", originalPrice: 600, salePrice: 290, discount: 50, category: "basketbol", description: "Klasik mavi-beyaz basketbol forması. Turnuva kalitesi.", sizes: ["S", "M", "L", "XL"] },
  { id: "b3", image: "/images/jersey-black.png", name: "Siyah Gold Basketbol Forması", originalPrice: 600, salePrice: 310, discount: 48, category: "basketbol", description: "Şık siyah-gold basketbol forması. Premium baskı kalitesi.", sizes: ["M", "L", "XL", "XXL"] },
  { id: "b4", image: "/images/jersey-red.png", name: "Kırmızı Basketbol Forması", originalPrice: 600, salePrice: 290, discount: 50, category: "basketbol", description: "Enerjik kırmızı basketbol forması. Takımınızı öne çıkarın.", sizes: ["S", "M", "L", "XL"] },
];

export const getProductById = (id: string) => products.find((p) => p.id === id);
export const getProductsByCategory = (category: string) => products.filter((p) => p.category === category);
