# RadiantPlay — Claude Code Guide

## What This Project Is

**Radiant Play** is a designer-developer handoff tool for ThoughtSpot's **Radiant** design system. It lets designers and developers explore, prototype, and validate UI patterns using production-quality Radiant components. It is NOT a code learning platform, tutorial site, or generic React starter.

## Behavior Rules

- When asked to save or write content, write directly to the file. Do NOT create sub-tasks, todo items, or intermediate plans unless explicitly asked.
- Do NOT add unsolicited UI elements, features, badges, or enhancements not in the request. Build exactly what was asked.
- The project is branded as **Radiant Play** — not figmaradiant, RadiantPlay, or other legacy names in user-facing content.

## Stack

React 19 + TypeScript + Vite 7, deployed on Vercel.

## Commands

```bash
npm run dev            # Start dev server
npm run build          # Production build
npm run build:strict   # TypeScript check + production build
npm run typecheck      # TypeScript only (--noEmit)
npm run new-prototype  # Scaffold a new prototype
```

## Path Aliases

| Alias | Path |
|-------|------|
| `@/*` | `src/*` |
| `@tokens/*` | `src/tokens/*` |
| `@components/*` | `src/components/*` |

## Project Structure

```
src/
├── components/    # 72+ shared Radiant design system components (DO NOT add prototype-specific components here)
├── prototypes/    # Per-prototype folders (each is an independent experiment)
├── tokens/        # Design tokens — colors, spacing, typography, radius, shadows, etc.
├── mocks/         # Mock data for realistic prototype content
├── pages/         # App pages / routes
├── styles/        # Global styles
├── data/          # Static data
├── utils/         # Utility functions
└── context/       # React context providers
```

## Critical Conventions

### 1. Design Tokens — NEVER hard-code values

```typescript
// Colors (3-layer: reference → system → component)
import { systemColors, referenceColors, rdComponentColors } from '@tokens/colors';

// Spacing (4px base: A=4, B=8, C=12, D=16, E=20, F=24, G=28, H=32, I=40, J=48)
import { spacing, componentSpacing } from '@tokens/spacing';

// Typography
import { fontFamily, fontSize, fontWeight, lineHeight, v2TextStyles } from '@tokens/typography';
```

Common system colors: `background-base`, `background-sunken`, `background-subtle`, `content-primary`, `content-secondary`, `content-brand`, `border-default`, `border-divider`.

In CSS Modules use CSS variables: `var(--rd-sys-color-content-primary)`, `var(--spacing-4)`, `var(--radius-md)`.

**Forbidden:** hardcoded hex (`#2770EF`), raw `rgb()`/`rgba()`, magic spacing (`17px`), hardcoded font families.

### 2. Always Use Radiant Components

Use `Button` not `<button>`, `TextInput` not `<input>`, `Table` not `<table>`, `Select` not `<select>`, etc. Check the component inventory (72+ components) before building anything custom.

Key categories: **Input** (TextInput, TextArea, SearchInput, DatePicker, Select), **Actions** (Button, Link), **Feedback** (Alert, Toast, Tooltip, LoadingIndicator), **Layout** (Tabs, Sidebar, AppShell, Accordion), **Data** (Table, Card, Chip, Avatar, Pagination, Tree), **Overlays** (Modal, ConfirmDialog, Menu, Popover).

### 3. Layout Primitives

Use `Horizontal`, `Vertical`, `View` instead of inline flex. Use `Grid`/`RdGrid` + `RdGridItem` instead of inline grid. Use `AppShell` for full-page layouts with header + sidebar.

Responsive grids: always `repeat(auto-fill, minmax(220px, 1fr))` — never fixed column counts.

### 4. Prototype-Local Components

New components for a prototype go in `src/prototypes/<Name>/components/`, **not** in `src/components/`. The shared `src/components/` directory is reserved for the design system.

### 5. Content Guidelines (ThoughtSpot style)

- **Sentence case** always (titles, buttons, labels, tooltips)
- **Buttons:** 1-2 words, imperative verbs (Create, Add, Delete, Save, Cancel, Edit, Export)
- **Labels:** max 3 words, no articles, no punctuation
- **Titles:** max 4 words; modal titles start with a verb
- **Errors:** Issue + Remedy + CTA pattern
- Capitalize ThoughtSpot features: Answer, Liveboard, SpotIQ, Worksheet, Monitor

### 6. Component Creation Standards

When creating components (even prototype-local ones):
- Use `forwardRef` for interactive components
- Extend native HTML element props
- Use CSS Modules (`.module.css`) with camelCase class names
- Always include focus styles and keyboard navigation
- Use `Icon` component with `isValidIconName()` validation

## Key Layout Constants

```
HEADER_HEIGHT = 56, SIDEBAR_WIDTH = 240, SIDEBAR_COLLAPSED = 64
CONTENT_MAX_WIDTH = 1200, MODAL_WIDTH = 600
```

## Mock Data

Import from `@/mocks` or `../../mocks` for realistic content in prototypes.

## Cursor Rules Reference

The `.cursor/rules/` directory contains 14 detailed rule files (~4,860 lines). The orchestration guide at `.cursor/rules/_orchestration.md` defines priority order for all task types. Consult these for deep reference on any convention above.

## Pre-Flight Checklist (Before Finishing a Prototype)

1. Zero raw HTML for elements covered by Radiant components
2. All colors/spacing/typography from tokens
3. Layout uses AppShell + layout primitives
4. Content follows sentence case + imperative verb rules
5. Responsive grids use auto-fill + minmax
6. `npm run build` passes

## Workflow

### Branching Model

| Branch | Purpose | Deploys to |
|--------|---------|------------|
| `main` | Production | radiantplay.vercel.app |
| `staging` | Preview / QA | staging-radiantplay.vercel.app |
| `feat/*`, `fix/*`, `chore/*` | Work branches | — |

### Remotes

Both remotes must stay in sync for `main` and `staging`:
- `origin` — GitHub (`https://github.com/faris-ts/radiantplay.git`)
- `galaxy` — ThoughtSpot (`https://galaxy.corp.thoughtspot.com/mohammed-faris/radiantplay.git`)

### Skills (Slash Commands)

| Command | What it does |
|---------|-------------|
| `/start <description>` | Create a work branch from main |
| `/ship [message]` | Build, commit, push to staging |
| `/release [version]` | Write changelog, prep production merge |
| `/status` | Branch, commits, uncommitted changes |

### Typical Session Flow

```
/start Add filter panel to dashboard
  ... write code ...
/status                    # check progress
/ship                      # push to staging for preview
  ... iterate ...
/ship "fix: alignment"     # ship again with custom message
/release                   # prep changelog + production merge instructions
```

### Changelog

Maintained at `docs/CHANGELOG.md` using [Keep a Changelog](https://keepachangelog.com/) format. Updated via `/release`.

## Active Task Tracker

See `TODO.md` for in-progress items, known issues, and planned improvements. Check before starting work to avoid conflicts.
