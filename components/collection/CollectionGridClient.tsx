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
      {/* ── 1. HERO BANNER ─────────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          width: "100%",
          height: "120vh",
          backgroundColor: "#070707",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between"
        }}
      >
        {/* Background Image Container — 80% height with gradient fade at bottom */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            overflow: "hidden"
          }}
        >
          <Image
            src="/Collection_background.png"
            alt="Collection"
            fill
            priority
            unoptimized
            style={{
              objectFit: "cover",
              objectPosition: "center center"
            }}
            sizes="100vw"
          />
          {/* Gradient fade at bottom of image to blend into dark background */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: "35%",
              background: "linear-gradient(to bottom, transparent 0%, #070707 100%)",
              pointerEvents: "none"
            }}
          />
        </div>







        {/* ── 2 & 3. MAIN TEXT BLOCK (Anton Display Font Overlaying on the Model) ── */}
        <div
          style={{
            position: "relative",
            zIndex: 3,
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingLeft: "clamp(20px, 4.5vw, 64px)",
            paddingTop: "clamp(18px, 2.5vw, 36px)"
          }}
        >
          {/* Supertitle tag */}
          <p
            className="font-ui"
            style={{
              fontSize: "clamp(20.5px, 0.75vw, 11px)",
              fontWeight: 800,
              letterSpacing: "2.2px",
              textTransform: "uppercase",
              color: "#c81010",
              marginBottom: "clamp(4px, 0.5vw, 8px)",
              lineHeight: 1.3
            }}
          >
            LIMITED QUANTITIES.<br />TIMELESS LEGENDS.
          </p>

          {/* 2. COLLECTION Headline — Rusty Weathered Editorial Typography */}
          <h1
            style={{
              fontFamily: "var(--font-anton)",
              fontSize: "clamp(56px, 8.8vw, 136px)",
              fontWeight: 400,
              lineHeight: 0.85,
              letterSpacing: "0.000001em",
              textTransform: "uppercase",
              display: "inline-block",
              transform: "scaleX(0.72)",
              transformOrigin: "left center",
              marginBottom: "clamp(10px, 1.2vw, 16px)",
              whiteSpace: "nowrap",
              backgroundImage: "url('/rusty_white_surface.jpg')",
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
              filter: "contrast(1.2) brightness(1.1) drop-shadow(0 2px 10px rgba(0, 0, 0, 0.85)) drop-shadow(0 1px 2px rgba(0, 0, 0, 0.95))"
            }}
          >
            COLLECTION
          </h1>

          {/* 3. Subtitle paragraph */}
          <p
            className="font-ui"
            style={{
              fontSize: "clamp(10.99px, 0.75vw, 11px)",
              color: "rgba(255, 255, 255, 0.9)",
              lineHeight: 1.5,
              marginBottom: "clamp(12px, 1.4vw, 18px)",
              maxWidth: "280px",
              textShadow: "0 2px 10px rgba(0,0,0,0.9)",
              textTransform: "uppercase",
              letterSpacing: "0.8px",
              fontWeight: 600
            }}
          >
            Anime inspired. Streetwear redefined.<br />
            Find your next{" "}
            <span style={{ color: "#c81010", fontWeight: 800 }}>OBSESSION.</span>
          </p>

          {/* 4. CTA Button */}
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
                marginBottom: "clamp(12px, 2vw, 24px)",
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

        {/* ── 5. BACKGROUND WATERMARK (Low Opacity Vertical Japanese Text) ── */}
        <div
          style={{
            position: "absolute",
            bottom: "clamp(48px, 6.5vw, 70px)",
            left: "clamp(20px, 4.5vw, 62px)",
            zIndex: 2,
            userSelect: "none",
            pointerEvents: "none"
          }}
        >
          <div
            style={{
              fontSize: "clamp(24px, 4vw, 54px)",
              fontWeight: 900,
              color: "rgba(255, 255, 255, 0.055)",
              lineHeight: 1.1,
              fontFamily: "serif",
              letterSpacing: "2px"
            }}
          >
            新しい<br />伝説
          </div>
          <div
            style={{
              fontSize: "clamp(9px, 1.2vw, 15px)",
              fontWeight: 800,
              letterSpacing: "4px",
              color: "rgba(255, 255, 255, 0.05)",
              fontFamily: "var(--font-display)",
              marginTop: "2px"
            }}
          >
            ZENJI
          </div>
        </div>

        {/* ── 6. BARCODE GRAPHIC (Bottom-Right corner) ── */}
        <div
          style={{
            position: "absolute",
            bottom: "clamp(48px, 6vw, 66px)",
            right: "clamp(20px, 4.5vw, 62px)",
            zIndex: 2,
            display: "flex",
            alignItems: "flex-end",
            gap: "10px",
            userSelect: "none",
            pointerEvents: "none"
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "2px" }}>
            <div style={{ display: "flex", gap: "2px", alignItems: "flex-end", height: "13px" }}>
              {[3, 1, 4, 1, 5, 2, 6, 2, 1, 4, 2, 5, 1, 3, 2, 1, 4].map((w, i) => (
                <div key={i} style={{ width: `${w}px`, height: "100%", backgroundColor: "rgba(214, 32, 32, 0.8)" }} />
              ))}
            </div>
            <span
              style={{
                fontFamily: "var(--font-meta)",
                fontSize: "7px",
                letterSpacing: "1.5px",
                color: "rgba(214, 32, 32, 0.6)"
              }}
            >
              ZENJI-HUD-001
            </span>
          </div>
        </div>


      </section>

      {/* ── 2. CATALOG & FILTER SECTION ─────────────────────────────── */}
      <div
        id="collection-catalog"
        style={{
          width: "100%",
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
