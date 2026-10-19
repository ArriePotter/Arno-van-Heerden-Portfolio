"use client";

import { useEffect, useId, useRef, useState } from "react";
import styles from "./MenuButton.module.css";

const links = [
  { href: "#home", label: "Home" },
  { href: "#intro", label: "Intro" },
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

// Disclosure pattern (W3C APG): a button that shows and hides a list of links.
export function MenuButton() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <nav aria-label="Main" className={styles.root}>
      <button
        ref={buttonRef}
        type="button"
        className={styles.button}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
      >
        <span className={styles.burger} aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <span />
        </span>
        {/* No visible word (Arno); screen readers still hear "Menu". */}
        <span className="sr-only">Menu</span>
      </button>
      <ul id={panelId} className={styles.panel} hidden={!open}>
        {links.map((l) => (
          <li key={l.href}>
            <a href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
