"use client";

import React, { useState, useEffect } from "react";

interface TimeLeft {
  days: string;
  hours: string;
  mins: string;
  secs: string;
}

export const CountdownTimer: React.FC = () => {
  // Start with a 2-day 18-hr 34-min 56-sec duration loop (239696 seconds)
  const TOTAL_LOOP_SECONDS = 2 * 86400 + 18 * 3600 + 34 * 60 + 56;
  
  const [secondsRemaining, setSecondsRemaining] = useState<number>(TOTAL_LOOP_SECONDS);

  useEffect(() => {
    // Synchronize to a realistic continuous loop based on epoch time
    const updateCountdown = () => {
      const now = Math.floor(Date.now() / 1000);
      const remaining = TOTAL_LOOP_SECONDS - (now % TOTAL_LOOP_SECONDS);
      setSecondsRemaining(remaining);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [TOTAL_LOOP_SECONDS]);

  const days = Math.floor(secondsRemaining / 86400).toString().padStart(2, "0");
  const hours = Math.floor((secondsRemaining % 86400) / 3600).toString().padStart(2, "0");
  const mins = Math.floor((secondsRemaining % 3600) / 60).toString().padStart(2, "0");
  const secs = Math.floor(secondsRemaining % 60).toString().padStart(2, "0");

  const units = [
    { val: days, label: "DAYS" },
    { val: hours, label: "HRS" },
    { val: mins, label: "MINS" },
    { val: secs, label: "SECS" }
  ];

  return (
    <div
      style={{
        display: "flex",
        gap: "clamp(8px, 1.5vw, 16px)",
        marginBottom: "var(--space-8)",
        flexWrap: "wrap"
      }}
    >
      {units.map((item) => (
        <div
          key={item.label}
          style={{
            backgroundColor: "rgba(18, 18, 18, 0.85)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: "8px",
            width: "clamp(72px, 8.5vw, 88px)",
            height: "clamp(80px, 9.5vw, 96px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(8px)",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.5)"
          }}
        >
          <span
            className="font-display"
            style={{
              fontSize: "clamp(28px, 3.5vw, 38px)",
              fontWeight: 900,
              lineHeight: 1,
              color: "var(--color-white)",
              fontVariantNumeric: "tabular-nums"
            }}
          >
            {item.val}
          </span>
          <span
            className="font-meta"
            style={{
              fontSize: "clamp(10px, 1.1vw, 11px)",
              letterSpacing: "1.8px",
              color: "var(--color-mist)",
              marginTop: "6px",
              fontWeight: 600
            }}
          >
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};
