import React from "react";
import { getProducts } from "@/lib/services/products";
import { CollectionGridClient } from "@/components/collection/CollectionGridClient";

export const metadata = {
  title: "Collection | ZENJI NEO KAGE",
  description: "Browse the exclusive ZENJI NEO KAGE apparel collection and drop releases."
};

export default async function CollectionPage() {
  const products = await getProducts();

  return <CollectionGridClient products={products} />;
}
