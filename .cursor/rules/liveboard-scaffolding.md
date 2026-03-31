---
description: Scaffolding guide for building new Liveboard prototypes from scratch. Includes IA tree structure, mode templates (View/Edit), and quick start commands. Load only when creating a new Liveboard prototype (Tier 2).
alwaysApply: false
---

# Liveboard Scaffolding Guide

> For the component map (what exists and when to use it), see `liveboard-ia.md`.
> This file is for building a new Liveboard from scratch.

---

## Liveboard Modes

A Liveboard has two top-level modes:

| Mode | Purpose | Header Configuration |
|------|---------|---------------------|
| **View** | Consuming data — browse, filter, drill | PrimaryNav + ViewHeader |
| **Edit** | Authoring content — add tiles, rearrange, style | EditToolbar + EditSubHeader |

Both modes share the same canvas (tiles, tabs, filters). The header switches between configurations based on mode.

---

## Information Architecture — View Mode

```
Liveboard (View Mode)
├── ThoughtSpot Primary Nav Bar
├── Header
│   ├── LB details (name, description)
│   ├── Tabs
│   │   ├── Tab Filters
│   │   └── Switch tabs (interaction)
│   ├── Share icon button
│   ├── 3 dot menu
│   │   └── Edit, Rename, Make a copy...
│   ├── Personalised View
│   │   ├── Select view
│   │   ├── Save view
│   │   ├── Manage views
│   │   └── Reset Liveboard
│   └── Liveboard Filters
│       └── Change filter value (interaction)
└── Body
    ├── Answer Tile
    │   ├── Charts (visualization content)
    │   └── Hover actions: Ask Spotter, Expand, More actions
    ├── Note Tile
    │   ├── Content (text, image, hyperlink, table)
    │   └── Hover actions: Actions (Pin, Present)
    ├── Group Tile
    │   ├── Multiple tiles (Answer, Note, Insight)
    │   └── Hover actions: Ask Spotter, Expand, More actions
    ├── Insight Tile
    │   ├── AI generated summary
    │   └── Hover actions: Ask Spotter, More actions
    └── Canvas: react-grid-layout (drag-and-drop)
```

---

## Information Architecture — Edit Mode

```
Liveboard (Edit Mode)
├── Edit Header (replaces Primary Nav)
│   └── Toolbar
│       ├── Add (dropdown: Answer, Note, Filter, Parameter, Tab)
│       ├── Styling (side panel: color, corners, density)
│       ├── SpotterViz (AI chat side panel)
│       ├── Save
│       └── Cancel
├── LB Header
│   ├── Name/description (editable)
│   ├── Tabs (delete, reorder)
│   └── Filters (remove, edit)
└── LB Body
    ├── Answer Tile (drag, resize, floating toolbar: Edit/Resize/Move/Delete)
    ├── Note Tile (rich text editor, drag, resize)
    ├── Group Tile (contains sub-tiles, ungroup action)
    └── Insight Tile (AI summary, content templates, drag, resize)
```

---

## Quick Start

```bash
npm run new-prototype MyDashboard -- --liveboard
```

Scaffolds from `src/prototypes/_liveboard-template/`:

```
src/prototypes/MyDashboard/
├── index.tsx                    # Main component with LiveboardHeader (view + edit)
├── styles.ts                    # Token-based style constants
├── data/
│   └── mockData.ts              # Sample tabs, filters, KPIs, chart data
├── components/
│   ├── AnswerTile.tsx           # Tile container with hover toolbar
│   ├── SampleBarChart.tsx       # Example bar chart
│   └── SampleKPITile.tsx        # Example KPI sparkline
└── README.md
```

### Using LiveboardHeader

```tsx
import { LiveboardHeader } from '@components/LiveboardHeader';

const [mode, setMode] = useState<'view' | 'edit'>('view');

<LiveboardHeader
  mode={mode}
  title={liveboardName}
  activeTab={activeTab}
  tabs={tabsData}
  filters={filterData}
  onTabChange={setActiveTab}
  onEdit={() => setMode('edit')}
  onSave={() => setMode('view')}
  onCancel={() => setMode('view')}
  onToggleSpotter={() => setSpotterOpen(!spotterOpen)}
  spotterOpen={spotterOpen}
/>
```

- **View mode**: PrimaryNav + ViewHeader (title, tabs, personalised view, filters, 3-dot menu)
- **Edit mode**: EditToolbar (Add, Styling, SpotterViz, Save, Cancel) + EditSubHeader (editable title, tabs, filters)

### View/Edit Mode Only

Pass `mode="view"` or `mode="edit"` to both `LiveboardHeader` and `AnswerTile`.

---

## Liveboard Variations

Each variation (Business Overview, Sales Funnel, Online Retail Sales, etc.) is a separate prototype folder sharing the same IA. The variation determines mock data theme, filter set, and tab structure — infer from the Figma input.

**References:**
- Template: `src/prototypes/_liveboard-template/`
- Full prototype: `src/prototypes/OnlineRetailSales/`
