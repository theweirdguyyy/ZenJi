import React from "react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, className, id, ...props }, ref) => {
    const selectId = id || (label ? `select-${label.toLowerCase().replace(/\s+/g, "-")}` : undefined);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
        {label && (
          <label
            htmlFor={selectId}
            className="font-meta"
            style={{ color: "var(--color-mist)", fontSize: "var(--font-size-xs)" }}
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={cn(className)}
          style={{
            backgroundColor: "var(--color-ink)",
            color: "var(--color-white)",
            border: error ? "1px solid var(--color-crimson)" : "1px solid var(--color-border-strong)",
            padding: "var(--space-3) var(--space-4)",
            fontSize: "var(--font-size-sm)",
            fontFamily: "var(--font-ui)",
            borderRadius: "var(--radius-none)",
            cursor: "pointer"
          }}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} style={{ backgroundColor: "var(--color-ink)" }}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && (
          <span className="font-meta" style={{ color: "var(--color-crimson)", fontSize: "var(--font-size-xs)" }}>
            {error}
          </span>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";
