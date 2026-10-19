"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "./gsap";
import styles from "./BackgroundWhy.module.css";

// One faint "Why" behind the whole page. It stays put while the pages scroll up over it,
// and glides into the centre by the time the Intro page fills the screen (scrubbed to scroll).
export function BackgroundWhy() {
  const ref = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Straight left, from its cover position to its final spot, reached exactly when
      // the Intro page fills the screen. After that it stays put.
      const comp = el.parentElement as HTMLElement;
      gsap.to(el, {
        // Ends with equal margins left and right: the visible letters (from the left edge of
        // the W to the right edge of the y, measured from the font itself, since the italic y
        // sticks out past its box) are centred in the window.
        x: () => {
          const style = getComputedStyle(el);
          const ctx = document.createElement("canvas").getContext("2d");
          if (!ctx) return 0;
          ctx.font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
          ctx.letterSpacing = style.letterSpacing;
          const m = ctx.measureText(el.textContent ?? "");
          const boxLeft = comp.getBoundingClientRect().left + el.offsetLeft;
          const glyphCentre = boxLeft + (m.actualBoundingBoxRight - m.actualBoundingBoxLeft) / 2;
          return window.innerWidth / 2 - glyphCentre;
        },
        ease: "none",
        scrollTrigger: {
          start: 0,
          endTrigger: "#intro",
          end: "top top",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });
    });
    document.fonts.ready.then(() => ScrollTrigger.refresh());
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
