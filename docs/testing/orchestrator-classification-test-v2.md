# Orchestrator Classification Test — v2 (Post-Tightening)

**Date:** 2026-04-01
**Branch:** `feat/orchestrator-refactor`
**Purpose:** Dry-run 10 diverse prompts through the revised orchestrator classification. No code changes — evaluate tier assignment, rule loading, pre-implementation gate, and gap coverage.

---

## Always-loaded baseline (revised)

| File | Words |
|------|-------|
| CLAUDE.md | ~1,605 |
| `_orchestration.md` | 1,163 |
| `component-summary.md` | 394 |
| `compliance-checklist.md` | 270 |
| **Baseline total** | **~3,432w** |

---

## Test 1 — "Change the button label from 'Submit' to 'Save' in AdminGroups"

**Tier:** 0
**Why:** Single label change, 1 file, no new components. "Submit" is also a CLAUDE.md forbidden word → caught by always-loaded context.

**Rules loaded:** Baseline only (3,432w)
**Pre-implementation gate:**
1. New UI element? No.
2. Using src/components/? No (prototype file).
3. Using an icon? No.
4. Any UI text? Yes → check CLAUDE.md forbidden words → "Submit" → "Save". ✓

**Classification:** PASS
**New tightening impact:** None needed — Tier 0 handles this cleanly.

---

## Test 2 — "Add a 3-dot action menu to each row in the users table with Edit, Disable, and Delete options"

**Tier:** 1
**Why:** New interaction within existing prototype. Adding a component (action menu) + delete flow (confirmation).

**Concern matches:**
| Concern | File | Words |
|---------|------|-------|
| Interactive widgets | `widget-patterns.md` | 3,098 |
| Data table / list | `component-inventory.md` | 2,565 |
| Modals & dialogs | `modal-patterns.md` | 626 |

**Rules loaded:** Baseline + 3 files = **~9,721w**

**Pre-implementation gate:**
1. New UI element? Action menu → check component-summary.md → **"3-dot / overflow menus → `ActionMenu` (has trigger prop), NOT `Menu`"** ✓ NEW TIGHTENING CATCHES THIS.
2. Using src/components/? Yes (ActionMenu) → read its .module.css first.
3. Using an icon? Yes, "more" icon → verify in icon list → ✓. Size check → use `m`. `iconPosition="leading"` required on trigger Button. ✓
4. Any UI text? "Edit", "Disable", "Delete" → imperative verbs, sentence case. ✓

**Classification:** PASS
**New tightening impact:** Change 1 (ActionMenu disambiguation) directly prevents the Menu vs ActionMenu confusion from the original test session. Without it, only `widget-patterns.md` examples would guide the choice — and the original test proved that wasn't enough.

---

## Test 3 — "Build a new prototype for a SpotIQ insights dashboard with card grid, filters, and detail modal"

**Tier:** 2
**Why:** New file in `src/prototypes/`. Litmus test passes. Standalone prototype, full-page experience.

**Mandatory files + concern matches:**
| File | Reason | Words |
|------|--------|-------|
| `prototype-generation.md` | Tier 2 mandatory | 1,887 |
| `component-inventory.md` | Tier 2 mandatory | 2,565 |
| `prototype-structure.md` | New folder scaffolding | 1,692 |
| `layout-patterns.md` | Card grid, dashboard layout | 1,842 |
| `widget-patterns.md` | Filters, action menus | 3,098 |
| `modal-patterns.md` | Detail modal | 626 |
| `product-knowledge.md` | SpotIQ term | 668 |
| `content-guidelines.md` | Substantial copy (card titles, filter labels) | 1,435 |

**Rules loaded:** Baseline + 8 files = **~17,245w**

**Pre-implementation gate:**
1. New UI element? Cards, filters → check component-summary → Card ✓, FilterDialog ✓, SearchInput ✓.
2. Using src/components/? Yes → audit .module.css.
3. Using an icon? Likely (filter, magnifying-glass, etc.) → verify each.
4. Any UI text? Yes → check forbidden words, sentence case, ThoughtSpot capitalization ("SpotIQ" not "spotiq").

**Post-build trigger:** After build completes → suggest `/compact`. ✓ NEW TIGHTENING.

**Classification:** PASS
**New tightening impact:** Change 3 (post-Tier-2 `/compact`) fires after this build, preventing context saturation for the next task.

---

## Test 4 — "The delete button in AdminGroups doesn't show its icon"

**Tier:** 0
**Why:** Bug fix, likely missing `iconPosition` prop. Single file, single prop.

**Rules loaded:** Baseline only (3,432w)

**Pre-implementation gate:**
1. New UI element? No.
2. Using src/components/? Yes (Button) → but this is a prop fix, not a CSS audit.
3. Using an icon? Yes → component-summary says **"Always pass `iconPosition="leading"` or `"trailing"` when using the `icon` prop — default `"none"` suppresses icon rendering."** ✓ This is the fix.
4. Any UI text? No.

