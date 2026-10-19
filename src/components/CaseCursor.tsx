"use client";

import { useEffect, useId, useRef, useState } from "react";
import { gsap } from "./gsap";
import styles from "./CaseCursor.module.css";

// A custom cursor over the case-study cards (mouse only). On a case study it's a brand disc
// that reads "See the why" (the positioning line: "proves the why"); on a card that isn't
// ready it's an outlined ring that reads "Coming soon". It grows out of the pointer and
// trails it slightly. Reduced motion: it follows exactly and appears without growing.
// The cards themselves hide the normal cursor (see WorkPage.module.css).
// Golden rectangle (width : height = φ ≈ 1.618) fitted inside the 112px disc, its squares, and
// the spiral of quarter circles through them. Generated once (9 squares deep).
const GOLDEN_GRID = "M11.22 28.33H100.78V83.67H11.22ZM66.57 28.33V83.67M66.57 62.53H100.78M79.64 62.53V83.67M66.57 70.61H79.64M74.65 62.53V70.61M74.65 67.52H79.64M76.55 67.52V70.61M74.65 68.70H76.55M75.82 67.52V68.70";
const GOLDEN_SPIRAL = "M11.22 83.67A55.35 55.35 0 0 1 66.57 28.33A34.21 34.21 0 0 1 100.78 62.53A21.14 21.14 0 0 1 79.64 83.67A13.07 13.07 0 0 1 66.57 70.61A8.08 8.08 0 0 1 74.65 62.53A4.99 4.99 0 0 1 79.64 67.52A3.08 3.08 0 0 1 76.55 70.61A1.91 1.91 0 0 1 74.65 68.70A1.18 1.18 0 0 1 75.82 67.52";

export function CaseCursor() {
  const el = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<{ text: string; soon: boolean } | null>(null);
  const arcId = useId();

  useEffect(() => {
    const cursor = el.current;
    if (!cursor || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lag = reduce ? 0 : 0.35;
    const toX = gsap.quickTo(cursor, "x", { duration: lag, ease: "power3.out" });
    const toY = gsap.quickTo(cursor, "y", { duration: lag, ease: "power3.out" });
    gsap.set(cursor, { scale: 0, xPercent: -50, yPercent: -50 });

    const cards = document.querySelectorAll<HTMLElement>("[data-card]");
    const onMove = (e: PointerEvent) => {
      toX(e.clientX);
      toY(e.clientY);
    };
    const onEnter = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const card = e.currentTarget as HTMLElement;
      const soon = !card.querySelector("a");
      setLabel({ text: soon ? "Coming soon" : "See the why", soon });
      gsap.set(cursor, { x: e.clientX, y: e.clientY });
      gsap.to(cursor, { scale: 1, duration: reduce ? 0 : 0.3, ease: "power3.out", overwrite: "auto" });
    };
    const onLeave = () => {
      gsap.to(cursor, { scale: 0, duration: reduce ? 0 : 0.2, ease: "power2.in", overwrite: "auto" });
    };
    cards.forEach((c) => {
      c.addEventListener("pointerenter", onEnter);
      c.addEventListener("pointerleave", onLeave);
      c.addEventListener("pointermove", onMove);
    });
    return () =>
      cards.forEach((c) => {
        c.removeEventListener("pointerenter", onEnter);
        c.removeEventListener("pointerleave", onLeave);
        c.removeEventListener("pointermove", onMove);
      });
  }, []);

  return (
    <div ref={el} className={styles.cursor} data-soon={label?.soon || undefined} aria-hidden="true">
      <span className={styles.disc}>
        {/* The golden ratio inside the disc: a golden rectangle split into its squares, and
            the golden (Fibonacci) spiral through them. Proportion is the "why" behind beauty. */}
        <svg className={styles.golden} viewBox="0 0 112 112">
          <path className={styles.goldenGrid} d={GOLDEN_GRID} />
          <path className={styles.goldenSpiral} d={GOLDEN_SPIRAL} />
        </svg>
      </span>
      {/* The label runs along an arc just outside the top of the disc. */}
      <svg className={styles.arc} viewBox="0 0 180 180">
        <path id={arcId} d="M 20 90 A 70 70 0 0 1 160 90" fill="none" />
        <text>
          <textPath href={`#${arcId}`} startOffset="50%" textAnchor="middle">
            {label?.text}
          </textPath>
        </text>
      </svg>
    </div>
  );
}
