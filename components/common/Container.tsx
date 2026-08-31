import React from "react";
import { cn } from "@/lib/utils";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}

export const Container: React.FC<ContainerProps> = ({ children, size = "2xl", className, style, ...props }) => {
  const maxWidth =
    size === "sm"
      ? "var(--container-sm)"
      : size === "md"
      ? "var(--container-md)"
      : size === "lg"
      ? "var(--container-lg)"
      : size === "xl"
      ? "var(--container-xl)"
      : size === "2xl"
      ? "var(--container-2xl)"
      : "100%";

  return (
    <div
      className={cn(className)}
      style={{
        width: "100%",
        maxWidth,
        marginLeft: "auto",
        marginRight: "auto",
        paddingLeft: "var(--space-4)",
        paddingRight: "var(--space-4)",
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  padding?: "none" | "sm" | "md" | "lg";
}

export const Section: React.FC<SectionProps> = ({ children, padding = "md", className, style, ...props }) => {
  const paddingVertical =
    padding === "none"
      ? "0"
      : padding === "sm"
      ? "var(--space-8)"
      : padding === "lg"
      ? "var(--space-20)"
      : "var(--space-12)";

  return (
    <section
      className={cn(className)}
      style={{
        paddingTop: paddingVertical,
        paddingBottom: paddingVertical,
        ...style
      }}
      {...props}
    >
      {children}
    </section>
  );
};

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  accent?: boolean;
}

export const Divider: React.FC<DividerProps> = ({ accent = false, className, style, ...props }) => {
  return (
    <div
      className={cn(className)}
      style={{
        height: "1px",
        backgroundColor: accent ? "var(--color-crimson)" : "var(--color-border-subtle)",
        width: "100%",
        margin: "var(--space-6) 0",
        ...style
      }}
      {...props}
    />
  );
};
