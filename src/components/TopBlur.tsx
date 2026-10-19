import styles from "./TopBlur.module.css";

// Progressive blur under the top bar (moodboard: "blur effect on the bottom of the screen").
// Stacked layers, each blurring more and masked to a band, so the blur grows towards the top.
export function TopBlur() {
  return (
    <div className={styles.root} aria-hidden="true">
      {[1, 2, 3, 4, 5, 6].map((n) => (
        <div key={n} className={styles.layer} />
      ))}
    </div>
  );
}
