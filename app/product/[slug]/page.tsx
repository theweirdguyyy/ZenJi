import React from "react";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/services/products";
import { ProductDetailClient } from "@/components/product/ProductDetailClient";

export interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: "Product Not Found | ZENJI" };
  }

  return {
    title: `${product.name} — ZENJI NEO KAGE`,
    description: product.description
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
