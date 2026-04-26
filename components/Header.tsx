"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "work", label: "Case Studies" },
  { id: "services", label: "Services" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

interface HeaderProps {
  active: string;
}

export default function Header({ active }: HeaderProps) {
  const headerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Entrance animation
    const tl = gsap.timeline();
    tl.fromTo(
      headerRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 }
    );

    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navigate = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      ref={headerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: scrolled ? "rgba(10,10,10,0.95)" : "rgba(10,10,10,0.72)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        transition: "background 300ms ease",
        opacity: 0,
      }}
    >
      <div
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          padding: scrolled ? "0 40px" : "0 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: scrolled ? 52 : 80,
          transition: "height 280ms cubic-bezier(0.2,0,0.2,1)",
        }}
      >
        {/* Logo */}
        <button
          onClick={() => navigate("home")}
          style={{
            display: "inline-flex",
            alignItems: "baseline",
            gap: 4,
            fontFamily: "var(--font-body)",
            fontSize: scrolled ? 14 : 18,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "#ffffff",
            background: "none",
            border: "none",
            cursor: "pointer",
            lineHeight: 1.3,
            transition: "font-size 280ms cubic-bezier(0.2,0,0.2,1)",
          }}
        >
          <span style={{ fontWeight: 900 }}>DW</span>
          <span style={{ fontWeight: 300, color: "#757575" }}>/</span>
          <span style={{ fontWeight: 300 }}>STUDIO</span>
        </button>

        {/* Nav links */}
        <nav style={{ display: "flex", gap: scrolled ? 28 : 40, transition: "gap 280ms cubic-bezier(0.2,0,0.2,1)" }}>
          {NAV_LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => navigate(l.id)}
              style={{
                fontSize: scrolled ? 11 : 13,
                fontWeight: 900,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                color: active === l.id ? "var(--accent)" : "#ffffff",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--font-body)",
                transition: "color 120ms var(--ease-standard), font-size 280ms cubic-bezier(0.2,0,0.2,1)",
                padding: 0,
              }}
            >
              {l.label}
            </button>
          ))}
        </nav>

        {/* CTA */}
        <button
          onClick={() => navigate("contact")}
          style={{
            fontSize: scrolled ? 10 : 12,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#ffffff",
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.6)",
            padding: scrolled ? "7px 14px" : "10px 20px",
            cursor: "pointer",
            fontFamily: "var(--font-body)",
            transition: "all 280ms cubic-bezier(0.2,0,0.2,1)",
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
          Start a project →
        </button>
      </div>
    </header>
  );
}
