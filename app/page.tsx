import React from "react";
import Link from "next/link";
import { Container, Section, Divider } from "@/components/common/Container";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { getFeaturedProducts } from "@/lib/services/products";

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <div>
      {/* Foundation Validation Hero Shell */}
      <Section padding="lg">
        <Container size="2xl">
          <div
            className="hud-border"
            style={{
              padding: "var(--space-12) var(--space-8)",
              backgroundColor: "var(--color-ink)",
              position: "relative",
              overflow: "hidden"
            }}
          >
            <div style={{ marginBottom: "var(--space-4)", display: "flex", gap: "var(--space-2)", alignItems: "center" }}>
              <Badge variant="ember">PHASE 1 FOUNDATION</Badge>
              <Badge variant="hud">DROP 07 RELEASE STATUS: READY</Badge>
            </div>

            <h1
              className="font-display"
              style={{
                fontSize: "clamp(2rem, 6vw, 4.5rem)",
                lineHeight: "var(--leading-none)",
                marginBottom: "var(--space-4)"
              }}
            >
              WEAR YOUR <span style={{ color: "var(--color-crimson)" }}>LEGACY</span>
            </h1>

            <p
              className="font-body"
              style={{
                color: "var(--color-mist)",
                maxWidth: "600px",
                marginBottom: "var(--space-8)",
                fontSize: "var(--font-size-lg)"
              }}
            >
              Anime-inspired premium streetwear. Limited drops, eternal impact. Testing foundation layout, typography tokens, and responsive breakpoints.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-4)" }}>
              <Link href="/shop">
                <Button variant="primary" size="lg">
                  EXPLORE CATALOG
                </Button>
              </Link>
              <Link href="/story">
                <Button variant="secondary" size="lg">
                  BRAND STORY
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      <Container size="2xl">
        <Divider />
      </Container>

      {/* Foundation Validation Grid Preview */}
      <Section padding="md">
        <Container size="2xl">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "var(--space-6)" }}>
            <div>
              <span className="font-meta" style={{ color: "var(--color-crimson)" }}>01 / CATALOG ARCHITECTURE</span>
              <h2 className="font-display" style={{ fontSize: "var(--font-size-3xl)", marginTop: "var(--space-1)" }}>
                DATA & SERVICE BOUNDARY VALIDATION
              </h2>
            </div>
            <Link href="/shop">
              <Button variant="ghost" size="sm">
                VIEW ALL →
              </Button>
            </Link>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "var(--space-6)"
            }}
          >
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="hud-border"
                style={{
                  backgroundColor: "var(--color-ink)",
                  padding: "var(--space-6)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between"
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-3)" }}>
                    <Badge variant="outline">{product.category}</Badge>
                    <span className="font-meta" style={{ color: "var(--color-crimson)" }}>
                      ${product.price} USD
                    </span>
                  </div>
                  <h3 className="font-display" style={{ fontSize: "var(--font-size-xl)", marginBottom: "var(--space-2)" }}>
                    {product.name}
                  </h3>
                  {product.japaneseTitle && (
                    <p className="font-meta" style={{ color: "var(--color-text-muted)", marginBottom: "var(--space-3)" }}>
                      {product.japaneseTitle}
                    </p>
                  )}
                  <p className="font-body" style={{ color: "var(--color-mist)", fontSize: "var(--font-size-sm)", marginBottom: "var(--space-4)" }}>
                    {product.description}
                  </p>
                </div>

                <div>
                  <Link href={`/product/${product.slug}`}>
                    <Button variant="secondary" size="sm" fullWidth>
                      VIEW PRODUCT SHELL
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}
