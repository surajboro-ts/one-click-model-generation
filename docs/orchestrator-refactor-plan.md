# Orchestrator Refactor Plan (Revised)

> Created: 2026-03-27
> Revised: 2026-03-31 (post-audit, Cursor+Claude Code compatibility)
> Overall rule health: 7.1/10 — functionally complete but duplication, outdated values, missing examples

## Problems

1. **Over-loading** — 6 files (~76KB / ~19K tokens) auto-load for every prototype file edit, including trivial tweaks
2. **Keyword-only classification** — "make the grid responsive" doesn't trigger layout rules
3. **No exploratory mode** — designers can't work outside Radiant constraints
4. **Figma routing gap** — Figma input always triggers full build stack
5. **Duplication** — 4 verbatim duplications across files, 2 cross-file conflicts
6. **Outdated values** — wrong token names in modal-patterns, incomplete spacing scale, missing AppShell example
7. **Cursor-specific language** — instructions assume Cursor context

## Constraints

- **Both Cursor and Claude Code must work** — designers use both tools
- **Files stay in `.cursor/rules/`** — moving creates migration risk
- **No breaking changes for forks** — rule file content can change, but don't rename or remove files
- **Plan before implement** — all changes reviewed before touching files

---

## Changes (7 total)

### Change 1: Rewrite `_orchestration.md` with tier system

**File:** `.cursor/rules/_orchestration.md`

Replace keyword-matching with intent-based classification. Written in tool-neutral language.

**Step 0 — Exploratory check:** If `/explore` was invoked or file has `@explore` marker, suspend Radiant constraints.

**Tier 0 — Minor tweak:** No rule files needed. CLAUDE.md sufficient. (~0KB)

**Tier 1 — Moderate change:** Load 1-3 files by semantic concern:

| Concern | Rule file | Semantic triggers |
|---------|-----------|-------------------|
| Page structure | `layout-patterns.md` | Layout, sidebar, header, grid, responsive, dashboard |
| Interactive widgets | `widget-patterns.md` | Tables, alerts, toasts, menus, tooltips, empty states, filters |
| Modals & dialogs | `modal-patterns.md` | Any overlay — confirmation, wizard, form modal |
| State handling | `interaction-patterns.md` | Loading, skeletons, error states, disabled, transitions |
| Component lookup | `component-inventory.md` | Unsure which component, checking existence |
| Token deep-dive | `token-usage.md` | Full color scale, component tokens, CSS variables |
| UX copy | `content-guidelines.md` | Writing buttons, titles, labels, errors |
| ThoughtSpot terms | `product-knowledge.md` | Answer, Liveboard, SpotIQ, Worksheet, Monitor |
| Figma URL | `figma-mcp-workflow.md` + `figma-component-mapping.md` | figma.com URL provided |
| Figma screenshot | `figma-component-mapping.md` | Pasted screenshot or layer references |

**Tier 2 — Full build:** 3 mandatory + concern-matched. (~60-100KB)

**Tier 3 — Design system:** 4 fixed files for `src/components/` work. (~50KB)

**Figma cross-tier pipeline:** Classify by scope not input type.

**Remove:** The "How Rules Load" section that duplicates frontmatter info. Remove the rule-loading table that's duplicated in CLAUDE.md.

---

### Change 2: Slim auto-loading (safer approach)

Instead of removing globs entirely (which would break Cursor), **narrow them** so they only trigger for Tier 2 work:

| File | Current globs | New globs | Rationale |
|------|--------------|-----------|-----------|
| `component-inventory.md` | `["src/prototypes/**", "src/components/**"]` | `["src/prototypes/**/index.tsx"]` | Only loads when creating/editing main entry files, not every nested file |
| `token-usage.md` | `["src/prototypes/**", "src/components/**/*.css"]` | `["src/components/**/*.css"]` | Only loads for CSS module work (component styling), not prototype edits |
| `content-guidelines.md` | `["src/prototypes/**", "src/components/**"]` | Remove globs entirely | UX copy is situational — orchestrator handles routing. Least impact. |
| `prototype-generation.md` | `["src/prototypes/**"]` | `["src/prototypes/**/index.tsx"]` | Only loads for entry files, not every sub-component edit |

**Stays auto-loaded:**
- `_orchestration.md` — `alwaysApply: true`
- `compliance-checklist.md` — `alwaysApply: true` (scoped to prototype + component files)

