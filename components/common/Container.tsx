import React from "react";
import { cn } from "@/lib/utils";
import styles from "./Container.module.css";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}

export const Container: React.FC<ContainerProps> = ({
  children,
  size = "2xl",
  className,
  style,
  ...props
}) => {
  const sizeClass =
    size === "sm"
      ? styles.containerSm
      : size === "md"
      ? styles.containerMd
      : size === "lg"
      ? styles.containerLg
      : size === "xl"
      ? styles.containerXl
      : size === "2xl"
      ? styles.container2xl
      : styles.containerFull;

  return (
    <div
      className={cn(styles.container, sizeClass, className)}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
};

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  padding?: "none" | "sm" | "md" | "lg";
}

export const Section: React.FC<SectionProps> = ({
  children,
  padding = "md",
  className,
  style,
  ...props
}) => {
  const paddingClass =
    padding === "none"
      ? styles.sectionNone
      : padding === "sm"
      ? styles.sectionSm
      : padding === "lg"
      ? styles.sectionLg
      : styles.sectionMd;

  return (
    <section
      className={cn(styles.section, paddingClass, className)}
      style={style}
      {...props}
    >
      {children}
    </section>
  );
};

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  accent?: boolean;
}

export const Divider: React.FC<DividerProps> = ({
  accent = false,
  className,
  style,
  ...props
}) => {
  return (
    <div
      className={cn(styles.divider, accent && styles.dividerAccent, className)}
      style={style}
      {...props}
    />
  );
};
