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
  const drawerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const drawerLinksRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Entrance animation
  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 }
    );

    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Drawer open/close animation
  useEffect(() => {
    const drawer = drawerRef.current;
    const overlay = overlayRef.current;
    const links = drawerLinksRef.current?.children;

    if (!drawer || !overlay) return;

    if (menuOpen) {
      // Lock body scroll
      document.body.style.overflow = "hidden";

      gsap.to(overlay, { opacity: 1, duration: 0.25, ease: "power2.out", pointerEvents: "auto" });
      gsap.fromTo(
        drawer,
        { x: "100%" },
        { x: "0%", duration: 0.45, ease: "power3.out" }
      );
      if (links) {
        gsap.fromTo(
          links,
          { x: 40, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.4, ease: "power3.out", stagger: 0.07, delay: 0.2 }
        );
      }
    } else {
      document.body.style.overflow = "";

      gsap.to(overlay, { opacity: 0, duration: 0.2, ease: "power2.in", pointerEvents: "none" });
      gsap.to(drawer, { x: "100%", duration: 0.35, ease: "power3.in" });
    }
  }, [menuOpen]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const navigate = (id: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, menuOpen ? 400 : 0);
  };

  // Hamburger bar style
  const bar = (offsetY: number, open: boolean, role: "top" | "mid" | "bot"): React.CSSProperties => ({
    position: "absolute",
    left: 0,
    right: 0,
    height: 1.5,
    background: "#ffffff",
    transition: "transform 300ms cubic-bezier(0.2,0,0.2,1), opacity 200ms ease",
    top: "50%",
    transform: open
      ? role === "top"
        ? "translateY(-50%) rotate(45deg)"
        : role === "bot"
        ? "translateY(-50%) rotate(-45deg)"
        : "translateY(-50%) scaleX(0)"
      : role === "top"
      ? `translateY(calc(-50% - ${offsetY}px))`
      : role === "bot"
      ? `translateY(calc(-50% + ${offsetY}px))`
      : "translateY(-50%)",
    opacity: open && role === "mid" ? 0 : 1,
  });

  return (
    <>
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
            padding: "0 24px",
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
              flexShrink: 0,
              zIndex: 1,
            }}
          >
            <span style={{ fontWeight: 900 }}>DW</span>
            <span style={{ fontWeight: 300, color: "#757575" }}>/</span>
            <span style={{ fontWeight: 300 }}>STUDIO</span>
          </button>

          {/* Desktop nav — hidden below 1024px */}
          <nav
            style={{
              display: "flex",
              gap: scrolled ? 28 : 40,
              transition: "gap 280ms cubic-bezier(0.2,0,0.2,1)",
            }}
            className="desktop-nav"
          >
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

          {/* Desktop CTA — hidden below 1024px */}
          <button
            onClick={() => navigate("contact")}
            className="desktop-cta"
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

          {/* Hamburger — shown below 1024px */}
          <button
            className="hamburger"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
            style={{
              position: "relative",
              width: 36,
              height: 36,
              background: "none",
              border: "none",
              cursor: "pointer",
              flexShrink: 0,
              display: "none", // overridden by CSS below
            }}
          >
            <span style={bar(6, menuOpen, "top")} />
            <span style={bar(0, menuOpen, "mid")} />
            <span style={bar(6, menuOpen, "bot")} />
          </button>
        </div>
      </header>

      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={() => setMenuOpen(false)}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 48,
          background: "rgba(0,0,0,0.6)",
          opacity: 0,
          pointerEvents: "none",
        }}
      />

      {/* Slide-in drawer */}
      <div
        ref={drawerRef}
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "min(320px, 85vw)",
          zIndex: 49,
          background: "#0a0a0a",
          borderLeft: "1px solid rgba(255,255,255,0.10)",
          transform: "translateX(100%)",
          display: "flex",
          flexDirection: "column",
          paddingTop: 100,
          paddingBottom: 48,
          paddingLeft: 32,
          paddingRight: 32,
        }}
      >
        {/* Drawer nav links */}
        <div
          ref={drawerLinksRef}
          style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}
        >
          {NAV_LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => navigate(l.id)}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                fontFamily: "var(--font-body)",
                fontSize: 32,
                fontWeight: 900,
                letterSpacing: "-0.01em",
                textTransform: "uppercase",
                color: active === l.id ? "var(--accent)" : "#ffffff",
                background: "none",
                border: "none",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                padding: "20px 0",
                cursor: "pointer",
                lineHeight: 1,
              }}
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* Drawer CTA */}
        <button
          onClick={() => navigate("contact")}
          style={{
            marginTop: 40,
            fontFamily: "var(--font-body)",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#ffffff",
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.5)",
            padding: "14px 20px",
            cursor: "pointer",
          }}
        >
          Start a project →
        </button>

        {/* Drawer footer */}
        <div
          style={{
            marginTop: 24,
            fontSize: 11,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#757575",
          }}
        >
          © DW Studio · 2025
        </div>
      </div>

      {/* Responsive CSS */}
      <style>{`
        @media (max-width: 1023px) {
          .desktop-nav { display: none !important; }
          .desktop-cta { display: none !important; }
          .hamburger  { display: flex !important; align-items: center; justify-content: center; }
        }
      `}</style>
    </>
  );
}
