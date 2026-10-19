"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "./gsap";
import styles from "./IntroZoom.module.css";

// Intro → Work, "opening the book": the top statement rows fade out, then the last row splits,
// its two halves sliding off to the left and right, and Work opens up in the gap between them.
// Scrubbed to the scroll; scrolling back closes the book. Both pages sit on one sticky stage.
export function IntroZoom({ intro, work }: { intro: ReactNode; work: ReactNode }) {
  const scene = useRef<HTMLDivElement>(null);
  const introLayer = useRef<HTMLDivElement>(null);
  const workLayer = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const introEl = introLayer.current!;
      const workEl = workLayer.current!;
      const left = introEl.querySelector<HTMLElement>('[data-split="left"]');
      const right = introEl.querySelector<HTMLElement>('[data-split="right"]');
      const fading = introEl.querySelectorAll<HTMLElement>("[data-fade]");
      if (!left || !right) return;

      // From the moment Intro fills the screen to the #work anchor (the opening's length).
      const trigger = () => ({
        trigger: scene.current,
        start: "top top",
        endTrigger: "#work",
        end: "top top",
      });

      const mm = gsap.matchMedia();
      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          if (ctx.conditions?.reduce) {
            // Reduced motion: no movement, the pages cross-fade instead.
            gsap.fromTo(introEl, { autoAlpha: 1 }, { autoAlpha: 0, ease: "none", scrollTrigger: trigger() });
            gsap.fromTo(workEl, { autoAlpha: 0 }, { autoAlpha: 1, ease: "none", scrollTrigger: trigger() });
            return;
          }

          // Untransformed edges of the split, in screen px (minus any x GSAP has already set).
          const edge = (el: HTMLElement, side: "left" | "right") =>
            el.getBoundingClientRect()[side] - (gsap.getProperty(el, "x") as number);

          // Work shows only in the gap that opens between the halves: nothing at first, then
          // everything between the inner edges of "Curious" and "about why" as they part.
          let closedGap = 0;
          const reveal = () => {
            const l = left.getBoundingClientRect().right;
            const r = right.getBoundingClientRect().left;
            const open = r - l - closedGap;
            if (open <= 0) {
              workEl.style.visibility = "hidden";
              return;
            }
            const from = l + closedGap / 2;
            const to = r - closedGap / 2;
            workEl.style.visibility = "visible";
            workEl.style.clipPath = `inset(0 ${window.innerWidth - to}px 0 ${from}px)`;
          };

          const tl = gsap.timeline({
            defaults: { ease: "none" },
            onUpdate: reveal,
            scrollTrigger: {
              ...trigger(),
              scrub: 0.6,
              invalidateOnRefresh: true,
              onRefresh: () => {
                closedGap = edge(right, "left") - edge(left, "right");
                reveal();
              },
            },
          });
          // 1. The top rows and the rings fade out.
          tl.to(fading, { autoAlpha: 0, duration: 0.3 }, 0)
            // 2. The last row splits: each half slides just past its side of the screen.
            .to(left, { x: () => -edge(left, "right") - 24, duration: 0.7, ease: "power2.inOut" }, 0.3)
            .to(right, { x: () => window.innerWidth - edge(right, "left") + 24, duration: 0.7, ease: "power2.inOut" }, 0.3);
          reveal();

          return () => {
            workEl.style.clipPath = "";
            workEl.style.visibility = "";
          };
        },
      );

      return () => mm.revert();
    },
    { scope: scene },
  );

  return (
    <div ref={scene} className={styles.scene}>
      {/* Where the nav and links jump to: Intro at the start of the opening, Work at its end. */}
      <span id="intro" className={styles.anchor} />
      <span id="work" className={`${styles.anchor} ${styles.workAnchor}`} />
      <div className={styles.stage}>
        <div ref={introLayer} className={styles.layer}>
          {intro}
        </div>
        <div ref={workLayer} className={`${styles.layer} ${styles.work}`}>
          {work}
        </div>
      </div>
    </div>
  );
}