**Context savings for Cursor:**
- Tier 0 (minor edit): ~50KB saved (only orchestrator + checklist load)
- Tier 1 (moderate): ~30-40KB saved (1-3 targeted files instead of 6)
- Tier 2 (full build on entry file): same as before (globs still trigger)

**Claude Code:** Unaffected — it reads on demand regardless of globs.

---

### Change 3: Fix cross-file duplication (4 instances)

| Duplication | Keep in | Remove from | Action |
|-------------|---------|-------------|--------|
| "ALWAYS use Horizontal/Vertical/View" rule | `component-inventory.md` line 14 | `layout-patterns.md` line 14 | Replace with: "See component-inventory.md §Layout Primitives" |
| MCP Output → Radiant adaptation table | `figma-mcp-workflow.md` lines 73-94 | `prototype-generation.md` lines 119-131 | Replace with: "See figma-mcp-workflow.md §Adapting MCP Output" |
| Rule-loading index table | `_orchestration.md` (tier system) | `CLAUDE.md` lines 136-155 | Replace with compact tier summary |
| Component promotion criteria | `component-inventory.md` lines 447-458 | `prototype-structure.md` lines 396-408 | Replace with: "See component-inventory.md §Promotion Criteria" |

**Net savings:** ~3KB of duplicated content removed. More importantly, eliminates conflicting versions.

---

### Change 4: Fix outdated values and missing content

| File | Issue | Fix |
|------|-------|-----|
| `modal-patterns.md` lines 145-149 | Wrong token names (`backgroundColors.primary`) | Replace with `systemColors.light['background-base']` |
| `token-usage.md` lines 100-113 | Spacing scale shows A-J, header says A-N | Complete the table to show K (56), L (64), M (80), N (96) |
| `layout-patterns.md` line 89 | "Use AppShell" but NO code example | Add working AppShell code snippet |
| `layout-patterns.md` lines 77, 137, 747-754 | Header 56px, sidebar 240px, content 1200px | Update to 60px, 260px, 1280px (per Figma + code reality) |
| `component-inventory.md` line 317 | Example uses `display: 'flex'` inline | Replace with `<Horizontal>` to match own rule |
| `prototype-structure.md` lines 232-256 | SVG thumbnail uses hardcoded hex | Replace with token references |
| `compliance-checklist.md` | Missing layout primitives check | Add: "No inline `display: flex/grid` — use Horizontal/Vertical/Grid" |
| `liveboard-ia.md` lines 249-267 | Planning notes mixed with rules | Move to TODO.md or add clear "Planned" label |

---

### Change 5: Update CLAUDE.md

Replace the 13-row duplicate rule table with compact tier summary:

```markdown
## Rules Reference

The `.cursor/rules/` directory contains 16 rule files (~177KB).
The orchestrator (`_orchestration.md`) classifies tasks by intent:

| Tier | Intent | Rules loaded | Context cost |
|------|--------|-------------|-------------|
| Exploratory | Freeform UI, outside Radiant | None — constraints relaxed | ~0KB |
| 0 — Minor tweak | Fix a value, swap a prop | None — CLAUDE.md sufficient | ~0KB |
| 1 — Moderate | Add section, modal, table | 1-3 targeted by concern | ~15-45KB |
| 2 — Full build | New prototype or Figma page | 3-5 mandatory + concerns | ~60-100KB |
| 3 — Design system | Create/modify shared component | 4 fixed files | ~50KB |
```

Also update layout constants: `HEADER_HEIGHT = 60`, `SIDEBAR_WIDTH = 260`, `CONTENT_MAX_WIDTH = 1280`.

Add `/explore` to the skills table.

---

### Change 6: Create `/explore` skill

**File:** `.claude/commands/explore.md`

A context modifier that relaxes Radiant constraints. When invoked:

1. Reads the argument to understand scope
2. Adds `// @explore: <description>` marker to the relevant file
3. Instructs the orchestrator to suspend Radiant constraints for that scope

**What's suspended:** Radiant components, tokens, compliance checklist, content guidelines.
**What stays:** TypeScript, accessibility basics, build must pass.

**Works mid-conversation.** Can relax rules for part of a prototype while the rest stays Radiant.

---

### Change 7: Test matrix

**File:** `docs/orchestration-test-matrix.md`

