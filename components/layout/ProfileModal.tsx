"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useUIStore } from "@/store/ui-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { useCartStore } from "@/store/cart-store";
import { MOCK_PRODUCTS } from "@/data/products";
import { Product } from "@/types/product";
import {
  X,
  User,
  Heart,
  Package,
  Shield,
  LogOut,
  ShoppingBag,
  ExternalLink,
  ChevronRight
} from "lucide-react";

export const ProfileModal: React.FC = () => {
  const { isProfileOpen, closeProfile, addToast } = useUIStore();
  const { productIds, toggleWishlist } = useWishlistStore();
  const addItem = useCartStore((state) => state.addItem);


  const [activeTab, setActiveTab] = useState<"profile" | "wishlist" | "orders">("profile");

  const wishlistedProducts = MOCK_PRODUCTS.filter((p: Product) => productIds.includes(p.id));

  useEffect(() => {
    if (isProfileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isProfileOpen) {
        closeProfile();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isProfileOpen, closeProfile]);

  if (!isProfileOpen) return null;

  const handleQuickAddToCart = (product: Product) => {
    const defaultColor = product.colors[0] || { name: "BLACK", hex: "#070707" };
    const defaultSize = product.sizes[0] || "M";
    addItem(product, defaultColor, defaultSize, 1);
    addToast(`Added "${product.name}" to cart`, "success");
    closeProfile();
  };


  const handleSignOut = () => {
    addToast("Signed out of ZENJI Clan Account", "info");
    closeProfile();
  };

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
      onClick={closeProfile}
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
        {/* Profile Header */}
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
            <User size={20} style={{ color: "var(--color-crimson)" }} />
            <h2 className="font-display" style={{ fontSize: "18px", letterSpacing: "1px" }}>
              CLAN ACCOUNT
            </h2>
          </div>
          <button
            onClick={closeProfile}
            aria-label="Close profile drawer"
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

        {/* Member Badge Banner */}
        <div
          style={{
            padding: "var(--space-5) var(--space-6)",
            backgroundColor: "rgba(255, 255, 255, 0.02)",
            borderBottom: "1px solid var(--color-border-subtle)",
            display: "flex",
            alignItems: "center",
            gap: "var(--space-4)"
          }}
        >
          <div
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "50%",
              backgroundColor: "rgba(227, 38, 26, 0.15)",
              border: "1px solid var(--color-crimson)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0
            }}
          >
            <Shield size={24} style={{ color: "var(--color-crimson)" }} />
          </div>
          <div>
            <h3 className="font-display" style={{ fontSize: "16px", color: "var(--color-white)" }}>
              KENSHI // CLAN #0984
            </h3>
            <p className="font-meta" style={{ fontSize: "11px", color: "var(--color-mist)", marginTop: "2px" }}>
              TIER 2 RONIN • 1,240 CLAN EXP
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div
          style={{
            display: "flex",
            borderBottom: "1px solid var(--color-border-subtle)",
            backgroundColor: "rgba(255, 255, 255, 0.01)"
          }}
        >
          {[
            { key: "profile", label: "OVERVIEW", icon: User },
            { key: "wishlist", label: `SAVED (${productIds.length})`, icon: Heart },
            { key: "orders", label: "ORDERS (1)", icon: Package }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as "profile" | "wishlist" | "orders")}
              className="font-ui"
              style={{
                flex: 1,
                padding: "12px 6px",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "1px",
                border: "none",
                cursor: "pointer",
                backgroundColor: "transparent",
                color: activeTab === tab.key ? "var(--color-crimson)" : "var(--color-mist)",
                borderBottom:
                  activeTab === tab.key ? "2px solid var(--color-crimson)" : "2px solid transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                transition: "all 0.2s ease"
              }}
            >
              <tab.icon size={13} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "var(--space-5) var(--space-6)",
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-4)"
          }}
        >
          {/* TAB 1: OVERVIEW */}
          {activeTab === "profile" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
              <div
                style={{
                  padding: "var(--space-4)",
                  backgroundColor: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 255, 255, 0.06)",
                  borderRadius: "4px"
                }}
              >
                <h4 className="font-meta" style={{ fontSize: "11px", color: "var(--color-mist)", letterSpacing: "1px" }}>
                  MEMBER BENEFITS
                </h4>
                <ul style={{ listStyle: "none", marginTop: "8px", display: "flex", flexDirection: "column", gap: "6px", fontSize: "13px" }}>
                  <li style={{ color: "var(--color-white)" }}>✦ 24-Hour Early Access to Drop 08</li>
                  <li style={{ color: "var(--color-white)" }}>✦ Free Worldwide Shipping on $150+</li>
                  <li style={{ color: "var(--color-white)" }}>✦ 15% Clan Loyalty Discount on Reorders</li>
                </ul>
              </div>

              <div
                style={{
                  padding: "var(--space-4)",
                  backgroundColor: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 255, 255, 0.06)",
                  borderRadius: "4px"
                }}
              >
                <h4 className="font-meta" style={{ fontSize: "11px", color: "var(--color-mist)", letterSpacing: "1px" }}>
                  ACCOUNT INFORMATION
                </h4>
                <div style={{ marginTop: "8px", fontSize: "13px", color: "var(--color-mist)", lineHeight: 1.6 }}>
                  <p><strong style={{ color: "var(--color-white)" }}>Email:</strong> kenshi.streetwear@zenji.jp</p>
                  <p><strong style={{ color: "var(--color-white)" }}>Shipping Region:</strong> Tokyo, JP (Global Priority)</p>
                  <p><strong style={{ color: "var(--color-white)" }}>Member Since:</strong> 2024</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: WISHLIST */}
          {activeTab === "wishlist" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
              {wishlistedProducts.length === 0 ? (
                <div style={{ textAlign: "center", padding: "var(--space-8) 0" }}>
                  <Heart size={32} style={{ color: "var(--color-mist)", margin: "0 auto var(--space-3)" }} />
                  <p className="font-display" style={{ fontSize: "16px", marginBottom: "4px" }}>
                    NO SAVED ITEMS YET
                  </p>
                  <p className="font-body" style={{ fontSize: "12px", color: "var(--color-mist)" }}>
                    Click the heart icon on any product to save it here.
                  </p>
                </div>
              ) : (
                wishlistedProducts.map((prod) => (
                  <div
                    key={prod.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "var(--space-3)",
                      padding: "var(--space-3)",
                      backgroundColor: "rgba(255, 255, 255, 0.02)",
                      border: "1px solid rgba(255, 255, 255, 0.06)",
                      borderRadius: "4px"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
                      <div
                        style={{
                          position: "relative",
                          width: "50px",
                          height: "56px",
                          borderRadius: "3px",
                          overflow: "hidden",
                          backgroundColor: "#1a1a1a",
                          flexShrink: 0
                        }}
                      >
                        <Image src={prod.images[0]} alt={prod.name} fill style={{ objectFit: "cover" }} />
                      </div>
                      <div>
                        <h5 className="font-ui" style={{ fontSize: "13px", fontWeight: "bold", color: "var(--color-white)" }}>
                          {prod.name}
                        </h5>
                        <span className="font-meta" style={{ fontSize: "12px", color: "var(--color-crimson)" }}>
                          ${prod.price.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <button
                        onClick={() => handleQuickAddToCart(prod)}
                        title="Add to cart"
                        style={{
                          backgroundColor: "var(--color-crimson)",
                          color: "var(--color-white)",
                          border: "none",
                          borderRadius: "3px",
                          padding: "6px 10px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          fontSize: "11px",
                          fontWeight: "bold"
                        }}
                      >
                        <ShoppingBag size={13} />
                        <span>ADD</span>
                      </button>
                      <button
                        onClick={() => toggleWishlist(prod.id)}
                        title="Remove from saved"
                        style={{
                          background: "none",
                          border: "none",
                          color: "var(--color-mist)",
                          cursor: "pointer",
                          padding: "6px"
                        }}
                      >
                        <X size={15} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 3: ORDERS */}
          {activeTab === "orders" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
              <div
                style={{
                  padding: "var(--space-4)",
                  backgroundColor: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 255, 255, 0.06)",
                  borderRadius: "4px"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className="font-meta" style={{ fontSize: "11px", color: "var(--color-crimson)", fontWeight: "bold" }}>
                    ORDER #ZJ-9821
                  </span>
                  <span
                    style={{
                      fontSize: "10px",
                      padding: "2px 8px",
                      borderRadius: "2px",
                      backgroundColor: "rgba(74, 222, 128, 0.15)",
                      color: "#4ade80",
                      fontWeight: "bold"
                    }}
                  >
                    IN TRANSIT
                  </span>
                </div>

                <div style={{ marginTop: "12px", fontSize: "13px" }}>
                  <p style={{ color: "var(--color-white)", fontWeight: "bold" }}>ZENJI Cyber Oni Heavyweight Hoodie</p>
                  <p className="font-meta" style={{ color: "var(--color-mist)", fontSize: "11px", marginTop: "2px" }}>
                    Size: L • Color: Void Black • Qty: 1
                  </p>
                  <p className="font-meta" style={{ color: "var(--color-white)", fontSize: "12px", marginTop: "6px" }}>
                    Total: $110.00 USD
                  </p>
                </div>

                <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.06)", marginTop: "12px", paddingTop: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className="font-meta" style={{ fontSize: "11px", color: "var(--color-mist)" }}>
                    Tracking: DHL-88392190
                  </span>
                  <Link
                    href="/support"
                    onClick={closeProfile}
                    className="font-ui"
                    style={{ fontSize: "11px", color: "var(--color-crimson)", fontWeight: "bold", display: "flex", alignItems: "center", gap: "2px" }}
                  >
                    Track <ChevronRight size={12} />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer (Sign Out) */}
        <div
          style={{
            padding: "var(--space-4) var(--space-6)",
            borderTop: "1px solid var(--color-border-subtle)",
            backgroundColor: "#070707"
          }}
        >
          <button
            onClick={handleSignOut}
            className="font-ui"
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              border: "1px solid var(--color-border-strong)",
              borderRadius: "3px",
              color: "var(--color-white)",
              fontSize: "12px",
              fontWeight: "bold",
              letterSpacing: "1px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              transition: "background-color 0.2s"
            }}
          >
            <LogOut size={14} />
            <span>SIGN OUT</span>
          </button>
        </div>
      </div>
    </div>
  );
};
