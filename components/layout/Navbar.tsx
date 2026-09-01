import React from "react";
import Link from "next/link";
import { Container } from "@/components/common/Container";
import { NavbarNavLinks } from "./NavbarNavLinks";
import { NavbarClientControls } from "./NavbarClientControls";
import styles from "./Navbar.module.css";

export const Navbar: React.FC = () => {
  return (
    <header className={styles.navbar}>
      <Container size="full">
        <div className={styles.inner}>
          {/* Brand Logo */}
          <Link href="/" className={styles.logo} aria-label="ZENJI Homepage">
            ZENJI <span className={styles.logoDot} />
          </Link>

          {/* Desktop Navigation Links */}
          <NavbarNavLinks />

          {/* Right Control Actions (Client Component) */}
          <NavbarClientControls />
        </div>
      </Container>
    </header>
  );
};
