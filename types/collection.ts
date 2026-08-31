import { Product } from "./product";

export interface Collection {
  id: string;
  slug: string;
  name: string;
  japaneseName?: string;
  description: string;
  heroImage: string;
  productIds: string[];
  featuredProduct?: Product;
}
