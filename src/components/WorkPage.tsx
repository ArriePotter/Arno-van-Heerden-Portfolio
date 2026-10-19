"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "./gsap";
import stage from "./Stage.module.css";
import styles from "./WorkPage.module.css";

// Placeholder cards until the case studies exist. Khoisān is Case Study 1 (decision 0005).
const cards = [
  { label: "Case study 01", title: "Project Khoisān", line: "A training app for the MUT 60 trail race." },
  { label: "Case study 02", title: "Coming soon", line: "" },
];

// The cards rise from the bottom side by side, a thin gap between them. As they reach the
// "Work" title they part around an invisible circle round it, like water round a stone, and
// come to rest either side of it. Scrubbed to the scroll after the book has opened.
export function WorkPage() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current!;
      const [left, right] = section.querySelectorAll<HTMLElement>("[data-card]");
      // Elements, not selector strings: inside useGSAP's scope a string would only search
      // this section, and the anchors live outside it.
      const workAnchor = document.getElementById("work");
      const about = document.getElementById("about");
      if (!left || !right || !workAnchor || !about) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Measured at rest (no transforms): the circle's radius is half the space between the
        // resting cards; `gap` is the thin whitespace between them while they travel together.
        let ring = 0;
        let gap = 8;
        let rise = 0;
        let height = 0;
        const measure = () => {
          gsap.set([left, right], { clearProps: "transform" });
          const l = left.getBoundingClientRect();
          const r = right.getBoundingClientRect();
          ring = (r.left - l.right) / 2;
          gap = 8;
          height = l.height;
          // Start fully below the screen: the title sits in the middle of the stuck stage.
          rise = window.innerHeight / 2 + height / 2;
          render(proxy.p);
        };

        const render = (p: number) => {
          // How far the cards' centre is below the title's centre, in px.
          const dy = rise * (1 - p);
          // Vertical distance from the cards' nearest edge to the title's centre.
          const clear = Math.max(0, dy - height / 2);
          // Part around the circle: 0 when far away, 1 when level with the title. Eased with a
          // quarter sine so the parting starts gently instead of with a kink.
          const t = gsap.utils.clamp(0, 1, 1 - clear / ring);
          const half = gap / 2 + (ring - gap / 2) * Math.sin((t * Math.PI) / 2);
          // Each card's x is relative to its resting place (`ring` from the centre).
          gsap.set(left, { x: ring - half, y: dy });
          gsap.set(right, { x: half - ring, y: dy });
        };

        const proxy = { p: 0 };
        gsap.to(proxy, {
          p: 1,
          ease: "none",
          onUpdate: () => render(proxy.p),
          scrollTrigger: {
            trigger: workAnchor,
            start: "top top",
            endTrigger: about,
            end: "top bottom",
            scrub: 0.6,
            onRefresh: measure,
          },
        });
        measure();
        return () => gsap.set([left, right], { clearProps: "transform" });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className={stage.stage} aria-labelledby="work-title">
      <div className={styles.wrap}>
        <h2 id="work-title" className={styles.title}>
          Work
        </h2>
        <ul className={styles.cards}>
          {cards.map((c, i) => (
            <li key={c.label} className={styles.card} data-card={i === 0 ? "left" : "right"}>
              <p className={styles.label}>{c.label}</p>
              <h3 className={styles.cardTitle}>{c.title}</h3>
              {c.line && <p className={styles.line}>{c.line}</p>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
