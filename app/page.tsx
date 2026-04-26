"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import CaseStudies from "@/components/CaseStudies";
import Stages from "@/components/Stages";
import Services from "@/components/Services";
import About from "@/components/About";
import Contact from "@/components/Contact";

const SECTION_IDS = ["home", "work", "process", "services", "about", "contact"];

export default function Page() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const opts: IntersectionObserverInit = {
      rootMargin: "-40% 0px -55% 0px",
      threshold: 0,
    };
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) setActive(e.target.id);
      });
    }, opts);
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <Header active={active} />
      <main>
        <Hero />
        <Marquee />
        <CaseStudies />
        <Stages />
        <Services />
        <About />
        <Contact />
      </main>
    </>
  );
}
