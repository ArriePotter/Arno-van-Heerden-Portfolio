# 0014: The menu opens instantly, lists every page, and keeps the nav's line language

- **Date:** 2026-10-19
- **Status:** Accepted (updates the menu details of 0010; 0010's reasoning stands)
- **Department:** Interaction design
- **Phase:** Build (reverse mode, 0011)
- **Decided by:** Arno

## Context

0010 put Work, About and Contact behind a burger labelled "Menu". Building it raised four questions: how it animates, what it lists, how it looks open, and what the burger looks like.

## Decision

- **No opening animation.** "A menu is something that should load fast" (Arno).
- **Lists every page:** Home, Intro, Work, About, Contact.
- **Open panel:** a bordered box that comes out of the left screen edge (no left border); the page names line up with the start of the burger lines. Hover turns a name the brand colour, with a brand line sliding in from the screen edge on that row.
- **Burger:** five horizontal lines styled like the scroll nav (same 7 px gap, longer in the middle, the middle one in the brand colour). The visible word "Menu" is removed; screen readers still hear "Menu".

## Evidence

- Emil Kowalski: things used often should barely animate (`docs/sources.md`, Motion); teardown: a burger that "took too long to open due to animation" (Sierra Hopkins card).
- **Risk, raised by removing the word:** 0010 cited NN/g's finding that hidden navigation is used less on desktop, and the "Menu" label was one of its mitigations. The remaining mitigations: the scroll nav reaches every page, Resume stays visible. Test in the prototype review (0004).

## Consequences

- Menu and scroll nav share one visual language (lines, brand colour for "here").

## Case-study note

The menu doesn't animate open, because it's used often and speed matters more there than delight.
