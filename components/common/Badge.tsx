import React from "react";
import styles from "./Badge.module.css";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "hud" | "crimson" | "ember" | "outline";
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = "hud", className, ...props }) => {
  return (
    <span className={cn(styles.badge, styles[variant], className)} {...props}>
      {children}
    </span>
  );
};
