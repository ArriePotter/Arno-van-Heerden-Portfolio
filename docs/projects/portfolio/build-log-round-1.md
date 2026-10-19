# Build log, round 1: reverse-mode prototype (19 Oct 2026)

Raw material for case study #0's **Iterations**, **Solution** and **Measure & learn** chapters (0008). Phase: Explore → Build in reverse mode (0011). Code: branch `feat/home-prototype` (PR #8). Decisions: 0012–0019. Figma: 💡 Explorations → "05 As built · round 1".

## How the round worked

Arno directed every change in the browser ("make the title stand still for a bit", "the cards should bend around it"); Claude wrote the code, checked each change in Chrome (and Safari for one case) with scripted measurements and screenshots, and committed it. Every rejected attempt was reverted, not hidden.

## Iterations: what changed, and what forced it

| Area | Tried | Kept | What forced the change |
|---|---|---|---|
| Background Why | Drifts right; moves on x and y; scales down | Moves left only, ends with equal margins, never scales; slim brand outline (1 px) | Arno: "into the screen", "it's shrinking, that's wrong", "the y is cut off" |
| Top blur | Progressive blur; liquid "stretch" (3 attempts) | Plain progressive blur | Stretch "sprang" and looked jagged; Arno: "you are making a mess" |
| Title on the cover | Lag via script; a long hold | Holds still while the face rises, then eases into the scroll (CSS) | The script version bounced; the hold was "way too long" |
| Footer | Gradient | Fixed, fades out | Arno: "NO, not a gradient" |
| Face | Faster parallax; a hand-coded anatomy drawing | Original line face, brain-shaped node network; parallax parked | Drawing "terrible" (AI line art too diagrammatic); parallax "doesn't sell it" → research (0016) |
| Scroll nav | Spring; simultaneous word swaps; linear tick slope | Eased; sequential, direction-aware swaps; exponential slope; hover, blur, you-are-here (0013) | Overlapping words; "should not spring"; "not a 45° increase" |
| Menu | Word "Menu"; underline hover; grow on hover | Instant panel from the screen edge, nav-style burger, colour + edge line on hover (0014) | Arno: "a menu should load fast"; "don't increase the text size" |
| Intro → Work | Zoom into a ring | The book opens: rows fade, the last row splits (0015) | "The scroll should not increase the text size" |
| Work cards | Rise and rest beside the title; circle cut-out; blur edge; sand hourglass; borders | Half-width cards that bend around an invisible circle; text shifts with the bend (0015) | "Looks like going under a white circle"; sand and borders "remove" |
| Off-centre Work | — | Intro statement grid made symmetric | The split sat 18 px left of centre |
| About | Lagging text column; bell-curve speed | Sticky photo, centred glass card, Get in touch slides over the photo (0016, 0017) | "Keep the text box in the centre longer"; "the carousel is the start of a new page" |
| Highlighter | Colour fill; per-line sweep; fast sweep | Hand-drawn marker, one phrase at a time, smooth, may trail (0017) | "Should look like a real person highlighted"; "not so fast" |
| Case study | Centred layout; sticky nav | Fixed vertical scroll nav on the page margin; Project overview first (0018) | "Wasted space"; "should stay fixed" |

## Where AI helped, and where it failed

**Helped**
- Fast loops: dozens of browser-verified changes in one session, each committed separately and revertible.
- Measuring instead of eyeballing: centre lines (found the 18 px off-centre split), scroll speeds, overlap gaps, keyboard order of the highlighter.
- Research on demand: the parallax desk research that turned "tune the numbers" into a principle (0016).

**Failed** (and how it was caught)
- Over-reached when feedback was vague: the stretch blur (three attempts), shrinking the Why. Now a rule: ask before changing anything not mentioned.
- Hand-drawn illustration: the anatomy drawing was rejected; illustrations need a human or licensed source.
- Bugs it introduced and then fixed: words overlapping in the nav (a React dev double set-up), the highlighter stalling while the card held, the nav stopping one line short, CSS selectors for `pathLength` lower-cased by CSS Modules, GSAP scope searching the wrong elements, a stale Turbopack cache for `globals.css`.
- A tool slip: a failed `git revert` amended the wrong commit locally; the push was rejected and it was repaired before anything left the machine.

## Skipped gates (carried from 0011)

No Explore crit, design review, validation or handoff before building. Mitigation: these records, the build log, and the as-built wireframes and motion specs in Figma.

## Open items

- Content: real copy (statements, About, case study), photo, signature scan, skills list, case study 2's name.
- Face: final drawing (route suggested: traced own profile + public-domain anatomy plate), then the cover depth stack (0016).
- Figma: tokens to mirror (`--page-gutter`, motion values); Ready-for-dev frames once validated.
- Prototype review with designers (0004), including the hidden-menu risk (0014).
