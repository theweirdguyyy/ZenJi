"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

export type LookbookViewType = "FRONT" | "BACK" | "ON MODEL" | "DETAIL";

export interface LookbookCardProps {
  /** Primary image to display initially */
  src: string;
  /** Alternate FRONT image */
  frontSrc?: string;
  /** Alternate BACK image */
  backSrc?: string;
  /** Alternate ON MODEL image */
  modelSrc?: string;
  /** Alternate DETAIL / CLOSEUP image */
  detailSrc?: string;
  /** Initial active view */
  initialView?: LookbookViewType;
  altText?: string;
  productSlug?: string;
  productName?: string;
  badge?: string;
  priority?: boolean;
}

export const LookbookCard: React.FC<LookbookCardProps> = ({
  src,
  frontSrc,
  backSrc,
  modelSrc,
  detailSrc,
  initialView = "FRONT",
  altText = "ZENJI Editorial",
  productSlug,
  productName,
  badge,
  priority = false
}) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [activeView, setActiveView] = useState<LookbookViewType>(initialView);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Available image dictionary
  const imageMap: Partial<Record<LookbookViewType, string>> = {
    FRONT: frontSrc || (activeView === "FRONT" ? src : undefined),
    BACK: backSrc,
    "ON MODEL": modelSrc,
    DETAIL: detailSrc
  };

  // If activeView doesn't match an explicit slot, use the default src
  const currentSrc = imageMap[activeView] || src;

  // Build the list of available view tabs
  const availableViews: LookbookViewType[] = [];
  if (frontSrc || src) availableViews.push("FRONT");
  if (backSrc) availableViews.push("BACK");
  if (modelSrc) availableViews.push("ON MODEL");
  if (detailSrc) availableViews.push("DETAIL");

  // Deduplicate views
  const uniqueViews = Array.from(new Set(availableViews));

  const handleContainerClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("button") || target.closest("a")) {
      return;
    }
    if (productSlug) {
      router.push(`/product/${productSlug}`);
    }
  };

  return (
    <div
      onClick={handleContainerClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setActiveView(initialView);
      }}
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        lineHeight: 0,
        backgroundColor: "#0d0d0d",
        cursor: productSlug ? "pointer" : "default",
        borderRadius: "2px"
      }}
    >
      {/* Loading Skeleton */}
      {!isLoaded && !hasError && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "#161616",
            backgroundImage: "linear-gradient(90deg, #161616 0%, #222222 50%, #161616 100%)",
            backgroundSize: "200% 100%",
            animation: "skeletonShimmer 1.8s infinite ease-in-out",
            zIndex: 1,
            minHeight: "260px"
          }}
        />
      )}

      {/* Badge (always visible, top left) */}
      {badge && (
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            zIndex: 5,
            padding: "3px 8px",
            backgroundColor: badge === "SALE" ? "var(--color-crimson)" : "rgba(0,0,0,0.8)",
            border: badge === "SALE" ? "none" : "1px solid rgba(255,255,255,0.25)",
            borderRadius: "2px",
            fontSize: "8px",
            fontFamily: "var(--font-ui)",
            fontWeight: 700,
            letterSpacing: "2px",
            color: "var(--color-white)",
            textTransform: "uppercase",
            backdropFilter: "blur(4px)",
            pointerEvents: "none"
          }}
        >
          {badge}
        </div>
      )}

      {/* Full natural-size responsive image — never cropped */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={hasError ? src : currentSrc}
        alt={altText || productName || "ZENJI Lookbook"}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setHasError(true);
          setIsLoaded(true);
        }}
        style={{
          display: "block",
          width: "100%",
          height: "auto",
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 0.4s ease, transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          transform: isHovered ? "scale(1.03)" : "scale(1)"
        }}
      />

      {/* Bottom gradient on hover */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.92) 100%)",
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.3s ease",
          pointerEvents: "none",
          zIndex: 4
        }}
      />

      {/* View toggle tabs — top right (on hover) */}
      {isHovered && uniqueViews.length > 1 && (
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            display: "flex",
            gap: "3px",
            zIndex: 6
          }}
        >
          {uniqueViews.map((v) => (
            <button
              key={v}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveView(v);
              }}
              style={{
                padding: "3px 8px",
                fontSize: "8px",
                fontFamily: "var(--font-ui)",
                fontWeight: 700,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                border: activeView === v ? "1px solid var(--color-crimson)" : "1px solid rgba(255,255,255,0.45)",
                borderRadius: "2px",
                cursor: "pointer",
                backgroundColor: activeView === v ? "var(--color-crimson)" : "rgba(0,0,0,0.65)",
                color: "var(--color-white)",
                backdropFilter: "blur(6px)",
                transition: "all 0.15s ease",
                whiteSpace: "nowrap"
              }}
            >
              {v}
            </button>
          ))}
        </div>
      )}

      {/* VIEW PRODUCT CTA — bottom overlay (on hover) */}
      {productSlug && isHovered && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "12px 14px",
            zIndex: 6,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "8px"
          }}
        >
          {productName && (
            <span
              className="font-meta"
              style={{
                fontSize: "9px",
                fontWeight: 700,
                letterSpacing: "1.5px",
                color: "rgba(255,255,255,0.85)",
                textTransform: "uppercase",
                lineHeight: 1.3,
                textShadow: "0 1px 3px rgba(0,0,0,0.9)"
              }}
            >
              {productName}
            </span>
          )}
          <Link
            href={`/product/${productSlug}`}
            onClick={(e) => e.stopPropagation()}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
              backgroundColor: "var(--color-crimson)",
              color: "var(--color-white)",
              fontFamily: "var(--font-ui)",
              fontSize: "8px",
              fontWeight: 700,
              letterSpacing: "1.5px",
              padding: "6px 12px",
              borderRadius: "2px",
              textDecoration: "none",
              textTransform: "uppercase",
              flexShrink: 0,
              boxShadow: "0 2px 8px rgba(227,38,26,0.4)",
              transition: "transform 0.15s ease, opacity 0.2s"
            }}
          >
            VIEW PRODUCT <ArrowRight size={9} />
          </Link>
        </div>
      )}
    </div>
  );
};
