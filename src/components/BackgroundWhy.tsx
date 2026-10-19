"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "./gsap";
import styles from "./BackgroundWhy.module.css";

// One faint "Why" behind the whole page. It stays put while the pages scroll up over it,
// and glides into the centre by the time the Intro page fills the screen (scrubbed to scroll).
// Where the letters' ink starts and ends, in em from the start of the text box.
const INK_LEFT = 0.068;
const INK_RIGHT = 1.864;

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
        // Ends with equal margins left and right: the visible letters are centred in the
        // window. The ink of "Why" in STIX Two Text Italic runs from 0.068em to 1.864em from
        // the start of its box (the italic y sticks out past the box). Measured once in Chrome
        // and fixed here, so it doesn't depend on the browser or on when the font loads.
        x: () => {
          const fontSize = parseFloat(getComputedStyle(el).fontSize);
          const boxLeft = comp.getBoundingClientRect().left + el.offsetLeft;
          const inkCentre = boxLeft + fontSize * ((INK_LEFT + INK_RIGHT) / 2);
          return window.innerWidth / 2 - inkCentre;
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
