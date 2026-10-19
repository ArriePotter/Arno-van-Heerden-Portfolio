"use client";

import { useRef, useState } from "react";
import { chapters, type ChapterId } from "./chapters";
import { gsap, ScrollTrigger, useGSAP } from "./gsap";
import styles from "./ScrollNav.module.css";

const TICKS = 48;
const STEP = 8; // tick width (1px) + gap (7px), as in Figma
const MAX = 28; // tallest tick, px

// Height falls off with distance from the current position (Figma: A/Scroll nav).
function tickHeight(distance: number) {
  return Math.max(8, MAX - 4.5 * distance);
}

export function ScrollNav() {
  const root = useRef<HTMLElement>(null);
  const ticks = useRef<HTMLSpanElement[]>([]);
  const label = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState<ChapterId>("home");

  useGSAP(
    () => {
      // `pos` is a position along the ticks (can be between ticks). GSAP eases it towards the
      // scroll position, and every frame redraws the ticks from it.
      const state = { pos: chapters[0].tick };
      let current: ChapterId = "home";

      const draw = () => {
        const nearest = Math.round(state.pos);
        ticks.current.forEach((el, i) => {
          el.style.transform = `scaleY(${tickHeight(Math.abs(i - state.pos)) / MAX})`;
          el.dataset.current = String(i === nearest);
        });
        const chapter = chapters.reduce((a, b) =>
          Math.abs(b.tick - state.pos) < Math.abs(a.tick - state.pos) ? b : a,
        );
        if (label.current) label.current.style.transform = `translateX(${state.pos * STEP + 0.5}px) translateX(-50%)`;
        if (chapter.id !== current) {
          current = chapter.id;
          setActive(chapter.id);
        }
      };

      // The nav moves to a page only once that page fills the screen; until then it stays
      // on the previous one.
      let chapterIndex = 0;
      const target = () => {
        const top = window.scrollY;
        const bottom = top + window.innerHeight;
        chapters.forEach((c, i) => {
          const el = document.getElementById(c.id);
          if (!el) return;
          const fullyVisible = el.offsetTop >= top - 2 && el.offsetTop + el.offsetHeight <= bottom + 2;
          if (fullyVisible) chapterIndex = i;
        });
        return chapters[chapterIndex].tick;
      };

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      let last = -1;
      const update = () => {
        const to = target();
        if (to === last) return;
        last = to;
        gsap.to(state, {
          pos: to,
          duration: reduce ? 0 : 0.9,
          ease: "power3.inOut", // eases in and out, no overshoot (not a spring)
          overwrite: true,
          onUpdate: draw,
        });
      };

      const st = ScrollTrigger.create({ start: 0, end: "max", onUpdate: update, onRefresh: update });
      update();
      return () => st.kill();
    },
    { scope: root },
  );

  const current = chapters.find((c) => c.id === active) ?? chapters[0];

  return (
    <nav ref={root} aria-label="Page sections" className={styles.root}>
      <div className={styles.ticks} aria-hidden="true">
        {Array.from({ length: TICKS }, (_, i) => (
          <span
            key={i}
            ref={(el) => {
              if (el) ticks.current[i] = el;
            }}
            className={styles.tick}
            data-current={i === current.tick}
          />
        ))}
      </div>
      <span ref={label} className={styles.label} aria-hidden="true">
        {current.label}
      </span>
      <ol className={styles.links}>
        {chapters.map((c) => (
          <li key={c.id} style={{ left: c.tick * STEP }}>
            <a href={`#${c.id}`} aria-current={c.id === active ? "location" : undefined}>
              <span className={styles.srOnly}>{c.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
