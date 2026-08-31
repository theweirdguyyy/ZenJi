"use client";

import React from "react";
import { useCartStore } from "@/store/cart-store";
import styles from "./Navbar.module.css";

export const CartCounterBadge: React.FC = () => {
  const count = useCartStore((state) => state.getItemCount());

  if (count === 0) return null;

  return (
    <span
      className={styles.cartBadge}
      aria-label={`${count} items in cart`}
    >
      {count}
    </span>
  );
};
