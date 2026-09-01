"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronDown, Check } from "lucide-react";

// ── Mock cart items for demo ────────────────────────────────────────────────
const CART_ITEMS = [
  {
    id: "1",
    name: "Shadow Clan Hoodie",
    variant: "Black / M",
    price: 89.0,
    image: "https://res.cloudinary.com/diqbikizp/image/upload/f_auto,q_auto/zenji/products/Domain-expansion-5.webp"
  },
  {
    id: "2",
    name: "Ronin Oversized Tee",
    variant: "Black / L",
    price: 69.0,
    image: "https://res.cloudinary.com/diqbikizp/image/upload/f_auto,q_auto/zenji/products/Warrior-spirit-5.webp"
  }
];

const SHIPPING_COST = 9.99;
const subtotal = CART_ITEMS.reduce((sum, item) => sum + item.price, 0);
const total = subtotal + SHIPPING_COST;

const STEPS = [
  { number: "01", label: "CONTACT" },
  { number: "02", label: "SHIPPING" },
  { number: "03", label: "PAYMENT" }
];

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
  "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
  "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
  "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia",
  "Wisconsin", "Wyoming"
];

const COUNTRIES = [
  "United States", "Australia", "Canada", "United Kingdom", "Germany",
  "France", "Japan", "Singapore", "New Zealand", "Netherlands"
];

// ── Input & Select components ──────────────────────────────────────────────
const inputStyle: React.CSSProperties = {
  width: "100%",
  backgroundColor: "var(--color-void)",
  border: "1px solid rgba(255,255,255,0.15)",
  borderRadius: "3px",
  padding: "13px 16px",
  color: "var(--color-white)",
  fontFamily: "var(--font-body)",
  fontSize: "14px",
  outline: "none",
  transition: "border-color 0.2s ease",
  boxSizing: "border-box"
};

const labelStyle: React.CSSProperties = {
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "2px",
  color: "rgba(255,255,255,0.55)",
  textTransform: "uppercase",
  marginBottom: "10px",
  display: "block",
  fontFamily: "var(--font-ui)"
};

