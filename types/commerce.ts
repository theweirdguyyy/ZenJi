import { Product, Color, Size } from "./product";

export interface CartItem {
  id: string; // unique item composite key (productId-color-size)
  product: Product;
  selectedColor: Color;
  selectedSize: Size;
  quantity: number;
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}

export type CheckoutStep = "contact" | "shipping" | "payment" | "confirmation";

export interface ShippingOption {
  id: string;
  name: string;
  estimatedDays: string;
  price: number;
}
