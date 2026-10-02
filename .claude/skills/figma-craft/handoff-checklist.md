# Handoff checklist ("Ready for dev")

A section only gets marked **Ready for dev** when every box is checked. Then make a named version: "Handoff — <feature> v<n>".

## Structure

- [ ] Frames are named `Breakpoint / Page / State`, and layers are named.
- [ ] All breakpoints are present (390 / 768 / 1440), and the behaviour between them is annotated.
- [ ] Everything is auto layout and passes the resize test.
- [ ] No detached instances, and no hidden or leftover layers.

## Values

- [ ] Every fill, stroke, text colour, gap, padding and radius is bound to a **semantic variable**.
- [ ] Every text layer uses a text style from the scale.
- [ ] Variables have **code syntax** set, so Dev Mode shows the CSS names.

## States & content

- [ ] All interactive states are present: default, hover, focus-visible, active, disabled.
- [ ] Screen states are present: ideal, empty, loading, partial, error.
- [ ] Real, final copy has been reviewed by `content-design` (no lorem ipsum).
- [ ] Alt text is written for every meaningful image (annotation).

## Accessibility annotations

- [ ] Heading levels (H1–H3) are annotated.
- [ ] Focus order is annotated where it isn't simply top→bottom, left→right.
- [ ] Landmarks are annotated (header, nav, main, footer).
- [ ] Contrast has been checked in both modes.
- [ ] Touch targets are ≥ 24×24 (aim for 44).

## Motion

- [ ] Every animation is annotated: trigger · property · from→to · duration token · easing token · reduced-motion fallback.

## Assets

- [ ] Export settings are set for images and icons (SVG for icons; images at 1× and 2×, or source files provided).
- [ ] Image licensing and font licensing have been confirmed.

## Decisions

- [ ] Decision records are written for any choice a reviewer might question.
- [ ] Changes since the last handoff are noted in the "Ready for dev" note.
