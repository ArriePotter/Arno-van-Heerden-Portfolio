# Git workflow (GitHub Flow + Conventional Commits)

This is the same workflow most product teams use. The repo is **public**, because GitHub Free only enforces branch protection and rulesets on public repos.

## Branches
- `main` is always deployable and **protected**: no direct pushes, PR required, status checks must pass, linear history (squash merge).
- Work branches are short-lived and named `type/short-description`:
  - `feat/home-hero`, `fix/nav-focus-ring`, `docs/decision-type-scale`, `chore/deps-update`, `spike/view-transitions` (spikes never merge).
- One branch = one reviewable change. If a PR touches more than ~400 lines or two unrelated areas, split it.

## Commits (Conventional Commits 1.0.0)
```
<type>(<scope>): <imperative summary, ≤ 72 chars>

<optional body: why, not what>

<optional footer: BREAKING CHANGE: …, Refs #12>
```
| Type | Use for | SemVer |
|---|---|---|
| `feat` | new user-facing capability | minor |
| `fix` | bug fix | patch |
| `docs` | docs/decision records only | — |
| `style` | formatting only (not CSS design changes; those are `feat`/`fix`) | — |
| `refactor` | code change without behaviour change | — |
| `perf` | performance | patch |
| `test` | tests | — |
| `build` / `ci` | build system, CI config | — |
| `chore` | maintenance, deps | — |

Breaking changes use `feat!:` or a `BREAKING CHANGE:` footer, which means a major bump. Scopes match the area: `home`, `case-study`, `tokens`, `nav`, `a11y`.

## The loop
```
git switch main && git pull                    # start fresh
git switch -c feat/home-hero                   # branch
# ...work, commit small and often...
git push -u origin feat/home-hero              # push → Vercel preview URL
gh pr create                                   # PR with template
# qa-auditor review → fix → Arno reviews preview → squash merge
git switch main && git pull && git branch -d feat/home-hero
```

## Pull request template
Every PR description includes:
- **What & why:** link the decision record or brief.
- **Figma:** a link to the "Ready for dev" section.
- **Screenshots:** before/after at 390 and 1440, light and dark.
- **Checklist:** release checklist items that apply.
- **AI notes:** what was generated, what was corrected.

## Rules
- Never commit secrets, `.env*` (except `.env.example`), recordings or personal data.
- Never force-push to `main`. Rewriting history on your own branch before review is fine.
- Tag releases `vMAJOR.MINOR.PATCH` and update `CHANGELOG.md` (Keep a Changelog format).
