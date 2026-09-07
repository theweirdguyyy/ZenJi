"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown, Check, ShoppingBag, Lock, ArrowLeft,
  AlertCircle, Download, Printer, CheckCircle2, ShieldCheck, Truck
} from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { COUNTRIES_DATA, getStatesForCountry } from "@/data/countries-and-states";
import styles from "./Checkout.module.css";

// Fallback mock items if cart store is empty
const MOCK_CART_ITEMS = [
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

const STEPS = [
  { number: "01", label: "CONTACT" },
  { number: "02", label: "SHIPPING" },
  { number: "03", label: "PAYMENT" }
];

const SHIPPING_OPTIONS = [
  { id: "standard", label: "Standard Shipping", sub: "5–7 business days", basePrice: 9.99 },
  { id: "express", label: "Express Shipping", sub: "2–3 business days", basePrice: 19.99 },
  { id: "overnight", label: "Overnight Shipping", sub: "Next business day", basePrice: 39.99 }
];

// Base input style
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
  transition: "border-color 0.2s ease, background-color 0.2s ease",
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

interface OrderReceipt {
  orderId: string;
  orderDate: string;
  customerName: string;
  email: string;
  phone: string;
  shippingAddress: string;
  shippingMethod: string;
  shippingCost: number;
  subtotal: number;
  total: number;
  items: {
    id: string;
    name: string;
    variant: string;
    price: number;
    quantity: number;
  }[];
}

export default function CheckoutPage() {
  const { items: storeItems, getSubtotal, clearCart } = useCartStore();
  const [activeStep, setActiveStep] = useState(0);
  const [isMobileSummaryOpen, setIsMobileSummaryOpen] = useState(false);

  // Form State
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [emailsOffers, setEmailsOffers] = useState(false);
  const [country, setCountry] = useState("United States");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  // Shipping & Payment State
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [discountCode, setDiscountCode] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");

  // Validation errors & completion state
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [stepErrorAlert, setStepErrorAlert] = useState("");
  const [completedReceipt, setCompletedReceipt] = useState<OrderReceipt | null>(null);

  // Cart items
  const hasStoreItems = storeItems && storeItems.length > 0;
  const items = hasStoreItems
    ? storeItems.map(item => ({
        id: item.id,
        name: item.product.name,
        variant: `${item.selectedColor.name} / ${item.selectedSize}`,
        unitPrice: item.product.price,
        price: item.product.price * item.quantity,
        quantity: item.quantity,
        image: item.product.images?.[0] || ""
      }))
    : MOCK_CART_ITEMS.map(item => ({ ...item, unitPrice: item.price, quantity: 1 }));

  const subtotal = hasStoreItems ? getSubtotal() : MOCK_CART_ITEMS.reduce((sum, item) => sum + item.price, 0);
  const FREE_SHIPPING_THRESHOLD = 150;
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;

  // Calculate dynamic shipping cost based on selected method
  const getShippingFee = (methodId: string) => {
    if (methodId === "standard") return isFreeShipping ? 0 : 9.99;
    if (methodId === "express") return 19.99;
    if (methodId === "overnight") return 39.99;
    return 9.99;
  };

  const currentShippingCost = getShippingFee(shippingMethod);
  const total = subtotal + currentShippingCost;

  // Available states for selected country
  const availableStates = getStatesForCountry(country);

  // Handle Country change
  const handleCountryChange = (newCountry: string) => {
    setCountry(newCountry);
    const newStates = getStatesForCountry(newCountry);
    setState(newStates.length > 0 ? newStates[0] : "");
  };

  // ── Step 0 Validation (Contact & Address) ──────────────────────────────────
  const validateContactStep = () => {
    const errors: Record<string, string> = {};
    if (!email.trim() || !email.includes("@") || !email.includes(".")) {
      errors.email = "Please enter a valid email address.";
    }
    if (!phone.trim() || phone.trim().length < 6) {
      errors.phone = "Please enter a valid phone number.";
    }
    if (!firstName.trim()) errors.firstName = "First name is required.";
    if (!lastName.trim()) errors.lastName = "Last name is required.";
    if (!address.trim()) errors.address = "Address is required.";
    if (!city.trim()) errors.city = "City is required.";
    if (!state.trim()) errors.state = "State/Province is required.";
    if (!zip.trim()) errors.zip = "ZIP/Postal code is required.";

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      setStepErrorAlert("Please complete all required contact and shipping address fields.");
      return false;
    }

    setStepErrorAlert("");
    return true;
  };

  // ── Step 2 Validation (Payment & Order Placement) ─────────────────────────
  const validatePaymentStep = () => {
    const errors: Record<string, string> = {};
    const sanitizedCard = cardNumber.replace(/\s+/g, "");
    if (!sanitizedCard || sanitizedCard.length < 15) {
      errors.cardNumber = "Please enter a valid card number.";
    }
    if (!cardName.trim()) {
      errors.cardName = "Name on card is required.";
    }
    if (!cardExpiry.trim() || !cardExpiry.includes("/")) {
      errors.cardExpiry = "Expiry (MM/YY) is required.";
    }
    if (!cardCvc.trim() || cardCvc.length < 3) {
      errors.cardCvc = "CVC is required.";
    }

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      setStepErrorAlert("Please complete all required payment details to place your order.");
      return false;
    }

    setStepErrorAlert("");
    return true;
  };

  // Advance from Step 0 to Step 1
  const handleProceedToShipping = () => {
    if (validateContactStep()) {
      setActiveStep(1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Advance from Step 1 to Step 2
  const handleProceedToPayment = () => {
    setActiveStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Place Order
  const handlePlaceOrder = () => {
    if (!validatePaymentStep()) return;

    const chosenOption = SHIPPING_OPTIONS.find(o => o.id === shippingMethod);
    const receipt: OrderReceipt = {
      orderId: `ZNJ-${Math.floor(100000 + Math.random() * 900000)}`,
      orderDate: new Date().toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short"
      }),
      customerName: `${firstName.trim()} ${lastName.trim()}`,
      email: email.trim(),
      phone: phone.trim(),
      shippingAddress: `${address.trim()}${apartment.trim() ? ", " + apartment.trim() : ""}, ${city.trim()}, ${state.trim()} ${zip.trim()}, ${country}`,
      shippingMethod: chosenOption ? chosenOption.label : "Standard Shipping",
      shippingCost: currentShippingCost,
      subtotal,
      total,
      items: items.map(i => ({
        id: i.id,
        name: i.name,
        variant: i.variant,
        price: i.price,
        quantity: i.quantity
      }))
    };

    setCompletedReceipt(receipt);
    clearCart();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Download Receipt as Text / Invoice file
  const handleDownloadReceipt = () => {
    if (!completedReceipt) return;

    const receiptText = `
============================================================
              ZENJI NEO KAGE — OFFICIAL RECEIPT             
============================================================
Order Number:     ${completedReceipt.orderId}
Date & Time:      ${completedReceipt.orderDate}
Payment Status:   PAID (Authorized)
------------------------------------------------------------
CUSTOMER INFORMATION:
Name:             ${completedReceipt.customerName}
Email:            ${completedReceipt.email}
Phone:            ${completedReceipt.phone}

SHIPPING ADDRESS:
${completedReceipt.shippingAddress}

SHIPPING METHOD:
${completedReceipt.shippingMethod} (${completedReceipt.shippingCost === 0 ? "FREE" : `$${completedReceipt.shippingCost.toFixed(2)}`})
------------------------------------------------------------
ORDERED ITEMS:
${completedReceipt.items
  .map(
    (it, idx) =>
      `${idx + 1}. ${it.name} [${it.variant}]\n   Qty: ${it.quantity}  x  $${(it.price / it.quantity).toFixed(2)}  =  $${it.price.toFixed(2)}`
  )
  .join("\n\n")}
------------------------------------------------------------
PRICE BREAKDOWN:
Subtotal:         $${completedReceipt.subtotal.toFixed(2)}
Shipping:         ${completedReceipt.shippingCost === 0 ? "FREE" : `$${completedReceipt.shippingCost.toFixed(2)}`}
Total Paid:       $${completedReceipt.total.toFixed(2)}
============================================================
       THANK YOU FOR YOUR ORDER. WEAR THE LEGEND.
               https://zenji-neokage.com
============================================================
    `.trim();

    const blob = new Blob([receiptText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `ZENJI_Receipt_${completedReceipt.orderId}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Print Receipt
  const handlePrintReceipt = () => {
    window.print();
  };

  // ── ORDER CONFIRMED VIEW ──────────────────────────────────────────────────
  if (completedReceipt) {
    return (
      <div className={styles.container}>
        <div className={styles.confirmationWrapper}>
          <div className={styles.receiptCard}>
            {/* Header Badge */}
            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(227,38,26,0.12)",
                  border: "1px solid var(--color-crimson)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "14px"
                }}
              >
                <CheckCircle2 size={32} color="var(--color-crimson)" />
              </div>
              <p
                style={{
                  fontSize: "11px",
                  fontFamily: "var(--font-ui)",
                  letterSpacing: "3px",
                  fontWeight: 700,
                  color: "var(--color-crimson)",
                  textTransform: "uppercase"
                }}
              >
                ORDER CONFIRMED
              </p>
              <h1
                className="font-display"
                style={{
                  fontSize: "clamp(24px, 4vw, 36px)",
                  fontWeight: 900,
                  letterSpacing: "1.5px",
                  color: "var(--color-white)",
                  marginTop: "4px"
                }}
              >
                #{completedReceipt.orderId}
              </h1>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-body)", marginTop: "4px" }}>
                Placed on {completedReceipt.orderDate}
              </p>
            </div>

            {/* Customer & Shipping Details Summary */}
            <div
              style={{
                backgroundColor: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "4px",
                padding: "16px 20px",
                marginBottom: "24px"
              }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
                <div>
                  <span style={{ fontSize: "10px", letterSpacing: "1.5px", color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-ui)", fontWeight: 700, textTransform: "uppercase" }}>
                    SHIPPING TO
                  </span>
                  <p style={{ fontSize: "13px", fontWeight: 700, color: "var(--color-white)", marginTop: "4px" }}>
                    {completedReceipt.customerName}
                  </p>
                  <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", lineHeight: 1.4, marginTop: "2px" }}>
                    {completedReceipt.shippingAddress}
                  </p>
                  <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginTop: "2px" }}>
                    {completedReceipt.phone}
                  </p>
                </div>
                <div>
                  <span style={{ fontSize: "10px", letterSpacing: "1.5px", color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-ui)", fontWeight: 700, textTransform: "uppercase" }}>
                    DELIVERY METHOD
                  </span>
                  <p style={{ fontSize: "13px", fontWeight: 700, color: "var(--color-white)", marginTop: "4px" }}>
                    {completedReceipt.shippingMethod}
                  </p>
                  <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", marginTop: "2px" }}>
                    Confirmation sent to <strong style={{ color: "var(--color-white)" }}>{completedReceipt.email}</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Ordered Items Table */}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "16px", marginBottom: "16px" }}>
              <span style={{ fontSize: "11px", letterSpacing: "1.5px", color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-ui)", fontWeight: 700, textTransform: "uppercase" }}>
                ORDER ITEMS ({completedReceipt.items.length})
              </span>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "12px" }}>
                {completedReceipt.items.map((it) => (
                  <div key={it.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <div>
                      <p style={{ fontSize: "13px", fontWeight: 700, color: "var(--color-white)", fontFamily: "var(--font-ui)" }}>
                        {it.name}
                      </p>
                      <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.45)" }}>
                        {it.variant} • Qty: {it.quantity}
                      </p>
                    </div>
                    <span style={{ fontFamily: "var(--font-ui)", fontSize: "14px", fontWeight: 700, color: "var(--color-white)" }}>
                      ${it.price.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Breakdown */}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "16px", display: "flex", flexDirection: "column", gap: "8px", marginBottom: "24px" }}>
              <div className={styles.receiptRow}>
                <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-ui)", fontWeight: 700 }}>SUBTOTAL</span>
                <span style={{ fontSize: "13px", color: "var(--color-white)", fontFamily: "var(--font-ui)", fontWeight: 700 }}>${completedReceipt.subtotal.toFixed(2)}</span>
              </div>
              <div className={styles.receiptRow}>
                <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-ui)", fontWeight: 700 }}>SHIPPING</span>
                <span style={{ fontSize: "13px", color: completedReceipt.shippingCost === 0 ? "var(--color-crimson)" : "var(--color-white)", fontFamily: "var(--font-ui)", fontWeight: 700 }}>
                  {completedReceipt.shippingCost === 0 ? "FREE" : `$${completedReceipt.shippingCost.toFixed(2)}`}
                </span>
              </div>
              <div className={styles.receiptRow} style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "12px" }}>
                <span style={{ fontSize: "14px", fontWeight: 900, color: "var(--color-white)", fontFamily: "var(--font-display)" }}>TOTAL PAID</span>
                <span style={{ fontSize: "22px", fontWeight: 900, color: "var(--color-white)", fontFamily: "var(--font-display)" }}>
                  ${completedReceipt.total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Receipt Action Buttons */}
            <div className={styles.confirmationActions} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "flex", gap: "12px" }}>
                <button
                  onClick={handleDownloadReceipt}
                  style={{
                    flex: 1,
                    backgroundColor: "var(--color-crimson)",
                    color: "var(--color-white)",
                    border: "none",
                    borderRadius: "3px",
                    padding: "14px",
                    fontFamily: "var(--font-ui)",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    boxShadow: "0 4px 16px rgba(227,38,26,0.35)"
                  }}
                >
                  <Download size={15} /> DOWNLOAD RECEIPT (.TXT)
                </button>
                <button
                  onClick={handlePrintReceipt}
                  style={{
                    backgroundColor: "rgba(255,255,255,0.08)",
                    color: "var(--color-white)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: "3px",
                    padding: "14px 20px",
                    fontFamily: "var(--font-ui)",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                  }}
                >
                  <Printer size={15} /> PRINT
                </button>
              </div>

              <Link
                href="/shop"
                style={{
                  display: "block",
                  textAlign: "center",
                  padding: "13px",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "3px",
                  color: "rgba(255,255,255,0.7)",
                  fontFamily: "var(--font-ui)",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "2px",
                  textDecoration: "none",
                  textTransform: "uppercase"
                }}
              >
                CONTINUE SHOPPING
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── STANDARD CHECKOUT FLOW ────────────────────────────────────────────────
  return (
    <div className={styles.container}>
      <div className={styles.mainGrid}>
        
        {/* ── LEFT/CENTER FORM COLUMN ───────────────────────────── */}
        <div className={styles.formColumn}>
          {/* Mobile Order Summary Collapsible Toggle */}
          <div
            className={styles.mobileSummaryToggle}
            onClick={() => setIsMobileSummaryOpen(!isMobileSummaryOpen)}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <ShoppingBag size={18} color="var(--color-crimson)" />
              <span
                className="font-ui"
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "1.5px",
                  color: "var(--color-white)",
                  textTransform: "uppercase"
                }}
              >
                {isMobileSummaryOpen ? "HIDE ORDER SUMMARY" : "SHOW ORDER SUMMARY"}
              </span>
              <ChevronDown
                size={16}
                color="rgba(255,255,255,0.6)"
                style={{
                  transform: isMobileSummaryOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.25s ease"
                }}
              />
            </div>
            <span
              className="font-display"
              style={{
                fontSize: "16px",
                fontWeight: 900,
                color: "var(--color-white)"
              }}
            >
              ${total.toFixed(2)}
            </span>
          </div>

          {/* Mobile Summary Expanded Content */}
          {isMobileSummaryOpen && (
            <div className={styles.mobileSummaryContent}>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "16px" }}>
                {items.map((item) => (
                  <div key={item.id} className={styles.summaryItemRow}>
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "3px",
                        overflow: "hidden",
                        flexShrink: 0,
                        backgroundColor: "rgba(255,255,255,0.05)",
                        position: "relative"
                      }}
                    >
                      {item.image && (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          style={{ objectFit: "cover" }}
                          sizes="48px"
                        />
                      )}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: "12px",
                          fontWeight: 700,
                          color: "var(--color-white)",
                          fontFamily: "var(--font-ui)",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis"
                        }}
                      >
                        {item.name}
                      </div>
                      <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-body)" }}>
                        {item.variant} • Qty: {item.quantity}
                      </div>
                    </div>
                    <span style={{ fontFamily: "var(--font-ui)", fontSize: "13px", fontWeight: 700, color: "var(--color-white)" }}>
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                  <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-ui)", fontWeight: 700 }}>SUBTOTAL</span>
                  <span style={{ fontSize: "12px", color: "var(--color-white)", fontFamily: "var(--font-ui)", fontWeight: 700 }}>${subtotal.toFixed(2)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-ui)", fontWeight: 700 }}>SHIPPING</span>
                  <span style={{ fontSize: "12px", color: currentShippingCost === 0 ? "var(--color-crimson)" : "var(--color-white)", fontFamily: "var(--font-ui)", fontWeight: 700 }}>
                    {currentShippingCost === 0 ? "FREE" : `$${currentShippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "8px" }}>
                  <span style={{ fontSize: "12px", fontWeight: 900, color: "var(--color-white)", fontFamily: "var(--font-display)" }}>TOTAL</span>
                  <span style={{ fontSize: "16px", fontWeight: 900, color: "var(--color-white)", fontFamily: "var(--font-display)" }}>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Step Progress Bar */}
          <div style={{ marginBottom: "clamp(24px, 4vw, 40px)" }}>
            <div className={styles.stepsBar}>
              {STEPS.map((step, idx) => {
                const isActive = idx === activeStep;
                const isDone = idx < activeStep;

                return (
                  <React.Fragment key={step.number}>
                    <button
                      onClick={() => {
                        // Allow clicking previous steps
                        if (idx < activeStep) setActiveStep(idx);
                        // Going forward requires validation
                        else if (idx === 1 && activeStep === 0) handleProceedToShipping();
                        else if (idx === 2 && activeStep === 1) handleProceedToPayment();
                      }}
                      className={styles.stepBtn}
                      style={{ cursor: idx <= activeStep ? "pointer" : "default" }}
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
                            ? "rgba(255,255,255,0.55)"
                            : "rgba(255,255,255,0.3)"
                        }}
                      >
                        {step.number}. {step.label}
                      </span>
                    </button>

                    {idx < STEPS.length - 1 && (
                      <div className={styles.stepConnector}>
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
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
            {/* Active step underline bar */}
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

          {/* Form Error Alert */}
          {stepErrorAlert && (
            <div className={styles.alertBox}>
              <AlertCircle size={18} color="var(--color-crimson)" style={{ flexShrink: 0 }} />
              <span>{stepErrorAlert}</span>
            </div>
          )}

          {/* ── STEP 1: CONTACT & ADDRESS ────────────────────────── */}
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
                <div>
                  <input
                    type="email"
                    placeholder="Email address *"
                    value={email}
                    onChange={e => {
                      setEmail(e.target.value);
                      if (formErrors.email) setFormErrors({ ...formErrors, email: "" });
                    }}
                    className={formErrors.email ? styles.inputError : ""}
                    style={inputStyle}
                  />
                  {formErrors.email && (
                    <p style={{ fontSize: "11px", color: "var(--color-crimson)", marginTop: "4px" }}>
                      {formErrors.email}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    type="tel"
                    placeholder="Phone number *"
                    value={phone}
                    onChange={e => {
                      setPhone(e.target.value);
                      if (formErrors.phone) setFormErrors({ ...formErrors, phone: "" });
                    }}
                    className={formErrors.phone ? styles.inputError : ""}
                    style={inputStyle}
                  />
                  {formErrors.phone && (
                    <p style={{ fontSize: "11px", color: "var(--color-crimson)", marginTop: "4px" }}>
                      {formErrors.phone}
                    </p>
                  )}
                </div>
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
                  Email me with news and limited drop offers
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
                {/* Comprehensive Country Selector */}
                <div style={{ position: "relative" }}>
                  <label style={{ ...labelStyle, position: "absolute", top: "8px", left: "16px", marginBottom: 0, fontSize: "9px" }}>
                    Country/Region *
                  </label>
                  <select
                    value={country}
                    onChange={e => handleCountryChange(e.target.value)}
                    style={{
                      ...inputStyle,
                      paddingTop: "22px",
                      paddingBottom: "8px",
                      appearance: "none",
                      WebkitAppearance: "none",
                      cursor: "pointer"
                    }}
                  >
                    {COUNTRIES_DATA.map(c => (
                      <option key={c.name} value={c.name} style={{ backgroundColor: "#111", color: "#fff" }}>
                        {c.name}
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
                <div className={styles.formGrid2}>
                  <div>
                    <input
                      type="text"
                      placeholder="First name *"
                      value={firstName}
                      onChange={e => {
                        setFirstName(e.target.value);
                        if (formErrors.firstName) setFormErrors({ ...formErrors, firstName: "" });
                      }}
                      className={formErrors.firstName ? styles.inputError : ""}
                      style={inputStyle}
                    />
                    {formErrors.firstName && (
                      <p style={{ fontSize: "11px", color: "var(--color-crimson)", marginTop: "4px" }}>
                        {formErrors.firstName}
                      </p>
                    )}
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Last name *"
                      value={lastName}
                      onChange={e => {
                        setLastName(e.target.value);
                        if (formErrors.lastName) setFormErrors({ ...formErrors, lastName: "" });
                      }}
                      className={formErrors.lastName ? styles.inputError : ""}
                      style={inputStyle}
                    />
                    {formErrors.lastName && (
                      <p style={{ fontSize: "11px", color: "var(--color-crimson)", marginTop: "4px" }}>
                        {formErrors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                {/* Address */}
                <div>
                  <input
                    type="text"
                    placeholder="Address *"
                    value={address}
                    onChange={e => {
                      setAddress(e.target.value);
                      if (formErrors.address) setFormErrors({ ...formErrors, address: "" });
                    }}
                    className={formErrors.address ? styles.inputError : ""}
                    style={inputStyle}
                  />
                  {formErrors.address && (
                    <p style={{ fontSize: "11px", color: "var(--color-crimson)", marginTop: "4px" }}>
                      {formErrors.address}
                    </p>
                  )}
                </div>

                <input
                  type="text"
                  placeholder="Apartment, suite, etc. (optional)"
                  value={apartment}
                  onChange={e => setApartment(e.target.value)}
                  style={inputStyle}
                />

                {/* City / State / ZIP row */}
                <div className={styles.formGrid3}>
                  <div className={styles.formCityCol}>
                    <input
                      type="text"
                      placeholder="City *"
                      value={city}
                      onChange={e => {
                        setCity(e.target.value);
                        if (formErrors.city) setFormErrors({ ...formErrors, city: "" });
                      }}
                      className={formErrors.city ? styles.inputError : ""}
                      style={inputStyle}
                    />
                    {formErrors.city && (
                      <p style={{ fontSize: "11px", color: "var(--color-crimson)", marginTop: "4px" }}>
                        {formErrors.city}
                      </p>
                    )}
                  </div>

                  {/* Dynamic State/Province based on Selected Country */}
                  <div style={{ position: "relative" }}>
                    {availableStates.length > 0 ? (
                      <>
                        <select
                          value={state}
                          onChange={e => {
                            setState(e.target.value);
                            if (formErrors.state) setFormErrors({ ...formErrors, state: "" });
                          }}
                          className={formErrors.state ? styles.inputError : ""}
                          style={{
                            ...inputStyle,
                            appearance: "none",
                            WebkitAppearance: "none",
                            cursor: "pointer",
                            color: state ? "var(--color-white)" : "rgba(255,255,255,0.4)"
                          }}
                        >
                          <option value="" style={{ backgroundColor: "#111" }}>Select State/Province *</option>
                          {availableStates.map(s => (
                            <option key={s} value={s} style={{ backgroundColor: "#111", color: "#fff" }}>
                              {s}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          size={14}
                          color="rgba(255,255,255,0.4)"
                          style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
                        />
                      </>
                    ) : (
                      <input
                        type="text"
                        placeholder="State / Region *"
                        value={state}
                        onChange={e => {
                          setState(e.target.value);
                          if (formErrors.state) setFormErrors({ ...formErrors, state: "" });
                        }}
                        className={formErrors.state ? styles.inputError : ""}
                        style={inputStyle}
                      />
                    )}
                    {formErrors.state && (
                      <p style={{ fontSize: "11px", color: "var(--color-crimson)", marginTop: "4px" }}>
                        {formErrors.state}
                      </p>
                    )}
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="ZIP / Postal code *"
                      value={zip}
                      onChange={e => {
                        setZip(e.target.value);
                        if (formErrors.zip) setFormErrors({ ...formErrors, zip: "" });
                      }}
                      className={formErrors.zip ? styles.inputError : ""}
                      style={inputStyle}
                    />
                    {formErrors.zip && (
                      <p style={{ fontSize: "11px", color: "var(--color-crimson)", marginTop: "4px" }}>
                        {formErrors.zip}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className={styles.actionButtons}>
                <Link
                  href="/cart"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    padding: "15px 20px",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: "3px",
                    color: "rgba(255,255,255,0.7)",
                    fontFamily: "var(--font-ui)",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "2px",
                    textDecoration: "none",
                    textTransform: "uppercase"
                  }}
                >
                  <ArrowLeft size={13} /> RETURN TO CART
                </Link>
                <button
                  onClick={handleProceedToShipping}
                  style={{
                    flex: 1,
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
                    transition: "opacity 0.2s ease"
                  }}
                >
                  CONTINUE TO SHIPPING
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 2: SHIPPING METHODS ─────────────────────────── */}
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
                {SHIPPING_OPTIONS.map((opt) => {
                  const isSelected = shippingMethod === opt.id;
                  const fee = getShippingFee(opt.id);
                  const priceLabel = fee === 0 ? "FREE" : `$${fee.toFixed(2)}`;

                  return (
                    <div
                      key={opt.id}
                      onClick={() => setShippingMethod(opt.id)}
                      className={`${styles.shippingOption} ${isSelected ? styles.shippingOptionActive : styles.shippingOptionInactive}`}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                        <div
                          style={{
                            width: "18px",
                            height: "18px",
                            borderRadius: "50%",
                            border: isSelected ? "5px solid var(--color-crimson)" : "2px solid rgba(255,255,255,0.3)",
                            backgroundColor: isSelected ? "var(--color-crimson)" : "transparent",
                            flexShrink: 0,
                            transition: "all 0.2s ease"
                          }}
                        />
                        <div>
                          <div style={{ fontSize: "14px", fontWeight: isSelected ? 700 : 500, color: "var(--color-white)", fontFamily: "var(--font-body)" }}>
                            {opt.label}
                          </div>
                          <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", marginTop: "2px" }}>
                            {opt.sub}
                          </div>
                        </div>
                      </div>
                      <span
                        style={{
                          fontFamily: "var(--font-ui)",
                          fontWeight: 700,
                          fontSize: "14px",
                          color: fee === 0 ? "var(--color-crimson)" : "var(--color-white)"
                        }}
                      >
                        {priceLabel}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className={styles.actionButtons}>
                <button
                  onClick={() => {
                    setActiveStep(0);
                    setStepErrorAlert("");
                  }}
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
                  onClick={handleProceedToPayment}
                  style={{
                    flex: 2,
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

          {/* ── STEP 3: PAYMENT DETAILS ──────────────────────────── */}
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
                <div>
                  <input
                    type="text"
                    placeholder="Card number (16 digits) *"
                    value={cardNumber}
                    maxLength={19}
                    onChange={e => {
                      // Auto format card number spaces
                      const v = e.target.value.replace(/\D/g, "").slice(0, 16);
                      const formatted = v.match(/.{1,4}/g)?.join(" ") || v;
                      setCardNumber(formatted);
                      if (formErrors.cardNumber) setFormErrors({ ...formErrors, cardNumber: "" });
                    }}
                    className={formErrors.cardNumber ? styles.inputError : ""}
                    style={inputStyle}
                  />
                  {formErrors.cardNumber && (
                    <p style={{ fontSize: "11px", color: "var(--color-crimson)", marginTop: "4px" }}>
                      {formErrors.cardNumber}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Name on card *"
                    value={cardName}
                    onChange={e => {
                      setCardName(e.target.value);
                      if (formErrors.cardName) setFormErrors({ ...formErrors, cardName: "" });
                    }}
                    className={formErrors.cardName ? styles.inputError : ""}
                    style={inputStyle}
                  />
                  {formErrors.cardName && (
                    <p style={{ fontSize: "11px", color: "var(--color-crimson)", marginTop: "4px" }}>
                      {formErrors.cardName}
                    </p>
                  )}
                </div>

                <div className={styles.formGrid2}>
                  <div>
                    <input
                      type="text"
                      placeholder="MM / YY *"
                      maxLength={5}
                      value={cardExpiry}
                      onChange={e => {
                        let v = e.target.value.replace(/\D/g, "").slice(0, 4);
                        if (v.length >= 3) v = `${v.slice(0, 2)}/${v.slice(2)}`;
                        setCardExpiry(v);
                        if (formErrors.cardExpiry) setFormErrors({ ...formErrors, cardExpiry: "" });
                      }}
                      className={formErrors.cardExpiry ? styles.inputError : ""}
                      style={inputStyle}
                    />
                    {formErrors.cardExpiry && (
                      <p style={{ fontSize: "11px", color: "var(--color-crimson)", marginTop: "4px" }}>
                        {formErrors.cardExpiry}
                      </p>
                    )}
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="CVC (3 digits) *"
                      maxLength={4}
                      value={cardCvc}
                      onChange={e => {
                        setCardCvc(e.target.value.replace(/\D/g, "").slice(0, 4));
                        if (formErrors.cardCvc) setFormErrors({ ...formErrors, cardCvc: "" });
                      }}
                      className={formErrors.cardCvc ? styles.inputError : ""}
                      style={inputStyle}
                    />
                    {formErrors.cardCvc && (
                      <p style={{ fontSize: "11px", color: "var(--color-crimson)", marginTop: "4px" }}>
                        {formErrors.cardCvc}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className={styles.actionButtons}>
                <button
                  onClick={() => {
                    setActiveStep(1);
                    setStepErrorAlert("");
                  }}
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
                  onClick={handlePlaceOrder}
                  style={{
                    flex: 2,
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
                  <Lock size={13} style={{ display: "inline", marginRight: "6px", verticalAlign: "middle" }} />
                  PLACE ORDER — ${total.toFixed(2)}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── RIGHT COLUMN: ORDER SUMMARY (DESKTOP ONLY) ────────── */}
        <div className={styles.desktopSummary}>
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
            {items.map((item, idx) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  padding: "14px 0",
                  borderBottom: idx < items.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none"
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
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="60px"
                    />
                  )}
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
                    {item.variant} • Qty: {item.quantity}
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
                SHIPPING ({SHIPPING_OPTIONS.find(o => o.id === shippingMethod)?.label})
              </span>
              <span style={{ fontSize: "13px", color: currentShippingCost === 0 ? "var(--color-crimson)" : "var(--color-white)", fontFamily: "var(--font-ui)", fontWeight: 700 }}>
                {currentShippingCost === 0 ? "FREE" : `$${currentShippingCost.toFixed(2)}`}
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

          {/* Trust Guarantees */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "rgba(255,255,255,0.6)" }}>
              <ShieldCheck size={16} color="var(--color-crimson)" />
              <span>256-bit encrypted secure checkout</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "rgba(255,255,255,0.6)" }}>
              <Truck size={16} color="rgba(255,255,255,0.4)" />
              <span>Tracked worldwide delivery from Tokyo & LA</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
