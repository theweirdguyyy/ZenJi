import React from "react";
import { Container, Section, Divider } from "@/components/common/Container";
import { Badge } from "@/components/common/Badge";
import { Accordion } from "@/components/common/Accordion";

export const metadata = {
  title: "Support & FAQ",
  description: "Shipping, returns, size guide, and customer support."
};

const FAQ_ITEMS = [
  {
    id: "faq-1",
    title: "WHAT IS THE DISPATCH TIME FOR DROP 07 ORDERS?",
    content: "All Drop 07 items are processed within 24-48 hours. Express global shipping delivers in 3-5 business days."
  },
  {
    id: "faq-2",
    title: "HOW DO ZENJI HEAVYWEIGHT TEES FIT?",
    content: "Our tees are engineered with an oversized, boxy streetwear fit using 280 GSM cotton. We recommend ordering your true size for the intended silhouette."
  },
  {
    id: "faq-3",
    title: "WHAT IS THE RETURN POLICY?",
    content: "We accept returns within 14 days of delivery for unworn items in original packaging with tags intact."
  }
];

export default function SupportPage() {
  return (
    <Section padding="lg">
      <Container size="xl">
        <div style={{ marginBottom: "var(--space-6)" }}>
          <div style={{ display: "flex", gap: "var(--space-2)", alignItems: "center", marginBottom: "var(--space-2)" }}>
            <Badge variant="crimson">ROUTE /SUPPORT</Badge>
            <Badge variant="outline">FAQ & ASSISTANCE</Badge>
          </div>
          <h1 className="font-display" style={{ fontSize: "var(--font-size-4xl)" }}>
            SUPPORT & FAQ
          </h1>
          <p className="font-body" style={{ color: "var(--color-mist)", maxWidth: "500px", marginTop: "var(--space-2)" }}>
            Support routing foundation with working keyboard-accessible Accordion primitive.
          </p>
        </div>

        <Divider />

        <div style={{ marginTop: "var(--space-8)" }}>
          <h2 className="font-display" style={{ fontSize: "var(--font-size-2xl)", marginBottom: "var(--space-4)" }}>
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <Accordion items={FAQ_ITEMS} />
        </div>
      </Container>
    </Section>
  );
}
