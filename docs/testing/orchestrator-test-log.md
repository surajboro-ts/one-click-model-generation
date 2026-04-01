# Orchestrator Test Log

**Branch:** `feat/orchestrator-refactor`
**Date:** 2026-04-01
**Purpose:** Validate the 5 orchestrator fixes under real workload — prototype creation, Figma import, context addition, widget modification, new component.

---

## Baseline token budget (post-fix)

| Always loaded | Tokens |
|---------------|--------|
| CLAUDE.md | ~1,605 |
| `_orchestration.md` | ~1,420 |
| `component-summary.md` | ~432 |
| `compliance-checklist.md` | ~341 |
| **Total baseline** | **~3,798** |

---

## Test Sessions

---

## Query 1 — "Create a new prototype for user management in admin settings with Users tab, Authentication tab, and Add new user option. Figma URL provided."

**Tier classified:** 2

**Classification reasoning:**
- "Create a new prototype" → new file in `src/prototypes/` (litmus test passes)
- References Figma URL describing a full page ✓
- Multi-view: Users tab + Authentication tab + modal flow ✓
- Post-fix Tier 2 intent signals all fire (new route, standalone prototype, full-screen)

**Rules loaded:**
| File | Reason | Tokens |
|------|--------|--------|
| `compliance-checklist.md` | always-apply | ~341 |
| `_orchestration.md` | always | ~1,420 |
| `component-summary.md` | always | ~432 |
| `CLAUDE.md` | always | ~1,605 |
| `prototype-generation.md` | Tier 2 mandatory | ~2,453 |
| `component-inventory.md` | Tier 2 mandatory | ~3,140 |
| `layout-patterns.md` | Full-page layout concern | ~2,392 |
| `prototype-structure.md` | New folder scaffolding | ~1,800 |
| `modal-patterns.md` | Add new user flow (stubbed) | ~813 |
| `widget-patterns.md` | Table, action menu, banner | ~4,007 |
| `figma-mcp-workflow.md` | Figma URL provided | ~600 |
| `figma-component-mapping.md` | Figma URL provided | ~1,200 |
| **Total** | | **~19,803** |

**Figma analysis:**
- Full admin page: AppShell + sidebar + MFA banner + title + tabs + toolbar + table + pagination
- Table columns: Checkbox, Name/username, Orgs (+more), Auth Type, Created, Status, Actions
- Status values: Active, Pending, Locked, Suspended, Expired, Deactivated (plain text per Figma)
- Split button "Add new user" — no SplitButton in Radiant, custom implementation needed

**Orchestrator behaviour:** PASS
- Tier 2 correctly classified (post-fix)
- All relevant concern files loaded
- Figma MCP invoked before planning

**Gaps found:**
- No `SplitButton` in Radiant — orchestrator has no guidance for "what to do when a needed component doesn't exist in the library" → custom local component needed but no rule triggers this decision explicitly
- `prototype-structure.md` does not document the `section: 'mine' | 'sample'` registry field — new prototypes should default to `'mine'` but the rule file is silent on this, causing the wrong value to be copied from existing entries

---

## Query 2 — "Alert full width broken, split button broken, status UI broke, 3-dot missing. Auth page lock icon too large."

**Tier classified:** 0/1 (multiple Tier 0 fixes in same message)
**Rules loaded:** CLAUDE.md + compliance-checklist.md (always)

**Bugs found and root causes:**

| Bug | Root cause | Orchestrator gap? |
|-----|-----------|-------------------|
| `ActionMenu` vs `Menu` confusion | Used `Menu` (no trigger prop) — should be `ActionMenu` | `component-inventory.md` wasn't loaded (Tier 0), so correct component wasn't referenced |
| Giant lock icon (`size="xl"`) | `xl` is not a valid `IconSize` — only `xs/s/m/l` | TypeScript should catch this but `Icon` likely accepts `string`, not strict union |
| Raw `<button>` in split button | `Button` style prop doesn't override border-radius | compliance-checklist.md (now always-apply) flags this correctly |
| Status column clipped | Grid column `120px` too narrow for "Deactivated" | No rule catches column sizing — visual verification loop (Step 9) would have caught this |

**Orchestrator behaviour:** PARTIAL PASS
- compliance-checklist.md (Fix A) correctly flags the raw `<button>` → this is the new rule working
- But `component-inventory.md` not loaded for Tier 0 fixes → wrong component (`Menu` vs `ActionMenu`) used without guidance
- `size="xl"` invalid icon size not caught by any rule — needs a TypeScript strict type or a rule note

**Gaps found:**
- `component-inventory.md` should load when a fix involves swapping/using components, even at Tier 0
- Icon `size` prop should be a strict TypeScript union, not loose string
- Custom `StatusDot` div built instead of using Radiant `Toggle`
- `Button` with `icon` prop requires `iconPosition="leading"|"trailing"` to render — default `"none"` suppresses the icon entirely. `widget-patterns.md` example omits `iconPosition` making it silently broken. Fix needed in `widget-patterns.md` examples and `component-inventory.md` Button entry — `component-inventory.md` not loaded for Tier 1 additions means component alternatives are missed. Rule needed: "before building any custom interactive element (dot, indicator, switch), check component-inventory.md first"

---

## Query 3 — "Compare SpotterMemory vs AdminUserManagement — improvement plan + orchestrator analysis"

**Tier classified:** 0 (analysis task, no code changes)
**Rules loaded:** Baseline only (CLAUDE.md + compliance-checklist.md)

---

### Side-by-side comparison

