# Design Token Structure Summary

This document summarizes the design token architecture from the Figma file, including colors, typography, spacing, and the relationship between Brand, Alias, and Mapped collections.

---

## 📊 Token Architecture Overview

The design system follows a **3-tier token architecture**:

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   BRAND LAYER   │ ──► │   ALIAS LAYER   │ ──► │  MAPPED LAYER   │
│  (Primitives)   │     │   (Semantic)    │     │  (Components)   │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

---

## 🎨 Color Tokens

### 1. Brand/Primitive Colors (Base Layer)

These are the raw color values that form the foundation of the color system.

| Token Name | Hex Value | Description |
|------------|-----------|-------------|
| `Blue/60` | `#2770EF` | Primary brand blue |
| `Blue/Blue-60` | `#2E75F0` | Alternate blue |
| `Blue/50` | `#71A1F4` | Light blue |
| `Blue/Blue-40` | `#ABC7F9` | Lighter blue |
| `Gray/90` | `#1D232F` | Darkest gray |
| `Gray/50` | `#A5ACB9` | Mid gray |
| `Gray/40` | `#C0C6CF` | Light gray (Tint-2) |
| `Gray/30` | `#DBDFE7` | Lighter gray |
| `Gray/20` | `#EAEDF2` | Very light gray |
| `Red/60` | `#E22B3D` | Primary red |
| `Teal/Teal-60` | `#48D1E0` | Primary teal |
| `White/Base` | `#FFFFFF` | Pure white |
| `Black/Base` | `#000000` | Pure black |

### 2. Alias/Semantic Colors (Purpose Layer)

Semantic tokens that map brand colors to their intended purpose.

| Token Name | Hex Value | Usage |
|------------|-----------|-------|
| **Semantic Status** | | |
| `Semantic/Success` | `#06BF7F` | Success states |
| `Semantic/Success bg` | `#E0F8EF` | Success background |
| `Semantic/Warning` | `#FCC838` | Warning states |
| `Semantic/Warning bg` | `#FFF8E5` | Warning background |
| `Semantic/Failure` | `#E22B3D` | Error/failure states |
| `Semantic/Failure bg` | `#FFEBEC` | Error background |
| `Semantic/Info` | `#2770EF` | Info states |
| `Semantic/Info bg` | `#DEE8FA` | Info background |
| **Primary Color** | | |
| `Primary color/Primary` | `#2770EF` | Primary brand color |

### 3. Mapped/Component Colors (Application Layer)

Component-specific tokens that reference semantic or brand colors.

| Token Name | Hex Value | Usage |
|------------|-----------|-------|
| **Background** | | |
| `Background/Surface` | `#FFFFFF` | Primary surface color |
| `Background/Background` | `#F6F8FA` | Page background |
| **Text & Icons** | | |
| `Text/Default` | `#1D232F` | Default text color |
| `Text/Alternate` | `#FFFFFF` | Text on dark backgrounds |
| `Text/Info` | `#777E8B` | Secondary/muted text |
| `Text/Accent` | `#2E75F0` | Accent text color |
| `Text/Base` | `#1C2330` | Base text color |
| `Icons/Default` | `#1D232F` | Default icon color |
| `Icons/Alternate` | `#FFFFFF` | Icons on dark backgrounds |
| `Icons/Info` | `#777E8B` | Secondary icons |
| `Text & Icon/Default` | `#1D232F` | Combined text/icon default |
| `Text & Icon/Info` | `#777E8B` | Combined secondary |
| `Text & Icon/Alternate` | `#FFFFFF` | Combined on dark bg |
| **Dividers & Outlines** | | |
| `Divider/On light bg` | `#EAEDF2` | Dividers on light surfaces |
| `Divider/On dark bg` | `#777E8B` | Dividers on dark surfaces |
| `Outline/Outline` | `#C0C6CF` | Border/outline color |
| **Interactive States** | | |
| `List State/Hover` | `#C0C6CF1F` | Hover state (12% opacity) |
| `List State/Highlight` | `#71A1F4` | Highlighted/selected state |

### 4. Chart-Specific Colors

Dedicated palette for data visualization:

