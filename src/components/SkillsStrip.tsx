import styles from "./SkillsStrip.module.css";

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

// Skills and tools: an endless strip at the top of the Get in touch page. The list is shown
// twice so it can loop seamlessly; the copy is hidden from screen readers.
export function SkillsStrip() {
  return (
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
  );
}
