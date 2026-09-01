"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  defaultOpenIds?: string[];
  allowMultiple?: boolean;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({ items, defaultOpenIds = [], allowMultiple = false, className }) => {
  const [openIds, setOpenIds] = useState<string[]>(defaultOpenIds);

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={cn(className)} style={{ borderTop: "1px solid var(--color-border-subtle)" }}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        return (
          <div key={item.id} style={{ borderBottom: "1px solid var(--color-border-subtle)" }}>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => toggleItem(item.id)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "var(--space-4) 0",
                color: "var(--color-white)",
                cursor: "pointer",
                textAlign: "left"
              }}
            >
              <span className="font-ui" style={{ fontSize: "var(--font-size-base)", fontWeight: "var(--weight-semibold)" }}>
                {item.title}
              </span>
              <ChevronDown
                size={18}
                style={{
                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform var(--transition-normal)"
                }}
              />
            </button>
            {isOpen && (
              <div style={{ paddingBottom: "var(--space-4)", color: "var(--color-mist)", fontSize: "var(--font-size-sm)" }}>
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
