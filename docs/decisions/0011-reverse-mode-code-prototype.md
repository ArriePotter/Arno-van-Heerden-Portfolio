# 0011: Reverse mode: build a local code prototype of Direction A before the Figma gates

- **Date:** 2026-10-19
- **Status:** Accepted
- **Department:** Design engineering
- **Phase:** Explore → Build
- **Decided by:** Arno

## Context

Direction A ("The book", Figma 💡 Explorations, section 04 v3) is designed for the cover and the opening page. Arno wants to see the real layout in a browser, then design motion, hover and interaction in code first, and record them back into Figma afterwards. Decision 0003 said v1 is Figma-only, and the lifecycle puts Build after Design review, Validate and Handoff.

## Options considered

1. **Follow the lifecycle:** crit → design review → validate → handoff → build. This is safer, but motion can't be judged in static frames.
2. **Reverse mode:** a local code prototype now, with every motion and interaction decision recorded back in Figma afterwards.

## Decision

Option 2, scoped as follows:

- **Local only** (`npm run dev`). No deploy, no domain. Decision 0003's "no live site in v1" still holds.
- **Stack** (resolves the pending stack decision): Next.js 16 (App Router), React 19, TypeScript strict, Tailwind CSS v4 (`@theme`), and Motion for React when motion starts.
- **Temporary CSS exception:** AI writes the tokens and CSS for this prototype. CLAUDE.md's rule ("Arno makes CSS and token edits by hand") applies again once the prototype phase ends. Arno must still be able to explain every line.

## Gates skipped (logged per the lifecycle rule)

- **Explore crit:** only one direction, no `design-critic` pass.
- **Design review, Validate, Handoff:** no "Ready for dev" frames.
- **Risk:** code that drifts from Figma and decisions made in code without a record.
- **Mitigation:** each motion or interaction change gets a note in Figma (frames plus notes) and, where a hiring manager could ask "why?", a decision record.

## Consequences

- **Fonts:** four families (STIX Two Text, Geist, Geist Mono, Mrs Saint Delafield), against the 2-family performance budget. Acceptable for a local prototype; cut it down before any release. The signature font is a placeholder for Arno's scanned signature.
- The CI "App" job starts running (lint, typecheck, build) once `package.json` exists.

## Case-study note

I moved to code early because motion is the heart of this design and can't be judged in static frames. I logged the gates I skipped and recorded every motion decision back in Figma.
