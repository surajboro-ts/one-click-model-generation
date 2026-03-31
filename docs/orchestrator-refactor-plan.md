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

## Changes (9 total)

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
- `component-summary.md` — `alwaysApply: true` (new, ~1KB — all 77 component names + icons)

**Context savings for Cursor:**
- Tier 0 (minor edit): ~50KB saved (only orchestrator + checklist + summary load = ~3.3K tokens)
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

### Change 8: Split `liveboard-ia.md` for tiered loading

**Problem:** `liveboard-ia.md` (15.4KB / ~3.8K tokens) loads via glob for every file inside a Liveboard prototype — even a one-line color fix in a chart component. Most of the content isn't needed for minor edits.

**Split into three pieces:**

| New file | Content | Size (est.) | When loaded |
|----------|---------|-------------|-------------|
| `liveboard-ia.md` (slimmed) | Component map — what exists, when to use what | ~5KB | Tier 1+ Liveboard work |
| `liveboard-scaffolding.md` (new) | Full IA tree, mode templates (View/Edit/Both), build-from-scratch guidance | ~7KB | Tier 2 Liveboard builds only |
| Move to `TODO.md` | Planning notes ("not yet built", lines 249-267) | ~3KB | Never loaded as a rule |

**Orchestrator routing after split:**

| Liveboard task | Files loaded | Tokens |
|---------------|-------------|--------|
| Fix a color in Liveboard chart | None (Tier 0) | 0 |
| Add a filter to existing Liveboard | `liveboard-ia.md` only (Tier 1) | ~1.2K |
| Build new Liveboard from scratch | `liveboard-ia.md` + `liveboard-scaffolding.md` (Tier 2) | ~3K |
| **Today (any Liveboard file edit)** | **Full 15.4KB always** | **~3.8K** |

**Glob changes:**
- `liveboard-ia.md`: Remove glob entirely — orchestrator handles routing
- `liveboard-scaffolding.md`: No glob — on-demand only via orchestrator

**This pattern can apply to other large files later** if context consumption becomes an issue — split "reference" (what exists) from "scaffolding" (how to build from scratch).

---

### Change 9: Split `component-inventory.md` into summary + full inventory

**Problem:** `component-inventory.md` (18KB / ~4,508 tokens) is the largest auto-loaded file. It loads for every prototype file edit even when the designer just needs to know what components exist, not their full props and code examples.

**Split into:**

| File | Content | Size (est.) | When loaded |
|------|---------|-------------|-------------|
| `component-summary.md` (new) | All 77 component names by category + decision tree + 46 icon names. No props, no code examples. | ~1KB (~250 tokens) | Always — either `alwaysApply: true` or embedded in CLAUDE.md |
| `component-inventory.md` (slimmed) | Full props tables, code examples, combination patterns, promotion criteria | ~14KB (~3,500 tokens) | Tier 1 (component lookup concern) or Tier 2 (mandatory) |

**What goes in the summary:**

```markdown
# Radiant Component Summary (77 components)

## Quick lookup
- Text entry → TextInput / TextArea / SearchInput
- Selection → Select / Checkbox / Radio / Toggle / SegmentedControl
- Actions → Button / Link
- Date → DatePicker
- Feedback → Alert / Toast / Tooltip / LoadingIndicator / ProgressBar
- Navigation → Tabs / Sidebar / Stepper / Pagination / Menu
- Data → Table / Card / Chip / Avatar / Tree / TreeTable
- Layout → Horizontal / Vertical / View / Grid / RdGrid / SplitPane
- Overlays → Modal / ConfirmDialog / WizardModal / FormModal / FilterDialog / Popover
- Empty states → NoData / Illustration
- Advanced → ActionMenu / NestedCheckbox / FacetSortBar / RichTextEditor
  / ColorPicker / InputMentions / ManageTags / Slider / ManagedList / Tour
  / DragDrop / FormBuilder / DynamicForm / Legend / Trending / SearchBar
  / OverlayLoading / ExplainerCard / Image / SafeHTML / FormControl
  / VerticalStepper / Formatters / DirectionControl / NumericFilterInput

## Icons (46)
arrow-up/down/left/right, chevron-up/down/left/right, plus, minus,
cross, checkmark, checkmark-circle, cross-circle, exclamation-point-circle,
info-circle, question-mark, copy, download, upload, save, refresh, pencil,
trash-can, share, pin, filter, play, pause, eye, eye-undo, clock, cog,
folder, funnel, lock, magnifying-glass, profile, sort, star, tag, expand,
fullscreen, hamburger, more, information

For full props, code examples, and patterns → read component-inventory.md
```

**Token comparison:**

| Tier | Today | After split | Savings |
|------|-------|-------------|---------|
| 0 (always loaded) | ~4,508 | ~250 (summary only) | **~4,258 tokens** |
| 1 (component concern) | ~4,508 | ~250 + ~3,500 = ~3,750 | Similar |
| 2 (mandatory) | ~4,508 | ~250 + ~3,500 = ~3,750 | Similar |

**Key benefit:** At Tier 0, the AI still knows all 77 component names and can identify "use NestedCheckbox for this" without carrying 18KB of props/examples. Addresses the accuracy risk of not loading the inventory at all.

**Glob changes:**
- `component-summary.md`: `alwaysApply: true` (tiny, always useful)
- `component-inventory.md`: Narrowed to `["src/prototypes/**/index.tsx"]` (per Change 2)

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
Change 4 (Fix outdated values)    → Do first — fixes errors in existing content
Change 3 (Fix duplication)        → Remove duplicate content
Change 8 (Split liveboard-ia)     → Restructure before orchestrator references it
Change 9 (Split component-inv)    → Summary + full inventory before orchestrator references it
Change 1 (Rewrite orchestrator)   → Core change — tier system (references split files)
Change 2 (Slim auto-loading)      → Narrower globs + new alwaysApply for summary
Change 5 (Update CLAUDE.md)       → Depends on Change 1
Change 6 (Create /explore)        → Independent
Change 7 (Test matrix)            → Validate everything
```

Fix content issues (Changes 3-4), split large files (Changes 8-9), then restructure (Changes 1-2), so the orchestrator references correct and optimized content.

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
| 8 (Split liveboard-ia) | Low — creates new file, slims existing | Orchestrator routes to both; old file name preserved |
| 9 (Split component-inv) | Low — summary is additive, inventory slimmed | Summary always loaded (~250 tokens); old file name preserved |

---

## Fork impact

| Change | Affects forks? |
|--------|---------------|
| 1-4 (rule content changes) | Yes — forks get updated rules on next sync. Rules become more accurate and less noisy. |
| 5 (CLAUDE.md) | Yes — forks get updated project guide. |
| 6 (/explore skill) | Yes — forks get new capability. |
| 7 (test matrix) | No — documentation only. |
| 8 (split liveboard-ia) | Yes — forks get slimmer liveboard-ia + new scaffolding file. |
| 9 (split component-inv) | Yes — forks get new component-summary.md + slimmer inventory. |

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
| `liveboard-ia.md` | 6/10 | 15.4KB loads for every Liveboard file edit; mixes planning notes with rules → split in Change 8 |
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
