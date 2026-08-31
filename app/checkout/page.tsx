import React from "react";
import Link from "next/link";
import { Container, Section, Divider } from "@/components/common/Container";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";

export const metadata = {
  title: "Checkout",
  description: "Secure ZENJI NEO KAGE order checkout."
};

export default function CheckoutPage() {
  return (
    <Section padding="lg">
      <Container size="xl">
        <div style={{ marginBottom: "var(--space-6)" }}>
          <div style={{ display: "flex", gap: "var(--space-2)", alignItems: "center", marginBottom: "var(--space-2)" }}>
            <Badge variant="crimson">ROUTE /CHECKOUT</Badge>
            <Badge variant="outline">TRANSACTION SHELL</Badge>
          </div>
          <h1 className="font-display" style={{ fontSize: "var(--font-size-4xl)" }}>
            CHECKOUT STEP FLOW
          </h1>
          <p className="font-body" style={{ color: "var(--color-mist)", maxWidth: "500px", marginTop: "var(--space-2)" }}>
            Checkout architecture placeholder. Phase 2 will implement full Contact → Shipping → Payment step flow and inline validation.
          </p>
        </div>

        <Divider />

        <div
          className="hud-border"
          style={{
            backgroundColor: "var(--color-ink)",
            padding: "var(--space-12)",
            textAlign: "center",
            marginTop: "var(--space-8)"
          }}
        >
          <span className="font-meta" style={{ color: "var(--color-crimson)", display: "block", marginBottom: "var(--space-3)" }}>
            01 CONTACT ─── 02 SHIPPING ─── 03 PAYMENT
          </span>
          <h2 className="font-display" style={{ fontSize: "var(--font-size-2xl)", marginBottom: "var(--space-4)" }}>
            TRANSACTIONAL FLOW FOUNDATION READY
          </h2>
          <p className="font-body" style={{ color: "var(--color-text-muted)", maxWidth: "500px", margin: "0 auto var(--space-6)" }}>
            Phase 1 checkout route structure is validated. Complete checkout form handling belongs to Phase 2.
          </p>
          <Link href="/shop">
            <Button variant="secondary" size="md">
              RETURN TO SHOP
            </Button>
          </Link>
        </div>
      </Container>
    </Section>
  );
}