export default function CheckoutPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [emailsOffers, setEmailsOffers] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [country, setCountry] = useState("United States");
  const [state, setState] = useState("");

  return (
    <div
      style={{
        backgroundColor: "var(--color-void)",
        color: "var(--color-white)",
        minHeight: "calc(100vh - 64px)",
        padding: "clamp(32px, 5vw, 64px) clamp(16px, 4vw, 60px)"
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 0.85fr)",
          gap: "clamp(24px, 4vw, 64px)",
          alignItems: "flex-start"
        }}
      >

        {/* ── LEFT COLUMN: FORM ─────────────────────────────────── */}
        <div>
          {/* Step Progress Bar */}
          <div style={{ marginBottom: "clamp(28px, 4vw, 40px)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0", position: "relative" }}>
              {STEPS.map((step, idx) => {
                const isActive = idx === activeStep;
                const isDone = idx < activeStep;

                return (
                  <React.Fragment key={step.number}>
                    <button
                      onClick={() => idx <= activeStep && setActiveStep(idx)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: idx <= activeStep ? "pointer" : "default",
                        padding: 0,
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        whiteSpace: "nowrap"
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-ui)",
                          fontSize: "11px",
                          fontWeight: 700,
                          letterSpacing: "1.5px",
                          color: isActive
                            ? "var(--color-crimson)"
                            : isDone
                            ? "rgba(255,255,255,0.5)"
                            : "rgba(255,255,255,0.3)"
                        }}
                      >
                        {step.number}. {step.label}
                      </span>
                    </button>

                    {idx < STEPS.length - 1 && (
                      <div
                        style={{
                          flex: 1,
                          margin: "0 12px",
                          position: "relative",
                          height: "2px",
                          backgroundColor: "rgba(255,255,255,0.12)"
                        }}
                      >
                        {isDone && (
                          <div
                            style={{
                              position: "absolute",
                              inset: 0,
                              backgroundColor: "var(--color-crimson)"
                            }}
                          />
                        )}
                        {isActive && (
                          <div
                            style={{
                              position: "absolute",
                              inset: 0,
                              width: "50%",
                              backgroundColor: "var(--color-crimson)"
                            }}
                          />
                        )}
                        {/* Dot at end */}
                        <div
                          style={{
                            position: "absolute",
                            right: "-4px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            backgroundColor: isDone
                              ? "var(--color-crimson)"
                              : "rgba(255,255,255,0.25)"
                          }}
                        />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
            {/* Active step underline */}
            <div
              style={{
                marginTop: "8px",
                height: "2px",
                backgroundColor: "rgba(255,255,255,0.06)"
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${((activeStep + 1) / STEPS.length) * 100}%`,
                  backgroundColor: "var(--color-crimson)",
                  transition: "width 0.4s ease"
                }}
              />
            </div>
          </div>

          {/* ── STEP 1: CONTACT ──────────────────────────────────── */}
          {activeStep === 0 && (
            <div>
              <h2
                className="font-display"
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "2.5px",
                  color: "rgba(255,255,255,0.55)",
                  textTransform: "uppercase",
                  marginBottom: "16px"
                }}
              >
                CONTACT INFORMATION
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "16px" }}>
                <input
                  type="email"
                  placeholder="Email address"
                  style={inputStyle}
                  onFocus={e => (e.target.style.borderColor = "var(--color-crimson)")}
                  onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.15)")}
                />
                <input
                  type="tel"
                  placeholder="Phone (optional)"
                  style={inputStyle}
                  onFocus={e => (e.target.style.borderColor = "var(--color-crimson)")}
                  onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.15)")}
                />
              </div>

              {/* Email checkbox */}
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  cursor: "pointer",
                  marginBottom: "clamp(24px, 4vh, 36px)"
                }}
              >
                <div
                  onClick={() => setEmailsOffers(!emailsOffers)}
                  style={{
                    width: "16px",
                    height: "16px",
                    border: emailsOffers ? "1px solid var(--color-crimson)" : "1px solid rgba(255,255,255,0.3)",
                    borderRadius: "2px",
                    backgroundColor: emailsOffers ? "var(--color-crimson)" : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    cursor: "pointer",
                    transition: "all 0.2s ease"
                  }}
                >
                  {emailsOffers && <Check size={10} color="white" />}
                </div>
                <span
                  style={{
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.65)",
                    fontFamily: "var(--font-body)"
                  }}
                >
                  Email me with news and offers
                </span>
              </label>

              {/* Shipping Address */}
              <h2
                className="font-display"
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "2.5px",
                  color: "rgba(255,255,255,0.55)",
                  textTransform: "uppercase",
                  marginBottom: "16px"
                }}
              >
                SHIPPING ADDRESS
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {/* Country Select */}
                <div style={{ position: "relative" }}>
                  <label style={{ ...labelStyle, position: "absolute", top: "8px", left: "16px", marginBottom: 0, fontSize: "9px" }}>
                    Country/Region
                  </label>
                  <select
                    value={country}
                    onChange={e => setCountry(e.target.value)}
                    style={{
                      ...inputStyle,
                      paddingTop: "22px",
                      paddingBottom: "8px",
                      appearance: "none",
                      WebkitAppearance: "none",
                      cursor: "pointer"
                    }}
                    onFocus={e => (e.target.style.borderColor = "var(--color-crimson)")}
                    onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.15)")}
                  >
                    {COUNTRIES.map(c => (
                      <option key={c} value={c} style={{ backgroundColor: "#111" }}>
                        {c}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    color="rgba(255,255,255,0.4)"
                    style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
                  />
                </div>

                {/* First / Last name row */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <input
                    type="text"
                    placeholder="First name"
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = "var(--color-crimson)")}
                    onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.15)")}
                  />
                  <input
                    type="text"
                    placeholder="Last name"
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = "var(--color-crimson)")}
                    onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.15)")}
                  />
                </div>

                <input
                  type="text"
                  placeholder="Address"
                  style={inputStyle}
                  onFocus={e => (e.target.style.borderColor = "var(--color-crimson)")}
                  onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.15)")}
                />
                <input
                  type="text"
                  placeholder="Apartment, suite, etc. (optional)"
                  style={inputStyle}
                  onFocus={e => (e.target.style.borderColor = "var(--color-crimson)")}
                  onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.15)")}
                />

                {/* City / State / ZIP row */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
                  <input
                    type="text"
                    placeholder="City"
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = "var(--color-crimson)")}
                    onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.15)")}
                  />
                  <div style={{ position: "relative" }}>
                    <select
                      value={state}
                      onChange={e => setState(e.target.value)}
                      style={{
                        ...inputStyle,
                        appearance: "none",
                        WebkitAppearance: "none",
                        cursor: "pointer",
                        color: state ? "var(--color-white)" : "rgba(255,255,255,0.4)"
                      }}
                      onFocus={e => (e.target.style.borderColor = "var(--color-crimson)")}
                      onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.15)")}
                    >
                      <option value="" style={{ backgroundColor: "#111" }}>State</option>
                      {US_STATES.map(s => (
                        <option key={s} value={s} style={{ backgroundColor: "#111" }}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={14}
                      color="rgba(255,255,255,0.4)"
                      style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="ZIP code"
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = "var(--color-crimson)")}
                    onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.15)")}
                  />
                </div>
              </div>

              {/* Continue Button */}
              <button
                onClick={() => setActiveStep(1)}
                style={{
                  width: "100%",
                  marginTop: "clamp(24px, 3.5vh, 36px)",
                  backgroundColor: "var(--color-crimson)",
                  color: "var(--color-white)",
                  border: "none",
                  borderRadius: "3px",
                  padding: "16px",
                  fontFamily: "var(--font-ui)",
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "2.5px",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  boxShadow: "0 4px 20px rgba(227,38,26,0.4)",
                  transition: "opacity 0.2s ease, transform 0.2s ease"
                }}
              >
                CONTINUE TO SHIPPING
              </button>
            </div>
          )}

          {/* ── STEP 2: SHIPPING ─────────────────────────────────── */}
          {activeStep === 1 && (
            <div>
              <h2
                className="font-display"
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "2.5px",
                  color: "rgba(255,255,255,0.55)",
                  textTransform: "uppercase",
                  marginBottom: "20px"
                }}
              >
                SHIPPING METHOD
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "32px" }}>
                {[
                  { id: "standard", label: "Standard Shipping", sub: "5–7 business days", price: "$9.99" },
                  { id: "express", label: "Express Shipping", sub: "2–3 business days", price: "$19.99" },
                  { id: "overnight", label: "Overnight", sub: "Next business day", price: "$39.99" }
                ].map((method, idx) => (
                  <label
                    key={method.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "14px 18px",
                      border: idx === 0 ? "1px solid var(--color-crimson)" : "1px solid rgba(255,255,255,0.15)",
                      borderRadius: "3px",
                      cursor: "pointer",
                      backgroundColor: idx === 0 ? "rgba(227,38,26,0.05)" : "transparent"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div
                        style={{
                          width: "16px",
                          height: "16px",
                          borderRadius: "50%",
                          border: idx === 0 ? "5px solid var(--color-crimson)" : "2px solid rgba(255,255,255,0.3)",
                          flexShrink: 0
                        }}
                      />
                      <div>
                        <div style={{ fontSize: "14px", color: "var(--color-white)", fontFamily: "var(--font-body)" }}>
                          {method.label}
                        </div>
                        <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", marginTop: "2px" }}>
                          {method.sub}
                        </div>
                      </div>
                    </div>
                    <span style={{ fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: "14px", color: "var(--color-white)" }}>
                      {method.price}
                    </span>
                  </label>
                ))}
              </div>

              <div style={{ display: "flex", gap: "12px" }}>
                <button
                  onClick={() => setActiveStep(0)}
                  style={{
                    flex: 1,
                    backgroundColor: "transparent",
                    color: "rgba(255,255,255,0.6)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: "3px",
                    padding: "15px",
                    fontFamily: "var(--font-ui)",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    cursor: "pointer"
                  }}
                >
                  ← BACK
                </button>
                <button
                  onClick={() => setActiveStep(2)}
                  style={{
                    flex: 3,
                    backgroundColor: "var(--color-crimson)",
                    color: "var(--color-white)",
                    border: "none",
                    borderRadius: "3px",
                    padding: "15px",
                    fontFamily: "var(--font-ui)",
                    fontSize: "12px",
                    fontWeight: 700,
                    letterSpacing: "2.5px",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    boxShadow: "0 4px 20px rgba(227,38,26,0.4)"
                  }}
                >
                  CONTINUE TO PAYMENT
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 3: PAYMENT ──────────────────────────────────── */}
          {activeStep === 2 && (
            <div>
              <h2
                className="font-display"
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "2.5px",
                  color: "rgba(255,255,255,0.55)",
                  textTransform: "uppercase",
                  marginBottom: "20px"
                }}
              >
                PAYMENT DETAILS
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "32px" }}>
                <input
                  type="text"
                  placeholder="Card number"
                  style={inputStyle}
                  onFocus={e => (e.target.style.borderColor = "var(--color-crimson)")}
                  onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.15)")}
                />
                <input
                  type="text"
                  placeholder="Name on card"
                  style={inputStyle}
                  onFocus={e => (e.target.style.borderColor = "var(--color-crimson)")}
                  onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.15)")}
                />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <input
                    type="text"
                    placeholder="MM / YY"
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = "var(--color-crimson)")}
                    onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.15)")}
                  />
                  <input
                    type="text"
                    placeholder="CVC"
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = "var(--color-crimson)")}
                    onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.15)")}
                  />
                </div>
              </div>

              <div style={{ display: "flex", gap: "12px" }}>
                <button
                  onClick={() => setActiveStep(1)}
                  style={{
                    flex: 1,
                    backgroundColor: "transparent",
                    color: "rgba(255,255,255,0.6)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: "3px",
                    padding: "15px",
                    fontFamily: "var(--font-ui)",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    cursor: "pointer"
                  }}
                >
                  ← BACK
                </button>
                <button
                  style={{
                    flex: 3,
                    backgroundColor: "var(--color-crimson)",
                    color: "var(--color-white)",
                    border: "none",
                    borderRadius: "3px",
                    padding: "15px",
                    fontFamily: "var(--font-ui)",
                    fontSize: "12px",
                    fontWeight: 700,
                    letterSpacing: "2.5px",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    boxShadow: "0 4px 20px rgba(227,38,26,0.4)"
                  }}
                >
                  PLACE ORDER — ${total.toFixed(2)}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── RIGHT COLUMN: ORDER SUMMARY ───────────────────────── */}
        <div
          style={{
            backgroundColor: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "4px",
            padding: "clamp(20px, 3vw, 32px)",
            position: "sticky",
            top: "88px"
          }}
        >
          <h2
            className="font-display"
            style={{
              fontSize: "13px",
              fontWeight: 700,
              letterSpacing: "2px",
              color: "var(--color-white)",
              textTransform: "uppercase",
              marginBottom: "20px"
            }}
          >
            ORDER SUMMARY
          </h2>

          {/* Cart Items */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {CART_ITEMS.map((item, idx) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  padding: "14px 0",
                  borderBottom: idx < CART_ITEMS.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none"
                }}
              >
                {/* Product image */}
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "4px",
                    overflow: "hidden",
                    flexShrink: 0,
                    backgroundColor: "rgba(255,255,255,0.05)",
                    position: "relative"
                  }}
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="60px"
                  />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "var(--color-white)",
                      fontFamily: "var(--font-ui)",
                      marginBottom: "3px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis"
                    }}
                  >
                    {item.name}
                  </div>
                  <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-body)" }}>
                    {item.variant}
                  </div>
                </div>

                <span
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "var(--color-white)",
                    flexShrink: 0
                  }}
                >
                  ${item.price.toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          {/* Discount Code */}
          <div
            style={{
              display: "flex",
              gap: "8px",
              marginTop: "20px",
              paddingTop: "16px",
              borderTop: "1px solid rgba(255,255,255,0.07)"
            }}
          >
            <input
              type="text"
              placeholder="Discount code"
              value={discountCode}
              onChange={e => setDiscountCode(e.target.value)}
              style={{
                ...inputStyle,
                fontSize: "13px",
                padding: "11px 14px",
                color: "rgba(255,255,255,0.7)"
              }}
              onFocus={e => (e.target.style.borderColor = "var(--color-crimson)")}
              onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.15)")}
            />
            <button
              style={{
                backgroundColor: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "3px",
                color: "rgba(255,255,255,0.7)",
                fontFamily: "var(--font-ui)",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "1px",
                padding: "11px 16px",
                cursor: "pointer",
                whiteSpace: "nowrap",
                flexShrink: 0
              }}
            >
              Apply
            </button>
          </div>

          {/* Price Breakdown */}
          <div
            style={{
              marginTop: "20px",
              paddingTop: "16px",
              borderTop: "1px solid rgba(255,255,255,0.07)",
              display: "flex",
              flexDirection: "column",
              gap: "10px"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: "12px", letterSpacing: "1.5px", color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-ui)", fontWeight: 700 }}>
                SUBTOTAL
              </span>
              <span style={{ fontSize: "13px", color: "var(--color-white)", fontFamily: "var(--font-ui)", fontWeight: 700 }}>
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: "12px", letterSpacing: "1.5px", color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-ui)", fontWeight: 700 }}>
                SHIPPING
              </span>
              <span style={{ fontSize: "13px", color: "var(--color-white)", fontFamily: "var(--font-ui)", fontWeight: 700 }}>
                ${SHIPPING_COST.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Total */}
          <div
            style={{
              marginTop: "16px",
              paddingTop: "16px",
              borderTop: "1px solid rgba(255,255,255,0.12)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px"
            }}
          >
            <span
              style={{
                fontSize: "14px",
                fontWeight: 900,
                letterSpacing: "2px",
                color: "var(--color-white)",
                fontFamily: "var(--font-display)",
                textTransform: "uppercase"
              }}
            >
              TOTAL
            </span>
            <span
              style={{
                fontSize: "20px",
                fontWeight: 900,
                color: "var(--color-white)",
                fontFamily: "var(--font-display)"
              }}
            >
              ${total.toFixed(2)}
            </span>
          </div>

          {/* Continue CTA (mirrors form button) */}
          <button
            onClick={() => activeStep < 2 && setActiveStep(prev => prev + 1)}
            style={{
              width: "100%",
              backgroundColor: "var(--color-crimson)",
              color: "var(--color-white)",
              border: "none",
              borderRadius: "3px",
              padding: "15px",
              fontFamily: "var(--font-ui)",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              cursor: "pointer",
              boxShadow: "0 4px 20px rgba(227,38,26,0.4)"
            }}
          >
            {activeStep === 0 && "CONTINUE TO SHIPPING"}
            {activeStep === 1 && "CONTINUE TO PAYMENT"}
            {activeStep === 2 && `PLACE ORDER — $${total.toFixed(2)}`}
          </button>
        </div>
      </div>
    </div>
  );
}
