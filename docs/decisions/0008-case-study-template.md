# 0008: Case-study template: 7 chapters on the lifecycle spine

- **Date:** 2026-10-18
- **Status:** Accepted
- **Department:** Product strategy / Content design
- **Phase:** Define
- **Decided by:** Arno

## Context

Every case study needs the same chapters. They also form the chapter side-nav (decision 0007). Arno wanted the chapters to follow our lifecycle (`docs/lifecycle.md`), but all 10 phases would be too many for a skim, and Khoisān skipped some phases.

## Options considered

1. **All 10 lifecycle phases as chapters.** Most faithful, but too long, with thin or empty chapters.
2. **A generic template** (problem → goal → challenge → process → impact → reflection, as on Elaine Yu's site). Familiar, but it hides the process we actually follow.
3. **Phases grouped into 7 chapters, with separate Iterations and Solution chapters.**

## Decision

Option 3:

1. **Brief:** the problem, goal and constraints
2. **Discover:** the research and what it showed
3. **Define + Explore:** scope and the directions tried
4. **Iterations:** each version, and what forced the change (a dev limit, a research finding or a late change)
5. **Solution:** the final design, with every key decision's *why* and its source
6. **Result:** what shipped (Build + Release)
7. **Measure & learn:** the outcome, what was skipped, and what you'd change

## Evidence

- NN/g survey of 204 hiring managers: they want the problem, role, constraints, timeline, process, how research shaped the work, and what was cut and why (`docs/research/portfolio/desk/evidence-ledger.md`).
- Decision 0006: "proves the why" lives in the Solution chapter.
- Teardown pattern 4: chapter navigation fixes weak wayfinding.
- Arno: design always iterates, so Iterations gets its own chapter.

## Consequences

- Skipped phases are named honestly in "Measure & learn" (e.g. Khoisān went code-first; see its own decision log).
- Each chapter heading must work on its own, because reviewers scan from heading to heading.

## Case-study note

My case studies follow the same lifecycle I actually work in, so reviewers see the process I use, not a template.
