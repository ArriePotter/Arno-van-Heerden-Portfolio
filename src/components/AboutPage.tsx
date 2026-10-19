import styles from "./AboutPage.module.css";

// Layout after Arno's reference (19 Oct): statement headline, photo flush with the left edge
// of the screen, an opening quote, a divider and two short columns.
// PLACEHOLDER skills and tools until Arno sends his list: tools from this project's own stack
// (package.json, CLAUDE.md), skills from the departments in CLAUDE.md. Text names for now;
// logos need SVG files and a licence check (memory: no stock icons).
const skills = [
  "Figma",
  "User research",
  "Next.js",
  "Interaction design",
  "React",
  "Design systems",
  "TypeScript",
  "Motion design",
  "Tailwind CSS",
  "Prototyping",
  "GSAP",
  "Content design",
  "Claude Code",
  "GitHub",
  "Vercel",
];

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
          {/* The picture layer is taller than the frame, so it can drift inside it. */}
          <div className={styles.photoInner}>
            <span>Photo</span>
          </div>
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

      {/* Skills and tools: an endless strip. The list is shown twice so it can loop
          seamlessly; the copy is hidden from screen readers. */}
      <div className={styles.marquee}>
        <div className={styles.track}>
          <ul className={styles.items} aria-label="Skills and tools">
            {skills.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <ul className={styles.items} aria-hidden="true">
            {skills.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
