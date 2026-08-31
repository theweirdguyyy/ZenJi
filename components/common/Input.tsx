import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id || (label ? `input-${label.toLowerCase().replace(/\s+/g, "-")}` : undefined);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
        {label && (
          <label
            htmlFor={inputId}
            className="font-meta"
            style={{ color: "var(--color-mist)", fontSize: "var(--font-size-xs)" }}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(className)}
          style={{
            backgroundColor: "var(--color-ink)",
            color: "var(--color-white)",
            border: error ? "1px solid var(--color-crimson)" : "1px solid var(--color-border-strong)",
            padding: "var(--space-3) var(--space-4)",
            fontSize: "var(--font-size-sm)",
            fontFamily: "var(--font-ui)",
            borderRadius: "var(--radius-none)",
            transition: "border-color var(--transition-fast)"
          }}
          {...props}
        />
        {error && (
          <span className="font-meta" style={{ color: "var(--color-crimson)", fontSize: "var(--font-size-xs)" }}>
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
