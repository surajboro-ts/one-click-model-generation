# Component Patterns

This document describes the architectural patterns used in the Radiant Design System. Follow these patterns when creating new components.

## Table of Contents

1. [File Structure](#file-structure)
2. [Component Types](#component-types)
3. [Props Interface Patterns](#props-interface-patterns)
4. [State Management](#state-management)
5. [Styling Patterns](#styling-patterns)
6. [Icon Integration](#icon-integration)
7. [Accessibility Patterns](#accessibility-patterns)
8. [Export Patterns](#export-patterns)

---

## File Structure

Every component lives in its own folder with three files:

```
src/components/ComponentName/
├── ComponentName.tsx        # Main component implementation
├── ComponentName.module.css # CSS Module styles
└── index.ts                 # Re-exports for clean imports
```

### Why This Structure?

- **Encapsulation**: All component-related files in one place
- **Clean imports**: `import { Button } from './components/Button'`
- **Scalability**: Easy to add tests, stories, or sub-components later

---

## Component Types

### 1. Interactive Components (with forwardRef)

Use `forwardRef` for components that users might need to reference directly:
- Buttons, inputs, form controls
- Focusable elements
- Elements that might be programmatically controlled

**Example: Button**

```tsx
import React, { forwardRef, useState, useCallback } from 'react';
import styles from './Button.module.css';

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'small' | 'basic' | 'large';
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'basic',
  children,
  className,
  disabled = false,
  ...props
}, ref) => {
  // Implementation
  return (
    <button ref={ref} className={buttonClasses} disabled={disabled} {...props}>
      {children}
    </button>
  );
});

Button.displayName = 'Button';
export default Button;
```

### 2. Display Components (without forwardRef)

Use `React.FC` for components that display content but don't need refs:
- Alerts, notifications
- Cards, containers
- Layout components

**Example: Alert**

```tsx
import React, { useState, useCallback } from 'react';
import styles from './Alert.module.css';

export interface AlertProps {
  status?: 'info' | 'success' | 'warning' | 'failure';
  message: string;
  dismissible?: boolean;
}

export const Alert: React.FC<AlertProps> = ({
  status = 'info',
  message,
  dismissible = true,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  // Implementation
};

export default Alert;
```

### 3. Controlled Components

Components that require external state management:

**Example: Modal**

```tsx
export interface ModalProps {
  isOpen: boolean;           // Controlled by parent
  onClose: () => void;       // Callback to parent
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  // Effects for keyboard handling
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;
  // Render
};
```

---

## Props Interface Patterns

### 1. Type Definitions

Define and export all type aliases:

```tsx
export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
export type ButtonSize = 'small' | 'basic' | 'large';
export type IconPosition = 'leading' | 'trailing' | 'none';
```

### 2. Interface with JSDoc

Document every prop:

```tsx
export interface ButtonProps {
  /** The visual style variant */
  variant?: ButtonVariant;
  /** The size of the button */
  size?: ButtonSize;
  /** Whether the button is in loading state */
  loading?: boolean;
  /** Required: The button content */
  children: React.ReactNode;
}
```

### 3. Extending HTML Attributes

Extend native element props for proper typing:

```tsx
// For buttons - exclude 'type' to rename it
export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  htmlType?: 'button' | 'submit' | 'reset';
}

// For inputs
export interface TextInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'small' | 'medium' | 'large';
}

// For divs/containers
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'elevated' | 'outlined';
}
```

### 4. Common Optional Props

Always include:

```tsx
/** Additional CSS class name */
className?: string;
```

---

## State Management

### 1. Internal State for UI

```tsx
const [isPressed, setIsPressed] = useState(false);
const [isVisible, setIsVisible] = useState(true);
```

### 2. useCallback for Event Handlers

```tsx
const handleMouseDown = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
  if (!disabled) setIsPressed(true);
  onMouseDown?.(e); // Forward to prop handler
}, [disabled, onMouseDown]);
```

### 3. useId for Accessibility

```tsx
const id = useId();
// Use for label-input associations
<label htmlFor={id}>{label}</label>
<input id={id} />
```

### 4. Combining Internal and External State

```tsx
const [isPressed, setIsPressed] = useState(false);
const isActive = active || isPressed; // Prop or internal
```

---

## Styling Patterns

### 1. CSS Module Import

```tsx
import styles from './Button.module.css';
```

### 2. Dynamic Class Building

```tsx
const buttonClasses = [
  styles.button,           // Base class
  styles[variant],         // Variant class
  styles[size],            // Size class
  isActive && styles.active,
  disabled && styles.disabled,
  fullWidth && styles.fullWidth,
  className,               // User-provided class (always last)
].filter(Boolean).join(' ');
```

### 3. CSS Variables for Tokens

```css
.button {
  background-color: var(--color-brand-blue-60);
  padding: var(--spacing-3) var(--spacing-4);
  border-radius: var(--radius-md);
  transition: background-color var(--duration-fast) var(--easing-standard);
}
```

### 4. Inline Styles for Dynamic Values

Use sparingly, only for truly dynamic values:

```tsx
// When value comes from config object
style={{ backgroundColor: config.background }}

// When value is calculated
style={{ transform: checked ? 'translateX(12px)' : 'translateX(0)' }}
```

### 5. CSS Class Structure

```css
/* Base styles */
.component { }

/* Variants */
.primary { }
.secondary { }

/* Sizes */
.small { }
.basic { }
.large { }

/* States */
.active { }
.disabled { }
.hover { }

/* Modifiers */
.fullWidth { }
.iconLeading { }

/* Compound selectors */
.primary.standard { }
.primary.standard.active:not(.disabled) { }
```

---

## Icon Integration

### 1. Import Icon Component

```tsx
import { Icon, isValidIconName } from '../icons';
import type { IconName, IconSize } from '../icons';
```

### 2. Flexible Icon Prop

Support both icon names and ReactNode:

```tsx
interface Props {
  icon?: React.ReactNode | IconName;
}
```

### 3. Icon Rendering Logic

```tsx
const renderIcon = () => {
  if (!icon) return null;
  
  // String icon name
  if (typeof icon === 'string' && isValidIconName(icon)) {
    return <Icon name={icon as IconName} size={iconSize} />;
  }
  
  // ReactNode (legacy support)
  return icon;
};
```

### 4. Size Mapping

```tsx
const buttonSizeToIconSize: Record<ButtonSize, IconSize> = {
  small: 's',
  basic: 'm',
  large: 'm',
};
```

---

## Accessibility Patterns

### 1. Semantic HTML

```tsx
// Use correct element
<button type="button">   // Not <div onClick>
<input type="checkbox">  // Not custom div

// Use semantic roles
role="alert"             // For notifications
role="dialog"            // For modals
role="switch"            // For toggles
```

### 2. ARIA Attributes

```tsx
// For modals
<div role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <h2 id="modal-title">{title}</h2>

// For icon buttons
<button aria-label="Close modal">
  <Icon name="cross" />
</button>

// For toggles
<input role="switch" aria-checked={checked} />
```

### 3. Keyboard Support

```tsx
const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
  if (e.key === ' ' || e.key === 'Enter') {
    e.preventDefault();
    handleChange();
  }
}, [handleChange]);
```

### 4. Focus Management

```css
.button:focus-visible {
  outline: 2px solid var(--color-brand-blue-60);
  outline-offset: 2px;
}
```

---

## Export Patterns

### Component File (ComponentName.tsx)

```tsx
// Named export for the component
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(/* ... */);

// Set displayName for React DevTools
Button.displayName = 'Button';

// Default export for convenience
export default Button;
```

### Index File (index.ts)

```tsx
// Re-export component (both named and default)
export { Button, default } from './Button';

// Re-export all types
export type { 
  ButtonProps, 
  ButtonVariant, 
  ButtonSize, 
  ButtonColorway, 
  IconPosition 
} from './Button';
```

### Main Components Index (components/index.ts)

```tsx
export { Button } from './Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './Button';

export { Alert } from './Alert';
export type { AlertProps, AlertStatus, AlertVariant } from './Alert';

// ... all components
```

---

## Component Checklist

Before submitting a new component, verify:

- [ ] Uses correct file structure (folder with 3 files)
- [ ] Uses `forwardRef` if interactive
- [ ] All props have JSDoc comments
- [ ] All types are exported
- [ ] Uses design tokens (no hard-coded values)
- [ ] Uses CSS Modules (not inline styles for static values)
- [ ] Has focus-visible styles
- [ ] Has proper ARIA attributes
- [ ] Has keyboard support (if interactive)
- [ ] Has JSDoc with examples at component level
- [ ] Has named and default exports
- [ ] className prop is passed through

---

## Reference Components

Study these components as examples:

| Component | Pattern Highlights |
|-----------|-------------------|
| **Button** | forwardRef, variants, icon support, states |
| **Alert** | Status config object, token usage, role="alert" |
| **Modal** | Controlled component, keyboard handling, portal-like |
| **Toggle** | useId, role="switch", keyboard support |
| **TextInput** | Form integration, validation states, helper text |
