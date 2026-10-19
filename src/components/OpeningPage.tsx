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
    <section id="intro" className={stage.stage} aria-label="Intro">
      <div className={stage.inner}>
        <ul className={styles.statements}>
          {statements.map(([left, right]) => (
            <li key={left}>
              <span className={styles.left}>{left}</span>
              <span className={styles.dot} aria-hidden="true" />
              <em className={styles.right}>{right}</em>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
