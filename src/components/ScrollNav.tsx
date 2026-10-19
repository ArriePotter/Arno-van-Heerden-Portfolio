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
        if (label.current) label.current.style.transform = `translateX(${state.pos * STEP}px)`;
        if (chapter.id !== current) {
          current = chapter.id;
          setActive(chapter.id);
        }
      };

      // Scroll → target position: a page's tick when that page fills the screen, and in
      // between while it scrolls to the next page.
      const target = () => {
        const mid = window.scrollY + 1;
        const tops = chapters.map((c) => document.getElementById(c.id)?.offsetTop ?? 0);
        for (let i = 0; i < chapters.length - 1; i++) {
          if (mid < tops[i + 1]) {
            const t = gsap.utils.clamp(0, 1, (mid - tops[i]) / (tops[i + 1] - tops[i]));
            return gsap.utils.interpolate(chapters[i].tick, chapters[i + 1].tick, t);
          }
        }
        return chapters[chapters.length - 1].tick;
      };

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const update = () =>
        gsap.to(state, {
          pos: target(),
          duration: reduce ? 0 : 0.6,
          ease: "power3.out", // eases in and settles, no overshoot (not a spring)
          overwrite: true,
          onUpdate: draw,
        });

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
