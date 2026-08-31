import React from "react";
import Link from "next/link";
import { Container, Section, Divider } from "@/components/common/Container";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { getCollections } from "@/lib/services/products";

export const metadata = {
  title: "Collections",
  description: "Explore ZENJI NEO KAGE drop releases and capsule collections."
};

export default async function CollectionPage() {
  const collections = await getCollections();

  return (
    <Section padding="lg">
      <Container size="2xl">
        <div style={{ marginBottom: "var(--space-6)" }}>
          <div style={{ display: "flex", gap: "var(--space-2)", alignItems: "center", marginBottom: "var(--space-2)" }}>
            <Badge variant="crimson">ROUTE /COLLECTION</Badge>
            <Badge variant="outline">DROPS & CAPSULES</Badge>
          </div>
          <h1 className="font-display" style={{ fontSize: "var(--font-size-4xl)" }}>
            COLLECTIONS & DROPS
          </h1>
          <p className="font-body" style={{ color: "var(--color-mist)", maxWidth: "500px", marginTop: "var(--space-2)" }}>
            Collection routing architecture shell. Phase 2 will render full chapter previews and countdown HUD elements.
          </p>
        </div>

        <Divider />

        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)", marginTop: "var(--space-8)" }}>
          {collections.map((col) => (
            <div
              key={col.id}
              className="hud-border"
              style={{
                backgroundColor: "var(--color-ink)",
                padding: "var(--space-8)",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "var(--space-6)"
              }}
            >
              <div>
                <span className="font-meta" style={{ color: "var(--color-crimson)" }}>
                  {col.japaneseName}
                </span>
                <h2 className="font-display" style={{ fontSize: "var(--font-size-2xl)", margin: "var(--space-2) 0" }}>
                  {col.name}
                </h2>
                <p className="font-body" style={{ color: "var(--color-mist)", maxWidth: "600px" }}>
                  {col.description}
                </p>
              </div>

              <Link href="/shop">
                <Button variant="secondary" size="md">
                  VIEW COLLECTION
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
