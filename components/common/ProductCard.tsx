"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";
import { useWishlistStore } from "@/store/wishlist-store";
import { useCartStore } from "@/store/cart-store";
import { useUIStore } from "@/store/ui-store";
import { Heart, ShoppingBag } from "lucide-react";
import styles from "./ProductCard.module.css";

export interface ProductCardProps {
  product: Product;
  theme?: "dark" | "light";
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, theme = "dark" }) => {
  const isSale = product.compareAtPrice && product.compareAtPrice > product.price;
  const isNew = product.badges?.includes("NEW");

  const { productIds, toggleWishlist } = useWishlistStore();
  const addItem = useCartStore((state) => state.addItem);
  const addToast = useUIStore((state) => state.addToast);

  const isWishlisted = productIds.includes(product.id);

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    addToast(
      isWishlisted ? `Removed "${product.name}" from wishlist` : `Added "${product.name}" to wishlist`,
      "info"
    );
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultColor = product.colors[0] || { name: "BLACK", hex: "#070707" };
    const defaultSize = product.sizes[0] || "M";
    addItem(product, defaultColor, defaultSize, 1);
    addToast(`Added "${product.name}" to cart`, "success");
  };

  return (
    <Link
      href={`/product/${product.slug}`}
      className={`${styles.card} ${theme === "light" ? styles.cardLight : ""}`}
    >
      <div className={styles.imageContainer}>
        {isSale && <span className={styles.badgeSale}>SALE</span>}
        {!isSale && isNew && <span className={styles.badgeNew}>NEW</span>}

        {/* Wishlist Button */}
        <button
          type="button"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className={`${styles.wishlistBtn} ${isWishlisted ? styles.wishlistActive : ""}`}
          onClick={handleWishlist}
        >
          <Heart
            size={16}
            fill={isWishlisted ? "var(--color-crimson)" : "none"}
            stroke={isWishlisted ? "var(--color-crimson)" : "currentColor"}
          />
        </button>

        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className={`${styles.image} ${styles.primaryImage}`}
          priority={false}
        />

        {product.images[1] && (
          <Image
            src={product.images[1]}
            alt={`${product.name} alternate view`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className={`${styles.image} ${styles.secondaryImage}`}
            priority={false}
          />
        )}

        {/* Quick Add To Cart Button */}
        <button
          type="button"
          aria-label={`Quick add ${product.name} to cart`}
          className={styles.quickAddBtn}
          onClick={handleAddToCart}
        >
          <ShoppingBag size={14} />
          <span>ADD TO CART</span>
        </button>
      </div>

      <div className={styles.info}>
        <h3 className={styles.title}>{product.name}</h3>
        <div className={styles.priceRow}>
          <span className={styles.price}>
            ${product.price.toFixed(2)}
          </span>
          {isSale && product.compareAtPrice && (
            <span className={styles.comparePrice}>
              ${product.compareAtPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};
