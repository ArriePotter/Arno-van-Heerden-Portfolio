import styles from "./ResumeLink.module.css";

// Figma: A/Resume (On=Background). The PDF goes in /public/resume.pdf when it's ready.
export function ResumeLink() {
  return (
    <a className={styles.link} href="/resume.pdf">
      Resume
    </a>
  );
}
