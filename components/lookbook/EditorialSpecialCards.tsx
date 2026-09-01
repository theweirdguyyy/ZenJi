"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Cpu, Instagram, Sparkles } from "lucide-react";

export const TechnicalSpecCard: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: "relative",
        width: "100%",
        backgroundColor: "#090909",
        border: isHovered
          ? "1px solid rgba(227,38,26,0.5)"
          : "1px solid rgba(255,255,255,0.09)",
        borderRadius: "2px",
        padding: "clamp(24px, 3vw, 36px) clamp(20px, 2.5vw, 30px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: isHovered
          ? "0 8px 32px rgba(227,38,26,0.15)"
          : "0 4px 16px rgba(0,0,0,0.6)",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease",
        transform: isHovered ? "translateY(-2px)" : "translateY(0)"
      }}
    >
      {/* Red Corner Mark */}
      <div
        style={{
          position: "absolute",
          top: "-1px",
          right: "-1px",
          width: "8px",
          height: "8px",
          backgroundColor: "var(--color-crimson)"
        }}
      />

      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            marginBottom: "var(--space-3)"
          }}
        >
          <Cpu size={12} color="var(--color-crimson)" />
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
            TECHNICAL SPECIFICATION
          </span>
        </div>

        <h3
          className="font-display"
          style={{
            fontSize: "clamp(20px, 2vw, 26px)",
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: "1px",
            textTransform: "uppercase",
            color: "var(--color-white)",
            marginBottom: "var(--space-4)"
          }}
        >
          240GSM HEAVYWEIGHT<br />STRUCTURE
        </h3>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            padding: "14px 0",
            marginBottom: "var(--space-5)"
          }}
        >
          {[
            { label: "FABRIC", val: "100% Combed Cotton" },
            { label: "WEIGHT", val: "240 GSM Heavy Knit" },
            { label: "FINISH", val: "Garment Enzyme Washed" },
            { label: "CUT", val: "Oversized Drop Shoulder" },
            { label: "GRAPHICS", val: "Silkscreen Plastisol Ink" }
          ].map((spec) => (
            <div
              key={spec.label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontFamily: "var(--font-ui)",
                fontSize: "10px"
              }}
            >
              <span style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "1.5px" }}>
                {spec.label}
              </span>
              <span style={{ color: "var(--color-white)", fontWeight: 600 }}>
                {spec.val}
              </span>
            </div>
          ))}
        </div>
      </div>

      <Link
        href="/story"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          color: "var(--color-crimson)",
          fontFamily: "var(--font-ui)",
          fontSize: "10px",
          fontWeight: 700,
          letterSpacing: "2px",
          textDecoration: "none",
          textTransform: "uppercase"
        }}
      >
        READ FABRIC STORY <ArrowRight size={12} />
      </Link>
    </div>
  );
};

export const CommunitySpotlightCard: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: "relative",
        width: "100%",
        backgroundColor: "#090909",
        border: isHovered
          ? "1px solid rgba(227,38,26,0.5)"
          : "1px solid rgba(255,255,255,0.09)",
        borderRadius: "2px",
        padding: "clamp(24px, 3vw, 36px) clamp(20px, 2.5vw, 30px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: isHovered
          ? "0 8px 32px rgba(227,38,26,0.15)"
          : "0 4px 16px rgba(0,0,0,0.6)",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease",
        transform: isHovered ? "translateY(-2px)" : "translateY(0)"
      }}
    >
      {/* Red Corner Mark */}
      <div
        style={{
          position: "absolute",
          top: "-1px",
          right: "-1px",
          width: "8px",
          height: "8px",
          backgroundColor: "var(--color-crimson)"
        }}
      />

      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            marginBottom: "var(--space-3)"
          }}
        >
          <Instagram size={12} color="var(--color-crimson)" />
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
            COMMUNITY ARCHIVE
          </span>
        </div>

        <h3
          className="font-display"
          style={{
            fontSize: "clamp(20px, 2vw, 26px)",
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: "1px",
            textTransform: "uppercase",
            color: "var(--color-white)",
            marginBottom: "var(--space-2)"
          }}
        >
          TAG #ZENJICLAN<br />TO BE FEATURED
        </h3>

        <p
          className="font-meta"
          style={{
            fontSize: "11px",
            letterSpacing: "2px",
            color: "rgba(255,255,255,0.4)",
            marginBottom: "var(--space-4)"
          }}
        >
          ストリートコミュニティ
        </p>

        <p
          className="font-body"
          style={{
            fontSize: "13px",
            color: "rgba(255,255,255,0.65)",
            lineHeight: 1.6,
            marginBottom: "var(--space-5)"
          }}
        >
          Show how you style the drop. Tag @zenjishop on Instagram or TikTok to be included in our next seasonal editorial lookbook.
        </p>
      </div>

      <Link
        href="/story"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          color: "var(--color-crimson)",
          fontFamily: "var(--font-ui)",
          fontSize: "10px",
          fontWeight: 700,
          letterSpacing: "2px",
          textDecoration: "none",
          textTransform: "uppercase"
        }}
      >
        EXPLORE THE CLAN <ArrowRight size={12} />
      </Link>
    </div>
  );
};
