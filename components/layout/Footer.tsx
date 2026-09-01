import React from "react";
import Link from "next/link";
import { Container } from "@/components/common/Container";
import { Instagram, Twitter, Youtube, ArrowRight } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        backgroundColor: "var(--color-void)",
        color: "var(--color-white)",
        borderTop: "1px solid var(--color-border-subtle)",
        paddingTop: "var(--space-16)",
        paddingBottom: "var(--space-8)"
      }}
    >
      <Container size="full">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "var(--space-10)",
            marginBottom: "var(--space-12)"
          }}
        >
          {/* Brand & Socials */}
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
            <h2 className="font-display" style={{ fontSize: "var(--font-size-2xl)", letterSpacing: "2px" }}>
              ZENJI <span style={{ color: "var(--color-crimson)" }}>.</span>
            </h2>
            <div className="font-body" style={{ color: "var(--color-mist)", fontSize: "var(--font-size-xs)", lineHeight: 1.6 }}>
              <p>Anime inspired streetwear.</p>
              <p>Wear the legend.</p>
            </div>

            {/* Social Icons */}
            <div style={{ display: "flex", gap: "var(--space-3)", marginTop: "var(--space-2)" }}>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" style={{ color: "var(--color-mist)", transition: "color 0.2s" }}>
                <Instagram size={18} />
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noreferrer" aria-label="TikTok" style={{ color: "var(--color-mist)", transition: "color 0.2s" }}>
                <span style={{ fontSize: "14px", fontWeight: "bold" }}>TT</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter" style={{ color: "var(--color-mist)", transition: "color 0.2s" }}>
                <Twitter size={18} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube" style={{ color: "var(--color-mist)", transition: "color 0.2s" }}>
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* SHOP Column */}
          <div>
            <h3 className="font-meta" style={{ color: "var(--color-white)", fontSize: "var(--font-size-xs)", letterSpacing: "1.5px", marginBottom: "var(--space-4)" }}>
              SHOP
            </h3>
            <ul className="font-ui" style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "var(--space-2)", fontSize: "var(--font-size-xs)", color: "var(--color-mist)" }}>
              <li><Link href="/shop">All Products</Link></li>
              <li><Link href="/collection">Hoodies</Link></li>
              <li><Link href="/collection">T-Shirts</Link></li>
              <li><Link href="/collection">Accessories</Link></li>
            </ul>
          </div>

          {/* COMPANY Column */}
          <div>
            <h3 className="font-meta" style={{ color: "var(--color-white)", fontSize: "var(--font-size-xs)", letterSpacing: "1.5px", marginBottom: "var(--space-4)" }}>
              COMPANY
            </h3>
            <ul className="font-ui" style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "var(--space-2)", fontSize: "var(--font-size-xs)", color: "var(--color-mist)" }}>
              <li><Link href="/story">About Us</Link></li>
              <li><Link href="/lookbook">Lookbook</Link></li>
              <li><Link href="/story">Our Story</Link></li>
              <li><Link href="/story">Careers</Link></li>
            </ul>
          </div>

          {/* SUPPORT Column */}
          <div>
            <h3 className="font-meta" style={{ color: "var(--color-white)", fontSize: "var(--font-size-xs)", letterSpacing: "1.5px", marginBottom: "var(--space-4)" }}>
              SUPPORT
            </h3>
            <ul className="font-ui" style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "var(--space-2)", fontSize: "var(--font-size-xs)", color: "var(--color-mist)" }}>
              <li><Link href="/support">Contact Us</Link></li>
              <li><Link href="/support">Shipping</Link></li>
              <li><Link href="/support">Returns</Link></li>
              <li><Link href="/support">FAQ</Link></li>
            </ul>
          </div>

          {/* NEWSLETTER Column */}
          <div>
            <h3 className="font-meta" style={{ color: "var(--color-white)", fontSize: "var(--font-size-xs)", letterSpacing: "1.5px", marginBottom: "var(--space-4)" }}>
              NEWSLETTER
            </h3>
            <div style={{ position: "relative", marginBottom: "var(--space-4)" }}>
              <input
                type="email"
                placeholder="Enter your email"
                aria-label="Newsletter email"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid var(--color-border-subtle)",
                  borderRadius: "2px",
                  color: "var(--color-white)",
                  padding: "var(--space-2) var(--space-8) var(--space-2) var(--space-3)",
                  fontSize: "var(--font-size-xs)",
                  width: "100%"
                }}
              />
              <button
                type="button"
                aria-label="Submit newsletter"
                style={{
                  position: "absolute",
                  right: "8px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  color: "var(--color-white)",
                  cursor: "pointer"
                }}
              >
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Payment Icons */}
            <div style={{ display: "flex", gap: "var(--space-2)", fontSize: "10px", color: "var(--color-mist)" }}>
              <span style={{ border: "1px solid var(--color-border-subtle)", padding: "2px 6px", borderRadius: "2px" }}>VISA</span>
              <span style={{ border: "1px solid var(--color-border-subtle)", padding: "2px 6px", borderRadius: "2px" }}>MC</span>
              <span style={{ border: "1px solid var(--color-border-subtle)", padding: "2px 6px", borderRadius: "2px" }}>PayPal</span>
              <span style={{ border: "1px solid var(--color-border-subtle)", padding: "2px 6px", borderRadius: "2px" }}>ApplePay</span>
            </div>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div
          style={{
            borderTop: "1px solid var(--color-border-subtle)",
            paddingTop: "var(--space-6)",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "var(--space-4)",
            fontSize: "11px",
            color: "var(--color-text-muted)"
          }}
        >
          <p>© 2024 ZENJI. All rights reserved.</p>
          <div style={{ display: "flex", gap: "var(--space-4)" }}>
            <Link href="/support">Privacy Policy</Link>
            <Link href="/support">Terms of Service</Link>
            <Link href="/support">Refund Policy</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};
