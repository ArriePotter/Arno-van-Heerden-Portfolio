# 0020: The menu holds deep links, not page sections

- **Date:** 2026-10-19
- **Status:** Accepted (supersedes the "lists every page" part of 0014)
- **Department:** Interaction design
- **Phase:** Build (reverse mode, 0011)
- **Decided by:** Arno

## Context

0014 had the menu list every home-page section (Home, Intro, Work, About, Contact). The scroll nav (0013) already moves between those sections, so the menu repeated it.

## Decision

The menu lists the places the scroll nav can't reach:

- **Case study 1** → `/work/khoisan`
- **Case study 2** → shown as "coming soon", not clickable, until it exists
- **Get in touch** → opens an email with the subject filled in ("Hello from your portfolio")

## Evidence

- Arno's call (19 Oct): "the navbar scroll bar already serves the purpose of the burger menu".
- *Judgement:* one way to reach each place; the menu becomes the shortcut to the deepest content. Reviewers often only have time to skim 1–2 case studies (evidence ledger).

## Consequences

- The email address is a placeholder (`you@example.com`) until the professional address exists; the repo is public.
- Below 960 px the scroll nav is hidden, so on phones the home sections are reached by scrolling only. Revisit in the prototype review (0004).

## Case-study note

The menu doesn't repeat the scroll nav; it's the shortcut to the case studies and to email.
