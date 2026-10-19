"use client";

import { useEffect } from "react";

// Key words marked with data-highlight get a highlighter stroke, drawn in reading order:
// one phrase at a time, left to right, line by line, never two at once. One "pen" moves
// through all the phrases (measured in px of text, so long phrases take longer). The scroll
// sets where the pen should be, from the first phrase reaching 70% down the screen to the
// last one reaching 30%; the pen eases towards that, so the drawing stays smooth and may
// trail a little behind the scroll. Scrolling back rubs it out. Sets --fill (0–100%) for the
// CSS gradient. Reduced motion: always filled.
export function HighlightOnScroll() {
  useEffect(() => {
    const words = [...document.querySelectorAll<HTMLElement>("[data-highlight]")];
    if (!words.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      words.forEach((w) => w.style.setProperty("--fill", "100%"));
      return;
    }

    let pen = 0; // px of highlighted text so far, across all phrases in order
    let raf = 0;

    // Where a word would be on screen if its card scrolled normally. The About card is
    // sticky (it holds in the centre), so its words stop moving while it holds; following
    // their real position would stall the pen. Instead: the position of the card's (moving)
    // column, plus the word's offset inside the card.
    const card = words[0].closest<HTMLElement>("[data-sticky-centre]");
    const scrolledMid = (w: HTMLElement) => {
      const r = w.getBoundingClientRect();
      if (!card?.parentElement) return r.top + r.height / 2;
      const col = card.parentElement.getBoundingClientRect();
      const pad = parseFloat(getComputedStyle(card.parentElement).paddingTop) || 0;
      return col.top + pad + (r.top - card.getBoundingClientRect().top) + r.height / 2;
    };

    const target = () => {
      const vh = window.innerHeight;
      const firstMid = scrolledMid(words[0]);
      const lastMid = scrolledMid(words[words.length - 1]);
      const span = vh * 0.4 + (lastMid - firstMid);
      const p = Math.min(1, Math.max(0, (vh * 0.7 - firstMid) / span));
      const widths = words.map((w) => w.getBoundingClientRect().width);
      return { total: p * widths.reduce((a, b) => a + b, 0), widths };
    };

    const frame = () => {
      raf = 0;
      const { total, widths } = target();
      pen += (total - pen) * 0.08; // ease towards the scroll position
      if (Math.abs(total - pen) < 0.5) pen = total;
      let left = pen;
      words.forEach((w, i) => {
        const fill = Math.min(1, Math.max(0, left / widths[i]));
        left -= widths[i];
        w.style.setProperty("--fill", `${(fill * 100).toFixed(1)}%`);
      });
      if (pen !== total) raf = requestAnimationFrame(frame);
    };
    const wake = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    wake();
    window.addEventListener("scroll", wake, { passive: true });
    window.addEventListener("resize", wake);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", wake);
      window.removeEventListener("resize", wake);
    };
  }, []);

  return null;
}
