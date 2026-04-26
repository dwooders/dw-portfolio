"use client";

import { useRef } from "react";

const TOKENS = ["Digital Strategy", "Design", "Video Production", "Motion Design", "UX/UI", "Code", "AI Generalist", "Creative Direction"];

export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  const items: React.ReactNode[] = [];
  for (let i = 0; i < 8; i++) {
    TOKENS.forEach((t, j) => {
      items.push(
        <span
          key={`${i}-${j}-t`}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 22,
            fontWeight: 900,
            letterSpacing: "0.04em",
            padding: "0 48px",
          }}
        >
          {t}
        </span>
      );
      items.push(
        <span
          key={`${i}-${j}-x`}
          style={{
            fontSize: 22,
            fontWeight: 300,
            padding: "0 4px",
            color: "var(--accent)",
          }}
        >
          ×
        </span>
      );
    });
  }

  return (
    /* Clipping shell — maintains vertical space, hides rotation overflow */
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        height: "80px",
      }}
    >
      {/* Rotated band — extended left/right to prevent corner gaps */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "-15%",
          width: "130%",
          transform: "translateY(-50%)",
          background: "#0a0a0a",
          color: "#ffffff",
          padding: "22px 0",
        }}
      >
        <div
          ref={trackRef}
          style={{
            display: "inline-flex",
            alignItems: "center",
            whiteSpace: "nowrap",
            animation: "marquee-loop 260s linear infinite",
            willChange: "transform",
          }}
        >
          {items}
          {items}
        </div>
      </div>
    </div>
  );
}
