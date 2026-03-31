# Orchestration Test Matrix

> Tests the tier-based classification system against real scenarios.
> Validates correct routing, token consumption, and edge case handling.
> Reference file sizes used for token estimates (~4 bytes per token).

## File sizes (for token calculations)

### Always loaded (both tools)
| File | Bytes | Est. tokens |
|------|-------|-------------|
| `_orchestration.md` | 6,739 | ~1,685 |
| `compliance-checklist.md` | 1,615 | ~404 |
| `component-summary.md` (new, Change 9) | ~1,000 | ~250 |
| **Always-loaded total** | **~9,354** | **~2,339** |

### Auto-loaded today (Cursor, via globs)
| File | Bytes | Est. tokens |
|------|-------|-------------|
| `prototype-generation.md` | 13,233 | ~3,308 |
| `component-inventory.md` | 18,032 | ~4,508 |
| `token-usage.md` | 9,869 | ~2,467 |
| `content-guidelines.md` | 8,698 | ~2,175 |
| **Auto-loaded total** | **49,832** | **~12,458** |

### Grand total today (Cursor, any prototype file)
| | Bytes | Est. tokens |
|--|-------|-------------|
| Always + auto-loaded | 58,186 | ~14,547 |
| + CLAUDE.md (Claude Code) | 67,653 | ~16,913 |

### On-demand files (loaded by concern)
| File | Bytes | Est. tokens |
|------|-------|-------------|
| `layout-patterns.md` | 24,617 | ~6,154 |
| `widget-patterns.md` | 22,357 | ~5,589 |
| `liveboard-ia.md` | 15,385 | ~3,846 |
| `figma-component-mapping.md` | 13,580 | ~3,395 |
| `prototype-structure.md` | 12,285 | ~3,071 |
| `interaction-patterns.md` | 7,400 | ~1,850 |
| `design-system.md` | 6,725 | ~1,681 |
| `modal-patterns.md` | 6,200 | ~1,550 |
| `figma-mcp-workflow.md` | 5,939 | ~1,485 |
| `product-knowledge.md` | 4,494 | ~1,124 |

### After refactor: Liveboard split
| File | Bytes (est.) | Est. tokens |
|------|-------------|-------------|
| `liveboard-ia.md` (slimmed) | ~5,000 | ~1,250 |
| `liveboard-scaffolding.md` (new) | ~7,000 | ~1,750 |

---

## Test scenarios

### Tier 0 — Minor tweaks

#### T0-1: Fix a button color
**Request:** "Change the primary button in AdminLang to content-brand"
**Classification:** Tier 0 — single value fix, 1 file
**Rules loaded:** None
**CLAUDE.md sufficient?** Yes — `systemColors.light['content-brand']` documented in Critical Conventions

| | Today (Cursor) | After (Cursor) | After (Claude Code) |
|--|---------------|----------------|-------------------|
| Rules tokens | ~14,547 | ~2,089 | ~2,367 (CLAUDE.md) |
| **Savings** | — | **85%** | **86%** |

---

#### T0-2: Swap an icon
**Request:** "Change the settings icon from cog to filter in the Liveboard filter bar"
**Classification:** Tier 0 — swapping a prop, 1 file
**Rules loaded:** None (icon list is in component-inventory but not needed if you know the icon name)
**Liveboard-ia loaded?** Today: YES (15.4KB via glob). After: NO (Tier 0 skips it)

| | Today (Cursor) | After (Cursor) | Savings |
|--|---------------|----------------|---------|
| Rules tokens | ~14,547 + ~3,846 (liveboard) = **~18,393** | ~2,089 | **89%** |

---

#### T0-3: Fix a TypeScript build error
**Request:** "Property 'onSelect' does not exist on type 'MenuProps'"
**Classification:** Tier 0 — build error fix
**Rules loaded:** None

| | Today | After | Savings |
|--|-------|-------|---------|
| Rules tokens | ~14,547 | ~2,339 | **84%** |

---

#### T0-4: Figma color lookup (URL)
**Request:** "What token maps to the color in this Figma frame? figma.com/design/abc..."
**Classification:** Tier 0 + Figma exception
**Rules loaded:** `figma-mcp-workflow.md` (5.9KB) + `figma-component-mapping.md` (13.6KB)

