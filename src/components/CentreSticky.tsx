"use client";

import { useEffect } from "react";

// Keeps --card-h on each [data-sticky-centre] element equal to its height, so CSS can stick it
// with its middle on the middle of the screen: top: calc(50svh - var(--card-h) / 2).
export function CentreSticky() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-sticky-centre]");
    const ro = new ResizeObserver((entries) => {
      for (const e of entries) {
        (e.target as HTMLElement).style.setProperty("--card-h", `${(e.target as HTMLElement).offsetHeight}px`);
      }
    });
    els.forEach((el) => ro.observe(el));
    return () => ro.disconnect();
  }, []);

  return null;
}
