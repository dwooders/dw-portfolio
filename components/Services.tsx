"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const DESIGN_SERVICES = [
  "UX Design",
  "UI Design",
  "Brand Identity",
  "Design Systems",
  "Motion / Prototyping",
  "Editorial Layout",
];

const BUILD_SERVICES = [
  "Webflow Development",
  "Frontend Engineering",
  "Component Libraries",
  "Strategy / Consulting",
  "Art Direction",
  "Creative Strategy",
];

const ENGAGEMENTS = [
  "Sprint — 1 to 2 weeks",
  "Project — 4 to 12 weeks",
  "Lead — 12 weeks +",
  "Advisory — monthly",
];

const CLIENTS = [
  "Sony Audio",
  "The Irish Times",
  "Empire Magazine",
  "Ingenue Quarterly",
];

export default function Services() {
  const headingRef = useRef<HTMLDivElement>(null);
  const colsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          once: true,
        },
      }
    );

    const items = colsRef.current?.querySelectorAll("li");
    if (items) {
      gsap.fromTo(
        items,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          ease: "power2.out",
          stagger: 0.05,
          scrollTrigger: {
            trigger: colsRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );
    }
  }, []);

  const ServiceList = ({ title, items }: { title: string; items: string[] }) => (
    <div>
      <div
        style={{
          fontSize: 11,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "#757575",
          marginBottom: 16,
          paddingBottom: 12,
          borderBottom: "1px solid #262626",
        }}
      >
        {title}
      </div>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {items.map((s) => (
          <li
            key={s}
            style={{
              fontSize: 15,
              lineHeight: 1.45,
              color: "#262626",
              padding: "8px 0",
            }}
          >
            {s}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <section
      id="services"
      style={{
        background: "#ffffff",
        padding: "120px 0",
        borderBottom: "1px solid #262626",
      }}
    >
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 40px" }}>
        <div
          ref={headingRef}
          style={{ textAlign: "center", marginBottom: 72, opacity: 0 }}
        >
          <span
            style={{
              display: "block",
              fontSize: 11,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#757575",
              marginBottom: 24,
            }}
          >
            (04) — Capabilities
          </span>
          <h2
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(56px, 7vw, 96px)",
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              textTransform: "uppercase",
              margin: 0,
              color: "#262626",
            }}
          >
            How{" "}
            <em
              style={{
                fontWeight: 300,
                fontStyle: "italic",
                color: "var(--accent)",
              }}
            >
              can
            </em>{" "}
            I help?
          </h2>
        </div>

        <div
          ref={colsRef}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
            paddingTop: 56,
            borderTop: "1px solid #262626",
          }}
        >
          {/* Left col */}
          <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
            <p style={{ fontSize: 16, lineHeight: 1.55, color: "#262626", margin: 0 }}>
              I work as an independent creative strategist with select studios and brands. Engagements
              range from week-long sprints to multi-quarter system rollouts. Every project starts
              with a written brief and a fixed budget.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
              <ServiceList title="Design" items={DESIGN_SERVICES} />
              <ServiceList title="Build & Direction" items={BUILD_SERVICES} />
            </div>
          </div>

          {/* Right col */}
          <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
            <p style={{ fontSize: 16, lineHeight: 1.55, color: "#262626", margin: 0 }}>
              I do not pitch, and I do not work on retainer without scope. The work is documented,
              billed against the brief, and delivered with source files and a written handoff.
              References available on request.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
              <ServiceList title="Engagement" items={ENGAGEMENTS} />
              <ServiceList title="Past clients" items={CLIENTS} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
