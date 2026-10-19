import { SkillsStrip } from "./SkillsStrip";
import styles from "./ContactPage.module.css";

// The Get in touch page. It starts with the skills strip and slides up over the end of the
// About page, covering the photo that is stuck there. Content is a placeholder for now.
export function ContactPage() {
  return (
    <section id="contact" className={styles.contact} aria-labelledby="contact-title">
      <SkillsStrip />
      <div className={styles.inner}>
        <h2 id="contact-title" className={styles.title}>
          Get in touch
        </h2>
        <p className={styles.note}>Coming next.</p>
      </div>
    </section>
  );
}
