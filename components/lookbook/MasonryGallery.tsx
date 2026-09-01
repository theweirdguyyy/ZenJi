"use client";

import React, { useState, useEffect, useMemo } from "react";
import { LookbookCard } from "./LookbookCard";
import { EditorialStoryCard } from "./EditorialStoryCard";
import { LookbookItem } from "@/data/lookbook";
import { Grid } from "lucide-react";

interface MasonryGalleryProps {
  items: LookbookItem[];
  activeFilter?: string;
  onFilterChange?: (filter: string) => void;
}

const FILTER_TABS = [
  { id: "ALL", label: "ALL" },
  { id: "STREET", label: "STREET" },
  { id: "DARK", label: "DARK" },
  { id: "WARRIOR", label: "WARRIOR" },
  { id: "CITY", label: "CITY" },
  { id: "LIMITED", label: "LIMITED" },
  { id: "SALE", label: "SALE" }
];

export const MasonryGallery: React.FC<MasonryGalleryProps> = ({ items }) => {
  const [activeTab, setActiveTab] = useState<string>("ALL");
  const [columnCount, setColumnCount] = useState<number>(4);

  // Responsive column calculation — full-width adaptive scaling
  useEffect(() => {
    const updateColumns = () => {
      const w = window.innerWidth;
      if (w >= 1600) {
        setColumnCount(5);
      } else if (w >= 1200) {
        setColumnCount(4);
      } else if (w >= 768) {
        setColumnCount(3);
      } else if (w >= 480) {
        setColumnCount(2);
      } else {
        setColumnCount(1);
      }
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  // Filter items
  const filteredItems = useMemo(() => {
    if (activeTab === "ALL") return items;
    return items.filter((item) => {
      if (activeTab === "SALE") {
        return item.type === "product" && item.badge === "SALE";
      }
      if (activeTab === "LIMITED") {
        return (
          (item.type === "product" && item.badge === "LIMITED") ||
          (item.type === "story" && item.category === "LIMITED")
        );
      }
      return item.category === activeTab || item.category === "ALL";
    });
  }, [items, activeTab]);

  // Shortest column packing algorithm: images flow into whichever column is currently shortest
  const columns = useMemo(() => {
    const cols: LookbookItem[][] = Array.from({ length: columnCount }, () => []);
    const heights: number[] = new Array(columnCount).fill(0);

    const stories = filteredItems.filter((i) => i.type === "story");
    const products = filteredItems.filter((i) => i.type === "product");

    const insertShortest = (item: LookbookItem) => {
      let minColIndex = 0;
      let minHeight = heights[0];
      for (let i = 1; i < columnCount; i++) {
        if (heights[i] < minHeight) {
          minHeight = heights[i];
          minColIndex = i;
        }
      }
      cols[minColIndex].push(item);
      const ratio = item.aspectRatio || (item.type === "story" ? 1.25 : 1.35);
      heights[minColIndex] += ratio;
    };

    if (columnCount === 1 || stories.length === 0) {
      filteredItems.forEach(insertShortest);
      return cols;
    }

    // Story target columns for Top-Left, Mid-Right, Lower-Left, Lower-Right, Bottom-Center anchors
    const storyTargetColumns = [
      0, // 01 Top-Left
      columnCount - 1, // 02 Mid-Right
      0, // 03 Lower-Left
      columnCount - 1, // 04 Lower-Right
      Math.floor(columnCount / 2) // 05 Bottom-Center
    ];

    const batchSize = Math.max(2, Math.floor(products.length / (stories.length + 1)));
    let productIndex = 0;

    stories.forEach((story, storyIdx) => {
      // 1. Place story card in designated rhythmic position
      const targetCol = storyTargetColumns[storyIdx % storyTargetColumns.length];
      cols[targetCol].push(story);
      heights[targetCol] += story.aspectRatio || 1.25;

      // 2. Flow next batch of product photos into the shortest column
      const nextBatchLimit = Math.min(products.length, productIndex + batchSize);
      while (productIndex < nextBatchLimit) {
        insertShortest(products[productIndex]);
        productIndex++;
      }
    });

    // 3. Flow all remaining product photos into shortest columns to pack tightly
    while (productIndex < products.length) {
      insertShortest(products[productIndex]);
      productIndex++;
    }

    return cols;
  }, [filteredItems, columnCount]);

  const productCount = useMemo(
    () => filteredItems.filter((i) => i.type === "product").length,
    [filteredItems]
  );

  return (
    <div style={{ width: "100%" }}>
      {/* ── FULL-WIDTH STICKY FILTER BAR ──────────────────────────── */}
      <div
        style={{
          width: "100%",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          backgroundColor: "rgba(5,5,5,0.92)",
          backdropFilter: "blur(12px)",
          position: "sticky",
          top: "64px",
          zIndex: 25
        }}
      >
        <div
          style={{
            width: "100%",
            padding: "0 clamp(16px, 2.5vw, 36px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
            overflowX: "auto",
            scrollbarWidth: "none"
          }}
        >
          {/* Tabs */}
          <div style={{ display: "flex", gap: "4px" }}>
            {FILTER_TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              const count =
                tab.id === "ALL"
                  ? items.length
                  : tab.id === "SALE"
                  ? items.filter((i) => i.type === "product" && i.badge === "SALE").length
                  : tab.id === "LIMITED"
                  ? items.filter(
                      (i) =>
                        (i.type === "product" && i.badge === "LIMITED") ||
                        (i.type === "story" && i.category === "LIMITED")
                    ).length
                  : items.filter((i) => i.category === tab.id).length;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: "14px 18px",
                    background: "none",
                    border: "none",
                    borderBottom: isActive
                      ? "2px solid var(--color-crimson)"
                      : "2px solid transparent",
                    color: isActive ? "var(--color-white)" : "rgba(255,255,255,0.45)",
                    fontFamily: "var(--font-ui)",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "2px",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    transition: "color 0.2s ease, border-color 0.2s ease"
                  }}
                >
                  {tab.label}
                  <span
                    style={{
                      fontSize: "9px",
                      opacity: isActive ? 0.9 : 0.4,
                      fontFamily: "monospace"
                    }}
                  >
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right indicator */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "rgba(255,255,255,0.4)",
              fontFamily: "var(--font-ui)",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "2px",
              padding: "6px 12px",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "2px",
              flexShrink: 0
            }}
          >
            <Grid size={11} /> {productCount} LOOKS &nbsp;•&nbsp; 5 CHAPTERS
          </div>
        </div>
      </div>

      {/* ── FULL-WIDTH PURE SHORTEST-COLUMN MASONRY GRID ───────────── */}
      <div
        style={{
          width: "100%",
          padding: "clamp(16px, 2vw, 32px) clamp(12px, 2vw, 24px)"
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "clamp(10px, 1.5vw, 18px)",
            alignItems: "flex-start",
            width: "100%"
          }}
        >
          {columns.map((col, colIdx) => (
            <div
              key={colIdx}
              style={{
                flex: 1,
                minWidth: 0,
                display: "flex",
                flexDirection: "column",
                gap: "clamp(10px, 1.5vw, 18px)"
              }}
            >
              {col.map((item) => {
                if (item.type === "story") {
                  return (
                    <EditorialStoryCard
                      key={item.id}
                      number={item.number}
                      title={item.title}
                      kanji={item.kanji}
                      description={item.description}
                      cta={item.cta}
                      ctaHref={item.ctaHref}
                    />
                  );
                }

                return (
                  <LookbookCard
                    key={item.id}
                    src={item.src}
                    frontSrc={item.frontSrc}
                    backSrc={item.backSrc}
                    modelSrc={item.modelSrc}
                    detailSrc={item.detailSrc}
                    initialView={item.initialView}
                    productSlug={item.productSlug}
                    productName={item.productName}
                    badge={item.badge}
                    altText={item.productName}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
