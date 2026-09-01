"use client";

import React, { useState } from "react";

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({ items }) => {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%" }}>
      {items.map((item) => {
        const isOpen = openId === item.id;

        return (
          <div
            key={item.id}
            onClick={() => toggleItem(item.id)}
            style={{
              backgroundColor: isOpen ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.015)",
              border: isOpen ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(255,255,255,0.08)",
              borderRadius: "4px",
              cursor: "pointer",
              overflow: "hidden",
              transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
              backdropFilter: "blur(8px)"
            }}
          >
            {/* Question Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 20px",
                gap: "16px"
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: isOpen ? "var(--color-white)" : "rgba(255,255,255,0.85)",
                  letterSpacing: "0.5px",
                  lineHeight: 1.4,
                  transition: "color 0.2s ease"
                }}
              >
                {item.question}
              </span>

              <span
                style={{
                  fontSize: "20px",
                  fontWeight: 300,
                  color: isOpen ? "var(--color-crimson)" : "rgba(255,255,255,0.5)",
                  lineHeight: 1,
                  flexShrink: 0,
                  transition: "transform 0.2s ease, color 0.2s ease",
                  transform: isOpen ? "rotate(45deg)" : "rotate(0deg)"
                }}
              >
                +
              </span>
            </div>

            {/* Answer Body (Animated expansion) */}
            {isOpen && (
              <div
                style={{
                  padding: "0 20px 18px 20px",
                  borderTop: "1px solid rgba(255,255,255,0.05)",
                  paddingTop: "14px"
                }}
              >
                <p
                  className="font-body"
                  style={{
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.65)",
                    lineHeight: 1.7,
                    margin: 0
                  }}
                >
                  {item.answer}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
