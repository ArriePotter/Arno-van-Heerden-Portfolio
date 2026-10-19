"use client";

import { useId, useRef, useState } from "react";
import { chapters as homeChapters, TICKS } from "./chapters";
import { gsap, ScrollTrigger, useGSAP } from "./gsap";
import styles from "./ScrollNav.module.css";

const STEP = 8; // tick width (1px) + gap (7px), as in Figma
const MAX = 28; // tallest tick, px
const MAX_BLUR = 1.5; // strongest motion blur, px
const BLUR_REACH = 5; // lines either side of the current one that get the motion blur

const MIN = 8; // resting tick, px
const HERE = 14.5; // the "you are here" line while hovering, px

// Height falls off exponentially with distance from the current position: steep right next to
// the main line, then easing into the resting height (not a straight 45° slope).
function tickHeight(distance: number) {
  return MIN + (MAX - MIN) * Math.exp(-0.7 * distance);
}

type NavChapter = { id: string; label: string; tick: number };

// The page whose stretch of ticks `pos` is in: each page owns the ticks closest to its own,
// so the word switches halfway between two pages, the same way scrolling up or down.
function chapterAt(chapters: readonly NavChapter[], pos: number) {
  return chapters.reduce((a, b) => (Math.abs(b.tick - pos) < Math.abs(a.tick - pos) ? b : a));
}

