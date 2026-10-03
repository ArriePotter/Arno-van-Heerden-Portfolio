# Evidence ledger: perception and cognitive science for UI

This is the **source of truth for "proves the why"**. Every scientific claim the portfolio makes must come from a row here, and it must be ✅ verified before it is published.

- **Origin:** two AI-compiled research reports Arno produced in another chat (3 Oct 2026): *Part 1, the perceptual and cognitive science of UI/UX*, and *Part 2, the psychology of beauty in nature*. That report is *tier 6* (hypotheses only) until each claim is checked against its primary source (see `docs/sources.md`).
- **Evidence grade** (from the report, kept as-is): **A** = robust and replicated. **B** = suggestive or contested. **C** = popular but unsupported or debunked, so never claim it.
- **Verified:** ✅ checked against the primary source or an authoritative summary. ⏳ not yet checked; do this before publishing.

## Visual hierarchy & attention

| Claim | Grade | Primary source | Verified | Applies to |
|---|---|---|---|---|
| Visual appeal is judged in ~50 ms, and those judgments agree with ratings made at 500 ms | A | Lindgaard et al. 2006, *Behaviour & IT* 25(2):115–126 | ✅ | The hero must work at a glance |
| Only ~2° of vision is sharp (the fovea). The eye takes ~3–4 fixations per second (~200–250 ms each) | A | Rayner 1998/2009; Reichle & Reingold 2013 | ⏳ | Put the key message where the first fixation lands |
| Single-feature "pop-out" is found in parallel, regardless of how many other items there are | A | Treisman & Gelade 1980 | ⏳ | One distinctive primary element per view |
| A distinctive item is remembered better (isolation / Von Restorff effect) | A | Von Restorff; robust in memory research | ⏳ | Isolate the primary CTA |
| Users ignore content that looks or sits like an ad (banner blindness) | A | Benway 1998; NN/g eye-tracking | ⏳ | Nothing important styled like an ad |
| Unexpected items are often missed when attention is busy (inattentional blindness) | A | Simons & Chabris 1999, *Perception* 28:1059–1074 | ⏳ | Don't rely on peripheral changes to communicate |

## Layout, spacing & grouping

