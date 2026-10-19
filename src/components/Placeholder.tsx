import stage from "./Stage.module.css";
import styles from "./Placeholder.module.css";

// Empty pages so the menu and scroll nav have somewhere to go. Designed later.
// `anchor={false}` when the page's jump target lives elsewhere (Work's is in IntroZoom).
export function Placeholder({ id, title, anchor = true }: { id: string; title: string; anchor?: boolean }) {
  return (
    <section id={anchor ? id : undefined} className={stage.stage} aria-labelledby={`${id}-title`}>
      <div className={styles.inner}>
        <h2 id={`${id}-title`} className={styles.title}>
          {title}
        </h2>
        <p className={styles.note}>Coming next.</p>
      </div>
    </section>
  );
}
