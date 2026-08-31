"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { IconButton } from "./IconButton";
import { cn } from "@/lib/utils";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, className }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: "var(--z-modal)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--space-4)"
      }}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "var(--color-bg-overlay)",
          backdropFilter: "blur(4px)",
          zIndex: "var(--z-modal-backdrop)"
        }}
        aria-hidden="true"
      />

      {/* Modal Dialog Content */}
      <div
        className={cn("hud-border", className)}
        style={{
          position: "relative",
          zIndex: "var(--z-modal)",
          backgroundColor: "var(--color-ink)",
          color: "var(--color-white)",
          width: "100%",
          maxWidth: "540px",
          padding: "var(--space-6)",
          boxShadow: "var(--shadow-lg)"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "var(--space-4)" }}>
          {title && <h2 className="font-display" style={{ fontSize: "var(--font-size-xl)" }}>{title}</h2>}
          <IconButton aria-label="Close dialog" onClick={onClose} size="sm">
            <X size={20} />
          </IconButton>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};
