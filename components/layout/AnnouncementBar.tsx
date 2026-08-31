import React from "react";
import { Container } from "@/components/common/Container";

export const AnnouncementBar: React.FC = () => {
  return (
    <aside
      style={{
        backgroundColor: "var(--color-ink)",
        color: "var(--color-white)",
        borderBottom: "1px solid var(--color-border-subtle)",
        padding: "var(--space-2) 0",
        textAlign: "center"
      }}
    >
      <Container size="2xl">
        <p className="font-meta" style={{ fontSize: "11px", letterSpacing: "var(--tracking-widest)" }}>
          <span style={{ color: "var(--color-crimson)", marginRight: "8px" }}>✦ DROP 07 LIVE</span>
          FREE GLOBAL SHIPPING ON ORDERS OVER $150
        </p>
      </Container>
    </aside>
  );
};
