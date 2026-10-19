# Design system

> **Status: as built in the reverse-mode prototype (0011), not yet through Design review.** Values below are what the code uses today; each is traced to Figma (collection "Direction A") or a decision record. Don't invent values that aren't listed here.

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

## Values (as built, 19 Oct 2026)

**Colour** (Figma "Direction A", Light / Dark)

| Token | Light | Dark | Use |
|---|---|---|---|
| `--color-bg` | #FAFAFA | #292719 | Page |
| `--color-text` | #141414 | #F7F4F2 | Text |
| `--color-text-muted` | #6B6B6B | #B9B4A8 | Secondary text, nav lines |
| `--color-accent` | #B4530A | #FFEA00 | Small brand text, "you are here" (5.0:1 on bg) |
| `--color-why` | #E1791E | #D1390A | Display only: Why outline, highlighter (3.0:1) |
| `--color-why-wash` | #FFF2E7 | #3A3424 | Why fill, card fill |

**Type:** STIX Two Text (display, headings), Geist (body, UI), Geist Mono (labels), Mrs Saint Delafield (signature placeholder). Four families, over the 2-family budget (0011).

**Space:** `--page-gutter` 40 px (24 px under 760 px) — 0019. Radius 16 px (cards, frames), 4 px (Resume, menu box).

**Motion** (0012–0017)

| What | Value |
|---|---|
| Nav glide | 0.5 s, power3.out (no spring) |
| Nav word swap | out 0.22 s power2.in, stagger 25 ms; in 0.35 s power3.out, stagger 30 ms |
| Nav lines | 8 + 20·e^(−0.7·d) px; motion blur ≤ 1.5 px on ±5 lines |
| Hover colour | 0.2 s ease-out |
| Strong ease-out (UI) | cubic-bezier(0.23, 1, 0.32, 1) |
| Title hold (cover) | translateY 0→15vh over scroll 0→30vh, ease-out-quad |
| Face (cover) | 1.5× page speed (parked, 0016) |
| Book opening | 150 svh; rows fade 0–0.15, 0.15–0.3; split 0.3–1 power2.inOut |
| Work cards | 100 svh, start at Work "top 35%", power2.out; bend (ring+12)·e^(−(dy/1.1·ring)²), ring 96 px |
| Highlighter | pen eases 8%/frame towards the scroll target |
| Reduced motion | no movement; cross-fades or final states |

## Components

| Component | Figma | Code | States covered | Status |
|---|---|---|---|---|
| Scroll nav (horizontal / vertical) | A/Scroll nav (horizontal only) | `ScrollNav.tsx` | rest, scrolling, hover, focus, click, reduced motion | Built; vertical not yet in Figma |
| Menu button + panel | A/Menu button | `MenuButton.tsx` | closed, open, hover, focus | Built; open panel not in Figma |
| Resume link | A/Resume | `ResumeLink.tsx` | rest, hover, focus | Built |
| Work card | — | `WorkPage.tsx` | rest, rising/bending, hover, focus, no-link | Built; not in Figma |
| Why toggle | — | `case-study/WhyToggle.tsx` | off, on | Mock |
