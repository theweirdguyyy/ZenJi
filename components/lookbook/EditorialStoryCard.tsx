"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface EditorialStoryCardProps {
  id?: string;
  number: string;
  title: string;
  kanji: string;
  description: string[];
  cta: string;
  ctaHref: string;
}

export const EditorialStoryCard: React.FC<EditorialStoryCardProps> = ({
  number,
  title,
  kanji,
  description,
  cta,
  ctaHref
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: "relative",
        width: "100%",
        backgroundColor: "#080808",
        border: isHovered
          ? "1px solid rgba(227,38,26,0.4)"
          : "1px solid rgba(255,255,255,0.07)",
        borderRadius: "2px",
        padding: "clamp(28px, 4vw, 44px) clamp(22px, 3.5vw, 36px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        boxShadow: isHovered
          ? "0 8px 32px rgba(227,38,26,0.12)"
          : "0 4px 16px rgba(0,0,0,0.5)",
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

      {/* Number and Slash */}
      <div style={{ marginBottom: "var(--space-2)" }}>
        <span
          className="font-display"
          style={{
            fontSize: "26px",
            fontWeight: 900,
            color: "var(--color-crimson)",
            letterSpacing: "1px"
          }}
        >
          {number}
        </span>
        <span
          style={{
            display: "block",
            fontSize: "14px",
            color: "var(--color-crimson)",
            marginTop: "-4px",
            fontWeight: 700
          }}
        >
          /
        </span>
      </div>

      {/* Title */}
      <h2
        className="font-display"
        style={{
          fontSize: "clamp(24px, 2.5vw, 34px)",
          fontWeight: 900,
          lineHeight: 1.05,
          letterSpacing: "1px",
          textTransform: "uppercase",
          color: "var(--color-white)",
          whiteSpace: "pre-line",
          margin: "8px 0 6px 0"
        }}
      >
        {title}
      </h2>

      {/* Kanji Subtitle */}
      <p
        className="font-meta"
        style={{
          fontSize: "11px",
          letterSpacing: "2.5px",
          color: "rgba(255,255,255,0.4)",
          marginBottom: "var(--space-5)"
        }}
      >
        {kanji}
      </p>

      {/* Multi-line Editorial Copy */}
      <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
        {description.map((line, i) => (
          <p
            key={i}
            className="font-body"
            style={{
              fontSize: "13px",
              color: "rgba(255,255,255,0.65)",
              lineHeight: 1.65
            }}
          >
            {line}
          </p>
        ))}
      </div>

      {/* Red Divider Accent */}
      <div
        style={{
          width: "28px",
          height: "2px",
          backgroundColor: "var(--color-crimson)",
          margin: "var(--space-6) 0 var(--space-4) 0"
        }}
      />

      {/* CTA Link */}
      <div>
        <Link
          href={ctaHref}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            color: "var(--color-crimson)",
            fontFamily: "var(--font-ui)",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "2.5px",
            textDecoration: "none",
            textTransform: "uppercase",
            transition: "gap 0.2s ease, opacity 0.2s ease"
          }}
        >
          {cta} <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  );
};
