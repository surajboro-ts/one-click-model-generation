---
name: Color Token Migration
overview: Migrate the entire color token system from the current 3-tier architecture (brand/alias/mapped) to the rd-sys-color-* naming convention following the Dynamic Theme Generator structure, while preserving existing Figma color values.
todos:
  - id: token-infrastructure
    content: Create new token definition files (system.ts, migration-map.ts) and update tokens.css with rd-sys-color-* structure
    status: pending
  - id: css-module-migration
    content: Update all 40 component CSS modules with new token naming convention using find/replace patterns
    status: pending
  - id: typescript-components
    content: Update 6 components + 48 icon files to import from new systemColors structure
    status: pending
  - id: prototype-migration
    content: Update 4 centralized style files and 28 prototype files using direct token imports
    status: pending
  - id: pages-documentation
    content: Update ColorSystemPage, showcase pages, and token-usage.md documentation
    status: pending
  - id: testing-verification
    content: Run visual regression tests, verify light/dark themes, fix any remaining issues
    status: pending
isProject: false
---

# Color Token System Migration Plan with TS changes

## Migration Scope


| Category              | Files          | Occurrences             | Effort |
| --------------------- | -------------- | ----------------------- | ------ |
| Token infrastructure  | 8 files        | ~400 definitions        | High   |
| CSS modules           | 40 files       | ~400+ var() uses        | Medium |
| TypeScript/components | 54 files       | ~1,000+ brandColors     | High   |
| Prototypes            | 36 files       | ~500+ token uses        | Medium |
| Pages/Showcase        | 10 files       | ~200+ uses              | Low    |
| **Total**             | **~148 files** | **~2,500+ occurrences** |        |


---

## Phase 1: Token Infrastructure Restructure

### 1.1 Create New Token Definition Files

Create new file: [src/tokens/colors/system.ts](src/tokens/colors/system.ts)

This will define the new semantic structure mapping Figma colors to rd-sys categories:

```typescript
// New token structure following Dynamic Generator naming
export const systemColors = {
  light: {
    surface: {
      base: '#FFFFFF',           // was brandColors.white
      sunken: '#F6F8FA',         // was brandColors.gray[10]
      overlay: '#1D232F',        // was brandColors.gray[90]
      success: '#E0F8EF',        // was brandColors.green[20]
      warning: '#FFF8E5',        // was brandColors.yellow[20]
      failure: '#FFEBEC',        // was brandColors.red[20]
      information: '#DEE8FA',    // was brandColors.blue[20]
      baseInverse: '#1D232F',
      sunkenInverse: '#323946',
    },
    action: {
      brand: '#2770EF',
      brandHover: '#2359B6',
      brandPressed: '#163772',
      secondary: '#EAEDF2',
      secondaryHover: '#DBDFE7',
      secondaryPressed: '#DEE8FA',
      ghostHover: '#F6F8FA',
      ghostPressed: '#EBF2FD',
    },
    text: { /* ... */ },
    link: { /* ... */ },
    icon: { /* ... */ },
    outline: { /* ... */ },
    divider: { /* ... */ },
  },
  dark: { /* inverse mappings */ }
};
```

### 1.2 Update CSS Variables File

Modify: [src/styles/tokens.css](src/styles/tokens.css)

Replace current semantic tokens with new naming convention:

```css
:root {
  /* Surface tokens */
  --rd-sys-color-surface-base: #ffffff;
  --rd-sys-color-surface-sunken: #f6f8fa;
  --rd-sys-color-surface-overlay: #1d232f;
  /* ... ~55 new tokens */
}

[data-theme="dark"] {
  --rd-sys-color-surface-base: #1d232f;
  /* ... dark mode overrides */
}
```

### 1.3 Create Token Mapping Reference

Create: [src/tokens/migration-map.ts](src/tokens/migration-map.ts)

Reference file documenting old-to-new mappings (used for find/replace):

