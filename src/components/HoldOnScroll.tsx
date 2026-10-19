"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "./gsap";

// Makes its content scroll a little slower than the page (parallax), so it lags behind
// for a moment instead of stopping dead. Over the section's scroll out of view it trails
// by `lag` × the screen height. Scrubbed to scroll; off with reduced motion.
export function HoldOnScroll({
  className,
  lag = 0.12,
  children,
}: {
  className?: string;
  lag?: number;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = ref.current;
    const section = el?.closest("section");
    if (!el || !section) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.to(el, {
        y: () => window.innerHeight * lag,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
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
