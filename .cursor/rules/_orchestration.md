---
description: Master orchestration guide for AI — determines which rule files to consult and in what order
globs: ["src/**/*.tsx", "src/**/*.ts", "src/**/*.css"]
---

# Radiant Rules Orchestration

This file tells you **which guideline files to consult** depending on the task. Always read this file first when working in the Radiant codebase.

---

## Task: Generating a Prototype

When a designer asks you to create or modify a prototype (files in `src/prototypes/`), consult these files in order:

| Priority | File | When to consult |
|----------|------|-----------------|
| 1 | `prototype-generation.md` | **Always** — core workflow, code structure, and import patterns |
| 2 | `component-inventory.md` | **Always** — find the right component via decision tree |
| 3 | `widget-patterns.md` | When building alerts, toasts, tables, menus, tooltips, empty states, delete confirmations, or any multi-component interaction pattern |
| 4 | `layout-patterns.md` | When building a full page — pick a layout template (dashboard, admin, form, table page, wizard) |
| 5 | `figma-component-mapping.md` | When the input is a Figma screenshot or Figma layer names |
| 6 | `modal-patterns.md` | When building modals or dialogs — size selection (M1-M4), type (simple/wizard/subnav/splash), footer button placement |
| 7 | `token-usage.md` | **Always** — styling reference, never hard-code values |
| 8 | `content-guidelines.md` | **Always** — all UI text must follow ThoughtSpot content rules |
| 9 | `product-knowledge.md` | When the prototype references ThoughtSpot features (Answers, Liveboards, Spotter, Connections, SpotIQ, Monitors) |
| 10 | `prototype-structure.md` | When organizing files, creating thumbnails, or registering a prototype |

### Quick decision tree

```
What is the input?
├── "Create a new prototype" (via chat or screenshot)
│   → Create folder in src/prototypes/, auto-register in registry.ts, then follow prototype-generation.md
├── Figma screenshot or URL
│   → Start with figma-component-mapping.md to map layers/colors/icons, then prototype-generation.md
│   → MUST drill into Figma sub-nodes when design is too large (see prototype-generation.md §10)
│   → MUST visually verify output against Figma before declaring done (see prototype-generation.md §9)
├── Text description of a UI
│   → Start with prototype-generation.md + component-inventory.md
├── "Build a dashboard / admin panel / settings page"
│   → Start with layout-patterns.md for the template, then prototype-generation.md
├── "Build a modal / wizard / dialog"
│   → Start with modal-patterns.md, then prototype-generation.md
└── "Add a table / menu / alert / toast"
    → Start with widget-patterns.md for interaction rules, then prototype-generation.md
```

---

## Task: Creating or Modifying a Component

When creating or modifying a component in `src/components/`, consult these files:

| Priority | File | When to consult |
|----------|------|-----------------|
| 1 | `design-system.md` | **Always** — file structure, forwardRef, TypeScript patterns, accessibility |
| 2 | `token-usage.md` | **Always** — CSS variables in modules, TypeScript imports for inline styles |
| 3 | `content-guidelines.md` | **Always** — default labels, placeholder text, error messages |
| 4 | `component-inventory.md` | Before creating — check if a component already exists |

---

## Task: Writing UI Text or Labels

For any user-facing text (buttons, titles, errors, descriptions):

| Priority | File | Scope |
|----------|------|-------|
| 1 | `content-guidelines.md` | Quick rules for buttons, labels, titles, errors |
| 2 | `product-knowledge.md` | Capitalized ThoughtSpot terms (Answer, Liveboard, SpotIQ, etc.) |

---

## Key Rules (Always Apply)

1. **Never hard-code colors, spacing, or typography** — use design tokens (see `token-usage.md`)
2. **Always prefer existing components** — check `component-inventory.md` before creating custom elements
3. **Follow ThoughtSpot content rules** — sentence case, imperative verbs, no periods in buttons (see `content-guidelines.md`)
4. **Use mock data** — import from `../../mocks` for realistic content
5. **Use the component decision tree** in `component-inventory.md` to pick the right component
6. **Follow widget interaction rules** in `widget-patterns.md` for correct behavior (alert types, menu ordering, tooltip timing, empty states)
7. **Reuse existing components** — Always search `component-inventory.md` first. Only create a new component if no existing Radiant component can serve the purpose. If a close match exists, prefer using it with props/styling over creating something new.
8. **Local components only** — When a new component IS needed during prototype generation, create it inside the prototype's own folder (`src/prototypes/MyPrototype/components/`), NOT in the shared `src/components/` directory. Follow `design-system.md` for structure even for local components (forwardRef, TypeScript types, design tokens).
