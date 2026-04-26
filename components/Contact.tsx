"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Contact() {
  const headRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Big headline chars animate in
    const chars = headRef.current?.querySelectorAll(".char");
    if (chars && chars.length > 0) {
      gsap.fromTo(
        chars,
        { y: "100%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 0.8,
          ease: "power4.out",
          stagger: 0.02,
          scrollTrigger: {
            trigger: headRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    }

    // Grid columns stagger
    const cols = gridRef.current?.children;
    if (cols) {
      gsap.fromTo(
        cols,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    }

    // CTA slide in
    gsap.fromTo(
      ctaRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 90%",
          once: true,
        },
      }
    );
  }, []);

  const splitChars = (text: string) =>
    text.split("").map((ch, i) => (
      <span
        key={i}
        className="char"
        style={{
          display: "inline-block",
          willChange: "transform, opacity",
          opacity: 0,
        }}
      >
        {ch === " " ? " " : ch}
      </span>
    ));

  return (
    <section
      id="contact"
      style={{
        background: "#0a0a0a",
        color: "#ffffff",
        padding: "140px 0 40px",
      }}
    >
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 40px" }}>
        {/* Big headline */}
        <div ref={headRef} style={{ marginBottom: 0 }}>
          <div
            style={{
              fontSize: 11,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#bbbbbb",
              marginBottom: 32,
            }}
          >
            (06) — Contact
          </div>
          <div style={{ overflow: "hidden" }}>
            <h2
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(80px, 17vw, 240px)",
                fontWeight: 900,
                lineHeight: 0.85,
                letterSpacing: "-0.05em",
                textTransform: "uppercase",
                margin: 0,
              }}
            >
              {splitChars("Contact")}
            </h2>
          </div>
          <div style={{ overflow: "hidden" }}>
            <h2
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(80px, 17vw, 240px)",
                fontWeight: 300,
                lineHeight: 0.85,
                letterSpacing: "-0.05em",
                textTransform: "uppercase",
                fontStyle: "italic",
                margin: 0,
                color: "transparent",
                WebkitTextStroke: "1px var(--accent)",
              }}
            >
              {splitChars("me.")}
            </h2>
          </div>
        </div>

        {/* 4-col grid */}
        <div
          ref={gridRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 40,
            paddingTop: 56,
            paddingBottom: 56,
            borderTop: "1px solid rgba(255,255,255,0.18)",
            borderBottom: "1px solid rgba(255,255,255,0.18)",
            marginTop: 60,
          }}
        >
          {/* Direct */}
          <div>
            <div
              style={{
                fontSize: 11,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#757575",
                marginBottom: 24,
              }}
            >
              Direct
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[
                { content: "hello@davywoodward.studio", href: "mailto:hello@davywoodward.studio" },
                { content: "+1 (212) 555 — 0184" },
                { content: "14 Rivington Street, NY" },
              ].map((item) => (
                <li
                  key={item.content}
                  style={{
                    fontSize: 15,
                    lineHeight: 1.45,
                    color: "#ffffff",
                    marginBottom: 12,
                  }}
                >
                  {item.href ? (
                    <a
                      href={item.href}
                      style={{
                        color: "#ffffff",
                        borderBottom: "1px solid rgba(255,255,255,0.4)",
                        paddingBottom: 1,
                      }}
                    >
                      {item.content}
                    </a>
                  ) : (
                    item.content
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Elsewhere */}
          <div>
            <div
              style={{
                fontSize: 11,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#757575",
                marginBottom: 24,
              }}
            >
              Elsewhere
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {["Instagram ↗", "LinkedIn ↗", "Are.na ↗", "Read.cv ↗"].map((l) => (
                <li key={l} style={{ marginBottom: 12 }}>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    style={{
                      fontSize: 15,
                      color: "#ffffff",
                      borderBottom: "1px solid rgba(255,255,255,0.4)",
                      paddingBottom: 1,
                    }}
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Now */}
          <div>
            <div
              style={{
                fontSize: 11,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#757575",
                marginBottom: 24,
              }}
            >
              Now
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[
                {
                  content: "Available — Q3 2025",
                  dot: true,
                },
                { content: "Replies within 2 days" },
                { content: "Currently in NYC" },
                { content: "Visiting London — May" },
              ].map((item) => (
                <li
                  key={item.content}
                  style={{
                    fontSize: 15,
                    lineHeight: 1.45,
                    color: "#ffffff",
                    marginBottom: 12,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  {item.dot && (
                    <span
                      style={{
                        display: "inline-block",
                        width: 8,
                        height: 8,
                        background: "var(--accent)",
                        flexShrink: 0,
                        animation: "pulse-dot 2s ease-in-out infinite",
                      }}
                    />
                  )}
                  {item.content}
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <div
              style={{
                fontSize: 11,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#757575",
                marginBottom: 24,
              }}
            >
              Newsletter
            </div>
            <p
              style={{
                fontSize: 14,
                lineHeight: 1.45,
                color: "#bbbbbb",
                margin: "0 0 16px",
              }}
            >
              A quarterly note on new work, references, and reading. No marketing.
            </p>
            <form
              style={{ display: "flex", flexDirection: "column", gap: 8 }}
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.4)",
                  color: "#ffffff",
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  padding: "12px 14px",
                  borderRadius: 0,
                  outline: "none",
                }}
              />
              <button
                type="submit"
                style={{
                  background: "transparent",
                  border: "1px solid #ffffff",
                  color: "#ffffff",
                  fontFamily: "var(--font-body)",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  padding: "12px 14px",
                  cursor: "pointer",
                  borderRadius: 0,
                  transition: "all 150ms var(--ease-standard)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#ffffff";
                  (e.currentTarget as HTMLElement).style.color = "#0a0a0a";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.color = "#ffffff";
                }}
              >
                Subscribe →
              </button>
            </form>
          </div>
        </div>

        {/* Big CTA */}
        <div
          ref={ctaRef}
          style={{
            padding: "60px 0",
            display: "flex",
            justifyContent: "center",
            opacity: 0,
          }}
        >
          <a
            href="mailto:hello@davywoodward.studio"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 32,
              fontWeight: 700,
              letterSpacing: "0.02em",
              textTransform: "uppercase",
              paddingBottom: 8,
              borderBottom: "2px solid var(--accent)",
              color: "#ffffff",
              transition: "color 150ms var(--ease-standard), border-color 150ms var(--ease-standard)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = "#ffffff";
            }}
          >
            Start a project →
          </a>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: 32,
            borderTop: "1px solid rgba(255,255,255,0.18)",
            fontSize: 11,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#757575",
          }}
        >
          <span>© DW Studio · 2025 — MMXXV</span>
          <span>Designed in New York City</span>
          <span>Built with care, in Next.js</span>
        </div>
      </div>
    </section>
  );
}
