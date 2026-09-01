"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/common/Container";
import { Modal } from "@/components/common/Modal";
import { Accordion } from "@/components/common/Accordion";
import { Product, Color, Size } from "@/types/product";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { Star, ShieldCheck, RotateCcw, Truck, ShoppingBag, Heart, Minus, Plus } from "lucide-react";

export interface ProductDetailClientProps {
  product: Product;
}

export const ProductDetailClient: React.FC<ProductDetailClientProps> = ({ product }) => {
  // Interactive state
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [selectedColor, setSelectedColor] = useState<Color>(product.colors[0] || { name: "BLACK", hex: "#070707" });
  const [selectedSize, setSelectedSize] = useState<Size>(product.sizes.includes("M") ? "M" : product.sizes[0] || "M");
  const [quantity, setQuantity] = useState<number>(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState<boolean>(false);

  const addItem = useCartStore((state) => state.addItem);
  const { productIds, toggleWishlist } = useWishlistStore();
  const isWishlisted = productIds.includes(product.id);

  const images = product.images.length > 0 ? product.images : ["https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80"];
  // Mock thumbnails to ensure 4 gallery items as shown in design reference
  const galleryThumbnails = [
    images[0],
    images[1] || images[0],
    images[2] || images[0],
    images[3] || images[0]
  ];

  const handleAddToCart = () => {
    addItem(product, selectedColor, selectedSize, quantity);
  };

  const accordionItems = [
    {
      id: "desc",
      title: "DESCRIPTION",
      content: (
        <div style={{ color: "var(--color-mist)", fontSize: "14px", lineHeight: 1.6 }}>
          <p style={{ marginBottom: "var(--space-4)" }}>{product.description}</p>
          <ul style={{ paddingLeft: "var(--space-4)", display: "flex", flexDirection: "column", gap: "6px" }}>
            <li>• {product.material || "100% Premium Cotton"}</li>
            <li>• Heavyweight {product.gsm || 380} GSM</li>
            <li>• {product.fit || "Oversized Fit"}</li>
            <li>• High-Quality Print</li>
            <li>• Ribbed Cuffs & Hem</li>
          </ul>
        </div>
      )
    },
    {
      id: "size-fit",
      title: "SIZE & FIT",
      content: (
        <p style={{ color: "var(--color-mist)", fontSize: "14px" }}>
          Designed for a modern streetwear oversized fit. Order your true size for intended relaxed silhouette, or size down for a standard fit.
        </p>
      )
    },
    {
      id: "shipping-returns",
      title: "SHIPPING & RETURNS",
      content: (
        <p style={{ color: "var(--color-mist)", fontSize: "14px" }}>
          Free worldwide shipping on orders over $150. Returns accepted within 14 days of delivery in original unworn condition.
        </p>
      )
    },
    {
      id: "material-care",
      title: "MATERIAL & CARE",
      content: (
        <p style={{ color: "var(--color-mist)", fontSize: "14px" }}>
          {product.careInstructions || "Machine wash cold inside out with like colors. Hang dry to preserve print vibrancy."}
        </p>
      )
    }
  ];

  return (
    <div style={{ backgroundColor: "var(--color-void)", color: "var(--color-white)", minHeight: "100vh", paddingTop: "var(--space-6)", paddingBottom: "var(--space-16)" }}>
      <Container size="2xl">
        {/* 1. BREADCRUMBS */}
        <div
          className="font-ui"
          style={{
            fontSize: "12px",
            color: "var(--color-mist)",
            marginBottom: "var(--space-6)",
            display: "flex",
            alignItems: "center",
            gap: "var(--space-2)"
          }}
        >
          <Link href="/" style={{ color: "var(--color-mist)", textDecoration: "none" }}>Home</Link>
          <span>&gt;</span>
          <Link href="/collection" style={{ color: "var(--color-mist)", textDecoration: "none" }}>Collection</Link>
          <span>&gt;</span>
          <span style={{ color: "var(--color-mist)" }}>{product.category}</span>
          <span>&gt;</span>
          <span style={{ color: "var(--color-white)" }}>{product.name}</span>
        </div>

        {/* 2. PDP MAIN GRID (Gallery Left, Purchase Panel Right) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "var(--space-12)",
            marginBottom: "var(--space-16)"
          }}
        >
          {/* LEFT: GALLERY */}
          <div style={{ display: "flex", gap: "var(--space-4)" }}>
            {/* Vertical Thumbnails */}
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
              {galleryThumbnails.map((thumb, idx) => {
                const isActive = selectedImageIndex === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    style={{
                      width: "60px",
                      height: "75px",
                      position: "relative",
                      backgroundColor: "#161616",
                      border: isActive ? "2px solid var(--color-crimson)" : "1px solid var(--color-border-subtle)",
                      borderRadius: "2px",
                      overflow: "hidden",
                      cursor: "pointer",
                      padding: 0
                    }}
                  >
                    <Image
                      src={thumb}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      style={{ objectFit: "cover", objectPosition: "center top" }}
                    />
                  </button>
                );
              })}
            </div>

            {/* Main Image Display Box */}
            <div
              style={{
                flex: 1,
                position: "relative",
                aspectRatio: "4 / 5",
                backgroundColor: "#161616",
                borderRadius: "4px",
                overflow: "hidden",
                border: "1px solid var(--color-border-subtle)"
              }}
            >
              <Image
                src={galleryThumbnails[selectedImageIndex] || galleryThumbnails[0]}
                alt={product.name}
                fill
                priority
                style={{ objectFit: "cover", objectPosition: "center top" }}
              />
            </div>
          </div>

          {/* RIGHT: PURCHASE PANEL */}
          <div>
            <h1
              className="font-display"
              style={{
                fontSize: "clamp(28px, 4vw, 40px)",
                fontWeight: 900,
                letterSpacing: "1px",
                marginBottom: "var(--space-2)"
              }}
            >
              {product.name.toUpperCase()}
            </h1>

            {/* Price */}
            <div style={{ fontSize: "24px", fontWeight: "bold", fontFamily: "var(--font-meta)", marginBottom: "var(--space-4)" }}>
              ${product.price.toFixed(2)}
            </div>

            {/* Rating Stars */}
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", marginBottom: "var(--space-6)" }}>
              <div style={{ display: "flex", color: "#FFC107" }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#FFC107" />
                ))}
              </div>
              <span className="font-meta" style={{ fontSize: "13px", color: "var(--color-mist)" }}>
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Short Description */}
            <p className="font-body" style={{ color: "var(--color-mist)", fontSize: "14px", lineHeight: 1.5, marginBottom: "var(--space-6)" }}>
              {product.description}
            </p>

            {/* COLOR SELECTOR */}
            <div style={{ marginBottom: "var(--space-6)" }}>
              <label className="font-ui" style={{ fontSize: "12px", fontWeight: "bold", color: "var(--color-white)", letterSpacing: "1px", display: "block", marginBottom: "var(--space-3)" }}>
                COLOR: {selectedColor.name}
              </label>
              <div style={{ display: "flex", gap: "var(--space-3)" }}>
                {product.colors.map((color) => {
                  const isSelected = selectedColor.name === color.name;
                  return (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      aria-label={`Select color ${color.name}`}
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "50%",
                        backgroundColor: color.hex,
                        border: isSelected ? "2px solid var(--color-crimson)" : "1px solid var(--color-border-strong)",
                        boxShadow: isSelected ? "0 0 0 2px #070707" : "none",
                        cursor: "pointer"
                      }}
                    />
                  );
                })}
              </div>
            </div>

            {/* SIZE SELECTOR */}
            <div style={{ marginBottom: "var(--space-6)" }}>
              <label className="font-ui" style={{ fontSize: "12px", fontWeight: "bold", color: "var(--color-white)", letterSpacing: "1px", display: "block", marginBottom: "var(--space-3)" }}>
                SIZE:
              </label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)", marginBottom: "var(--space-3)" }}>
                {product.sizes.map((sz) => {
                  const isSelected = selectedSize === sz;
                  return (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className="font-ui"
                      style={{
                        minWidth: "44px",
                        height: "38px",
                        padding: "0 12px",
                        backgroundColor: isSelected ? "rgba(227, 38, 26, 0.15)" : "transparent",
                        border: isSelected ? "1px solid var(--color-crimson)" : "1px solid var(--color-border-subtle)",
                        color: isSelected ? "var(--color-crimson)" : "var(--color-white)",
                        fontSize: "12px",
                        fontWeight: "bold",
                        cursor: "pointer",
                        borderRadius: "2px"
                      }}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
              <button
                type="button"
                onClick={() => setIsSizeGuideOpen(true)}
                className="font-ui"
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--color-crimson)",
                  fontSize: "11px",
                  fontWeight: "bold",
                  letterSpacing: "1px",
                  cursor: "pointer",
                  padding: 0
                }}
              >
                SIZE GUIDE
              </button>
            </div>

            {/* QUANTITY SELECTOR */}
            <div style={{ marginBottom: "var(--space-8)" }}>
              <label className="font-ui" style={{ fontSize: "12px", fontWeight: "bold", color: "var(--color-white)", letterSpacing: "1px", display: "block", marginBottom: "var(--space-3)" }}>
                QUANTITY:
              </label>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  border: "1px solid var(--color-border-strong)",
                  borderRadius: "2px",
                  height: "40px"
                }}
              >
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                  style={{
                    width: "36px",
                    height: "100%",
                    background: "none",
                    border: "none",
                    color: "var(--color-white)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Minus size={14} />
                </button>
                <span className="font-meta" style={{ padding: "0 16px", fontSize: "14px", fontWeight: "bold" }}>
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Increase quantity"
                  style={{
                    width: "36px",
                    height: "100%",
                    background: "none",
                    border: "none",
                    color: "var(--color-white)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
              <button
                type="button"
                onClick={handleAddToCart}
                className="font-ui"
                style={{
                  width: "100%",
                  backgroundColor: "var(--color-crimson)",
                  color: "var(--color-white)",
                  border: "none",
                  borderRadius: "2px",
                  padding: "var(--space-4)",
                  fontSize: "13px",
                  fontWeight: "bold",
                  letterSpacing: "1.5px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "var(--space-2)"
                }}
              >
                <ShoppingBag size={18} /> ADD TO CART
              </button>

              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                className="font-ui"
                style={{
                  width: "100%",
                  backgroundColor: "transparent",
                  color: "var(--color-white)",
                  border: "1px solid var(--color-border-strong)",
                  borderRadius: "2px",
                  padding: "var(--space-3)",
                  fontSize: "12px",
                  fontWeight: "bold",
                  letterSpacing: "1.5px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "var(--space-2)"
                }}
              >
                <Heart size={16} fill={isWishlisted ? "var(--color-crimson)" : "none"} style={{ color: isWishlisted ? "var(--color-crimson)" : "var(--color-white)" }} />
                {isWishlisted ? "ADDED TO WISHLIST" : "ADD TO WISHLIST"}
              </button>
            </div>
          </div>
        </div>

        {/* 3. VALUE PROPS BAR (3 Items) */}
        <div
          style={{
            borderTop: "1px solid var(--color-border-subtle)",
            borderBottom: "1px solid var(--color-border-subtle)",
            padding: "var(--space-6) 0",
            marginBottom: "var(--space-12)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "var(--space-6)"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
            <ShieldCheck size={28} />
            <div>
              <h4 className="font-ui" style={{ fontSize: "12px", fontWeight: "bold" }}>Premium Quality</h4>
              <p className="font-body" style={{ fontSize: "12px", color: "var(--color-mist)" }}>Built to last</p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
            <RotateCcw size={28} />
            <div>
              <h4 className="font-ui" style={{ fontSize: "12px", fontWeight: "bold" }}>14-Day Returns</h4>
              <p className="font-body" style={{ fontSize: "12px", color: "var(--color-mist)" }}>Hassle free</p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
            <Truck size={28} />
            <div>
              <h4 className="font-ui" style={{ fontSize: "12px", fontWeight: "bold" }}>Worldwide Shipping</h4>
              <p className="font-body" style={{ fontSize: "12px", color: "var(--color-mist)" }}>Fast &amp; secure</p>
            </div>
          </div>
        </div>

        {/* 4. EXPANDABLE ACCORDIONS */}
        <div style={{ maxWidth: "800px" }}>
          <Accordion items={accordionItems} defaultOpenIds={["desc"]} />
        </div>
      </Container>

      {/* SIZE GUIDE MODAL */}
      <Modal isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} title="SIZE GUIDE">
        <div style={{ color: "var(--color-white)", fontSize: "13px" }}>
          <p style={{ color: "var(--color-mist)", marginBottom: "var(--space-4)" }}>
            Measurements in inches. All apparel features an oversized streetwear fit.
          </p>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--color-border-strong)", color: "var(--color-crimson)" }}>
                <th style={{ padding: "8px" }}>SIZE</th>
                <th style={{ padding: "8px" }}>CHEST (IN)</th>
                <th style={{ padding: "8px" }}>LENGTH (IN)</th>
                <th style={{ padding: "8px" }}>SLEEVE (IN)</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--color-border-subtle)" }}>
                <td style={{ padding: "8px" }}>XS</td>
                <td style={{ padding: "8px" }}>38-40</td>
                <td style={{ padding: "8px" }}>26</td>
                <td style={{ padding: "8px" }}>24</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--color-border-subtle)" }}>
                <td style={{ padding: "8px" }}>S</td>
                <td style={{ padding: "8px" }}>40-42</td>
                <td style={{ padding: "8px" }}>27</td>
                <td style={{ padding: "8px" }}>25</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--color-border-subtle)" }}>
                <td style={{ padding: "8px" }}>M</td>
                <td style={{ padding: "8px" }}>42-44</td>
                <td style={{ padding: "8px" }}>28</td>
                <td style={{ padding: "8px" }}>26</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--color-border-subtle)" }}>
                <td style={{ padding: "8px" }}>L</td>
                <td style={{ padding: "8px" }}>44-46</td>
                <td style={{ padding: "8px" }}>29</td>
                <td style={{ padding: "8px" }}>27</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--color-border-subtle)" }}>
                <td style={{ padding: "8px" }}>XL</td>
                <td style={{ padding: "8px" }}>46-48</td>
                <td style={{ padding: "8px" }}>30</td>
                <td style={{ padding: "8px" }}>28</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Modal>
    </div>
  );
};
