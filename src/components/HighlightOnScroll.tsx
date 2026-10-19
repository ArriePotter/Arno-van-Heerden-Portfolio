"use client";

import { useEffect } from "react";

// Key words marked with data-highlight get a highlighter stroke, in one sweep from left to
// right across their line, as the line crosses the middle of the screen (and empty again
// when scrolling back). Driven by each word's real on-screen position, so it stays right
// while the About text column's parallax moves it. Sets --fill (0–100%), which the CSS
// gradient uses. Reduced motion: always filled.
export function HighlightOnScroll() {
  useEffect(() => {
    const words = [...document.querySelectorAll<HTMLElement>("[data-highlight]")];
    if (!words.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      words.forEach((w) => w.style.setProperty("--fill", "100%"));
      return;
    }

    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      // The fill starts when the word's middle is 10% of the screen below the centre line
      // and is complete 5% above it.
      const start = vh * 0.6;
      const end = vh * 0.45;
      for (const w of words) {
        const r = w.getBoundingClientRect();
        const mid = r.top + r.height / 2;
        const p = Math.min(1, Math.max(0, (start - mid) / (start - end)));
        // One sweep runs across the whole line (the paragraph's width): it has reached
        // p × width from the line's left edge; this word is filled as far as the sweep has
        // crossed it.
        const line = (w.parentElement ?? w).getBoundingClientRect();
        const reach = line.left + p * line.width;
        const fill = Math.min(1, Math.max(0, (reach - r.left) / r.width));
        w.style.setProperty("--fill", `${(fill * 100).toFixed(1)}%`);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return null;
}
