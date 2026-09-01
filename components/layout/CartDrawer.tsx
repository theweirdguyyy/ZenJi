"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cart-store";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export const CartDrawer: React.FC = () => {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getSubtotal, getItemCount } =
    useCartStore();

  const subtotal = getSubtotal();
  const itemCount = getItemCount();
  const FREE_SHIPPING_THRESHOLD = 150;
  const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const amountUntilFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeCart();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: "var(--z-modal)",
        backgroundColor: "rgba(7, 7, 7, 0.75)",
        backdropFilter: "blur(6px)",
        display: "flex",
        justifyContent: "flex-end"
      }}
      onClick={closeCart}
    >
      <div
        className="hud-border"
        style={{
          width: "100%",
          maxWidth: "460px",
          height: "100%",
          backgroundColor: "#0d0d0d",
          display: "flex",
          flexDirection: "column",
          boxShadow: "-10px 0 40px rgba(0, 0, 0, 0.9)",
          borderLeft: "1px solid var(--color-border-strong)",
          animation: "slideInRight 0.25s cubic-bezier(0.16, 1, 0.3, 1)"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div
          style={{
            padding: "var(--space-4) var(--space-6)",
            borderBottom: "1px solid var(--color-border-subtle)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
            <ShoppingBag size={20} style={{ color: "var(--color-crimson)" }} />
            <h2 className="font-display" style={{ fontSize: "18px", letterSpacing: "1px" }}>
              YOUR BAG ({itemCount})
            </h2>
          </div>
          <button
            onClick={closeCart}
            aria-label="Close cart drawer"
            style={{
              background: "none",
              border: "none",
              color: "var(--color-mist)",
              cursor: "pointer",
              padding: "4px"
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div
          style={{
            padding: "var(--space-3) var(--space-6)",
            backgroundColor: "rgba(255, 255, 255, 0.02)",
            borderBottom: "1px solid var(--color-border-subtle)"
          }}
        >
          <p className="font-meta" style={{ fontSize: "11px", color: "var(--color-mist)", marginBottom: "6px" }}>
            {amountUntilFreeShipping === 0 ? (
              <span style={{ color: "#4ade80", fontWeight: "bold" }}>✦ FREE GLOBAL SHIPPING UNLOCKED!</span>
            ) : (
              <>
                Add <span style={{ color: "var(--color-crimson)", fontWeight: "bold" }}>${amountUntilFreeShipping.toFixed(2)}</span> more for Free Global Shipping
              </>
            )}
          </p>
          <div
            style={{
              width: "100%",
              height: "4px",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderRadius: "2px",
              overflow: "hidden"
            }}
          >
            <div
              style={{
                width: `${freeShippingProgress}%`,
                height: "100%",
                backgroundColor: amountUntilFreeShipping === 0 ? "#4ade80" : "var(--color-crimson)",
                transition: "width 0.3s ease"
              }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "var(--space-4) var(--space-6)",
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-4)"
          }}
        >
          {items.length === 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                textAlign: "center",
                padding: "var(--space-8) 0"
              }}
            >
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(255, 255, 255, 0.03)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "var(--space-4)"
                }}
              >
                <ShoppingBag size={28} style={{ color: "var(--color-mist)" }} />
              </div>
              <h3 className="font-display" style={{ fontSize: "18px", marginBottom: "var(--space-2)" }}>
                YOUR BAG IS EMPTY
              </h3>
              <p className="font-body" style={{ fontSize: "13px", color: "var(--color-mist)", marginBottom: "var(--space-6)" }}>
                Looks like you haven&apos;t added any limited drop gear yet.
              </p>
              <Link
                href="/collection"
                onClick={closeCart}
                style={{
                  backgroundColor: "var(--color-crimson)",
                  color: "var(--color-white)",
                  fontFamily: "var(--font-ui)",
                  fontSize: "12px",
                  fontWeight: "bold",
                  letterSpacing: "1.5px",
                  padding: "12px 24px",
                  borderRadius: "2px",
                  textDecoration: "none"
                }}
              >
                EXPLORE DROP 07
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  gap: "var(--space-4)",
                  padding: "var(--space-3)",
                  backgroundColor: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 255, 255, 0.06)",
                  borderRadius: "4px"
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "72px",
                    height: "80px",
                    borderRadius: "3px",
                    overflow: "hidden",
                    backgroundColor: "#151515",
                    flexShrink: 0
                  }}
                >
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>

                <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <h4 className="font-ui" style={{ fontSize: "13px", fontWeight: "bold", color: "var(--color-white)" }}>
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeItem(item.id)}
                        aria-label="Remove item"
                        style={{
                          background: "none",
                          border: "none",
                          color: "var(--color-mist)",
                          cursor: "pointer",
                          padding: "2px"
                        }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <p className="font-meta" style={{ fontSize: "11px", color: "var(--color-mist)", marginTop: "2px" }}>
                      SIZE: {item.selectedSize} • {item.selectedColor.name}
                    </p>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "8px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        border: "1px solid rgba(255, 255, 255, 0.15)",
                        borderRadius: "2px"
                      }}
                    >
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                        style={{
                          padding: "4px 8px",
                          background: "none",
                          border: "none",
                          color: "var(--color-white)",
                          cursor: "pointer"
                        }}
                      >
                        <Minus size={12} />
                      </button>
                      <span className="font-meta" style={{ fontSize: "12px", minWidth: "20px", textAlign: "center" }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                        style={{
                          padding: "4px 8px",
                          background: "none",
                          border: "none",
                          color: "var(--color-white)",
                          cursor: "pointer"
                        }}
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <span className="font-meta" style={{ fontSize: "13px", fontWeight: "bold", color: "var(--color-white)" }}>
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer (Subtotal & Actions) */}
        {items.length > 0 && (
          <div
            style={{
              padding: "var(--space-4) var(--space-6) var(--space-6)",
              borderTop: "1px solid var(--color-border-subtle)",
              backgroundColor: "#070707",
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-3)"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span className="font-ui" style={{ fontSize: "13px", color: "var(--color-mist)" }}>
                Estimated Subtotal
              </span>
              <span className="font-meta" style={{ fontSize: "18px", fontWeight: "bold", color: "var(--color-white)" }}>
                {formatCurrency(subtotal)}
              </span>
            </div>

            <p className="font-meta" style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>
              Shipping, taxes, and discounts calculated at checkout.
            </p>

            <Link
              href="/checkout"
              onClick={closeCart}
              style={{
                backgroundColor: "var(--color-crimson)",
                color: "var(--color-white)",
                fontFamily: "var(--font-ui)",
                fontSize: "13px",
                fontWeight: "bold",
                letterSpacing: "1.5px",
                padding: "14px",
                borderRadius: "3px",
                textAlign: "center",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                transition: "opacity 0.2s"
              }}
            >
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight size={16} />
            </Link>

            <Link
              href="/cart"
              onClick={closeCart}
              style={{
                backgroundColor: "transparent",
                color: "var(--color-white)",
                border: "1px solid var(--color-border-strong)",
                fontFamily: "var(--font-ui)",
                fontSize: "12px",
                fontWeight: "bold",
                letterSpacing: "1px",
                padding: "10px",
                borderRadius: "3px",
                textAlign: "center",
                textDecoration: "none"
              }}
            >
              VIEW FULL BAG
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