**Classification:** PASS
**New tightening impact:** The icon rule in component-summary.md (added in the v1 refactor) catches this at Tier 0. No new tightening needed — already covered.

---

## Test 5 — "Add a loading skeleton to the users table while data fetches"

**Tier:** 1
**Why:** New interaction pattern (loading state) within existing prototype.

**Concern matches:**
| Concern | File | Words |
|---------|------|-------|
| State handling | `interaction-patterns.md` | 1,019 |
| Data table / list | `component-inventory.md` | 2,565 |

**Rules loaded:** Baseline + 2 files = **~7,016w**

**Pre-implementation gate:**
1. New UI element? Skeleton/LoadingIndicator → check component-summary → LoadingIndicator ✓, also OverlayLoading ✓.
2. Using src/components/? Yes → audit .module.css.
3. Using an icon? No.
4. Any UI text? Possibly a "Loading…" label → sentence case.

**Classification:** PASS
**New tightening impact:** None — `component-inventory.md` now correctly loads for table-related Tier 1 work (P2 from improvement plan already applied).

---

## Test 6 — "Make the Chip component in src/components support a 'closable' prop"

**Tier:** 3
**Why:** Target file is in `src/components/`. Modifying component API.

**Rules loaded:**
| File | Words |
|------|-------|
| `design-system.md` | 863 |
| `component-inventory.md` | 2,565 |
| `token-usage.md` | 1,086 |
| `content-guidelines.md` | 1,435 |

**Rules loaded:** Baseline + 4 files = **~9,381w**

**Pre-implementation gate:**
1. New UI element? No — modifying existing.
2. Using src/components/? Yes — this IS the target. Read Chip.module.css for violations.
3. Using an icon? Likely (close "x" icon) → verify "cross" exists → ✓. Size → `xs` or `s`.
4. Any UI text? Possibly aria-label for close button.

**Compliance check on existing code:** If Chip.module.css has `!important` or hardcoded hex → fix first before adding new prop.

**Classification:** PASS
**New tightening impact:** Change 2 (tightened `<button>` exception) is relevant — the close button inside Chip must use `Button` or a properly documented overlay trigger, not a raw `<button>`. The tighter wording prevents the loophole.

---

## Test 7 — "Here's a Figma URL for the new Worksheet editor page: figma.com/design/abc123/Worksheet-Editor?node-id=1-234"

