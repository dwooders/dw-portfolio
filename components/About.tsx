"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STATS = [
  { n: 14, label: "Years practicing" },
  { n: 62, label: "Shipped projects" },
  { n: 9, label: "Awards / mentions" },
  { n: 4, label: "Continents served" },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const statNumRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Heading reveal
    gsap.fromTo(
      headRef.current,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headRef.current,
          start: "top 80%",
          once: true,
        },
      }
    );

    // Body text
    gsap.fromTo(
      bodyRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: bodyRef.current,
          start: "top 80%",
          once: true,
        },
      }
    );

    // Counter animation for stats
    STATS.forEach((stat, i) => {
      const el = statNumRefs.current[i];
      if (!el) return;
      const obj = { val: 0 };
      gsap.fromTo(
        obj,
        { val: 0 },
        {
          val: stat.n,
          duration: 1.5,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = String(Math.round(obj.val)).padStart(2, "0");
          },
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        }
      );

      // Fade in the stat block
      gsap.fromTo(
        el.closest(".stat-block"),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          delay: i * 0.1,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        }
      );
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{
        background: "#0a0a0a",
        color: "#ffffff",
        padding: "140px 0",
        borderBottom: "1px solid #262626",
      }}
    >
      <div
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          padding: "0 40px",
          display: "grid",
          gridTemplateColumns: "1.1fr 1fr",
          gap: 80,
          alignItems: "start",
        }}
      >
        {/* Heading */}
        <div ref={headRef} style={{ opacity: 0 }}>
          <div
            style={{
              fontSize: 11,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#bbbbbb",
              marginBottom: 32,
            }}
          >
            (05) — About
          </div>
          <h2
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(64px, 8vw, 112px)",
              fontWeight: 300,
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            A practice
            <br />
            <span style={{ fontWeight: 900 }}>built on</span>
            <br />
            <em
              style={{
                color: "transparent",
                fontStyle: "italic",
                fontWeight: 300,
                WebkitTextStroke: "1px var(--accent)",
              }}
            >
              constraint.
            </em>
          </h2>
        </div>

        {/* Body */}
        <div ref={bodyRef} style={{ paddingTop: 32, opacity: 0 }}>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.55,
              color: "#ffffff",
              margin: "0 0 24px",
            }}
          >
            Davy Woodward is an independent creative strategist, designer, and storyteller based
            in New York. The studio works at the intersection of identity, editorial, and digital
            — building systems that hold together at any scale, from a single pixel to a magazine
            spread.
          </p>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.55,
              color: "#ffffff",
              margin: "0 0 24px",
            }}
          >
            Recent collaborators include Sony Audio, The Irish Times, Empire Magazine, and Ingenue
            Quarterly. The studio operates as a small unit and partners with photographers,
            strategists, and engineers as projects require. Inquiries are answered within two
            working days.
          </p>

          {/* Stats grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              marginTop: 40,
              borderTop: "1px solid rgba(255,255,255,0.18)",
              borderLeft: "1px solid rgba(255,255,255,0.18)",
            }}
          >
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className="stat-block"
                style={{
                  padding: "32px 24px",
                  borderRight: "1px solid rgba(255,255,255,0.18)",
                  borderBottom: "1px solid rgba(255,255,255,0.18)",
                  opacity: 0,
                }}
              >
                <div
                  ref={(el) => { statNumRefs.current[i] = el; }}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 64,
                    fontWeight: 300,
                    lineHeight: 1,
                    letterSpacing: "-0.03em",
                    marginBottom: 12,
                  }}
                >
                  00
                </div>
                <div
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "#bbbbbb",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