| Color Family | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 100 |
|--------------|----|----|----|----|----|----|----|----|----|----|
| **Gray** | `#F6F8FA` | `#EAEDF2` | `#DBDFE7` | `#C0C6CF` | `#A5ACB9` | `#777E8B` | `#4A515E` | `#323946` | `#1D232F` | `#000000` |
| **Blue** | - | `#DEE8FA` | `#CEDCF5` | `#ABC7F9` | `#71A1F4` | `#2770EF` | `#2359B6` | `#163772` | - | `#001740` |
| **Green** | `#EDFFF9` | `#E0F8EF` | `#C7F2E3` | `#9BE5CB` | `#56D3A8` | `#06BF7F` | `#049160` | - | - | - |
| **Yellow** | `#FFFBF0` | `#FFF8E5` | `#FCF1D1` | `#FDE9AF` | `#FCD977` | `#FCC838` | `#BF982A` | - | - | - |
| **Purple** | `#F7F5FF` | `#F0EBFF` | `#E3D9FC` | `#D1C0FB` | `#B094F8` | `#8C62F5` | `#6A4ABA` | - | - | - |
| **Red** | `#FFF0F0` | `#FFEBEC` | `#FCD4D7` | `#F9B3B9` | `#F47E89` | `#E22B3D` | `#B6313E` | - | - | - |
| **Orange** | `#FFF5F0` | `#FFEEE5` | `#FFDDCC` | `#FFCCB3` | `#FFA97E` | `#FF8142` | `#C26232` | - | - | - |
| **Teal** | `#EDFDFF` | - | `#C9F0F5` | `#B5ECF2` | `#82DFE9` | `#48D1E0` | `#369FAA` | - | - | - |

---

## 📝 Typography Tokens

### Font Family
- **Primary Font**: `Plain`

### Type Styles

| Token Name | Family | Weight | Size | Line Height | Usage |
|------------|--------|--------|------|-------------|-------|
| **Display** | | | | | |
| `Display/Large Headline` | Plain | 600 (Medium) | 32px | 40px | Hero headlines |
| **Titles** | | | | | |
| `Title/Page Title` | Plain | 600 (Medium) | 24px | 32px | Page titles |
| `Title/Modal Title` | Plain | 600 (Medium) | 20px | 28px | Modal headers |
| **Headings** | | | | | |
| `Heading/H2` | Plain | 500 (Medium) | 24px | 32px | Section headings |
| **Labels** | | | | | |
| `Label/Section Label` | Plain | 600 (Medium) | 18px | 24px | Section labels |
| `Label/Content Label` | Plain | 600 (Medium) | 16px | 24px | Content labels |
| `Label/Content Label Subhead` | Plain | 600 (Medium) | 14px | 20px | Subheadings |
| **Body** | | | | | |
| `Body/Large` | Plain | 375 (Light) | 16px | 24px | Large body text |
| `Body/Normal` | Plain | 375 (Light) | 14px | 20px | Standard body text |
| `Body/P-small` | Plain | 400 (Regular) | 12px | 16px | Small text |
| **Caption** | | | | | |
| `Footnote & Caption & Overline/Regular` | Plain | 400 (Regular) | 12px | 18px | Captions, overlines |

### Font Size Scale

| Token | Value |
|-------|-------|
| `fontSize-16` | 16px |
| (Inferred from styles) | 12px, 14px, 16px, 18px, 20px, 24px, 32px |

### Font Weights

| Token | Value | CSS Weight |
|-------|-------|------------|
| `fontWeight-medium` | 500 | Medium |
| (Inferred) | 375 | Light |
| (Inferred) | 400 | Regular |
| (Inferred) | 600 | Semi-bold |

---

## 📐 Spacing Tokens

### Base Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| `A` / `4 px` | 4px | Extra small spacing |
| `6 px` | 6px | Small spacing |
| `B` / `8 px` | 8px | Base spacing unit |
| `C` / `12 px` | 12px | Medium spacing |
| `D` / `16 px` | 16px | Default spacing |
| `E` | 20px | Large spacing |
| `F` | 24px | Extra large spacing |
| `H` | 32px | Section spacing |
| `J` | 48px | Container spacing |

### Spacing Progression
The spacing system follows a **4px base unit** with multipliers:
- 4 → 8 → 12 → 16 → 20 → 24 → 32 → 48

---

## 🔄 Token Relationship: Brand → Alias → Mapped

### Connection Flow Example

