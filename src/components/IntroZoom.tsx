"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "./gsap";
import styles from "./IntroZoom.module.css";

// Intro → Work: the camera zooms into the middle ring on the Intro page, and Work appears
// inside the ring as it grows, until Work fills the screen. Scrubbed to the scroll; scrolling
// back zooms out. Both pages sit on one sticky stage, so nothing moves except the zoom.
export function IntroZoom({ intro, work }: { intro: ReactNode; work: ReactNode }) {
  const scene = useRef<HTMLDivElement>(null);
  const introLayer = useRef<HTMLDivElement>(null);
  const workLayer = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const introEl = introLayer.current!;
      const workEl = workLayer.current!;
      const ring = introEl.querySelector<HTMLElement>("[data-zoom-target]");
      if (!ring) return;

      // Measured untransformed on every refresh (resize, fonts): the ring's centre on the
      // stage, its inside radius, and how far to zoom so that inside covers the whole screen.
      let cx = 0;
      let cy = 0;
      let inner = 1;
      let maxScale = 1;
      let progress = 0;
      const measure = () => {
        gsap.set(introEl, { clearProps: "transform" });
        const stage = introEl.getBoundingClientRect();
        const r = ring.getBoundingClientRect();
        cx = r.left + r.width / 2 - stage.left;
        cy = r.top + r.height / 2 - stage.top;
        inner = r.width / 2 - parseFloat(getComputedStyle(ring).borderLeftWidth);
        const corner = Math.hypot(Math.max(cx, stage.width - cx), Math.max(cy, stage.height - cy));
        maxScale = (corner / inner) * 1.05;
        render(progress);
      };

      // Zoom speed feels constant when scale grows exponentially (each bit of scroll multiplies
      // the size by the same amount), so scale = maxScale ^ progress.
      const render = (p: number) => {
        progress = p;
        const scale = Math.pow(maxScale, p);
        gsap.set(introEl, { scale, transformOrigin: `${cx}px ${cy}px` });
        // Work shows only inside the ring: 0 at the start, the ring's inside as it grows.
        const radius = inner * (scale - 1);
        workEl.style.clipPath = p >= 1 ? "none" : `circle(${radius}px at ${cx}px ${cy}px)`;
        workEl.style.visibility = p <= 0 ? "hidden" : "visible";
      };

      const mm = gsap.matchMedia();
      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          if (ctx.conditions?.reduce) {
            // Reduced motion: no zoom, the pages cross-fade instead.
            gsap.fromTo(introEl, { autoAlpha: 1 }, { autoAlpha: 0, ease: "none", scrollTrigger: trigger() });
            gsap.fromTo(workEl, { autoAlpha: 0 }, { autoAlpha: 1, ease: "none", scrollTrigger: trigger() });
            return;
          }
          const proxy = { p: 0 };
          gsap.to(proxy, {
            p: 1,
            ease: "none",
            onUpdate: () => render(proxy.p),
            scrollTrigger: { ...trigger(), scrub: 0.6, onRefresh: measure },
          });
          measure();
          return () => {
            gsap.set(introEl, { clearProps: "transform" });
            workEl.style.clipPath = "";
            workEl.style.visibility = "";
          };
        },
      );

      // From the moment Intro fills the screen to the #work anchor (the zoom's length).
      function trigger() {
        return { trigger: scene.current, start: "top top", endTrigger: "#work", end: "top top" };
      }

      return () => mm.revert();
    },
    { scope: scene },
  );

  return (
    <div ref={scene} className={styles.scene}>
      {/* Where the nav and links jump to: Intro at the start of the zoom, Work at its end. */}
      <span id="intro" className={styles.anchor} />
      <span id="work" className={`${styles.anchor} ${styles.workAnchor}`} />
      <div className={styles.stage}>
        <div ref={introLayer} className={styles.layer}>
          {intro}
        </div>
        <div ref={workLayer} className={styles.layer}>
          {work}
        </div>
      </div>
    </div>
  );
}
