"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { formatCurrency } from "@/lib/utils";
import {
  Minus, Plus, Trash2, Heart, ArrowLeft,
  Lock, Shield, RotateCcw, Truck, CreditCard
} from "lucide-react";

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
  const { items, removeItem, updateQuantity, getSubtotal, getItemCount } = useCartStore();
  const { toggleWishlist } = useWishlistStore();
  const subtotal = getSubtotal();
  const itemCount = getItemCount();
  const discount = 0;
  const estimatedTotal = subtotal + (items.length > 0 ? SHIPPING_COST : 0) - discount;

  return (
    <div
      style={{
        backgroundColor: "var(--color-void)",
        color: "var(--color-white)",
        minHeight: "calc(100vh - 64px)",
        position: "relative"
      }}
    >
      {/* ── HERO HEADER with background artwork ───────────────────── */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "clamp(140px, 20vw, 220px)",
          overflow: "hidden"
        }}
      >
        {/* Background artwork — story_background.png suits the samurai warrior aesthetic */}
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
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(5,5,5,0.3) 0%, rgba(5,5,5,0.85) 100%)"
          }}
        />

        {/* Vertical Japanese text — decoration, right side */}
        <div
          style={{
            position: "absolute",
            right: "clamp(16px, 3vw, 48px)",
            top: "50%",
            transform: "translateY(-50%)",
            writingMode: "vertical-rl",
            fontSize: "clamp(16px, 2.5vw, 28px)",
            color: "rgba(255,255,255,0.12)",
            letterSpacing: "6px",
            fontFamily: "var(--font-body)",
            userSelect: "none"
          }}
        >
          影の力を繋ぎ
        </div>

        {/* Title overlay */}
        <div
          style={{
            position: "absolute",
            bottom: "clamp(20px, 3vw, 32px)",
            left: "clamp(20px, 4vw, 60px)"
          }}
        >
          <h1
            className="font-display"
            style={{
              fontSize: "clamp(36px, 6vw, 72px)",
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
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "clamp(20px, 3vw, 40px) clamp(16px, 4vw, 60px)"
        }}
      >
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
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1.5fr) minmax(0, 0.8fr)",
              gap: "clamp(20px, 3vw, 48px)",
              alignItems: "flex-start"
            }}
          >
            {/* ── LEFT: CART ITEMS TABLE ──────────────────────────── */}
            <div>
              {/* Table Header */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "80px 1fr auto auto auto",
                  gap: "12px",
                  alignItems: "center",
                  padding: "10px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                  marginBottom: "8px"
                }}
              >
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
                  <div
                    key={item.id}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "80px 1fr auto auto auto",
                      gap: "12px",
                      alignItems: "center",
                      padding: "18px 0",
                      borderBottom: "1px solid rgba(255,255,255,0.06)"
                    }}
                  >
                    {/* Thumbnail */}
                    <div
                      style={{
                        width: "72px",
                        height: "80px",
                        borderRadius: "3px",
                        overflow: "hidden",
                        backgroundColor: "rgba(255,255,255,0.04)",
                        position: "relative",
                        flexShrink: 0
                      }}
                    >
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

                    {/* Product Info */}
                    <div>
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
                      <p
                        style={{
                          fontSize: "11px",
                          color: "rgba(255,255,255,0.45)",
                          fontFamily: "var(--font-body)",
                          marginBottom: "10px"
                        }}
                      >
                        SIZE: {item.selectedSize}
                      </p>
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

                    {/* Price */}
                    <div
                      style={{
                        fontFamily: "var(--font-ui)",
                        fontSize: "14px",
                        fontWeight: 700,
                        color: "var(--color-white)",
                        textAlign: "right",
                        minWidth: "60px"
                      }}
                    >
                      ${item.product.price.toFixed(2)}
                    </div>

                    {/* Quantity Stepper */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0",
                        border: "1px solid rgba(255,255,255,0.15)",
                        borderRadius: "3px",
                        overflow: "hidden",
                        minWidth: "100px"
                      }}
                    >
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        style={{
                          width: "30px",
                          height: "34px",
                          background: "none",
                          border: "none",
                          color: "rgba(255,255,255,0.6)",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "16px",
                          transition: "background 0.2s"
                        }}
                      >
                        <Minus size={12} />
                      </button>
                      <span
                        style={{
                          flex: 1,
                          textAlign: "center",
                          fontFamily: "var(--font-ui)",
                          fontSize: "13px",
                          fontWeight: 700,
                          color: "var(--color-white)",
                          borderLeft: "1px solid rgba(255,255,255,0.1)",
                          borderRight: "1px solid rgba(255,255,255,0.1)",
                          padding: "8px 4px"
                        }}
                      >
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        style={{
                          width: "30px",
                          height: "34px",
                          background: "none",
                          border: "none",
                          color: "rgba(255,255,255,0.6)",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "background 0.2s"
                        }}
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    {/* Total + Remove */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                        gap: "8px",
                        minWidth: "60px"
                      }}
                    >
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
                        style={{
                          background: "none",
                          border: "none",
                          color: "rgba(255,255,255,0.3)",
                          cursor: "pointer",
                          padding: "2px",
                          transition: "color 0.2s ease"
                        }}
                        onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.color = "var(--color-crimson)")}
                        onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.3)")}
                        aria-label="Remove item"
                      >
                        <Trash2 size={14} />
                      </button>
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
            <div
              style={{
                backgroundColor: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "4px",
                padding: "clamp(20px, 3vw, 32px)",
                position: "sticky",
                top: "88px"
              }}
            >
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
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                <span style={{ fontSize: "11px", letterSpacing: "1.5px", color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-ui)", fontWeight: 700 }}>
                  SHIPPING
                </span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>
                  CALCULATED AT CHECKOUT
                </span>
              </div>

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
          <div
            style={{
              marginTop: "clamp(32px, 5vw, 60px)",
              paddingTop: "clamp(24px, 3vw, 36px)",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "20px"
            }}
          >
            {TRUST_BADGES.map((badge, idx) => {
              const Icon = badge.icon;
              return (
                <div
                  key={badge.title}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    paddingRight: idx < TRUST_BADGES.length - 1 ? "20px" : 0,
                    borderRight:
                      idx < TRUST_BADGES.length - 1
                        ? "1px solid rgba(255,255,255,0.06)"
                        : "none"
                  }}
                >
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
