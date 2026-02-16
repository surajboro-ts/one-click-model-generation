---
description: Core workflow for AI-assisted prototype generation from screenshots or descriptions
globs: ["src/prototypes/**/*.tsx", "src/prototypes/**/*.ts"]
---

# Prototype Generation Rules

You are helping designers create interactive prototypes using the **Radiant Design System**. When a designer provides a screenshot, description, or Figma reference, generate production-quality React code using the available components.

> **See `_orchestration.md`** for the full priority order of guideline files.

---

## Generation Workflow

### 1. Determine the input type

| Input | Action |
|-------|--------|
| Figma screenshot or URL | Consult **`figma-component-mapping.md`** to translate Figma layers to Radiant components |
| Text description | Identify UI patterns below, then pick components from **`component-inventory.md`** |
| Existing prototype to modify | Read the current file, apply changes using the same patterns |

### 2. Pick a layout template

Choose a starting point from **`layout-patterns.md`**:

| Need | Layout Template |
|------|----------------|
| Admin panel with sidebar | Full Page Layout |
| Dashboard with metrics and charts | Dashboard Layout |
| Settings page with form sections | Form Page Layout |
| Multi-step wizard in a modal | Modal/Wizard Layout |
| Table with search, filters, pagination | Data Table Page Layout |

### 3. Select components

Use the **Component Selection Decision Tree** in **`component-inventory.md`** to find the right component for each UI element. Always prefer existing components over custom HTML.

### 3b. Component reuse vs creation

**ALWAYS prefer existing Radiant components.** Check `component-inventory.md` first.

| Situation | Action |
|-----------|--------|
| Existing component matches | Import from `../../components` |
| Close match needs minor tweaks | Use the existing component with props/styling overrides |
| No suitable component exists | Create a LOCAL component in the prototype's own `components/` subfolder |

When creating a local component:
- Place it in `src/prototypes/MyPrototype/components/ComponentName.tsx`
- Follow the rules in `design-system.md` (forwardRef, TypeScript, CSS tokens)
- Do NOT add it to `src/components/` — that directory is for shared design system components only
- Import it with a relative path: `import { MyWidget } from './components/MyWidget'`

### 4. Apply interaction patterns

Consult **`widget-patterns.md`** for correct behavior:

| Building this? | Consult this section |
|----------------|---------------------|
| Alerts or notifications | Alert Taxonomy Decision Tree — banner vs toast vs section alert |
| Action menus (three-dot) | Three Dot Menu — category ordering (Create > View > Edit > Manage > Share > Export > Delete) |
| Delete confirmations | Delete Object Pattern — confirmation message, cascading warnings |
| Empty states | Muted Alerts / Empty States — big vs small, content templates |
| Tooltips or help text | Tooltips (1s delay) and Explainer Cards (340px, click-activated) |
| Object tables | Object Table — row specs, batch actions, sort/filter, column widths |
| Date/time pickers | Date Picker, Rolling Date Picker, Frequency Picker patterns |
| Filter selection dialogs | Multi-Object List Picker — search, select all, bulk add, show selected |

### 5. Apply modal rules

When building modals or dialogs, consult **`modal-patterns.md`** for:
- Size selection (M1: 394px, M2: 788px, M3: 1182px, M4: Full screen)
- Type selection (simple, wizard, subnavigation, splashscreen)
- Footer button placement (Tertiary left, Secondary + Primary right)
- Wizard progress bar (2-4 steps, 4px height)

### 6. Style with tokens

Use design tokens from **`token-usage.md`** — never hard-code colors, spacing, or typography.

### 7. Write UI text

Follow **`content-guidelines.md`** for all user-facing text:
- Buttons: 1-2 words, imperative verbs (Save, Delete, Export)
- Titles: 4 words max, sentence case
- Labels: 3 words max, no articles
- Errors: remedy-focused
- ThoughtSpot terms: capitalize product features (see **`product-knowledge.md`**)

### 8. Organize files

