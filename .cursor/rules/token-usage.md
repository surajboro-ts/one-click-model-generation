---
description: Design token usage guidance for Radiant components and prototypes
globs: ["src/**/*.tsx", "src/**/*.ts", "src/**/*.css"]
---

# Radiant Design Token Usage Guide

**NEVER hard-code colors, spacing, typography, or other visual values.** Always use design tokens.

## Token Hierarchy (3-Layer Architecture)

```
Reference Tokens (primitives) → System Tokens (semantic) → Component Tokens
     ↓                              ↓                          ↓
  referenceColors              systemColors              rdComponentColors
  (mode-agnostic)           (mode-aware light/dark)    (per-component colors)
```

---

## Color Tokens

### Import Path
```typescript
import { systemColors, referenceColors, rdComponentColors } from '../../tokens/colors';
```

### System Colors (preferred for most uses)

Mode-aware tokens organized into 3 groups:

| Group | Example Token | Light Value | Usage |
|-------|--------------|-------------|-------|
| **background-base** | `systemColors.light['background-base']` | `#FFFFFF` | Page/card surfaces |
| **background-sunken** | `systemColors.light['background-sunken']` | `#F6F8FA` | Page background |
| **background-subtle** | `systemColors.light['background-subtle']` | `#EAEDF2` | Muted fills |
| **background-brand** | `systemColors.light['background-brand']` | `#2770EF` | Primary brand bg |
| **content-primary** | `systemColors.light['content-primary']` | `#1D232F` | Default text |
| **content-secondary** | `systemColors.light['content-secondary']` | `#777E8B` | Secondary text |
| **content-tertiary** | `systemColors.light['content-tertiary']` | `#A5ACB9` | Disabled/placeholder |
| **content-brand** | `systemColors.light['content-brand']` | `#2770EF` | Brand text/links |
| **content-success** | `systemColors.light['content-success']` | `#06BF7F` | Success text |
| **content-failure** | `systemColors.light['content-failure']` | `#E22B3D` | Error text |
| **border-default** | `systemColors.light['border-default']` | `#C0C6CF` | Default borders |
| **border-divider** | `systemColors.light['border-divider']` | `#EAEDF2` | Dividers |
| **border-focus** | `systemColors.light['border-focus']` | `#2770EF` | Focus rings |

### Reference Colors (primitives)

Mode-agnostic tonal scales for custom styling:

```typescript
referenceColors.gray['90']    // #1D232F
referenceColors.brand['60']   // #2770EF
referenceColors.red['60']     // #E22B3D
referenceColors.purple['60']  // #8C62F5
referenceColors.black          // #000000
referenceColors.white          // #FFFFFF
```

### Component Colors

Per-component tokens:
```typescript
rdComponentColors.light['button-primary-default']   // #2770EF
rdComponentColors.light['button-primary-hover']      // #2359B6
rdComponentColors.light['toggle-track-on']           // #2770EF
rdComponentColors.light['chip-attribute-default']    // #DEE8FA
```

### Status Colors

```typescript
// Success
backgroundColor: systemColors.light['background-success']   // #E0F8EF
color: systemColors.light['content-success']                 // #06BF7F

// Warning
backgroundColor: systemColors.light['background-warning']    // #FFF8E5
color: systemColors.light['content-warning']                 // #FCC838

// Error
backgroundColor: systemColors.light['background-failure']    // #FFEBEC
color: systemColors.light['content-failure']                 // #E22B3D

// Info
backgroundColor: systemColors.light['background-information'] // #DEE8FA
color: systemColors.light['content-information']              // #2770EF
```

---

## Spacing Tokens

### Import Path
```typescript
import { spacing, componentSpacing } from '../../tokens/spacing';
```

### Named Spacing Scale (A-N)

| Token | Value | Use Case |
|-------|-------|----------|
| `spacing.A` | 4px | Tight gaps, icon margins |
| `spacing.B` | 8px | Default gap, chip padding |
| `spacing.C` | 12px | Button padding, input padding |
| `spacing.D` | 16px | Card gap, section spacing |
| `spacing.E` | 20px | Modal header padding |
| `spacing.F` | 24px | Card padding, page margins |
| `spacing.G` | 28px | Large gaps |
| `spacing.H` | 32px | Section separators |
| `spacing.I` | 40px | Large section gaps |
| `spacing.J` | 48px | Page section spacing |

