import React from "react";
import { Container, Section, Divider } from "@/components/common/Container";
import { Badge } from "@/components/common/Badge";

export const metadata = {
  title: "Lookbook",
  description: "Editorial visual campaign and lifestyle lookbook."
};

export default function LookbookPage() {
  return (
    <Section padding="lg">
      <Container size="2xl">
        <div style={{ marginBottom: "var(--space-6)" }}>
          <div style={{ display: "flex", gap: "var(--space-2)", alignItems: "center", marginBottom: "var(--space-2)" }}>
            <Badge variant="crimson">ROUTE /LOOKBOOK</Badge>
            <Badge variant="outline">EDITORIAL CAMPAIGN</Badge>
          </div>
          <h1 className="font-display" style={{ fontSize: "var(--font-size-4xl)" }}>
            LOOKBOOK & EDITORIAL
          </h1>
          <p className="font-body" style={{ color: "var(--color-mist)", maxWidth: "500px", marginTop: "var(--space-2)" }}>
            Lookbook route placeholder shell. Phase 3 will build asymmetric masonry layouts, full-screen chapters, and product hotspots.
          </p>
        </div>

        <Divider />

        <div
          className="hud-border"
          style={{
            backgroundColor: "var(--color-ink)",
            padding: "var(--space-16)",
            textAlign: "center",
            marginTop: "var(--space-8)"
          }}
        >
          <span className="font-meta" style={{ color: "var(--color-crimson)", display: "block", marginBottom: "var(--space-3)" }}>
            ✦ CHAPTER 01 / SHADOW DIVISION
          </span>
          <h2 className="font-display" style={{ fontSize: "var(--font-size-3xl)", marginBottom: "var(--space-4)" }}>
            EDITORIAL MASONRY GALLERY SHELL
          </h2>
          <p className="font-body" style={{ color: "var(--color-text-muted)", maxWidth: "500px", margin: "0 auto" }}>
            The lookbook foundation architecture is ready. Visual hotspots and chapter controls will be connected in Phase 3.
          </p>
        </div>
      </Container>
    </Section>
  );
}
