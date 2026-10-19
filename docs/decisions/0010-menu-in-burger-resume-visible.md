# 0010: Work, About and Contact go in a menu; Resume stays visible

- **Date:** 2026-10-19
- **Status:** Accepted (supersedes the "menu bar" line of 0007)
- **Department:** Interaction design
- **Phase:** Explore
- **Decided by:** Arno

## Context

Decision 0007 put Work · About · Contact · CV in an always-visible menu bar. Arno's Direction A puts the craft first, with a scroll nav (ticks) in the centre of the top bar.

## Options considered

1. **Keep the full menu bar visible (0007).** Best for discoverability, but it competes with the scroll nav and the cover.
2. **Hide everything behind a burger.** The cleanest look, but the CV is hidden too.
3. **Burger on the left for Work · About · Contact; "Resume" always visible on the right, as a plain text link.**

## Decision

Option 3. The scroll nav in the centre shows the current page (the longest tick, with its title directly under it).

## Evidence

- *Arno's call* (19 Oct 2026), for a calmer cover.
- **Risk:** NN/g reports that hidden navigation is used less on desktop ("Hamburger menus and hidden navigation hurt UX metrics"; not yet in `docs/sources.md`). Mitigations: the burger is labelled "Menu", the scroll nav makes every chapter reachable, and Resume, the item recruiters need most, stays visible.

## Consequences

- Test in the prototype review (0004): can reviewers find About and Contact without help?
- "CV (PDF)" is renamed "Resume" everywhere.
