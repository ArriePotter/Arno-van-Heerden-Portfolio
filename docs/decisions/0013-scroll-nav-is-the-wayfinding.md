# 0013: The scroll nav is the site's wayfinding, on the home page and in case studies

- **Date:** 2026-10-19
- **Status:** Accepted
- **Department:** Interaction design / Motion design
- **Phase:** Build (reverse mode, 0011)
- **Decided by:** Arno

## Context

Direction A replaces a menu bar with a scroll nav of thin lines (0010). Teardown pattern 4 found wayfinding inside case studies weak ("no back button… no 'you are here'"), and pattern 5 found motion helps only when it guides reading. The nav had to show where you are, invite exploring, and stay calm.

## Decision

One component, `ScrollNav`, used twice:

- **Home:** 80 lines across the top. **Case study:** the same nav stood up on the left (71 lines), fixed in place, beside the title from the first screen.
- **Position:** the main line follows the scroll continuously, eased (power3.out, 0.5 s, no spring). The line count is fixed; each page owns the lines nearest to it, so the page name switches halfway between pages, the same way up or down.
- **Line lengths:** fall off **exponentially** from the main line (8 + 20·e^(−0.7·distance) px), not in a straight 45° slope.
- **Page name:** letters swap in sequence (old word out, then new word in), left to right scrolling down and right to left scrolling up. Clicking a name switches it instantly, with no animation (the swap is for scrolling only).
- **Hover:** the main line follows the mouse; every page name appears; the hovered name turns the brand colour; the line for where you are stays orange and shorter (14.5 px). The hover zone is the whole nav plus a margin (on the side nav, as wide as the longest name plus 24 px).
- **Motion blur:** only the main line and the 5 lines either side, and only while moving (max 1.5 px).
- **Ends:** the last section's line is reached at the bottom of the page, and clicking a section lands exactly on its line.

## Evidence

- Teardown pattern 4 (wayfinding) and pattern 5 (motion that guides), `docs/research/portfolio/teardown-insights.md`.
- Rauno's scroll dot "helped follow along" (teardown card). Arno's own steal.
- Each behaviour above was tried in the browser and adjusted on Arno's feedback (see the build log).

## Consequences

- Hidden below 960 px; the burger menu (0014) and a simple chapter row cover small screens.
- One component to maintain for both pages; its props are chapters, line count, orientation and label.

## Case-study note

The navigation is the signature interaction: one component that tells you where you are on the home page and inside every case study.
