import React from "react";
import { Container, Section, Divider } from "@/components/common/Container";
import { Badge } from "@/components/common/Badge";

export const metadata = {
  title: "Our Story",
  description: "The philosophy, warrior spirit, and craft behind ZENJI NEO KAGE."
};

export default function StoryPage() {
  return (
    <Section padding="lg">
      <Container size="2xl">
        <div style={{ marginBottom: "var(--space-6)" }}>
          <div style={{ display: "flex", gap: "var(--space-2)", alignItems: "center", marginBottom: "var(--space-2)" }}>
            <Badge variant="crimson">ROUTE /STORY</Badge>
            <Badge variant="outline">BRAND MANIFESTO</Badge>
          </div>
          <h1 className="font-display" style={{ fontSize: "var(--font-size-4xl)" }}>
            OUR STORY & PHILOSOPHY
          </h1>
          <p className="font-body" style={{ color: "var(--color-mist)", maxWidth: "500px", marginTop: "var(--space-2)" }}>
            Brand narrative routing shell. Phase 3 will introduce scroll-driven narrative transitions (origin → warrior → craft → community).
          </p>
        </div>

        <Divider />

        <div
          className="hud-border"
          style={{
            backgroundColor: "var(--color-ink)",
            padding: "var(--space-12)",
            marginTop: "var(--space-8)"
          }}
        >
          <span className="font-meta" style={{ color: "var(--color-crimson)" }}>01. ORIGIN & WARRIOR SPIRIT</span>
          <h2 className="font-display" style={{ fontSize: "var(--font-size-2xl)", margin: "var(--space-2) 0 var(--space-4)" }}>
            BORN FROM PASSION. DRIVEN BY LEGACY.
          </h2>
          <p className="font-body" style={{ color: "var(--color-mist)", maxWidth: "700px", lineHeight: "var(--leading-relaxed)" }}>
            ZENJI is more than clothing. It’s a movement inspired by anime culture, samurai ethos, warrior spirit, and limited-edition streetwear craftsmanship.
          </p>
        </div>
      </Container>
    </Section>
  );
}
