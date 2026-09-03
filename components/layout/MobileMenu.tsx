"use client";

import React from "react";
import Link from "next/link";
import { useUIStore } from "@/store/ui-store";
import { Badge } from "@/components/common/Badge";

export const MobileMenu: React.FC = () => {
  const { isMobileMenuOpen, closeMobileMenu } = useUIStore();

  if (!isMobileMenuOpen) return null;

  const links = [
    { href: "/", label: "HOME", jp: "ホーム" },
    { href: "/collection", label: "COLLECTION", jp: "コレクション" },
    { href: "/lookbook", label: "LOOKBOOK", jp: "ルックブック" },
    { href: "/story", label: "OUR STORY", jp: "私たちについて" },
    { href: "/support", label: "SUPPORT", jp: "サポート" }
  ];

  return (
    <div
      style={{
        position: "fixed",
        top: "clamp(56px, 8vw, 64px)",
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "var(--color-void)",
        zIndex: "var(--z-fixed)",
        padding: "var(--space-8) var(--space-6)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderTop: "1px solid var(--color-border-subtle)"
      }}
    >
      <nav>
        <div style={{ marginBottom: "var(--space-6)" }}>
          <Badge variant="ember">ACTIVE DROP 07</Badge>
        </div>
        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={closeMobileMenu}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  color: "var(--color-white)"
                }}
              >
                <span className="font-display" style={{ fontSize: "var(--font-size-3xl)" }}>
                  {link.label}
                </span>
                <span className="font-meta" style={{ color: "var(--color-text-muted)" }}>
                  {link.jp}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div style={{ borderTop: "1px solid var(--color-border-subtle)", paddingTop: "var(--space-4)" }}>
        <p className="font-meta" style={{ color: "var(--color-mist)", fontSize: "var(--font-size-xs)" }}>
          ZENJI NEO KAGE • TOKYO / GLOBAL
        </p>
      </div>
    </div>
  );
};
