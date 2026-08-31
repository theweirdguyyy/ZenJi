"use client";

import React, { useEffect } from "react";
import { useUIStore } from "@/store/ui-store";
import { X, CheckCircle2, AlertCircle, Info } from "lucide-react";
import { IconButton } from "./IconButton";

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useUIStore();

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      style={{
        position: "fixed",
        bottom: "var(--space-6)",
        right: "var(--space-6)",
        zIndex: "var(--z-toast)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-3)",
        maxWidth: "380px",
        width: "calc(100vw - 48px)"
      }}
    >
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onClose={() => removeToast(t.id)} />
      ))}
    </div>
  );
};

interface ToastItemProps {
  toast: { id: string; message: string; type?: "info" | "success" | "error"; duration?: number };
  onClose: () => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, toast.duration || 3000);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  const icon =
    toast.type === "success" ? (
      <CheckCircle2 size={18} style={{ color: "var(--color-crimson)" }} />
    ) : toast.type === "error" ? (
      <AlertCircle size={18} style={{ color: "var(--color-ember)" }} />
    ) : (
      <Info size={18} style={{ color: "var(--color-mist)" }} />
    );

  return (
    <div
      className="hud-border"
      style={{
        backgroundColor: "var(--color-ink)",
        color: "var(--color-white)",
        padding: "var(--space-3) var(--space-4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "var(--space-3)",
        boxShadow: "var(--shadow-md)"
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
        {icon}
        <span className="font-ui" style={{ fontSize: "var(--font-size-sm)" }}>
          {toast.message}
        </span>
      </div>
      <IconButton aria-label="Dismiss notification" onClick={onClose} size="sm">
        <X size={16} />
      </IconButton>
    </div>
  );
};
