"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/common/Container";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./HeroSlider.module.css";

interface SlideInfo {
  id: number;
  bgImage: string;
  bgImageMobile: string;
  titlePart1: string;
  titleHighlight: string;
  subtitle: string;
  buttonText: string;
  buttonHref: string;
}

const SLIDES: SlideInfo[] = [
  {
    id: 1,
    bgImage: "/Hero_bg-1.png",
    bgImageMobile: "/Hero_bg-1-mobile.png",
    titlePart1: "WEAR \nTHE ",
    titleHighlight: "LEGEND",
    subtitle: "Anime inspired. Streetwear redefined. Limited drops.",
    buttonText: "EXPLORE DROP",
    buttonHref: "/collection"
  },
  {
    id: 2,
    bgImage: "/Hero_bg-3.png",
    bgImageMobile: "/Hero_bg-3-mobile.png",
    titlePart1: "ZENJI \n",
    titleHighlight: "MINDSET",
    subtitle: "Not just a name. It's a mindset. Limited drops.",
    buttonText: "EXPLORE DROP",
    buttonHref: "/collection"
  },
  {
    id: 3,
    bgImage: "/Hero_bg-2.png",
    bgImageMobile: "/Hero_bg-2-mobile.png",
    titlePart1: "SHADOW \nCLAN ",
    titleHighlight: "REIGN",
    subtitle: "Forged in darkness. Worn with honor. Exclusive pieces.",
    buttonText: "EXPLORE DROP",
    buttonHref: "/collection"
  },
  {
    id: 4,
    bgImage: "/Hero_bg-4.png",
    bgImageMobile: "/Hero_bg-4-mobile.png",
    titlePart1: "UNLEASH \nTHE ",
    titleHighlight: "SPIRIT",
    subtitle: "Heavyweight craft meets futuristic cyber-streetwear.",
    buttonText: "EXPLORE DROP",
    buttonHref: "/collection"
  }
];

export const HeroSlider: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const touchStartX = useRef<number | null>(null);

  // Auto-play timer: cycles every 6 seconds when not hovering
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % SLIDES.length);
    }, 6000);

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
      className={styles.heroSection}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Image Layers with Smooth Crossfade */}
      {SLIDES.map((slide, idx) => {
        const isActive = idx === currentSlideIndex;
        return (
          <div
            key={slide.id}
            className={styles.bgLayer}
            style={{
              opacity: isActive ? 1 : 0,
              zIndex: 1
            }}
          >
            {/* Desktop Background Layer */}
            <div className={styles.bgDesktop}>
              <Image
                src={slide.bgImage}
                alt={slide.titleHighlight}
                fill
                priority={idx === 0}
                unoptimized
                style={{
                  objectFit: "cover",
                  objectPosition: "center center",
                  width: "100%",
                  height: "100%"
                }}
                sizes="100vw"
              />
            </div>

            {/* Mobile Background Layer (Both models visible in middle/upper area) */}
            <div className={styles.bgMobile}>
              <Image
                src={slide.bgImageMobile || slide.bgImage}
                alt={slide.titleHighlight}
                fill
                priority={idx === 0}
                unoptimized
                style={{
                  objectFit: "cover",
                  objectPosition: "center top",
                  width: "100%",
                  height: "100%"
                }}
                sizes="100vw"
              />
            </div>
          </div>
        );
      })}

      {/* Main Content Area */}
      <Container size="full" className={styles.contentContainer}>
        <div className={styles.contentWrapper}>
          {/* Subtle radial dark glow behind the text block (Desktop) */}
          <div className={styles.radialGlow} />

          {/* Slide Text Content Container */}
          <div className={styles.textBlock}>
            {SLIDES.map((slide, idx) => {
              const isActive = idx === currentSlideIndex;
              return (
                <div
                  key={slide.id}
                  className={idx === 0 ? `${styles.slideItem} ${styles.slideItemFirst}` : styles.slideItem}
                  style={{
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? "translateY(0)" : "translateY(10px)",
                    pointerEvents: isActive ? "auto" : "none"
                  }}
                >
                  <h1 className={styles.slideTitle}>
                    {slide.titlePart1}
                    <span className={styles.titleHighlight}>
                      {slide.titleHighlight}
                    </span>
                  </h1>

                  <p className={styles.slideSubtitle}>
                    {slide.subtitle}
                  </p>

                  <div>
                    <Link
                      href={slide.buttonHref}
                      className={styles.ctaButton}
                    >
                      <span>{slide.buttonText}</span>
                      <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Slider Indicators & Navigation Controls */}
          <div className={styles.controlsBar}>
            {/* Left: Slide Index Number & Clickable Indicator Bars */}
            <div className={styles.controlsLeft}>
              <span className={styles.slideNumber}>
                0{currentSlideIndex + 1}
              </span>

              <div className={styles.indicatorsGroup}>
                {SLIDES.map((slide, idx) => {
                  const isActive = idx === currentSlideIndex;
                  return (
                    <button
                      key={slide.id}
                      type="button"
                      aria-label={`Switch to slide 0${idx + 1}`}
                      onClick={() => goToSlide(idx)}
                      className={styles.indicatorBar}
                      style={{
                        backgroundColor: isActive
                          ? "var(--color-crimson)"
                          : "rgba(255, 255, 255, 0.2)"
                      }}
                    />
                  );
                })}
              </div>
            </div>

            {/* Right: Previous & Next Chevron Controls */}
            <div className={styles.arrowsGroup}>
              <button
                type="button"
                aria-label="Previous slide"
                onClick={prevSlide}
                className={styles.arrowBtn}
              >
                <ChevronLeft size={14} />
              </button>
              <button
                type="button"
                aria-label="Next slide"
                onClick={nextSlide}
                className={styles.arrowBtn}
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
