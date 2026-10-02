# Product lifecycle

This is how work moves from an idea to something shipped and learned from. It follows the double diamond: diverge then converge on the *problem*, then diverge then converge on the *solution*. Gates sit between phases, and the process loops back whenever evidence demands it. Looping back is normal; skipping a gate is not.

Every piece of work, whether that's a page, a case study, a feature or a fix, runs through these phases at a size that fits it. A one-line copy fix might pass through phases 4 → 7 → 8 in ten minutes. The portfolio's home page runs through all ten.

## Phases

| # | Phase | Lead dept | Inputs | Artefact out | Gate (who signs off) |
|---|---|---|---|---|---|
| 0 | **Brief** | Product strategy | Idea, constraints | One-pager: problem, audience, goal, success metric, appetite, non-goals | **Kickoff**: Arno approves the brief |
| 1 | **Discover** | UX research | Brief | Research plan → notes → insights (with sources & frequency) | **Insight readout**: Arno accepts the top 3 insights |
| 2 | **Define** | Product + Interaction | Insights | Problem statement, job stories, scope (in/out), success criteria, content inventory | **Scope sign-off** |
| 3 | **Explore** | Interaction (+ Motion intent) | Definition | IA/sitemap, user flows, wireframes, 2–3 directions | **Design crit**: `design-critic` agent + Arno pick a direction |
| 4 | **Design** | Visual + Content + Systems | Chosen direction | Hi-fi frames at all breakpoints, real copy, all states, components, motion specs | **Design review**: `design-critic` agent passes it against standards |
| 5 | **Validate** | UX research | Prototype | Usability test (5 users/round), findings, iterations | **Go / no-go** |
| 6 | **Handoff** | Design systems | Validated design | "Ready for dev" section, annotations, tokens exported, decision records written | **Handoff**: checklist in `figma-craft` complete |
| 7 | **Build** | Design engineering | Handoff | Feature branch → PR → Vercel preview | **Design QA + code review**: `qa-auditor` agent passes it, Arno approves the PR |
| 8 | **Release** | Design engineering | Approved PR | Merge to `main`, release notes / changelog entry | **Release checklist** passes |
| 9 | **Measure & learn** | Research + Product | Live product | Metrics vs goal, retro notes, case-study update | **Retro** |

## Rituals (what they look like in a company, and how we do them here)

- **Kickoff.** The team aligns on the brief. Here, Claude opens the phase with a short kickoff and Arno confirms.
- **Design crit** (Explore). This is a *divergent* critique of work in progress. The presenter states the goal and what feedback they want, and feedback ties to the goal, not to taste. Here, the `design-critic` agent reviews and Arno decides.
- **Design review** (Design). This is a *convergent* quality gate against standards: is it ready? Here, the `design-critic` agent runs in review mode.
- **Handoff meeting.** The designer walks the engineer through the "Ready for dev" section, edge cases and motion. Here, Arno (as designer) walks Claude (as engineer) through it, and that walkthrough is the practice.
- **Design QA.** The designer checks the build against Figma before release. Here, the `qa-auditor` agent and Arno do it on the Vercel preview.
- **Retro.** What went well, what didn't, what we change. This feeds the "Reflection" section of a case study.

## Rules

- **No build without a "Ready for dev" design.** Exception: throwaway spikes on a `spike/*` branch, which never merge.
- **No merge without QA.** The `qa-auditor` agent runs on every PR that changes UI.
- **Decisions are logged at the moment they're made** (`docs/decisions/`), not reconstructed later.
- **Scope changes go back to Define.** If a new idea appears mid-build, write it down and park it in the backlog; don't absorb it silently.
- **Timeboxes.** Each phase gets an appetite from the brief. When the time runs out, ship what passes the gate or cut scope; don't extend silently.

## Where artefacts live

| Artefact | Location |
|---|---|
| Brief, scope | `docs/projects/<project>/brief.md` |
| Research plan, insights | `docs/research/<project>/` |
| Decisions | `docs/decisions/NNNN-title.md` |
| Designs | Figma (one file per project, structure per `figma-craft`) |
| Code | `main` via PRs |
| Changelog | `CHANGELOG.md` |
