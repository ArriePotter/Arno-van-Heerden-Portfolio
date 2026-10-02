# Visual design review checklist

Run this on every frame before the Design-review gate. Each failing item needs one of two things: a fix, or a decision record explaining the exception.

## Hierarchy

- [ ] The blur/squint test lands on the intended primary element first.
- [ ] There's exactly one primary action per view.
- [ ] Secondary information is de-emphasised (colour/weight), not shrunk below readable size.

## Typography

- [ ] Every text style comes from the type scale (no detached or local styles).
- [ ] Body is 16–20 px, line height 1.4–1.6, measure 45–75 characters.
- [ ] No more than 2 families and 3 weights.
- [ ] Curly quotes, real ellipses, correct dashes, and no widows in headings or hero text.
- [ ] Numbers in tables/metrics use tabular figures.

## Spacing & layout

- [ ] Every gap and padding value is a spacing token (4/8 system).
- [ ] Spacing within a group is less than spacing between groups.
- [ ] Content aligns to the grid; any optical-alignment exceptions are intentional.
- [ ] Checked at 390, 768 and 1440, and in between.

## Colour & contrast

- [ ] Only semantic colour variables are used on frames (no primitives, no raw hex).
- [ ] All text pairs meet 4.5:1 (or 3:1 if large) in **light and dark**.
- [ ] Controls, borders and focus rings meet 3:1.
- [ ] No information is conveyed by colour alone.
- [ ] The accent is used only for meaning and action.

## Components & consistency

- [ ] Every repeated element is a component instance; nothing is detached without a recorded reason.
- [ ] Corner radii, borders and shadows come from tokens and are consistent.
- [ ] Icons share one set, stroke weight and size grid.

## States

- [ ] Hover, focus-visible, active and disabled states are designed for every interactive element.
- [ ] Empty, loading, error and partial states are designed (see `interaction-design`).

## Detail pass

- [ ] Images are crisp at 2×, consistently cropped and treated, and have alt text written.
- [ ] There's no placeholder copy (lorem ipsum = not ready).
- [ ] Zoomed to 200%: nothing breaks.
