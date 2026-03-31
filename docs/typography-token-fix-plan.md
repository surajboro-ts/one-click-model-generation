# Typography Token Fix Plan

> Created: 2026-03-31
> Based on: `docs/figma-token-delta-report.md` Section 11
> Source of truth: Figma Radiant 3.0 (node 16098:18499)

## Problem

Radiant Play's `v2TextStyles` has two systematic mismatches with the Figma spec:

1. **Font weight 500 vs 600** — All labels and titles use `fontWeight.medium` (500) instead of `fontWeight.semibold` (600). Every heading and label renders lighter than Figma.
2. **Letter spacing missing** — 8 of 9 styles are missing negative tracking that Figma specifies.

## What changes

### File: `src/tokens/typography.ts`

#### Change 1: Add pixel-based letter spacing values

Current `letterSpacing` object only has relative `em` values. Add absolute pixel values to match Figma:

```typescript
// Current
export const letterSpacing = {
  tight: '-0.01em',
  normal: '0',
  wide: '0.01em',
  wider: '0.02em',
} as const;

// After
export const letterSpacing = {
  tight: '-0.4px',    // Display, Title, Label, Body Large (Figma: -0.4)
  tighter: '-0.6px',  // Footnote, Caption, Overline (Figma: -0.6)
  normal: '0',
  wide: '0.01em',
  wider: '0.02em',
} as const;
```

#### Change 2: Fix `v2TextStyles` weights — 500 → 600

All Display/Title/Label styles change from `fontWeight.medium` (500) to `fontWeight.semibold` (600):

| Style | Before | After |
|-------|--------|-------|
| `headlineLarge` | medium (500) | semibold (600) |
| `pageTitle` | medium (500) | semibold (600) |
| `modalTitle` | medium (500) | semibold (600) |
| `sectionLabel` | medium (500) | semibold (600) |
| `contentLabel` | medium (500) | semibold (600) |
| `contentLabelSubhead` | medium (500) | semibold (600) |

Body and footnote weights stay at 400 (correct per Figma).

#### Change 3: Fix `v2TextStyles` letter spacing

| Style | Before | After |
|-------|--------|-------|
| `headlineLarge` | tight (-0.01em) | tight (-0.4px) |
| `pageTitle` | normal (0) | tight (-0.4px) |
| `modalTitle` | normal (0) | tight (-0.4px) |
| `sectionLabel` | normal (0) | tight (-0.4px) |
| `contentLabel` | normal (0) | tight (-0.4px) |
| `contentLabelSubhead` | normal (0) | normal (0) — no change |
| `bodyLarge` | normal (0) | tight (-0.4px) |
| `bodyNormal` | normal (0) | normal (0) — no change |
| `footnote` | normal (0) | tighter (-0.6px) |
| `caption` | normal (0) | tighter (-0.6px) |
| `overline` | wider (0.02em) | wider (0.02em) — no change (overline keeps wide tracking) |

#### Change 4: Align legacy `textStyles` body weight

The legacy `textStyles.body.large` and `textStyles.body.normal` use `fontWeight.light` (375). Per Figma's note, HTML should use 400. Change to `fontWeight.regular` (400).

| Legacy style | Before | After |
|-------------|--------|-------|
| `body.large` | light (375) | regular (400) |
| `body.normal` | light (375) | regular (400) |

## Impact on forks

**This is a non-breaking change.** No API changes — same style names, same properties. Only values change. After syncing:
- Headings/labels render slightly bolder (500 → 600)
- Text is slightly tighter (letter spacing)
- Body text in legacy `textStyles` renders slightly heavier (375 → 400)

Designers may notice headings look "more correct" — closer to what they see in Figma.

## What stays the same

- All font sizes — already match
- All line heights — already match
- Font family (Plain) — already matches
- `fontWeight` token definitions — the values 375, 400, 500, 600 all stay. Only which value each style references changes.
- The `overline` style keeps `wider` spacing (intentional: overlines use wide tracking by convention)

## Files touched

| File | Changes |
|------|---------|
| `src/tokens/typography.ts` | Update `letterSpacing`, `v2TextStyles`, `textStyles.body` |

One file, ~20 line changes.

## Open questions

1. **Should `letterSpacing.tight` change from `-0.01em` to `-0.4px`?** This is an em-to-px switch. Any code using `letterSpacing.tight` directly (not through v2TextStyles) would be affected. Need to grep for usage.
2. **Overline letter spacing** — Figma's footnote/caption/overline variable says `-0.6px`, but overlines traditionally use wide positive spacing. The current `wider: '0.02em'` may be intentional for the overline style specifically. Confirm with design.
