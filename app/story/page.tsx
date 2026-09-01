import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/common/Container";
import { ArrowRight, ShieldCheck, Sparkles, Flame, Eye, Layers } from "lucide-react";

export const metadata = {
  title: "Our Story — BORN FROM PASSION. DRIVEN BY LEGACY. | ZENJI NEO KAGE",
  description:
    "ZENJI is more than clothing. It's a movement inspired by anime culture, samurai spirit, and street energy. We create designs that speak to dreamers, fighters, and legends."
};

const PILLARS = [
  {
    number: "01",
    title: "THE ORIGIN",
    kanji: "起源と情熱",
    description:
      "Born from late-night anime marathons, underground Tokyo alleyways, and the pursuit of uncompromising streetwear silhouette. We set out to create apparel that honors our icons with timeless weight and craft.",
    icon: Flame
  },
  {
    number: "02",
    title: "240GSM HEAVYWEIGHT CRAFT",
    kanji: "職人技と品質",
    description:
      "Every garment begins with custom-milled 240GSM 100% combed cotton, pre-shrunk and enzyme washed for an oversized boxy drape that outlasts fast fashion cycles.",
    icon: Layers
  },
  {
    number: "03",
    title: "BUSHIDO ETHOS",
    kanji: "武士道精神",
    description:
      "Discipline, loyalty, and relentless perseverance. Every graphic is screenprinted with premium plastisol inks, delivering deep contrast that withstands the test of time.",
    icon: ShieldCheck
  },
  {
    number: "04",
    title: "THE CLAN MOVEMENT",
    kanji: "世界的コミュニティ",
    description:
      "A collective of dreamers, fighters, and creators worldwide. From Melbourne to Tokyo, wearing ZENJI is a declaration of your unyielding spirit.",
    icon: Eye
  }
];

