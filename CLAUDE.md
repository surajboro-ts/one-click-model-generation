# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

The **Radiant Prototyping Kit** is an AI-assisted interactive prototype builder using ThoughtSpot's Radiant design system. It's a React-based component library and prototyping environment where designers can create production-quality interactive prototypes.

## Development Commands

```bash
# Development
npm run dev              # Start dev server (http://localhost:5173)
npm run build            # Build for production (TypeScript check + Vite build)
npm run preview          # Preview production build

# Prototyping
npm run new-prototype MyPrototype  # Create new prototype from template
```

## Architecture Overview

### Directory Structure

```
src/
├── components/          # Radiant component library
│   └── Button/
│       ├── Button.tsx           # Component implementation
│       ├── Button.module.css    # CSS Module styles
│       └── index.ts             # Exports
├── tokens/              # 3-tier design token system
│   ├── colors/          # Brand → Alias → Mapped color tokens
│   ├── typography.ts
│   ├── spacing.ts
│   └── ...
├── prototypes/          # User-created prototypes
│   ├── _template/       # Starter template
│   └── _examples/       # Reference implementations
├── mocks/              # Sample data for prototypes
├── pages/              # Documentation and showcase pages
└── App.tsx             # Main routing and layout
```

### Path Aliases

Configure in both tsconfig.json and vite.config.ts:

```typescript
@/           → src/
@tokens/     → src/tokens/
@components/ → src/components/
```

### Design Token Architecture

The token system follows a **3-tier architecture**:

```
Brand (Primitives) → Alias (Semantic) → Mapped (Components)
```

**Critical Rule**: NEVER hard-code colors, spacing, typography, or visual values. Always use design tokens.

#### In Components (CSS Modules)
```css
.component {
  color: var(--color-text-default);
  background-color: var(--color-brand-blue-60);
  padding: var(--spacing-3) var(--spacing-4);
  border-radius: var(--radius-md);
}
```

#### In Prototypes (Inline Styles)
```typescript
import { brandColors } from '../../tokens/colors/brand';
import { spacing } from '../../tokens/spacing';

const styles = {
  container: {
    backgroundColor: brandColors.gray[10],
    padding: `${spacing.F}px`, // 24px
  }
};
```

See `src/tokens/README.md` for complete token documentation.

## Component Development

### Component Structure

Every component MUST follow this structure:

```
src/components/ComponentName/
├── ComponentName.tsx        # Main component file
├── ComponentName.module.css # CSS Module styles
└── index.ts                 # Exports
```

### Component Template

```typescript
import React, { forwardRef } from 'react';
import styles from './ComponentName.module.css';

export interface ComponentNameProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Variant of the component */
  variant?: 'primary' | 'secondary';
  /** Required prop */
  children: React.ReactNode;
}

export const ComponentName = forwardRef<HTMLDivElement, ComponentNameProps>(({
  variant = 'primary',
  children,
  className,
  ...props
}, ref) => {
  const classes = [
    styles.component,
    styles[variant],
    className,
  ].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={classes} {...props}>
      {children}
    </div>
  );
});

ComponentName.displayName = 'ComponentName';
export default ComponentName;
```

### Key Requirements

1. **forwardRef**: All interactive components must use forwardRef
2. **TypeScript**: Export all types, props interfaces extend HTML element props
3. **CSS Modules**: Use camelCase for class names, build class lists dynamically
4. **Accessibility**:
   - Use semantic HTML
   - Add focus-visible styles
   - Include ARIA labels for icon-only buttons
5. **Design Tokens**: Use CSS variables or TypeScript imports, never hard-code

Reference components: `Button`, `Alert`, `TextInput` for best practices.

## Prototype Development

### Creating a New Prototype

```bash
npm run new-prototype MyPrototype
```

This creates:
- `src/prototypes/MyPrototype/index.tsx`
- `src/prototypes/MyPrototype/README.md`

### Prototype Structure

