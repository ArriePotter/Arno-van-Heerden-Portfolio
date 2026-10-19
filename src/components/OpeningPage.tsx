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
          {statements.map(([left, right], i) => {
            // On the way to Work, the top rows fade out and the last row splits open (IntroZoom).
            const last = i === statements.length - 1;
            return (
              <li key={left}>
                <span className={styles.left} data-split={last ? "left" : undefined} data-fade={!last || undefined}>
                  {left}
                </span>
                <span className={styles.dot} aria-hidden="true" data-fade />
                <em className={styles.right} data-split={last ? "right" : undefined} data-fade={!last || undefined}>
                  {right}
                </em>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
