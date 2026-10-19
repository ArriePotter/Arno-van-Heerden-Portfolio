"use client";

import { gsap, useGSAP } from "./gsap";

// As an element crosses a line just under the top bar it quickly stretches wider and blurs, like the moodboard
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
            // A hard line 120px from the top: nothing changes below it, and the full effect
            // kicks in over the next 80px of travel (fast-out ease).
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 120px", end: "top 40px", scrub: true },
          },
        );
      });
    });
    return () => mm.revert();
  });
  return null;
}
