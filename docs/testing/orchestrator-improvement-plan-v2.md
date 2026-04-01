# Orchestrator Improvement Plan — v2

**Based on:** Live testing session, 2026-04-01
**Branch:** `feat/orchestrator-refactor`
**Source:** `docs/testing/orchestrator-test-log.md`

---

## What the test session proved

The v1 orchestrator refactor (5 fixes, ~511 token baseline increase) was correct in structure but revealed a deeper failure pattern:

> **Loading a rule file ≠ consulting it at each implementation decision.**

In every failure case, the right file was loaded — but implementation proceeded from memory. The result: wrong component chosen (`Menu` vs `ActionMenu`), custom element built when Radiant equivalent existed (`StatusDot` vs `Toggle`), invalid prop used (`size="xl"`), custom div table built when `Table` component exists.

Classification accuracy was 4/4. Content accuracy was poor. The gap is between "files loaded" and "files applied."

---

## Improvement priorities

Ranked by: impact ÷ token cost

---

### P1 — Pre-implementation checklist in orchestrator

**Problem:** Files loaded but not consulted. 3/3 wrong component choices came from this.

**Fix:** Add a mandatory pre-implementation gate to `_orchestration.md` between "classify" and "implement":

```
## Pre-implementation gate (runs before writing any code)

Before writing a single line, answer these 4 questions:

1. NEW UI ELEMENT?
   → Check component-summary.md: does a Radiant component exist for this?
   → If unsure, load component-inventory.md before deciding to build custom

2. USING src/components/?
   → Read its .module.css — if it has !important, gradient, or hardcoded hex, fix it first (Tier 3)

3. USING AN ICON?
   → Verify the name exists in component-summary.md icon list
   → Valid sizes: xs (12px), s (14px), m (16px), l (18px) — no xl, no 2xl

4. ANY UI TEXT?
   → Check CLAUDE.md forbidden words before writing labels, buttons, or titles
```

**Token cost:** +~120 tokens to `_orchestration.md` (always loaded)
**Impact:** Catches all 3 wrong component choices, invalid icon sizes, and forbidden words at every tier

---

### P2 — Two new rows in Tier 1 concern table

**Problem:** `component-inventory.md` was loaded at Tier 2 (mandatory) but not at Tier 1 when tables, toggles, and menus were added.

**Fix:** Add to the Tier 1 concern table in `_orchestration.md`:

| Concern | Rule file | Semantic triggers |
|---------|-----------|-------------------|
| **Data table / list** | `component-inventory.md` | Any table of rows, object list, data grid — always check if Radiant `Table` covers the need before building custom |
| **Interactive element** | `component-inventory.md` | Adding toggle, switch, status indicator, checkbox, radio, segmented control, or any stateful UI element |

**Token cost:** +3,140 tokens when triggered (component-inventory.md loaded at Tier 1 for these concerns)
**Impact:** Catches custom div tables, custom StatusDot, potentially wrong menu component

---

### P3 — Rule file verification process

**Problem:** `widget-patterns.md`, `layout-patterns.md`, `interaction-patterns.md`, and `figma-component-mapping.md` all had `icon="more"` without `iconPosition` — the orchestrator faithfully reproduced the bug from the examples.

**Fix:** Add to `_orchestration.md` session memory section:

```
## Rule file integrity

Before using a code example from any rule file, verify it compiles against the
actual component interface. If a prop in the example doesn't match the
component's TypeScript interface, the example is wrong — use the source, not
the example.

Red flags in rule file examples:
- <Button icon="x" /> without iconPosition → always invalid
- <Icon size="xl" /> → xl is not a valid size
- <Alert variant="section" buttonText="..." /> → buttonText only works in variant="page"
```

**Token cost:** +~80 tokens (always loaded)
**Impact:** Prevents future "corrupt example → reproduced bug" cascade

---

### P4 — Component gap protocol

**Problem:** No guidance when a needed component doesn't exist (SplitButton, icon-only circular Button). Designers improvise with raw HTML or style hacks.

**Fix:** Add to `component-inventory.md` under a new "When a component doesn't exist" section:

```
## When the component you need isn't in Radiant

1. CHECK PROPS FIRST — can an existing component achieve the visual with different props?
   - No SplitButton? → Two Button components side by side
   - No circular icon button? → Use iconOnly prop on Button (added 2026-04-01)

2. IF NOT — build a prototype-local component in src/prototypes/<Name>/components/
   - Follow design-system.md rules (forwardRef, TypeScript, CSS Modules)
   - Do NOT use raw <button>, <div onClick>, or <input> — wrap in a proper component
   - Add a comment: // Gap: Radiant has no <X> component — local implementation

3. NEVER inline a component workaround directly in the main component file
```

