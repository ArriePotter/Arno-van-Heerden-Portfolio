import { MenuButton } from "./MenuButton";
import { ResumeLink } from "./ResumeLink";
import { ScrollNav } from "./ScrollNav";
import { TopBlur } from "./TopBlur";
import styles from "./MenuBar.module.css";

export function MenuBar() {
  return (
    <>
      <TopBlur />
      <header className={styles.bar}>
        <MenuButton />
        <ScrollNav />
        <ResumeLink />
      </header>
    </>
  );
}
