import { MenuButton } from "./MenuButton";
import { ResumeLink } from "./ResumeLink";
import { ScrollNav } from "./ScrollNav";
import styles from "./MenuBar.module.css";

export function MenuBar() {
  return (
    <header className={styles.bar}>
      <MenuButton />
      <ScrollNav />
      <ResumeLink />
    </header>
  );
}