### Semantic Spacing Aliases

```typescript
spacing.xs   // 8px  - tight
spacing.sm   // 12px - small
spacing.md   // 16px - medium (default)
spacing.lg   // 24px - large
spacing.xl   // 32px - extra large
```

### Component-Specific Spacing

```typescript
import { componentSpacing } from '../../tokens/spacing';

componentSpacing.button.medium.paddingX  // 16px
componentSpacing.modal.padding           // 24px
componentSpacing.form.fieldGap           // 20px
componentSpacing.page.paddingX           // 24px
```

---

## Typography Tokens

### Import Path
```typescript
import { fontFamily, fontSize, fontWeight, lineHeight, v2TextStyles } from '../../tokens/typography';
```

### V2 Text Styles (Recommended)

```typescript
import { v2TextStyles } from '../../tokens/typography';

style={{ ...v2TextStyles.pageTitle }}    // 24px, semibold
style={{ ...v2TextStyles.modalTitle }}   // 20px, medium
style={{ ...v2TextStyles.sectionLabel }} // 18px, medium
style={{ ...v2TextStyles.contentLabel }} // 16px, medium
style={{ ...v2TextStyles.bodyNormal }}   // 14px, regular
style={{ ...v2TextStyles.footnote }}     // 12px, regular
style={{ ...v2TextStyles.overline }}     // 12px, uppercase
```

---

## CSS Variables vs TypeScript Imports

### Use CSS Variables in CSS Modules

```css
/* ComponentName.module.css */
.container {
  color: var(--rd-sys-color-content-primary);
  background-color: var(--rd-sys-color-background-base);
  border: 1px solid var(--rd-sys-color-border-divider);
  padding: var(--spacing-4);
  border-radius: var(--radius-md);
}

.button {
  background-color: var(--rd-comp-color-button-primary-default);
  color: var(--rd-comp-color-button-primary-on-color-default);
}
```

### Use TypeScript Imports in Inline Styles

```typescript
import { systemColors, referenceColors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';

const styles = {
  container: {
    backgroundColor: systemColors.light['background-sunken'],
    padding: `${spacing.F}px`,
    borderRadius: '6px',
  },
};
```

### When to Use Each

| Scenario | Use |
|----------|-----|
| CSS Module files | CSS Variables (`var(--rd-sys-color-...)`) |
| Inline styles in prototypes | TypeScript imports (`systemColors.light[...]`) |
| Dynamic/conditional values | TypeScript imports |
| Theme-aware styling | CSS Variables (automatically switch with theme) |

---

## Common Token Combinations

### Card Container
```typescript
const cardStyle = {
  backgroundColor: systemColors.light['background-base'],
  border: `1px solid ${systemColors.light['border-divider']}`,
  borderRadius: '8px',
  padding: `${spacing.F}px`,
};
```

### Page Layout
```typescript
const pageStyle = {
  backgroundColor: systemColors.light['background-sunken'],
  padding: `${spacing.F}px ${spacing.H}px`,
  minHeight: '100vh',
};
```

### Form Field Label
```typescript
const labelStyle = {
  ...v2TextStyles.contentLabelSubhead,
  color: systemColors.light['content-primary'],
  marginBottom: `${spacing.B}px`,
};
```

### Status Badge
```typescript
const successBadge = {
  backgroundColor: systemColors.light['background-success'],
  color: systemColors.light['content-success'],
  padding: `${spacing.A}px ${spacing.B}px`,
  borderRadius: '4px',
};
```

---

## Anti-Patterns (NEVER DO)

```typescript
// BAD - Hard-coded values
{
  color: '#1D232F',
  backgroundColor: '#F6F8FA',
}

// BAD - Old token imports (deprecated)
import { brandColors } from '../../tokens/colors/brand';
{
  color: brandColors.gray[90],
  backgroundColor: brandColors.gray[10],
}

// GOOD - New token system
import { systemColors } from '../../tokens/colors';
{
  color: systemColors.light['content-primary'],
  backgroundColor: systemColors.light['background-sunken'],
}
```
