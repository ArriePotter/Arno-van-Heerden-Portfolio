# Release checklist

Run this on the Vercel **preview** before merging anything user-facing.

## Design fidelity

- [ ] Matches Figma at 390, 768 and 1440, and looks intentional between those widths.
- [ ] Light and dark modes are both correct.
- [ ] All states render: hover, focus-visible, active, disabled, loading, empty, error.
- [ ] Motion matches the specs, and the reduced-motion variant works (toggle it in OS settings).

## Accessibility (WCAG 2.2 AA)

- [ ] Keyboard-only pass: everything is reachable, the order is logical, focus is always visible and never hidden by sticky elements.
- [ ] Screen reader spot-check (VoiceOver): landmarks, headings, link and button names, and image alt text all make sense.
- [ ] axe DevTools shows 0 critical or serious issues.
- [ ] Content passes 200% zoom and 320 px width without horizontal scroll.
- [ ] Contrast is spot-checked on new colour pairs.

## Performance

- [ ] Lighthouse (mobile) scores ≥ 95 in Performance, Accessibility, Best Practices and SEO.
- [ ] No layout shift on load (fonts and images are sized).
- [ ] Images are optimised, and only the hero is prioritised.

## Content

- [ ] No lorem ipsum and no typos (run a spell-check).
- [ ] Copy has been reviewed by `content-design`.
- [ ] Page `<title>`, meta description and OG image are set.
- [ ] All links work, and external links are clearly external.

## Compliance & security

- [ ] No secrets in the diff, and environment variables are set in Vercel.
- [ ] Forms validate server-side, are rate-limited, and link to the privacy notice.
- [ ] No non-essential tracking loads before consent.

## Paperwork

- [ ] Decision records are written and indexed.
- [ ] `CHANGELOG.md` is updated.
- [ ] `docs/design-system.md` is updated if tokens or components changed.
- [ ] The Figma library is published with a matching description (if it changed).
