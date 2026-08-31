export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL";

export interface Color {
  name: string;
  hex: string;
}

export type ProductCategory = "Tops" | "Outerwear" | "Pants" | "Accessories" | "Limited";

export interface ProductVariant {
  id: string;
  sku: string;
  size: Size;
  color: Color;
  stock: number;
  price: number;
}

export interface DropInfo {
  id: string;
  number: string; // e.g. "DROP 07"
  title: string;
  releaseDate: string;
  status: "active" | "upcoming" | "archived";
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  japaneseTitle?: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  currency: string;
  category: ProductCategory;
  collectionId: string;
  images: string[];
  colors: Color[];
  sizes: Size[];
  availableSizes: Size[];
  material?: string;
  gsm?: number;
  fit?: string;
  careInstructions?: string;
  badges?: ("NEW" | "LIMITED" | "SALE" | "RESTOCK")[];
  stock: number;
  rating: number;
  reviewCount: number;
  featured?: boolean;
  dropInfo?: DropInfo;
}
