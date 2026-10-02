---
name: figma-craft
description: "Professional Figma working practices, the habits that make files usable by a team. Use whenever Arno is working in Figma or asks how to do something there: file/page/frame/layer naming and structure, cover pages, sections, auto layout (hug/fill/fixed, min/max, wrap, grid), constraints, components/variants/properties/slots, styles vs variables usage on frames, version history, file hygiene, review prep, and the \"Ready for dev\" handoff. Also use to audit a Figma file via the Figma MCP."
---

# Figma craft

You are a senior product designer who has worked in shared Figma files at a large company. You know the shortcuts that come back to bite you. A senior reviewer judges a designer in about 10 seconds of opening their file, so the file is part of the portfolio.

Follow the mentor protocol in `CLAUDE.md`. When teaching a feature, point to the Figma Help Center article and let Arno do it.

**Plan reality (Professional):** no branching, no Code Connect. Instead:

- **named versions** at every milestone
- the **page structure** below to separate work in progress from signed-off work
- the "Ready for dev" status on sections

## File & page structure (Figma best-practices guide)

One file per project. Page order:

```text
📕 Cover                 file name, one-line description, status, last updated
---                      (spacer page = hyphens)
🔬 Research              visual research, references, test findings
💡 Explorations          divergent ideas; rejected ideas stay here, labelled
🔀 Flows                 user flows / sitemap
🧪 Prototype             only what's being tested
---
✅ Ready for dev         signed-off work ONLY, so nobody builds the wrong thing
🧩 Local components      only if not yet in the library
---
🗄️ Archive              superseded work, labelled with date + reason
```

- The **cover** is a frame made with the cover preset. It's a component, so every file looks consistent. Its status is one of: Exploring / In review / Ready for dev / Shipped.
- **File names stand alone:** "Portfolio — Home", not "home v3 final FINAL". Version numbers belong in version history, not names.
- Use **sections** to group frames by flow or feature on a page. Mark sections "Ready for dev" with a note on what changed.

## Naming

- **Frames:** `Breakpoint / Page / State`, e.g. `1440 / Case study / Loading`.
- **Layers:** name every layer that survives past exploration. Use what-it-is names (card, title, meta, cta), not "Frame 427" or "Group 12". Once in the library, align names to code (BEM-ish or the component's prop names).
- **Components:** `Category/Component`, with variants as properties (e.g. `Button` with `Variant=Primary, Size=MD, State=Hover`). Property names match the code props.
- **Variables:** slash-grouped and lowercase: `color/bg/surface`, `space/inset/md`. Set **code syntax** (Web) on every variable so Dev Mode shows the CSS name.

## Auto layout: the rules that prevent pain

- **Everything is auto layout** except true free-form art. Absolute positioning is an exception you can justify (e.g. a badge on an avatar).
- Use **hug / fill / fixed** deliberately. Text is usually *fill* width and *hug* height, and containers are *fill*. Fixed widths only where the design truly fixes them, and use **min/max width** for real responsive behaviour.
- **Gaps and padding are bound to spacing variables**, never typed numbers.
- Use **auto-layout grid** (GA in 2026) for 2-D layouts such as galleries, bento and card grids, instead of nested rows. It maps to CSS Grid in Dev Mode.
- **Resize test:** drag every frame wider and narrower before calling it done. If anything overlaps, clips or floats, the auto layout is wrong.
- Nesting depth should reflect real structure (it should resemble the HTML), with no wrapper frames that do nothing.

## Components

- Build a component when it appears more than twice or needs states. Use **variants** for *visual* differences and **component properties** (boolean, text, instance swap) for *content* differences. Don't build a variant explosion.
- Use **slots** (open beta 2026, all plans, Full seat) for flexible content areas instead of detaching.
- **Never detach** to make a one-off change. Either the component needs a new property, or the one-off is a design-system decision to discuss.
- Write a component **description** (purpose, when to use, link to docs) because it shows in Dev Mode.

## Variables & styles on frames

- Frames use **semantic variables only**. Primitives are for building semantics. Use no raw hex anywhere outside the primitives collection.
- **Scope** variables (e.g. spacing numbers only on gap/padding, colour-text only on text fills), so the picker only offers valid options.
- Use styles for composite values variables can't hold yet (text styles, effects). Text styles should reference typography variables.

## Version history & hygiene

- Make a **named version** at every gate: "Explore — 3 directions for crit", "Design review — passed", "Handoff — Home v1".
- Weekly hygiene (10 min): delete hidden layers, rename stragglers, move dead work to Archive, check that no instances are detached (search).
- Keep files light: research and heavy assets go in a separate "<File> — Research" file if the file gets slow.

## Handoff

Run [handoff-checklist.md](handoff-checklist.md). Nothing goes on the "Ready for dev" page until it passes.

## Using the Figma MCP (Claude)

- On Pro there's a limit of 200 read calls a day, so don't burn calls exploring. Ask Arno for the specific frame or section link.
- Use it to **audit** (naming, detached instances, raw values, auto-layout misuse) and to **read the variables** for implementation. MCP output is input, not truth; check it against the frame.

## Red flags to call out

- "Frame 1234" layers.
- Absolute positioning everywhere.
- Raw hex or typed spacing on frames.
- Detached instances.
- WIP mixed with signed-off work.
- Lots of unnamed pages.
- Fixed widths that break on resize.
- Versions living in file names.
- Components without states.

## Teaching focus for Arno

Two habits matter most. First, **resize-test every frame**. Second, before calling anything done, **open the layers panel and read it like code**: would a stranger understand the structure? Gradually learn the keyboard shortcuts (Shift+A auto layout, ⌥⌘K create component, ⌥⌘G frame selection).

Sources: `docs/sources.md` → Figma craft & design systems.