Validate all tiers + exploratory mode against 15+ scenarios. Include:
- Tier 0: fix color, swap icon, build error, Figma color lookup, wrap with Tooltip
- Tier 1: add delete confirm, loading state, rewrite labels, add Figma section, make grid responsive
- Tier 2: build settings page, implement Figma, Liveboard, rebuild from screenshot
- Tier 3: new component, modify accessibility
- Exploratory: new visual direction, third-party library, partial exploration
- Edge cases: ambiguous tier, Figma URL at Tier 0, multi-concern, tier escalation

---

## Execution order

```
Change 4 (Fix outdated values)   → Do first — fixes errors in existing content
Change 3 (Fix duplication)       → Remove duplicate content
Change 1 (Rewrite orchestrator)  → Core change — tier system
Change 2 (Slim auto-loading)     → Narrower globs
Change 5 (Update CLAUDE.md)      → Depends on Change 1
Change 6 (Create /explore)       → Independent
Change 7 (Test matrix)           → Validate everything
```

Fix content issues (Changes 3-4) before restructuring (Changes 1-2), so the orchestrator references correct content.

---

## Risk assessment

| Change | Risk | Mitigation |
|--------|------|-----------|
| 1 (Orchestrator rewrite) | Medium — AI tools may not follow tier logic perfectly | Write instructions clearly, test with both Cursor and Claude Code |
| 2 (Narrow globs) | Low — Cursor still auto-loads for entry files | Orchestrator (always loaded) guides Cursor to read additional files |
| 3 (Remove duplication) | Low — cross-references replace duplicate content | Each removed section gets a "See X" pointer |
| 4 (Fix outdated values) | Zero — fixing wrong information | Straightforward corrections |
| 5 (Update CLAUDE.md) | Low — less content, not different content | Tier table is a summary, not a replacement |
| 6 (/explore skill) | Low — adds capability, doesn't change existing behavior | Trust-based, visible via markers |
| 7 (Test matrix) | Zero — documentation only | |

---

## Fork impact

| Change | Affects forks? |
|--------|---------------|
| 1-4 (rule content changes) | Yes — forks get updated rules on next sync. Rules become more accurate and less noisy. |
| 5 (CLAUDE.md) | Yes — forks get updated project guide. |
| 6 (/explore skill) | Yes — forks get new capability. |
| 7 (test matrix) | No — documentation only. |

**No breaking changes.** Rule files keep the same names and locations. Globs narrow but don't disappear. Content becomes more accurate.

---

## Audit findings summary (informational)

### Duplication matrix (to be resolved in Change 3)

| Content | File 1 | File 2 |
|---------|--------|--------|
| Horizontal/Vertical/View rule | component-inventory.md:14 | layout-patterns.md:14 |
| MCP output adaptation | figma-mcp-workflow.md:73 | prototype-generation.md:119 |
| Rule-loading index | _orchestration.md | CLAUDE.md:136 |
| Component promotion criteria | component-inventory.md:447 | prototype-structure.md:396 |

### File health scores

| File | Score | Key issue |
|------|-------|-----------|
| `_orchestration.md` | 8/10 | Duplication |
| `compliance-checklist.md` | 6/10 | Missing layout primitive + AppShell checks |
| `component-inventory.md` | 7/10 | Example violates own rules |
| `content-guidelines.md` | 8/10 | 3-level doc nesting |
| `design-system.md` | 7/10 | Lacks concrete examples |
| `figma-component-mapping.md` | 8/10 | Auto-layout section duplicated |
| `figma-mcp-workflow.md` | 7/10 | MCP adaptation duplicated |
| `interaction-patterns.md` | 8/10 | Minor vagueness |
| `layout-patterns.md` | 6/10 | Missing AppShell example, outdated constants |
| `liveboard-ia.md` | 6/10 | Mixes planning notes with rules |
| `modal-patterns.md` | 6/10 | Wrong token names |
| `product-knowledge.md` | 7/10 | Marked as template |
| `prototype-generation.md` | 7/10 | Duplicate content |
| `prototype-structure.md` | 6/10 | SVG template violates token rules |
| `token-usage.md` | 7/10 | Incomplete spacing scale |
| `widget-patterns.md` | 8/10 | Minor API verification needed |
| `CLAUDE.md` | 7/10 | Duplicates orchestration table |

### What's NOT in scope (deferred)

- Moving files out of `.cursor/rules/`
- Merging small rule files
- Exploration → Radiant adoption path
- Full Cursor-specific language cleanup (low priority, most content is already tool-neutral)
