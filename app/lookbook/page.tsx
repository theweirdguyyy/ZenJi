import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/common/Container";
import { MOCK_PRODUCTS } from "@/data/products";
import { LOOKBOOK_GALLERY_ITEMS } from "@/data/lookbook";
import { MasonryGallery } from "@/components/lookbook/MasonryGallery";
import { ArrowRight, Sparkles } from "lucide-react";

export const metadata = {
  title: "Lookbook — 2025 Editorial Collection | ZENJI NEO KAGE",
  description:
    "Visual stories. Real people. Unfiltered energy. Explore the ZENJI NEO KAGE 2025 editorial lookbook featuring full-cut streetwear aesthetics."
};

export default function LookbookPage() {
  const heroImage = MOCK_PRODUCTS[0]?.images[1] || "";

  return (
    <div
      style={{
        backgroundColor: "var(--color-void)",
        color: "var(--color-white)",
        overflowX: "hidden",
        minHeight: "100vh"
      }}
    >
      {/* ── HERO HEADER ─────────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          width: "100%",
          minHeight: "520px",
          overflow: "hidden",
          display: "flex",
          alignItems: "flex-end"
        }}
      >
        <div style={{ position: "absolute", inset: 0 }}>
          <Image
            src={heroImage}
            alt="Lookbook hero editorial"
            fill
            style={{
              objectFit: "cover",
              objectPosition: "right center",
              filter: "brightness(0.32)"
            }}
            priority
            sizes="100vw"
          />
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(5,0,0,0.96) 0%, rgba(227,38,26,0.1) 60%, transparent 100%)"
          }}
        />

        <Container
          size="full"
          style={{
            position: "relative",
            zIndex: 2,
            paddingTop: "var(--space-20)",
            paddingBottom: "var(--space-12)"
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "var(--space-6)"
            }}
          >
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  backgroundColor: "rgba(227,38,26,0.15)",
                  border: "1px solid rgba(227,38,26,0.35)",
                  padding: "4px 10px",
                  borderRadius: "2px",
                  marginBottom: "var(--space-3)"
                }}
              >
                <Sparkles size={10} color="var(--color-crimson)" />
                <span
                  className="font-meta"
                  style={{
                    fontSize: "9px",
                    letterSpacing: "2.5px",
                    color: "var(--color-crimson)",
                    fontWeight: 700,
                    textTransform: "uppercase"
                  }}
                >
                  2025 EDITORIAL COLLECTION
                </span>
              </div>

              <h1
                className="font-display"
                style={{
                  fontSize: "clamp(54px, 8.5vw, 112px)",
                  fontWeight: 900,
                  lineHeight: 0.9,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: "var(--color-white)",
                  marginBottom: "var(--space-2)"
                }}
              >
                LOOKBOOK
              </h1>
              <p
                className="font-body"
                style={{
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.4)",
                  letterSpacing: "3px",
                  marginBottom: "var(--space-3)"
                }}
              >
                ルックブック
              </p>
              <p
                className="font-body"
                style={{
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.65)",
                  maxWidth: "460px",
                  lineHeight: 1.6,
                  marginBottom: "var(--space-6)"
                }}
              >
                Visual stories. Real people. Unfiltered energy. Explore uncropped, native-proportioned perspectives of the entire DROP 07 capsule.
              </p>
              <Link
                href="/collection"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  backgroundColor: "var(--color-crimson)",
                  color: "var(--color-white)",
                  fontFamily: "var(--font-ui)",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "2px",
                  padding: "12px 24px",
                  borderRadius: "2px",
                  textDecoration: "none",
                  textTransform: "uppercase",
                  boxShadow: "0 4px 16px rgba(227,38,26,0.35)",
                  transition: "opacity 0.2s ease"
                }}
              >
                EXPLORE THE COLLECTION <ArrowRight size={13} />
              </Link>
            </div>

            <div
              style={{
                textAlign: "right",
                borderLeft: "1px solid rgba(255,255,255,0.12)",
                paddingLeft: "var(--space-8)"
              }}
            >
              <div
                className="font-meta"
                style={{
                  fontSize: "10px",
                  letterSpacing: "3px",
                  color: "rgba(255,255,255,0.4)",
                  marginBottom: "4px"
                }}
              >
                DROP NO.
              </div>
              <div
                className="font-display"
                style={{
                  fontSize: "clamp(48px, 5vw, 76px)",
                  fontWeight: 900,
                  lineHeight: 1,
                  color: "var(--color-white)"
                }}
              >
                07
              </div>
              <div
                className="font-meta"
                style={{
                  writingMode: "vertical-rl",
                  fontSize: "9px",
                  letterSpacing: "3px",
                  color: "rgba(255,255,255,0.3)",
                  marginTop: "8px"
                }}
              >
                2025 CAPSULE
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── TICKER ──────────────────────────────────────────────────── */}
      <div
        style={{
          width: "100%",
          backgroundColor: "#080808",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "10px 0",
          overflow: "hidden",
          whiteSpace: "nowrap"
        }}
      >
        <div
          className="font-meta"
          style={{
            fontSize: "10px",
            letterSpacing: "4px",
            color: "rgba(255,255,255,0.35)",
            textTransform: "uppercase"
          }}
        >
          ZENJI NEO KAGE &nbsp;•&nbsp; 2025 EDITORIAL LOOKBOOK &nbsp;•&nbsp; HEAVYWEIGHT 240GSM OVERSIZED TEES &nbsp;•&nbsp; TOKYO STREETWEAR &nbsp;•&nbsp; DROP 07 EXCLUSIVE &nbsp;•&nbsp; ZENJI NEO KAGE &nbsp;•&nbsp; 2025 EDITORIAL LOOKBOOK
        </div>
      </div>

      {/* ── PINTEREST-STYLE DYNAMIC MASONRY GALLERY ─────────────────── */}
      <section style={{ width: "100%", minHeight: "60vh" }}>
        <MasonryGallery items={LOOKBOOK_GALLERY_ITEMS} />
      </section>

      {/* ── DON'T MISS THE NEXT DROP ────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          width: "100%",
          minHeight: "420px",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          borderTop: "1px solid rgba(255,255,255,0.08)"
        }}
      >
        <div style={{ position: "absolute", inset: 0 }}>
          <Image
            src={MOCK_PRODUCTS[0]?.images[0] || ""}
            alt="Next drop background"
            fill
            style={{
              objectFit: "cover",
              objectPosition: "center",
              filter: "brightness(0.12)"
            }}
            sizes="100vw"
          />
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(5,5,5,0.7) 0%, rgba(5,5,5,0.96) 100%)"
          }}
        />

        <Container size="full" style={{ position: "relative", zIndex: 2 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              padding: "var(--space-16) 0"
            }}
          >
            <p
              className="font-meta"
              style={{
                fontSize: "10px",
                letterSpacing: "4px",
                color: "var(--color-crimson)",
                fontWeight: 700,
                marginBottom: "var(--space-4)"
              }}
            >
              STAY CONNECTED
            </p>
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(32px, 4.5vw, 56px)",
                fontWeight: 900,
                lineHeight: 1.0,
                textTransform: "uppercase",
                color: "var(--color-white)",
                marginBottom: "var(--space-4)"
              }}
            >
              DON&apos;T MISS<br />THE NEXT DROP
            </h2>
            <p
              className="font-body"
              style={{
                fontSize: "14px",
                color: "rgba(255,255,255,0.55)",
                marginBottom: "var(--space-8)",
                maxWidth: "420px",
                lineHeight: 1.6
              }}
            >
              Join the clan and get notified when secret drops, limited restocks, and archive pieces go live.
            </p>
            <form
              action="#"
              style={{ display: "flex", maxWidth: "440px", width: "100%" }}
            >
              <input
                type="email"
                placeholder="Enter your email"
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  borderRight: "none",
                  color: "var(--color-white)",
                  fontFamily: "var(--font-ui)",
                  fontSize: "12px",
                  padding: "14px 18px",
                  outline: "none",
                  borderRadius: "2px 0 0 2px"
                }}
              />
              <button
                type="submit"
                style={{
                  backgroundColor: "var(--color-crimson)",
                  border: "none",
                  color: "var(--color-white)",
                  fontFamily: "var(--font-ui)",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "2px",
                  padding: "14px 24px",
                  cursor: "pointer",
                  borderRadius: "0 2px 2px 0",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap"
                }}
              >
                JOIN NOW
              </button>
            </form>
          </div>
        </Container>
      </section>
    </div>
  );
}
