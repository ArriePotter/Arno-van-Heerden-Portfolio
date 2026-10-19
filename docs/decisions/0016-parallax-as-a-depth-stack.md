# 0016: Parallax is a depth stack, used only where layers overlap

- **Date:** 2026-10-19
- **Status:** Accepted (cover parallax parked until the final face)
- **Department:** Motion design
- **Phase:** Build (reverse mode, 0011)
- **Decided by:** Arno, after desk research

## Context

The cover's face-vs-title parallax "doesn't sell the parallax effect" (Arno), even after speeding the face up. Arno asked for research before another attempt.

## Options considered

1. **Keep tuning speeds** on the cover. Two attempts didn't read as depth.
2. **A depth stack:** far, middle and near layers, each at one constant speed, nearer = faster, with layers that pass in front of each other.

## Decision

Option 2:

- **Cover:** parked. The research card ("Parallax needs depth, not lag", Figma 🔬 Research) suggests: background Why far, face in the middle (larger, partly behind the title, ~0.5×), title in front at 1× with no hold. Apply when the final face is drawn.
- **About:** the photo is stuck to the top while the next page (Get in touch, which starts with the skills strip) slides up over it; the picture drifts slightly inside its frame; the text card holds in the vertical centre of the screen until its column ends, always a 160 px gap above the strip.

## Evidence

- Motion parallax: nearer objects move faster; the relative speed is the depth cue (The Decision Lab; LaValle, *Virtual Reality*).
- Hero pattern: the image plane at about half the scroll speed, behind the text (ProtoPie).
- Keep it in step with the scroll: CSS / scroll-driven, not scroll-event JS (Chrome for Developers).
- Parallax raises "fun / professional" ratings but not usability; some testers felt motion sick (Purdue thesis 2014; UXPin). So: moderate speeds, off with reduced motion.
- *Judgement:* the cover failed because the title's hold changes its depth mid-scroll, and face and title never overlap.

## Consequences

- The cover still has the 1.5× face and the title hold until the new face exists.
- Sources added to `docs/sources.md` (Motion).

## Case-study note

When the parallax didn't work, I researched why instead of tuning numbers: depth comes from overlap and constant relative speed.
