import React from "react";
import { cn } from "@/lib/utils";

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  "aria-label": string; // Enforce explicit accessibility label
  variant?: "ghost" | "solid" | "outlined";
  size?: "sm" | "md" | "lg";
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ "aria-label": ariaLabel, children, variant = "ghost", size = "md", className, ...props }, ref) => {
    const sizeStyle =
      size === "sm"
        ? { width: "32px", height: "32px", fontSize: "0.875rem" }
        : size === "lg"
        ? { width: "48px", height: "48px", fontSize: "1.25rem" }
        : { width: "40px", height: "40px", fontSize: "1rem" };

    const variantStyle =
      variant === "solid"
        ? { backgroundColor: "var(--color-ink)", border: "1px solid var(--color-border-subtle)" }
        : variant === "outlined"
        ? { backgroundColor: "transparent", border: "1px solid var(--color-border-strong)" }
        : { backgroundColor: "transparent", border: "none" };

    return (
      <button
        ref={ref}
        aria-label={ariaLabel}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--color-white)",
          cursor: "pointer",
          borderRadius: "0px",
          transition: "all var(--transition-fast)",
          ...sizeStyle,
          ...variantStyle
        }}
        className={cn(className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

IconButton.displayName = "IconButton";
