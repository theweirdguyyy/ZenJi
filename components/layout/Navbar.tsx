import React from "react";
import Link from "next/link";
import { Container } from "@/components/common/Container";
import { Badge } from "@/components/common/Badge";
import { NavbarClientControls } from "./NavbarClientControls";
import styles from "./Navbar.module.css";

export const Navbar: React.FC = () => {
  return (
    <header className={styles.navbar}>
      <Container size="2xl">
        <div className={styles.inner}>
          {/* Brand Logo */}
          <Link href="/" className={styles.logo} aria-label="ZENJI Homepage">
            ZENJI <span className={styles.logoDot} />
          </Link>

          {/* Desktop Navigation Links */}
          <nav aria-label="Main Navigation">
            <ul className={styles.navLinks}>
              <li>
                <Link href="/shop" className={styles.navLink}>
                  SHOP
                </Link>
              </li>
              <li>
                <Link href="/collection" className={styles.navLink}>
                  COLLECTION
                </Link>
              </li>
              <li>
                <Link href="/lookbook" className={styles.navLink}>
                  LOOKBOOK
                </Link>
              </li>
              <li>
                <Link href="/story" className={styles.navLink}>
                  STORY
                </Link>
              </li>
              <li>
                <Link href="/support" className={styles.navLink}>
                  SUPPORT
                </Link>
              </li>
            </ul>
          </nav>

          {/* Right Control Actions (Client Component) */}
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
            <div style={{ display: "none" }}>
              <Badge variant="hud">DROP 07</Badge>
            </div>
            <NavbarClientControls />
          </div>
        </div>
      </Container>
    </header>
  );
};
