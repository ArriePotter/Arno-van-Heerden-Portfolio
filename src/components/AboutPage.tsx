import { CentreSticky } from "./CentreSticky";
import { HighlightOnScroll } from "./HighlightOnScroll";
import styles from "./AboutPage.module.css";

// A key phrase that fills with the brand colour as it scrolls past the middle of the screen.
function Key({ children }: { children: React.ReactNode }) {
  return (
    <strong className={styles.key} data-highlight>
      {children}
    </strong>
  );
}

// Layout after Arno's reference (19 Oct): statement headline, photo flush with the left edge
// of the screen, an opening quote, a divider and two short paragraphs.

// PLACEHOLDER COPY for Arno to rewrite. Facts come from decisions 0005, 0006 and 0009; no
// payroll angle (decision 0002).
export function AboutPage() {
  return (
    <section id="about" className={styles.about} aria-labelledby="about-title">
      <HighlightOnScroll />
      <CentreSticky />
      <h2 id="about-title" className={styles.headline}>
        A <strong>product designer</strong> who proves the <em>why</em> before shipping the what.
      </h2>

      <div className={styles.body}>
        {/* Placeholder until Arno's photo is ready. */}
        <div className={styles.photo} role="img" aria-label="Photo of Arno van Heerden (placeholder)">
          {/* The picture layer is taller than the frame, so it can drift inside it. */}
          <div className={styles.photoInner}>
            <span>Photo</span>
          </div>
        </div>

        <div className={styles.textCol}>
          <div className={styles.text} data-sticky-centre>
          <blockquote className={styles.intro}>
            <p>
              Hi, I&rsquo;m Arno. I research, design and ship products end to end, with
              AI-assisted code.
            </p>
          </blockquote>

          <hr className={styles.rule} />

          <div className={styles.columns}>
            <p>
              I design and <Key>ship my own products</Key>: <Key>Project Khoisān</Key>, a
              training app for the MUT 60 trail race, <Key>KhayaPay</Key> for iOS, and an{" "}
              <Key>agentic bookkeeping web app</Key>.
            </p>
            <p>
              I <Key>work in the open</Key>. The research, the decisions and where{" "}
              <Key>AI helped or failed</Key> are all <Key>on the record</Key>, starting with this
              site.
            </p>
          </div>
          </div>
        </div>

        {/* Room for the next page (Get in touch) to slide up over the stuck photo. */}
        <div className={styles.spacer} aria-hidden="true" />
      </div>
    </section>
  );
}
