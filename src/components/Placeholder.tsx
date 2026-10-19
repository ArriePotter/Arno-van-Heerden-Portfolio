import stage from "./Stage.module.css";
import styles from "./Placeholder.module.css";

// Empty pages so the menu and scroll nav have somewhere to go. Designed later.
export function Placeholder({ id, title }: { id: string; title: string }) {
  return (
    <section id={id} className={stage.stage} aria-labelledby={`${id}-title`}>
      <div className={styles.inner}>
        <h2 id={`${id}-title`} className={styles.title}>
          {title}
        </h2>
        <p className={styles.note}>Coming next.</p>
      </div>
    </section>
  );
}
