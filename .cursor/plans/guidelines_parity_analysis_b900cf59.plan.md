---
name: Guidelines Parity Analysis
overview: A detailed comparison of the Figma Make design system guidelines structure (from the official documentation) against the current figmaradiant project's approach, identifying areas of parity, gaps, and unique strengths.
todos: []
isProject: false
---

# Figma Make Guidelines vs Current Approach: Parity Analysis

## Overall Assessment

The current project has **strong content coverage** -- the knowledge is there -- but the **structure is fundamentally different** because it is optimized for **Cursor IDE** (using `.cursor/rules/` with glob-based auto-attachment) rather than **Figma Make** (which expects a `guidelines/` folder hierarchy). Below is the area-by-area breakdown.

---

## 1. Directory Structure

**Figma Make expects:**
```
guidelines/
  Guidelines.md          (entry point)
  overview-components.md
  overview-icons.md
  design-tokens/
    colors.md
    typography.md
    spacing.md
  components/
    button.md
    tabs.md
    modal.md
    ...
```

**Current project has:**
```
.cursor/rules/           (10 rule files with glob frontmatter)
docs/                    (4 detailed documentation files)
design-token-structure.md (root-level)
src/tokens/README.md
```

**Parity: LOW (structurally incompatible)**
- No `guidelines/` folder exists at all
- Content is spread across `.cursor/rules/`, `docs/`, and root-level files
- The Cursor glob-based auto-attachment system has no equivalent in Figma Make

---

## 2. Top-Level Entry Point (`Guidelines.md`)

**Figma Make expects:** A single `Guidelines.md` that introduces the design system, lists available packages, and gives step-by-step reading instructions (read overviews first, then tokens, then component docs before using them).

**Current project has:** No single entry point. Cursor rules are auto-attached based on file glob patterns in each rule's frontmatter. There is no orchestration file telling an AI what to read and in what order.

**Parity: MISSING**

---

## 3. Component Overview

**Figma Make expects:** `overview-components.md` listing all components with their purpose and pointer to per-component docs.

**Current project has:** [`.cursor/rules/component-inventory.md`](.cursor/rules/component-inventory.md) -- this is very close in spirit. It includes:
- A decision tree for component selection
- Full component reference table with props
- Common component combinations/patterns
- Component status (Stable/Beta/In Development)

