# Design Tokens

This directory contains all design tokens derived from the Figma design system. The tokens follow a **3-tier architecture** that enables scalability, maintainability, and theme support.

## Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   BRAND LAYER   │ ──► │   ALIAS LAYER   │ ──► │  MAPPED LAYER   │
│  (Primitives)   │     │   (Semantic)    │     │  (Components)   │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

### 1. Brand/Primitive Tokens
Raw values with no semantic meaning. These should NOT be used directly in components.

```typescript
import { brandColors } from './colors/brand';

// Example: brandColors.blue[60] → '#2770EF'
```

### 2. Alias/Semantic Tokens
Purpose-driven tokens that give meaning to raw values.

```typescript
import { aliasColors } from './colors/alias';

// Example: aliasColors.semantic.success.default → '#06BF7F'
```

### 3. Mapped/Component Tokens
Component-specific tokens with theme support.

```typescript
import { lightThemeColors, darkThemeColors } from './colors/mapped';

// Example: lightThemeColors.button.primary.background → '#2770EF'
```

## File Structure

```
tokens/
├── colors/
│   ├── brand.ts      # Raw color values (primitives)
│   ├── alias.ts      # Semantic color mappings
│   ├── mapped.ts     # Component-level color mappings
│   ├── charts.ts     # Data visualization colors
│   └── index.ts      # Color exports
├── typography.ts     # Font family, sizes, weights, text styles
├── spacing.ts        # Spacing scale and component spacing
├── radius.ts         # Border radius values
├── shadows.ts        # Shadow and elevation tokens
├── borders.ts        # Border width and style tokens
├── animation.ts      # Duration, easing, transitions
├── breakpoints.ts    # Responsive breakpoints
├── zIndex.ts         # Layering/stacking tokens
├── css-variables.ts  # CSS custom properties generator
├── theme.ts          # Theme utilities
└── index.ts          # Main exports
```

## Usage

### Import All Tokens

```typescript
import tokens from './tokens';

// Access any token
tokens.colors.brand.blue[60];
tokens.typography.body.normal;
tokens.spacing.scale.md;
```

### Import Specific Tokens

```typescript
import { brandColors, aliasColors } from './tokens/colors';
import { textStyles, fontFamily } from './tokens/typography';
import { spacing, componentSpacing } from './tokens/spacing';
import { radius } from './tokens/radius';
import { shadows } from './tokens/shadows';
```

### Using CSS Variables

Import the CSS file in your entry point:

```css
@import './styles/tokens.css';
```

Then use variables in your CSS:

```css
.button {
  background-color: var(--color-primary);
  border-radius: var(--radius-md);
  padding: var(--spacing-2) var(--spacing-4);
  font-size: var(--font-size-sm);
  transition: background-color var(--duration-fast) var(--easing-standard);
}
```

### Theme Switching

```typescript
import { applyTheme, getSystemTheme, watchSystemTheme } from './tokens/theme';

// Apply specific theme
applyTheme('dark');
applyTheme('light');
applyTheme('system'); // Uses system preference

// Watch for system theme changes
const unsubscribe = watchSystemTheme((mode) => {
  console.log('System theme changed to:', mode);
});
```

Or via HTML data attribute:

```html
<html data-theme="dark">
  <!-- Dark theme applied -->
</html>
```

## Token Categories

| Category | Description | File |
|----------|-------------|------|
| **Colors** | Brand, semantic, and component colors | `colors/` |
| **Typography** | Font family, sizes, weights, line heights | `typography.ts` |
| **Spacing** | Consistent spacing scale (4px base) | `spacing.ts` |
| **Radius** | Border radius values | `radius.ts` |
| **Shadows** | Elevation and shadow effects | `shadows.ts` |
| **Borders** | Border widths and styles | `borders.ts` |
| **Animation** | Duration, easing, transitions | `animation.ts` |
| **Breakpoints** | Responsive design breakpoints | `breakpoints.ts` |
| **Z-Index** | Layer stacking order | `zIndex.ts` |

## Color Scales

All color scales use a 10-100 numbering system:
- **10**: Lightest (backgrounds, subtle)
- **20-30**: Light (borders, hover states)
- **40-50**: Mid-range
- **60**: Primary/default usage
- **70-80**: Dark (hover, active states)
- **90-100**: Darkest (text, high contrast)

## Spacing Scale

Based on a 4px unit with named aliases:

| Token | Value | Named Alias |
|-------|-------|-------------|
| 1 | 4px | A, xxs |
| 2 | 8px | B, xs |
| 3 | 12px | C, sm |
| 4 | 16px | D, md |
| 5 | 20px | E |
| 6 | 24px | F, lg |
| 8 | 32px | H, xl |
| 12 | 48px | J, 2xl |

