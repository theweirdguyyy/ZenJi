"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { formatCurrency } from "@/lib/utils";
import { Size } from "@/types/product";
import {
  Minus, Plus, Trash2, Heart, ArrowLeft,
  Lock, Shield, RotateCcw, Truck, CreditCard, ChevronDown
} from "lucide-react";
import styles from "./Cart.module.css";

const SHIPPING_COST = 9.99;

// Payment method icons rendered as styled badges
const PAYMENT_METHODS = ["VISA", "MC", "PAYPAL", "APPLE PAY", "AMEX"];

const TRUST_BADGES = [
  { icon: Shield, title: "PREMIUM QUALITY", sub: "Built to last" },
  { icon: RotateCcw, title: "14-DAY RETURNS", sub: "Hassle free" },
  { icon: Truck, title: "FAST SHIPPING", sub: "Worldwide delivery" },
  { icon: Lock, title: "SECURE PAYMENT", sub: "100% protected" }
];

// Row styles
const rowLabelStyle: React.CSSProperties = {
  fontSize: "11px",
  fontFamily: "var(--font-ui)",
  fontWeight: 700,
  letterSpacing: "2px",
  color: "rgba(255,255,255,0.4)",
  textTransform: "uppercase"
};

export default function CartPage() {
  const { items, removeItem, updateQuantity, updateSize, getSubtotal, getItemCount } = useCartStore();
  const { toggleWishlist } = useWishlistStore();
  const subtotal = getSubtotal();
  const itemCount = getItemCount();
  const discount = 0;
  const FREE_SHIPPING_THRESHOLD = 150;
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingAmount = items.length === 0 ? 0 : isFreeShipping ? 0 : SHIPPING_COST;
  const estimatedTotal = subtotal + shippingAmount - discount;

  return (
    <div className={styles.container}>
      {/* ── HERO HEADER with background artwork ───────────────────── */}
      <div className={styles.hero}>
        {/* Background artwork */}
        <Image
          src="/story_background.png"
          alt="ZENJI Cart Background"
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center 30%",
            filter: "brightness(0.18)"
          }}
          priority
          sizes="100vw"
        />
        {/* Gradient fade to page bg */}
        <div className={styles.heroOverlay} />

        {/* Vertical Japanese text — hidden on small mobile */}
        <div className={styles.heroJapanese}>
          影の力を繋ぎ
        </div>

        {/* Title overlay */}
        <div className={styles.heroTitleBox}>
          <h1
            className="font-display"
            style={{
              fontSize: "clamp(32px, 5.5vw, 68px)",
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "var(--color-white)",
              marginBottom: "6px"
            }}
          >
            YOUR CART
          </h1>
          {/* Red underline accent */}
          <div
            style={{
              width: "clamp(40px, 5vw, 56px)",
              height: "3px",
              backgroundColor: "var(--color-crimson)",
              marginBottom: "8px"
            }}
          />
          <p
            style={{
              fontSize: "11px",
              fontFamily: "var(--font-ui)",
              fontWeight: 700,
              letterSpacing: "2.5px",
              color: "rgba(255,255,255,0.55)",
              textTransform: "uppercase"
            }}
          >
            {itemCount} {itemCount === 1 ? "ITEM" : "ITEMS"}
          </p>
        </div>
      </div>

      {/* ── MAIN CONTENT ──────────────────────────────────────────── */}
      <div className={styles.mainContent}>
        {items.length === 0 ? (
          /* ── EMPTY CART STATE ─────────────────────────────────── */
          <div
            style={{
              textAlign: "center",
              padding: "clamp(60px, 10vh, 120px) 24px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px"
            }}
          >
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <CreditCard size={32} color="rgba(255,255,255,0.25)" />
            </div>
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(22px, 3vw, 32px)",
                fontWeight: 900,
                color: "var(--color-white)"
              }}
            >
              YOUR CART IS EMPTY
            </h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", fontFamily: "var(--font-body)" }}>
              Explore Drop 07 and save items to your cart.
            </p>
            <Link
              href="/shop"
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
                padding: "14px 28px",
                borderRadius: "2px",
                textDecoration: "none",
                textTransform: "uppercase"
              }}
            >
              EXPLORE CATALOG <ArrowLeft size={13} style={{ transform: "rotate(180deg)" }} />
            </Link>
          </div>
        ) : (
          <div className={styles.cartGrid}>
            {/* ── LEFT: CART ITEMS TABLE / CARDS ─────────────────── */}
            <div>
              {/* Table Header (Desktop Only) */}
              <div className={styles.tableHeader}>
                <span />
                <span style={rowLabelStyle}>PRODUCT</span>
                <span style={{ ...rowLabelStyle, textAlign: "right" }}>PRICE</span>
                <span style={{ ...rowLabelStyle, textAlign: "center", minWidth: "100px" }}>QUANTITY</span>
                <span style={{ ...rowLabelStyle, textAlign: "right", minWidth: "60px" }}>TOTAL</span>
              </div>

              {/* Cart Item Rows */}
              {items.map((item) => {
                const itemTotal = item.product.price * item.quantity;
                const thumbSrc = item.product.images?.[0] || "";

                return (
                  <div key={item.id} className={styles.cartItemRow}>
                    {/* Thumbnail */}
                    <div className={styles.itemThumb}>
                      {thumbSrc && (
                        <Image
                          src={thumbSrc}
                          alt={item.product.name}
                          fill
                          style={{ objectFit: "cover" }}
                          sizes="72px"
                        />
                      )}
                    </div>

                    {/* Product Details */}
                    <div className={styles.itemInfo}>
                      <p
                        className="font-display"
                        style={{
                          fontSize: "13px",
                          fontWeight: 700,
                          letterSpacing: "1px",
                          textTransform: "uppercase",
                          color: "var(--color-white)",
                          marginBottom: "4px"
                        }}
                      >
                        {item.product.name}
                      </p>

                      {/* Mobile Unit Price */}
                      <div className={styles.mobileUnitPrice}>
                        <span>${item.product.price.toFixed(2)}</span>
                        {item.quantity > 1 && (
                          <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.45)", fontWeight: 500 }}>
                            each
                          </span>
                        )}
                      </div>

                      <p
                        style={{
                          fontSize: "11px",
                          color: "rgba(255,255,255,0.45)",
                          fontFamily: "var(--font-body)",
                          marginBottom: "2px"
                        }}
                      >
                        COLOR: {item.selectedColor.name.toUpperCase()}
                      </p>

                      {/* Editable Size Selector */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          marginBottom: "8px"
                        }}
                      >
                        <span
                          style={{
                            fontSize: "11px",
                            color: "rgba(255,255,255,0.45)",
                            fontFamily: "var(--font-body)",
                            fontWeight: 600
                          }}
                        >
                          SIZE:
                        </span>
                        <div style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
                          <select
                            value={item.selectedSize}
                            onChange={(e) => updateSize(item.id, e.target.value as Size)}
                            style={{
                              backgroundColor: "rgba(255,255,255,0.06)",
                              border: "1px solid rgba(255,255,255,0.2)",
                              borderRadius: "3px",
                              color: "var(--color-white)",
                              fontSize: "11px",
                              fontWeight: 700,
                              fontFamily: "var(--font-ui)",
                              padding: "2px 22px 2px 8px",
                              appearance: "none",
                              WebkitAppearance: "none",
                              cursor: "pointer",
                              outline: "none",
                              transition: "border-color 0.2s ease"
                            }}
                            onFocus={(e) => (e.target.style.borderColor = "var(--color-crimson)")}
                            onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.2)")}
                            aria-label={`Change size for ${item.product.name}`}
                          >
                            {(item.product.availableSizes && item.product.availableSizes.length > 0
                              ? item.product.availableSizes
                              : item.product.sizes && item.product.sizes.length > 0
                              ? item.product.sizes
                              : (["XS", "S", "M", "L", "XL", "XXL"] as Size[])
                            ).map((sizeOption) => (
                              <option
                                key={sizeOption}
                                value={sizeOption}
                                style={{ backgroundColor: "#111111", color: "#ffffff" }}
                              >
                                {sizeOption}
                              </option>
                            ))}
                          </select>
                          <ChevronDown
                            size={12}
                            color="rgba(255,255,255,0.5)"
                            style={{
                              position: "absolute",
                              right: "6px",
                              pointerEvents: "none"
                            }}
                          />
                        </div>
                      </div>

                      {/* Move to Wishlist */}
                      <button
                        onClick={() => {
                          toggleWishlist(item.product.id);
                          removeItem(item.id);
                        }}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "5px",
                          background: "none",
                          border: "none",
                          color: "rgba(255,255,255,0.4)",
                          fontFamily: "var(--font-ui)",
                          fontSize: "10px",
                          letterSpacing: "1px",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          cursor: "pointer",
                          padding: 0,
                          transition: "color 0.2s ease"
                        }}
                        onMouseEnter={e => ((e.target as HTMLButtonElement).style.color = "var(--color-crimson)")}
                        onMouseLeave={e => ((e.target as HTMLButtonElement).style.color = "rgba(255,255,255,0.4)")}
                      >
                        <Heart size={11} /> MOVE TO WISHLIST
                      </button>
                    </div>

                    {/* Desktop Columns: Price */}
                    <div className={styles.desktopColPrice}>
                      ${item.product.price.toFixed(2)}
                    </div>

                    {/* Desktop Columns: Quantity Stepper */}
                    <div className={styles.desktopColQty}>
                      <div className={styles.stepper}>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className={styles.stepperBtn}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className={styles.stepperCount}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className={styles.stepperBtn}
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>

                    {/* Desktop Columns: Total + Remove */}
                    <div className={styles.desktopColTotal}>
                      <span
                        style={{
                          fontFamily: "var(--font-ui)",
                          fontSize: "14px",
                          fontWeight: 700,
                          color: "var(--color-white)"
                        }}
                      >
                        ${itemTotal.toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className={styles.removeBtn}
                        aria-label="Remove item"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    {/* Mobile Controls Row (spanning across bottom of mobile card) */}
                    <div className={styles.mobileControlsRow}>
                      <div className={styles.stepper}>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className={styles.stepperBtn}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className={styles.stepperCount}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className={styles.stepperBtn}
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <div className={styles.mobilePriceTotalGroup}>
                        <div style={{ textAlign: "right" }}>
                          <span className={styles.mobileTotalLabel}>TOTAL </span>
                          <span className={styles.mobileTotalValue}>${itemTotal.toFixed(2)}</span>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className={styles.mobileRemoveBtn}
                          aria-label="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Continue Shopping */}
              <div style={{ marginTop: "24px" }}>
                <Link
                  href="/shop"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "12px 20px",
                    border: "1px solid rgba(255,255,255,0.18)",
                    borderRadius: "3px",
                    color: "rgba(255,255,255,0.7)",
                    fontFamily: "var(--font-ui)",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "2px",
                    textDecoration: "none",
                    textTransform: "uppercase"
                  }}
                >
                  <ArrowLeft size={13} /> CONTINUE SHOPPING
                </Link>
              </div>
            </div>

            {/* ── RIGHT: ORDER SUMMARY ──────────────────────────────── */}
            <div className={styles.summaryCard}>
              <h2
                className="font-display"
                style={{
                  fontSize: "14px",
                  fontWeight: 900,
                  letterSpacing: "2.5px",
                  color: "var(--color-white)",
                  textTransform: "uppercase",
                  marginBottom: "20px",
                  paddingBottom: "16px",
                  borderBottom: "1px solid rgba(255,255,255,0.08)"
                }}
              >
                ORDER SUMMARY
              </h2>

              {/* Row: Subtotal */}
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                <span style={{ fontSize: "11px", letterSpacing: "1.5px", color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-ui)", fontWeight: 700 }}>
                  SUBTOTAL
                </span>
                <span style={{ fontFamily: "var(--font-ui)", fontWeight: 700, color: "var(--color-white)", fontSize: "14px" }}>
                  {formatCurrency(subtotal)}
                </span>
              </div>

              {/* Row: Shipping */}
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: items.length > 0 && !isFreeShipping ? "4px" : "12px" }}>
                <span style={{ fontSize: "11px", letterSpacing: "1.5px", color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-ui)", fontWeight: 700 }}>
                  SHIPPING
                </span>
                <span style={{ fontFamily: "var(--font-ui)", fontSize: "13px", fontWeight: 700, color: isFreeShipping ? "var(--color-crimson)" : "var(--color-white)" }}>
                  {items.length === 0 ? "—" : isFreeShipping ? "FREE" : formatCurrency(SHIPPING_COST)}
                </span>
              </div>
              {items.length > 0 && !isFreeShipping && (
                <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-body)", marginBottom: "12px" }}>
                  Add <strong style={{ color: "var(--color-crimson)" }}>{formatCurrency(FREE_SHIPPING_THRESHOLD - subtotal)}</strong> more for free shipping
                </p>
              )}

              {/* Row: Discount */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "20px",
                  paddingBottom: "20px",
                  borderBottom: "1px solid rgba(255,255,255,0.08)"
                }}
              >
                <span style={{ fontSize: "11px", letterSpacing: "1.5px", color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-ui)", fontWeight: 700 }}>
                  DISCOUNT
                </span>
                <span style={{ fontFamily: "var(--font-ui)", fontWeight: 700, color: "rgba(255,255,255,0.5)", fontSize: "13px" }}>
                  −${discount.toFixed(2)}
                </span>
              </div>

              {/* Estimated Total */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                <span
                  className="font-display"
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    letterSpacing: "2px",
                    color: "rgba(255,255,255,0.6)",
                    textTransform: "uppercase"
                  }}
                >
                  ESTIMATED TOTAL
                </span>
                <span
                  className="font-display"
                  style={{
                    fontSize: "26px",
                    fontWeight: 900,
                    color: "var(--color-white)"
                  }}
                >
                  {formatCurrency(estimatedTotal)}
                </span>
              </div>
              <p
                style={{
                  fontSize: "11px",
                  color: "rgba(255,255,255,0.35)",
                  fontFamily: "var(--font-body)",
                  marginBottom: "24px"
                }}
              >
                Taxes and shipping calculated at checkout
              </p>

              {/* Proceed to Checkout */}
              <Link href="/checkout" style={{ display: "block", textDecoration: "none", marginBottom: "10px" }}>
                <button
                  style={{
                    width: "100%",
                    backgroundColor: "var(--color-crimson)",
                    color: "var(--color-white)",
                    border: "none",
                    borderRadius: "3px",
                    padding: "15px",
                    fontFamily: "var(--font-ui)",
                    fontSize: "12px",
                    fontWeight: 700,
                    letterSpacing: "2.5px",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    boxShadow: "0 4px 20px rgba(227,38,26,0.35)"
                  }}
                >
                  <Lock size={13} /> PROCEED TO CHECKOUT
                </button>
              </Link>

              {/* Buy it now */}
              <button
                style={{
                  width: "100%",
                  backgroundColor: "transparent",
                  color: "var(--color-white)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "3px",
                  padding: "14px",
                  fontFamily: "var(--font-ui)",
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "2.5px",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  marginBottom: "20px"
                }}
              >
                BUY IT NOW
              </button>

              {/* Payment methods */}
              <div style={{ textAlign: "center" }}>
                <p
                  style={{
                    fontSize: "10px",
                    letterSpacing: "2px",
                    color: "rgba(255,255,255,0.35)",
                    fontFamily: "var(--font-ui)",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    marginBottom: "10px"
                  }}
                >
                  WE ACCEPT
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: "6px",
                    justifyContent: "center",
                    flexWrap: "wrap"
                  }}
                >
                  {PAYMENT_METHODS.map((method) => (
                    <span
                      key={method}
                      style={{
                        padding: "4px 8px",
                        backgroundColor: "rgba(255,255,255,0.08)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        borderRadius: "3px",
                        fontSize: "8px",
                        fontFamily: "var(--font-ui)",
                        fontWeight: 900,
                        letterSpacing: "1px",
                        color: "rgba(255,255,255,0.7)"
                      }}
                    >
                      {method}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── TRUST BADGES STRIP ──────────────────────────────────── */}
        {items.length > 0 && (
          <div className={styles.trustBadgesGrid}>
            {TRUST_BADGES.map((badge) => {
              const Icon = badge.icon;
              return (
                <div key={badge.title} className={styles.trustBadgeItem}>
                  <Icon size={22} color="rgba(255,255,255,0.35)" />
                  <div>
                    <p
                      style={{
                        fontSize: "11px",
                        fontFamily: "var(--font-ui)",
                        fontWeight: 700,
                        letterSpacing: "1.5px",
                        color: "var(--color-white)",
                        textTransform: "uppercase",
                        marginBottom: "2px"
                      }}
                    >
                      {badge.title}
                    </p>
                    <p
                      style={{
                        fontSize: "11px",
                        color: "rgba(255,255,255,0.45)",
                        fontFamily: "var(--font-body)"
                      }}
                    >
                      {badge.sub}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