**Token cost:** +~150 tokens to `component-inventory.md` (loads at Tier 2 always, Tier 1 for table/interactive concerns)
**Impact:** Guides all future "component missing" decisions consistently

---

### P5 — Add valid icon sizes to component-summary.md

**Problem:** `size="xl"` used silently — no rule at Tier 0 flagged it because `component-summary.md` (always loaded) only lists icon names, not valid sizes.

**Fix:** Add one line to the icons section of `component-summary.md`:

```
Valid sizes: xs (12px) · s (14px) · m (16px) · l (18px) — no xl, no 2xl, no numeric values
```

**Token cost:** +~20 tokens (always loaded)
**Impact:** Catches invalid icon sizes at every tier, zero additional file loads

---

### P6 — Document registry section field in prototype-structure.md

**Problem:** `section: 'mine' | 'sample'` not documented — new prototypes copied `'sample'` from existing entries.

**Fix:** Add to the registry section of `prototype-structure.md`:

```
// section: 'mine'   → appears under "My prototypes" in gallery (default for new work)
// section: 'sample' → appears under "Sample prototypes" (built-in examples only)
// Omitting section defaults to 'mine'
```

**Token cost:** +~40 tokens (loads at Tier 2 when new folder needed)
**Impact:** New prototypes always land in the right gallery section

---

### P7 — Slim orchestrator file by 15%

**Problem:** `_orchestration.md` is ~1,420 tokens and always loaded. With P1 and P2 additions it grows further.

**Fix:** Tighten the prose:
- Collapse the Tier 0 "Response style" paragraph to one sentence
- Remove the verbose "Figma at Tier 0" subsection — move to a cross-reference in figma-mcp-workflow.md
- Collapse the cross-references section to 2 lines
- Target: ~1,200 tokens (saving ~220 from always-loaded baseline)

**Token savings:** ~220 tokens from always-loaded
**Net cost of P1+P2+P3+P5 minus P7:** +240 tokens always-loaded (3,798 → 4,038)

---

## Net impact summary

| Improvement | Token Δ (always-loaded) | Token Δ (Tier 1 triggered) | Accuracy gain |
|-------------|------------------------|--------------------------|---------------|
| P1 pre-impl gate | +120 | 0 | Fixes 3 wrong component choices |
| P2 concern table rows | +20 (orchestrator) | +3,140 when triggered | Fixes custom table, toggle, menu |
| P3 rule integrity note | +80 | 0 | Prevents corrupt-example cascade |
| P4 component gap protocol | 0 | +150 (in component-inventory) | Guides missing-component decisions |
| P5 icon sizes in summary | +20 | 0 | Catches invalid sizes at Tier 0 |
| P6 registry section docs | 0 | +40 (in prototype-structure) | Prevents wrong gallery section |
| P7 orchestrator slimming | -220 | 0 | Reduces always-loaded baseline |
| **Net** | **+20 always-loaded** | **+3,330 when triggered** | **All 7 session failures addressed** |

**Revised baseline:** ~3,818 tokens (up 20 from current ~3,798 — negligible)

The token cost is almost entirely in P2 (component-inventory at Tier 1) — and that only triggers when actually building tables or interactive elements, not for every task.

---

## Remaining gaps not addressed by P1-P7

| Gap | Why not fixed | Acceptable? |
|-----|--------------|-------------|
| `Alert` variant API not caught | Requires reading component source, not a rule problem | Fix: `component-summary.md` should note each Alert variant's prop support |
| Icon `size` not a TypeScript strict union | Design system code fix, separate from orchestrator | Fix in `Icon.types.ts` |
| Custom div table in AUM | P2 addresses future cases | Retroactive fix separate task |
| SpotterMemory dead code | Out of orchestrator scope | Manual cleanup |
| `@explore` scope contamination (file vs section) | Complex, low frequency | Defer to v3 |

---

## Implementation order

1. P5 — icon sizes in component-summary.md (1 line, zero risk, immediate value)
2. P6 — registry section in prototype-structure.md (1 paragraph, zero risk)
3. P3 — rule integrity note in orchestrator (one paragraph addition)
4. P1 — pre-implementation gate in orchestrator (biggest impact)
5. P7 — orchestrator slimming (reclaim tokens before adding P2)
6. P2 — new Tier 1 concern rows (triggers component-inventory at Tier 1)
7. P4 — component gap protocol in component-inventory.md
