"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X, ArrowRight } from "lucide-react";
import { MOCK_PRODUCTS } from "@/data/products";
import { Product } from "@/types/product";
import { useUIStore } from "@/store/ui-store";

export const NavbarSearch: React.FC = () => {
  const { isSearchOpen, openSearch, closeSearch, toggleSearch } = useUIStore();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setQuery("");
    }
  }, [isSearchOpen]);

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node) &&
        isSearchOpen
      ) {
        closeSearch();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSearchOpen) {
        closeSearch();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSearchOpen, closeSearch]);

  const filteredProducts = query.trim()
    ? MOCK_PRODUCTS.filter((product: Product) => {
        const q = query.toLowerCase();
        return (
          product.name.toLowerCase().includes(q) ||
          product.description.toLowerCase().includes(q) ||
          product.category.toLowerCase().includes(q)
        );
      }).slice(0, 6)
    : [];

  return (
    <div ref={containerRef} style={{ position: "relative", display: "flex", alignItems: "center" }}>
      {/* Search Toggle / Expanding Input Bar */}
      {!isSearchOpen ? (
        <button
          type="button"
          aria-label="Open search bar"
          onClick={openSearch}
          style={{
            background: "none",
            border: "none",
            color: "var(--color-mist)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "8px",
            borderRadius: "4px",
            transition: "color 0.2s"
          }}
        >
          <Search size={18} />
        </button>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "rgba(20, 20, 20, 0.95)",
            border: "1px solid var(--color-crimson)",
            borderRadius: "4px",
            padding: "4px 8px 4px 12px",
            gap: "8px",
            width: "clamp(220px, 30vw, 360px)",
            transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.6)"
          }}
        >
          <Search size={16} style={{ color: "var(--color-crimson)", flexShrink: 0 }} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search catalog..."
            aria-label="Search products"
            style={{
              flex: 1,
              backgroundColor: "transparent",
              border: "none",
              outline: "none",
              color: "var(--color-white)",
              fontSize: "13px",
              fontFamily: "var(--font-ui)",
              width: "100%"
            }}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              style={{
                background: "none",
                border: "none",
                color: "var(--color-mist)",
                fontSize: "10px",
                fontFamily: "var(--font-meta)",
                cursor: "pointer",
                padding: "2px"
              }}
            >
              CLEAR
            </button>
          )}
          <button
            type="button"
            aria-label="Close search bar"
            onClick={closeSearch}
            style={{
              background: "none",
              border: "none",
              color: "var(--color-mist)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "2px"
            }}
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Instant Dropdown Results Popover attached under Navbar */}
      {isSearchOpen && query.trim().length > 0 && (
        <div
          className="hud-border"
          style={{
            position: "absolute",
            top: "calc(100% + 12px)",
            right: 0,
            width: "clamp(300px, 40vw, 440px)",
            backgroundColor: "#0f0f0f",
            border: "1px solid var(--color-border-strong)",
            borderRadius: "4px",
            boxShadow: "0 12px 35px rgba(0, 0, 0, 0.9)",
            padding: "var(--space-3)",
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-2)",
            zIndex: 300,
            maxHeight: "380px",
            overflowY: "auto"
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "4px 6px" }}>
            <span className="font-meta" style={{ fontSize: "10px", color: "var(--color-mist)", letterSpacing: "1px" }}>
              MATCHES ({filteredProducts.length})
            </span>
            <span className="font-meta" style={{ fontSize: "10px", color: "var(--color-mist)" }}>
              PRESS ESC TO CLOSE
            </span>
          </div>

          {filteredProducts.length === 0 ? (
            <div style={{ padding: "var(--space-6) var(--space-3)", textAlign: "center", color: "var(--color-mist)" }}>
              <p className="font-ui" style={{ fontSize: "13px", color: "var(--color-white)", fontWeight: "bold" }}>
                No products found for &quot;{query}&quot;
              </p>
              <p className="font-meta" style={{ fontSize: "11px", marginTop: "4px" }}>
                Try searching &quot;hoodie&quot;, &quot;cyber&quot;, or &quot;tee&quot;
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
                  padding: "8px",
                  backgroundColor: "rgba(255, 255, 255, 0.03)",
                  borderRadius: "3px",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  textDecoration: "none",
                  transition: "background-color 0.15s ease"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div
                    style={{
                      position: "relative",
                      width: "42px",
                      height: "48px",
                      borderRadius: "2px",
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
                    <h5 className="font-ui" style={{ fontSize: "12px", fontWeight: "bold", color: "var(--color-white)" }}>
                      {prod.name}
                    </h5>
                    <p className="font-meta" style={{ fontSize: "10px", color: "var(--color-mist)", marginTop: "2px" }}>
                      {prod.category.toUpperCase()}
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span className="font-meta" style={{ fontSize: "12px", fontWeight: "bold", color: "var(--color-white)" }}>
                    ${prod.price.toFixed(2)}
                  </span>
                  <ArrowRight size={13} style={{ color: "var(--color-crimson)" }} />
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
};
