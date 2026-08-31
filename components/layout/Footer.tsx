import React from "react";
import Link from "next/link";
import { Container, Divider } from "@/components/common/Container";


export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        backgroundColor: "var(--color-void)",
        color: "var(--color-white)",
        borderTop: "1px solid var(--color-border-subtle)",
        paddingTop: "var(--space-16)",
        paddingBottom: "var(--space-12)"
      }}
    >
      <Container size="2xl">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "var(--space-10)"
          }}
        >
          {/* Brand Column */}
          <div>
            <h2 className="font-display" style={{ fontSize: "var(--font-size-2xl)", marginBottom: "var(--space-3)" }}>
              ZENJI <span style={{ color: "var(--color-crimson)" }}>.</span>
            </h2>
            <p className="font-meta" style={{ color: "var(--color-mist)", marginBottom: "var(--space-4)" }}>
              NEO KAGE STREETWEAR
            </p>
            <p className="font-body" style={{ color: "var(--color-text-muted)", fontSize: "var(--font-size-xs)" }}>
              Anime-inspired premium apparel engineered with heavy organic cottons, technical HUD detailing, and limited drop releases.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="font-meta" style={{ color: "var(--color-white)", marginBottom: "var(--space-4)" }}>
              SHOP & DROPS
            </h3>
            <ul className="font-ui" style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "var(--space-2)", fontSize: "var(--font-size-sm)", color: "var(--color-mist)" }}>
              <li><Link href="/shop">All Collections</Link></li>
              <li><Link href="/collection">Drop 07 / Neo Kage</Link></li>
              <li><Link href="/lookbook">Lookbook Editorial</Link></li>
              <li><Link href="/cart">Cart</Link></li>
            </ul>
          </div>

          {/* Brand Narrative */}
          <div>
            <h3 className="font-meta" style={{ color: "var(--color-white)", marginBottom: "var(--space-4)" }}>
              ABOUT ZENJI
            </h3>
            <ul className="font-ui" style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "var(--space-2)", fontSize: "var(--font-size-sm)", color: "var(--color-mist)" }}>
              <li><Link href="/story">Our Story & Philosophy</Link></li>
              <li><Link href="/support">Shipping & Returns</Link></li>
              <li><Link href="/support">Size Guide</Link></li>
              <li><Link href="/support">Contact Support</Link></li>
            </ul>
          </div>

          {/* Newsletter Stub */}
          <div>
            <h3 className="font-meta" style={{ color: "var(--color-white)", marginBottom: "var(--space-4)" }}>
              COMMUNITY INTEL
            </h3>
            <p className="font-body" style={{ color: "var(--color-mist)", fontSize: "var(--font-size-xs)", marginBottom: "var(--space-3)" }}>
              Subscribe for confidential drop access codes and early release alerts.
            </p>
            <div style={{ display: "flex", gap: "var(--space-2)" }}>
              <input
                type="email"
                placeholder="ENTER EMAIL"
                aria-label="Email address for newsletter"
                style={{
                  backgroundColor: "var(--color-ink)",
                  border: "1px solid var(--color-border-strong)",
                  color: "var(--color-white)",
                  padding: "var(--space-2) var(--space-3)",
                  fontSize: "var(--font-size-xs)",
                  fontFamily: "var(--font-meta)",
                  width: "100%"
                }}
              />
              <button
                type="button"
                className="font-meta"
                style={{
                  backgroundColor: "var(--color-crimson)",
                  color: "var(--color-white)",
                  padding: "var(--space-2) var(--space-4)",
                  cursor: "pointer",
                  fontSize: "var(--font-size-xs)"
                }}
              >
                JOIN
              </button>
            </div>
          </div>
        </div>

        <Divider style={{ marginTop: "var(--space-12)" }} />

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "var(--space-4)"
          }}
        >
          <p className="font-meta" style={{ color: "var(--color-text-muted)", fontSize: "11px" }}>
            © {new Date().getFullYear()} ZENJI NEO KAGE. ALL RIGHTS RESERVED.
          </p>
          <p className="font-meta" style={{ color: "var(--color-text-muted)", fontSize: "11px" }}>
            DESIGNED FOR WARRIORS • TOKYO / GLOBAL
          </p>
        </div>
      </Container>
    </footer>
  );
};