| Claim | Grade | Primary source | Verified | Applies to |
|---|---|---|---|---|
| Common region and connectedness are among the strongest grouping cues, and can override proximity and similarity | A | Palmer & Rock 1994; Wagemans et al. 2012, *Psych. Bulletin* 138 | ⏳ | Cards and regions for groups; spacing within a group < spacing between groups |
| Closely spaced items impair recognition in peripheral vision (crowding) | A | Crowding literature (Levi; Pelli) | ⏳ | Generous spacing between targets |
| Appeal peaks at moderate visual complexity and moderate colourfulness (an inverted U) | A | Reinecke et al. 2013, CHI | ⏳ | Restraint; a limited palette |
| Low complexity plus high prototypicality produce the most beautiful judgments, detectable within 17 ms | A | Tuch et al. 2012, *IJHCS* 70:794–811 | ✅ | Conventional structure, with surprise kept to the details (Jakob's law) |
| About two-thirds of page time is spent below the fold; attention decays with depth, but the fold isn't a cliff | A | Chartbeat (Schwartz), ~25 M sessions; NN/g scroll data | ⏳ | Order content by priority; long pages are fine |

## Typography & reading

| Claim | Grade | Primary source | Verified | Applies to |
|---|---|---|---|---|
| With good headings, people scan heading to heading (layer-cake). The F-pattern is a symptom of poor structure | A | NN/g eye-tracking report | ✅ (NN/g, in `docs/sources.md`) | Headings carry the story; front-load the first 2 words |
| ~50–75 characters per line is a defensible range; there is no single "optimal" length | B | Dyson & Haselgrove 2001; Shaikh & Chaparro 2005 | ⏳ | Set the measure to 50–75 CPL |
| Reading speed drops sharply below the critical print size; body text needs ≥2× the acuity limit | A | Legge & Bigelow 2011, *J. of Vision* 11(5):8 | ⏳ | Generous body size |
| Serif vs sans makes no reliable legibility difference on modern screens | C (myth) | Controlled-study consensus | ⏳ | Choose typefaces for character, not for legibility myths |
| "Dyslexia fonts" don't help; extra letter and word spacing does | A | Rello & Baeza-Yates 2013; Wery & Diliberto 2017 | ⏳ | Spacing over special fonts |

## Colour & contrast

| Claim | Grade | Primary source | Verified | Applies to |
|---|---|---|---|---|
| Low-contrast text is the most common accessibility failure: 83.9% of the top 1 M home pages (2026) | A | WebAIM Million 2026 | ✅ | Contrast as a differentiator and a talking point |
| The WCAG 2 ratio is perceptually imperfect (especially for dark pairs). APCA is a candidate, not a standard | A | WCAG 2.2; APCA (Somers) | ✅ (`docs/sources.md`) | Comply with WCAG 2.2; check with APCA as well |
| Legibility depends on luminance contrast, not hue difference | A | Opponent-process / vision science | ⏳ | Never separate text from background by hue alone |
| ~8% of men (Northern-European ancestry) have red–green colour vision deficiency | A | Birch 2012, *JOSA A* 29(3):313–320 | ⏳ | Never encode meaning by red/green alone |
| Dark text on a light background reads better (positive polarity), via smaller pupils; the effect is largest at small sizes | A | Piepenbrock, Mayr & Buchner 2014, *Ergonomics* | ✅ | Default to light for long reading, with dark as a choice |
| "Blue = trust" and other single-colour psychology claims | C (myth) | Marketing folklore | — | Use colour for distinction and salience, not emotion claims |

## Interaction & cognition

| Claim | Grade | Primary source | Verified | Applies to |
|---|---|---|---|---|
| Pointing time depends on target distance and size: MT = a + b·log₂(A/W + 1) | A | Fitts 1954; MacKenzie 1989 | ⏳ | Big, close targets; edges and corners |
| Working memory holds ~4±1 chunks, not 7±2 | A | Cowan 2001, *BBS* 24:87–185 | ⏳ | Plan for 3–5 items without rehearsal; chunk content |
| Choice overload averages close to zero, and only matters under specific conditions | A | Scheibehenne et al. 2010, *JCR* 37(3) | ⏳ | Don't cut options dogmatically |
| Recognition beats recall | A | Memory research; Nielsen's heuristics | ⏳ | Visible options, persistent state |
| First and last items are remembered best; experiences are judged by their peak and their end | A | Serial position effect; Kahneman (peak–end) | ⏳ | Strong opening and strong ending (contact) |
| Moving through a narrow path takes time linear in length ÷ width (steering law) | A | Accot & Zhai 1997 | ⏳ | No long, thin hover submenus |

## Motion & timing

| Claim | Grade | Primary source | Verified | Applies to |
|---|---|---|---|---|
| Response thresholds: 0.1 s feels instant, 1 s keeps the flow of thought, 10 s keeps attention | A | Miller 1968; Card et al. 1991; Nielsen 1993 | ⏳ | Feedback and loading budgets |
| Animated transitions improve tracking of changes (object constancy) | A | Heer & Robertson 2007, IEEE TVCG | ⏳ | Animate structural changes. UI micro-motion stays under 300 ms (`motion-design`); ~1 s applies to data-viz transitions |
| 35.4% of US adults aged 40+ have vestibular dysfunction | A | Agrawal et al. 2009, *Arch. Intern. Med.* (NHANES) | ✅ | Mandatory `prefers-reduced-motion` handling |
| No more than 3 flashes per second above the flash thresholds | Standard | WCAG 2.2 SC 2.3.1 | ✅ (`docs/sources.md`) | No flashing effects |

## Aesthetics & trust: why beauty works

| Claim | Grade | Primary source | Verified | Applies to |
|---|---|---|---|---|
| We find things beautiful in proportion to how easily we process them (**processing fluency**) | A | Reber, Schwarz & Winkielman 2004, *PSPR* 8(4):364–382 | ✅ | The core thesis of "proves the why" |
| Attractive interfaces are *perceived* as more usable (aesthetic–usability effect) | A | Kurosu & Kashimura 1995; Tractinsky 1997; Tractinsky et al. 2000 | ⏳ | Craft builds goodwill, but it can't hide real usability failures |
| Credibility is judged mainly on the "design look", which appeared in 46.1% of comments | A | Fogg et al. 2003 (Stanford, 2,684 participants) | ⏳ | Polish is a trust signal |

## Beauty in nature, translated to interfaces (Part 2)

| Claim | Grade | Primary source | Verified | Applies to |
|---|---|---|---|---|
| People prefer curved contours over sharp angles; sharp contours drive more amygdala activation (read as threat) | A (moderated by expertise and context) | Bar & Neta 2006, *Psych. Science* 17:645–648; Bar & Neta 2007; Silvia & Barona 2009 | ✅ (2006) | Rounded forms by default; sharpness only as a deliberate choice |
| Curved interiors are judged more beautiful, but contour does *not* change approach/avoid decisions | A | Vartanian et al. 2013, *PNAS* 110 | ⏳ | Curvature affects liking, not behaviour; don't overclaim it |
| Order and complexity are separate dimensions. "Complexity without order produces confusion; order without complexity produces monotony" | A | Van Geert & Wagemans 2020, *PACA* 14(2):135–154; 2021 (N=421) | ⏳ | Tune each surface: calm (more order) vs. fascinating (more of both) |
| Preference follows an inverted U over complexity and novelty (Berlyne) | A | Berlyne 1971 | ⏳ | Moderate novelty: a familiar structure with a surprising detail |
| Natural scenes have 1/f statistics, and visual cortex coding is optimised for them (sparse coding) | A | Olshausen & Field 1996, *Nature* 381:607–609 | ⏳ | Self-similar scales (type and spacing) as engineered scale-invariance |
| People prefer mid-range fractal complexity (D ≈ 1.3–1.5). The "60% stress reduction" figure comes from a single study of 24 people | B (preference robust, magnitudes uncertain) | Taylor et al. 1999, 2006, 2011 | ⏳ | Heuristic only; never quote the 60% figure |
| Colour preference follows the valence of objects associated with the colour (80% of variance, US sample), and is culture-dependent (~61% UK, ~37% Japan) | A (mechanism); culture-specific | Palmer & Schloss 2010, *PNAS* 107:8877–8882; Taylor & Franklin 2012; Yokosawa 2016 | ✅ (2010) | Choose colours by what they evoke *for SA and target audiences*, not by folklore |
| Mystery (the promise of more) is the most consistent single predictor of environmental preference | A | Kaplan & Kaplan 1989; Stamps 2004 meta-analysis | ⏳ | Progressive disclosure; let the next section peek into view |
| We prefer settings that offer both an overview (prospect) and shelter (refuge) | B | Appleton 1975 | ⏳ | Whitespace and hierarchy for overview; contained cards and regions for action |
| The visual system assumes light comes from above | A | Light-from-above prior (vision science) | ⏳ | One consistent overhead light source for all shadows |
| Aesthetics can compensate for usability at first, but the halo fades with exposure | A | Moshagen et al. 2009; Sonderegger & Sauer 2010; Sonderegger et al. 2012 | ⏳ | Beauty wins the first visit; real usability wins repeat use |
| Beauty is a trust signal, and therefore dual-use: it can lower users' guard against dark patterns | Ethics | Reinecke 2013; Brignull (deceptive patterns) | ⏳ | Never use craft to manipulate |

## Myths we never claim

Golden ratio layouts (Markowsky 1992; Fechner's rectangle study never replicated) · the strong "savanna genes" hypothesis · "nature restores executive attention" (mixed replication) · Miller's 7±2 for menus · the "8-second attention span" · a universal F-pattern · the 3-click rule · "users don't scroll" · single-colour psychology · "dyslexia fonts" · the strong paradox of choice · "4.5:1 guarantees readability".

*Knowing what the evidence doesn't support is itself proof of rigour.*
