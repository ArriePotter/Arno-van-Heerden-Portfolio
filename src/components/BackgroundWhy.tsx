"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "./gsap";
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
      // Straight left, from its cover position to the horizontal centre, reached exactly when
      // the Intro page fills the screen. After that it stays centred.
      const comp = el.parentElement as HTMLElement;
      gsap.to(el, {
        x: () => comp.offsetWidth / 2 - (el.offsetLeft + el.offsetWidth / 2),
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
