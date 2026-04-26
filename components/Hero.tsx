"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import HeroE8Diagram from "./HeroE8Diagram";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const metaRowRef = useRef<HTMLDivElement>(null);
  const headline1Ref = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);
  const kickerRef = useRef<HTMLDivElement>(null);
  const headshotRef = useRef<HTMLDivElement>(null);
  const headshotParallaxRef = useRef<HTMLDivElement>(null);
  const bigHeadlineParallaxRef = useRef<HTMLDivElement>(null);
  const introCopyRef = useRef<HTMLDivElement>(null);
  const bigHeadlineRef = useRef<HTMLDivElement>(null);

  // Parallax scroll effects
  useEffect(() => {
    const pairs: [React.RefObject<HTMLDivElement | null>, number][] = [
      [headshotParallaxRef, 0.25],
      [bigHeadlineParallaxRef, 0.15],
    ];
    let raf = 0;
    const onScroll = () => {
      raf = requestAnimationFrame(() => {
        const s = window.scrollY;
        pairs.forEach(([ref, factor]) => {
          if (ref.current) ref.current.style.transform = `translateY(${s * factor}px)`;
        });
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.6 });

    // Meta row slides down
    tl.fromTo(
      metaRowRef.current,
      { opacity: 0, y: -12 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    );

    // Kicker fades in
    tl.fromTo(
      kickerRef.current,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" },
      "-=0.3"
    );

    // Headline1 characters slide up
    const h1Chars = headline1Ref.current?.querySelectorAll(".char");
    if (h1Chars && h1Chars.length > 0) {
      tl.fromTo(
        h1Chars,
        { y: "110%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 0.8,
          ease: "power4.out",
          stagger: 0.03,
        },
        "-=0.2"
      );
    }

    // Outline word slides up slightly behind
    tl.fromTo(
      outlineRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
      "-=0.5"
    );

    // Headshot reveal with clip-path
    tl.fromTo(
      headshotRef.current,
      { clipPath: "inset(100% 0 0 0)", opacity: 0 },
      { clipPath: "inset(0% 0 0 0)", opacity: 1, duration: 0.9, ease: "power3.out" },
      "-=0.6"
    );

    // Intro copy fades up
    tl.fromTo(
      introCopyRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
      "-=0.5"
    );

    // Big secondary headline
    const h2Chars = bigHeadlineRef.current?.querySelectorAll(".char");
    if (h2Chars && h2Chars.length > 0) {
      tl.fromTo(
        h2Chars,
        { y: "80%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.01,
        },
        "-=0.3"
      );
    }
  }, []);

  const splitChars = (text: string) =>
    text.split("").map((ch, i) => (
      <span
        key={i}
        className="char"
        style={{ display: "inline-block", willChange: "transform, opacity" }}
      >
        {ch === " " ? " " : ch}
      </span>
    ));

  const splitWords = (text: string) =>
    text.split(" ").map((word, wi) => (
      <span key={wi} style={{ display: "inline-block", marginRight: "0.25em" }}>
        {word.split("").map((ch, ci) => (
          <span
            key={ci}
            className="char"
            style={{ display: "inline-block", willChange: "transform, opacity" }}
          >
            {ch}
          </span>
        ))}
      </span>
    ));

  return (
    <section
      ref={sectionRef}
      id="home"
      style={{
        position: "relative",
        paddingTop: 80,
        paddingBottom: 0,
        overflow: "hidden",
        borderBottom: "1px solid #262626",
        background: "#ffffff",
      }}
    >
      {/* Corner crosshair */}
      <div
        style={{
          position: "absolute",
          top: 104,
          left: 40,
          color: "#757575",
          zIndex: 2,
        }}
        aria-hidden
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <line x1="10" y1="0" x2="10" y2="20" stroke="currentColor" strokeWidth="1" />
          <line x1="0" y1="10" x2="20" y2="10" stroke="currentColor" strokeWidth="1" />
          <circle cx="10" cy="10" r="6" stroke="currentColor" strokeWidth="1" fill="none" />
        </svg>
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1440,
          margin: "0 auto",
          padding: "60px 40px 100px",
        }}
      >
        {/* META ROW */}
        <div
          ref={metaRowRef}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 11,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#757575",
            paddingBottom: 24,
            marginBottom: 80,
            borderBottom: "1px solid #262626",
            opacity: 0,
          }}
        >
          <span>(01) — Index</span>
          <span style={{ letterSpacing: "0.12em" }}>Portfolio · 2024 / 2025</span>
          <span>New York · USA</span>
        </div>

        {/* HEADLINE BLOCK */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(140px, 200px) 1fr",
            alignItems: "start",
            gap: 32,
          }}
        >
          <div
            ref={kickerRef}
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 6,
              paddingTop: 36,
              fontFamily: "var(--font-body)",
              textTransform: "uppercase",
              opacity: 0,
            }}
          >
            <span style={{ fontSize: 22, fontWeight: 900, letterSpacing: "-0.01em", lineHeight: 1 }}>
              DW/01
            </span>
            <span style={{ fontSize: 22, fontWeight: 300, lineHeight: 1, color: "#757575" }}>/</span>
          </div>

          <div style={{ overflow: "hidden", lineHeight: 0.92 }}>
            <h1
              ref={headline1Ref}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(80px, 12vw, 168px)",
                fontWeight: 900,
                lineHeight: 0.92,
                letterSpacing: "-0.04em",
                textTransform: "uppercase",
                margin: 0,
                color: "#262626",
              }}
            >
              {splitChars("CREATIVE")}
            </h1>
          </div>
        </div>

        {/* OUTLINE WORD */}
        <div
          ref={outlineRef}
          aria-hidden
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(100px, 16vw, 224px)",
            fontWeight: 900,
            lineHeight: 0.85,
            letterSpacing: "-0.045em",
            textTransform: "uppercase",
            color: "transparent",
            WebkitTextStroke: "1px rgba(38,38,38,0.14)",
            paddingTop: 6,
            pointerEvents: "none",
            userSelect: "none",
            whiteSpace: "nowrap",
            opacity: 0,
          }}
        >
          STRATEGIST
        </div>

        {/* INTRO ROW */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "260px 1fr",
            columnGap: 60,
            rowGap: 60,
            marginTop: 72,
            alignItems: "start",
          }}
        >
          {/* Headshot — outer div carries parallax, inner carries entrance animation */}
          <div ref={headshotParallaxRef} style={{ willChange: "transform" }}>
          <div
            ref={headshotRef}
            style={{
              border: "1px solid #262626",
              padding: 12,
              opacity: 0,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 10,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                marginBottom: 12,
                color: "#757575",
              }}
            >
              <span>FIG. 01</span>
              <span>DW</span>
            </div>
            <div
              style={{
                position: "relative",
                aspectRatio: "1 / 1.1",
                background: "#1a1a1a",
                overflow: "hidden",
              }}
            >
              <Image
                src="/headshot-full.jpg"
                alt="Davy Woodward"
                fill
                style={{ objectFit: "cover", filter: "grayscale(0.15) contrast(1.05)" }}
                priority
              />
              <div
                style={{
                  position: "absolute",
                  left: -8,
                  bottom: -8,
                  width: 28,
                  height: 28,
                  borderLeft: "2px solid var(--accent)",
                  borderBottom: "2px solid var(--accent)",
                }}
              />
            </div>
          </div>
          </div>

          {/* Intro copy */}
          <div
            ref={introCopyRef}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 32,
              paddingTop: 8,
              maxWidth: 560,
              opacity: 0,
            }}
          >
            <p
              style={{
                fontSize: 18,
                fontWeight: 400,
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              <span style={{ color: "var(--accent)", marginRight: 6 }}>●</span>
              Hi, my name is Davy and I am a creative strategist, designer, and storyteller.
              I help studios and brands build identity systems, editorial layouts, and interfaces
              that hold together at any scale. Currently working independently from New York City.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 24,
                paddingTop: 24,
                borderTop: "1px solid #262626",
                fontSize: 13,
              }}
            >
              {[
                { label: "Available", value: "Q3 2025 — selective" },
                { label: "Based in", value: "New York City" },
                { label: "Index", value: "5 sections" },
              ].map((item) => (
                <div key={item.label}>
                  <div
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: "#757575",
                      marginBottom: 6,
                    }}
                  >
                    {item.label}
                  </div>
                  <div style={{ color: "#262626" }}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Big secondary headline */}
          <div ref={bigHeadlineParallaxRef} style={{ gridColumn: "1 / -1", marginTop: 24, overflow: "hidden", willChange: "transform" }}>
            <h2
              ref={bigHeadlineRef}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(36px, 5vw, 72px)",
                fontWeight: 300,
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                textTransform: "uppercase",
                margin: 0,
                maxWidth: 1100,
                color: "#262626",
              }}
            >
              {splitWords("Identity, motion, and interface — built with intent.")}
            </h2>
          </div>
        </div>
      </div>
      <HeroE8Diagram />
    </section>
  );
}
