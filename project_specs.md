# Project Specs — DW Portfolio

## What it does
Single-page portfolio website for Davy Woodward — Creative Strategist, Designer, Storyteller based in New York City. One long scrolling page with sticky nav anchors.

## Who uses it
Potential clients, studios, and collaborators who want to learn about Davy's work and get in touch.

## Tech stack
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + custom CSS variables
- **Animations:** GSAP + ScrollTrigger + @gsap/react
- **Fonts:** Inter Tight (Google Fonts)
- **Deployment:** Vercel

## Pages / Sections
Single page (`/`) with these anchor sections:
1. **#home** — Hero: Big display typography, headshot card, intro copy
2. **#work** — Case Studies: 2×2 grid of project cards (Ingenue, Sony, Irish Times, Empire)
3. **#process** — Stages: 6-step accordion process breakdown
4. **#services** — Services: Two-column capabilities block
5. **#about** — About: Dark section with stats grid
6. **#contact** — Contact: Massive "CONTACT ME" type + 4-col footer + newsletter

## Design System
BMW CI2020-inspired Precision Portfolio design system:
- Zero border radius (sharp corners everywhere)
- Inter Tight font: weights 300/400/700/900
- Colors: #ffffff (surface), #0a0a0a (dark), #262626 (primary text), #1c69d4 (accent blue)
- 1px hairline rules, no decorative gradients
- Uppercase type throughout

## GSAP Animations
- **Hero:** Characters slide up and fade in on page load (staggered per word)
- **Marquee:** Continuous loop using CSS animation + GSAP hover speed-up
- **Case Studies:** Cards stagger reveal on scroll (ScrollTrigger)
- **Stages:** Section heading reveals, accordion smooth expand
- **Services:** List items stagger in from left on scroll
- **About:** Stats count up from 0 on scroll entry
- **Contact:** Big headline characters animate in on scroll
- **Global:** Smooth section reveals with fade+translate

## Data
Static — all content is hardcoded in components. No database or auth needed.

## What "done" looks like
- Pixel-perfect match to design file
- All GSAP animations working smoothly
- Sticky nav highlights active section
- Build passes `npm run build` with no errors
- Dev server runs with no console errors