```
BRAND (Primitives)          ALIAS (Semantic)           MAPPED (Components)
─────────────────────       ─────────────────         ─────────────────────
Blue/60: #2770EF      ───►  Primary color/Primary    ───►  Button/Primary/Background
                            Semantic/Info            ───►  Banner/Info/Icon
                            
Gray/90: #1D232F      ───►  Text/Default            ───►  Body Text Color
                            Icons/Default            ───►  Icon Button Color
                            
Red/60: #E22B3D       ───►  Semantic/Failure        ───►  Alert/Error/Border
                            Semantic/Failure bg      ───►  Alert/Error/Background

Gray/20: #EAEDF2      ───►  Divider/On light bg     ───►  List Item Divider
                            Background/Background    ───►  Page Background
```

### Collection Hierarchy

1. **Brand Collection** (Primitives)
   - Pure color values
   - Base typography metrics
   - Core spacing values
   - No dependencies

2. **Alias Collection** (Semantic)
   - References Brand tokens
   - Purpose-driven naming
   - Semantic meaning (success, warning, info, etc.)
   - Mode-independent (same meaning across themes)

3. **Mapped Collection** (Components)
   - References Alias tokens
   - Component-specific context
   - Supports theming (light/dark modes)
   - Direct application in UI elements

---

## 🔲 Corner Radius

Based on component analysis, the design uses these corner radius values:

| Usage | Radius |
|-------|--------|
| Small elements (badges, tags) | 4px |
| Buttons, inputs | 6px |
| Cards, modals | 8px |
| Large containers | 12px |

---

## 🎯 Component State Tokens

### Interactive States

| State | Background | Text | Border |
|-------|------------|------|--------|
| **Default** | `Background/Surface` | `Text/Default` | `Outline/Outline` |
| **Hover** | `List State/Hover` | `Text/Default` | `Outline/Outline` |
| **Active** | `List State/Highlight` | `Text/Alternate` | `Blue/60` |
| **Disabled** | `Gray/20` | `Text/Info` | `Gray/30` |
| **Error** | `Semantic/Failure bg` | `Semantic/Failure` | `Red/60` |
| **Success** | `Semantic/Success bg` | `Semantic/Success` | `Green` |
| **Warning** | `Semantic/Warning bg` | `Semantic/Warning` | `Yellow` |

---

## 📦 Key Components & Their Token Usage

### Buttons
| Type | Size | States |
|------|------|--------|
| Primary | Small (24px), Basic (32px), Large | Default, Hover, Activated, Disabled |
| Secondary | Small, Basic, Large | Default, Hover, Activated, Disabled |
| Tertiary | Small, Basic | Default, Hover, Activated, Disabled |
| Icon Button | XS (20px), Small (24px), Standard (32px) | Default, Hover, Activated, Disabled |

### Form Elements
- Text Input: Default, Hover, Focus, Error, Disabled, Read Only
- Text Area: Default, Hover, Activated, Error, Disabled
- Select Dropdown: Default, Hover, Focus, Error, Disabled
- Checkbox: Unselected, Selected, Intermediate × Default, Error, Disabled
- Radio: Selected, Unselected × Default, Error, Disabled
- Toggle: On, Off × Default, Disabled

### Navigation
- Tabs: Small, Medium × Enabled, Hover, Active, Disabled
- Side Navigation: Light Mode, Dark Mode variants
- Header: Multiple hamburger states

### Feedback
- Banners: Page, Section (single/multi-line) × Success, Warning, Info, Failure
- Toast: Notification states
- Alerts: Muted variants

---

## 🌓 Theme Support

The design system supports **Light** and **Dark** modes:

| Token Category | Light Mode | Dark Mode |
|----------------|------------|-----------|
| Background/Surface | `#FFFFFF` | (inverted) |
| Text/Default | `#1D232F` | `#FFFFFF` |
| Divider | `#EAEDF2` | `#777E8B` |
| Icons | `#1D232F` | `#FFFFFF` |

Components like Navigation explicitly show `Mode=Light` and `Mode=Dark` variants.

---

## 📋 Summary

This design system implements a robust, scalable token architecture:

- **15+ Brand colors** across 8 color families
- **7 Semantic color pairs** (color + background)
- **10+ Typography styles** with consistent hierarchy
- **8 Spacing values** on a 4px grid
- **Multiple corner radius options** for different contexts
- **Full state coverage** for interactive components
- **Light/Dark theme** support

The 3-tier token system (Brand → Alias → Mapped) ensures:
1. Easy global updates through brand tokens
2. Semantic meaning through alias tokens
3. Component-level precision through mapped tokens
4. Theme switching capability without component changes

