"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useUIStore } from "@/store/ui-store";
import { MOCK_PRODUCTS } from "@/data/products";
import { Product } from "@/types/product";
import { Search, X, ArrowRight, Tag } from "lucide-react";

export const SearchModal: React.FC = () => {
  const { isSearchOpen, closeSearch } = useUIStore();
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setQuery("");
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSearchOpen) {
        closeSearch();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isSearchOpen, closeSearch]);

  if (!isSearchOpen) return null;

  const categories = ["ALL", "HOODIE", "T-SHIRT", "ACCESSORY"];

  const filteredProducts = MOCK_PRODUCTS.filter((product: Product) => {
    const matchesCategory =
      selectedCategory === "ALL" ||
      product.category.toUpperCase() === selectedCategory;

    const matchesQuery =
      query.trim() === "" ||
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase());

    return matchesCategory && matchesQuery;
  });

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: "var(--z-modal)",
        backgroundColor: "rgba(7, 7, 7, 0.85)",
        backdropFilter: "blur(12px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "clamp(16px, 4vw, 48px) var(--space-4)"
      }}
      onClick={closeSearch}
    >
      <div
        className="hud-border"
        style={{
          width: "100%",
          maxWidth: "760px",
          backgroundColor: "#0d0d0d",
          borderRadius: "6px",
          overflow: "hidden",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.9)",
          border: "1px solid var(--color-border-strong)",
          display: "flex",
          flexDirection: "column",
          maxHeight: "85vh"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "var(--space-4) var(--space-6)",
            borderBottom: "1px solid var(--color-border-subtle)",
            gap: "var(--space-3)"
          }}
        >
          <Search size={22} style={{ color: "var(--color-crimson)", flexShrink: 0 }} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search hoodies, graphic tees, accessories..."
            aria-label="Search catalog"
            style={{
              flex: 1,
              backgroundColor: "transparent",
              color: "var(--color-white)",
              fontSize: "clamp(16px, 2vw, 18px)",
              fontFamily: "var(--font-ui)",
              border: "none",
              outline: "none"
            }}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              style={{
                color: "var(--color-mist)",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "4px"
              }}
            >
              CLEAR
            </button>
          )}
          <button
            onClick={closeSearch}
            aria-label="Close search"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              border: "1px solid var(--color-border-subtle)",
              borderRadius: "4px",
              color: "var(--color-white)",
              padding: "6px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Category Filter Pills */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-2)",
            padding: "var(--space-3) var(--space-6)",
            backgroundColor: "rgba(255, 255, 255, 0.02)",
            borderBottom: "1px solid var(--color-border-subtle)",
            overflowX: "auto"
          }}
        >
          <span className="font-meta" style={{ fontSize: "11px", color: "var(--color-mist)", marginRight: "8px" }}>
            CATEGORY:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="font-ui"
              style={{
                padding: "4px 12px",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "1px",
                borderRadius: "3px",
                border: "none",
                cursor: "pointer",
                backgroundColor:
                  selectedCategory === cat ? "var(--color-crimson)" : "rgba(255, 255, 255, 0.06)",
                color: selectedCategory === cat ? "var(--color-white)" : "var(--color-mist)",
                transition: "all 0.15s ease"
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div
          style={{
            padding: "var(--space-4) var(--space-6)",
            overflowY: "auto",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-3)"
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
            <span className="font-meta" style={{ fontSize: "11px", color: "var(--color-mist)", letterSpacing: "1px" }}>
              RESULTS ({filteredProducts.length})
            </span>
            <span className="font-meta" style={{ fontSize: "11px", color: "var(--color-mist)" }}>
              PRESS ESC TO CLOSE
            </span>
          </div>

          {filteredProducts.length === 0 ? (
            <div
              style={{
                padding: "var(--space-12) var(--space-4)",
                textAlign: "center",
                color: "var(--color-mist)"
              }}
            >
              <p className="font-display" style={{ fontSize: "18px", color: "var(--color-white)", marginBottom: "6px" }}>
                NO PRODUCTS FOUND
              </p>
              <p className="font-body" style={{ fontSize: "13px" }}>
                Try searching for &quot;hoodie&quot;, &quot;cyber&quot;, or &quot;tee&quot;.
              </p>
            </div>
          ) : (
            filteredProducts.map((prod) => (
              <Link
                key={prod.id}
                href={`/product/${prod.slug}`}
                onClick={closeSearch}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "var(--space-3)",
                  backgroundColor: "rgba(255, 255, 255, 0.03)",
                  borderRadius: "4px",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  transition: "background-color 0.15s, border-color 0.15s",
                  textDecoration: "none"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
                  <div
                    style={{
                      position: "relative",
                      width: "56px",
                      height: "56px",
                      borderRadius: "4px",
                      overflow: "hidden",
                      backgroundColor: "#1a1a1a",
                      flexShrink: 0
                    }}
                  >
                    <Image
                      src={prod.images[0]}
                      alt={prod.name}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div>
                    <h4 className="font-ui" style={{ fontSize: "14px", fontWeight: "bold", color: "var(--color-white)" }}>
                      {prod.name}
                    </h4>
                    <p className="font-meta" style={{ fontSize: "11px", color: "var(--color-mist)", marginTop: "2px" }}>
                      {prod.category.toUpperCase()} • {prod.colors.length} COLORS
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
                  <span className="font-meta" style={{ fontSize: "14px", fontWeight: "bold", color: "var(--color-white)" }}>
                    ${prod.price.toFixed(2)}
                  </span>
                  <ArrowRight size={16} style={{ color: "var(--color-crimson)" }} />
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
