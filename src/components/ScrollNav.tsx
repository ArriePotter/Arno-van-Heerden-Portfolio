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
      // `pos` is a position along the ticks (can be between ticks). It follows the scroll
      // continuously; GSAP eases it so the ticks glide. The word under it only changes
      // once the next page fills the screen.
      const state = { pos: chapters[0].tick };
      let current: ChapterId = "home";
      let chapterIndex = 0;

      const draw = () => {
        const nearest = Math.round(state.pos);
        ticks.current.forEach((el, i) => {
          el.style.transform = `scaleY(${tickHeight(Math.abs(i - state.pos)) / MAX})`;
          el.dataset.current = String(i === nearest);
        });
        if (label.current) label.current.style.transform = `translateX(${state.pos * STEP + 0.5}px) translateX(-50%)`;
      };

      const tops = () => chapters.map((c) => document.getElementById(c.id)?.offsetTop ?? 0);

      // Scroll → position: at a page's tick when that page fills the screen, and moving
      // proportionally towards the next page's tick while scrolling between them.
      const scrollPos = () => {
        const y = window.scrollY;
        const t = tops();
        for (let i = 0; i < chapters.length - 1; i++) {
          if (y < t[i + 1]) {
            const p = gsap.utils.clamp(0, 1, (y - t[i]) / (t[i + 1] - t[i]));
            return gsap.utils.interpolate(chapters[i].tick, chapters[i + 1].tick, p);
          }
        }
        return chapters[chapters.length - 1].tick;
      };

      // The word: the last page that was fully on screen.
      const updateWord = () => {
        const top = window.scrollY;
        const bottom = top + window.innerHeight;
        chapters.forEach((c, i) => {
          const el = document.getElementById(c.id);
          if (!el) return;
          if (el.offsetTop >= top - 2 && el.offsetTop + el.offsetHeight <= bottom + 2) chapterIndex = i;
        });
        const id = chapters[chapterIndex].id;
        if (id !== current) {
          current = id;
          setActive(id);
        }
      };

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const update = () => {
        updateWord();
        gsap.to(state, {
          pos: scrollPos(),
          duration: reduce ? 0 : 0.5,
          ease: "power3.out", // glides and settles, no overshoot (not a spring)
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
