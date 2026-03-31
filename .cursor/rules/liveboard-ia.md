---
description: Component map for Liveboard prototypes — what components exist and when to use them. For full IA tree and scaffolding, see liveboard-scaffolding.md.
alwaysApply: false
---

# Liveboard Component Reference

> For building a new Liveboard from scratch (IA tree, mode templates, scaffolding commands), see `liveboard-scaffolding.md`.

---

## Before You Start

All Liveboard prototypes MUST use `GlobalHeader` from `@components/GlobalHeader`. Do NOT build a custom header.

When a Figma link or screenshot is provided, use the scaffolding as the **structural foundation** but drive the **visual output** from the reference. The scaffold is for structure; the reference is for look and feel.

Use `npm run new-prototype MyDashboard -- --liveboard` to scaffold from the template.

**Reference:** `src/prototypes/OnlineRetailSales/` for a working example.

---

## Component Inventory

### Global Radiant Components (import from `@/components/`)

| Component | Use in Liveboard |
|-----------|-----------------|
| `GlobalHeader` | ThoughtSpot primary nav bar |
| `Button` | Save, Cancel, toolbar actions |
| `Tabs` | Liveboard tabs, tab switching |
| `Table` | Data tables within Answer tiles |
| `Typography` | All text content |
| `Modal` | Add filter modal, add parameter modal |
| `Menu` | 3-dot menu, Add dropdown, Personalised View menu |
| `Tooltip` | Hover hints on toolbar icons |
| `Chip` | Filter chips, tag display |
| `Icon` | All iconography (use `isValidIconName()`) |
| `SearchInput` | Answer search in Add flow |
| `TextInput` | Rename, edit fields |
| `TextArea` | Note tile rich text editing |
| `Select` | Filter value selection, view selection |
| `Alert` | Save confirmation, error states |
| `Toast` | Action feedback (saved, deleted) |
| `LoadingIndicator` | Loading states for tiles, AI responses |
| `Popover` | Personalised view dropdown, filter popover |
| `Accordion` | Styling panel sections |
| `Pagination` | Large data tables within tiles |
| `LiveboardHeader` | Complete header — PrimaryNav + ViewHeader (view) or EditToolbar + EditSubHeader (edit) |

### Dependencies

| Package | Use |
|---------|-----|
| `react-grid-layout` | Canvas tile arrangement — drag-and-drop, resize |

### Liveboard-specific Components (reuse across variants)

| Component | Location | Status |
|-----------|----------|--------|
| `Header` | `Liveboard/components/` | Built |
| `FilterBar` | `Liveboard/components/` | Built |
| `KPICard` | `Liveboard/components/` | Built |
| `AreaChart` | `Liveboard/components/` | Built |
| `DonutChart` | `Liveboard/components/` | Built |
| `StackedBarChart` | `Liveboard/components/` | Built |
| `USMapChart` | `Liveboard/components/` | Built |
| `StylingPanel` | `Liveboard/components/` | Built |
| `NavigationSidebar` | `Liveboard/components/` | Built |
| `OptionButtonGroup` | `Liveboard/components/` | Built |

### Shared Liveboard Components

| Component | Location | Description |
|-----------|----------|-------------|
| `LiveboardHeader` | `src/components/LiveboardHeader/` | Unified header for both modes |
| `EditToolbar` | Inside LiveboardHeader | Dark toolbar for edit mode |
| `EditSubHeader` | Inside LiveboardHeader | Edit mode header with editable name |
| `AnswerTile` | `_liveboard-template/components/` | Tile container with mode-aware hover toolbar |
| `TileHoverActions` | Built into AnswerTile | Hover overlay with contextual actions |

### Planned (not yet built)

> Create locally in `src/prototypes/<Name>/components/` when needed.

Planned: NoteTile, GroupTile, InsightTile, FloatingToolbar, SpotterVizPanel, PersonalisedViewMenu, AddMenu, FilterModal, ParameterModal.
