# 0012: Motion runs on GSAP plus CSS scroll-driven animations, not Motion for React

- **Date:** 2026-10-19
- **Status:** Accepted (changes the motion library named in 0011)
- **Department:** Design engineering / Motion design
- **Phase:** Build (reverse mode, 0011)
- **Decided by:** Arno

## Context

Decision 0011 named Motion for React for the prototype's motion. The first round of feedback asked for scroll-linked behaviour that is smooth, eased and never springy ("the lines should ease larger and smaller, not spring"), plus several layers that move at different speeds while scrolling.

## Options considered

1. **Motion for React** (0011). Good for component state and springs; scroll-scrubbed timelines are less direct.
2. **GSAP 3 + ScrollTrigger**, with `@gsap/react` (`useGSAP`) for clean set-up and tear-down in React.
3. **CSS scroll-driven animations only** (`animation-timeline: scroll()/view()`). Runs on the compositor, in step with the scroll, but no JS logic.

## Decision

Options 2 and 3 together:

- **GSAP** for anything with logic: the scroll nav (eased position, letter swaps, hover), the Intro → Work book opening, the Work cards bending.
- **CSS scroll-driven animations** for plain "this moves with the scroll" layers: the title hold and face parallax on the cover, the photo drift on About. These run in step with the scroll, with no frame of lag.
- Reduced motion is handled in both: `gsap.matchMedia()` and `@media (prefers-reduced-motion)`.

## Evidence

- A script that moves a layer from scroll events runs a frame behind the scroll, so it jitters against native scrolling; the title hold built in GSAP "bounced" (Arno) and was rebuilt in CSS. Chrome's engineers say the same: JavaScript "doesn't guarantee that parallaxing will keep in step with the page's scroll position" (Chrome for Developers, Performant parallaxing; in `docs/sources.md`).
- GSAP's ScrollTrigger scrub gives eased, interruptible, non-spring scroll motion for the nav (Arno's brief).

## Consequences

- Two motion systems to know; the rule of thumb is "logic → GSAP, plain scroll-linked layer → CSS".
- CSS scroll-driven animations aren't in Firefox yet: there, those layers simply scroll normally (an acceptable fallback).

## Case-study note

I chose the motion tool per job: CSS where a layer only follows the scroll, because it can't lag; GSAP where motion needs logic.
