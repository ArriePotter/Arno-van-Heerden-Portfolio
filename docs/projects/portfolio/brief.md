# Brief: Portfolio site

- **Owner:** Arno van Heerden
- **Phase:** 0, Brief
- **Status:** Approved (gate passed 2026-10-03)
- **Last updated:** 2026-10-03
- **Note:** drafted by Claude at Arno's request, from Arno's Phase 0 answers and two rounds of critique. Arno reviews, corrects and approves it.

## 1. Problem

When a design lead or recruiter comes across me today, the first thing they see is a Financial Sciences degree and a finance career. They reasonably assume I'm not a designer, and they screen me out in seconds, before they ever see how I think about design. No public body of work yet shows my design process, my reasoning or my craft. Without that, I won't get interviews for roles I'm able to do.

My finance background shouldn't be hidden, though. For fintech teams, a designer who understands money, compliance and financial users is an advantage. It should support the story, never lead it.

## 2. Audience

Hiring for design roles is a two-stage funnel. First comes a skim, where the site has to earn the next 10 seconds. Then comes an inspection, where details decide. Each kind of design lead inspects their own layer of the work.

| Rank | Reader | What they check | Time (assumption) |
|---|---|---|---|
| 1 | **Design lead at a product studio or fintech** (e.g. Isoflow, Yoco). Often the first and only reader at smaller teams. | Is the craft real? Are the decisions deliberate or decorative? Would this person raise our bar? | ~10 s to decide whether to stay, then ~3 min inspecting |
| 2 | **Visual design lead** | Detail and polish: type, spacing, alignment, consistency. Weakness is spotted instantly. | Seconds to judge, then a detail inspection |
| 2 | **Interaction design lead** | The first scroll: structure, flow, behaviour, states. Does Arno know what he's doing? | The first scroll decides |
| 2 | **Research / content design lead** | The title and first sentence: researched and precise, or whatever sounded good? | The first sentence decides |
| 3 | **Recruiter / HR** (in-house or external), mainly at larger companies | Role, location, availability, CV. Is this worth forwarding to the design manager? | ~30 s |

I've never been through a design hiring process, so every timing and behaviour above is an assumption to test in Discover.

## 3. Goal

After 60 seconds, even an expert design lead concludes: *"Arno makes deliberate, evidence-based design decisions and knows why they work. I want to see more."*

## 4. Success metrics

| Signal | Target | How it's measured |
|---|---|---|
| Positioning is instantly clear | 4 of 5 designers can name my role and my differentiator after 5 seconds | 5-second test on the Figma prototype (Discover / Validate) |
| Curiosity ("how did he do that?") | Every reviewer asks at least one unprompted "how did you do X?" | Moderated review sessions with 3–5 working designers |
| Reviewers choose to stay | Reviewers keep exploring for 3+ minutes without being asked | Observed in the same review sessions |
| *Later (v2, live site):* the site earns interviews | ≥10% of applications lead to an interview after 30 applications | Application log; cookieless analytics for engaged time |

Guiding principle (not a metric): **don't make the viewer think.** The site's purpose and my role must be obvious without effort (Krug).

## 5. Appetite

