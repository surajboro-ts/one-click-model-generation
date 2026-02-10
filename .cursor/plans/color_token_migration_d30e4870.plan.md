---
name: Color Token Migration
overview: Migrate the color token system from the current 3-tier architecture (brand/alias/mapped) to the Dynamic Theme Generator's 3-layer token architecture (Reference → System → Component) with rd-ref/rd-sys/rd-comp prefixes, built-in light/dark mode via SCSS maps, and Material Color Utilities-driven tonal palettes.
todos:
  - id: reference-layer
    content: "Phase 0: Create Reference (Primitive) token layer — rd-ref-color-* with 12 tonal scales across 9 color families (~110 tokens)"
    status: pending
  - id: system-layer
    content: "Phase 1: Create System token layer — rd-sys-color-* with background/content/border groups, light + dark SCSS maps (~42 tokens per mode)"
    status: pending
  - id: component-layer
    content: "Phase 2: Create Component token layer — rd-comp-color-* for button/chip/toggle with light + dark SCSS maps (~40 tokens per mode)"
    status: pending
  - id: css-module-migration
    content: "Phase 3: Update all 40 component CSS modules with new token naming (background/content/border groups)"
    status: pending
  - id: typescript-components
    content: "Phase 4: Update 6 components + 48 icon files to import from new 3-layer token structure"
    status: pending
  - id: prototype-migration
    content: "Phase 5: Update 4 centralized style files and 28 prototype files using new token imports"
    status: pending
  - id: pages-documentation
    content: "Phase 6: Update ColorSystemPage, showcase pages, and token-usage.md documentation"
    status: pending
  - id: testing-verification
    content: "Phase 7: Run visual regression tests, verify light/dark themes, WCAG contrast checks, fix remaining issues"
    status: pending
isProject: false
---

# Color Token Migration Plan — Aligned with Dynamic Theme Generator

## Summary of Changes from Previous Plan

