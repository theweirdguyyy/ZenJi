"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Container } from "@/components/common/Container";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SlideInfo {
  id: number;
  bgImage: string;
  titlePart1: string;
  titleHighlight: string;
  subtitle: string;
  buttonText: string;
  buttonHref: string;
}

const SLIDES: SlideInfo[] = [
  {
    id: 1,
    bgImage: "/Hero_Background.png",
    titlePart1: "WEAR \nTHE ",
    titleHighlight: "LEGEND",
    subtitle: "Anime inspired. Streetwear redefined. Limited drops.",
    buttonText: "EXPLORE DROP",
    buttonHref: "/collection"
  },
  {
    id: 2,
    bgImage: "/hero_bg2.png",
    titlePart1: "ZENJI \n",
    titleHighlight: "MINDSET",
    subtitle: "Not just a name. It's a mindset. Limited drops.",
    buttonText: "EXPLORE DROP",
    buttonHref: "/collection"
  }
];

export const HeroSlider: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const touchStartX = useRef<number | null>(null);

  // Auto-play timer: cycles every 7 seconds when user is not hovering
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % SLIDES.length);
    }, 7000);

    return () => clearInterval(timer);
  }, [isPaused]);

  const goToSlide = (index: number) => {
    setCurrentSlideIndex(index);
  };

  const nextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  // Touch swipe gesture handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    touchStartX.current = null;
  };

  return (
    <section
      aria-label="Hero featured drops showcase"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        position: "relative",
        width: "100%",
        minHeight: "calc(100vh - 64px)",
        backgroundColor: "#070707",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        paddingTop: "var(--space-12)",
        paddingBottom: "var(--space-16)"
      }}
    >
      {/* Background Image Layers with Smooth Crossfade */}
      {SLIDES.map((slide, idx) => {
        const isActive = idx === currentSlideIndex;
        return (
          <div
            key={slide.id}
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url('${slide.bgImage}')`,
              backgroundSize: "cover",
              backgroundPosition: "center top",
              opacity: isActive ? 1 : 0,
              transition: "opacity 0.75s cubic-bezier(0.4, 0, 0.2, 1)",
              zIndex: 1,
              pointerEvents: "none"
            }}
          />
        );
      })}

      {/* Main Content Area: Perfectly Identical Coordinates and Layout */}
      <Container size="full" style={{ position: "relative", zIndex: 5 }}>
        <div style={{ maxWidth: "600px", position: "relative" }}>
          {/* Slide Text Content Container */}
          <div style={{ position: "relative", minHeight: "260px" }}>
            {SLIDES.map((slide, idx) => {
              const isActive = idx === currentSlideIndex;
              return (
                <div
                  key={slide.id}
                  style={{
                    position: idx === 0 ? "relative" : "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? "translateY(0)" : "translateY(8px)",
                    pointerEvents: isActive ? "auto" : "none",
                    transition:
                      "opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
                  }}
                >
                  <h1
                    className="font-display"
                    style={{
                      fontSize: "clamp(42px, 7vw, 76px)",
                      fontWeight: 900,
                      lineHeight: 1.0,
                      letterSpacing: "2px",
                      marginBottom: "var(--space-6)",
                      textTransform: "uppercase",
                      color: "var(--color-white)",
                      whiteSpace: "pre-line"
                    }}
                  >
                    {slide.titlePart1}
                    <span style={{ color: "var(--color-crimson)", fontStyle: "italic" }}>
                      {slide.titleHighlight}
                    </span>
                  </h1>

                  <p
                    className="font-body"
                    style={{
                      fontSize: "clamp(15px, 2vw, 18px)",
                      color: "var(--color-mist)",
                      marginBottom: "var(--space-8)",
                      lineHeight: 1.5,
                      maxWidth: "480px"
                    }}
                  >
                    {slide.subtitle}
                  </p>

                  <div>
                    <Link
                      href={slide.buttonHref}
                      style={{
                        display: "inline-block",
                        backgroundColor: "var(--color-crimson)",
                        color: "var(--color-white)",
                        fontFamily: "var(--font-ui)",
                        fontSize: "var(--font-size-xs)",
                        fontWeight: "var(--weight-bold)",
                        letterSpacing: "var(--tracking-widest)",
                        padding: "var(--space-4) var(--space-8)",
                        borderRadius: "2px",
                        textDecoration: "none",
                        transition: "opacity 0.2s, transform 0.15s ease",
                        textTransform: "uppercase"
                      }}
                    >
                      {slide.buttonText}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Slider Indicators & Navigation Controls (Fixed Location) */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-4)",
              marginTop: "var(--space-10)"
            }}
          >
            {/* Slide Index Number */}
            <span
              className="font-meta"
              style={{
                fontSize: "var(--font-size-xs)",
                color: "var(--color-mist)",
                minWidth: "20px"
              }}
            >
              0{currentSlideIndex + 1}
            </span>

            {/* Clickable Indicator Bars */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              {SLIDES.map((slide, idx) => {
                const isActive = idx === currentSlideIndex;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    aria-label={`Switch to slide 0${idx + 1}`}
                    onClick={() => goToSlide(idx)}
                    style={{
                      width: "24px",
                      height: "3px",
                      backgroundColor: isActive ? "var(--color-crimson)" : "rgba(255, 255, 255, 0.2)",
                      borderRadius: "2px",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      transition: "backgroundColor 0.3s ease, transform 0.2s ease"
                    }}
                  />
                );
              })}
            </div>

            {/* Previous & Next Chevron Controls */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginLeft: "8px" }}>
              <button
                type="button"
                aria-label="Previous slide"
                onClick={prevSlide}
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  color: "var(--color-white)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "background-color 0.2s"
                }}
              >
                <ChevronLeft size={14} />
              </button>
              <button
                type="button"
                aria-label="Next slide"
                onClick={nextSlide}
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  color: "var(--color-white)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "background-color 0.2s"
                }}
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
