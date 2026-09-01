"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";

const NAV_ITEMS = [
  { href: "/shop", label: "SHOP" },
  { href: "/collection", label: "COLLECTION" },
  { href: "/lookbook", label: "LOOKBOOK" },
  { href: "/story", label: "STORY" },
  { href: "/support", label: "SUPPORT" }
];

export const NavbarNavLinks: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav aria-label="Main Navigation">
      <ul className={styles.navLinks}>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
          return (
            <li key={item.href} style={{ position: "relative" }}>
              <Link
                href={item.href}
                className={`${styles.navLink} ${isActive ? styles.navLinkActive : ""}`}
              >
                {item.label}
              </Link>
              {isActive && <div className={styles.activeIndicator} />}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
