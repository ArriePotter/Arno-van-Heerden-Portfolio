# 0019: One page margin: full-width content lines up with Menu and Resume

- **Date:** 2026-10-19
- **Status:** Accepted
- **Department:** Visual design / Design systems
- **Phase:** Build (reverse mode, 0011)
- **Decided by:** Arno

## Context

The Work cards first ran past the screen edges. Arno: "The cards outer borders should always vertically align with the resume and menu buttons, keep the margin consistent."

## Decision

A `--page-gutter` token (40 px; 24 px under 760 px). The menu bar, the Work cards, the About page and the case-study side nav all use it. Deliberate exceptions reach *through* the margin to the screen edge: the open menu box and the About photo.

## Evidence

- Arno's rule (19 Oct).
- Teardown: on the weak site, "edges don't line up: case study cards don't line up with the burger menu or contact navbar elements" (Sierra Hopkins card).

## Consequences

- A spacing token now exists in code; it needs a Figma variable (Spacing collection) to match.

## Case-study note

Everything lines up on one page margin, which is the kind of detail a visual design lead checks first.
