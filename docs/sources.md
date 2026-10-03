# Source register

These are the approved sources behind every rule in this repo. When a skill states a rule, it should trace back to one of these sources or to a decision record. Anything else counts as *judgement* and must be labelled that way.

## Source tiers (strongest first)

1. **Our own evidence:** research with our users, test results, and analytics from this product.
2. **Standards, specifications & replicated peer-reviewed research:** W3C (WCAG, ARIA APG, DTCG), the POPIA statute, Information Regulator guidance, and replicated studies in perception and cognitive science (tracked in `docs/research/portfolio/desk/evidence-ledger.md`, graded A/B/C).
3. **Platform owners:** Apple HIG, Material Design 3, Figma Help Center, MDN, framework docs.
4. **Large-sample research bodies:** Nielsen Norman Group, Baymard Institute.
5. **Recognised practitioners & books:** Refactoring UI, Butterick, Krug, Portigal, Hall, Torres, Emil Kowalski, Josh Comeau.
6. **Blogs, Medium, tool vendors' marketing, AI output.** These can supply hypotheses only and never count as evidence.

When sources conflict, the higher tier wins. Within a tier, the more recent source wins.

Last verified: **2 Oct 2026**. Re-verify tool and plan facts every quarter, because they change.

---

## Figma craft & design systems

- Figma: Team, folder, and file organization: <https://www.figma.com/best-practices/team-file-organization/>
- Figma: Optimize design files for developer handoff: <https://help.figma.com/hc/en-us/articles/360040521453>
- Figma: Dev Mode statuses ("Ready for dev"): <https://help.figma.com/hc/en-us/articles/26781702258583>
- Figma: Variables and collections (scoping, code syntax): <https://help.figma.com/hc/en-us/articles/15145852043927>
- Figma: Slots (open beta, Mar 2026, Full seat): <https://help.figma.com/hc/en-us/articles/38231200344599>
- Figma: Plans and features: <https://help.figma.com/hc/en-us/articles/360040328273>
- Figma MCP rate limits: <https://developers.figma.com/docs/figma-mcp-server/rate-limits-access/>
- Figma Motion (Config 2026): <https://help.figma.com/hc/en-us/articles/41274629073303>
- W3C Design Tokens spec 2025.10 (first stable): <https://www.w3.org/community/design-tokens/2025/10/28/design-tokens-specification-reaches-first-stable-version/>
- Style Dictionary DTCG support: <https://styledictionary.com/info/dtcg/>
- Token naming (Nathan Curtis model, summarised): <https://smart-interface-design-patterns.com/articles/naming-design-tokens/>

## Visual design & accessibility

- WCAG 2.2: what's new: <https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/>
- WCAG 2.2 quick reference: <https://www.w3.org/WAI/WCAG22/quickref/>
- WCAG 3 status (Working Draft, not yet a standard; APCA not adopted): <https://yatil.net/blog/wcag-3-is-not-ready-yet>
- WebAIM contrast checker: <https://webaim.org/resources/contrastchecker/>
- Butterick's Practical Typography, key rules: <https://practicaltypography.com/summary-of-key-rules.html>
- Radix Colors scale semantics: <https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale>
- Fluid type and accessibility (Smashing): <https://www.smashingmagazine.com/2023/11/addressing-accessibility-concerns-fluid-type/>
- Utopia fluid type calculator: <https://utopia.fyi/>
- Apple HIG: <https://developer.apple.com/design/human-interface-guidelines/>
- Material Design 3: <https://m3.material.io/>
- Book: *Refactoring UI* (Wathan & Schoger)

## Motion

- Emil Kowalski: animation standards: <https://github.com/emilkowalski/skills/blob/main/skills/review-animations/STANDARDS.md>
- Emil Kowalski: Great animations: <https://emilkowal.ski/ui/great-animations>
- Apple HIG: Motion: <https://developer.apple.com/design/human-interface-guidelines/motion>
- Material 3 motion (incl. Expressive springs): <https://m3.material.io/styles/motion/overview/how-it-works>
- Motion for React: <https://motion.dev/>
- MDN `prefers-reduced-motion`: <https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion>

## Interaction design

- NN/g: Error message guidelines: <https://www.nngroup.com/articles/error-message-guidelines/>
- NN/g: Tree testing: <https://www.nngroup.com/articles/tree-testing/>
- NN/g: Card sorting: <https://www.nngroup.com/articles/card-sorting-definition/>
- Scott Hurff: The UI Stack (5 states): <https://www.scotthurff.com/posts/why-your-user-interface-is-awkward-youre-ignoring-the-ui-stack/>
- Laws of UX: <https://lawsofux.com/>
- W3C ARIA Authoring Practices Guide: <https://www.w3.org/WAI/ARIA/apg/>

## UX research

- NN/g: Which UX research methods: <https://www.nngroup.com/articles/which-ux-research-methods/>
- NN/g: Why you only need to test with 5 users: <https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/>
- NN/g: Synthetic users: <https://www.nngroup.com/articles/synthetic-users/>
- ASSAf POPIA framework for research: <https://www.assaf.org.za/popia/>
- Books: *Just Enough Research* (Hall), *The Mom Test* (Fitzpatrick), *Interviewing Users* (Portigal), *Continuous Discovery Habits* (Torres)

## Content design

- NN/g: How people read online: <https://www.nngroup.com/articles/how-people-read-online/>
- NN/g: Layer-cake scanning: <https://www.nngroup.com/articles/layer-cake-pattern-scanning/>
- NN/g: First 2 words: <https://www.nngroup.com/articles/first-2-words-a-signal-for-scanning/>
- NN/g: 3 I's of microcopy: <https://www.nngroup.com/articles/3-is-of-microcopy/>
- GOV.UK writing guidelines: <https://guidance.publishing.service.gov.uk/writing-to-gov-uk-standards/writing-guidelines/>
- Books: *Strategic Writing for UX* (Podmajersky), *Content Design* (Sarah Richards)

## Portfolio & hiring

- Tom Scott: Design hiring FAQ 2026: <https://verifiedinsider.substack.com/p/faq-design-hiring-in-2026>

## Product strategy

- Shape Up (Basecamp): <https://basecamp.com/shapeup>
- Google HEART framework (Rodden, Hutchinson, Fu, 2010)
- Teresa Torres: Opportunity Solution Trees: <https://www.producttalk.org/opportunity-solution-tree/>

## Design engineering

- Next.js docs: <https://nextjs.org/docs>
- Tailwind CSS v4 docs: <https://tailwindcss.com/docs>
- Conventional Commits 1.0.0: <https://www.conventionalcommits.org/en/v1.0.0/>
- Semantic Versioning: <https://semver.org/>
- Core Web Vitals: <https://web.dev/articles/vitals>
- GitHub rulesets (public repos on Free): <https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets>
- POPIA website compliance overview: <https://www.popiaready.co.za/popia-compliance-guide>
- MDN Web Docs: <https://developer.mozilla.org/>
