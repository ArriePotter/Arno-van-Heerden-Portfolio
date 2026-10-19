"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP } from "./gsap";
import { SandTimer } from "./SandTimer";
import stage from "./Stage.module.css";
import styles from "./WorkPage.module.css";

// Placeholder cards until the case studies exist. Khoisān is Case Study 1 (decision 0005).
// A card with an href opens its case study; one without isn't clickable yet.
const cards = [
  {
    label: "Case study 01",
    title: "Project Khoisān",
    line: "A training app for the MUT 60 trail race.",
    href: "/work/khoisan",
  },
  { label: "Case study 02", title: "Coming soon", line: "", href: "" },
];

// Two half-width cards, a thin gap between them, rise from the bottom of the screen. As they
// pass an invisible circle round the "Work" title, their inner edges bend around it (a
// clip-path redrawn each frame) and the text inside shifts sideways with the bend, as if the
// circle pushes through them. They come to rest with the title in the bend. Scrubbed to the
// scroll after the book has opened.
export function WorkPage() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current!;
      const list = section.querySelectorAll<HTMLElement>("[data-card]");
      // Elements, not selector strings: inside useGSAP's scope a string would only search
      // this section, and the anchors live outside it.
      const workAnchor = document.getElementById("work");
      const about = document.getElementById("about");
      if (!list.length || !workAnchor || !about) return;

      // The circle round the title (from the CSS).
      const wrapStyle = getComputedStyle(section.querySelector<HTMLElement>("[data-wrap]")!);
      const RADIUS = 16; // card corner radius

      // How far a card's inner edge is pushed out at a given distance (dy, px) from the
      // circle's centre: a smooth bell curve, high enough everywhere to clear the circle.
      let ring = 96;
      const bend = (dy: number) => (ring + 12) * Math.exp(-((dy / (ring * 1.1)) ** 2));

      let width = 0;
      let height = 0;
      let rise = 0;
      // Each text line in the cards, with its vertical centre in the card (px).
      let lines: { el: HTMLElement; mid: number; side: number }[] = [];

      const measure = () => {
        ring = parseFloat(wrapStyle.getPropertyValue("--ring")) || 96;
        width = list[0].offsetWidth;
        height = list[0].offsetHeight;
        rise = window.innerHeight / 2 + height / 2;
        lines = [];
        list.forEach((card, i) => {
          const top = card.getBoundingClientRect().top;
          card.querySelectorAll<HTMLElement>("[data-line]").forEach((el) => {
            el.style.translate = "";
            const r = el.getBoundingClientRect();
            lines.push({ el, mid: r.top + r.height / 2 - top, side: i === 0 ? -1 : 1 });
          });
        });
      };

      // The card outline as an SVG path: rounded corners, and the inner edge (right edge of
      // the left card, left edge of the right card) bent around the circle at height `cy`.
      // Used both as the card's clip-path and as its drawn border.
      const outline = (cy: number, side: number) => {
        const w = width;
        const h = height;
        const r = RADIUS;
        const edge = (y: number) => (side < 0 ? w - bend(y - cy) : bend(y - cy));
        const pts: string[] = [];
        for (let y = r; y <= h - r; y += 6) pts.push(`L ${edge(y).toFixed(1)} ${y}`);
        const top = edge(0);
        const bottom = edge(h);
        if (side < 0) {
          return `M ${r} 0 L ${top - r} 0 Q ${top} 0 ${edge(r)} ${r} ${pts.join(" ")} L ${edge(h - r)} ${h - r} Q ${bottom} ${h} ${bottom - r} ${h} L ${r} ${h} Q 0 ${h} 0 ${h - r} L 0 ${r} Q 0 0 ${r} 0 Z`;
        }
        return `M ${top + r} 0 L ${w - r} 0 Q ${w} 0 ${w} ${r} L ${w} ${h - r} Q ${w} ${h} ${w - r} ${h} L ${bottom + r} ${h} Q ${bottom} ${h} ${edge(h - r)} ${h - r} ${pts.reverse().join(" ")} L ${edge(r)} ${r} Q ${top} 0 ${top + r} 0 Z`;
      };

      // The cards move up by `y`; the circle stays on the title, so inside a card its centre
      // sits at height/2 − y. The edges bend around it and each text line shifts away from
      // the middle by the bend at its own height.
      const render = (p: number) => {
        const stacked = getComputedStyle(list[0]).position !== "absolute"; // narrow screens
        const y = stacked ? 0 : rise * (1 - p);
        const cy = height / 2 - y;
        list.forEach((el, i) => {
          const d = stacked ? "" : outline(cy, i === 0 ? -1 : 1);
          el.style.transform = stacked ? "" : `translateY(${y}px)`;
          el.style.clipPath = d && `path("${d}")`;
          // The drawn border follows the bent outline; the plain CSS border is the fallback.
          el.style.border = d && "none";
          el.querySelector("[data-border]")?.setAttribute("d", d);
        });
        lines.forEach(({ el, mid, side }) => {
          el.style.translate = stacked ? "" : `${(side * bend(mid - cy)).toFixed(1)}px 0`;
        });
      };

      const mm = gsap.matchMedia();
      mm.add(
        { motion: "(prefers-reduced-motion: no-preference)", reduce: "(prefers-reduced-motion: reduce)" },
        (ctx) => {
          if (ctx.conditions?.reduce) {
            // Reduced motion: no rising, the cards just sit in their bent resting shape.
            measure();
            render(1);
            const onResize = () => (measure(), render(1));
            window.addEventListener("resize", onResize);
            return () => window.removeEventListener("resize", onResize);
          }
          const proxy = { p: 0 };
          gsap.to(proxy, {
            p: 1,
            ease: "power2.out",
            onUpdate: () => render(proxy.p),
            scrollTrigger: {
              trigger: workAnchor,
              start: "top top",
              endTrigger: about,
              end: "top bottom",
              scrub: 0.6,
              onRefresh: () => (measure(), render(proxy.p)),
            },
          });
          measure();
          render(proxy.p);
        },
      );
      const reset = () => {
        list.forEach((el) => {
          el.style.transform = "";
          el.style.clipPath = "";
          el.style.border = "";
          el.querySelector("[data-border]")?.setAttribute("d", "");
        });
        lines.forEach(({ el }) => (el.style.translate = ""));
      };
      return () => {
        mm.revert();
        reset();
      };
    },
    { scope: root },
  );

  return (
    <section ref={root} className={stage.stage} aria-labelledby="work-title">
      <div className={styles.wrap} data-wrap>
        <SandTimer />
        <h2 id="work-title" className={styles.title}>
          Work
        </h2>
        <ul className={styles.cards}>
          {cards.map((c, i) => (
            <li key={c.label} className={styles.card} data-card={i === 0 ? "left" : "right"}>
              {/* The thin border, drawn along the same (bent) outline the card is clipped to. */}
              <svg className={styles.border} aria-hidden="true">
                <path data-border />
              </svg>
              <CardBody href={c.href}>
                <div className={styles.content}>
                <p className={styles.label} data-line>
                  {c.label}
                </p>
                <h3 className={styles.cardTitle} data-line>
                  {c.title}
                </h3>
                {c.line && (
                  <p className={styles.line} data-line>
                    {c.line}
                  </p>
                )}
                </div>
              </CardBody>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// The whole card is the link to its case study; a card without one is plain content.
function CardBody({ href, children }: { href: string; children: React.ReactNode }) {
  return href ? (
    <Link href={href} className={styles.cardLink}>
      {children}
    </Link>
  ) : (
    <div className={styles.cardLink}>{children}</div>
  );
}
