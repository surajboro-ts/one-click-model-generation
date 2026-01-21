# Radiant Design System

A comprehensive React component library built for **ThoughtSpot**, featuring a robust design token architecture, 11+ production-ready components, and automated content design guidelines.

[![React](https://img.shields.io/badge/React-19.2-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2-646CFF)](https://vitejs.dev/)

---

## 📖 Table of Contents

- [Overview](#overview)
- [Design Philosophy](#design-philosophy)
- [Design Token Architecture](#design-token-architecture)
- [Components](#components)
- [Icon Library](#icon-library)
- [Content Guidelines](#content-guidelines)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Creating Components](#creating-components)
- [Contributing](#contributing)
- [Documentation](#documentation)

---

## 🎯 Overview

The **Radiant Design System** is a production-grade React component library designed specifically for ThoughtSpot's analytics platform. It provides a complete toolkit for building consistent, accessible, and beautiful user interfaces.

### Key Features

✨ **11 Production Components** - Button, Alert, Modal, Input, Checkbox, Radio, Toggle, Tabs, SearchInput, Chip, Sidebar  
🎨 **3-Tier Token System** - Brand → Alias → Mapped architecture for scalable theming  
🎭 **46 Custom Icons** - Consistent icon set with flexible API  
♿ **Accessibility First** - WCAG 2.1 compliant with keyboard navigation  
📝 **Content Design Rules** - Automated ThoughtSpot writing guidelines  
🔧 **TypeScript Native** - Full type safety and IntelliSense support  
🌗 **Theme Support** - Light and dark mode ready  
🚀 **Vite Powered** - Lightning-fast development experience

---

## 🎨 Design Philosophy

The Radiant Design System follows three core principles:

### 1. **Token-Driven Design**
Every visual property (colors, spacing, typography) is defined through design tokens. This ensures:
- **Consistency** across all components
- **Scalability** for new features and themes
- **Maintainability** with centralized values

### 2. **Component Composition**
Components are built to be:
- **Flexible** - Support multiple variants, sizes, and states
- **Composable** - Combine to create complex UIs
- **Predictable** - Follow consistent patterns and APIs

### 3. **Content-First**
All UI text follows ThoughtSpot's content guidelines:
- **Sentence case** for all UI elements
- **Imperative verbs** for actions (Save, Delete, Export)
- **Active voice** to empower users
- **Concise** - 1-2 words for buttons, 4 words max for titles

---

## 🏗️ Design Token Architecture

The system implements a **3-tier token architecture** derived from Figma design files:

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   BRAND LAYER   │ ──► │   ALIAS LAYER   │ ──► │  MAPPED LAYER   │
│  (Primitives)   │     │   (Semantic)    │     │  (Components)   │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

### Layer 1: Brand/Primitives
Raw color values, base spacing units, font definitions.
```typescript
brandColors.blue[60]  // #2770EF
spacing.scale.md      // 16px
```

### Layer 2: Alias/Semantic
Purpose-driven tokens that give meaning to primitives.
```typescript
aliasColors.semantic.success.default    // Maps to green
aliasColors.semantic.info.background    // Maps to light blue
```

### Layer 3: Mapped/Components
Component-specific tokens with theme support.
```typescript
lightThemeColors.button.primary.background  // #2770EF
darkThemeColors.button.primary.background   // Different for dark mode
```

**Token Categories:**
- **Colors** - 15+ brand colors, 7 semantic pairs, chart palettes
- **Typography** - 12 text styles, 7 font sizes, 4 weights
- **Spacing** - 8 values on a 4px grid (4px → 48px)
- **Radius** - 4 corner radius options (4px, 6px, 8px, 12px)
- **Shadows** - Elevation system for depth
- **Animation** - Duration and easing values

📚 **Deep Dive:** See [`design-token-structure.md`](design-token-structure.md) for the complete token specification.

---

## 🧩 Components

### Core Components (11)

| Component | Description | Variants | Sizes |
|-----------|-------------|----------|-------|
| **Button** | Primary interaction element | Primary, Secondary, Tertiary | Small, Basic, Large |
| **Alert** | Notification banners | Page, Section, Section-Multiline | - |
| **Modal** | Overlay dialogs | - | Small, Medium, Large |
| **TextInput** | Text input field | - | - |
| **SearchInput** | Search-specific input | - | - |
| **Checkbox** | Multi-select control | - | - |
| **Radio** | Single-select control | - | - |
| **Toggle** | On/off switch | - | - |
| **Tabs** | Navigation tabs | - | Small, Medium |
| **Chip** | Compact label/tag | - | - |
| **Sidebar** | Side navigation | - | - |

### Component Features

**Button Component**
```tsx
<Button variant="primary" size="basic" icon="plus" iconPosition="leading">
  Add filter
</Button>
```
- 3 variants, 3 sizes, 2 colorways (standard/white)
- Icon support (leading/trailing)
- Loading state, active state, disabled state
- forwardRef support for external control

**Alert Component**
```tsx
<Alert 
  status="success" 
  variant="page"
  message="Changes saved successfully"
  buttonText="View"
  dismissible
/>
```
- 5 status types (info, success, warning, failure, muted)
- 3 layout variants
- Dismissible with callbacks
- Token-based status colors

**Modal Component**
```tsx
<Modal 
  isOpen={isOpen} 
  onClose={() => setIsOpen(false)}
  title="Delete this Answer?"
  footer={<Button>Delete</Button>}
>
  <p>This action cannot be undone.</p>
</Modal>
```
- Keyboard support (Escape to close)
- Focus trap for accessibility
- Overlay click to dismiss
- Customizable footer

---

## 🎭 Icon Library

**46 Icons** organized into functional categories:

### Navigation (12)
`arrow-up`, `arrow-down`, `arrow-left`, `arrow-right`, `chevron-up`, `chevron-down`, `chevron-left`, `chevron-right`, `expand`, `fullscreen`, `hamburger`, `more`

### Actions (14)
`plus`, `minus`, `cross`, `checkmark`, `copy`, `download`, `upload`, `save`, `refresh`, `pencil`, `trash-can`, `share`, `pin`, `filter`

### Status (5)
`checkmark-circle`, `cross-circle`, `exclamation-point-circle`, `info-circle`, `information`

### Media (4)
`play`, `pause`, `eye`, `eye-undo`

### UI Elements (11)
`clock`, `cog`, `folder`, `funnel`, `lock`, `magnifying-glass`, `profile`, `question-mark`, `sort`, `star`, `tag`

### Usage

```tsx
import { Icon } from './components/icons';

<Icon name="checkmark-circle" size="m" color="#06BF7F" />
```

**Sizes:** `xs` (12px), `s` (14px), `m` (16px), `l` (20px), `xl` (24px)

---

## 📝 Content Guidelines

The design system includes **automated content design enforcement** through Cursor rules. All UI text automatically follows ThoughtSpot's brand voice.

### Core Rules

| Element | Rule | Example |
|---------|------|---------|
| **Buttons** | 1-2 words, imperative verbs | ✅ **Save changes** ❌ "Proceed to save" |
| **Titles** | 4 words max, sentence case | ✅ **Delete this Answer?** ❌ "Are you sure?" |
| **Labels** | 3 words max, no articles | ✅ **Pin to Liveboard** ❌ "Pin to a Liveboard" |
| **Errors** | Remedy-focused, 3-5 words | ✅ **Enter email address** ❌ "This field is required" |

### Approved Action Verbs
**Use:** Create, Add, Delete, Remove, Save, Cancel, Edit, Export, Search, Filter, Pin, View  
**Avoid:** Submit, Proceed, Check, Modify, Refresh, Done, Confirm

### ThoughtSpot Terminology
Always capitalize these product features:
- **Answer** (saved query result)
- **Liveboard** (dashboard)
- **SpotIQ** (AI insights)
- **Worksheet** / **Data Model**
- **Connection** (data source)

📚 **Full Guidelines:** See [`docs/content-guidelines-detailed.md`](docs/content-guidelines-detailed.md)

---

## 🚀 Getting Started

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd figmaradiant

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Using Components

```tsx
import { Button, Alert, Modal } from './components';

function App() {
  return (
    <>
      <Button variant="primary" size="basic">
        Save changes
      </Button>
      
      <Alert 
        status="success" 
        message="Changes saved successfully"
      />
    </>
  );
}
```

### Using Design Tokens

#### In TypeScript
```tsx
import { brandColors, spacing } from './tokens';

const style = {
  backgroundColor: brandColors.blue[60],
  padding: `${spacing.scale.sm} ${spacing.scale.md}`,
};
```

#### In CSS
```css
.button {
  background-color: var(--color-brand-blue-60);
  padding: var(--spacing-3) var(--spacing-4);
  border-radius: var(--radius-md);
  transition: background-color var(--duration-fast) var(--easing-standard);
}
```

---

## 📁 Project Structure

```
figmaradiant/
├── .cursor/
│   └── rules/                          # Automated Cursor AI rules
│       ├── design-system.md            # Component creation standards
│       ├── content-guidelines.md       # UI text rules
│       └── product-knowledge.md        # ThoughtSpot domain context
├── docs/
│   ├── content-guidelines-detailed.md  # Full content design spec
│   └── component-patterns.md           # Architecture patterns guide
├── src/
│   ├── components/                     # React components
│   │   ├── Button/
│   │   │   ├── Button.tsx              # Component implementation
│   │   │   ├── Button.module.css       # Component styles
│   │   │   └── index.ts                # Exports
│   │   ├── Alert/
│   │   ├── Modal/
│   │   ├── ... (11 components total)
│   │   └── icons/                      # 46 icon components
│   ├── tokens/                         # Design tokens
│   │   ├── colors/                     # 3-tier color system
│   │   │   ├── brand.ts                # Primitives
│   │   │   ├── alias.ts                # Semantic
│   │   │   ├── mapped.ts               # Component-specific
│   │   │   └── charts.ts               # Data viz colors
│   │   ├── typography.ts
│   │   ├── spacing.ts
│   │   ├── radius.ts
│   │   ├── shadows.ts
│   │   ├── animation.ts
│   │   └── index.ts
│   ├── pages/                          # Showcase pages
│   ├── styles/
│   │   ├── global.css                  # Global styles
│   │   └── tokens.css                  # CSS custom properties
│   └── main.tsx                        # App entry point
├── design-token-structure.md           # Token architecture doc
├── package.json
└── README.md
```

---

## 🛠️ Creating Components

All components follow strict patterns for consistency. When creating a new component:

### 1. File Structure
```
src/components/NewComponent/
├── NewComponent.tsx        # Component logic
├── NewComponent.module.css # Styles using tokens
└── index.ts                # Exports
```

### 2. Component Template
```tsx
import React, { forwardRef } from 'react';
import styles from './NewComponent.module.css';

export type NewComponentVariant = 'primary' | 'secondary';

export interface NewComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Variant of the component */
  variant?: NewComponentVariant;
  /** Content */
  children: React.ReactNode;
}

/**
 * NewComponent
 * 
 * Brief description here.
 * 
 * @example
 * ```tsx
 * <NewComponent variant="primary">Content</NewComponent>
 * ```
 */
export const NewComponent = forwardRef<HTMLDivElement, NewComponentProps>(({
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

NewComponent.displayName = 'NewComponent';
export default NewComponent;
```

### 3. Required Standards

✅ **Use design tokens** - Never hard-code colors, spacing, or typography  
✅ **Follow content rules** - Sentence case, imperative verbs, active voice  
✅ **Add accessibility** - ARIA labels, keyboard support, focus styles  
✅ **Document with JSDoc** - Description and usage examples  
✅ **Export types** - All interfaces and type aliases  
✅ **Use forwardRef** - For interactive elements

📚 **Detailed Guide:** See [`.cursor/rules/design-system.md`](.cursor/rules/design-system.md)

---

## 🤝 Contributing

### Automated Rules

This project includes **Cursor AI rules** that automatically enforce standards when you create or modify components:

- **design-system.md** - Component architecture patterns
- **content-guidelines.md** - UI text writing rules
- **product-knowledge.md** - ThoughtSpot domain context

When you work on files in `src/components/`, these rules automatically apply to ensure consistency.

### Manual Review Checklist

Before submitting:

- [ ] Component follows file structure (folder with 3 files)
- [ ] Uses design tokens (no hard-coded values)
- [ ] All props have JSDoc comments
- [ ] Content follows ThoughtSpot guidelines
- [ ] Has accessibility features (ARIA, keyboard support)
- [ ] Has focus-visible styles
- [ ] Exports all types
- [ ] Includes usage examples in JSDoc

---

## 📚 Documentation

### Design System Docs

| Document | Description |
|----------|-------------|
| [`design-token-structure.md`](design-token-structure.md) | Complete token architecture from Figma |
| [`src/tokens/README.md`](src/tokens/README.md) | How to use design tokens |
| [`.cursor/rules/design-system.md`](.cursor/rules/design-system.md) | Component creation standards |

### Content Guidelines

| Document | Description |
|----------|-------------|
| [`docs/content-guidelines-detailed.md`](docs/content-guidelines-detailed.md) | Full ThoughtSpot writing rules |
| [`.cursor/rules/content-guidelines.md`](.cursor/rules/content-guidelines.md) | Quick reference for UI text |

### Patterns & Architecture

| Document | Description |
|----------|-------------|
| [`docs/component-patterns.md`](docs/component-patterns.md) | React patterns, props, state management |
| [`.cursor/rules/product-knowledge.md`](.cursor/rules/product-knowledge.md) | ThoughtSpot product context |

---

## 🎓 Learning Resources

### Understanding the Token System
1. Read [`design-token-structure.md`](design-token-structure.md) for the big picture
2. Study [`src/tokens/colors/`](src/tokens/colors/) for the 3-tier implementation
3. Look at [`src/components/Button/Button.module.css`](src/components/Button/Button.module.css) to see tokens in action

### Building Your First Component
1. Review [`docs/component-patterns.md`](docs/component-patterns.md)
2. Study existing components: `Button`, `Alert`, `Toggle`
3. Use [`.cursor/rules/design-system.md`](.cursor/rules/design-system.md) as a checklist

### Writing UI Text
1. Read [`.cursor/rules/content-guidelines.md`](.cursor/rules/content-guidelines.md) for quick rules
2. Reference [`docs/content-guidelines-detailed.md`](docs/content-guidelines-detailed.md) for edge cases
3. Look at existing component text for examples

---

## 🏆 Project Highlights

- ✨ **11 Production Components** ready for use
- 🎨 **3-Tier Token Architecture** for scalable theming
- 🎭 **46 Custom Icons** with consistent API
- 📝 **Automated Content Guidelines** via Cursor rules
- ♿ **WCAG 2.1 Compliant** accessibility
- 🔧 **100% TypeScript** with full type safety
- 🌗 **Theme Support** (light/dark mode ready)
- 📚 **Comprehensive Documentation** for onboarding

---

## 📄 License

ISC

---

**Built with ❤️ for ThoughtSpot's Analytics Platform**
