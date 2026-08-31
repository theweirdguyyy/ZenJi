import React from "react";
import { cn } from "@/lib/utils";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({ width, height, className, style, ...props }) => {
  return (
    <div
      className={cn(className)}
      style={{
        backgroundColor: "var(--color-ink)",
        backgroundImage: "linear-gradient(90deg, var(--color-ink) 0%, #1e1e1e 50%, var(--color-ink) 100%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.5s infinite",
        width: width || "100%",
        height: height || "20px",
        borderRadius: "var(--radius-none)",
        ...style
      }}
      {...props}
    />
  );
};
