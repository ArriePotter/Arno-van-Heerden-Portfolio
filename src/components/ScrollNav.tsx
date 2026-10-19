"use client";

import { useRef, useState } from "react";
import { chapters, TICKS, type ChapterId } from "./chapters";
import { gsap, ScrollTrigger, useGSAP } from "./gsap";
import styles from "./ScrollNav.module.css";

const STEP = 8; // tick width (1px) + gap (7px), as in Figma
const MAX = 28; // tallest tick, px

// Height falls off with distance from the current position (Figma: A/Scroll nav).
function tickHeight(distance: number) {
  return Math.max(8, MAX - 4.5 * distance);
}

// The page whose stretch of ticks `pos` is in: each page owns the ticks closest to its own,
// so the word switches halfway between two pages, the same way scrolling up or down.
function chapterAt(pos: number) {
  return chapters.reduce((a, b) => (Math.abs(b.tick - pos) < Math.abs(a.tick - pos) ? b : a));
}

export function ScrollNav() {
  const root = useRef<HTMLElement>(null);
  const ticks = useRef<HTMLSpanElement[]>([]);
  const anchor = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState<ChapterId>("home");

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      // `pos` is a position along the ticks (can be between ticks). It follows the scroll;
      // GSAP eases it so the ticks glide.
      const state = { pos: chapters[0].tick };
      let current: ChapterId = chapters[0].id;
      let word: HTMLSpanElement | null = null;
      let hovering = false;

      // Build a word as one span per letter, so the letters can move one after another.
      const makeWord = (text: string) => {
        const w = document.createElement("span");
        w.className = styles.word;
        for (const ch of text) {
          const l = document.createElement("span");
          l.className = styles.letter;
          l.textContent = ch;
          w.append(l);
        }
        anchor.current?.append(w);
        return w;
      };

      // Word change, in sequence so the words never overlap: the old word's letters rise up
      // and out (left to right), then the new word's letters rise in from below (left to
      // right). A new change mid-swap finishes the previous one instantly first.
      let swap: gsap.core.Timeline | null = null;
      const swapWord = (text: string) => {
        swap?.progress(1);
        const old = word;
        word = makeWord(text);
        if (reduce || !old) {
          old?.remove();
          return;
        }
        gsap.set(word.children, { yPercent: 110 });
        swap = gsap
          .timeline()
          .to(old.children, { yPercent: -110, duration: 0.22, ease: "power2.in", stagger: 0.025 })
          .add(() => old.remove())
          .to(word.children, { yPercent: 0, duration: 0.35, ease: "power3.out", stagger: 0.03 });
      };

      const draw = () => {
        const nearest = Math.round(state.pos);
        ticks.current.forEach((el, i) => {
          el.style.transform = `scaleY(${tickHeight(Math.abs(i - state.pos)) / MAX})`;
          el.dataset.current = String(i === nearest);
        });
        if (anchor.current) anchor.current.style.transform = `translateX(${state.pos * STEP + 0.5}px)`;
        // While the mouse is over the nav, the lines follow the mouse but the page word stays.
        const chapter = chapterAt(state.pos);
        if (!hovering && chapter.id !== current) {
          current = chapter.id;
          swapWord(chapter.label);
          setActive(chapter.id);
        }
      };

      // Scroll → position: at a page's tick when that page fills the screen, and moving
      // proportionally towards the next page's tick while scrolling between them.
      const scrollPos = () => {
        const y = window.scrollY;
        const tops = chapters.map((c) => document.getElementById(c.id)?.offsetTop ?? 0);
        for (let i = 0; i < chapters.length - 1; i++) {
          if (y < tops[i + 1]) {
            const p = gsap.utils.clamp(0, 1, (y - tops[i]) / (tops[i + 1] - tops[i]));
            return gsap.utils.interpolate(chapters[i].tick, chapters[i + 1].tick, p);
          }
        }
        return chapters[chapters.length - 1].tick;
      };

      const glideTo = (pos: number) =>
        gsap.to(state, {
          pos,
          duration: reduce ? 0 : 0.5,
          ease: "power3.out", // glides and settles, no overshoot (not a spring)
          overwrite: true,
          onUpdate: draw,
        });
      const update = () => {
        if (!hovering) glideTo(scrollPos());
      };

      // Hover: the current line follows the mouse along the ticks; leaving glides it back.
      const nav = root.current!;
      const onMove = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        hovering = true;
        const x = e.clientX - nav.getBoundingClientRect().left;
        glideTo(gsap.utils.clamp(0, TICKS - 1, x / STEP));
      };
      const onLeave = () => {
        hovering = false;
        glideTo(scrollPos());
      };
      nav.addEventListener("pointermove", onMove);
      nav.addEventListener("pointerleave", onLeave);

      word = makeWord(chapters[0].label);
      const st = ScrollTrigger.create({ start: 0, end: "max", onUpdate: update, onRefresh: update });
      update();
      return () => {
        st.kill();
        nav.removeEventListener("pointermove", onMove);
        nav.removeEventListener("pointerleave", onLeave);
        if (anchor.current) anchor.current.replaceChildren();
      };
    },
    { scope: root },
  );

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
          />
        ))}
      </div>
      {/* The visible page word lives here; GSAP builds and animates it. */}
      <span ref={anchor} className={styles.anchor} aria-hidden="true" />
      <ol className={styles.links}>
        {chapters.map((c) => (
          <li key={c.id} style={{ left: c.tick * STEP }}>
            <a href={`#${c.id}`} aria-current={c.id === active ? "location" : undefined}>
              <span className={styles.label}>{c.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
