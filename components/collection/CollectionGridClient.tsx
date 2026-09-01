"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Container } from "@/components/common/Container";
import { ProductCard } from "@/components/common/ProductCard";
import { Product } from "@/types/product";
import { SlidersHorizontal, ChevronDown } from "lucide-react";

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

  return (
    <div style={{ backgroundColor: "var(--color-void)", color: "var(--color-white)", minHeight: "100vh" }}>
      {/* 1. HEADER BANNER */}
      <section
        style={{
  position: "relative",
  width: "100%",
  aspectRatio: "1227 / 339",
  backgroundColor: "var(--color-void)",
  backgroundImage: "url('/Collection_background.png')",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center calc(50% + clamp(20px, 7.9vw, 120px))",
  display: "flex",
  alignItems: "center",
}}
      >
        {/* <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to right, rgba(7, 7, 7, 0.95) 0%, rgba(7, 7, 7, 0.6) 60%, rgba(7, 7, 7, 0.2) 100%)"
          }}
        /> */}

        <Container size="2xl" style={{ position: "relative", zIndex: 2 }}>
          <h1
            className="font-display"
            style={{
              fontSize: "clamp(36px, 6vw, 64px)",
              fontWeight: 900,
              letterSpacing: "2px",
              lineHeight: 1
            }}
          >
            COLLECTION
          </h1>
          <p
            className="font-meta"
            style={{
              fontSize: "var(--font-size-md)",
              color: "var(--color-mist)",
              marginTop: "var(--space-2)",
              letterSpacing: "4px"
            }}
          >
            コレクション
          </p>
        </Container>
      </section>

      <Container size="2xl" style={{ paddingTop: "var(--space-8)", paddingBottom: "var(--space-16)" }}>
        {/* 2. CATEGORY FILTER TABS */}
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

        {/* 3. FILTER & SORT BAR */}
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

        {/* 4. PRODUCT GRID (4 columns desktop, 2 columns mobile) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "var(--space-6)",
            marginBottom: "var(--space-12)"
          }}
        >
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* 5. PAGINATION */}
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
      </Container>
    </div>
  );
};
