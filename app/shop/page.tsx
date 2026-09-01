import React from "react";
import { getProducts } from "@/lib/services/products";
import { CollectionGridClient } from "@/components/collection/CollectionGridClient";

export const metadata = {
  title: "Shop / All Apparel | ZENJI NEO KAGE",
  description: "Browse the complete ZENJI NEO KAGE apparel catalog."
};

export default async function ShopPage() {
  const products = await getProducts();

  return <CollectionGridClient products={products} />;
}
