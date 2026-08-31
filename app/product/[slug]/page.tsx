import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Section, Divider } from "@/components/common/Container";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { getProductBySlug } from "@/lib/services/products";

export interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };
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

  return (
    <Section padding="lg">
      <Container size="xl">
        <div style={{ marginBottom: "var(--space-4)" }}>
          <div style={{ display: "flex", gap: "var(--space-2)", alignItems: "center", marginBottom: "var(--space-2)" }}>
            <Badge variant="crimson">ROUTE /PRODUCT/[SLUG]</Badge>
            <Badge variant="outline">SKU: {product.id}</Badge>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "var(--space-10)",
            marginTop: "var(--space-6)"
          }}
        >
          {/* Media Placeholder Panel */}
          <div
            className="hud-border"
            style={{
              backgroundColor: "var(--color-ink)",
              aspectRatio: "3/4",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "var(--space-6)",
              textAlign: "center"
            }}
          >
            <span className="font-meta" style={{ color: "var(--color-mist)", marginBottom: "var(--space-2)" }}>
              [ MEDIA GALLERY PLACEHOLDER ]
            </span>
            <p className="font-body" style={{ color: "var(--color-text-muted)", fontSize: "var(--font-size-xs)" }}>
              Phase 2 will implement multi-angle zoom gallery, sticky purchase rail, and mobile persistent Add-to-Cart bar.
            </p>
          </div>

          {/* Product Purchase Rail Shell */}
          <div>
            <span className="font-meta" style={{ color: "var(--color-crimson)" }}>
              {product.dropInfo ? `${product.dropInfo.number} / LIMITED` : "CORE COLLECTION"}
            </span>

            <h1 className="font-display" style={{ fontSize: "var(--font-size-3xl)", margin: "var(--space-2) 0" }}>
              {product.name}
            </h1>

            {product.japaneseTitle && (
              <p className="font-meta" style={{ color: "var(--color-text-muted)", marginBottom: "var(--space-4)" }}>
                {product.japaneseTitle}
              </p>
            )}

            <p className="font-display" style={{ fontSize: "var(--font-size-2xl)", color: "var(--color-white)", marginBottom: "var(--space-4)" }}>
              ${product.price} USD
            </p>

            <Divider style={{ margin: "var(--space-4) 0" }} />

            <p className="font-body" style={{ color: "var(--color-mist)", marginBottom: "var(--space-6)", fontSize: "var(--font-size-sm)" }}>
              {product.description}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)", marginBottom: "var(--space-8)" }}>
              <span className="font-meta" style={{ color: "var(--color-mist)" }}>
                AVAILABLE SIZES: {product.sizes.join(" • ")}
              </span>
              <span className="font-meta" style={{ color: "var(--color-mist)" }}>
                GSM: {product.gsm || "N/A"} | FIT: {product.fit || "Standard"}
              </span>
            </div>

            <div style={{ display: "flex", gap: "var(--space-4)" }}>
              <Link href="/shop" style={{ flex: 1 }}>
                <Button variant="primary" size="lg" fullWidth>
                  BACK TO SHOP
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
