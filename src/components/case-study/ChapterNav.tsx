"use client";

import { useEffect, useState } from "react";
import styles from "./CaseStudy.module.css";

// The case study's chapter nav: always in view, with "you are here" on the current chapter
// (teardown pattern 4: wayfinding inside case studies is weak). The active line works like
// the home page's scroll nav: the current chapter's line is long and in the brand colour.
export function ChapterNav({ chapters }: { chapters: { id: string; label: string }[] }) {
  const [active, setActive] = useState(chapters[0]?.id);

  useEffect(() => {
    // The current chapter is the last one whose top has passed 40% of the screen.
    const update = () => {
      const line = window.innerHeight * 0.4;
      let current = chapters[0]?.id;
      for (const c of chapters) {
        const el = document.getElementById(c.id);
        if (el && el.getBoundingClientRect().top <= line) current = c.id;
      }
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [chapters]);

  return (
    <nav aria-label="Chapters" className={styles.chapterNav}>
      <ol>
        {chapters.map((c, i) => (
          <li key={c.id}>
            <a href={`#${c.id}`} aria-current={c.id === active ? "location" : undefined}>
              <span className={styles.chapterLine} aria-hidden="true" />
              <span className={styles.chapterNumber}>{String(i + 1).padStart(2, "0")}</span>
              {c.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
