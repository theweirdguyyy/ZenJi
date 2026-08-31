import { Product } from "@/types/product";
import { Collection } from "@/types/collection";
import { Review } from "@/types/review";
import { MOCK_PRODUCTS } from "@/data/products";
import { MOCK_COLLECTIONS } from "@/data/collections";
import { MOCK_REVIEWS } from "@/data/reviews";

export async function getProducts(): Promise<Product[]> {
  // Service boundary abstraction allowing seamless transition to Shopify/Storefront API later
  return Promise.resolve(MOCK_PRODUCTS);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const product = MOCK_PRODUCTS.find((p) => p.slug === slug);
  return Promise.resolve(product || null);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const featured = MOCK_PRODUCTS.filter((p) => p.featured);
  return Promise.resolve(featured);
}

export async function getCollections(): Promise<Collection[]> {
  return Promise.resolve(MOCK_COLLECTIONS);
}

export async function getCollectionBySlug(slug: string): Promise<Collection | null> {
  const collection = MOCK_COLLECTIONS.find((c) => c.slug === slug);
  return Promise.resolve(collection || null);
}

export async function getReviewsByProductId(productId: string): Promise<Review[]> {
  const reviews = MOCK_REVIEWS.filter((r) => r.productId === productId);
  return Promise.resolve(reviews);
}
