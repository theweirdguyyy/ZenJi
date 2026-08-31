import React from "react";
import Link from "next/link";
import { Container, Section, Divider } from "@/components/common/Container";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { getProducts } from "@/lib/services/products";

export const metadata = {
  title: "Shop / All Collections",
  description: "Browse the complete ZENJI NEO KAGE apparel catalog."
};

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <Section padding="lg">
      <Container size="2xl">
        <div style={{ marginBottom: "var(--space-6)" }}>
          <div style={{ display: "flex", gap: "var(--space-2)", alignItems: "center", marginBottom: "var(--space-2)" }}>
            <Badge variant="crimson">ROUTE /SHOP</Badge>
            <Badge variant="outline">PHASE 1 ROUTING FOUNDATION</Badge>
          </div>
          <h1 className="font-display" style={{ fontSize: "var(--font-size-4xl)" }}>
            SHOP / ALL APPAREL
          </h1>
          <p className="font-body" style={{ color: "var(--color-mist)", maxWidth: "500px", marginTop: "var(--space-2)" }}>
            Phase 1 catalog routing shell. Phase 2 will implement full sticky filters, category chips, and 4-column responsive grid.
          </p>
        </div>

        <Divider />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "var(--space-6)",
            marginTop: "var(--space-8)"
          }}
        >
          {products.map((p) => (
            <div
              key={p.id}
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
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "var(--space-2)" }}>
                  <Badge variant="hud">{p.category}</Badge>
                  <span className="font-meta" style={{ color: "var(--color-crimson)" }}>
                    ${p.price}
                  </span>
                </div>
                <h2 className="font-display" style={{ fontSize: "var(--font-size-xl)", margin: "var(--space-2) 0" }}>
                  {p.name}
                </h2>
                <p className="font-body" style={{ color: "var(--color-mist)", fontSize: "var(--font-size-xs)" }}>
                  {p.description}
                </p>
              </div>

              <div style={{ marginTop: "var(--space-4)" }}>
                <Link href={`/product/${p.slug}`}>
                  <Button variant="secondary" size="sm" fullWidth>
                    INSPECT PRODUCT ROUTE
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
