"use client";

import { useEffect, useId, useRef, useState } from "react";
import styles from "./MenuButton.module.css";

// PLACEHOLDER until Arno's professional email exists (the repo is public).
const CONTACT_EMAIL = "you@example.com";
const SUBJECT = "Hello from your portfolio";

// The scroll nav already moves between the home page's sections, so the menu holds the deep
// links instead: each case study, and email. An entry without an href isn't ready yet.
const links = [
  { href: "/work/khoisan", label: "Case study 1" },
  { href: "", label: "Case study 2", note: "coming soon" },
  { href: `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(SUBJECT)}`, label: "Get in touch" },
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
          <li key={l.label}>
            {l.href ? (
              <a href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            ) : (
              <span className={styles.soon}>
                {l.label} <small>{l.note}</small>
              </span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