**Tier:** 2
**Why:** Figma URL describing a full page. New prototype (Worksheet editor doesn't exist). Litmus test: new file in `src/prototypes/`.

**Mandatory files + concern matches:**
| File | Reason | Words |
|------|--------|-------|
| `prototype-generation.md` | Tier 2 mandatory | 1,887 |
| `component-inventory.md` | Tier 2 mandatory | 2,565 |
| `figma-mcp-workflow.md` | Figma URL provided | 845 |
| `figma-component-mapping.md` | Figma URL provided | 2,005 |
| `prototype-structure.md` | New folder | 1,692 |
| `product-knowledge.md` | "Worksheet" is a ThoughtSpot term | 668 |
| `layout-patterns.md` | Full page layout (editor) | 1,842 |

**Rules loaded:** Baseline + 7 files = **~14,936w**

**Pre-implementation gate:**
1. New UI element? Depends on Figma analysis — run MCP first.
2. Using src/components/? Yes → audit each used component's CSS.
3. Using an icon? Likely → verify each from Figma mapping.
4. Any UI text? Yes → "Worksheet" must be capitalized (ThoughtSpot term). Sentence case for all else.

**Post-build trigger:** After build completes → suggest `/compact`. ✓

**Classification:** PASS
**New tightening impact:** Change 3 fires post-build. Figma-to-code Tier 2 builds are the heaviest context consumers — the `/compact` suggestion is most valuable here.

---

## Test 8 — "Replace the custom status dots in AdminUserManagement with proper Radiant components"

**Tier:** 1
**Why:** Replacing a component within existing prototype. Not a minor prop tweak — requires identifying the right Radiant equivalent.

**Concern matches:**
| Concern | File | Words |
|---------|------|-------|
| Interactive element | `component-inventory.md` | 2,565 |

**Rules loaded:** Baseline + 1 file = **~5,997w**

**Pre-implementation gate:**
1. New UI element? Replacing custom → check component-summary → **Toggle** (on/off state) or **Chip** (label state). ✓ The summary guides the choice.
2. Using src/components/? Yes → audit .module.css.
3. Using an icon? Possibly.
4. Any UI text? Status labels → sentence case.

**Classification:** PASS
**New tightening impact:** The "Interactive element" concern row (P2, already applied) correctly triggers `component-inventory.md` here. Without it, this would have been Tier 0 with no component reference — the exact failure from the original test session.

---

## Test 9 — "Add form validation with error messages to the Add User modal"

**Tier:** 1
**Why:** Modifying existing modal with new validation logic + error messaging.

**Concern matches:**
| Concern | File | Words |
|---------|------|-------|
| Modals & dialogs | `modal-patterns.md` | 626 |
| State handling | `interaction-patterns.md` | 1,019 |
| UX copy | `content-guidelines.md` | 1,435 |
| Component details | `component-inventory.md` | 2,565 |

**Rules loaded:** Baseline + 4 files = **~9,077w**

**Pre-implementation gate:**
1. New UI element? Error display → check component-summary → **Alert** (variant="inline" or "section"). ✓
2. Using src/components/? Yes → audit Alert.module.css.
3. Using an icon? Possibly (exclamation-point-circle for errors).
4. Any UI text? Yes, error messages → **Issue + Remedy + CTA pattern** from CLAUDE.md. Forbidden words check. ✓

**Classification:** PASS
**New tightening impact:** Change 2 (tightened `<button>` exception) relevant if form has custom submit handling — compliance-checklist now clearly requires `Button`, no loophole for "icon-only trigger" excuse.

---

## Test 10 — "/explore Build a creative onboarding flow with animated cards and custom transitions"

**Tier:** Exploratory
**Why:** `/explore` invoked → suspend Radiant constraints.

**Rules loaded:** Baseline only (3,432w). No additional files loaded. Radiant constraints suspended for this scope.

**Pre-implementation gate:** SKIPPED (exploratory mode).

**Step 0 check:** `/explore` was invoked → suspend constraints. ✓

**Classification:** PASS
**New tightening impact:** None — exploratory mode correctly bypasses all concern matching and compliance checks.

---

## Summary Matrix

| # | Prompt type | Tier | Files loaded | Total words | Baseline % | Pass? |
|---|------------|------|-------------|-------------|------------|-------|
| 1 | Label rename | 0 | 0 | 3,432 | 100% | ✓ |
| 2 | Add action menu | 1 | 3 | 9,721 | 35% | ✓ |
| 3 | New dashboard prototype | 2 | 8 | 17,245 | 20% | ✓ |
| 4 | Fix broken icon | 0 | 0 | 3,432 | 100% | ✓ |
| 5 | Add loading skeleton | 1 | 2 | 7,016 | 49% | ✓ |
| 6 | Modify shared component | 3 | 4 | 9,381 | 37% | ✓ |
| 7 | Figma full-page import | 2 | 7 | 14,936 | 23% | ✓ |
| 8 | Replace custom with Radiant | 1 | 1 | 5,997 | 57% | ✓ |
| 9 | Add form validation | 1 | 4 | 9,077 | 38% | ✓ |
| 10 | Exploratory (freeform) | Exp | 0 | 3,432 | 100% | ✓ |

**Classification accuracy:** 10/10
**Average context load:** ~8,317w (vs ~22,500w loading all files = **63% reduction**)
**Tier 0 context:** 3,432w (**85% reduction** from all-files)
**Tier 1 average:** ~7,953w (**65% reduction**)
**Tier 2 average:** ~16,091w (**29% reduction**)

---

## New Tightening Impact Assessment

| Change | Tests where it fired | Failure it prevents |
|--------|---------------------|---------------------|
| **1. ActionMenu vs Menu** | Test 2 | Wrong component (`Menu` instead of `ActionMenu`) — was a real failure in v1 testing |
| **2. Tighter `<button>` exception** | Test 6, Test 9 | Raw `<button>` justified by vague "icon-only trigger" loophole — was a real failure in SplitButton |
| **3. Post-Tier-2 `/compact`** | Test 3, Test 7 | Context saturation after heavy builds — proactive cleanup before next task |

All 3 tightening changes fired at least once across the 10 tests. No false positives (no test was incorrectly escalated or loaded unnecessary files because of the changes).

---

## Remaining Edge Cases (not failures — just observations)

1. **Test 2 + Test 8 overlap:** If these came in the same session sequentially, session memory rule prevents re-loading `component-inventory.md`. Good.

2. **Test 3 loads 8 files:** This is the heaviest Tier 2 scenario (dashboard + filters + modal + ThoughtSpot terms + copy). The post-build `/compact` suggestion (Change 3) is critical here to prevent the next task from inheriting ~17K words of stale context.

3. **Tier 1 range is wide:** From 5,997w (Test 8, single concern) to 9,721w (Test 2, triple concern). This is correct — the concern table is working as designed, scaling with actual complexity.

4. **No test triggered `token-usage.md` at Tier 1.** This file (1,086w) only loads when someone explicitly needs CSS variable names or the full color scale. The always-loaded baseline + CLAUDE.md token rules are sufficient for normal work. Good — this is an expensive file that should stay on-demand.