Follow **`prototype-structure.md`** for file organization:
- Simple (1 view): single `.tsx` file
- Medium (2-3 views): folder with `index.tsx`
- Complex (4+ views): full folder with `components/` and `data/`

---

## Code Structure Template

Every prototype MUST follow this structure:

```tsx
import React, { useState } from 'react';
// 1. Import components (see component-inventory.md for full list)
import { Button, Modal, TextInput } from '../../components';
// 2. Import tokens (see token-usage.md for all available tokens)
import { brandColors } from '../../tokens/colors/brand';
import { spacing } from '../../tokens/spacing';
// 3. Import mock data
import { users } from '../../mocks';

/**
 * PrototypeName
 * 
 * Brief description of what this prototype demonstrates.
 */
export const PrototypeName: React.FC = () => {
  // 4. State management
  const [isOpen, setIsOpen] = useState(false);

  // 5. Handlers
  const handleSubmit = () => {
    // Logic here
  };

  // 6. Render
  return (
    <div style={styles.container}>
      {/* Content */}
    </div>
  );
};

// 7. Styles object — always use tokens
const styles: Record<string, React.CSSProperties> = {
  container: {
    backgroundColor: brandColors.gray[10],
    padding: `${spacing.F}px`,
    minHeight: '100vh',
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, sans-serif',
  },
};

export default PrototypeName;
```

---

## Mock Data

Always import realistic mock data rather than using placeholders:

```tsx
import { users, analytics, navigation, forms } from '../../mocks';

const userList = users.profiles;      // Array of user objects
const chartData = analytics.revenue;  // Chart data
const menuItems = navigation.sidebar; // Navigation items
const countries = forms.countries;    // Dropdown options
```

---

## Common Styling Patterns

Use these token-based patterns for consistent styling:

```tsx
// Card container
container: {
  backgroundColor: brandColors.white,
  border: `1px solid ${brandColors.gray[20]}`,
  borderRadius: '8px',
  padding: `${spacing.F}px`,  // 24px
}

// Section with border
section: {
  borderBottom: `1px solid ${brandColors.gray[20]}`,
  paddingBottom: `${spacing.F}px`,
  marginBottom: `${spacing.F}px`,
}

// Flex row with gap
row: {
  display: 'flex',
  alignItems: 'center',
  gap: `${spacing.C}px`,  // 12px
}

// Grid layout
grid: {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: `${spacing.D}px`,  // 16px
}
```

> For the full token reference including color scales, spacing values, and typography, see **`token-usage.md`**.

---

## Quick Pattern Recognition

When you see these patterns in a screenshot or description, use these component combinations:

| UI Pattern | Components to Use | Details in |
|------------|-------------------|------------|
| Filter/selection dialog | Modal + SearchInput + Checkbox + Toggle + Button | `widget-patterns.md` Multi-Object List Picker |
| Data table with actions | SearchInput + Table + Chip + Menu + Pagination | `widget-patterns.md` Object Table |
| Settings/form page | Sidebar + TextInput + Toggle + Radio + Button | `layout-patterns.md` Form Page Layout |
| Dashboard with metrics | Tabs + metric cards + Table | `layout-patterns.md` Dashboard Layout |
| Confirmation prompt | ConfirmDialog or Modal with warning text | `widget-patterns.md` Delete Object Pattern |
| Multi-step wizard | Modal (wizard type) + Stepper + form fields | `modal-patterns.md` Wizard Modal |
| Action menu | Menu with categorized items | `widget-patterns.md` Three Dot Menu |
| Empty/no-data state | Illustration + Typography + Button | `widget-patterns.md` Muted Alerts |

---

## Examples Reference

Study these existing prototypes for patterns:
- `src/prototypes/_examples/FilterDialog.tsx` — Modal with search and selection
- `src/prototypes/AdminGroups/` — Complex prototype with wizard modal and table
- `src/prototypes/Liveboard/` — Dashboard with charts and KPIs
- `src/prototypes/Cmdk/` — Command palette with search
