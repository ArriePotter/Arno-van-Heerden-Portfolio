import { Face } from "./Face";
import stage from "./Stage.module.css";
import styles from "./Cover.module.css";

export function Cover() {
  return (
    <section id="home" className={stage.stage} aria-labelledby="cover-title">
      <div className={stage.inner}>
        <Face className={styles.face} />
        <div className={styles.positioning}>
          <h1 id="cover-title" className={styles.title} data-stretch>
            <span className={styles.srOnly}>Arno van Heerden, </span>
            Product Designer who proves the <em>why</em>.
          </h1>
          <p className={styles.support} data-stretch>
            I research, design and ship products end to end, with AI-assisted code.
          </p>
        </div>
        <a href="#home" className={styles.signature} data-stretch aria-label="Arno van Heerden, home">
          Arno van Heerden
        </a>
        <footer className={styles.bottom} data-stretch>
          <span>Portfolio ’26</span>
          <span>V1.0.0</span>
        </footer>
      </div>
    </section>
  );
}
