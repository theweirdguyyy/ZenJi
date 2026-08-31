import { Review } from "@/types/review";

export const MOCK_REVIEWS: Review[] = [
  {
    id: "rev-01",
    productId: "prod-01",
    author: "KENJI M.",
    rating: 5,
    title: "Best heavyweight tee I own",
    body: "The 280 GSM fabric feels indestructible. Crisp collar structure and the back stencil art looks incredible in person.",
    date: "2026-08-20",
    fitFeedback: "True to Size",
    tags: ["High GSM", "Heavyweight Cotton", "Fast Shipping"],
    verifiedPurchase: true
  },
  {
    id: "rev-02",
    productId: "prod-01",
    author: "ALEX T.",
    rating: 5,
    title: "Perfect boxy fit",
    body: "Drapes really well without feeling overly long. Crimson accents pop against the deep black fabric.",
    date: "2026-08-15",
    fitFeedback: "True to Size",
    tags: ["Boxy Fit", "Subtle Detailing"],
    verifiedPurchase: true
  },
  {
    id: "rev-03",
    productId: "prod-02",
    author: "SORA K.",
    rating: 5,
    title: "Unreal weight on the hood",
    body: "480 GSM terry is super plush. Hood stays upright when worn up. 10/10 recommendation.",
    date: "2026-08-28",
    fitFeedback: "True to Size",
    tags: ["Heavy Hood", "Plush Terry"],
    verifiedPurchase: true
  }
];
