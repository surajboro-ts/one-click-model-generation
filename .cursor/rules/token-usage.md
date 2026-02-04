---
description: Design token usage guidance for Radiant components and prototypes
globs: ["src/**/*.tsx", "src/**/*.ts", "src/**/*.css"]
---

# Radiant Design Token Usage Guide

**NEVER hard-code colors, spacing, typography, or other visual values.** Always use design tokens.

## Token Hierarchy

```
Brand Tokens (primitives) → Semantic Tokens → Component Tokens
     ↓                           ↓                  ↓
  brandColors              statusColors        componentSpacing
  (raw values)          (usage context)      (component-specific)
```

---

## Color Tokens

### Import Path
```typescript
import { brandColors } from '../../tokens/colors/brand';
import { statusColors, textColors, backgroundColors } from '../../tokens/colors';
```

### Brand Colors (primitives)

Use for custom styling when semantic tokens don't apply:

| Scale | Usage | Example |
|-------|-------|---------|
| `brandColors.blue[60]` | Primary brand color | `#2770EF` |
| `brandColors.gray[90]` | Default text | `#1D232F` |
| `brandColors.gray[60]` | Secondary text | `#777E8B` |
| `brandColors.gray[50]` | Disabled/placeholder | `#A5ACB9` |
| `brandColors.gray[20]` | Borders, dividers | `#EAEDF2` |
| `brandColors.gray[10]` | Page background | `#F6F8FA` |
| `brandColors.white` | Card/surface background | `#FFFFFF` |

### Color Scale Reference (10-100)

| Shade | Blue | Gray | Green | Red | Yellow |
|-------|------|------|-------|-----|--------|
| 100 | Darkest | `#000000` | Darkest | Darkest | Darkest |
| 90 | Dark | `#1D232F` (text) | Dark | Dark | Dark |
| 70 | Medium-dark | `#4A515E` | Medium | Medium | Medium |
| 60 | **Primary** | `#777E8B` (muted text) | **Success** | **Error** | **Warning** |
| 50 | Medium | `#A5ACB9` (disabled) | Medium-light | Medium | Medium |
| 40 | Light | `#C0C6CF` (borders) | Light | Light | Light |
| 20 | Very light | `#EAEDF2` (dividers) | Very light | Very light | Very light |
| 10 | Lightest | `#F6F8FA` (bg) | Background | Background | Background |

### Status Colors

Use for feedback states:

```typescript
// Success states
backgroundColor: brandColors.green[10]  // Light green background
color: brandColors.green[60]            // Green text/icon

// Warning states
backgroundColor: brandColors.yellow[10]
color: brandColors.yellow[70]           // Darker for contrast

// Error states
backgroundColor: brandColors.red[10]
color: brandColors.red[60]

// Info states
backgroundColor: brandColors.blue[10]
color: brandColors.blue[60]
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

// Button padding
componentSpacing.button.medium.paddingX  // 16px
componentSpacing.button.medium.paddingY  // 8px

// Modal spacing
componentSpacing.modal.padding           // 24px
componentSpacing.modal.headerPaddingY    // 20px

// Form spacing
componentSpacing.form.fieldGap           // 20px between fields
componentSpacing.form.sectionGap         // 32px between sections

// Page layout
componentSpacing.page.paddingX           // 24px
componentSpacing.page.sectionGap         // 32px
```

---

## Typography Tokens

### Import Path
```typescript
import { fontFamily, fontSize, fontWeight, lineHeight, v2TextStyles } from '../../tokens/typography';
```

### Font Family
```typescript
fontFamily.primary  // "Plain" font stack
fontFamily.mono     // "SF Mono" font stack for code
```

### V2 Text Styles (Recommended)

Use these composite styles for consistent typography:

```typescript
import { v2TextStyles } from '../../tokens/typography';

// Page titles
style={{ ...v2TextStyles.pageTitle }}    // 24px, semibold

// Modal titles
style={{ ...v2TextStyles.modalTitle }}   // 20px, medium

// Section headers
style={{ ...v2TextStyles.sectionLabel }} // 18px, medium

// Content labels
style={{ ...v2TextStyles.contentLabel }} // 16px, medium

// Body text
style={{ ...v2TextStyles.bodyNormal }}   // 14px, regular

// Small text
style={{ ...v2TextStyles.footnote }}     // 12px, regular
style={{ ...v2TextStyles.caption }}      // 12px, regular

// Uppercase labels
style={{ ...v2TextStyles.overline }}     // 12px, uppercase, wider tracking
```

