"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "./gsap";
import styles from "./CoverFooter.module.css";

// The cover's footer line (Portfolio ’26 · signature · V1.0.0). It stays fixed in place
// while the page scrolls, and fades out over the first 40% of a screen of scrolling
// (back in when you scroll back up). Hidden for good once faded, so it can't be clicked.
export function CoverFooter() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(ref.current, {
      autoAlpha: 0,
      ease: "none",
      scrollTrigger: { start: 0, end: () => window.innerHeight * 0.4, scrub: true, invalidateOnRefresh: true },
    });
  });

  return (
    <div ref={ref} className={styles.layer}>
      <div className={styles.comp}>
        <footer className={styles.bottom}>
          <span>Portfolio ’26</span>
          <a href="#home" className={styles.signature} aria-label="Arno van Heerden, home">
            Arno van Heerden
          </a>
          <span>V1.0.0</span>
        </footer>
      </div>
    </div>
  );
}
