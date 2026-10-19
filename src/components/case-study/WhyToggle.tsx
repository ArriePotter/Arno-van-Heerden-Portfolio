"use client";

import { useState } from "react";
import styles from "./CaseStudy.module.css";

// "The why, shown, not just told" (moodboard + teardown steal from rauno.me): a screen with a
// switch. Off: the design as users see it. On: numbered notes on each decision, its why and
// its source. Placeholder content until the real Khoisān screens are in.
export function WhyToggle({
  caption,
  notes,
}: {
  caption: string;
  notes: { label: string; why: string; source: string }[];
}) {
  const [on, setOn] = useState(false);

  return (
    <figure className={styles.why} data-on={on}>
      <div className={styles.whyBar}>
        <span className={styles.figLabel}>{caption}</span>
        <button type="button" className={styles.switch} aria-pressed={on} onClick={() => setOn(!on)}>
          <span className={styles.switchTrack} aria-hidden="true">
            <span className={styles.switchThumb} />
          </span>
          Show the why
        </button>
      </div>

      <div className={styles.whyBody}>
        {/* Placeholder phone screen. */}
        <div className={styles.phone} role="img" aria-label="Today's session screen (placeholder)">
          <span className={styles.placeholderTag}>Screen</span>
          {notes.map((n, i) => (
            <span key={n.label} className={styles.pin} style={{ top: `${18 + i * 26}%` }} aria-hidden="true">
              {i + 1}
            </span>
          ))}
        </div>

        <ol className={styles.whyNotes} aria-live="polite">
          {on ? (
            notes.map((n) => (
              <li key={n.label}>
                <strong>{n.label}</strong>
                <p>{n.why}</p>
                <span className={styles.source}>Source: {n.source}</span>
              </li>
            ))
          ) : (
            <li className={styles.whyOff}>Switch on &ldquo;Show the why&rdquo; to see the reasoning behind each part of this screen.</li>
          )}
        </ol>
      </div>
    </figure>
  );
}