| Dimension | SpotterMemory | AdminUserManagement | Winner |
|-----------|--------------|---------------------|--------|
| Radiant component imports | 6 | 9 | AUM |
| Raw HTML violations | 4 (`<header>`, `<nav>`, `<input>`, `<button>`) | 0 | AUM |
| Hardcoded hex colors | 1 (`#FFFFFF` contentBg) | 8 (provider brand colors + `#fff`) | SM |
| Magic spacing violations | 19 | 15 | AUM (slightly) |
| Table implementation | Radiant `Table` component ✓ | Custom `div` grid ✗ | SM |
| AppShell wiring | Correct (`GlobalHeaderProps`, `AppSidebarProps`) | Correct | Tie |
| Dead code | 2 unused components (`AppHeader`, `NavigationSidebar`) | None | AUM |
| Type safety | Ugly type cast on Table | Clean | AUM |

---

### Root cause per issue

**SpotterMemory — 19 magic spacing violations**
Built before `compliance-checklist.md` had `alwaysApply: true`. Raw pixel values (`24px`, `32px`, `16px`) used throughout styles.ts and inline styles. Post-fix orchestrator would have caught every one of these at authoring time.

**SpotterMemory — 4 raw HTML violations**
`AppHeader.tsx` and `NavigationSidebar.tsx` are **dead code** — they are exported from `components/index.ts` but never imported in `SpotterMemory.tsx`, which correctly uses `AppShell` with props. These were likely early drafts. The orchestrator has no "dead code detection" rule.

**AdminUserManagement — custom div table instead of Radiant Table**
`component-inventory.md` was not loaded during Tier 1 table work. SpotterMemory correctly uses `Table` from `src/components/Table` with `TableColumn[]` config. AdminUserManagement built from scratch with manual `display: grid` — duplicating what `Table` already provides (sorting, row click, hover, column config).

**AdminUserManagement — 8 hardcoded hex colors**
The `#C62828`, `#4285F4`, `#FF9900`, `#00A4EF`, `#007DC1` values are **external brand colors** (Google, Amazon, Microsoft, Okta). These legitimately can't map to Radiant tokens. The `#fff` in `IdpTable.tsx` however should be `systemColors.light['content-inverse']`.

---

### Improvement plan

#### AdminUserManagement — 3 targeted fixes

**Fix 1 — Migrate UsersTable + IdpTable to Radiant `Table` component**
SpotterMemory's `MemorySourcesTable` is the reference. Replace the `display: grid` div tables with `<Table columns={...} data={...} />`. Benefits: sorting, row hover, row selection, and keyboard nav for free. Cost: ~1 hour.

**Fix 2 — Replace `#fff` with token**
`IdpTable.tsx:35` — `color: '#fff'` → `color: systemColors.light['content-inverse']`

**Fix 3 — Fix remaining magic spacing (15 instances)**
Replace raw `'24px'`, `'32px'`, `'16px'`, `'8px'` etc. with `spacing.F`, `spacing.H`, `spacing.D`, `spacing.B` etc.

#### SpotterMemory — 2 cleanup fixes

**Fix 4 — Delete dead components**
`AppHeader.tsx` and `NavigationSidebar.tsx` are never imported in the main component. Delete both and remove from `components/index.ts`. Removes 4 raw HTML violations automatically.

**Fix 5 — Fix 19 magic spacing violations**
Audit `styles.ts` — replace all raw pixel values with spacing tokens.

---

### Orchestrator analysis — what this comparison reveals

**Pre-fix orchestrator failures visible in SpotterMemory:**

| Violation | Count | Would post-fix catch it? |
|-----------|-------|--------------------------|
| Magic spacing values | 19 | **Yes** — `compliance-checklist.md` now `alwaysApply: true` |
| Raw `<input>` in AppHeader | 1 | **Yes** — compliance-checklist flags raw HTML |
| Raw `<nav>`, `<header>` | 2 | **Yes** — compliance-checklist flags raw HTML |
| Raw `<button>` in MemorySourcesTable | 1 | **Yes** — compliance-checklist flags raw `<button>` |

**Still not caught by post-fix orchestrator:**

| Violation | Why missed | Rule needed |
|-----------|-----------|-------------|
| Custom div table instead of Radiant `Table` | `component-inventory.md` not auto-loaded at Tier 1 | Add to Tier 1 concern table: "Data table" → load `component-inventory.md` |
| Dead code (`AppHeader`, `NavigationSidebar`) | No dead code detection rule | Out of scope for orchestrator |
| Brand hex colors in mock data | Legitimately can't use tokens for external brands | Acceptable — note in `token-usage.md` as explicit exception |
| Table type cast (`as unknown as`) | TypeScript escape hatch — not an orchestrator concern | Fix the `Table` component generics |

**Net verdict:**
Post-fix orchestrator (Fix A through E) would have eliminated **all 4 raw HTML violations** and **all 19 magic spacing violations** in SpotterMemory if it had been active when that prototype was built. The one remaining gap — custom div tables instead of `Table` component — requires adding a "Data table" row to the Tier 1 concern table mapping to `component-inventory.md`.

---
<!-- Each session appended below using the template:

## Query N — "<prompt>"

**Tier classified:** 0 / 1 / 2 / 3 / Exploratory
**Classification reasoning:** ...
**Rules loaded:** list
**Tokens used:** baseline + N additional = total
**What was built:** ...
**Orchestrator behaviour:** Pass / Fail / Partial
**Gaps / improvements found:** ...

-->
