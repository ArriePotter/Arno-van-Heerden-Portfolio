"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "./gsap";
import styles from "./BackgroundWhy.module.css";

// One faint "Why" behind the whole page. It stays put while the pages scroll up over it,
// and drifts right as you scroll (scrubbed to the scroll position).
export function BackgroundWhy() {
  const ref = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.to(ref.current, {
        xPercent: 30,
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: 0.8 },
      });
    });
    return () => mm.revert();
  });

  return (
    <div className={styles.layer} aria-hidden="true">
      <div className={styles.comp}>
        <p ref={ref} className={styles.why}>
          Why
        </p>
      </div>
    </div>
  );
}