| | Today | After | Savings |
|--|-------|-------|---------|
| Rules tokens | ~14,547 + ~4,880 = **~19,427** | ~2,089 + ~4,880 = **~6,969** | **64%** |

---

#### T0-5: Wrap with Tooltip
**Request:** "Add a tooltip to the export button"
**Classification:** Tier 0 — wrapping with simple component
**Rules loaded:** None

| | Today | After | Savings |
|--|-------|-------|---------|
| Rules tokens | ~14,547 | ~2,339 | **84%** |

---

### Tier 1 — Moderate changes

#### T1-1: Add a delete confirmation dialog
**Request:** "Add a delete confirmation when clicking trash on a group row"
**Classification:** Tier 1 — adding interaction
**Concerns:** Modals (6.2KB) + Widgets (22.4KB)
**Rules loaded:** `modal-patterns.md` + `widget-patterns.md`

| | Today | After | Savings |
|--|-------|-------|---------|
| Rules tokens | ~14,547 + ~7,139 = **~21,686** | ~2,089 + ~7,139 = **~9,228** | **57%** |

---

#### T1-2: Add a loading skeleton
**Request:** "Show skeleton screen while Liveboard charts load"
**Classification:** Tier 1 — state handling
**Concerns:** Interaction patterns (7.4KB)
**Liveboard-ia loaded?** Today: YES (15.4KB). After: YES but slimmed (5KB, component map only)

| | Today | After | Savings |
|--|-------|-------|---------|
| Rules tokens | ~14,547 + ~1,850 + ~3,846 = **~20,243** | ~2,089 + ~1,850 + ~1,250 = **~5,189** | **74%** |

---

#### T1-3: Rewrite button labels
**Request:** "Audit all button labels in ModalPatternsDemo for UX writing violations"
**Classification:** Tier 1 — UX copy
**Concerns:** Content guidelines (8.7KB)

| | Today | After | Savings |
|--|-------|-------|---------|
| Rules tokens | ~14,547 + ~2,175 = **~16,722** | ~2,089 + ~2,175 = **~4,264** | **74%** |

Note: content-guidelines is currently auto-loaded, so today it's already in the 14,547. After refactor, glob removed — loaded only when needed.

---

#### T1-4: Add a Figma section to existing prototype
**Request:** "Here's a Figma URL for a filter panel — add it to AdminLang: figma.com/design/..."
**Classification:** Tier 1 + Figma URL concern
**Concerns:** Figma URL (5.9KB + 13.6KB) + Widgets (22.4KB) + Component lookup (18KB)

| | Today | After | Savings |
|--|-------|-------|---------|
| Rules tokens | ~14,547 + ~10,469 + ~5,589 = **~30,605** | ~2,089 + ~4,880 + ~5,589 + ~4,508 = **~17,066** | **44%** |

---

#### T1-5: Make the grid responsive
**Request:** "The card grid in the dashboard isn't responsive on tablet"
**Classification:** Tier 1 — semantic match on "responsive" = layout concern
**Concerns:** Layout patterns (24.6KB)

| | Today | After | Savings |
|--|-------|-------|---------|
| Rules tokens | ~14,547 + ~6,154 = **~20,701** | ~2,089 + ~6,154 = **~8,243** | **60%** |

---

### Tier 2 — Full prototype builds

#### T2-1: Build a settings page from description
**Request:** "Build a new admin settings page with sidebar nav, form sections, and save confirmation"
**Classification:** Tier 2 — new prototype from scratch
**Mandatory:** prototype-generation (13.2KB) + component-inventory (18KB) + compliance-checklist (already loaded)
**Concerns:** Layout (24.6KB) + Modal (6.2KB) + Content guidelines (8.7KB) + Prototype structure (12.3KB)

| | Today | After | Diff |
|--|-------|-------|------|
| Rules tokens | ~14,547 + ~6,154 + ~1,550 + ~2,175 + ~3,071 = **~27,497** | ~2,089 + ~3,308 + ~4,508 + ~6,154 + ~1,550 + ~2,175 + ~3,071 = **~22,855** | **17% savings** (Tier 2 needs most files) |

---

