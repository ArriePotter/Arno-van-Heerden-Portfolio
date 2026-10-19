import styles from "./AboutPage.module.css";

// Layout after Arno's reference (19 Oct): statement headline, photo flush with the left edge
// of the screen, an opening quote, a divider and two short columns.
// PLACEHOLDER COPY for Arno to rewrite. Facts come from decisions 0005, 0006 and 0009; no
// payroll angle (decision 0002).
export function AboutPage() {
  return (
    <section id="about" className={styles.about} aria-labelledby="about-title">
      <h2 id="about-title" className={styles.headline}>
        A <strong>product designer</strong> who proves the <em>why</em> before shipping the what.
      </h2>

      <div className={styles.body}>
        {/* Placeholder until Arno's photo is ready. */}
        <div className={styles.photo} role="img" aria-label="Photo of Arno van Heerden (placeholder)">
          <span>Photo</span>
        </div>

        <div className={styles.text}>
          <blockquote className={styles.intro}>
            <p>
              Hi, I&rsquo;m Arno. I research, design and ship products end to end, with
              AI-assisted code.
            </p>
          </blockquote>

          <hr className={styles.rule} />

          <div className={styles.columns}>
            <p>
              I design and ship my own products: Project Khoisān, a training app for the MUT 60
              trail race, KhayaPay for iOS, and an agentic bookkeeping web app.
            </p>
            <p>
              I work in the open. The research, the decisions and where AI helped or failed are
              all on the record, starting with this site.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