> **This plan was revised** after auditing the [Dynamic Theme Generator](https://dynamic-theme-generator-six.vercel.app/) source code (~2100 lines of `main.js`). The following critical misalignments were found and corrected:
>
>
> | #   | What Changed                                                                                                 | Why                                                                                             |
> | --- | ------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------- |
> | 1   | **Token groups renamed**: `surface/action/text/link/icon/outline/divider` → `**background/content/border**`  | Generator uses 3 groups not 7. `content` merges text+icon+link; `border` merges outline+divider |
> | 2   | **3-layer architecture added**: Reference → System → Component                                               | Previous plan only had System layer. Generator has 3 distinct layers with different prefixes    |
> | 3   | **Component token layer added**: `rd-comp-color-*` for button, chip, toggle                                  | Generator produces per-component tokens with mode-aware values — completely missing before      |
> | 4   | **Reference/Primitive layer added**: `rd-ref-color-*` with tonal scales                                      | Mode-agnostic base palette values (12 scales × 9 families) were missing entirely                |
> | 5   | **SCSS map export format**: `$rd-sys-color-map` / `$rd-sys-color-map-dark`                                   | Generator exports SCSS maps as primary format, not just CSS custom properties                   |
> | 6   | **Dark mode approach**: Algorithmic via M3 tone inversion, not manual hex mapping                            | Generator uses Material Color Utilities HCT color space for deterministic light↔dark            |
> | 7   | **Token count corrected**: ~~110 ref + ~84 sys + ~80 comp = **~~274 total**                                  | Previous plan estimated 110 total — was significantly undercounted                              |
> | 8   | **New system tokens added**: `raised`, `subtle`, `inset`, `tertiary`, `alternate`, `ghost-*`, `gap`, `focus` | Generator produces 42 system tokens per mode vs plan's ~55 in wrong categories                  |
>

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     3-LAYER TOKEN ARCHITECTURE                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Layer 1: REFERENCE (Primitives)        rd-ref-color-*          │
│  ─────────────────────────────────────────────────────          │
│  Mode-agnostic base values. 12 tonal scales (00–100)            │
│  per color family. Generated from MCU tonal palettes.           │
│  e.g. rd-ref-color-gray-00, rd-ref-color-blue-60               │
│  SCSS: $rd-ref-color-map                                        │
│                                                                 │
│           ▼ references ▼                                        │
│                                                                 │
│  Layer 2: SYSTEM (Semantic)             rd-sys-color-*          │
│  ─────────────────────────────────────────────────────          │
│  Mode-aware (light + dark). 3 groups:                           │
│    • background-* (15 tokens) — surfaces, fills, overlays       │
│    • content-*    (15 tokens) — text, icons, links              │
│    • border-*     (12 tokens) — outlines, dividers, strokes     │
│  SCSS: $rd-sys-color-map, $rd-sys-color-map-dark                │
│                                                                 │
│           ▼ references ▼                                        │
│                                                                 │
│  Layer 3: COMPONENT                     rd-comp-color-*         │
│  ─────────────────────────────────────────────────────          │
│  Mode-aware (light + dark). Per-component tokens:               │
│    • button-*  (11 tokens) — primary, secondary, tertiary       │
│    • chip-*    (25 tokens) — attribute, measure, filter, etc.   │
│    • toggle-*  (5 tokens)  — track, thumb states                │
│  SCSS: $rd-comp-color-map, $rd-comp-color-map-dark              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Migration Scope


| Category              | Files          | Occurrences             | Effort |
| --------------------- | -------------- | ----------------------- | ------ |
| Token infrastructure  | 12 files       | ~274 token definitions  | High   |
| CSS modules           | 40 files       | ~400+ var() uses        | Medium |
| TypeScript/components | 54 files       | ~1,000+ brandColors     | High   |
| Prototypes            | 36 files       | ~500+ token uses        | Medium |
| Pages/Showcase        | 10 files       | ~200+ uses              | Low    |
| **Total**             | **~152 files** | **~2,500+ occurrences** |        |


---

## Phase 0: Reference (Primitive) Token Layer

### 0.1 Create Reference Token Definitions

Create new file: [src/tokens/colors/reference.ts](src/tokens/colors/reference.ts)

Mode-agnostic tonal scale values for each color family. These serve as the foundation that System and Component tokens reference.

```typescript
/**
 * Reference (Primitive) Color Tokens
 * 
 * Generated from Material Color Utilities tonal palettes.
 * Scale: 00 (lightest/white) → 100 (darkest/black)
 * Mode-agnostic — same values in light and dark themes.
 * 
 * SCSS map name: $rd-ref-color-map
 */

// Scale levels matching Dynamic Theme Generator
const REFERENCE_SCALES = ['00','10','20','30','40','50','60','70','80','85','90','100'];

// Scale-to-M3-tone mapping (design system scale → M3 tone)
// Design system: 00=lightest, 100=darkest
// M3 tones:      0=darkest,  100=lightest
const SCALE_TO_M3_TONE = {
  '00': 100,  // White
  '10': 96,   // Very light
  '20': 90,   // Light
  '30': 80,   // Light-medium
  '40': 70,   // Medium-light
  '50': 60,   // Medium
  '60': 40,   // Medium-dark (primary accent tone)
  '70': 30,   // Dark
  '80': 20,   // Darker
  '85': 15,   // Very dark
  '90': 10,   // Near black
  '100': 0,   // Black
};

export const referenceColors = {
  // 9 color families × 12 scales = 108 tokens + black/white = 110
  gray:   { '00': '#FFFFFF', '10': '#F6F8FA', '20': '#EAEDF2', /* ... */ '100': '#000000' },
  brand:  { '00': '#FFFFFF', '10': '#EBF2FD', '20': '#DEE8FA', /* ... */ '100': '#000000' },
  red:    { '00': '#FFFFFF', '10': '#FFEBEC', '20': '#FFD5D8', /* ... */ '100': '#000000' },
  purple: { '00': '#FFFFFF', '10': '#F3EDFE', '20': '#E6DBFD', /* ... */ '100': '#000000' },
  blue:   { '00': '#FFFFFF', '10': '#EBF2FD', '20': '#DEE8FA', /* ... */ '100': '#000000' },
  teal:   { '00': '#FFFFFF', '10': '#E5F9FB', '20': '#C8F3F7', /* ... */ '100': '#000000' },
  yellow: { '00': '#FFFFFF', '10': '#FFF8E5', '20': '#FFF0C7', /* ... */ '100': '#000000' },
  green:  { '00': '#FFFFFF', '10': '#E0F8EF', '20': '#B8F0DA', /* ... */ '100': '#000000' },
  orange: { '00': '#FFFFFF', '10': '#FFF0E8', '20': '#FFDCC8', /* ... */ '100': '#000000' },
  // Absolute tokens
  black: '#000000',
  white: '#FFFFFF',
};
```

### 0.2 Create Reference SCSS Map

Create new file: [src/styles/_tokens-reference.scss](src/styles/_tokens-reference.scss)

```scss
// Reference (Primitive) Tokens — Mode-agnostic
// Generated from Dynamic Theme Generator
$rd-ref-color-map: (
  'gray-00':   #ffffff,
  'gray-10':   #f6f8fa,
  'gray-20':   #eaedf2,
  // ... all 12 scales for all 9 families
  'black':     #000000,
  'white':     #ffffff,
);
```

---

## Phase 1: System Token Layer

### 1.1 Create System Token Definitions

Create new file: [src/tokens/colors/system.ts](src/tokens/colors/system.ts)

System tokens use **3 semantic groups** (not 7). Light and dark modes are generated with different M3 tone mappings from the same palettes.

```typescript
/**
 * System Color Tokens
 * 
 * 3 groups: background, content, border
 * Mode-aware: separate light and dark maps
 * 
 * SCSS map names: $rd-sys-color-map, $rd-sys-color-map-dark
 */
export const systemColors = {
  light: {
    // ================================================================
    // BACKGROUND (15 tokens) — Surfaces, fills, overlays
    // ================================================================
    'background-base':             '#FFFFFF',   // Main surface
    'background-raised':           '#FFFFFF',   // Elevated surface (cards)
    'background-sunken':           '#F6F8FA',   // Recessed surface
    'background-subtle':           '#EAEDF2',   // Subtle fill
    'background-inset':            '#C8CDD7',   // Inset/well
    'background-brand':            '#2770EF',   // Brand surface (EXACT source hex)
    'background-overlay':          '#484F5E',   // Scrim/overlay
    'background-base-inverse':     '#1D232F',   // Inverse base
    'background-raised-inverse':   '#282E3A',   // Inverse raised
    'background-success':          '#E0F8EF',   // Success surface
    'background-warning':          '#FFF8E5',   // Warning surface
    'background-failure':          '#FFEBEC',   // Failure surface
    'background-information':      '#DEE8FA',   // Information surface
    'background-ghost-hover':      '#F6F8FA',   // Ghost button hover
    'background-ghost-highlight':  '#EBF2FD',   // Ghost highlight / tertiary pressed

    // ================================================================
    // CONTENT (15 tokens) — Text, icons, links
    // ================================================================
    'content-primary':             '#1D232F',   // Primary text (~17:1 on white)
    'content-secondary':           '#6B7280',   // Secondary text (~6:1 on white, AA)
    'content-tertiary':            '#9CA3AF',   // Tertiary text (~4.5:1, AA minimum)
    'content-alternate':           '#FFFFFF',   // Text on brand/dark surfaces
    'content-brand':               '#2770EF',   // Brand text (palette tone 40, AA)
    'content-primary-inverse':     '#FFFFFF',   // Primary text on inverse
    'content-alternate-inverse':   '#1D232F',   // Dark text on inverse light
    'content-brand-inverse':       '#93B8F7',   // Brand on dark (palette tone 80)
    'content-success':             '#06BF7F',   // Success icon/text
    'content-warning':             '#FCC838',   // Warning icon/text
    'content-failure':             '#E22B3D',   // Failure icon/text
    'content-information':         '#2770EF',   // Information icon/text
    'content-link':                '#2770EF',   // Link text
    'content-link-inverse':        '#FFFFFF',   // Link on inverse
    'content-link-inverse-hover':  '#EAEDF2',   // Link hover on inverse

    // ================================================================
    // BORDER (12 tokens) — Outlines, dividers, strokes
    // ================================================================
    'border-default':              '#C8CDD7',   // Default border
    'border-hover':                '#9CA3AF',   // Hover border
    'border-divider':              '#EAEDF2',   // Divider/separator
    'border-brand':                '#2770EF',   // Brand border (palette tone 40)
    'border-warning':              '#FCC838',   // Warning border
    'border-failure':              '#E22B3D',   // Failure border
    'border-default-inverse':      '#484F5E',   // Inverse default border
    'border-hover-inverse':        '#6B7280',   // Inverse hover border
    'border-divider-inverse':      '#323946',   // Inverse divider
    'border-brand-inverse':        '#5B9AF3',   // Inverse brand border
    'border-focus':                '#5B9AF3',   // Focus ring
    'border-gap':                  '#FFFFFF',   // Gap/cutout (matches base)
  },

  dark: {
    // BACKGROUND — Dark mode uses inverted tones
    'background-base':             '#1A1C1E',   // gray tone 10
    'background-raised':           '#242628',   // gray tone 15
    'background-sunken':           '#111315',   // gray tone 6
    'background-subtle':           '#2C2F33',   // gray tone 20
    'background-inset':            '#3D4148',   // gray tone 30
    'background-brand':            '#93B8F7',   // brand tone 80 (lighter for visibility)
    'background-overlay':          '#E0E2E6',   // gray tone 90
    'background-base-inverse':     '#E0E2E6',   // gray tone 90
    'background-raised-inverse':   '#F0F1F3',   // gray tone 96
    'background-success':          '#1A4D36',   // green tone 30
    'background-warning':          '#4D3D1A',   // yellow tone 30
    'background-failure':          '#4D1A1F',   // red tone 30
    'background-information':      '#1A2D4D',   // blue tone 30
    'background-ghost-hover':      '#3D4148',   // gray tone 30
    'background-ghost-highlight':  '#1A2D4D',   // blue tone 30

    // CONTENT — Dark mode
    'content-primary':             '#E0E2E6',   // gray tone 90 (~15:1 on dark)
    'content-secondary':           '#9CA3AF',   // gray tone 60 (~5:1 on dark, AA)
    'content-tertiary':            '#7A828E',   // gray tone 50 (~3.5:1, AA Large)
    'content-alternate':           '#1A1C1E',   // Dark text on light surfaces
    'content-brand':               '#93B8F7',   // brand tone 80
    'content-primary-inverse':     '#1A1C1E',   // gray tone 10
    'content-alternate-inverse':   '#E0E2E6',   // gray tone 90
    'content-brand-inverse':       '#2770EF',   // brand tone 40
    'content-success':             '#5DD9A8',   // green tone 70
    'content-warning':             '#FDDA6B',   // yellow tone 70
    'content-failure':             '#F07078',   // red tone 70
    'content-information':         '#6BA3F5',   // blue tone 70
    'content-link':                '#93B8F7',   // brand tone 80
    'content-link-inverse':        '#E0E2E6',   // gray tone 90
    'content-link-inverse-hover':  '#C8CDD7',   // gray tone 80

    // BORDER — Dark mode
    'border-default':              '#7A828E',   // neutralVariant tone 50
    'border-hover':                '#9CA3AF',   // neutralVariant tone 60
    'border-divider':              '#3D4148',   // neutralVariant tone 30
    'border-brand':                '#6BA3F5',   // brand tone 70
    'border-warning':              '#FDDA6B',   // yellow tone 70
    'border-failure':              '#F07078',   // red tone 70
    'border-default-inverse':      '#5C6370',   // neutralVariant tone 70
    'border-hover-inverse':        '#9CA3AF',   // neutralVariant tone 60
    'border-divider-inverse':      '#C8CDD7',   // neutralVariant tone 80
    'border-brand-inverse':        '#2770EF',   // brand tone 40
    'border-focus':                '#5B9AF3',   // brand tone 60
    'border-gap':                  '#1A1C1E',   // gray tone 10 (matches dark base)
  },
};
```

### 1.2 Create System SCSS Maps

Create new file: [src/styles/_tokens-system.scss](src/styles/_tokens-system.scss)

```scss
// System Tokens — Light Mode
$rd-sys-color-map: (
  'background-base':            #ffffff,
  'background-raised':          #ffffff,
  'background-sunken':          #f6f8fa,
  // ... all 42 tokens
);

// System Tokens — Dark Mode
$rd-sys-color-map-dark: (
  'background-base':            #1a1c1e,
  'background-raised':          #242628,
  'background-sunken':          #111315,
  // ... all 42 tokens
);
```

### 1.3 Update CSS Variables (generated from SCSS maps)

Modify: [src/styles/tokens.css](src/styles/tokens.css)

```css
:root {
  /* Background */
  --rd-sys-color-background-base: #ffffff;
  --rd-sys-color-background-raised: #ffffff;
  --rd-sys-color-background-sunken: #f6f8fa;
  --rd-sys-color-background-subtle: #eaedf2;
  --rd-sys-color-background-inset: #c8cdd7;
  --rd-sys-color-background-brand: #2770ef;
  --rd-sys-color-background-overlay: #484f5e;
  /* ... all background, content, border tokens */
}

[data-theme="dark"] {
  --rd-sys-color-background-base: #1a1c1e;
  --rd-sys-color-background-raised: #242628;
  /* ... all dark overrides */
}
```

### 1.4 Create Token Mapping Reference

Create: [src/tokens/migration-map.ts](src/tokens/migration-map.ts)

```typescript
export const tokenMigrationMap = {
  // CSS Variable migrations (old → new)
  '--color-bg-primary':        '--rd-sys-color-background-base',
  '--color-bg-secondary':      '--rd-sys-color-background-sunken',
  '--color-primary':           '--rd-sys-color-background-brand',
  '--color-primary-hover':     '--rd-comp-color-button-primary-hover',
  '--color-text-default':      '--rd-sys-color-content-primary',
  '--color-text-secondary':    '--rd-sys-color-content-secondary',
  '--color-border-default':    '--rd-sys-color-border-default',
  '--color-divider':           '--rd-sys-color-border-divider',
  
  // TypeScript mappings
  'brandColors.white':         'systemColors.light["background-base"]',
  'brandColors.gray[10]':      'systemColors.light["background-sunken"]',
  'brandColors.gray[90]':      'systemColors.light["background-base-inverse"]',
  'brandColors.blue[60]':      'systemColors.light["content-brand"]',
};
```

---

## Phase 2: Component Token Layer

### 2.1 Create Component Token Definitions

Create new file: [src/tokens/colors/component.ts](src/tokens/colors/component.ts)

Component tokens provide per-component color values, decoupling components from system tokens for flexibility.

```typescript
/**
 * Component Color Tokens
 * 
 * Per-component tokens for button, chip, toggle.
 * Mode-aware: separate light and dark maps.
 * 
 * SCSS map names: $rd-comp-color-map, $rd-comp-color-map-dark
 */
export const componentColors = {
  light: {
    // BUTTON (11 tokens)
    'button-primary-default':            '#2770EF',  // EXACT source hex
    'button-primary-hover':              '#1D5AC0',  // brand tone 30
    'button-primary-pressed':            '#143D80',  // brand tone 20
    'button-primary-on-color-default':   '#FFFFFF',
    'button-primary-on-color-hover':     '#DEE8FA',  // blue scale 20
    'button-primary-on-color-pressed':   '#B0C9F5',  // blue scale 30
    'button-secondary-default':          '#EAEDF2',  // gray scale 20
    'button-secondary-hover':            '#DBDFE7',  // gray scale 30
    'button-secondary-pressed':          '#DEE8FA',  // blue scale 20
    'button-tertiary-hover':             '#C8CDD7',  // gray scale 40 (12% alpha)
    'button-tertiary-pressed':           '#9CA3AF',  // gray scale 50 (12% alpha)

    // CHIP — Attribute (blue/brand, 6 tokens)
    'chip-loading-default':              '#F6F8FA',
    'chip-attribute-default':            '#DEE8FA',
    'chip-attribute-hover':              '#B0C9F5',
    'chip-attribute-pressed':            '#7EAAF0',
    'chip-attribute-icon':               '#2770EF',
    'chip-attribute-active-border':      '#B0C9F5',

    // CHIP — Measure (green, 5 tokens)
    'chip-measure-default':              '#E0F8EF',
    'chip-measure-hover':                '#B8F0DA',
    'chip-measure-pressed':              '#7DE4BF',
    'chip-measure-icon':                 '#06BF7F',
    'chip-measure-active-border':        '#B8F0DA',

    // CHIP — Filter (gray, 5 tokens)
    'chip-filter-default':               '#EAEDF2',
    'chip-filter-hover':                 '#DBDFE7',
    'chip-filter-pressed':               '#C8CDD7',
    'chip-filter-icon':                  '#6B7280',
    'chip-filter-active-border':         '#DBDFE7',

    // CHIP — Date (purple, 5 tokens)
    'chip-date-default':                 '#E6DBFD',
    'chip-date-hover':                   '#CDB8FB',
    'chip-date-pressed':                 '#B094F8',
    'chip-date-icon':                    '#8C62F5',
    'chip-date-active-border':           '#CDB8FB',

    // CHIP — Input (gray with selection, 6 tokens)
    'chip-input-default':                '#FFFFFF',
    'chip-input-hover':                  '#F6F8FA',
    'chip-input-pressed':                '#EAEDF2',
    'chip-input-selected-default':       '#484F5E',
    'chip-input-selected-hover':         '#5C6370',
    'chip-input-selected-pressed':       '#6B7280',

    // CHIP — Error (red, 3 tokens)
    'chip-error-default':                '#FFEBEC',
    'chip-error-hover':                  '#FFD5D8',
    'chip-error-active-border':          '#DBDFE7',

    // TOGGLE (5 tokens)
    'toggle-track-off':                  '#C8CDD7',
    'toggle-track-on':                   '#B0C9F5',
    'toggle-thumb-off':                  '#FFFFFF',
    'toggle-thumb-on':                   '#2770EF',
    'toggle-thumb-outline-off':          '#DBDFE7',
  },

  dark: {
    // BUTTON — Dark mode uses inverted tones
    'button-primary-default':            '#93B8F7',  // brand tone 80
    'button-primary-hover':              '#6BA3F5',  // brand tone 70
    'button-primary-pressed':            '#5B9AF3',  // brand tone 60
    // ... all dark component tokens
    // (Generated by Dynamic Theme Generator with isDark=true)
  },
};
```

### 2.2 Create Component SCSS Maps

Create new file: [src/styles/_tokens-component.scss](src/styles/_tokens-component.scss)

```scss
// Component Tokens — Light Mode
$rd-comp-color-map: (
  'button-primary-default':   #2770ef,
  'button-primary-hover':     #1d5ac0,
  // ... all ~40 component tokens
);

// Component Tokens — Dark Mode
$rd-comp-color-map-dark: (
  'button-primary-default':   #93b8f7,
  'button-primary-hover':     #6ba3f5,
  // ... all ~40 component tokens
);
```

---

## Phase 3: Component CSS Module Updates

### 3.1 High-Impact Components


| Component                                                                   | Occurrences | Priority |
| --------------------------------------------------------------------------- | ----------- | -------- |
| [DatePicker.module.css](src/components/DatePicker/DatePicker.module.css)    | 48          | P0       |
| [Menu.module.css](src/components/Menu/Menu.module.css)                      | 27          | P0       |
| [Modal.module.css](src/components/Modal/Modal.module.css)                   | 26          | P0       |
| [Pagination.module.css](src/components/Pagination/Pagination.module.css)    | 20          | P1       |
| [IconGallery.module.css](src/components/IconGallery/IconGallery.module.css) | 19          | P1       |


**Find/Replace patterns for CSS modules:**

```
var(--color-bg-primary)      → var(--rd-sys-color-background-base)
var(--color-bg-secondary)    → var(--rd-sys-color-background-sunken)
var(--color-bg-tertiary)     → var(--rd-sys-color-background-subtle)
var(--color-text-default)    → var(--rd-sys-color-content-primary)
var(--color-text-secondary)  → var(--rd-sys-color-content-secondary)
var(--color-text-inverse)    → var(--rd-sys-color-content-alternate)
var(--color-primary)         → var(--rd-sys-color-background-brand)
var(--color-border-default)  → var(--rd-sys-color-border-default)
var(--color-divider)         → var(--rd-sys-color-border-divider)
var(--color-link)            → var(--rd-sys-color-content-link)
var(--color-success)         → var(--rd-sys-color-content-success)
var(--color-warning)         → var(--rd-sys-color-content-warning)
var(--color-failure)         → var(--rd-sys-color-content-failure)
```

**Component-specific tokens (new — use rd-comp layer):**

```
/* Button-specific colors now come from component layer */
var(--color-primary-hover)   → var(--rd-comp-color-button-primary-hover)
var(--color-primary-active)  → var(--rd-comp-color-button-primary-pressed)

/* Chip-specific colors */
var(--chip-bg-attribute)     → var(--rd-comp-color-chip-attribute-default)
```

### 3.2 Remaining 35 Component CSS Modules

Apply same find/replace patterns across all remaining component CSS files.

---

## Phase 4: TypeScript Token Migration

### 4.1 Update Token Export Structure

Modify: [src/tokens/colors/index.ts](src/tokens/colors/index.ts)

```typescript
// New 3-layer exports
export { referenceColors } from './reference';
export { systemColors } from './system';
export { componentColors } from './component';
export type { SystemColorKey, ComponentColorKey } from './system';

// Deprecated (to be removed after migration)
/** @deprecated Use systemColors instead */
export { brandColors } from './brand';
/** @deprecated Use systemColors instead */
export { aliasColors } from './alias';
```

### 4.2 Component TypeScript Updates

**Files using TypeScript token imports (6 components + 48 icons):**


| File                                                 | Current Import                          | New Import                                        |
| ---------------------------------------------------- | --------------------------------------- | ------------------------------------------------- |
| [Alert.tsx](src/components/Alert/Alert.tsx)          | `statusColors, backgroundColors`        | `systemColors.light['background-success']`, etc.  |
| [Chip.tsx](src/components/Chip/Chip.tsx)             | `componentColors, textColors`           | `componentColors.light['chip-attribute-*']`, etc. |
| [Checkbox.tsx](src/components/Checkbox/Checkbox.tsx) | `componentColors, statusColors`         | `systemColors.light['border-brand']`, etc.        |
| [Radio.tsx](src/components/Radio/Radio.tsx)          | `componentColors, statusColors`         | `systemColors.light['border-brand']`, etc.        |
| [Tabs.tsx](src/components/Tabs/Tabs.tsx)             | `brandColors`                           | `systemColors.light['background-brand']`          |
| [icons/index.tsx](src/components/icons/index.tsx)    | `statusColors, textColors, brandColors` | `systemColors.light['content-primary']`, etc.     |


---

## Phase 5: Prototype Migration

### 5.1 Update Centralized Style Files


| Prototype     | Style File                                          | Approach                                                  |
| ------------- | --------------------------------------------------- | --------------------------------------------------------- |
| Cmdk          | [styles.ts](src/prototypes/Cmdk/styles.ts)          | Map `colors` object to `systemColors` + `componentColors` |
| Liveboard     | [styles.ts](src/prototypes/Liveboard/styles.ts)     | Update color mappings to 3-layer structure                |
| AdminGroups   | [styles.ts](src/prototypes/AdminGroups/styles.ts)   | Replace brandColors with systemColors                     |
| SpotterMemory | [styles.ts](src/prototypes/SpotterMemory/styles.ts) | Replace brandColors with systemColors                     |


### 5.2 Update Direct Token Imports

~28 prototype files import `brandColors` directly. Each needs updating:

```typescript
// Before
import { brandColors } from '../../tokens/colors/brand';
style={{ backgroundColor: brandColors.gray[10] }}

// After  
import { systemColors } from '../../tokens/colors/system';
style={{ backgroundColor: systemColors.light['background-sunken'] }}
```

---

## Phase 6: Pages and Showcase Updates

Update documentation/showcase pages:

- [ColorSystemPage.tsx](src/pages/ColorSystemPage.tsx) — Display new 3-layer token architecture
- [ArchitectureShowcase.tsx](src/pages/ArchitectureShowcase.tsx) — Show Reference → System → Component flow
- [ComponentDocPage.tsx](src/pages/ComponentDocPage.tsx) — Update documentation with new token names
- [IconsShowcase.tsx](src/pages/IconsShowcase.tsx) — Update color references

---

## Phase 7: Documentation, Testing, and Cleanup

### 7.1 Update Token Usage Guide

Modify: [.cursor/rules/token-usage.md](.cursor/rules/token-usage.md)

Document:

- 3-layer architecture (Reference → System → Component)
- New naming convention (`background/content/border` groups)
- When to use system vs component tokens
- SCSS map usage patterns

### 7.2 Deprecation Cleanup

After migration verification:

- Remove deprecated exports from [src/tokens/colors/index.ts](src/tokens/colors/index.ts)
- Delete [src/tokens/migration-map.ts](src/tokens/migration-map.ts)
- Remove old `brand.ts`, `alias.ts`, `mapped.ts` files
- Update README files

### 7.3 WCAG Contrast Verification

Using the generator's built-in contrast checking approach:

- `content-primary` on `background-base`: must be ≥ 4.5:1 (AA)
- `content-secondary` on `background-base`: must be ≥ 4.5:1 (AA)
- `content-brand` on `background-base`: must be ≥ 4.5:1 (AA)
- `content-alternate` on `background-brand`: must be ≥ 4.5:1 (AA)
- Repeat all checks for dark mode

---

## New Token Structure Reference

```
3-LAYER TOKEN ARCHITECTURE
===========================

Layer 1: rd-ref-color- (Primitives, mode-agnostic)
├── gray-{00..100}
├── brand-{00..100}
├── red-{00..100}
├── purple-{00..100}
├── blue-{00..100}
├── teal-{00..100}
├── yellow-{00..100}
├── green-{00..100}
├── orange-{00..100}
├── black
└── white
    Total: ~110 tokens

Layer 2: rd-sys-color- (System, mode-aware)
├── background-
│   ├── base, raised, sunken, subtle, inset
│   ├── brand, overlay
│   ├── base-inverse, raised-inverse
│   ├── success, warning, failure, information
│   └── ghost-hover, ghost-highlight
├── content-
│   ├── primary, secondary, tertiary, alternate
│   ├── brand
│   ├── primary-inverse, alternate-inverse, brand-inverse
│   ├── success, warning, failure, information
│   └── link, link-inverse, link-inverse-hover
└── border-
    ├── default, hover, divider
    ├── brand, warning, failure
    ├── default-inverse, hover-inverse, divider-inverse
    ├── brand-inverse
    └── focus, gap
    Total: 42 tokens × 2 modes = 84 tokens

Layer 3: rd-comp-color- (Component, mode-aware)
├── button-
│   ├── primary-default, primary-hover, primary-pressed
│   ├── primary-on-color-default, -hover, -pressed
│   ├── secondary-default, -hover, -pressed
│   └── tertiary-hover, -pressed
├── chip-
│   ├── loading-default
│   ├── attribute-default, -hover, -pressed, -icon, -active-border
│   ├── measure-default, -hover, -pressed, -icon, -active-border
│   ├── filter-default, -hover, -pressed, -icon, -active-border
│   ├── date-default, -hover, -pressed, -icon, -active-border
│   ├── input-default, -hover, -pressed, -selected-default, -selected-hover, -selected-pressed
│   └── error-default, -hover, -active-border
└── toggle-
    ├── track-off, track-on
    └── thumb-off, thumb-on, thumb-outline-off
    Total: ~41 tokens × 2 modes = 82 tokens

GRAND TOTAL: ~110 + 84 + 82 = ~276 tokens
```

---

## Effort Estimate


| Phase                           | Files    | Est. Hours | Risk   |
| ------------------------------- | -------- | ---------- | ------ |
| 0. Reference Token Layer        | 2        | 2-3h       | Low    |
| 1. System Token Layer           | 4        | 4-6h       | Medium |
| 2. Component Token Layer        | 2        | 3-4h       | Medium |
| 3. CSS Module Updates           | 40       | 6-8h       | Low    |
| 4. TypeScript Components        | 54       | 8-10h      | Medium |
| 5. Prototype Migration          | 36       | 6-8h       | Low    |
| 6. Pages/Documentation          | 10       | 2-3h       | Low    |
| 7. Testing/Verification/Cleanup | -        | 5-7h       | High   |
| **Total**                       | **~152** | **36-49h** |        |


**Calendar Estimate:** 5-6 working days for a single developer

---

## Risk Mitigation

- **Visual regression**: Run side-by-side comparison before/after each phase
- **Missing mappings**: Use migration-map.ts as single source of truth for all renames
- **Dark mode breakage**: Test both themes after each phase; use generator's contrast checker
- **Build failures**: Run TypeScript compilation after each major change
- **Component token drift**: Use Dynamic Theme Generator to regenerate component tokens when brand color changes
- **WCAG compliance**: Validate contrast ratios for all content-on-background pairs using generator's accessibility check

---

## Migration Verification Checklist

- All CSS `var(--color-*)` replaced with `var(--rd-sys-color-*)` or `var(--rd-comp-color-*)`
- All `brandColors.*` imports replaced with `systemColors.*` or `componentColors.*`
- Reference tokens (`rd-ref-color-*`) are mode-agnostic and consistent
- System tokens exist for both light and dark in SCSS maps
- Component tokens exist for both light and dark in SCSS maps
- Light theme renders correctly
- Dark theme renders correctly with automatic token switching
- WCAG AA contrast ratios pass for all content-on-background pairs
- No TypeScript errors
- No console warnings about undefined tokens
- Visual regression tests pass
- Dynamic Theme Generator output matches codebase tokens

