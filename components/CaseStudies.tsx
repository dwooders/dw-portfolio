"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PROJECTS = [
  {
    id: "ingenue",
    kind: "ingenue",
    title: "Ingenue",
    meta: "Editorial Identity · Quarterly",
    discipline: "Brand · Editorial",
    year: "2024",
    bg: "#2a1810",
  },
  {
    id: "sony",
    kind: "sony",
    title: "Sony",
    meta: "Audio Brand Campaign",
    discipline: "Brand · Direction",
    year: "2024",
    bg: "#000000",
  },
  {
    id: "irishtimes",
    kind: "irishtimes",
    title: "The Irish Times",
    meta: "Digital Masthead Refresh",
    discipline: "Web · System",
    year: "2023",
    bg: "#d4d4d0",
  },
  {
    id: "empire",
    kind: "empire",
    title: "Empire",
    meta: "Magazine Cover Series",
    discipline: "Editorial · Cover",
    year: "2024",
    bg: "#c79567",
  },
];

// Artwork components
function IngenueArt() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 60% 60%, #5b3a25 0%, #2a1810 70%, #120a06 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          color: "#e7d4b8",
          fontFamily: "'Inter Tight', serif",
          fontSize: 72,
          fontStyle: "italic",
          fontWeight: 300,
          letterSpacing: "0.04em",
        }}
      >
        Ingenue
      </div>
      <div
        style={{
          position: "absolute",
          left: 24,
          bottom: 20,
          color: "rgba(231,212,184,0.75)",
          fontSize: 11,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
        }}
      >
        Issue 04 — Spring
      </div>
    </div>
  );
}

function SonyArt() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: "#000" }}>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          color: "#ffffff",
          fontFamily: "var(--font-body)",
          fontSize: 88,
          fontWeight: 900,
          letterSpacing: "0.04em",
        }}
      >
        SONY
      </div>
      <div
        style={{
          position: "absolute",
          right: 24,
          top: 20,
          color: "#bbbbbb",
          fontSize: 10,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
        }}
      >
        Brand Campaign
      </div>
      <div
        style={{
          position: "absolute",
          left: 24,
          bottom: 20,
          color: "#bbbbbb",
          fontSize: 10,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
        }}
      >
        Audio · 2024
      </div>
    </div>
  );
}

function IrishTimesArt() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: "#d4d4d0" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(135deg, rgba(0,0,0,0.08) 25%, transparent 25%, transparent 50%, rgba(0,0,0,0.08) 50%, rgba(0,0,0,0.08) 75%, transparent 75%, transparent)",
          backgroundSize: "8px 8px",
          mixBlendMode: "multiply",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
          textAlign: "center",
          color: "#0a0a0a",
          fontFamily: "'Times New Roman', serif",
          fontSize: 56,
          fontWeight: 900,
          lineHeight: 0.95,
          letterSpacing: "-0.02em",
        }}
      >
        THE
        <br />
        IRISH
        <br />
        TIMES
      </div>
    </div>
  );
}

function EmpireArt() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: "#c79567" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(255,200,140,0.4) 0%, rgba(120,70,30,0.5) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: "10% 8%",
          display: "grid",
          gridTemplateColumns: "repeat(8, 1fr)",
          gridTemplateRows: "repeat(6, 1fr)",
          gap: 4,
        }}
      >
        {Array.from({ length: 48 }).map((_, i) => (
          <div
            key={i}
            style={{ background: "rgba(0,0,0,0.18)", border: "1px solid rgba(0,0,0,0.25)" }}
          />
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
          textAlign: "center",
          color: "#ffffff",
          fontFamily: "var(--font-body)",
          fontSize: 68,
          fontWeight: 900,
          letterSpacing: "0.02em",
          textShadow: "0 2px 8px rgba(0,0,0,0.3)",
        }}
      >
        EMPIRE
      </div>
    </div>
  );
}

function CaseCard({
  project,
  idx,
}: {
  project: (typeof PROJECTS)[0];
  idx: number;
}) {
  const [hover, setHover] = useState(false);

  return (
    <a
      href="#"
      onClick={(e) => e.preventDefault()}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "block",
        textDecoration: "none",
        color: "inherit",
        border: "1px solid #262626",
        background: "#ffffff",
        padding: 16,
        transition: "transform 300ms var(--ease-standard)",
        transform: hover ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          paddingBottom: 16,
          marginBottom: 16,
          gap: 24,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 10,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#757575",
              marginBottom: 8,
            }}
          >
            FIG. {String(idx).padStart(2, "0")}
          </div>
          <h3
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 36,
              fontWeight: 900,
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              margin: "0 0 8px",
              color: "#262626",
            }}
          >
            {project.title}
          </h3>
          <div style={{ fontSize: 13, color: "#757575", letterSpacing: "0.02em" }}>
            {project.meta}
          </div>
        </div>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: hover ? "var(--accent)" : "#262626",
            paddingBottom: 4,
            borderBottom: `1px solid ${hover ? "var(--accent)" : "#262626"}`,
            flexShrink: 0,
            marginTop: 4,
            transition: "all 120ms var(--ease-standard)",
          }}
        >
          View case study
        </div>
      </div>

      <div
        style={{
          position: "relative",
          aspectRatio: "16 / 11",
          overflow: "hidden",
          background: project.bg,
        }}
      >
        {project.kind === "ingenue" && <IngenueArt />}
        {project.kind === "sony" && <SonyArt />}
        {project.kind === "irishtimes" && <IrishTimesArt />}
        {project.kind === "empire" && <EmpireArt />}

        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            padding: "24px 28px",
            background: "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.55) 100%)",
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#ffffff",
            opacity: hover ? 1 : 0,
            transition: "opacity 200ms var(--ease-standard)",
          }}
        >
          <span>Open project</span>
          <span>→</span>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingTop: 16,
          fontSize: 11,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "#757575",
        }}
      >
        <span>{project.discipline}</span>
        <span>{project.year}</span>
      </div>
    </a>
  );
}

export default function CaseStudies() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Section header reveal
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          once: true,
        },
      }
    );

    // Cards stagger in
    const cards = gridRef.current?.querySelectorAll("a");
    if (cards) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      style={{
        background: "#ffffff",
        padding: "120px 0 100px",
        borderBottom: "1px solid #262626",
      }}
    >
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 40px" }}>
        {/* Section header */}
        <div
          ref={headerRef}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
            paddingBottom: 56,
            borderBottom: "1px solid #262626",
            marginBottom: 60,
            alignItems: "end",
            opacity: 0,
          }}
        >
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
              (02) — Case Studies
            </div>
            <h2
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(40px, 5vw, 72px)",
                fontWeight: 300,
                lineHeight: 1.0,
                letterSpacing: "-0.02em",
                textTransform: "uppercase",
                margin: 0,
                color: "#262626",
              }}
            >
              Selected Work
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 24, alignItems: "flex-start" }}>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.45,
                color: "#262626",
                maxWidth: 480,
                margin: 0,
              }}
            >
              A small set of recent collaborations across editorial, broadcast, fashion, and
              culture. Each project is a study in constraint — the shortest line between intent
              and image.
            </p>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              style={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#262626",
                paddingBottom: 6,
                borderBottom: "1px solid #262626",
              }}
            >
              Index 04 / 04 <span style={{ marginLeft: 10 }}>↗</span>
            </a>
          </div>
        </div>

        {/* 2x2 grid */}
        <div
          ref={gridRef}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            columnGap: 32,
            rowGap: 64,
          }}
        >
          {PROJECTS.map((p, i) => (
            <CaseCard key={p.id} project={p} idx={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
