---
description: Master orchestration — classifies every task by intent and loads only the rule files needed. Keeps context lean for minor work, full for builds.
globs: ["src/**/*.tsx", "src/**/*.ts", "src/**/*.css"]
alwaysApply: true
---

# Radiant Rules Orchestration

Classify the task by intent, then load only what's needed. Use semantic meaning, not just keywords — "make the grid responsive" is a layout concern even without the word "dashboard."

---

## Step 0: Exploratory check

Before classifying into a tier, check for exploratory mode.

If `/explore` was invoked in this session → suspend Radiant constraints for the specified scope. See the `/explore` skill for details.

If the file has a `// @explore:` marker but `/explore` was NOT invoked this session → ask the designer: "This file has an @explore marker from a previous session. Continue in exploratory mode or return to Radiant compliance?"

If neither → proceed to Step 1.

---

## Step 1: Classify by intent

### Tier 0 — Minor tweak

**Intent:** Small, scoped change. CLAUDE.md + component summary provide enough context.

**Signals:**
- Fixing a single value (color, spacing, font, icon, label)
- Renaming, reordering, or removing an existing element
- Adjusting alignment, padding, or margin
- Fixing a build error or TypeScript issue
- Toggling a prop or swapping a variant
- Wrapping an element with a simple component (Tooltip, Horizontal)
- Any change touching ≤2 files with no new components

**Action:** No additional rule files. Use CLAUDE.md conventions and the component summary (always loaded).

**Response style:** For Tier 0 tasks, respond concisely — make the change and confirm what you did in one sentence. No preamble, no explanation of why tokens are better than hardcoded values, no restating what the designer asked for.

**Figma at Tier 0:** If a Figma URL or screenshot is provided for a single-value lookup (e.g., "what token is this color?"):
- Raw hex value or screenshot → load `figma-component-mapping.md` only
- Figma URL → load `figma-mcp-workflow.md` + `figma-component-mapping.md`
Do not escalate to Tier 1 — the scope is still a single-value fix.

---

### Tier 1 — Moderate change

**Intent:** Adding or modifying a feature within an existing prototype.

**Signals:**
- Adding a new section, panel, or interaction
- Replacing a component with a different one
- Adding a modal, dialog, or confirmation flow
- Adding a table, filter, or search
- Changing layout structure (sidebar, tabs, grid)
- Writing or rewriting multiple UI strings

**Action:** Load ONLY the rule files matching the specific concern:

| Concern | Rule file | Semantic triggers |
|---------|-----------|-------------------|
| **Page structure** | `layout-patterns.md` | Adding/changing layout, sidebar, header, grid, responsive behavior, dashboard, content areas |
| **Interactive widgets** | `widget-patterns.md` | Tables, alerts, toasts, menus, tooltips, empty states, date pickers, filter lists, action menus, delete flows |
| **Modals & dialogs** | `modal-patterns.md` | Any overlay — confirmation, wizard, form modal, filter dialog, multi-step flow |
| **State handling** | `interaction-patterns.md` | Loading spinners, skeletons, error states, disabled controls, transitions |
| **Component details** | `component-inventory.md` | Need full props, code examples, or checking if a specific component exists |
| **Token deep-dive** | `token-usage.md` | Need full color scale, component-specific tokens, CSS variable names, or anti-pattern reference |
| **UX copy** | `content-guidelines.md` | Writing/changing buttons, titles, labels, errors — need approved word list or forbidden words |
| **ThoughtSpot terms** | `product-knowledge.md` | Prototype references Answer, Liveboard, SpotIQ, Worksheet, Monitor |
| **Figma URL** | `figma-mcp-workflow.md` + `figma-component-mapping.md` | User provides a `figma.com/design/...` URL |
| **Figma screenshot** | `figma-component-mapping.md` | User pastes a screenshot or references Figma layers |
| **Liveboard work** | `liveboard-ia.md` | Editing or adding to an existing Liveboard prototype |
| **Liveboard build** | `liveboard-ia.md` + `liveboard-scaffolding.md` | Building a new Liveboard from scratch (also Tier 2) |

---

### Tier 2 — Full prototype build

**Intent:** Building a new prototype from scratch, or substantially rebuilding an existing one.

**Signals:**
- "Build a ...", "Create a ...", "New prototype for ..."
- Request describes a complete page or multi-view flow
- Scaffolding a new prototype folder
- Figma URL or screenshot describing a full page

**Action:** Load mandatory files, then add concern-matched files from the Tier 1 table.

**Mandatory (on top of always-loaded):**
- `prototype-generation.md` — step-by-step build workflow, visual verification loop
- `component-inventory.md` — full component reference with props and examples

**Add based on content:**
- Liveboard → `liveboard-ia.md` + `liveboard-scaffolding.md`
- New folder needed → `prototype-structure.md`
- Substantial UI copy → `content-guidelines.md`
- Complex token usage → `token-usage.md`

---

### Tier 3 — Design system work

**Intent:** Creating or modifying a shared component in `src/components/`.

**Signals:**
- Target file is in `src/components/`
- "Add a new component to the design system"
- Modifying component API, props, or accessibility

**Action:** Load these 4 files:
- `design-system.md` — forwardRef, TypeScript, CSS Modules, accessibility
- `component-inventory.md` — check if a component already exists
- `token-usage.md` — CSS variables and TypeScript token imports
- `content-guidelines.md` — default labels, placeholder text, error messages

---

## Session memory

If a rule file is already in your context from an earlier message in this session, **do not re-read it.** Track which files you've loaded — only load new files when the concern changes or escalates.

When switching between unrelated tasks in the same session, suggest `/compact` to the designer — it resets accumulated context and reduces token cost for subsequent messages.

---

## Cross-references

When a rule file says "See X.md §Section", read that file if the referenced content is needed for the current task. Do not pre-load referenced files — only read when you actually need the content.

---

## Key rules (always apply, no file needed)

These are in CLAUDE.md and the component summary — follow without loading additional files:

1. **Never hardcode** — colors, spacing, fonts always from tokens
2. **Use Radiant components** — no raw `<button>`, `<input>`, `<table>`, `<select>`
3. **Layout primitives** — `Horizontal`/`Vertical`/`View` not inline flex; `Grid`/`RdGrid` not inline grid
4. **Local components** — prototype-specific components in `src/prototypes/<Name>/components/`, not `src/components/`
5. **Sentence case** — all UI text, imperative verbs for buttons
6. **Mock data** — import from `../../mocks` for realistic content
