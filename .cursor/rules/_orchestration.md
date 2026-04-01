---
description: Master orchestration — classifies every task by intent and loads only the rule files needed. Keeps context lean for minor work, full for builds.
globs: ["src/**/*.tsx", "src/**/*.ts", "src/**/*.css"]
alwaysApply: true
---

# Radiant Rules Orchestration

Classify by intent, then load only what's needed. Use semantic meaning — "make the grid responsive" is a layout concern even without the word "dashboard."

---

## Step 0: Exploratory check

If `/explore` was invoked → suspend Radiant constraints for that scope.
If a file has `// @explore:` but `/explore` was NOT invoked → ask: "Continue in exploratory mode or return to Radiant compliance?"
Otherwise → proceed to Step 1.

## Step 0b: Context budget check

Before loading any files, check if a topic switch is happening. Natural boundaries:
- A full prototype was just completed and the next request is unrelated
- Switching from building → analysis, or analysis → building
- Starting a new feature after shipping the previous one
- Session has covered 3+ distinct tasks

If a topic switch is detected → proactively say:
*"Before we start — this is a good point to run `/compact`. It resets the session context and significantly reduces cost on the 1M model. Run it now and come back with the new request."*

Do not wait to be asked. Do not load any rule files until after the designer decides.

---

## Step 1: Classify by intent

### Tier 0 — Minor tweak
Single value, prop, or label. CLAUDE.md + component summary are sufficient. No additional files.

**Signals:** Fix a value · rename/reorder an element · adjust alignment/padding · fix a build error · toggle a prop · swap a variant · wrap with Tooltip or Horizontal · ≤2 files, no new components

**Response style:** One sentence. No preamble.

**Figma at Tier 0:** Single-value lookup only. Raw hex/screenshot → `figma-component-mapping.md`. Figma URL → `figma-mcp-workflow.md` + `figma-component-mapping.md`. Do not escalate to Tier 1.

---

### Tier 1 — Moderate change
Adding or modifying a feature within an existing prototype.

**Signals:** New section, panel, or interaction · replacing a component · adding a modal/dialog/confirmation · adding a table/filter/search · layout structure change · rewriting multiple UI strings

**Action:** Load **ALL** rule files matching the task's concerns below. Matching 3+ rows is expected for compound tasks.

**Shared component audit:** If the implementation imports from `src/components/`, read its `.module.css` first. If it contains `!important`, gradients, or hardcoded hex — fix it before using it (apply Tier 3 rules to that file).

| Concern | Rule file | Semantic triggers |
|---------|-----------|-------------------|
| **Page structure** | `layout-patterns.md` | Layout, sidebar, header, grid, responsive, dashboard, content areas |
| **Interactive widgets** | `widget-patterns.md` | Tables, alerts, toasts, menus, tooltips, empty states, date pickers, action menus, delete flows |
| **Data table / list** | `component-inventory.md` | Any table of rows, object list, data grid — check if Radiant `Table` covers the need before building custom |
| **Interactive element** | `component-inventory.md` | Toggle, switch, status indicator, checkbox, radio, segmented control — check component-inventory before building custom |
| **Modals & dialogs** | `modal-patterns.md` | Any overlay — confirmation, wizard, form modal, filter dialog, multi-step flow |
| **State handling** | `interaction-patterns.md` | Loading spinners, skeletons, error states, disabled controls, transitions |
| **Component details** | `component-inventory.md` | Need full props, code examples, or checking if a specific component exists |
| **Token deep-dive** | `token-usage.md` | Full color scale, component tokens, CSS variable names, anti-pattern reference |
| **UX copy** | `content-guidelines.md` | Writing/changing buttons, titles, labels, errors |
| **ThoughtSpot terms** | `product-knowledge.md` | Answer, Liveboard, SpotIQ, Worksheet, Monitor |
| **Figma URL** | `figma-mcp-workflow.md` + `figma-component-mapping.md` | `figma.com/design/...` URL provided |
| **Figma screenshot** | `figma-component-mapping.md` | Screenshot or Figma layer reference |
| **Liveboard work** | `liveboard-ia.md` | Editing or adding to an existing Liveboard prototype |
| **Liveboard build** | `liveboard-ia.md` + `liveboard-scaffolding.md` | Building a new Liveboard from scratch |

---

### Tier 2 — Full prototype build
New prototype from scratch or substantially rebuilding an existing one.

**Signals:**
- Task requires a new route/page that doesn't exist yet
- Result will be a standalone prototype (not a section within an existing one)
- User references an existing prototype as a template ("similar to X", "like X but for")
- Complete page, multi-view flow, or full-screen experience
- Scaffolding a new prototype folder
- Figma URL or screenshot describing a full page

**Litmus test:** If the end result is a new file in `src/prototypes/`, it's Tier 2.

**Mandatory files:**
- `prototype-generation.md` — step-by-step build workflow, visual verification loop
- `component-inventory.md` — full component reference with props and examples

**Add based on content:** Liveboard → `liveboard-ia.md` + `liveboard-scaffolding.md` · New folder → `prototype-structure.md` · Substantial copy → `content-guidelines.md` · Complex tokens → `token-usage.md`

**Post-build:** After completing a Tier 2 build, suggest `/compact` before continuing — full prototype builds saturate context and the next task benefits from a clean slate.

---

### Tier 3 — Design system work
Creating or modifying a shared component in `src/components/`.

**Signals:** Target file is in `src/components/` · "Add a component to the design system" · Modifying component API, props, or accessibility

**Load:** `design-system.md` · `component-inventory.md` · `token-usage.md` · `content-guidelines.md`

---

## Step 2: Pre-implementation gate

**Before writing any code**, answer these 4 questions:

**1. New UI element?**
Check `component-summary.md` — does a Radiant component exist for this?
If unsure → load `component-inventory.md` before deciding to build custom.

**2. Using `src/components/`?**
Read its `.module.css` — if it has `!important`, gradients, or hardcoded hex → fix first (Tier 3).

**3. Using an icon?**
Verify the name exists in `component-summary.md` icon list.
Valid sizes: `xs` · `s` · `m` · `l` — no `xl`, no numeric values.
Always pass `iconPosition="leading"` or `"trailing"` when using the `icon` prop on Button.

**4. Any UI text?**
Check CLAUDE.md forbidden words before writing labels, buttons, or titles.

---

## Session memory

If a rule file is already in context from an earlier message, **do not re-read it.** Only load new files when the concern changes or escalates. Suggest `/compact` when switching between unrelated tasks.

---

## Rule file integrity

Before using a code example from any rule file, verify it matches the component interface. Known broken patterns to watch for:
- `<Button icon="x" />` without `iconPosition` → icon won't render
- `<Icon size="xl" />` → `xl` is not a valid size
- `<Alert variant="section" buttonText="..." />` → `buttonText` only works in `variant="page"`

If an example conflicts with the component's TypeScript interface, trust the source file over the example.

---

## Key rules (always apply, no file needed)

1. **Never hardcode** — colors, spacing, fonts always from tokens
2. **Use Radiant components** — no raw `<button>`, `<input>`, `<table>`, `<select>`
3. **Layout primitives** — `Horizontal`/`Vertical`/`View` not inline flex; `Grid`/`RdGrid` not inline grid
4. **Local components** — prototype-specific in `src/prototypes/<Name>/components/`, not `src/components/`
5. **Sentence case** — all UI text, imperative verbs for buttons
6. **Mock data** — import from `../../mocks` for realistic content