- **Time box:** 8 weeks, **3 Oct – 28 Nov 2026** (decision 0003).
- **Hours:** about 25 h/week: 3 h on each weekday and 5 h on each weekend day.
- **Split:** about **13 h/week of roadmap learning** (Stage 0, then Stage 1 visual fundamentals from 19 Oct) and about **12 h/week of portfolio v1**. The portfolio is where the learning gets practised.
- **Rest:** one full day off per week *(Claude's recommendation; Arno to confirm)*.
- **When time runs out:** scope shrinks, the time box doesn't grow. Whatever passes the quality bar ships, and the rest goes to the backlog.
- **Known factor:** my Figma speed will be slow at the start and will improve as skills build, which is another reason scope, not time, is the variable.

## 6. Scope of v1

### In scope

v1 is **Figma only**. It covers structure and words.

- Information architecture (sitemap) and user flows for the readers' top tasks.
- Greyscale wireframes at 390, 768 and 1440, with behaviour between breakpoints annotated.
- Real, final copy for every v1 page, written to the content-design standard.
- A component skeleton: structural components built with auto layout and variants, without visual styling.
- **Case-study placeholders** showing where and how case studies will sit.
- A front-end handoff spec: annotations, states, headings, focus order and landmarks.
- Decision records for every choice a reviewer might question.

### Non-goals

- No live website, domain or backend (no Firebase or Supabase).
- No case-study content, only placeholders.
- No visual layer: no colour palette, brand identity, imagery or final type choice. That's v2, after Stage 1.
- No motion beyond written intent notes.
- No blog, playground or extra pages.

### Quality bar

Nothing in scope may look generic, rushed or unfinished. In practice, v1 must:

- pass the `figma-craft` handoff checklist (structure, states, accessibility annotations)
- have every word reviewed against the `content-design` standard
- pass the `design-critic` design-review gate
- have every non-obvious choice backed by a decision record

## 7. Positioning & brand

### Working positioning line

Two candidates. Discover tests both:

- **A (preferred): "Product Designer who proves the why."** It's bolder and more memorable, and it makes a promise the site has to keep: every key decision shows its reasoning *and* its evidence.
- **B: "Product Designer driven by why things work."** It's safer, and it describes motivation rather than promising proof.

Supporting line: *"I design in Figma and ship to production with AI-assisted engineering."* (decision 0001)

**What "proves" means here:** every key decision on the site shows its reasoning **and** the evidence behind it. The evidence comes from four kinds of source:

1. established research
2. standards
3. first principles and maths
4. my own small tests

Other sites can be analysed as *examples* of a principle, never as data about their reasons. Every scientific claim must come from the **[evidence ledger](../../research/portfolio/desk/evidence-ledger.md)** and be verified against its primary source before it's published.

Evidence available per design area (examples; the full list is in the ledger):

| Design area | What I can prove, and with what |
|---|---|
| **First impression & hierarchy** | Visual appeal is judged in ~50 ms (Lindgaard 2006), so the hero has to work at a glance. Single-feature pop-out (Treisman & Gelade 1980) and the isolation effect justify one distinctive primary element. Only ~2° of vision is sharp, so the key message goes where the first fixation lands. |
| **Layout & spacing** | Common region and proximity are the strongest grouping cues (Palmer & Rock 1994; Wagemans 2012), so spacing *defines* groups. Appeal peaks at moderate complexity (Reinecke 2013), so restraint. Prototypical layouts are processed more fluently (Tuch 2012), so convention in the structure and surprise in the details. |
| **Typography & reading** | Headings produce efficient layer-cake scanning (NN/g). The measure is 50–75 characters per line (Dyson & Haselgrove 2001). Body size sits well above the critical print size (Legge & Bigelow 2011). The type scale's ratio is shown as maths. |
| **Colour & contrast** | WCAG 2.2 for compliance, APCA as a second check. Luminance, not hue, carries legibility. ~8% of men have red–green CVD (Birch 2012), so colour is never the only signal. Positive polarity reads better (Piepenbrock 2014). 83.9% of top sites fail contrast (WebAIM 2026), so passing it is a differentiator. |
| **Interaction & cognition** | Fitts's law sets target size and placement. Working memory holds ~4 chunks (Cowan 2001), not 7±2. Recognition beats recall. Peak–end shapes the ending. |
| **Motion & timing** | The 0.1 s / 1 s / 10 s response thresholds (Miller 1968; Nielsen). Transitions preserve object constancy (Heer & Robertson 2007). Reduced motion matters, since ~35% of US adults 40+ have vestibular dysfunction (Agrawal 2009). |
| **Why beauty works (the thesis)** | **Processing fluency** (Reber, Schwarz & Winkielman 2004): we find things beautiful when they are easy to process. Nature-derived features are fluency shortcuts: curved contours (Bar & Neta 2006), order balanced with complexity (Van Geert & Wagemans 2020), self-similar scales that mirror the 1/f statistics our visual cortex is tuned to (Olshausen & Field 1996), light from above, and low complexity with high prototypicality, judged within 17 ms (Tuch 2012). The aesthetic–usability effect (Kurosu & Kashimura 1995) and the "design look" driving credibility (Fogg 2003) are why craft matters, and why it must never be used to manipulate. |
| **What I don't claim** | Golden-ratio layouts, Miller's 7±2, the "8-second attention span", a universal F-pattern, colour psychology, "savanna genes", the "60% stress reduction" from fractals. Knowing the myths is proof of rigour. |

### Brand attributes

The site must **demonstrate** each attribute, never just claim it.

1. **Knows the why.** I care why things are beautiful and why they work: the maths, perception and neuroscience behind them, not just whether something "looks good". *Proof:* decisions are explained with their reasoning and sources, and the maths is visible where it matters (for example, why a type size is the size it is).
2. **Obsessed with detail.** *Proof:* craft that rewards inspection, such as typographic details, optical alignment, every state designed, and accessibility built in.
3. **Fresh energy that tests the limits.** *Proof:* at least one moment that makes an expert ask "how did he do that?", without breaking usability or accessibility.

Supporting asset (never the lead): **financial understanding**, which is relevant to fintech readers.

## 8. Constraints

- **Role:** Product Designer, with the AI-assisted design-to-code bridge as the differentiator (decision 0001).
- **Background:** BCom Financial Sciences (University of Pretoria) and a finance career. They support the story and don't lead it. Payroll appears only as transferable skills, never as identity (decision 0002).
- **Location:** roles within ±2–3 h of South Africa. Hybrid preferred, relocation open.
- **Licensing:** licensed fonts and images only (paid or properly free). Budget is small but available.
- **Tools:** Figma Professional (no branching, no Code Connect), a public GitHub repo, and a front-end stack to be decided before v2.
- **Standards:** WCAG 2.2 AA in Figma and in code. POPIA applies once the site is live (v2).

## 9. Risks & assumptions

| # | Assumption | Risk if wrong | How we'll test it |
|---|---|---|---|
| 1 | SA design leads will take a finance-background career switcher seriously if the craft is strong enough | Months without interviews | Interview 3–5 design leads or senior designers in Discover, including a studio like Isoflow |
| 2 | Reviewers decide in about 2–10 seconds, then inspect details for minutes | The wrong hierarchy, with the important things not seen first | Desk research (NN/g, hiring sources) and 5-second tests |
| 3 | Leading with "the why" (especially "proves the why") reads as rigorous, not over-intellectual or overclaiming | The positioning puts off the people it's meant to attract, or sets a bar the site doesn't meet | Test lines A and B with designers; every claim on the site must show its evidence |
| 4 | About 25 h/week is sustainable on top of a full-time job | Burnout, which undermines everything else | Weekly check-in; cut scope before cutting rest |
| 5 | My interview knowledge will match the portfolio's quality | Strong portfolio, weak interviews | Not a Discover test. Mitigated by doing the work myself, the decision log, and mock interviews before applying |
| 6 | Showing my own ventures (e.g. Axiomatics) reads as initiative, not as a sign I'd leave | Reviewers worry my focus won't be fully on their company | Ask design leads directly in Discover; decide how (and whether) to show ventures in Define |

## 10. Parking lot

- **Case study #0, "How I designed this site":** the v1 → vN evolution, using named Figma versions, decision records and git history. *Keep capturing from day one.*
- **Shipped projects as possible retrospective case studies:** KhayaPay (iOS), Grace & Gather Box (website), Axiomatics Technologies agentic accounting web app (my own company). To evaluate in Define, including the roadmap's KhayaPay payroll-adjacency audit and how to frame my own ventures (risk #6): as *products I designed and shipped*, not as *businesses I'm running*.
- **The signature "how did he do that?" interaction** (v2, visual and motion).
- **Playground** of micro-interaction experiments.
- **Bookshelf and notes:** the neuroscience and perception of beauty, written as short articles.
- **"Myths I don't design by"**: a short page or section built from the ledger's myths list, a strong signal of rigour.

## Sign-off

- [x] All sections complete, with no guidance comments left
- [x] Reviewed and corrected by Arno
- [x] Approved by Arno (gate), 2026-10-03
