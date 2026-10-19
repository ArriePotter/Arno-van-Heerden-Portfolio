"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "./gsap";
import stage from "./Stage.module.css";
import styles from "./WorkPage.module.css";

// Placeholder cards until the case studies exist. Khoisān is Case Study 1 (decision 0005).
const cards = [
  { label: "Case study 01", title: "Project Khoisān", line: "A training app for the MUT 60 trail race." },
  { label: "Case study 02", title: "Coming soon", line: "" },
];

// Two half-width cards, a thin gap between them, rise from the bottom of the screen. An
// invisible circle round the "Work" title is cut out of them (a CSS mask), so as they pass
// the title their inner edges bend around it, and they come to rest with the title in the
// circle. Scrubbed to the scroll after the book has opened.
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

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Start fully below the screen. The cards are centred on the title at rest.
        let rise = 0;
        const measure = () => {
          rise = window.innerHeight / 2 + list[0].offsetHeight / 2;
          render(proxy.p);
        };
        // The cards move up; the cut-out circle stays on the title, so inside each card it
        // moves down by the same amount (--my is where the circle's centre sits in the card).
        const render = (p: number) => {
          const y = rise * (1 - p);
          list.forEach((el) => {
            el.style.transform = `translateY(${y}px)`;
            el.style.setProperty("--my", `calc(50% - ${y}px)`);
          });
        };

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
            onRefresh: measure,
          },
        });
        measure();
        return () =>
          list.forEach((el) => {
            el.style.transform = "";
            el.style.removeProperty("--my");
          });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className={stage.stage} aria-labelledby="work-title">
      <div className={styles.wrap}>
        <h2 id="work-title" className={styles.title}>
          Work
        </h2>
        <ul className={styles.cards}>
          {cards.map((c, i) => (
            <li key={c.label} className={styles.card} data-card={i === 0 ? "left" : "right"}>
              <div className={styles.content}>
                <p className={styles.label}>{c.label}</p>
                <h3 className={styles.cardTitle}>{c.title}</h3>
                {c.line && <p className={styles.line}>{c.line}</p>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
