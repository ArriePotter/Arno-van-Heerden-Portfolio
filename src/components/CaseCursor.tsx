"use client";

import { useEffect, useId, useRef, useState } from "react";
import { gsap } from "./gsap";
import styles from "./CaseCursor.module.css";

// A custom cursor over the case-study cards (mouse only). On a case study it's a brand disc
// that reads "See the why" (the positioning line: "proves the why"); on a card that isn't
// ready it's an outlined ring that reads "Coming soon". It grows out of the pointer and
// trails it slightly. Reduced motion: it follows exactly and appears without growing.
// The cards themselves hide the normal cursor (see WorkPage.module.css).
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
      <span className={styles.disc} />
      {/* The label runs along an arc just outside the top of the disc. */}
      <svg className={styles.arc} viewBox="0 0 180 180">
        <path id={arcId} d="M 22 90 A 68 68 0 0 1 158 90" fill="none" />
        <text>
          <textPath href={`#${arcId}`} startOffset="50%" textAnchor="middle">
            {label?.text}
          </textPath>
        </text>
      </svg>
    </div>
  );
}
