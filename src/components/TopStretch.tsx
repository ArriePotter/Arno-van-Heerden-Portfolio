"use client";

import { gsap, useGSAP } from "./gsap";

// As an element slides up under the top bar it stretches wider and blurs, like the moodboard
// reference (scrubbed to scroll). Mark elements with `data-stretch`. Off with reduced motion.
export function TopStretch() {
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>("[data-stretch]").forEach((el) => {
        gsap.fromTo(
          el,
          { scaleX: 1, filter: "blur(0px)", opacity: 1 },
          {
            scaleX: 1.35,
            filter: "blur(10px)",
            opacity: 0.5,
            ease: "power1.in",
            scrollTrigger: { trigger: el, start: "top 200px", end: "bottom top", scrub: true },
          },
        );
      });
    });
    return () => mm.revert();
  });
  return null;
}
