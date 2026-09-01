import React from "react";
import Image from "next/image";
import { Container } from "@/components/common/Container";
import { FaqAccordion, FaqItem } from "@/components/support/FaqAccordion";
import { Mail } from "lucide-react";

export const metadata = {
  title: "Support & FAQ — Frequently Asked Questions | ZENJI NEO KAGE",
  description:
    "Find answers to frequently asked questions about ZENJI drops, shipping, returns, sizing, and customer support."
};

const FAQ_ITEMS: FaqItem[] = [
  {
    id: "faq-1",
    question: "How do I stay updated on new drops?",
    answer:
      "Join the ZENJI Clan by subscribing to our email newsletter or following us on Instagram @zenjishop. Clan members receive exclusive 24-hour early access and password codes before public releases."
  },
  {
    id: "faq-2",
    question: "What is your shipping policy?",
    answer:
      "All orders are processed and dispatched within 24-48 business hours with tracked express courier service. You will receive an automated tracking link via email as soon as your parcel is on its way."
  },
  {
    id: "faq-3",
    question: "How long will it take to get my order?",
    answer:
      "Domestic deliveries arrive within 2-4 business days. International express shipments arrive within 4-7 business days depending on customs clearance in your region."
  },
  {
    id: "faq-4",
    question: "What is your return policy?",
    answer:
      "We offer a 14-day return window from the date of delivery for unworn garments in original condition with all tags and polybags intact. Limited-run drop archive pieces marked final sale are non-returnable."
  },
  {
    id: "faq-5",
    question: "Do you ship internationally?",
    answer:
      "Yes, we ship globally to over 60+ countries including the USA, UK, Canada, Australia, Europe, and Asia with full end-to-end tracking and customs clearance support."
  },
  {
    id: "faq-6",
    question: "How do I choose the right size?",
    answer:
      "All ZENJI tees are designed with an oversized, drop-shoulder boxy fit in 240GSM heavyweight cotton. We recommend selecting your normal true size for the intended streetwear silhouette, or sizing down once for a tailored classic fit."
  },
  {
    id: "faq-7",
    question: "How can I contact support?",
    answer:
      "You can reach our dedicated support team directly by emailing support@zenui.co. Our customer service team operates 7 days a week and responds to all inquiries within 12-24 hours."
  }
];

export default function SupportPage() {
  return (
    <div
      style={{
        backgroundColor: "var(--color-void)",
        color: "var(--color-white)",
        overflowX: "hidden",
        minHeight: "calc(100vh - 64px)",
        position: "relative",
        display: "flex",
        alignItems: "center"
      }}
    >
      {/* BACKGROUND ARTWORK */}
      <div style={{ position: "absolute", inset: 0 }}>
        <Image
          src="/FAQ_Background.png"
          alt="ZENJI Cyberpunk Character Art"
          fill
          style={{
            objectFit: "cover",
            objectPosition: "right 75%"
          }}
          priority
          quality={100}
          sizes="100vw"
        />
      </div>

      {/* Atmospheric Gradients: Darker on Left (FAQ) to clear on Right (Art) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(5,5,5,0.98) 0%, rgba(5,5,5,0.94) 45%, rgba(5,5,5,0.45) 75%, transparent 100%)"
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(5,5,5,0.5) 0%, transparent 20%, transparent 80%, rgba(5,5,5,0.9) 100%)"
        }}
      />

      {/* MAIN CONTENT CONTAINER */}
      <Container
        size="full"
        style={{
          position: "relative",
          zIndex: 2,
          paddingTop: "clamp(48px, 8vh, 80px)",
          paddingBottom: "clamp(48px, 8vh, 80px)",
          paddingLeft: "clamp(24px, 5vw, 80px)",
          paddingRight: "clamp(24px, 5vw, 80px)"
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "clamp(40px, 6vw, 80px)",
            alignItems: "flex-start"
          }}
        >
          {/*  LEFT COLUMN: FAQ TITLE & ACCORDION LIST */}
          <div style={{ maxWidth: "620px", width: "100%" }}>
            {/* Main Display Heading */}
            <h1
              className="font-display"
              style={{
                fontSize: "clamp(48px, 6.5vw, 84px)",
                fontWeight: 900,
                lineHeight: 0.95,
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "var(--color-white)",
                marginBottom: "6px"
              }}
            >
              FAQ
            </h1>

            {/* Subtitle */}
            <p
              className="font-meta"
              style={{
                fontSize: "11px",
                letterSpacing: "2.5px",
                color: "rgba(255,255,255,0.55)",
                fontWeight: 700,
                textTransform: "uppercase",
                marginBottom: "clamp(24px, 4vh, 36px)"
              }}
            >
              FREQUENTLY ASKED QUESTIONS
            </p>

            {/* Interactive Accordion */}
            <FaqAccordion items={FAQ_ITEMS} />
          </div>

          {/* RIGHT COLUMN: STILL HAVE QUESTIONS & EMAIL */}
          <div
            style={{
              maxWidth: "480px",
              paddingTop: "clamp(12px, 2vh, 24px)"
            }}
          >
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(28px, 3.2vw, 42px)",
                fontWeight: 900,
                lineHeight: 1.1,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: "var(--color-white)",
                marginBottom: "16px"
              }}
            >
              STILL HAVE QUESTIONS?
            </h2>

            <p
              className="font-body"
              style={{
                fontSize: "clamp(14px, 1.2vw, 15px)",
                color: "rgba(255,255,255,0.72)",
                lineHeight: 1.6,
                marginBottom: "clamp(24px, 3.5vh, 32px)"
              }}
            >
              We&apos;re here to help.<br />
              Reach out to our support<br />
              team anytime.
            </p>

            {/* Support Email Link with Circular Mail Icon */}
            <a
              href="mailto:soebshihab@gmail.com"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "14px",
                textDecoration: "none",
                color: "var(--color-white)",
                transition: "opacity 0.2s ease"
              }}
            >
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.35)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(255,255,255,0.03)",
                  flexShrink: 0
                }}
              >
                <Mail size={18} color="rgba(255,255,255,0.85)" />
              </div>

              <span
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: "clamp(15px, 1.3vw, 17px)",
                  fontWeight: 700,
                  letterSpacing: "0.5px",
                  color: "var(--color-white)"
                }}
              >
                support@zenji.co
              </span>
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}