#### T2-2: Build a full Figma page
**Request:** "Implement this Figma page: figma.com/design/..."
**Classification:** Tier 2 + Figma URL
**Mandatory:** prototype-generation + component-inventory + compliance-checklist
**Concerns:** Figma URL (5.9KB + 13.6KB) + Layout (24.6KB) + Widgets (22.4KB) + Prototype structure (12.3KB)

| | Today | After | Diff |
|--|-------|-------|------|
| Rules tokens | ~14,547 + ~10,469 + ~6,154 + ~5,589 + ~3,071 = **~39,830** | ~2,089 + ~3,308 + ~4,508 + ~4,880 + ~6,154 + ~5,589 + ~3,071 = **~29,599** | **26% savings** |

---

#### T2-3: Build a Liveboard
**Request:** "Create a new Liveboard showing sales pipeline metrics"
**Classification:** Tier 2 + Liveboard
**Mandatory:** prototype-generation + component-inventory + compliance-checklist
**Concerns:** Layout (24.6KB) + Product knowledge (4.5KB)
**Liveboard files:** liveboard-ia (5KB, slimmed) + liveboard-scaffolding (7KB, new)

| | Today | After | Diff |
|--|-------|-------|------|
| Rules tokens | ~14,547 + ~6,154 + ~1,124 + ~3,846 = **~25,671** | ~2,089 + ~3,308 + ~4,508 + ~6,154 + ~1,124 + ~1,250 + ~1,750 = **~20,183** | **21% savings** |

---

### Tier 3 — Design system work

#### T3-1: Create a new shared component
**Request:** "Create a StatusIndicator component in src/components/"
**Classification:** Tier 3
**Fixed set:** design-system (6.7KB) + component-inventory (18KB) + token-usage (9.9KB) + content-guidelines (8.7KB)

| | Today | After | Diff |
|--|-------|-------|------|
| Rules tokens | ~14,547 + ~1,681 + ~2,467 = **~18,695** | ~2,089 + ~1,681 + ~4,508 + ~2,467 + ~2,175 = **~12,920** | **31% savings** |

Note: Today, component-inventory, token-usage, and content-guidelines are already auto-loaded (part of 14,547). Tier 3 only adds design-system. After refactor, auto-loading is narrowed so the orchestrator loads all 4 explicitly.

---

### Exploratory mode

#### E1: Try shadcn components
**Request:** `/explore shadcn form components`
**Classification:** Exploratory — all Radiant constraints suspended
**Rules loaded:** None

| | Today (no explore mode) | After |
|--|------------------------|-------|
| Rules tokens | ~14,547 (all auto-load, fights the designer) | ~2,089 (orchestrator only, constraints off) |
| Designer friction | High — compliance checklist flags everything | **Zero** |

---

#### E2: Custom color palette mid-prototype
**Request:** `/explore custom colors for the sidebar` (while rest of prototype stays Radiant)
**Classification:** Exploratory (partial scope)
**Rules loaded:** None for explored scope. Normal tier for non-explored parts.

| | Today | After |
|--|-------|-------|
| Behavior | AI flags every custom color as violation | AI allows custom colors in sidebar, enforces tokens elsewhere |

---

#### E3: Exploration within Liveboard
**Request:** `/explore try a different chart library for the donut chart`
**Classification:** Exploratory (partial, within Liveboard)
**Rules loaded:** None for explored component. Liveboard-ia for rest if Tier 1+.
**Liveboard-ia loaded?** No — the explored component doesn't need Liveboard IA rules.

---

### Edge cases

#### EC-1: Ambiguous — "add a tooltip"
**Request:** "Add a tooltip to the export button in AdminLang"
**Classification:** Tier 0 (wrapping with simple component) — NOT Tier 1
**Rules loaded:** None
**Validated by:** Tier 0 signal: "Wrapping an element with a simple component (Tooltip, Horizontal, etc.)"

---

#### EC-2: Figma URL for one color
**Request:** "What's the background color in this frame? figma.com/design/..."
**Classification:** Tier 0 + Figma exception
**Rules loaded:** `figma-mcp-workflow.md` + `figma-component-mapping.md`
**Key:** Does NOT escalate to Tier 2 despite Figma URL — scope is single value lookup.

---

#### EC-3: Multi-concern spanning Tier 1
**Request:** "Add a new Tab showing SpotIQ analysis table with empty state"
**Classification:** Tier 1
**Concerns:** Layout (tabs) + Widgets (table, empty state) + Product knowledge (SpotIQ)

