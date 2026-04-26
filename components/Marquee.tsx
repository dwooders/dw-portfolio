"use client";

import { useRef } from "react";

const TOKENS = ["Strategy", "Design", "Video", "Motion", "UX/UI", "Code"];

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
            padding: "0 28px",
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
    <div
      style={{
        background: "#0a0a0a",
        color: "#ffffff",
        borderTop: "1px solid #262626",
        borderBottom: "1px solid #262626",
        overflow: "hidden",
        padding: "22px 0",
      }}
    >
      <div
        ref={trackRef}
        style={{
          display: "inline-flex",
          alignItems: "center",
          whiteSpace: "nowrap",
          animation: "marquee-loop 120s linear infinite",
          willChange: "transform",
        }}
      >
        {items}
        {items}
      </div>
    </div>
  );
}