### Font Size Scale

| Token | Size | Use Case |
|-------|------|----------|
| `fontSize.xs` | 12px | Footnotes, captions, overlines |
| `fontSize.sm` | 14px | Body text, labels |
| `fontSize.md` | 16px | Large body, content labels |
| `fontSize.lg` | 18px | Section labels |
| `fontSize.xl` | 20px | Modal titles |
| `fontSize['2xl']` | 24px | Page titles |
| `fontSize['3xl']` | 32px | Headlines |

### Font Weight

| Token | Weight | Use Case |
|-------|--------|----------|
| `fontWeight.light` | 375 | Body text |
| `fontWeight.regular` | 400 | Default |
| `fontWeight.medium` | 500 | Labels, buttons |
| `fontWeight.semibold` | 600 | Titles, headings |

---

## CSS Variables vs TypeScript Imports

### Use CSS Variables in CSS Modules

```css
/* ComponentName.module.css */
.container {
  color: var(--color-text-default);
  background-color: var(--color-bg-surface);
  padding: var(--spacing-4);
  border-radius: var(--radius-md);
}
```

### Use TypeScript Imports in Inline Styles

```typescript
// For prototype styling
import { brandColors } from '../../tokens/colors/brand';
import { spacing } from '../../tokens/spacing';

const styles = {
  container: {
    backgroundColor: brandColors.gray[10],
    padding: `${spacing.F}px`,
    borderRadius: '6px',
  },
};
```

### When to Use Each

| Scenario | Use |
|----------|-----|
| CSS Module files | CSS Variables (`var(--...)`) |
| Inline styles in prototypes | TypeScript imports |
| Dynamic/conditional values | TypeScript imports |
| Theme-aware styling | CSS Variables |

---

## Common Token Combinations

### Card Container
```typescript
const cardStyle = {
  backgroundColor: brandColors.white,
  border: `1px solid ${brandColors.gray[20]}`,
  borderRadius: '8px',
  padding: `${spacing.F}px`,  // 24px
};
```

### Modal Container
```typescript
const modalStyle = {
  backgroundColor: brandColors.white,
  borderRadius: '6px',
  boxShadow: '0px 24px 32px rgba(25, 35, 49, 0.16)',
  padding: `${spacing.F}px`,
};
```

### Form Field Group
```typescript
const fieldGroupStyle = {
  marginBottom: `${spacing.E}px`,  // 20px
};

const labelStyle = {
  ...v2TextStyles.contentLabelSubhead,
  color: brandColors.gray[90],
  marginBottom: `${spacing.B}px`,  // 8px
};
```

### Page Layout
```typescript
const pageStyle = {
  backgroundColor: brandColors.gray[10],
  padding: `${spacing.F}px ${spacing.H}px`,  // 24px 32px
  minHeight: '100vh',
};

const contentStyle = {
  backgroundColor: brandColors.white,
  borderRadius: '8px',
  padding: `${spacing.F}px`,
};
```

### Table Row
```typescript
const rowStyle = {
  borderBottom: `1px solid ${brandColors.gray[20]}`,
  padding: `${spacing.C}px ${spacing.D}px`,  // 12px 16px
};
```

### Status Badge
```typescript
const successBadge = {
  backgroundColor: brandColors.green[10],
  color: brandColors.green[60],
  padding: `${spacing.A}px ${spacing.B}px`,  // 4px 8px
  borderRadius: '4px',
};
```

---

## Anti-Patterns (NEVER DO)

```typescript
// BAD - Hard-coded values
{
  color: '#1D232F',           // Use brandColors.gray[90]
  padding: '16px',            // Use `${spacing.D}px`
  fontSize: '14px',           // Use fontSize.sm
  backgroundColor: '#F6F8FA', // Use brandColors.gray[10]
}

// GOOD - Token usage
{
  color: brandColors.gray[90],
  padding: `${spacing.D}px`,
  fontSize: `${fontSize.sm}px`,
  backgroundColor: brandColors.gray[10],
}
```
