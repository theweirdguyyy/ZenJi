"use client";

import React from "react";
import { Search, User, ShoppingBag, Menu, X } from "lucide-react";
import { IconButton } from "@/components/common/IconButton";
import { CartCounterBadge } from "./CartCounterBadge";
import { useCartStore } from "@/store/cart-store";
import { useUIStore } from "@/store/ui-store";
import { NavbarSearch } from "./NavbarSearch";
import styles from "./Navbar.module.css";

export const NavbarMobileToggle: React.FC = () => {
  const { isMobileMenuOpen, toggleMobileMenu } = useUIStore();
  return (
    <div className={styles.mobileToggleLeft}>
      <IconButton
        aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
        onClick={toggleMobileMenu}
        size="sm"
      >
        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </IconButton>
    </div>
  );
};

export const NavbarClientControls: React.FC = () => {
  const toggleCart = useCartStore((state) => state.toggleCart);
  const { isMobileMenuOpen, toggleMobileMenu, openProfile } = useUIStore();

  return (
    <div className={styles.controls}>
      {/* Inline Navbar Search */}
      <NavbarSearch />

      <IconButton aria-label="Account" onClick={openProfile} size="sm">
        <User size={18} />
      </IconButton>

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