```typescript
export const tokenMigrationMap = {
  // CSS Variables
  '--color-bg-primary': '--rd-sys-color-surface-base',
  '--color-bg-secondary': '--rd-sys-color-surface-sunken',
  '--color-primary': '--rd-sys-color-action-brand',
  '--color-primary-hover': '--rd-sys-color-action-brand-hover',
  '--color-text-default': '--rd-sys-color-text-primary',
  // ... complete mapping
  
  // TypeScript mappings
  'brandColors.white': 'systemColors.light.surface.base',
  'brandColors.gray[10]': 'systemColors.light.surface.sunken',
  // ...
};
```

---

## Phase 2: Component CSS Module Updates

### 2.1 High-Impact Components (40+ occurrences each)


| Component                                                                   | Occurrences | Priority |
| --------------------------------------------------------------------------- | ----------- | -------- |
| [DatePicker.module.css](src/components/DatePicker/DatePicker.module.css)    | 48          | P0       |
| [Menu.module.css](src/components/Menu/Menu.module.css)                      | 27          | P0       |
| [Modal.module.css](src/components/Modal/Modal.module.css)                   | 26          | P0       |
| [Pagination.module.css](src/components/Pagination/Pagination.module.css)    | 20          | P1       |
| [IconGallery.module.css](src/components/IconGallery/IconGallery.module.css) | 19          | P1       |


**Find/Replace patterns for CSS modules:**

```
var(--color-bg-primary)      → var(--rd-sys-color-surface-base)
var(--color-bg-secondary)    → var(--rd-sys-color-surface-sunken)
var(--color-text-default)    → var(--rd-sys-color-text-primary)
var(--color-text-secondary)  → var(--rd-sys-color-text-secondary)
var(--color-primary)         → var(--rd-sys-color-action-brand)
var(--color-border-default)  → var(--rd-sys-color-outline-default)
var(--color-divider)         → var(--rd-sys-color-divider-default)
```

### 2.2 Remaining 35 Component CSS Modules

Apply same find/replace patterns across all remaining component CSS files.

---

## Phase 3: TypeScript Token Migration

### 3.1 Update Token Export Structure

Modify: [src/tokens/colors/index.ts](src/tokens/colors/index.ts)

```typescript
// New exports
export { systemColors, lightSystemColors, darkSystemColors } from './system';
export type { SystemColors, SystemColorKey } from './system';

// Deprecated (to be removed after migration)
/** @deprecated Use systemColors instead */
export { brandColors } from './brand';
```

### 3.2 Component TypeScript Updates

**Files using TypeScript token imports (6 components + 48 icons):**


| File                                                 | Current Import                          | New Import                                        |
| ---------------------------------------------------- | --------------------------------------- | ------------------------------------------------- |
| [Alert.tsx](src/components/Alert/Alert.tsx)          | `statusColors, backgroundColors`        | `systemColors.surface.*`, `systemColors.icon.*`   |
| [Chip.tsx](src/components/Chip/Chip.tsx)             | `componentColors, textColors`           | `systemColors.action.*`, `systemColors.text.*`    |
| [Checkbox.tsx](src/components/Checkbox/Checkbox.tsx) | `componentColors, statusColors`         | `systemColors.action.*`, `systemColors.outline.*` |
| [Radio.tsx](src/components/Radio/Radio.tsx)          | `componentColors, statusColors`         | `systemColors.action.*`, `systemColors.outline.*` |
| [Tabs.tsx](src/components/Tabs/Tabs.tsx)             | `brandColors`                           | `systemColors.action.*`                           |
| [icons/index.tsx](src/components/icons/index.tsx)    | `statusColors, textColors, brandColors` | `systemColors.icon.*`                             |


---

## Phase 4: Prototype Migration

### 4.1 Update Centralized Style Files


