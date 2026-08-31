import { Collection } from "@/types/collection";
import { MOCK_PRODUCTS } from "./products";

export const MOCK_COLLECTIONS: Collection[] = [
  {
    id: "col-drop-07",
    slug: "drop-07",
    name: "DROP 07 / NEO KAGE",
    japaneseName: "ドロップ 07 / 影",
    description: "The flagship AW26 drop merging shadow aesthetic, high GSM heavy cottons, and tactical urban silhouettes.",
    heroImage: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1200&q=80",
    productIds: ["prod-01", "prod-02"],
    featuredProduct: MOCK_PRODUCTS[0]
  },
  {
    id: "col-core",
    slug: "core-essentials",
    name: "CORE ESSENTIALS",
    japaneseName: "コア エッセンシャル",
    description: "Permanent heavy streetwear basics engineered for daily wear.",
    heroImage: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80",
    productIds: ["prod-04"],
    featuredProduct: MOCK_PRODUCTS[3]
  },
  {
    id: "col-limited",
    slug: "limited-editions",
    name: "LIMITED EDITIONS",
    japaneseName: "限定コレクション",
    description: "Strictly numbered limited releases featuring intricate embroidery and custom hardware.",
    heroImage: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1200&q=80",
    productIds: ["prod-03"],
    featuredProduct: MOCK_PRODUCTS[2]
  }
];
