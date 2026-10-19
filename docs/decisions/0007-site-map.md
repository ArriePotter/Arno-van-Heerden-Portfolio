# 0007: Site map: one "book" home page plus case-study pages

- **Date:** 2026-10-18
- **Status:** Accepted; menu-bar line superseded by 0010
- **Department:** Product strategy / Interaction design
- **Phase:** Define
- **Decided by:** Arno

## Context

v1 needs a structure before wireframes. The inputs were the Discover research (reviewers skim 1–2 case studies, put the best first, wayfinding is weak on most sites) and Arno's teardown leaning towards a chapter-style story that reads like opening a book.

## Options considered

1. **A chapter scroll that runs straight into the case studies** (dsgnpixl style). Immersive, but a long page that makes it hard to jump.
2. **A recruiter mode** (Elaine Yu style, CV first). Dropped by Arno, because it splits the experience.
3. **A "book" home page with case-study cards that open their own pages, and the CV always in the menu.**

## Decision

Option 3.

- **Menu bar** (always visible): Work · About · Contact · CV (PDF)
- **Home:**
  1. Cover (craft showcase + positioning line, decision 0006)
  2. Opening page (short statements + case-study previews)
  3. Case studies
  4. About + skills
  5. Get in touch
- **Case study pages** ×2 (Khoisān, How I built this site), each with a chapter side-nav.

**Case-study layout:** 2 large cards with Khoisān first. **Trigger:** switch to a masonry "brick wall" with "load more" once there are 5+ pieces.

## Evidence

- NN/g survey of 204 hiring managers: 3–5 strong case studies, quality over quantity; scannable (`docs/research/portfolio/desk/evidence-ledger.md`).
- UX Design Institute 2024: teams only skim 1–2 case studies → best first.
- Teardown pattern 4: weak wayfinding inside case studies → chapter side-nav (`docs/research/portfolio/teardown-insights.md`).
- Teardown, dsgnpixl: positioning 3/5 when the role is hidden behind a showcase → the positioning line sits on the cover.
- Skills merged into About, and the "what I've learned" notes parked for v2 (brief §10): *judgement*, within the time box.

## Consequences

- With only two items, the wall would look sparse. Revisit at 5+ pieces.
- **Explore:** check that the opening-page previews and the case-study section don't repeat each other.

## Case-study note

I kept the cinematic "book" feel I liked in the research, but gave reviewers a menu, a CV that's always visible, and the best work first, because the evidence says they skim.
