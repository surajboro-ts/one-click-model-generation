# Figma vs. Radiant Play — Token & Variable Comparison Plan

> Created: 2026-03-25
> Status: Planning
> Source of truth: **Figma Radiant design system**

---

## Goal

Produce a delta report comparing Radiant Play's current design tokens (`src/tokens/`) against the Figma Radiant design system's variables, color styles, typography, and elevation. The report will show what matches, what's missing, what's extra, and what's different — so we know exactly what to align.

---

## Scope

| Category | Figma source | Radiant Play source | Notes |
|----------|-------------|---------------------|-------|
| **Colors — Reference** | Figma variables (primitives) | `src/tokens/colors/reference.ts` | 9 families × 12 tonal stops |
| **Colors — System (Light)** | Figma variables (semantic, light mode) | `src/tokens/colors/system.ts` → `light` | 42 tokens (bg/content/border) |
| **Colors — System (Dark)** | Figma variables (semantic, dark mode) | `src/tokens/colors/system.ts` → `dark` | Must compare dark mode mappings |
| **Colors — Component** | Figma variables (component-level) | `src/tokens/colors/component.ts` | Button, chip, toggle states |
| **Typography** | Figma text styles / variables | `src/tokens/typography.ts` | Font families, sizes, weights, line heights, composite text styles, V2 styles |
| **Elevation / Shadows** | Figma effect styles / variables | `src/tokens/shadows.ts` | Shadow scale + elevation levels |

### Out of scope (for now)
- Spacing, radius, borders, animation, breakpoints, z-index, icons
- Component-level design comparison (covered in existing `docs/archive/component-parity.md`)
- Screenshots or visual comparison

---

## Process

### Step 1: Extract Figma token data (one category at a time)

User will share Figma files/pages for each category. For each, we will:
- Use `get_variable_defs` and `get_metadata` (NOT screenshots) to extract structured variable/token data
- Organize extracted data into a consistent format

**Order of extraction:**
1. Colors (variables — includes light + dark mode mappings)
2. Typography (text styles + any type variables)
3. Elevation (effect styles / shadow variables)

### Step 2: Map against Radiant Play tokens

For each category, create a comparison table:

| Token name (Figma) | Value (Figma) | Token name (RP) | Value (RP) | Status |
|---------------------|---------------|-----------------|------------|--------|
| `color/bg/base` | `gray-00` | `background-base` | `gray.00` | Match / Mismatch / Missing in RP / Extra in RP |

### Step 3: Generate delta report

Final report structure:

```
docs/figma-token-delta-report.md

1. Executive summary (counts: matched, mismatched, missing, extra)
2. Colors — Reference layer
3. Colors — System layer (light)
4. Colors — System layer (dark)
5. Colors — Component layer
6. Typography
7. Elevation / Shadows
8. Recommendations (what to add, rename, or remove)
```

---

## Current Radiant Play Token Inventory

### Colors
- **Reference**: 9 color families (gray, brand, red, purple, blue, teal, yellow, green, orange), each with 12 tonal stops (00–100)
- **System (light)**: ~42 semantic tokens — 15 background, 15 content, 12 border
- **System (dark)**: Same token names, different reference color mappings
- **Component**: Button (primary/secondary/tertiary × default/hover/active/disabled), chip, toggle — light + dark variants

### Typography
- Font families: `Plain` (primary), monospace
- Font sizes: xs (12px) to 5xl (48px)
- Font weights: light (375), regular (400), medium (500), semibold (600)
- Line heights: xs (16px) to 5xl (56px)
- Letter spacing: tight, normal, wide, wider
- V2 composite styles: HeadlineLarge, PageTitle, ModalTitle, SectionLabel, ContentLabel, BodyLarge, BodyNormal, Footnote, Caption, Overline

### Elevation / Shadows
- Scale: none, xs, sm, md, lg, xl, 2xl, inner, focusRing
- Semantic levels: level0–level5
- Component shadows: card, dropdown, popover, tooltip, modal, nav, button, input

---

## Status Tracker

| Step | Category | Status |
|------|----------|--------|
| 1a | Extract Figma — Colors | ✅ Done (primitives + semantic light + dark) |
| 1b | Extract Figma — Typography | ✅ Done (node 16098:18499, 2026-03-31) |
| 1c | Extract Figma — Elevation | ✅ Done (node 16098:19079, 2026-03-31) |
| 1d | Extract Figma — Spacing | ✅ Done (same node as elevation) |
| 1e | Extract Figma — Layout | ✅ Done (node 16098:19214, 2026-03-31) |
| 2a | Map — Colors (light) | ✅ Done |
| 2a-dark | Map — Colors (dark) | ✅ Done (bg + content complete, border partial) |
| 2b | Map — Typography | ✅ Done (weights, letter spacing) |
| 2c | Map — Elevation | ✅ Done (light + dark shadows) |
| 2d | Map — Layout | ✅ Done (header, sidebar, content width) |
| 3 | Delta report | ✅ Complete — `docs/figma-token-delta-report.md` |
| 4 | Codebase audit | ✅ Done — CSS pipeline, shadow adoption, extra tokens |
| 5 | Update plan | ✅ Revised — `docs/token-system-update-plan.md` |
| 6 | Implementation | Not started — Phase 0-5 ready in `feat/token-alignment` worktree |

### Remaining gaps
- Semantic dark mode border tokens (partial)
- Component colors (button, chip, toggle) — not compared yet
