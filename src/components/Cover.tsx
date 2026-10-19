import { HoldOnScroll } from "./HoldOnScroll";
import { ParallaxFace } from "./ParallaxFace";
import stage from "./Stage.module.css";
import styles from "./Cover.module.css";

export function Cover() {
  return (
    <section id="home" className={stage.stage} aria-labelledby="cover-title">
      <div className={stage.inner}>
        <ParallaxFace className={styles.face} />
        <HoldOnScroll className={styles.positioning} lag={0.25}>
          <h1 id="cover-title" className={styles.title}>
            <span className={styles.srOnly}>Arno van Heerden, </span>
            Product Designer who proves the <em>why</em>.
          </h1>
          <p className={styles.support}>
            I research, design and ship products end to end, with AI-assisted code.
          </p>
        </HoldOnScroll>
      </div>
    </section>
  );
}
