"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STAGES = [
  {
    num: "01",
    label: "Briefing",
    body: "At the start of any engagement we align on objectives, audience, and constraint. The brief is short, written, and signed before any visual work begins. Output: signed scope of work and a project schedule.",
  },
  {
    num: "02",
    label: "Analytics",
    body: "Existing surfaces are audited for performance, accessibility, and conversion. Heuristic review pairs with quantitative data to identify what is working and what is not.",
  },
  {
    num: "03",
    label: "Prototyping",
    body: "Wireframes evolve into interactive prototypes within a week. We test flows on real devices before any pixel is committed to the visual layer.",
  },
  {
    num: "04",
    label: "Design",
    body: "Visual direction is committed across the system, not slide by slide. Components are built once and reused everywhere, ensuring consistency at any scale.",
  },
  {
    num: "05",
    label: "Empathy",
    body: "Designs are tested with five users at minimum. Usability, comprehension, and tone are evaluated; copy and IA are revised accordingly.",
  },
  {
    num: "06",
    label: "The Final",
    body: "Final files, design tokens, and a written handoff document are delivered. Engineering review continues for two weeks after launch at no additional cost.",
  },
];

export default function Stages() {
  const [open, setOpen] = useState<number>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const bodyRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          once: true,
        },
      }
    );

    const rows = listRef.current?.querySelectorAll("li");
    if (rows) {
      gsap.fromTo(
        rows,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );
    }
  }, []);

  const toggle = (i: number) => {
    setOpen((prev) => (prev === i ? -1 : i));
  };

  return (
    <section
      ref={sectionRef}
      id="process"
      style={{
        background: "#ffffff",
        padding: "120px 0",
        borderBottom: "1px solid #262626",
      }}
    >
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 40px" }}>
        <div
          ref={headingRef}
          style={{ textAlign: "center", marginBottom: 80, opacity: 0 }}
        >
          <div
            style={{
              fontSize: 11,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#757575",
              marginBottom: 24,
            }}
          >
            (03) — Process
          </div>
          <h2
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(48px, 7vw, 80px)",
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              textTransform: "uppercase",
              margin: 0,
              color: "#262626",
            }}
          >
            Stages of website
            <br />
            <span
              style={{
                color: "transparent",
                WebkitTextStroke: "1px var(--accent)",
              }}
            >
              development
            </span>
          </h2>
        </div>

        <ul
          ref={listRef}
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            borderTop: "1px solid #262626",
          }}
        >
          {STAGES.map((stage, i) => {
            const isOpen = open === i;
            return (
              <li
                key={stage.num}
                style={{ borderBottom: "1px solid #262626" }}
              >
                <button
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  style={{
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns: "120px 1fr 32px",
                    alignItems: "center",
                    gap: 32,
                    padding: "26px 8px",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    fontFamily: "var(--font-body)",
                    color: "#262626",
                  }}
                >
                  <span
                    style={{
                      fontSize: 11,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: "#757575",
                    }}
                  >
                    STAGE {stage.num}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 22,
                      fontWeight: 700,
                      letterSpacing: "0.02em",
                      textTransform: "uppercase",
                      transition: "color 120ms var(--ease-standard)",
                      color: isOpen ? "var(--accent)" : "#262626",
                    }}
                  >
                    {stage.label}
                  </span>
                  <span
                    style={{
                      fontSize: 24,
                      fontWeight: 300,
                      justifySelf: "end",
                      lineHeight: 1,
                      color: isOpen ? "var(--accent)" : "#262626",
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                      transition:
                        "transform 250ms var(--ease-standard), color 120ms var(--ease-standard)",
                      display: "inline-block",
                    }}
                    aria-hidden
                  >
                    +
                  </span>
                </button>

                <div
                  ref={(el) => { bodyRefs.current[i] = el; }}
                  style={{
                    overflow: "hidden",
                    maxHeight: isOpen ? 240 : 0,
                    opacity: isOpen ? 1 : 0,
                    paddingTop: isOpen ? 8 : 0,
                    paddingBottom: isOpen ? 28 : 0,
                    transition:
                      "max-height 360ms var(--ease-standard), opacity 200ms var(--ease-standard), padding 200ms var(--ease-standard)",
                  }}
                >
                  <div
                    style={{
                      paddingLeft: 152,
                      paddingRight: 64,
                      maxWidth: 800,
                    }}
                  >
                    <p
                      style={{
                        fontSize: 15,
                        lineHeight: 1.55,
                        color: "#262626",
                        margin: 0,
                      }}
                    >
                      {stage.body}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
