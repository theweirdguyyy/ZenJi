"use client";

import React from "react";
import Link from "next/link";
import { Container, Section, Divider } from "@/components/common/Container";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { useCartStore } from "@/store/cart-store";
import { formatCurrency } from "@/lib/utils";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal } = useCartStore();
  const subtotal = getSubtotal();

  return (
    <Section padding="lg">
      <Container size="xl">
        <div style={{ marginBottom: "var(--space-6)" }}>
          <div style={{ display: "flex", gap: "var(--space-2)", alignItems: "center", marginBottom: "var(--space-2)" }}>
            <Badge variant="crimson">ROUTE /CART</Badge>
            <Badge variant="outline">ZUSTAND STATE FOUNDATION</Badge>
          </div>
          <h1 className="font-display" style={{ fontSize: "var(--font-size-4xl)" }}>
            YOUR SHOPPING CART ({items.length})
          </h1>
        </div>

        <Divider />

        {items.length === 0 ? (
          <div
            className="hud-border"
            style={{
              backgroundColor: "var(--color-ink)",
              padding: "var(--space-12)",
              textAlign: "center",
              marginTop: "var(--space-8)"
            }}
          >
            <p className="font-display" style={{ fontSize: "var(--font-size-2xl)", marginBottom: "var(--space-4)" }}>
              YOUR CART IS CURRENTLY EMPTY
            </p>
            <p className="font-body" style={{ color: "var(--color-mist)", marginBottom: "var(--space-6)" }}>
              Explore Drop 07 and save items to your basket.
            </p>
            <Link href="/shop">
              <Button variant="primary" size="md">
                EXPLORE CATALOG
              </Button>
            </Link>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "var(--space-8)",
              marginTop: "var(--space-8)"
            }}
          >
            {/* Cart Items List */}
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
              {items.map((item) => (
                <div
                  key={item.id}
                  className="hud-border"
                  style={{
                    backgroundColor: "var(--color-ink)",
                    padding: "var(--space-4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}
                >
                  <div>
                    <h3 className="font-display" style={{ fontSize: "var(--font-size-lg)" }}>
                      {item.product.name}
                    </h3>
                    <p className="font-meta" style={{ color: "var(--color-mist)" }}>
                      {item.selectedSize} • {item.selectedColor.name}
                    </p>
                    <p className="font-meta" style={{ color: "var(--color-crimson)", marginTop: "4px" }}>
                      ${item.product.price} USD
                    </p>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      style={{ color: "var(--color-white)", padding: "4px 8px", border: "1px solid var(--color-border-strong)", cursor: "pointer" }}
                    >
                      -
                    </button>
                    <span className="font-meta">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      style={{ color: "var(--color-white)", padding: "4px 8px", border: "1px solid var(--color-border-strong)", cursor: "pointer" }}
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      style={{ color: "var(--color-crimson)", marginLeft: "8px", cursor: "pointer", background: "none", border: "none" }}
                    >
                      REMOVE
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div
              className="hud-border"
              style={{
                backgroundColor: "var(--color-ink)",
                padding: "var(--space-6)",
                height: "fit-content"
              }}
            >
              <h2 className="font-display" style={{ fontSize: "var(--font-size-xl)", marginBottom: "var(--space-4)" }}>
                ORDER SUMMARY
              </h2>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "var(--space-2)" }}>
                <span className="font-ui" style={{ color: "var(--color-mist)" }}>Subtotal</span>
                <span className="font-meta" style={{ color: "var(--color-white)" }}>{formatCurrency(subtotal)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "var(--space-4)" }}>
                <span className="font-ui" style={{ color: "var(--color-mist)" }}>Shipping</span>
                <span className="font-meta" style={{ color: "var(--color-mist)" }}>Calculated at Checkout</span>
              </div>
              <Divider style={{ margin: "var(--space-4) 0" }} />
              <Link href="/checkout">
                <Button variant="primary" size="lg" fullWidth>
                  PROCEED TO CHECKOUT
                </Button>
              </Link>
            </div>
          </div>
        )}
      </Container>
    </Section>
  );
}