```typescript
import React, { useState } from 'react';
import { Button, Modal, TextInput } from '../../components';
import { brandColors } from '../../tokens/colors/brand';
import { users, analytics } from '../../mocks';

export const MyPrototype: React.FC = () => {
  const [state, setState] = useState(false);

  return (
    <div style={styles.container}>
      {/* Content */}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    backgroundColor: brandColors.gray[10],
    padding: `24px`,
  },
};
```

### Available Components

The **single source of truth** for all components is `src/data/componentRegistry.ts`. Import helpers from there:

```typescript
import { componentRegistry, getComponentCount } from '../data/componentRegistry';
```

**Selection Controls**: Button, Checkbox, Radio, Toggle
**Inputs**: TextInput, TextArea, SearchInput, Select, DatePicker, SegmentedControl
**Feedback**: Alert, Toast, Modal, Tooltip, Popover, LoadingIndicator, ProgressBar, ConfirmDialog, WizardModal, FilterDialog, FormModal
**Data Display**: Table, Chip, Avatar
**Navigation**: Tabs, Link, Menu, Pagination, Stepper, Sidebar
**Layout**: Card, Accordion, Divider
**Typography**: Typography (20 variants)
**Utilities**: IconGallery
**Icons**: 46 icons available via `<Icon name="..." />`

See `src/prototypes/_examples/` for reference implementations.

## Content Guidelines

Follow ThoughtSpot's content rules for all user-facing text:

- **Button labels**: 1-2 words, imperative verbs (Save, Delete, Export)
- **Titles**: Sentence case, 4 words max
- **Labels**: 3 words max, no articles
- **No periods** in labels or buttons
- **Active voice** always

## Key Design Patterns

### Modal Dialogs
- Primary action on right in footer
- Close with X, Cancel, or overlay click
- Use Modal component with title, children, footer props

### Form Validation
- Show errors inline below fields
- Use Alert for global errors
- Disable submit until valid

### Status Colors
```typescript
// Success: brandColors.green[10] bg, green[60] text
// Warning: brandColors.yellow[10] bg, yellow[70] text
// Error: brandColors.red[10] bg, red[60] text
// Info: brandColors.blue[10] bg, blue[60] text
```

### Spacing Scale
Based on 4px unit with named aliases:
- A (4px), B (8px), C (12px), D (16px), E (20px), F (24px), H (32px), J (48px)
- Or: xs (8px), sm (12px), md (16px), lg (24px), xl (32px)

## Important Files

- **`.cursor/rules/`**: Comprehensive rules for AI assistance
  - `design-system.md`: Component creation rules
  - `prototype-generation.md`: Prototype generation patterns
  - `token-usage.md`: Design token usage guide
  - `content-guidelines.md`: UI text content rules
- **`design-token-structure.md`**: Complete token architecture documentation
- **`src/tokens/README.md`**: Token usage reference
- **`README.md`**: Project overview and quick start

## Routing

Routes are defined in `App.tsx` with a sidebar navigation system:

- `/` - Home page
- `/radiant` - Radiant design system home (with sidebar)
- `/radiant/components/{component}` - Component documentation
- `/radiant/examples/{example}` - Example prototypes
- `/playground` - Playground section (no sidebar)

When adding a new component page, update both the route definitions and the sidebar navigation items in `App.tsx`.

## Common Issues

### Design Token Violations
**Problem**: Hard-coded values like `color: '#2770EF'` or `padding: '16px'`
**Solution**: Use tokens: `color: brandColors.blue[60]` or `padding: var(--spacing-4)`

### Component Structure
**Problem**: Component not following standard folder structure
**Solution**: Ensure `ComponentName/` folder with `.tsx`, `.module.css`, and `index.ts`

### Import Paths
**Problem**: Relative imports getting messy
**Solution**: Use path aliases: `@components/Button` instead of `../../components/Button`

## Testing Philosophy

This is a prototyping kit focused on interactive design exploration. There are no formal tests. Validation happens through:
- TypeScript type checking (`npm run build`)
- Visual review in the browser
- Design token compliance (enforced through linting rules in Cursor)