| Prototype     | Style File                                          | Approach                                   |
| ------------- | --------------------------------------------------- | ------------------------------------------ |
| Cmdk          | [styles.ts](src/prototypes/Cmdk/styles.ts)          | Update `colors` object to use systemColors |
| Liveboard     | [styles.ts](src/prototypes/Liveboard/styles.ts)     | Update color mappings                      |
| AdminGroups   | [styles.ts](src/prototypes/AdminGroups/styles.ts)   | Replace brandColors with systemColors      |
| SpotterMemory | [styles.ts](src/prototypes/SpotterMemory/styles.ts) | Replace brandColors with systemColors      |


### 4.2 Update Direct Token Imports

~28 prototype files import `brandColors` directly. Each needs updating to use `systemColors`.

**Pattern transformation:**

```typescript
// Before
import { brandColors } from '../../tokens/colors/brand';
style={{ backgroundColor: brandColors.gray[10] }}

// After  
import { systemColors } from '../../tokens/colors/system';
style={{ backgroundColor: systemColors.light.surface.sunken }}
```

---

## Phase 5: Pages and Showcase Updates

Update documentation/showcase pages:

- [ColorSystemPage.tsx](src/pages/ColorSystemPage.tsx) - Update to display new token structure
- [ArchitectureShowcase.tsx](src/pages/ArchitectureShowcase.tsx) - Update token examples
- [ComponentDocPage.tsx](src/pages/ComponentDocPage.tsx) - Update documentation
- [IconsShowcase.tsx](src/pages/IconsShowcase.tsx) - Update color references

---

## Phase 6: Documentation and Cleanup

### 6.1 Update Token Usage Guide

Modify: [.cursor/rules/token-usage.md](.cursor/rules/token-usage.md)

Document new token naming convention and usage patterns.

### 6.2 Deprecation Cleanup

After migration verification:

- Remove deprecated exports from [src/tokens/colors/index.ts](src/tokens/colors/index.ts)
- Delete [src/tokens/migration-map.ts](src/tokens/migration-map.ts)
- Update README files

---

## New Token Structure Reference

```
rd-sys-color-
├── surface-
│   ├── base, sunken, overlay
│   ├── success, warning, failure, information
│   └── base-inverse, sunken-inverse
├── action-
│   ├── brand, brand-hover, brand-pressed
│   ├── secondary, secondary-hover, secondary-pressed
│   └── ghost-hover, ghost-pressed
├── text-
│   ├── primary, secondary, inverse
│   └── brand, success, failure
├── link-
│   ├── default, subtle
│   └── inverse, inverse-hover
├── icon-
│   ├── primary, secondary, inverse
│   └── brand, information, success, failure, warning
├── outline-
│   ├── default, hover, brand, failure, warning
│   ├── inverse-default, inverse-hover
│   └── inverse-brand, inverse-failure, inverse-warning, focus
└── divider-
    └── default, inverse
```

**Total: ~55 semantic color tokens (light) + ~55 (dark) = 110 tokens**

---

## Effort Estimate


| Phase                    | Files    | Est. Hours | Risk   |
| ------------------------ | -------- | ---------- | ------ |
| 1. Token Infrastructure  | 8        | 4-6h       | Medium |
| 2. CSS Module Updates    | 40       | 6-8h       | Low    |
| 3. TypeScript Components | 54       | 8-10h      | Medium |
| 4. Prototype Migration   | 36       | 6-8h       | Low    |
| 5. Pages/Documentation   | 10       | 2-3h       | Low    |
| 6. Testing/Verification  | -        | 4-6h       | High   |
| **Total**                | **~148** | **30-41h** |        |


**Calendar Estimate:** 4-5 working days for a single developer

---

## Risk Mitigation

- **Visual regression**: Run side-by-side comparison before/after
- **Missing mappings**: Create comprehensive token map before starting
- **Dark mode breakage**: Test both themes after each phase
- **Build failures**: Run TypeScript compilation after each major change

---

## Migration Verification Checklist

- All CSS `var(--color-*)` replaced with `var(--rd-sys-color-*)`
- All `brandColors.*` imports replaced with `systemColors.*`
- Light theme renders correctly
- Dark theme renders correctly
- No TypeScript errors
- No console warnings about undefined tokens
- Visual regression tests pass