export default function StoryPage() {
  return (
    <div
      style={{
        backgroundColor: "var(--color-void)",
        color: "var(--color-white)",
        overflowX: "hidden",
        minHeight: "100vh"
      }}
    >
      {/* ── HERO SECTION (MATCHING APPROVED DESIGN SCREENSHOT) ──────── */}
      <section
        style={{
          position: "relative",
          width: "100%",
          minHeight: "calc(100vh - 64px)",
          display: "flex",
          alignItems: "center",
          overflow: "hidden"
        }}
      >
        {/* Background Artwork */}
        <div style={{ position: "absolute", inset: 0 }}>
          <Image
            src="/story_background.png"
            alt="ZENJI Samurai Feudal Pagoda Art"
            fill
            style={{
              objectFit: "cover",
              objectPosition: "right center"
            }}
            priority
            quality={100}
            sizes="100vw"
          />
        </div>

        {/* Gradient Overlay: Deep Dark on Left, Translucent on Samurai Art */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(5,5,5,0.98) 0%, rgba(5,5,5,0.92) 32%, rgba(5,5,5,0.5) 58%, transparent 88%)"
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(5,5,5,0.4) 0%, transparent 25%, transparent 75%, rgba(5,5,5,0.95) 100%)"
          }}
        />

        {/* Hero Content Container */}
        <Container
          size="full"
          style={{
            position: "relative",
            zIndex: 2,
            paddingTop: "clamp(48px, 8vh, 80px)",
            paddingBottom: "clamp(48px, 8vh, 80px)",
            paddingLeft: "clamp(24px, 5vw, 80px)",
            paddingRight: "clamp(24px, 5vw, 80px)"
          }}
        >
          <div style={{ maxWidth: "580px" }}>
            {/* Title: OUR STORY */}
            <h1
              className="font-display"
              style={{
                fontSize: "clamp(54px, 7.5vw, 100px)",
                fontWeight: 900,
                lineHeight: 0.95,
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "var(--color-white)",
                marginBottom: "8px"
              }}
            >
              OUR STORY
            </h1>

            {/* Kanji Subtitle */}
            <p
              style={{
                fontSize: "clamp(18px, 2.2vw, 24px)",
                color: "rgba(255,255,255,0.85)",
                letterSpacing: "3px",
                marginBottom: "clamp(32px, 5vh, 48px)",
                fontFamily: "var(--font-body)"
              }}
            >
              私たちの物語
            </p>

            {/* Red Left Accent Border & Manifesto Block */}
            <div
              style={{
                borderLeft: "4px solid var(--color-crimson)",
                paddingLeft: "clamp(20px, 3vw, 32px)"
              }}
            >
              {/* BORN FROM PASSION. DRIVEN BY LEGACY. */}
              <h2
                className="font-display"
                style={{
                  fontSize: "clamp(28px, 3.5vw, 44px)",
                  fontWeight: 900,
                  lineHeight: 1.08,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  color: "var(--color-white)",
                  marginBottom: "clamp(18px, 2.5vh, 26px)"
                }}
              >
                BORN FROM<br />
                <span style={{ color: "var(--color-crimson)" }}>PASSION.</span><br />
                DRIVEN BY<br />
                LEGACY.
              </h2>

              {/* Story Body Copy */}
              <p
                className="font-body"
                style={{
                  fontSize: "clamp(14px, 1.2vw, 16px)",
                  color: "rgba(255,255,255,0.78)",
                  lineHeight: 1.75,
                  maxWidth: "440px",
                  marginBottom: "clamp(16px, 2.5vh, 22px)"
                }}
              >
                ZENJI is more than clothing.<br />
                It&apos;s a movement inspired by<br />
                anime culture, samurai spirit,<br />
                and street energy.
              </p>

              <p
                className="font-body"
                style={{
                  fontSize: "clamp(14px, 1.2vw, 16px)",
                  color: "rgba(255,255,255,0.78)",
                  lineHeight: 1.75,
                  maxWidth: "440px",
                  marginBottom: "clamp(24px, 3.5vh, 32px)"
                }}
              >
                We create designs that<br />
                speak to dreamers,<br />
                fighters, and legends.
              </p>

              {/* CTA Button */}
              <a
                href="#journey"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  backgroundColor: "var(--color-crimson)",
                  color: "var(--color-white)",
                  fontFamily: "var(--font-ui)",
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "2px",
                  padding: "14px 28px",
                  borderRadius: "2px",
                  textDecoration: "none",
                  textTransform: "uppercase",
                  boxShadow: "0 4px 20px rgba(227,38,26,0.45)",
                  transition: "transform 0.2s ease, opacity 0.2s ease"
                }}
              >
                OUR JOURNEY <ArrowRight size={14} />
              </a>
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
          padding: "12px 0",
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
          ZENJI NEO KAGE &nbsp;•&nbsp; BORN FROM PASSION &nbsp;•&nbsp; DRIVEN BY LEGACY &nbsp;•&nbsp; 240GSM HEAVYWEIGHT COTTON &nbsp;•&nbsp; TOKYO STREETWEAR &nbsp;•&nbsp; DROP 07 &nbsp;•&nbsp; FOR DREAMERS, FIGHTERS & LEGENDS
        </div>
      </div>

      {/* ── BRAND PILLARS / JOURNEY SECTION ─────────────────────────── */}
      <section
        id="journey"
        style={{
          width: "100%",
          padding: "clamp(60px, 8vw, 120px) 0",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          backgroundColor: "rgba(255,255,255,0.01)"
        }}
      >
        <Container
          size="full"
          style={{
            paddingLeft: "clamp(24px, 5vw, 80px)",
            paddingRight: "clamp(24px, 5vw, 80px)"
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: "var(--space-6)",
              marginBottom: "clamp(40px, 6vw, 72px)"
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
                  THE FOUR PILLARS
                </span>
              </div>
              <h2
                className="font-display"
                style={{
                  fontSize: "clamp(36px, 5vw, 64px)",
                  fontWeight: 900,
                  lineHeight: 1.0,
                  textTransform: "uppercase",
                  color: "var(--color-white)",
                  letterSpacing: "1px"
                }}
              >
                THE CRAFT & CODE
              </h2>
            </div>

            <p
              className="font-body"
              style={{
                fontSize: "14px",
                color: "rgba(255,255,255,0.5)",
                maxWidth: "440px",
                lineHeight: 1.7
              }}
            >
              Every tee is engineered with purpose. We merge traditional sumi-e aesthetic with heavy industrial cuts to create wardrobe staples built to outlast seasons.
            </p>
          </div>

          {/* Pillars Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "clamp(16px, 2.5vw, 32px)"
            }}
          >
            {PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.number}
                  style={{
                    backgroundColor: "#0a0a0a",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "2px",
                    padding: "clamp(28px, 3.5vw, 44px) clamp(22px, 3vw, 36px)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    position: "relative",
                    overflow: "hidden"
                  }}
                >
                  {/* Crimson Top Edge */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "2px",
                      backgroundColor: "rgba(227,38,26,0.3)"
                    }}
                  />

                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "var(--space-5)"
                      }}
                    >
                      <span
                        className="font-display"
                        style={{
                          fontSize: "24px",
                          fontWeight: 900,
                          color: "var(--color-crimson)"
                        }}
                      >
                        {pillar.number}
                      </span>
                      <Icon size={20} color="rgba(255,255,255,0.4)" />
                    </div>

                    <h3
                      className="font-display"
                      style={{
                        fontSize: "clamp(20px, 2vw, 24px)",
                        fontWeight: 900,
                        lineHeight: 1.15,
                        textTransform: "uppercase",
                        color: "var(--color-white)",
                        letterSpacing: "1px",
                        marginBottom: "4px"
                      }}
                    >
                      {pillar.title}
                    </h3>

                    <p
                      className="font-meta"
                      style={{
                        fontSize: "11px",
                        letterSpacing: "2px",
                        color: "rgba(255,255,255,0.35)",
                        marginBottom: "var(--space-4)"
                      }}
                    >
                      {pillar.kanji}
                    </p>

                    <p
                      className="font-body"
                      style={{
                        fontSize: "13px",
                        color: "rgba(255,255,255,0.65)",
                        lineHeight: 1.7
                      }}
                    >
                      {pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ── MANIFESTO BANNER CTA ────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          width: "100%",
          minHeight: "440px",
          overflow: "hidden",
          display: "flex",
          alignItems: "center"
        }}
      >
        <div style={{ position: "absolute", inset: 0 }}>
          <Image
            src="/story_background.png"
            alt="ZENJI Story Background"
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
              "linear-gradient(180deg, rgba(5,5,5,0.85) 0%, rgba(5,5,5,0.96) 100%)"
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
                marginBottom: "var(--space-3)"
              }}
            >
              WEAR THE LEGACY
            </p>
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(34px, 5vw, 64px)",
                fontWeight: 900,
                lineHeight: 1.0,
                textTransform: "uppercase",
                color: "var(--color-white)",
                marginBottom: "var(--space-4)"
              }}
            >
              EXPLORE DROP 07
            </h2>
            <p
              className="font-body"
              style={{
                fontSize: "14px",
                color: "rgba(255,255,255,0.6)",
                marginBottom: "var(--space-8)",
                maxWidth: "480px",
                lineHeight: 1.6
              }}
            >
              Experience the 240GSM heavyweight collection. Every piece crafted in strictly limited quantities.
            </p>
            <div style={{ display: "flex", gap: "var(--space-4)", flexWrap: "wrap", justifyContent: "center" }}>
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
                  padding: "14px 26px",
                  borderRadius: "2px",
                  textDecoration: "none",
                  textTransform: "uppercase",
                  boxShadow: "0 4px 20px rgba(227,38,26,0.4)"
                }}
              >
                SHOP THE COLLECTION <ArrowRight size={13} />
              </Link>
              <Link
                href="/lookbook"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  backgroundColor: "transparent",
                  border: "1px solid rgba(255,255,255,0.25)",
                  color: "var(--color-white)",
                  fontFamily: "var(--font-ui)",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "2px",
                  padding: "14px 26px",
                  borderRadius: "2px",
                  textDecoration: "none",
                  textTransform: "uppercase"
                }}
              >
                VIEW LOOKBOOK <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
