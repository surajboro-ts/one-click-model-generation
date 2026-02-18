# Design System Comparison Guide Guidelines

> Cross-verification between the Radiant Pro Notion documentation (source of truth from ThoughtSpot design team) and the existing prototyping kit guidelines.

**Date:** February 16, 2026
**Sources Compared:**
- **Notion**: `notion-guidelines.md` (consolidated from ThoughtSpot's Notion workspace)
- **Project**: 15 guideline files across `.cursor/rules/`, `docs/`, and root

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [File-by-File Comparison Matrix](#2-file-by-file-comparison-matrix)
3. [Typography Comparison](#3-typography-comparison)
4. [Color System Comparison](#4-color-system-comparison)
5. [Component Comparison](#5-component-comparison)
6. [Surface & Modal Comparison](#6-surface--modal-comparison)
7. [Widget Comparison](#7-widget-comparison)
8. [Content Guidelines Comparison](#8-content-guidelines-comparison)
9. [Token Architecture Comparison](#9-token-architecture-comparison)
10. [Icon System Comparison](#10-icon-system-comparison)
11. [Gaps: In Notion but Missing from Project](#11-gaps-in-notion-but-missing-from-project)
12. [Gaps: In Project but Missing from Notion](#12-gaps-in-project-but-missing-from-notion)
13. [Conflicts & Discrepancies](#13-conflicts--discrepancies)
14. [Recommendations](#14-recommendations)

---

## 1. Executive Summary

### Overall Alignment Score: **~75% aligned**

The existing project guidelines are well-constructed for a prototyping kit but were authored independently from the Notion source material. The project guidelines focus heavily on **implementation patterns** (React, CSS Modules, TypeScript), while Notion focuses on **design specifications** (pixel specs, use cases, interaction behaviors). Together they complement each other, but there are notable gaps and some conflicts.

### Key Findings

| Category | Status |
|----------|--------|
| **Color System** | Strong alignment with minor hex discrepancies |
| **Typography** | Aligned on scale, diverges on font weight interpretation |
| **Components** | Project has more implemented components than Notion documents |
| **Surfaces/Modals** | Project has implementation; Notion has richer UX specifications |
| **Widgets** | Major gap — Notion has extensive widget specs not reflected in project |
| **Content Guidelines** | Strong alignment with project adding more detail |
| **Icons** | Project has 46 implemented icons; Notion has anatomy/creation guidelines |
| **Token Architecture** | Aligned on 3-tier model with project adding implementation detail |

---

## 2. File-by-File Comparison Matrix

| Notion Section | Project File(s) | Alignment | Notes |
|---------------|-----------------|-----------|-------|
| Goals & Strategy | No equivalent | **Gap** | Project lacks design system philosophy documentation |
| Typography | `token-usage.md`, `design-token-structure.md` | **Partial** | Project has implementation; Notion has design rationale |
| Color System | `token-usage.md`, `design-token-structure.md`, `figma-component-mapping.md` | **Strong** | Hex values mostly match; project adds implementation layer |
| Surfaces | `modal-patterns.md`, `layout-patterns.md` | **Partial** | Project covers modals well but misses page surface types |
| Widgets | No equivalent | **Major Gap** | 20+ widget specs in Notion with no project counterpart |
| Components | `component-inventory.md`, `design-system.md`, `component-patterns.md` | **Strong** | Project has more components than Notion documents |
| Icons | `component-inventory.md`, `figma-component-mapping.md` | **Partial** | Project has implementation; Notion has design guidelines |
| Content Guidelines | `content-guidelines.md`, `content-guidelines-detailed.md` | **Strong** | Project is more comprehensive than Notion |
| Prototyping Workflow | `prototype-generation.md`, `prototype-structure.md`, `prototyping-guide.md` | **Project Only** | No Notion equivalent (prototyping is kit-specific) |
| Product Knowledge | `product-knowledge.md` | **Project Only** | Good context; Notion assumes domain knowledge |
| Figma Mapping | `figma-component-mapping.md` | **Project Only** | Bridge between Figma and code |
| Layout Patterns | `layout-patterns.md` | **Partial** | Could be enriched with Notion's surface specs |

---

## 3. Typography Comparison

### Font Family
| Aspect | Notion | Project | Status |
|--------|--------|---------|--------|
| Primary font | Plain | Plain | **Aligned** |
| Mono font | Not specified | SF Mono | **Project extends** |
| Italics | Explicitly not supported | Not mentioned | **Gap** — project should document this restriction |

### Type Scale

| Role | Notion (size/weight) | Project Token | Status |
|------|---------------------|---------------|--------|
| Large Headline | 32pt / 600 | `fontSize['3xl']` (32px) / `fontWeight.semibold` (600) | **Aligned** |
| Page Title | 24pt / 600 | `fontSize['2xl']` (24px) / `fontWeight.semibold` (600) | **Aligned** |
| Modal Title | 20pt / 600 | `fontSize.xl` (20px) / `fontWeight.medium` (500) | **Conflict** — weight differs |
| Section Label | 18pt / 600 | `fontSize.lg` (18px) / `fontWeight.medium` (500) | **Conflict** — weight differs |
| Content Label | 16pt / 600 | `fontSize.md` (16px) / `fontWeight.medium` (500) | **Conflict** — weight differs |
| Content Label Subhead | 14pt / 600 | `fontSize.sm` (14px) / `fontWeight.medium` (500) | **Conflict** — weight differs |
| Body Large | 16pt / 400 | `fontSize.md` (16px) / `fontWeight.light` (375) | **Conflict** — Notion says 400, project says 375 |
| Body Normal | 14pt / 400 | `fontSize.sm` (14px) / `fontWeight.light` (375) | **Conflict** — Notion says 400, project says 375 |
| Footnote | 12pt / 400 | `fontSize.xs` (12px) / `fontWeight.regular` (400) | **Aligned** |

### Font Weight Discrepancies

| Notion Weight | Notion Description | Project Token | Project Value |
|--------------|-------------------|---------------|---------------|
| 400 | Normal/Regular (body) | `fontWeight.light` | 375 |
| 600 | Bold (headings) | `fontWeight.semibold` | 600 |
| 600 | Bold (labels) | `fontWeight.medium` | 500 |
| 700 | `<b>` tag emphasis | Not documented | — |

**Issue:** Notion specifies 600 for all headings and labels, but the project's `design-token-structure.md` maps these to `fontWeight.medium` (500) for modal titles, section labels, and content labels. The project also uses 375 (Light) for body text where Notion specifies 400 (Regular).

**Root Cause:** The Notion documentation notes that "Platforms and browsers render fonts differently and weight may differ across platforms like Figma or their design tools." The project's weights (375, 500) appear to be Figma-rendering equivalents, while Notion's weights (400, 600) are the HTML/CSS values.

**Recommendation:** Clarify in both documents that Figma weights (375/500) ≈ CSS weights (400/600). Both are correct in their respective contexts.

### Line Heights

| Role | Notion | Project | Status |
|------|--------|---------|--------|
| Large Headline | 40px | 40px | **Aligned** |
| Page Title | 32px | 32px | **Aligned** |
| Modal Title | 28px | 28px | **Aligned** |
| Section Label | 24px | 24px | **Aligned** |
| Body Normal | 20px | 20px | **Aligned** |
| Footnote | 18px | 18px | **Aligned** |

Line heights are fully aligned across both sources.

### Letter Spacing

| Role | Notion | Project | Status |
|------|--------|---------|--------|
| Display / Title | -0.4px | Not documented | **Gap** — project missing letter-spacing tokens |
| All others | 0px | Not documented | **Gap** |

---

## 4. Color System Comparison

### Baseline Grayscale

| Role | Notion Hex | Project Token | Project Hex | Status |
|------|-----------|---------------|-------------|--------|
| Text 1 (Default) | `#1D232F` | `brandColors.gray[90]` | `#1D232F` | **Aligned** |
| Text 2 (Secondary) | `#777E8B` | `brandColors.gray[60]` | `#777E8B` | **Aligned** |
| Outline | `#C0C6CF` | `brandColors.gray[40]` | `#C0C6CF` | **Aligned** |
| Divider | `#EAEDF2` | `brandColors.gray[20]` | `#EAEDF2` | **Aligned** |
| Background | `#F6F8FA` | `brandColors.gray[10]` | `#F6F8FA` | **Aligned** |
| Surface | `#FFFFFF` | `brandColors.white` | `#FFFFFF` | **Aligned** |

### Primary Color

| Source | Hex | Status |
|--------|-----|--------|
| Notion | `#2770EF` | — |
| Project (`token-usage.md`) | `#2770EF` | **Aligned** |
| Project (`design-token-structure.md`) | `#2770EF` and `#2E75F0` (alternate) | **Minor discrepancy** — alternate blue `#2E75F0` exists in project |

### Semantic Colors

| Meaning | Notion FG | Notion BG | Project FG | Project BG | Status |
|---------|----------|----------|-----------|-----------|--------|
| Success | `#06BF7F` (Green 60) | `#C7F2E3` (Green 20) | `brandColors.green[60]` | `brandColors.green[10]` | **Partial** — BG shade differs (Notion=20, Project=10) |
| Warning | `#FCC838` (Yellow 60) | `#FCF1D1` (Yellow 20) | `brandColors.yellow[60]` | `brandColors.yellow[10]` | **Partial** — BG shade differs |
| Failure | `#E22B3D` (Red 60) | `#FCD4D7` (Red 20) | `brandColors.red[60]` | `brandColors.red[10]` | **Partial** — BG shade differs |
| Info | `#2770EF` (Blue 60) | `#DEE8FA` (Blue 20) | `brandColors.blue[60]` | `brandColors.blue[10]` | **Partial** — BG shade differs |

**Issue:** Notion specifies shade `20` for semantic backgrounds, but the project's `token-usage.md` and CLAUDE.md reference shade `10`. The `design-token-structure.md` actually references shade `20` backgrounds matching Notion. This is an internal project inconsistency.

**Recommendation:** Align the project to use shade `20` for semantic alert backgrounds (matching Notion) and shade `10` for page/section backgrounds only.

### Interaction States

| State | Notion | Project | Status |
|-------|--------|---------|--------|
| Hover (list) | `#C0C6CF1E` (Gray 40 @ 12%) | `List State/Hover: #C0C6CF1F` | **Nearly aligned** — `1E` vs `1F` (12% vs ~12.2%) |
| Selected (list) | `#71A1F41E` (Blue 50 @ 12%) | `List State/Highlight: #71A1F4` (no alpha) | **Discrepancy** — project missing alpha |
| Button default→hover | Color +10 (e.g., Blue 60→70) | Same pattern documented | **Aligned** |
| Focus | 2px Blue 50 outline | 2px `brandColors.blue[60]` outline | **Minor conflict** — Notion=Blue 50, Project=Blue 60 |

### Full Color Palette

Both sources document all 8 color families (Gray, Red, Purple, Blue, Teal, Yellow, Green, Orange) with 10 shades each. Hex values are **fully aligned** between Notion and project.

### Accessibility

| Aspect | Notion | Project | Status |
|--------|--------|---------|--------|
| WCAG level | AA | Not explicitly stated | **Gap** — project should state WCAG AA compliance |
| Normal text contrast | 4.5:1 | Not documented | **Gap** |
| Large text contrast | 3:1 | Not documented | **Gap** |

---

## 5. Component Comparison

### Components Documented in Both

| Component | Notion Spec | Project Implementation | Alignment |
|-----------|-------------|----------------------|-----------|
| **Avatar** | 3 sizes (56/32/24px), 3 group styles, 6 colors | Available as component | **Aligned** |
| **Buttons** | Primary/Secondary/Tertiary, 4 sizes (32/24/20/full) | Primary/Secondary/Tertiary, 3 sizes (small/basic/large) | **Partial** — Project missing XSmall (20px) and Full Bleed |
| **Checkbox** | Selected/unselected/indeterminate | `checked`, `indeterminate` props | **Aligned** |
| **Radio** | Single selection, auto-deselect | Standard radio behavior | **Aligned** |
| **Toggle** | On/off states | `checked`, `onChange` | **Aligned** |
| **Tabs** | Small (32px) / Medium (48px), 1px divider, max 3 words | Available with `tabs`, `activeTab` | **Partial** — size variants not explicit in project |
| **Pagination** | Range + Item types, max 7 items, number wrapping | Available with `page`, `totalPages` | **Partial** |
| **Links** | 3 variants (Default/White/Black) | Available with `href`, `variant` | **Aligned** |
| **Menus** | Max 7 items, 3 width types, search for 8+ | Available with `items`, `onSelect` | **Partial** |
| **Dropdown** | Fixed input, wider menu, max 7 items | Mapped to `Select` component | **Aligned** |
| **Chips** | Trigger/Input/Select types, 320px max, color-coded tokens | Available with `label`, `variant` | **Partial** — search token colors not in project |

### Components in Notion but NOT in Project

| Notion Component | Description | Recommendation |
|-----------------|-------------|----------------|
| **Number Input** | 80px min width, spin buttons | Add to component library or document usage pattern |
| **File Uploader** | Choose and upload files | Consider adding |
| **Segmented Control** | Text OR icons only | Already in project as `SegmentedControl` (beta) |

### Components in Project but NOT in Notion

| Project Component | Description | Notes |
|-------------------|-------------|-------|
| **TextArea** | Multi-line text | Notion only documents single-line text fields |
| **SearchInput** | Search with icon | Notion mentions search within widgets but not as standalone |
| **Select** | Dropdown selection | Notion's "Dropdown" maps to this |
| **DatePicker** | Date selection | Notion documents this as a widget, not component |
| **Toast** | Temporary notification | Notion documents this as a widget |
| **Tooltip** | Hover help | Notion documents this as a widget |
| **Popover** | Click overlay | Not in Notion |
| **LoadingIndicator** | Loading states | Not in Notion |
| **ProgressBar** | Progress visualization | Not in Notion |
| **Card** | Content container | Notion documents this as a widget |
| **Accordion** | Collapsible sections | Not in Notion |
| **Divider** | Visual separator | Not in Notion |
| **Stepper** | Multi-step progress | Not in Notion (implicit in wizard modals) |
| **ConfirmDialog** | Confirmation | Notion documents delete pattern but not as dedicated component |
| **WizardModal** | Multi-step dialog | Notion has this as MO.3 surface |
| **FormModal** | Form in modal | Notion has this as MO.1/MO.2 surface |
| **FilterDialog** | Filter selection | Notion has filter as a widget pattern |
| **Typography** | Styled text | Not in Notion as a component |

---

## 6. Surface & Modal Comparison

### Modal Size Mapping

| Notion Modal Type | Project Modal Size | Alignment |
|-------------------|-------------------|-----------|
| MO.1 Simple dialog | M1 (394px) or M2 (788px) | **Partial** — Notion doesn't specify widths |
| MO.2 Sub-task dialog | M2 (788px) | **Inferred** |
| MO.3 Wizard dialog | M2 (788px) with wizard type | **Aligned** |
| MO.4 Splash screen | M2 (788px) with splashscreen type | **Aligned** |
| MO.5 Information dialog | M2 or M3 (1182px) | **Partial** |
| MO.6 Sub-navigation modal | M3 (1182px) with subnavigation type | **Aligned** |

### Modal Interaction Patterns

| Pattern | Notion | Project | Status |
|---------|--------|---------|--------|
| Overlay color | `#000000` at 60% | `rgba(29, 35, 47, 0.5)` in layout-patterns | **Conflict** — Different overlay colors |
| Esc to close | Yes | Yes (`closeOnEscape` prop) | **Aligned** |
| Click outside to close | Yes | Yes (overlay click) | **Aligned** |
| Primary CTA position | Right in footer | Right in footer | **Aligned** |
| Cancel position | Left/before primary | Left or left side | **Aligned** |
| Focus trap | Not specified | Automatic | **Project extends** |

### Page Surfaces

| Notion Surface | Project Equivalent | Status |
|---------------|-------------------|--------|
| View Surface Page | `layout-patterns.md` data table page | **Partial** |
| Edit Surface Page | `layout-patterns.md` form page | **Partial** |
| Browse Surface Page | `layout-patterns.md` full page layout | **Partial** |
| Wizard Surface Page | No page-level wizard | **Gap** |

**Issue:** Notion defines four distinct page surface types (View, Edit, Browse, Wizard) with specific purposes. The project's `layout-patterns.md` has layout templates but doesn't explicitly map to these surface types.

**Recommendation:** Add surface type documentation to `layout-patterns.md` mapping each Notion surface type to the appropriate layout pattern.

---

## 7. Widget Comparison

This is the **largest gap** between the two systems.

### Notion Widgets with NO Project Equivalent

| Widget Category | Widgets | Impact |
|----------------|---------|--------|
| **Navigation** | Global Navigation, Global Left Rail | High — core navigation patterns |
| **View** | Data Table (spec), Cards (spec), Text Layout | Medium — project has Table component but lacks widget-level spec |
| **Input/Edit** | Text Fields (widget), Object Table, Frequency Picker, Rolling Date Picker, Date Picker, Object Picker, Single Object List Picker, Multi-Object List Picker | High — detailed interaction specs |
| **User Assistance** | Tool Tips (spec), Explainer Cards, Spotlight Cards | Medium — project has Tooltip but lacks explainer/spotlight |
| **Alerts** | Banners (spec), Toasts (spec), Section Alerts, Muted Alerts/Empty States | Medium — project has Alert/Toast but lacks full alert taxonomy |
| **Core Patterns** | Delete Object, Three Dot Menu, Sign Up, Request Data, Download/Export, Share Object | High — common interaction patterns |

### Widget Specs That Would Enhance Project

| Widget | What Notion Adds Over Project |
|--------|------------------------------|
| **Object Table** | Batch actions, column sorting, inline editing, scroll behavior, column width strategy (1366px) |
| **Multi-Object List Picker** | Bulk value addition, nested states, visual specs, error handling |
| **Three Dot Menu** | Action categorization system (Create→View→Edit→Manage→Share→Export→Delete) |
| **Muted Alerts** | Empty state templates (no data, no search results, success, generic warning) |
| **Explainer Cards** | 340px container, click activation, content limits (40 chars/line, max 4 lines) |
| **Spotlight Cards** | System-activated onboarding, sequenced stepper variant |
| **Tool Tips** | 1-second delay specification, content rules (1-2 word nouns) |
| **Toasts** | 5-second auto-dismiss, bottom-center animation, past-tense messaging |
| **Banners** | System-level persistence, close button rules (system-caused vs user-caused) |
| **Section Alerts** | Never multiple per page, close button rules by alert type |
| **Delete Object** | 140-character limit, cascading effect warnings, reconfirmation field |

---

## 8. Content Guidelines Comparison

### Core Rules

| Rule | Notion | Project | Status |
|------|--------|---------|--------|
| Sentence case | Yes | Yes | **Aligned** |
| Active voice | Yes | Yes | **Aligned** |
| Imperative verbs | Yes | Yes | **Aligned** |
| Present tense | Not explicit | Yes | **Project extends** |
| No periods in labels/buttons | Yes | Yes | **Aligned** |

### Component-Specific Text Rules

| Element | Notion | Project | Status |
|---------|--------|---------|--------|
| Button labels | 1-2 words, imperative verbs | 1-2 words, imperative verbs | **Aligned** |
| Titles | Sentence case, max 4 words | Sentence case, max 4 words | **Aligned** |
| Labels | Max 3 words, no articles | Max 3 words, no articles | **Aligned** |
| Tooltips | 1-2 word nouns | Not documented | **Gap** in project |
| Explainer cards | 2-4 word titles, max 4 lines, 40 chars/line | Not documented | **Gap** in project |
| Toasts | Past tense, concise, informal tone | 4-6 words | **Partially aligned** |
| Banners | Short phrases, no periods, include remedy | Issue + Remedy + CTA pattern | **Aligned** |
| Delete confirmation | Max 140 characters | Not specified | **Gap** in project |

### Approved Action Verbs

| Project Approved | Project Avoided |
|-----------------|-----------------|
| Create, Add, Delete, Remove, Save, Cancel, Edit, Export, Import, Search, Filter, Pin, View, Open, Close | Submit, Proceed, Check, Modify, Refresh, Done, Confirm |

Notion doesn't provide an explicit approved verb list but uses the same verbs consistently in examples. **Project is more prescriptive**, which is helpful.

### Areas Where Project Exceeds Notion

| Area | Project Detail | Notion |
|------|---------------|--------|
| Error message pattern | Issue + Remedy + CTA | Not specified |
| Helper text | Format examples, placement rules | Not specified |
| Number formatting | Always digits, 12hr time, DD/MM/YYYY | Not specified |
| Capitalized terms | Explicit list (Answer, Liveboard, SpotIQ...) | Not specified |
| Contractions | Use contractions except in legal flows | Not specified |
| Rewrite examples | 7+ examples of bad→good | Not specified |

---

## 9. Token Architecture Comparison

### Architecture Model

| Layer | Notion Name | Project Name | Status |
|-------|------------|-------------|--------|
| Layer 1 | Value (hex code) | Brand/Primitives | **Aligned** |
| Layer 2 | Generic token (color group) | Alias/Semantic | **Aligned** |
| Layer 3 | Role token (usage) | Mapped/Component | **Aligned** |

Both use a **3-tier token architecture**. Fully aligned on the concept.

### Token Implementation

| Aspect | Notion | Project | Status |
|--------|--------|---------|--------|
| Token naming | By role (Text & Icon / Default) | By role + CSS variables | **Project extends** |
| CSS variables | Not documented (Notion is design-focused) | Full CSS variable system | **Project extends** |
| TypeScript imports | Not applicable | Full import paths documented | **Project extends** |
| Spacing scale | Not explicitly documented | A(4)→J(48) with semantic aliases | **Project extends** |
| Corner radius | Not documented | 4/6/8/12px by usage | **Project extends** |
| Animation tokens | Not documented | `--duration-fast`, `--easing-standard` | **Project extends** |
| Shadow tokens | Not documented | `componentShadows` | **Project extends** |

### Where Notion Adds Value

| Token Area | Notion Specifies | Project Lacks |
|-----------|-----------------|---------------|
| Interaction state math | "Increase/decrease darkness by 10" | Implicit but not documented as a rule |
| Focus state spec | "2px wide, Blue 50" | Uses Blue 60 (discrepancy) |
| List hover alpha | Gray 40 at exactly 12% | Approximately matches |
| Divider context rules | "On dark bg" vs "On light bg" colors | Has divider colors but not context rules |

---

## 10. Icon System Comparison

### Anatomy & Design Guidelines

| Aspect | Notion | Project | Status |
|--------|--------|---------|--------|
| Grid size | 18x18px | Not documented | **Gap** |
| Live area | 16x16px | Not documented | **Gap** |
| Stroke width | 2px with sharp caps | Not documented | **Gap** |
| Shape rules | Filled shapes mix sharp + rounded (1px) corners | Not documented | **Gap** |
| Minimum gap | 1px between shapes/strokes | Not documented | **Gap** |
| Size variants | 18→16→14→12px | xs/s/m/l/xl | **Different terminology** |
| Design tips | 9 specific guidelines | None | **Gap** |
| Creation workflow | 5-step SVG process | None | **Gap** |

### Icon Availability

| Source | Count | Status |
|--------|-------|--------|
| Notion | Not enumerated (references existing set) | — |
| Project | 46 named icons | **Project is more specific** |

**Recommendation:** Add Notion's icon anatomy and design guidelines to a new `.cursor/rules/icon-guidelines.md` file so AI assistants can reference them when creating or suggesting icons.

---

## 11. Gaps: In Notion but Missing from Project

### Critical Gaps

| Gap | Notion Section | Impact | Priority |
|-----|---------------|--------|----------|
| Widget specifications | Widgets (all 20+) | High — detailed interaction patterns missing | **P1** |
| Surface type definitions | Surfaces (View/Edit/Browse/Wizard) | Medium — page templates lack semantic naming | **P2** |
| Three dot menu categorization | Core Patterns | High — action menu organization system | **P1** |
| Empty state templates | Muted Alerts | Medium — no empty state guidance | **P2** |
| Tooltip delay spec (1 second) | User Assistance | Low — specific timing | **P3** |
| Toast duration spec (5 seconds) | Alerts | Low — specific timing | **P3** |
| Icon anatomy | Icons | Low — design team reference | **P3** |
| WCAG AA compliance statement | Color System | Medium — accessibility commitment | **P2** |
| Letter-spacing tokens | Typography | Low — minor visual detail | **P3** |
| Design system goals/philosophy | Goals & Strategy | Low — contextual understanding | **P3** |

### Detailed Widget Gaps

| Widget | Key Specs Missing from Project |
|--------|-------------------------------|
| Object Table | Batch actions, inline editing, column width strategy, scroll behavior |
| Multi-Object List Picker | Bulk value addition (comma-separated), nested states |
| Frequency Picker | Conditional field visibility, validation logic |
| Rolling Date Picker | 14 condition types, 8 time period types |
| Single Object List Picker | Multi-level navigation, create-new flow |
| Explainer Cards | 340px width, click-activated, content limits |
| Spotlight Cards | System-activated, sequenced stepper |
| Banners | Persistence rules, close button logic |
| Section Alerts | Single-per-page rule, type-based close behavior |
| Delete Pattern | 140-char limit, cascading warnings, reconfirmation |
| Sign Up | Password validation flow, error states |

---

## 12. Gaps: In Project but Missing from Notion

### Implementation-Specific (Expected Gaps)

These are appropriately project-only since Notion is design-focused:

| Project Content | File | Why It's Project-Only |
|----------------|------|----------------------|
| React component patterns | `component-patterns.md` | Code architecture |
| CSS Module conventions | `design-system.md` | Implementation detail |
| TypeScript requirements | `design-system.md` | Code standards |
| Prototype file structure | `prototype-structure.md` | Kit-specific workflow |
| AI-assisted generation rules | `prototype-generation.md` | Kit-specific feature |
| Figma-to-code mapping | `figma-component-mapping.md` | Bridge document |
| Product domain knowledge | `product-knowledge.md` | Context for AI |
| Mock data documentation | `prototyping-guide.md` | Kit-specific resource |
| Path aliases (@components/) | CLAUDE.md | Dev environment |

### Components the Project Has That Notion Doesn't Document

| Component | Project Status | Notes |
|-----------|---------------|-------|
| TextArea | Stable | Likely exists in Figma but not in Notion docs |
| SearchInput | Stable | Referenced in widget contexts but not standalone |
| Accordion | Stable | Not part of Notion documentation |
| Divider | Stable | Not documented in Notion |
| ProgressBar | In Development | Not in Notion |
| LoadingIndicator | In Development | Not in Notion |
| Popover | Beta | Not in Notion |
| ConfirmDialog | Beta | Delete pattern exists but not as component |
| FormModal | Beta | MO.1/MO.2 patterns but not named |

---

## 13. Conflicts & Discrepancies

### High Priority Conflicts

| # | Area | Notion Says | Project Says | Resolution |
|---|------|-------------|-------------|------------|
| 1 | **Modal title font weight** | 600 (semibold) | 500 (medium) via `v2TextStyles.modalTitle` | Use 600 per Notion. Figma rendering is 500, CSS should be 600 |
| 2 | **Body text font weight** | 400 (regular) | 375 (light) via `fontWeight.light` | Document that 375 is Figma equivalent of CSS 400 |
| 3 | **Focus outline color** | Blue 50 | Blue 60 (`brandColors.blue[60]`) | Verify with design team; likely Blue 60 in implementation |
| 4 | **Semantic BG color shade** | Shade 20 (e.g., Red 20 for failure bg) | Mixed — some files say shade 10, others shade 20 | Standardize to shade 20 for semantic BGs per Notion |
| 5 | **Modal overlay** | `#000000` at 60% opacity | `rgba(29, 35, 47, 0.5)` (gray 90 at 50%) | Different color AND opacity. Resolve with design team |
| 6 | **Button sizes** | Medium (32), Small (24), XSmall (20), Full bleed | small (24), basic (32), large (32+) | Project missing XSmall and Full bleed variants |
| 7 | **Warning text color** | Yellow 60 (`#FCC838`) | Yellow 70 (darker, for contrast) in `token-usage.md` | Project's Yellow 70 is likely correct for accessibility |

### Low Priority Discrepancies

| # | Area | Notion | Project | Notes |
|---|------|--------|---------|-------|
| 8 | Hover alpha | `1E` (exactly 12%) | `1F` (~12.2%) | Negligible visual difference |
| 9 | Selected state naming | "Selected" | "Highlight" | Different terminology, same concept |
| 10 | Tab alignment | "Left for medium, center for small" | Not specified | Add to project |
| 11 | Alternate blue | Not mentioned | `#2E75F0` exists in token structure | Clarify if this is intentional |
| 12 | Gray 90 hex | `#1D232F` | `#1D232F` (also `#1C2029` in full palette) | Minor inconsistency within Notion itself |

---

## 14. Recommendations

### Immediate Actions (P1)

1. **Create a widget patterns guide**
   - Extract the widget specifications from Notion into a new `.cursor/rules/widget-patterns.md`
   - Focus on the most commonly used widgets: Object Table, List Pickers, Alerts taxonomy, Three Dot Menu
   - Include interaction patterns, timing specs, and content rules

2. **Resolve font weight discrepancy**
   - Add a note to `token-usage.md` explaining the Figma (375/500) vs CSS (400/600) weight mapping
   - Ensure `v2TextStyles` objects use the correct CSS weights (400 for body, 600 for headings)

3. **Standardize semantic background colors**
   - Audit all files referencing status/semantic backgrounds
   - Use shade `20` for alert/semantic backgrounds (per Notion) and shade `10` for page backgrounds
   - Update `token-usage.md`, `CLAUDE.md`, and component implementations

4. **Add three-dot menu categorization**
   - Document the Create→View→Edit→Manage→Share→Export→Delete action hierarchy
   - Add to `component-inventory.md` under Menu component

### Short-term Actions (P2)

5. **Map surface types to layout patterns**
   - Add surface type labels (View, Edit, Browse, Wizard) to `layout-patterns.md`
   - Reference which layout pattern corresponds to which Notion surface type

6. **Add empty state guidelines**
   - Create templates for: No data, No search results, Success, Error states
   - Include anatomy (image, title, subtitle, description, CTA)

7. **Document WCAG AA compliance**
   - Add explicit accessibility standards to `design-system.md`
   - Document contrast ratios: 4.5:1 normal text, 3:1 large text

8. **Resolve modal overlay conflict**
   - Verify correct overlay: `#000000 @ 60%` (Notion) vs `gray-90 @ 50%` (project)
   - Update both `notion-guidelines.md` and `modal-patterns.md` / `layout-patterns.md`

### Long-term Actions (P3)

9. **Add icon design guidelines**
   - Create `.cursor/rules/icon-guidelines.md` with Notion's anatomy specs
   - Include grid (18x18px), live area (16x16px), stroke (2px), gap (1px)

10. **Add letter-spacing tokens**
    - Add `-0.4px` letter-spacing for Display and Title styles

11. **Document tooltip/toast timing**
    - Tooltip: 1-second delay before showing
    - Toast: 5-second auto-dismiss
    - Add to component documentation

12. **Create design system philosophy doc**
    - Extract Notion's Goals and Strategy into a project README section
    - Helps new contributors understand the "why" behind the system

---

## Appendix A: Complete File Inventory

### Notion Source Files (in notion-radiant-guidelines/)

```
Radiant Pro 309374cae3fa81e087eae125f65f0c39.md          (Landing page)
├── Goal details 309374cae3fa81248c11fe6a0c7cae9c.md
├── Strategy Overview 309374cae3fa810ebd8fe754dd008db5.md
├── Typography 309374cae3fa81d296d7d991a5cdbc14.md
├── Color System 309374cae3fa8196a0b4f6d648d45471.md
├── Icons 309374cae3fa8189abbdd09617bbe608.md
├── Components 309374cae3fa819b97a5e4090d1263e8.md
│   └── (9 component sub-pages)
├── Widgets 309374cae3fa81848642fe678d3abfb6.md
│   └── (27 widget sub-pages + nested specs)
├── Surfaces 309374cae3fa81a9825afe44eaaf2474.md
│   └── (10 surface sub-pages)
├── Radiant Pro training
├── Reference
└── Radiant Pro Status/
    └── (40+ status tracking files) — excluded from comparison
```

### Project Guideline Files

```
.cursor/rules/
├── design-system.md              (Component creation rules)
├── content-guidelines.md         (Quick content rules)
├── product-knowledge.md          (ThoughtSpot domain)
├── prototype-generation.md       (AI-assisted generation)
├── token-usage.md                (Token usage guide)
├── modal-patterns.md             (Modal M1-M4 specs)
├── layout-patterns.md            (Page layout templates)
├── prototype-structure.md        (File organization)
├── figma-component-mapping.md    (Figma → code mapping)
└── component-inventory.md        (Full component list)

docs/
├── content-guidelines-detailed.md (Full content rules)
├── component-patterns.md          (Architectural patterns)
└── prototyping-guide.md           (Designer onboarding)

Root:
├── design-token-structure.md      (Token architecture)
├── notion-guidelines.md           (Consolidated Notion docs)
└── CLAUDE.md                      (AI assistant config)
```

---

## Appendix B: Quick Reference — What to Use When

| I need to know about... | Go to Notion Guidelines | Go to Project Files |
|------------------------|------------------------|---------------------|
| Design system philosophy | Goals & Strategy (Sec 1-2) | — |
| Typography specs | Typography (Sec 4) | `token-usage.md` |
| Color hex values | Color System (Sec 5) | `token-usage.md`, `figma-component-mapping.md` |
| Page layout structure | Surfaces (Sec 6) | `layout-patterns.md` |
| Widget interaction specs | Widgets (Sec 7) | — (gap) |
| Component visual specs | Components (Sec 8) | `component-inventory.md` |
| Component code patterns | — | `design-system.md`, `component-patterns.md` |
| Icon design rules | Icons (Sec 9) | — (gap) |
| Icon implementation | — | `component-inventory.md` |
| Writing UI text | Content Guidelines (Sec 10) | `content-guidelines.md`, `content-guidelines-detailed.md` |
| Building a prototype | — | `prototype-generation.md`, `prototype-structure.md` |
| Mapping Figma to code | — | `figma-component-mapping.md` |
| Token architecture | Color Tokens (Sec 5) | `design-token-structure.md` |
| Modal patterns | Surfaces MO.1-MO.6 (Sec 6) | `modal-patterns.md` |
| Alert taxonomy | Widgets/Alerts (Sec 7) | `component-inventory.md` |
| Product domain context | — | `product-knowledge.md` |

---

*This comparison guide should be reviewed when either the Notion documentation or the project guidelines are updated. Keep both sources in sync to maintain a single source of truth for the Radiant design system.*
