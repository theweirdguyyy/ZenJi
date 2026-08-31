"use client";

import React from "react";
import { Search, ShoppingBag, Heart, Menu, X } from "lucide-react";
import { IconButton } from "@/components/common/IconButton";
import { CartCounterBadge } from "./CartCounterBadge";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { useUIStore } from "@/store/ui-store";
import styles from "./Navbar.module.css";

export const NavbarClientControls: React.FC = () => {
  const toggleCart = useCartStore((state) => state.toggleCart);
  const wishlistCount = useWishlistStore((state) => state.productIds.length);
  const { isMobileMenuOpen, toggleMobileMenu, openSearch } = useUIStore();

  return (
    <div className={styles.controls}>
      <IconButton aria-label="Open product search" onClick={openSearch} size="sm">
        <Search size={18} />
      </IconButton>

      <div style={{ position: "relative" }}>
        <IconButton aria-label={`View wishlist (${wishlistCount} items)`} size="sm">
          <Heart size={18} />
        </IconButton>
        {wishlistCount > 0 && (
          <span className={styles.cartBadge} style={{ backgroundColor: "var(--color-ink)", border: "1px solid var(--color-crimson)" }}>
            {wishlistCount}
          </span>
        )}
      </div>

      <div className={styles.cartButton}>
        <IconButton aria-label="Open shopping cart" onClick={toggleCart} size="sm">
          <ShoppingBag size={18} />
        </IconButton>
        <CartCounterBadge />
      </div>

      <div className={styles.mobileMenuBtn}>
        <IconButton
          aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
          onClick={toggleMobileMenu}
          size="sm"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </IconButton>
      </div>
    </div>
  );
};
