import React from "react";
import Link from "next/link";
import { Container, Section } from "@/components/common/Container";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";

export default function NotFound() {
  return (
    <Section padding="lg">
      <Container size="xl">
        <div
          className="hud-border"
          style={{
            backgroundColor: "var(--color-ink)",
            padding: "var(--space-16) var(--space-8)",
            textAlign: "center"
          }}
        >
          <div style={{ display: "inline-flex", gap: "var(--space-2)", marginBottom: "var(--space-4)" }}>
            <Badge variant="crimson">404 ERROR</Badge>
            <Badge variant="outline">SYSTEM / SIGNAL LOST</Badge>
          </div>

          <h1
            className="font-display"
            style={{
              fontSize: "clamp(3rem, 8vw, 6rem)",
              color: "var(--color-white)",
              marginBottom: "var(--space-2)"
            }}
          >
            404 <span style={{ color: "var(--color-crimson)" }}>.</span> NOT FOUND
          </h1>

          <p className="font-meta" style={{ color: "var(--color-mist)", marginBottom: "var(--space-6)" }}>
            THE REQUESTED SECTOR OR PRODUCT DOES NOT EXIST IN THE ZENJI ARCHIVE.
          </p>

          <Link href="/">
            <Button variant="primary" size="lg">
              RETURN TO HOME SECTOR
            </Button>
          </Link>
        </div>
      </Container>
    </Section>
  );
}
