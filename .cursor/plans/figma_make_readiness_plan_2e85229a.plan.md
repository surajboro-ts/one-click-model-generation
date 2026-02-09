---
name: Figma Make Readiness Plan
overview: A comprehensive gap analysis comparing the current figmaradiant project against Figma Make's requirements for bringing a design system package, plus an actionable plan to create a dual-purpose system that powers both Figma Make and Cursor IDE.
todos:
  - id: lib-build
    content: Create Vite library build config (vite.config.lib.ts), tsconfig.build.json, and update package.json with main/module/types/exports/peerDependencies/files fields
    status: pending
  - id: guidelines-entry
    content: Create guidelines/ folder with Guidelines.md entry point that introduces the design system and provides step-by-step reading instructions for AI
    status: pending
  - id: guidelines-tokens
    content: Create guidelines/design-tokens/ with separate colors.md, typography.md, spacing.md files adapted from existing token-usage.md and design-token-structure.md
    status: pending
  - id: guidelines-overview
    content: Create guidelines/overview-components.md (from component-inventory.md) and guidelines/overview-icons.md (consolidated from scattered icon docs)
    status: pending
  - id: guidelines-components
    content: Create guidelines/components/ with per-component .md files (button, modal, tabs, table, text-input, select, alert, checkbox, toggle, etc.)
    status: pending
  - id: css-bundling
    content: Ensure CSS Modules and tokens.css are properly bundled in the library output for npm consumers
    status: pending
  - id: npm-publish
    content: Configure npm registry (public or Figma private), add .npmrc if needed, and publish the package
    status: pending
  - id: cursor-rules-refactor
    content: Refactor .cursor/rules/ to point to shared guidelines/ files where content overlaps, keeping Cursor-specific workflow rules separate
    status: pending
  - id: figma-make-template
    content: After publishing, create a Figma Make template with the package pre-installed and guidelines included
    status: pending
isProject: false
---

# Figma Make Readiness: Gap Analysis and Dual-System Plan

## Current State Assessment

The project is currently a **Vite-powered React application** (not a library/package). It contains a rich component library (43+ components), a 3-tier design token system, and comprehensive Cursor IDE rules. However, it is **not publishable as an npm package** and has **no Figma Make guidelines folder**.

---

## Requirement-by-Requirement Gap Analysis

### 1. React 18+ Compatibility

**Figma Make requires:** React 18+
**Current:** React 19.2.0

**Status: PASS** -- exceeds the requirement.

---

### 2. Vite Compatibility

**Figma Make requires:** Package must build with Vite
**Current:** Already uses Vite 7.2.6 with `@vitejs/plugin-react`

**Status: PASS** -- the app itself runs on Vite. However, the components/tokens are not built as a consumable library yet.

---

### 3. Published as an npm Package

**Figma Make requires:** Published to public or private npm registry.
**Current:** The project is an **application**, not a **library**.

**Status: FAIL -- Major gap.** The following are missing:

- **No library build config** -- `tsconfig.json` has `"noEmit": true`, no `dist/` output for the library
- **No `main`/`module`/`exports` fields** in `package.json`
- **No `types` field** for TypeScript consumers
- **No `files` field** to control what gets published
- **No `.npmrc**` configured for any registry
- **No `peerDependencies**` -- React should be a peer dependency, not a direct dependency
- **CSS Modules** are used for component styling -- these need bundling strategy for library consumers

What `package.json` needs (currently missing):

```json
{
  "main": "dist/index.cjs.js",
  "module": "dist/index.es.js",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.es.js",
      "require": "./dist/index.cjs.js",
      "types": "./dist/index.d.ts"
    },
    "./tokens": {
      "import": "./dist/tokens/index.es.js",
      "types": "./dist/tokens/index.d.ts"
    },
    "./styles.css": "./dist/styles.css"
  },
  "files": ["dist", "guidelines"],
  "peerDependencies": {
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0"
  }
}
```

What build config needs:

- A **Vite library mode** build config (`vite.config.lib.ts`) using `build.lib` to produce ESM/CJS bundles
- A **separate tsconfig** for declaration emit (`tsconfig.build.json` with `"declaration": true, "emitDeclarationOnly": true`)
- CSS bundling strategy for CSS Modules (Vite lib mode can handle this)

---

### 4. Guidelines Folder for Figma Make

**Figma Make requires:** A `guidelines/` folder with structured markdown files.
**Current:** Guidelines live in `.cursor/rules/` (10 files) and `docs/` (4 files) -- Cursor-specific, not Figma Make compatible.

**Status: FAIL -- Major gap.** Needs a complete `guidelines/` directory. However, the **content already exists** and can be restructured.

Proposed structure (mapping existing content):

