"use client";

import React from "react";

export const NewsletterForm: React.FC = () => {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setStatus("success");
      setTimeout(() => {
        setEmail("");
        setStatus("idle");
      }, 3000);
    }
  };

  return (
    <form
      style={{
        display: "flex",
        gap: "12px",
        maxWidth: "520px",
        width: "100%",
        flexWrap: "wrap"
      }}
      onSubmit={handleSubmit}
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        aria-label="Email address"
        style={{
          flex: "1 1 240px",
          backgroundColor: "rgba(18, 18, 18, 0.7)",
          border: "1px solid rgba(255, 255, 255, 0.18)",
          borderRadius: "4px",
          color: "var(--color-white)",
          padding: "14px 18px",
          fontSize: "14px",
          fontFamily: "var(--font-ui)",
          outline: "none",
          transition: "border-color 0.2s, background-color 0.2s"
        }}
      />
      <button
        type="submit"
        className="font-ui"
        style={{
          backgroundColor: "var(--color-crimson)",
          color: "var(--color-white)",
          fontWeight: 700,
          fontSize: "13px",
          letterSpacing: "1.5px",
          padding: "14px 32px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          transition: "background-color 0.2s, transform 0.15s ease",
          whiteSpace: "nowrap"
        }}
      >
        {status === "success" ? "JOINED ✦" : "JOIN NOW"}
      </button>
    </form>
  );
};