| | Today | After | Savings |
|--|-------|-------|---------|
| Rules tokens | ~14,547 + ~6,154 + ~5,589 + ~1,124 = **~27,414** | ~2,089 + ~6,154 + ~5,589 + ~1,124 = **~14,956** | **45%** |

---

#### EC-4: Tier escalation across turns
**Turn 1:** "Change the header title in AdminGroups" → Tier 0 (0 rule tokens)
**Turn 2:** "Also add a new tab for archived groups" → Tier 1 + Layout (~6,154 tokens)
**Turn 3:** "And add a wizard modal for restoring them" → Tier 1 + Modal (~1,550 tokens added)
**Behavior:** Each turn classified independently. Rules accumulate within session but don't reload what's already in context.

---

#### EC-5: Cursor vs Claude Code divergence
**Scenario:** Designer editing `src/prototypes/AdminGroups/components/GroupsTable.tsx`
**Cursor behavior (today):** Auto-loads 6 files (~14,547 tokens) — file matches glob patterns.
**Cursor behavior (after):** Only loads orchestrator + checklist (~2,089 tokens) — narrowed globs don't match nested component files. Orchestrator guides to load more if needed.
**Claude Code behavior:** Same in both — reads CLAUDE.md (~2,367 tokens), orchestrator guides on demand.

---

## Summary table

| Scenario | Tier | Today (tokens) | After (tokens) | Savings |
|----------|------|---------------|----------------|---------|
| Fix button color | 0 | 14,547 | 2,339 | **84%** |
| Swap icon (Liveboard) | 0 | 18,393 | 2,339 | **87%** |
| Fix TS error | 0 | 14,547 | 2,339 | **84%** |
| Figma color lookup | 0+F | 19,427 | 7,219 | **63%** |
| Wrap with Tooltip | 0 | 14,547 | 2,339 | **84%** |
| Add delete confirm | 1 | 21,686 | 9,478 | **56%** |
| Add loading skeleton (LB) | 1 | 20,243 | 5,439 | **73%** |
| Rewrite button labels | 1 | 16,722 | 4,514 | **73%** |
| Add Figma section | 1 | 30,605 | 17,316 | **43%** |
| Make grid responsive | 1 | 20,701 | 8,493 | **59%** |
| Build settings page | 2 | 27,497 | 23,105 | **16%** |
| Implement full Figma | 2 | 39,830 | 29,849 | **25%** |
| Build Liveboard | 2 | 25,671 | 20,433 | **20%** |
| New shared component | 3 | 18,695 | 13,170 | **30%** |
| Explore (shadcn) | Exp | 14,547 | 2,339 | **84%** |
| Multi-concern (table+SpotIQ) | 1 | 27,414 | 15,206 | **45%** |

### Aggregate savings estimate

Assuming daily task distribution: 60% Tier 0, 25% Tier 1, 10% Tier 2, 5% Tier 3/Explore

| | Avg tokens/task (today) | Avg tokens/task (after) | Savings |
|--|------------------------|------------------------|---------|
| Weighted average | ~17,500 | ~5,450 | **~69%** |

---

## Verification protocol

After implementing each change, run these checks:

### Per-change verification
- [ ] `npm run typecheck` — zero errors
- [ ] `npm run build` — passes
- [ ] Open Cursor, edit a nested component file → verify only orchestrator + checklist load (Change 2)
- [ ] Open Cursor, edit an `index.tsx` → verify additional files load via narrowed globs (Change 2)
- [ ] Open Claude Code, ask to fix a color → verify no rule files read (Tier 0)
- [ ] Open Claude Code, ask to add a modal → verify only modal-patterns + widget-patterns read (Tier 1)

### Post-implementation validation
- [ ] Run `/explore shadcn` → verify constraints suspended, `@explore` marker added
- [ ] Build a full prototype from Figma → verify all mandatory + concern files load (Tier 2)
- [ ] Edit Liveboard chart component → verify liveboard-ia does NOT load (Tier 0)
- [ ] Build new Liveboard → verify both liveboard-ia + liveboard-scaffolding load (Tier 2)
- [ ] Check a fork after sync → verify no breakage, rules load correctly