```
guidelines/
  Guidelines.md                    -- NEW (entry point, reading instructions)
  overview-components.md           -- Adapted from .cursor/rules/component-inventory.md
  overview-icons.md                -- NEW (consolidate from scattered icon docs)
  design-tokens/
    colors.md                      -- Adapted from design-token-structure.md + token-usage.md
    typography.md                  -- Extracted from token-usage.md (typography section)
    spacing.md                     -- Extracted from token-usage.md (spacing section)
  components/
    button.md                      -- NEW (extract from component-patterns.md + component-api-reference.md)
    modal.md                       -- Adapted from .cursor/rules/modal-patterns.md
    tabs.md                        -- NEW
    table.md                       -- NEW
    text-input.md                  -- NEW
    select.md                      -- NEW
    alert.md                       -- NEW
    checkbox.md                    -- NEW
    toggle.md                      -- NEW
    ... (one per component)
```

---

### 5. Templates (Optional but Recommended)

**Figma Make recommends:** Publish a Make template with your package pre-installed.
**Current:** No Figma Make template.

**Status: NOT STARTED** -- this comes after the package is published.

---

## Architecture for Dual-Purpose System

The key challenge: maintain **one source of truth** for guidelines that serves both Cursor IDE and Figma Make.

### Proposed Approach: `guidelines/` as the Single Source

```
figmaradiant/
  guidelines/                      -- Shared source of truth
    Guidelines.md                  -- Entry point (Figma Make reads this first)
    overview-components.md
    overview-icons.md
    design-tokens/
      colors.md
      typography.md
      spacing.md
    components/
      button.md
      modal.md
      tabs.md
      ...
  .cursor/
    rules/                         -- Cursor-specific rules (thin wrappers)
      design-system.md             -- KEEP (component architecture rules - Cursor-specific)
      prototype-generation.md      -- KEEP (Cursor workflow-specific)
      prototype-structure.md       -- KEEP (Cursor workflow-specific)
      figma-component-mapping.md   -- KEEP (Cursor workflow-specific)
      content-guidelines.md        -- KEEP (Cursor workflow-specific)
      product-knowledge.md         -- KEEP (Cursor workflow-specific)
      layout-patterns.md           -- KEEP (Cursor workflow-specific)
      token-usage.md               -- REPLACE with pointer to guidelines/design-tokens/
      component-inventory.md       -- REPLACE with pointer to guidelines/overview-components.md
      modal-patterns.md            -- REPLACE with pointer to guidelines/components/modal.md
```

**Key principle:** Content about **what the design system is and how to use it** lives in `guidelines/` (shared). Content about **Cursor-specific workflows** (prototype generation, file structure conventions, Figma-to-code mapping) stays in `.cursor/rules/`.

### Package Structure for npm

The library needs to be extractable from the application:

```
src/
  components/         -- Library components (published)
  tokens/             -- Library tokens (published)
  styles/             -- Global CSS (published as dist/styles.css)
  prototypes/         -- Application-only (NOT published)
  pages/              -- Application-only (NOT published)
  context/            -- Application-only (NOT published)
  App.tsx             -- Application-only (NOT published)
  main.tsx            -- Application-only (NOT published)
```

The existing separation between `src/components/` + `src/tokens/` (library) and `src/prototypes/` + `src/pages/` (app) already aligns well with this.

---

## Summary: Work Items by Priority

### P0 -- Required for Figma Make

1. **Create library build configuration** -- Vite lib mode config, tsconfig for declarations, updated package.json with exports/main/types/peerDependencies
2. **Create `guidelines/` folder** -- `Guidelines.md` entry point, restructure existing documentation into Figma Make format
3. **Create design-tokens guidelines** -- Split token docs into `colors.md`, `typography.md`, `spacing.md`
4. **Create per-component guidelines** -- Individual files for each of the 43+ components (can be generated from existing component source + patterns docs)
5. **Create `overview-icons.md**` -- Consolidate scattered icon documentation
6. **Bundle CSS** -- Ensure CSS Modules and `tokens.css` are included in the package output
7. **Publish to npm** -- Either public registry or Figma's private registry

### P1 -- Recommended for Quality

1. **Refactor `.cursor/rules/**` -- Point token-usage, component-inventory, and modal-patterns rules to the shared `guidelines/` files to avoid duplication
2. **Create `overview-components.md**` -- Adapt from component-inventory.md with Figma Make formatting
3. **Add correct/incorrect examples** -- Enhance component guidelines with visual "do/don't" patterns

### P2 -- Nice to Have

1. **Create a Figma Make template** -- After package is published, create a starter template
2. **Add Storybook** -- Would serve as documentation for both Figma Make AI and human developers

