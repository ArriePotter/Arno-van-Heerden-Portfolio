"use client";

import { useEffect, useState } from "react";
import { chapters, type ChapterId } from "./chapters";
import styles from "./ScrollNav.module.css";

const TICKS = 48;
const GAP = 8; // tick width (1px) + gap (7px), as in Figma

// Tallest at the current page, shrinking by 4px per tick of distance (Figma: A/Scroll nav).
function tickHeight(distance: number) {
  return distance === 0 ? 28 : Math.max(8, 26 - distance * 4);
}

export function ScrollNav() {
  const [active, setActive] = useState<ChapterId>("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as ChapterId);
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    for (const c of chapters) {
      const el = document.getElementById(c.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  const current = chapters.find((c) => c.id === active) ?? chapters[0];

  return (
    <nav aria-label="Page sections" className={styles.root}>
      <div className={styles.ticks} aria-hidden="true">
        {Array.from({ length: TICKS }, (_, i) => {
          const d = Math.abs(i - current.tick);
          return (
            <span
              key={i}
              className={d === 0 ? styles.current : styles.tick}
              style={{ transform: `scaleY(${tickHeight(d) / 28})` }}
            />
          );
        })}
      </div>
      <ol className={styles.links}>
        {chapters.map((c) => (
          <li key={c.id} style={{ left: c.tick * GAP }}>
            <a href={`#${c.id}`} aria-current={c.id === active ? "location" : undefined}>
              <span className={c.id === active ? styles.label : styles.srOnly}>{c.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
