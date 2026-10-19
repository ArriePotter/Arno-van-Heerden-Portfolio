"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "./gsap";

// Holds its content still for the first part of the scroll, then lets it scroll away
// normally: for the first `hold` fraction of a screen height it moves down exactly as much
// as the page moves up. Scrubbed to scroll; off with reduced motion.
export function HoldOnScroll({
  className,
  hold = 0.3,
  children,
}: {
  className?: string;
  hold?: number;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const distance = () => window.innerHeight * hold;
      gsap.to(el, {
        y: distance,
        ease: "none",
        scrollTrigger: { start: 0, end: () => distance(), scrub: true, invalidateOnRefresh: true },
      });
    });
    return () => mm.revert();
  });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
