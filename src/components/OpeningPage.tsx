import stage from "./Stage.module.css";
import styles from "./OpeningPage.module.css";

// Suggested copy (Arno to edit). The grid keeps the dots aligned whatever the word lengths.
const statements = [
  ["Creative", "by design"],
  ["Literate", "in AI"],
  ["Curious", "about why"],
];

export function OpeningPage() {
  return (
    <section className={stage.stage} aria-label="Intro">
      <div className={stage.inner}>
        <ul className={styles.statements}>
          {statements.map(([left, right], i) => (
            <li key={left}>
              <span className={styles.left}>{left}</span>
              {/* The middle ring is the one the zoom into Work goes through. */}
              <span className={styles.dot} aria-hidden="true" data-zoom-target={i === 1 || undefined} />
              <em className={styles.right}>{right}</em>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
