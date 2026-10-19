"use client";

import { useRef } from "react";
import { Face } from "./Face";
import { gsap, useGSAP } from "./gsap";

// The face scrolls up a little faster than the title beside it (parallax): over the cover's
// scroll out of view it moves an extra 15% of its own height upwards. Scrubbed to scroll;
// off with reduced motion.
export function ParallaxFace({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    const el = ref.current;
    const section = el?.closest("section");
    if (!el || !section) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.to(el, {
        yPercent: -15,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: true },
      });
    });
    return () => mm.revert();
  });

  return <Face ref={ref} className={className} />;
}
