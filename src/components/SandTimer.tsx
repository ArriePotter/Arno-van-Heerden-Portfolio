"use client";

import { useEffect, useRef } from "react";

// Just for fun (may be removed): with the Work cards at rest, their bent edges make an
// hourglass. Sand trickles from under the scroll nav down through the neck and piles up on
// the word "Work". A canvas over the stage; off with reduced motion and when not in view.
export function SandTimer() {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvas.current;
    const ctx = el?.getContext("2d");
    if (!el || !ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const work = document.getElementById("work");
    const about = document.getElementById("about");
    const title = document.getElementById("work-title");
    if (!work || !about || !title) return;

    const GRAIN = 1.5; // px
    const MAX_PILE = 26; // tallest the heap gets, px
    let dpr = 1;
    let colour = "#e1791e";
    const grains: { x: number; y: number; v: number }[] = [];
    // Heap height per 1px column across the title.
    let heap = new Float32Array(0);
    let heapLeft = 0;
    let floor = 0; // the top of the word's letters, px from the top of the canvas
    let raf = 0;

    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      el.width = el.clientWidth * dpr;
      el.height = el.clientHeight * dpr;
      const c = el.getBoundingClientRect();
      const t = title.getBoundingClientRect();
      heapLeft = t.left - c.left;
      floor = t.top - c.top + t.height * 0.24; // cap height starts ~a quarter down the line box
      heap = new Float32Array(Math.ceil(t.width));
      grains.length = 0;
      colour = getComputedStyle(el).color;
    };

    // Sand runs only while the cards are (nearly) at rest and the stage is on screen.
    const active = () => {
      const w = work.getBoundingClientRect().top;
      const a = about.getBoundingClientRect().top;
      return w < -0.6 * window.innerHeight && a > 0;
    };

    const settle = (i: number) => {
      // Let a grain roll down the heap until it rests in a hollow (keeps a sand-like slope).
      for (let step = 0; step < 40; step++) {
        const h = heap[i];
        const left = i > 0 ? heap[i - 1] : Infinity;
        const right = i < heap.length - 1 ? heap[i + 1] : Infinity;
        if (left < h - 1 && left <= right) i--;
        else if (right < h - 1) i++;
        else break;
      }
      heap[i] = Math.min(MAX_PILE, heap[i] + GRAIN * 0.6);
    };

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const w = el.width / dpr;
      const h = el.height / dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      if (!active()) return;

      // A few new grains each frame from under the nav, in a thin stream down the middle.
      for (let n = 0; n < 3; n++) grains.push({ x: w / 2 + (Math.random() - 0.5) * 6, y: 72, v: 1 + Math.random() });

      ctx.fillStyle = colour;
      for (let g = grains.length - 1; g >= 0; g--) {
        const p = grains[g];
        p.v = Math.min(p.v + 0.25, 9);
        p.y += p.v;
        const col = Math.round(p.x - heapLeft);
        const top = floor - (heap[col] ?? 0);
        if (p.y >= top) {
          if (col >= 0 && col < heap.length) settle(col);
          grains.splice(g, 1);
          continue;
        }
        ctx.fillRect(p.x, p.y, GRAIN, GRAIN);
      }

      // The heap on the word.
      for (let i = 0; i < heap.length; i++) {
        if (heap[i] > 0) ctx.fillRect(heapLeft + i, floor - heap[i], 1, heap[i]);
      }
    };

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvas} aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 2, color: "var(--color-why)" }} />;
}
