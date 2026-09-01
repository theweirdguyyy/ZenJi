import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/common/Container";
import { ProductCard } from "@/components/common/ProductCard";
import { MOCK_PRODUCTS } from "@/data/products";
import { HeroSlider } from "@/components/home/HeroSlider";
import { NewsletterForm } from "@/components/common/NewsletterForm";
import { CountdownTimer } from "@/components/home/CountdownTimer";
import { ShieldCheck, RotateCcw, Truck, Lock, ArrowRight } from "lucide-react";


export default function HomePage() {
  const bestSellers = MOCK_PRODUCTS.slice(0, 4);

  return (
    <div style={{ backgroundColor: "var(--color-void)", color: "var(--color-white)", overflowX: "hidden", width: "100%" }}>
      {/* 1. HERO SLIDER SECTION */}
      <HeroSlider />

      {/* 2. FEATURE BAR (4 Items) */}
      <section
        style={{
          width: "100%",
          backgroundColor: "rgba(251, 251, 251, 1)",
          padding: "var(--space-6) 0"
        }}
      >
        <Container size="full">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "var(--space-6)"
            }}
          >
            {/* Item 1 */}
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
              <ShieldCheck size={28} style={{ color: "black", flexShrink: 0 }} />
              <div>
                <h4 className="font-ui" style={{ fontSize: "var(--font-size-xs)", color: "black", fontWeight: "bold", letterSpacing: "1px" }}>
                  PREMIUM QUALITY
                </h4>
                <p className="font-body" style={{ fontSize: "12px", color: "black" }}>
                  Built to last
                </p>
              </div>
            </div>

            {/* Item 2 */}
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
              <RotateCcw size={28} style={{ color: "black", flexShrink: 0 }} />
              <div>
                <h4 className="font-ui" style={{ fontSize: "var(--font-size-xs)", color: "black", fontWeight: "bold", letterSpacing: "1px" }}>
                  14-DAY RETURNS
                </h4>
                <p className="font-body" style={{ fontSize: "12px", color: "black" }}>
                  Hassle free
                </p>
              </div>
            </div>

            {/* Item 3 */}
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
              <Truck size={28} style={{ color: "black", flexShrink: 0 }} />
              <div>
                <h4 className="font-ui" style={{ fontSize: "var(--font-size-xs)", color: "black", fontWeight: "bold", letterSpacing: "1px" }}>
                  FAST SHIPPING
                </h4>
                <p className="font-body" style={{ fontSize: "12px", color: "black" }}>
                  Worldwide delivery
                </p>
              </div>
            </div>

            {/* Item 4 */}
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
              <Lock size={28} style={{ color: "black", flexShrink: 0 }} />
              <div>
                <h4 className="font-ui" style={{ fontSize: "var(--font-size-xs)", color: "black", fontWeight: "bold", letterSpacing: "1px" }}>
                  SECURE PAYMENT
                </h4>
                <p className="font-body" style={{ fontSize: "12px", color: "black" }}>
                  100% protected
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. NEW DROP SECTION */}
      <section
        style={{
          position: "relative",
          width: "100%",
          minHeight: "clamp(460px, 55vh, 600px)",
          backgroundColor: "#000000",
          backgroundImage: "url('/NewDrop_background.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 5%",
          display: "flex",
          alignItems: "center",
          padding: "clamp(48px, 6vw, 84px) 0",
          borderBottom: "1px solid var(--color-border-subtle)"
        }}
      >
        <Container size="full">
          <div style={{ maxWidth: "580px" }}>
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(36px, 5.5vw, 56px)",
                fontWeight: 900,
                letterSpacing: "2px",
                lineHeight: 1.05,
                marginBottom: "var(--space-6)",
                textTransform: "uppercase",
                color: "var(--color-white)"
              }}
            >
              NEW DROP
            </h2>

            {/* Real-time Looping Countdown Timer */}
            <CountdownTimer />

            <div>
              <Link
                href="/collection"
                className="font-ui"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  backgroundColor: "var(--color-crimson)",
                  color: "var(--color-white)",
                  fontSize: "var(--font-size-xs)",
                  fontWeight: "var(--weight-bold)",
                  letterSpacing: "var(--tracking-widest)",
                  padding: "var(--space-4) var(--space-8)",
                  borderRadius: "2px",
                  textDecoration: "none",
                  transition: "opacity 0.2s, transform 0.15s ease",
                  textTransform: "uppercase"
                }}
              >
                <span>VIEW DROP</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* 4. BEST SELLERS SECTION */}
      <section
        style={{
          width: "100%",
          backgroundColor: "var(--color-white)",
          padding: "var(--space-8) 0 var(--space-12)",
          borderBottom: "1px solid var(--color-border-subtle)"
        }}
      >
        <Container size="full">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "var(--space-5)"
            }}
          >
            <h2 className="font-display" style={{ color: "black", fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 900 }}>
              BEST SELLERS
            </h2>
            <Link
              href="/collection"
              className="font-ui"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                fontSize: "var(--font-size-xs)",
                fontWeight: "bold",
                color: "black",
                letterSpacing: "1px",
                textDecoration: "none"
              }}
            >
              VIEW ALL <ArrowRight size={14} />
            </Link>
          </div>

          {/* 4-column product grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "var(--space-6)"
            }}
          >
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} theme="light" />
            ))}
          </div>
        </Container>
      </section>

      {/* 5. JOIN THE CLAN NEWSLETTER */}
      <section
        style={{
          position: "relative",
          width: "100%",
          minHeight: "clamp(380px, 45vh, 480px)",
          backgroundColor: "#080304",
          backgroundImage: "url('/joinclan-background.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center right",
          display: "flex",
          alignItems: "center",
          padding: "clamp(48px, 6vw, 88px) 0"
        }}
      >
        <Container size="full">
          <div style={{ maxWidth: "560px" }}>
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(36px, 5.5vw, 56px)",
                fontWeight: 900,
                marginBottom: "var(--space-3)",
                letterSpacing: "1.5px",
                lineHeight: 1.05,
                textTransform: "uppercase",
                color: "var(--color-white)"
              }}
            >
              JOIN THE CLAN
            </h2>
            <p
              className="font-ui"
              style={{
                color: "rgba(255, 255, 255, 0.75)",
                fontSize: "clamp(13px, 1.6vw, 15px)",
                fontWeight: 700,
                letterSpacing: "0.8px",
                lineHeight: 1.45,
                textTransform: "uppercase",
                marginBottom: "var(--space-6)",
                maxWidth: "460px"
              }}
            >
              GET EXCLUSIVE ACCESS TO DROPS,<br />EARLY RELEASES AND MORE.
            </p>

            <NewsletterForm />
          </div>
        </Container>
      </section>
    </div>
  );
}
