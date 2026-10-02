# Design system

> **Status: not yet defined.** Every value here is decided in the Design phase and recorded in `docs/decisions/`. Until then, **don't invent values**: no colours, sizes or fonts that aren't listed below.

**Source of truth:** Figma variables are the source of truth for design. The code consumes exported tokens. If Figma and code disagree, the bug is in code unless a decision record says otherwise.

## Token tiers

1. **Primitives:** raw values with no meaning (`color/gray/50…950`, `space/100…`). Components never use them directly.
2. **Semantic:** intent, which switches per mode (`color/bg/surface`, `color/text/primary`, `space/inset/md`).
3. **Component:** only when one component needs to diverge (`button/bg/hover`).

## Collections & modes

| Collection | Modes | Status |
|---|---|---|
| Primitives | — | TBD |
| Color (semantic) | Light, Dark | TBD |
| Spacing / size / radius | — | TBD |
| Typography | Mobile, Desktop (if needed) | TBD |
| Motion (durations, easings) | — | TBD |

## Values

TBD: filled in from decision records.

## Components

| Component | Figma | Code | States covered | Status |
|---|---|---|---|---|
| — | | | | |
