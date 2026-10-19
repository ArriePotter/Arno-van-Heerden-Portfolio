# 0018: Case-study page layout, built from the Discover research

- **Date:** 2026-10-19
- **Status:** Accepted as a mock (content placeholders)
- **Department:** Interaction design / Content design
- **Phase:** Build (reverse mode, 0011)
- **Decided by:** Arno

## Context

Case studies follow the 7-chapter template (0008). The page layout had to answer what the research found reviewers need, and Arno's notes on the teardown and moodboard cards.

## Decision

The Khoisān page (`/work/khoisan`) as the layout for every case study:

1. **Project overview** first: title, one line on what it is, then the facts row (role, built with / AI, users, timeline, platform, status).
2. **The 7 chapters** (0008), each with a statement heading that tells the story on its own.
3. **The scroll nav, vertical and fixed on the left** (0013), beside the title from the first screen; a back link to Work and Resume at the top.
4. **Grey image "pauses"** between text.
5. **The why, shown:** a screen with a "Show the why" switch (numbered pins, each decision's reason and source), plus the code behind it.
6. **What we cut and why**, and **where AI helped and failed**, in Measure & learn.
7. **Explore more** above the footer.

## Evidence

- NN/g (204 hiring managers): role, constraints, process, what was cut; scannable (`docs/research/portfolio/desk/evidence-ledger.md`).
- NN/g layer-cake scanning: headings carry the story.
- Teardown: weak wayfinding (pattern 4); grey image pauses and "Explore more" (sananes.co card); "the why explained by code and imagery… a toggle" (rauno.me card + moodboard note).
- CLAUDE.md #7: be honest about AI.

## Consequences

- Real Khoisān content, screens and results come from Khoisān's own `docs/` and Figma; undecided parts are in [brackets].
- The vertical nav is hidden below 960 px; a chapter row replaces it.

## Case-study note

Every part of the case-study page answers something the research said reviewers look for.