**Parity: HIGH (content is strong, naming differs)**
- Content quality actually exceeds the Figma Make example
- Missing: pointers to per-component guideline files (because they don't exist as individual files)

---

## 4. Icon Overview

**Figma Make expects:** `overview-icons.md` explaining icon sizes, naming conventions, import patterns, and how to find/verify icons.

**Current project has:** Icon info is scattered across:
- Component inventory (lists 46 icon names)
- [`.cursor/rules/figma-component-mapping.md`](.cursor/rules/figma-component-mapping.md) (icon mapping table)
- [`.cursor/rules/design-system.md`](.cursor/rules/design-system.md) (icon integration code pattern)
- Source code: `src/components/icons/Icon.types.ts`, `registry.ts`

**Parity: PARTIAL**
- The information exists but is fragmented across 4+ files
- No single dedicated icon overview document
- Missing: clear statement of total icon count, size variants documentation, "how to verify an icon exists" instructions

---

## 5. Design Token Documentation

**Figma Make expects:** A `design-tokens/` folder with separate files for colors, typography, spacing, each containing: design philosophy, naming patterns, token lists with examples, decision trees, correct/incorrect usage.

**Current project has:**
- [`design-token-structure.md`](design-token-structure.md) -- 3-tier architecture overview (Brand/Alias/Mapped), color tables, typography scales, spacing values
- [`.cursor/rules/token-usage.md`](.cursor/rules/token-usage.md) -- practical usage guide with import paths, anti-patterns, common combinations
- [`src/tokens/README.md`](src/tokens/README.md) -- tokens directory documentation

**Parity: HIGH (content), MEDIUM (structure)**
- Content is comprehensive and arguably more practical than the Figma Make example (includes code snippets, anti-patterns, common combinations)
- Colors: well documented with brand scales, semantic colors, status colors, and hex-to-token mapping
- Typography: documented with v2TextStyles, font sizes, weights
- Spacing: documented with named scale (A-N), semantic aliases, and component-specific spacing
- Gap: not organized into separate files per token type as Figma Make recommends
- Gap: missing explicit "decision tree" format for token selection (e.g., "Need a background color? Start with...")
- Gap: missing correct/incorrect visual examples for color pairing (like the "on-" role examples in the Figma Make docs)

---

## 6. Per-Component Guidelines

**Figma Make expects:** Individual files per component in `components/` (e.g., `tabs.md`, `button.md`) with: when to use, semantic purpose, structure, usage notes, props API, and code examples.

**Current project has:**
- [`.cursor/rules/modal-patterns.md`](.cursor/rules/modal-patterns.md) -- this is the closest match; it covers Modal thoroughly with size guide, type guide, code examples, token usage, and accessibility
- [`docs/component-patterns.md`](docs/component-patterns.md) -- architectural patterns for all components (general, not per-component)
- `docs/component-api-reference.md` -- API reference (combined file)
- [`.cursor/rules/layout-patterns.md`](.cursor/rules/layout-patterns.md) -- layout patterns with full code examples

**Parity: LOW-MEDIUM**
- Only Modal has a dedicated guideline file (modal-patterns.md) -- and it's excellent
- No per-component guideline files for Button, Tabs, Select, TextInput, Alert, Table, etc.
- The component-patterns.md is architectural guidance, not per-component usage guidance
- This is the biggest structural gap vs the Figma Make recommendation

---

## 7. AI Optimization / Wording

**Figma Make recommends:** Clear, imperative language. "Do not use small text for anything except captions" > "Use small text sparingly."

**Current project uses:**
- Strong imperative directives: "NEVER hard-code colors", "ALWAYS prefer existing components", "MUST follow this folder structure"
- Good use of anti-pattern examples
- Decision trees for component selection
- Code examples with CORRECT/WRONG annotations

**Parity: HIGH**
- The wording style aligns well with Figma Make recommendations
- Already uses the direct, imperative tone that works best for AI

---

## 8. Unique Strengths (Current Project Has, Figma Make Doesn't Require)

The current project has several valuable assets that go beyond Figma Make's guidelines model:

- **Figma-to-Radiant Mapping** ([`figma-component-mapping.md`](.cursor/rules/figma-component-mapping.md)) -- maps Figma layer names, variants, auto-layout, colors, and typography to Radiant equivalents
- **Content Guidelines** ([`content-guidelines.md`](.cursor/rules/content-guidelines.md)) -- ThoughtSpot voice and tone, sentence case rules, button label conventions
- **Product Knowledge** ([`product-knowledge.md`](.cursor/rules/product-knowledge.md)) -- domain context about ThoughtSpot
- **Layout Patterns** ([`layout-patterns.md`](.cursor/rules/layout-patterns.md)) -- full page layout templates with code
- **Prototype Generation Rules** ([`prototype-generation.md`](.cursor/rules/prototype-generation.md), [`prototype-structure.md`](.cursor/rules/prototype-structure.md)) -- specific to the prototyping workflow
- **Cursor Glob Matching** -- rules auto-attach based on file patterns being edited, which is context-aware

---

## Summary Table

| Guideline Area | Figma Make Standard | Current Project | Parity Level |
|---|---|---|---|
| `guidelines/` folder structure | Required | Missing | NONE |
| `Guidelines.md` entry point | Required | Missing | NONE |
| `overview-components.md` | Required | `component-inventory.md` | HIGH (content) |
| `overview-icons.md` | Required | Scattered across files | LOW |
| `design-tokens/colors.md` | Required | `token-usage.md` + `design-token-structure.md` | HIGH (content) / LOW (structure) |
| `design-tokens/typography.md` | Required | Section in `token-usage.md` | MEDIUM |
| `design-tokens/spacing.md` | Required | Section in `token-usage.md` | MEDIUM |
| Per-component docs (`components/*.md`) | Required | Only Modal has dedicated file | LOW |
| AI-friendly wording | Required | Already strong | HIGH |
| Figma mapping | Not in model | Unique strength | N/A (bonus) |
| Content guidelines | Not in model | Unique strength | N/A (bonus) |
| Layout patterns | Not in model | Unique strength | N/A (bonus) |

---

## Bottom Line

**Content quality: 8/10** -- The knowledge and documentation content is thorough, well-written, and AI-optimized.

**Structural parity with Figma Make: 2/10** -- The organization is Cursor-native, not Figma Make compatible. If the goal is to use these guidelines with Figma Make, a restructuring into the `guidelines/` folder format would be needed while preserving all the existing content.

**Key gaps to close (if targeting Figma Make compatibility):**
1. Create a `guidelines/` folder with a `Guidelines.md` entry point
2. Create a `guidelines/design-tokens/` folder with separate color, typography, and spacing files
3. Create a `guidelines/components/` folder with per-component guideline files (Button, Tabs, Modal, Select, TextInput, Table, Alert, etc.)
4. Create a dedicated `guidelines/overview-icons.md`
5. Adapt `component-inventory.md` into `guidelines/overview-components.md`
