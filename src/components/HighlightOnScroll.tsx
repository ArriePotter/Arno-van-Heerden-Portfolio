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
      const centre = window.innerHeight / 2;
      for (const w of words) {
        // A line sweeps while it moves through a band one line tall around the centre of the
        // screen. The next line down enters that band exactly as this one leaves it, so a line
        // never starts before the one above has finished.
        const pitch = parseFloat(getComputedStyle(w.parentElement ?? w).lineHeight) || 32;
        const start = centre + pitch / 2;
        const end = centre - pitch / 2;
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
