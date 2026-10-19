"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "./gsap";
import stage from "./Stage.module.css";

// The faint "Why" behind each page. It drifts right as its page scrolls past (scrubbed to scroll).
// `left` is where it sits when the page fills the screen, as in Figma.
export function BackgroundWhy({ left }: { left: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    const el = ref.current;
    const section = el?.closest("section");
    if (!el || !section) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        el,
        { xPercent: -8 },
        {
          xPercent: 8,
          ease: "none",
          scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 0.8 },
        },
      );
    });
    return () => mm.revert();
  });

  return (
    <p ref={ref} className={stage.why} style={{ left }} aria-hidden="true">
      Why
    </p>
  );
}
