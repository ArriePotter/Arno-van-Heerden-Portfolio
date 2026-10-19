"use client";

import { gsap, useGSAP } from "./gsap";

// Two steps as an element slides up into the blur band under the top bar (scrubbed to scroll,
// so it moves exactly with your finger, no springing):
// 1. Blur: from the band's lower edge (200px from the top) it blurs steadily.
// 2. Stretch: only at the very top of the band (the last 60px) does it widen, like the
//    edge of Apple's liquid glass, but blurred.
// Mark elements with `data-stretch`. Off with reduced motion.
export function TopStretch() {
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>("[data-stretch]").forEach((el) => {
        gsap.fromTo(
          el,
          { filter: "blur(0px)", opacity: 1 },
          {
            filter: "blur(8px)",
            opacity: 0.6,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top 200px", end: "top 60px", scrub: true },
          },
        );
        gsap.fromTo(
          el,
          { scaleX: 1 },
          {
            scaleX: 1.35,
            ease: "power1.in",
            immediateRender: false,
            scrollTrigger: { trigger: el, start: "top 60px", end: "top 0px", scrub: true },
          },
        );
      });
    });
    return () => mm.revert();
  });
  return null;
}
