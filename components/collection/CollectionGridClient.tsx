"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { ProductCard } from "@/components/common/ProductCard";
import { Product } from "@/types/product";
import { SlidersHorizontal, ChevronDown, ChevronRight } from "lucide-react";

export interface CollectionGridClientProps {
  products: Product[];
}

export const CollectionGridClient: React.FC<CollectionGridClientProps> = ({ products }) => {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [sortBy, setSortBy] = useState<string>("NEWEST");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const categories = ["ALL", "NEW ARRIVALS", "LIMITED", "T-SHIRT", "HOODIES", "ACCESSORIES"];

  // Filter products based on selected tab
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (activeCategory === "ALL") return true;
      if (activeCategory === "NEW ARRIVALS") return product.badges?.includes("NEW");
      if (activeCategory === "LIMITED") return product.badges?.includes("LIMITED");
      if (activeCategory === "T-SHIRT") return product.category === "Tops";
      if (activeCategory === "HOODIES") return product.category === "Outerwear";
      if (activeCategory === "ACCESSORIES") return product.category === "Accessories";
      return true;
    });
  }, [products, activeCategory]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const items = [...filteredProducts];
    if (sortBy === "PRICE: LOW TO HIGH") {
      items.sort((a, b) => a.price - b.price);
    } else if (sortBy === "PRICE: HIGH TO LOW") {
      items.sort((a, b) => b.price - a.price);
    }
    return items;
  }, [filteredProducts, sortBy]);

  const scrollToCatalog = () => {
    const element = document.getElementById("collection-catalog");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div style={{ backgroundColor: "var(--color-void)", color: "var(--color-white)", minHeight: "100vh" }}>
      {/* ── 1. HERO BANNER (Exact Match to Reference Image) ──────────── */}
      <section
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "1672 / 941",
          minHeight: "clamp(340px, 56.28vw, 940px)",
          backgroundColor: "#070707",
          overflow: "hidden",
          display: "flex",
          alignItems: "flex-end"
        }}
      >
        {/* Full-width, uncropped background image */}
        <Image
          src="/Collection_background.png"
          alt="T-Shirt Collection"
          fill
          priority
          unoptimized
          style={{
            objectFit: "cover",
            objectPosition: "center center",
            width: "100%",
            height: "100%"
          }}
          sizes="100vw"
        />

        {/* Subtle atmospheric vignette to preserve the exact contrast behind lower-left text */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top right, rgba(0, 0, 0, 0.82) 0%, rgba(0, 0, 0, 0.5) 30%, rgba(0, 0, 0, 0.15) 55%, transparent 75%)",
            pointerEvents: "none"
          }}
        />

        {/* Lower-left Content matching Reference Image */}
        <div
          style={{
            position: "relative",
            zIndex: 3,
            width: "100%",
            paddingBottom: "clamp(24px, 5vw, 64px)",
            paddingLeft: "clamp(20px, 4vw, 56px)",
            paddingRight: "clamp(20px, 4vw, 56px)"
          }}
        >
          <div style={{ maxWidth: "560px" }}>
            {/* Main Heading: T-SHIRT COLLECTION */}
            <h1
              className="font-display"
              style={{
                fontSize: "clamp(34px, 5.2vw, 76px)",
                fontWeight: 900,
                lineHeight: 0.95,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: "var(--color-white)",
                marginBottom: "clamp(12px, 1.4vw, 18px)",
                textShadow: "0 4px 28px rgba(0,0,0,0.95), 0 2px 10px rgba(0,0,0,0.85)"
              }}
            >
              T-SHIRT<br />COLLECTION
            </h1>

            {/* Subtitle */}
            <p
              className="font-body"
              style={{
                fontSize: "clamp(13px, 1.25vw, 16px)",
                color: "rgba(255, 255, 255, 0.88)",
                lineHeight: 1.45,
                marginBottom: "clamp(16px, 2vw, 24px)",
                maxWidth: "420px",
                textShadow: "0 2px 12px rgba(0,0,0,0.9)"
              }}
            >
              Anime inspired. Streetwear redefined.<br />Find your next obsession.
            </p>

            {/* CTA Button: Outlined box with chevron */}
            <div>
              <button
                type="button"
                onClick={scrollToCatalog}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "clamp(9px, 1vw, 13px) clamp(16px, 1.8vw, 24px)",
                  backgroundColor: "rgba(237, 16, 16, 0.97)",
                  border: "1px solid rgba(237, 16, 16, 0.97)",
                  color: "var(--color-white)",
                  fontFamily: "var(--font-ui)",
                  fontSize: "clamp(10px, 0.9vw, 12px)",
                  fontWeight: 700,
                  marginBottom: "clamp(260px, 2vw, 24px)",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "all 0.25s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(5, 5, 5, 0.97)";
                  e.currentTarget.style.borderColor = "rgba(237, 16, 16, 0.97)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(237, 16, 16, 0.97)";
                  e.currentTarget.style.borderColor = "rgba(237, 16, 16, 0.97)";
                }}
              >
                SHOP COLLECTION <ChevronRight size={13} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. CATALOG & FILTER SECTION ─────────────────────────────── */}
      <div
        id="collection-catalog"
        style={{
          width: "100%",
          paddingTop: "var(--space-8)",
          paddingBottom: "var(--space-16)",
          paddingLeft: "clamp(16px, 4vw, 64px)",
          paddingRight: "clamp(16px, 4vw, 64px)",
          boxSizing: "border-box"
        }}
      >
        {/* Category Filter Tabs */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "var(--space-3)",
            marginBottom: "var(--space-8)"
          }}
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setCurrentPage(1);
                }}
                className="font-ui"
                style={{
                  backgroundColor: isActive ? "var(--color-crimson)" : "rgba(255, 255, 255, 0.05)",
                  color: "var(--color-white)",
                  border: isActive ? "1px solid var(--color-crimson)" : "1px solid var(--color-border-subtle)",
                  borderRadius: "2px",
                  padding: "var(--space-2) var(--space-4)",
                  fontSize: "12px",
                  fontWeight: "bold",
                  letterSpacing: "1px",
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Filter & Sort Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "var(--space-8)",
            paddingBottom: "var(--space-4)",
            borderBottom: "1px solid var(--color-border-subtle)"
          }}
        >
          <button
            type="button"
            className="font-ui"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "var(--space-2)",
              backgroundColor: "transparent",
              border: "1px solid var(--color-border-strong)",
              color: "var(--color-white)",
              padding: "var(--space-2) var(--space-4)",
              fontSize: "12px",
              fontWeight: "bold",
              letterSpacing: "1px",
              cursor: "pointer"
            }}
          >
            <SlidersHorizontal size={14} /> FILTER
          </button>

          <div style={{ position: "relative", display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
            <span className="font-ui" style={{ fontSize: "12px", color: "var(--color-mist)", fontWeight: "bold" }}>
              SORT BY:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="font-ui"
              style={{
                backgroundColor: "var(--color-ink)",
                border: "1px solid var(--color-border-subtle)",
                color: "var(--color-white)",
                padding: "var(--space-2) var(--space-6) var(--space-2) var(--space-3)",
                fontSize: "12px",
                fontWeight: "bold",
                cursor: "pointer",
                appearance: "none"
              }}
            >
              <option value="NEWEST">NEWEST</option>
              <option value="PRICE: LOW TO HIGH">PRICE: LOW TO HIGH</option>
              <option value="PRICE: HIGH TO LOW">PRICE: HIGH TO LOW</option>
            </select>
            <ChevronDown size={14} style={{ position: "absolute", right: "8px", pointerEvents: "none" }} />
          </div>
        </div>

        {/* Product Grid */}
        <div
          className="collection-product-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "var(--space-6)",
            marginBottom: "var(--space-12)"
          }}
        >
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <style>{`
          @media (max-width: 1024px) {
            .collection-product-grid { grid-template-columns: repeat(3, 1fr) !important; }
          }
          @media (max-width: 768px) {
            .collection-product-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
          @media (max-width: 480px) {
            .collection-product-grid { grid-template-columns: repeat(1, 1fr) !important; }
          }
        `}</style>

        {/* Pagination */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "var(--space-3)",
            fontSize: "13px",
            fontFamily: "var(--font-meta)"
          }}
        >
          <span
            style={{
              backgroundColor: "var(--color-crimson)",
              color: "var(--color-white)",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              borderRadius: "2px"
            }}
          >
            1
          </span>
          <span style={{ color: "var(--color-mist)", cursor: "pointer" }}>2</span>
          <span style={{ color: "var(--color-mist)", cursor: "pointer" }}>3</span>
          <span style={{ color: "var(--color-text-muted)" }}>...</span>
          <span style={{ color: "var(--color-mist)", cursor: "pointer" }}>10</span>
          <span style={{ color: "var(--color-white)", cursor: "pointer" }}>&gt;</span>
        </div>
      </div>
    </div>
  );
};
