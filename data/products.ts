import { Product } from "@/types/product";

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "prod-01",
    slug: "warrior-spirit-tee",
    name: "WARRIOR SPIRIT TEE",
    japaneseTitle: "戦士の精神 ティー",
    description: "Heavyweight 280 GSM cotton graphic tee featuring signature NEO KAGE back stencil and front technical HUD typography.",
    price: 54,
    compareAtPrice: 65,
    currency: "USD",
    category: "Tops",
    collectionId: "col-drop-07",
    images: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "BLACK", hex: "#070707" },
      { name: "WASHED RED", hex: "#E3261A" },
      { name: "BONE", hex: "#F4F1EA" }
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    availableSizes: ["S", "M", "L", "XL"],
    material: "100% Combed Organic Cotton",
    gsm: 280,
    fit: "Oversized Fit",
    careInstructions: "Machine wash cold inside out, hang dry only.",
    badges: ["LIMITED", "NEW"],
    stock: 18,
    rating: 4.9,
    reviewCount: 128,
    featured: true,
    dropInfo: {
      id: "drop-07",
      number: "DROP 07",
      title: "NEO KAGE AW26",
      releaseDate: "2026-09-01T00:00:00Z",
      status: "active"
    }
  },
  {
    id: "prod-02",
    slug: "shadow-clan-hoodie",
    name: "SHADOW CLAN HOODIE",
    japaneseTitle: "影一族 フーディー",
    description: "Ultra-heavyweight 480 GSM French terry hoodie with double-layered hood, custom Japanese embroidery, and side ribbing.",
    price: 89,
    currency: "USD",
    category: "Outerwear",
    collectionId: "col-drop-07",
    images: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "BLACK", hex: "#070707" },
      { name: "CHARCOAL", hex: "#111111" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    availableSizes: ["M", "L", "XL"],
    material: "100% French Terry Cotton",
    gsm: 480,
    fit: "Relaxed Boxy Fit",
    careInstructions: "Dry clean or gentle cold wash.",
    badges: ["NEW"],
    stock: 24,
    rating: 5.0,
    reviewCount: 94,
    featured: true,
    dropInfo: {
      id: "drop-07",
      number: "DROP 07",
      title: "NEO KAGE AW26",
      releaseDate: "2026-09-01T00:00:00Z",
      status: "active"
    }
  },
  {
    id: "prod-03",
    slug: "kage-oni-jacket",
    name: "KAGE ONI BOMBER JACKET",
    japaneseTitle: "影鬼 ボマージャケット",
    description: "Water-resistant technical nylon flight jacket featuring custom crimson lining and back Oni embroidery artwork.",
    price: 145,
    compareAtPrice: 175,
    currency: "USD",
    category: "Outerwear",
    collectionId: "col-limited",
    images: [
      "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "VOID BLACK", hex: "#070707" }
    ],
    sizes: ["S", "M", "L", "XL"],
    availableSizes: ["S", "M", "L"],
    material: "100% Technical Nylon Shell / Polyester Satin Lining",
    gsm: 320,
    fit: "Tailored Street Fit",
    careInstructions: "Professional dry clean only.",
    badges: ["LIMITED", "SALE"],
    stock: 7,
    rating: 4.8,
    reviewCount: 42,
    featured: true
  },
  {
    id: "prod-04",
    slug: "neo-tokyo-cargo-pant",
    name: "NEO TOKYO TACTICAL CARGO",
    japaneseTitle: "ネオ東京 タクティカルパンツ",
    description: "Multi-pocket technical cargo pants with adjustable ankles, D-ring loops, and reinforced knee paneling.",
    price: 98,
    currency: "USD",
    category: "Pants",
    collectionId: "col-core",
    images: [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "INK BLACK", hex: "#111111" }
    ],
    sizes: ["S", "M", "L", "XL"],
    availableSizes: ["M", "L", "XL"],
    material: "Ripstop Cotton Blend",
    fit: "Modular Tapered Fit",
    badges: ["RESTOCK"],
    stock: 12,
    rating: 4.7,
    reviewCount: 61,
    featured: false
  }
];