// The scroll nav. On the home page it runs across the top (the defaults); a case study uses
// the same nav standing up on the left (`vertical`), with its own chapters and line count.
export function ScrollNav({
  chapters = homeChapters,
  ticks: count = TICKS,
  vertical = false,
  label = "Page sections",
}: {
  chapters?: readonly NavChapter[];
  ticks?: number;
  vertical?: boolean;
  label?: string;
}) {
  const root = useRef<HTMLElement>(null);
  const ticks = useRef<HTMLSpanElement[]>([]);
  const anchor = useRef<HTMLSpanElement>(null);
  const blur = useRef<SVGFEGaussianBlurElement>(null);
  const blurId = useId();
  const [active, setActive] = useState(chapters[0].id);
  // Along the nav: x for the horizontal nav, y for the vertical one.
  const axis = vertical ? "Y" : "X";

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      // `pos` is a position along the ticks (can be between ticks). It follows the scroll;
      // GSAP eases it so the ticks glide.
      const state = { pos: chapters[0].tick };
      let current = chapters[0].id;
      let word: HTMLSpanElement | null = null;
      let hovering = false;
      // False once this setup is torn down (React dev mode runs it twice), so a leftover glide
      // from the first run can't add a second word.
      let alive = true;
      // True after a page name is clicked, until the line has glided to the new page: the word
      // changes straight to that page, without the letter animation (that's for scrolling only).
      let jumped = false;
      // While hovering (and gliding back after): the line for where you are on the page. It
      // stays orange, and the page word stays parked under it instead of following the mouse.
      let here: number | null = null;

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
      const swapWord = (text: string, instant = false, back = false) => {
        swap?.progress(1);
        const old = word;
        word = makeWord(text);
        if (reduce || instant || !old) {
          old?.remove();
          return;
        }
        gsap.set(word.children, { yPercent: 110 });
        swap = gsap
          .timeline()
          .to(old.children, { yPercent: -110, duration: 0.22, ease: "power2.in", stagger: { each: 0.025, from: back ? "end" : "start" } })
          .add(() => old.remove())
          .to(word.children, { yPercent: 0, duration: 0.35, ease: "power3.out", stagger: { each: 0.03, from: back ? "end" : "start" } });
      };

      // Motion blur: a horizontal-only blur on the current line and the BLUR_REACH lines either
      // side of it, as strong as they are moving fast. Off when still, so it costs nothing at rest.
      let lastPos = state.pos;
      let blurPx = 0;
      const setBlur = (px: number) => {
        blurPx = px;
        blur.current?.setAttribute("stdDeviation", vertical ? `0 ${px}` : `${px} 0`);
      };
      const filter = `url(#${CSS.escape(blurId)})`;

      const draw = () => {
        if (!alive) return;
        if (!reduce) setBlur(Math.min(MAX_BLUR, Math.abs(state.pos - lastPos) * STEP * 0.15));
        lastPos = state.pos;
        const nearest = Math.round(state.pos);
        const hereTick = here === null ? null : Math.round(here);
        ticks.current.forEach((el, i) => {
          // The "you are here" line has its own fixed length.
          const h = tickHeight(Math.abs(i - state.pos));
          // Lines grow downwards on the top nav, rightwards on the side nav.
          el.style.transform = `scale${vertical ? "X" : "Y"}(${(i === hereTick ? Math.max(h, HERE) : h) / MAX})`;
          el.dataset.current = String(i === nearest);
          el.dataset.here = String(i === hereTick);
          el.style.filter = blurPx > 0.05 && Math.abs(i - nearest) <= BLUR_REACH ? filter : "";
        });
        if (anchor.current) anchor.current.style.transform = `translate${axis}(${(here ?? state.pos) * STEP + 0.5}px)`;
        // While the mouse is over the nav, the lines follow the mouse but the page word stays.
        const chapter = chapterAt(chapters, here ?? (jumped ? scrollPos() : state.pos));
        if ((!hovering || jumped) && chapter.id !== current) {
          // Scrolling back up, the letters run right to left instead.
          const back = chapters.findIndex((c) => c.id === chapter.id) < chapters.findIndex((c) => c.id === current);
          current = chapter.id;
          swapWord(chapter.label, jumped, back);
          setActive(chapter.id);
        }
      };

      // Scroll → position: at a page's tick when that page fills the screen, and moving
      // proportionally towards the next page's tick while scrolling between them.
      const scrollPos = () => {
        const y = window.scrollY;
        // A section near the end of the page may never reach the top of the screen, so the
        // page's furthest scroll counts as reaching it: the last line is reached at the bottom.
        const maxY = document.documentElement.scrollHeight - window.innerHeight;
        // A section counts as reached where a link to it scrolls to: its top, minus any
        // scroll-margin-top (the case study keeps its chapters clear of the top bar).
        const tops = chapters.map((c) => {
          const el = document.getElementById(c.id);
          if (!el) return 0;
          const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
          return Math.min(maxY, el.getBoundingClientRect().top + y - margin);
        });
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
          onComplete: () => {
            if (!hovering) here = null;
            if (!hovering && Math.abs(state.pos - scrollPos()) < 0.01) jumped = false;
            setBlur(0);
            draw();
          },
        });
      const update = () => {
        if (here !== null) here = scrollPos();
        if (!hovering) return glideTo(scrollPos());
        draw();
      };

      // Hover: the current line follows the mouse along the ticks; leaving glides it back.
      const nav = root.current!;
      const onMove = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        if (!hovering) here = scrollPos();
        hovering = true;
        const r = nav.getBoundingClientRect();
        const along = vertical ? e.clientY - r.top : e.clientX - r.left;
        glideTo(gsap.utils.clamp(0, count - 1, along / STEP));
      };
      const onLeave = () => {
        hovering = false;
        glideTo(scrollPos());
      };
      const onClick = (e: MouseEvent) => {
        if ((e.target as Element).closest("a")) jumped = true;
      };
      nav.addEventListener("pointermove", onMove);
      nav.addEventListener("pointerleave", onLeave);
      nav.addEventListener("click", onClick);

      // Side nav: the hover zone reaches as far right as the longest section name plus a
      // little extra, so moving along the names never drops the hover.
      if (vertical) {
        const widest = Math.max(...[...nav.querySelectorAll<HTMLElement>(`.${styles.label}`)].map((l) => l.offsetWidth));
        nav.style.setProperty("--reach", `${widest + 34 - nav.offsetWidth + 24}px`);
      }

      word = makeWord(chapters[0].label);
      const st = ScrollTrigger.create({ start: 0, end: "max", onUpdate: update, onRefresh: update });
      update();
      return () => {
        alive = false;
        st.kill();
        swap?.kill();
        gsap.killTweensOf(state);
        nav.removeEventListener("pointermove", onMove);
        nav.removeEventListener("pointerleave", onLeave);
        nav.removeEventListener("click", onClick);
        if (anchor.current) anchor.current.replaceChildren();
      };
    },
    { scope: root },
  );

  return (
    <nav
      ref={root}
      aria-label={label}
      className={`${styles.root} ${vertical ? styles.vertical : ""}`}
      style={{ "--ticks": count } as React.CSSProperties}
    >
      <svg className={styles.filterDefs} aria-hidden="true">
        <filter id={blurId} {...(vertical ? { y: "-800%", height: "1700%" } : { x: "-800%", width: "1700%" })}>
          <feGaussianBlur ref={blur} stdDeviation="0 0" />
        </filter>
      </svg>
      <div className={styles.ticks} aria-hidden="true">
        {Array.from({ length: count }, (_, i) => (
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
          <li key={c.id} style={vertical ? { top: c.tick * STEP } : { left: c.tick * STEP }}>
            <a href={`#${c.id}`} aria-current={c.id === active ? "location" : undefined}>
              <span className={styles.label}>{c.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
