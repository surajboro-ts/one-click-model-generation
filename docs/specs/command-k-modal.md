# Command+K Search Modal - Engineering Spec

## Overview

This spec documents the **Command+K Search Modal** (Spotlight-style navigation) from Figma frame `367:15459`. This modal provides quick access to search, navigate, and create actions across ThoughtSpot.

**Figma:** [Command - K](https://www.figma.com/design/NOBclHxlaihg14bTVyJtHE/Command---K?node-id=367-15459)

**Prototype:** [`src/prototypes/CommandKModal/index.tsx`](../../src/prototypes/CommandKModal/index.tsx)

---

## Visual Reference

![Command+K Modal](https://www.figma.com/design/NOBclHxlaihg14bTVyJtHE/Command---K?node-id=367-15459)

The modal is a centered overlay (788x600px) with rounded corners, containing:

- Search input bar (sticky header)
- Optional context filter bar
- Scrollable results list with sections
- Keyboard shortcuts footer (sticky)

---

## Component Structure

### 1. Container

| Property | Value |
|----------|-------|
| Width | 788px |
| Height | 600px |
| Background | `var(--background/surface, white)` / `brandColors.white` |
| Border radius | 12px |
| Layout | Flexbox column |
| Overflow | Hidden (clip) |
| Isolation | Isolate (for z-index stacking) |

### 2. Search Header (Sticky)

| Property | Value |
|----------|-------|
| Position | Sticky top |
| Padding | 12px horizontal, 12px top, 8px bottom |
| Border | 1px bottom `var(--divider/on-light-bg, #eaedf2)` |
| Background | `var(--background/surface, white)` |
| Z-index | 3 |

**Content:**

| Element | Specifications |
|---------|----------------|
| Search icon | 16px magnifying glass icon |
| Input placeholder | "Search objects or navigate anywhere in ThoughtSpot" |
| Shortcut hint | "/" key badge + "to filter" label (right-aligned) |

**Input Styles:**

| Property | Value |
|----------|-------|
| Font | Plain Regular, 16px |
| Color (placeholder) | `var(--charts/gray/50, #a5acb9)` |
| Line height | 24px |
| Letter spacing | -0.064px |

### 3. Context Filter Bar (Conditional)

Shown when user applies a filter (e.g., Admin Settings scope).

| Property | Value |
|----------|-------|
| Background | `var(--charts/blue/10, #f2f7ff)` |
| Border | 1px `var(--charts/blue/30, #cedcf5)` |
| Border radius | 8px |
| Padding | 4px |
| Margin | 0 4px |
| Height | 40px |

**Content:**

| Element | Description |
|---------|-------------|
| Icon | Settings/cog icon (14px) |
| Label | "Search in Admin Settings" (14px, `var(--text/default)`) |
| Action | Right-aligned "Filter" text |

### 4. Results List (Scrollable)

| Property | Value |
|----------|-------|
| Height | Fills remaining space (~501px) |
| Overflow Y | Auto (scroll) |
| Overflow X | Hidden (clip) |
| Z-index | 1 |

#### Section Headers

| Property | Value |
|----------|-------|
| Padding | 12px horizontal, 8px vertical |
| Font | Plain Regular, 12px |
| Color | `var(--text/info, #777e8b)` |
| Letter spacing | -0.072px |
| Line height | 18px |

**Section Labels:**
- "Recent"
- "Recommended"
- "Quick links"

#### Result Card (SRP Card)

| Property | Value |
|----------|-------|
| Height | 40px |
| Padding | 12px horizontal, 8px vertical |
| Background | White with 4px rounded rect behind content |
| Background (hover) | Subtle highlight |
| Gap | 12px between icon/content and type label |

**Card Content Structure:**

| Element | Description |
|---------|-------------|
| Icon | 14px icon in 20px container with 3px padding |
| Title | 14px, `var(--text/default, #1d232f)`, font-weight 375 ("Plain:Light") |
| Metadata | 12px, `var(--text/info, #777e8b)` - location "in [Location]", author "by [Name]" |
| Type Label | Right-aligned, 12px, `var(--text/info)` |

**Result Types:**

| Type | Icon | Example Title | Metadata | Right Label |
|------|------|---------------|----------|-------------|
| Answer (in LB) | answer | "Total **Sales** by Region" | "in Customer Sales" "by Anya Sharma" | "Answer (in a LB)" |
| Answer | answer | "Total **Sales** by Region" | "by Anya Sharma" | "Answer" |
| Admin Settings | cog-s | "Beta access" | "in Feature management" | "Admin Settings" |
| Model | save-worksheet-s | "Comment validate" | "in .myDBCTest" "by bharathram.g" | "Model" |
| Navigate | paper-plane-s | "SpotIQ Analysis" | "in Develop/ Analytics and alerts" | "Navigate" |
| Spotter | dog-chat-avatar | "Start a new spotter chat" | - | "Spotter" |
| Create | cross-circle (rotated 45deg) | "Create a new answer" | - | "Create" |
| Help/Info | info-circle-s | "Developer Docs" | - | "Help" |

**Search Highlighting:**

- Matched search terms shown in **bold** (font-weight 600, "Plain:Bold")
- Example: "Total **Sales** by Region" when searching "Sales"

### 5. Keyboard Shortcuts Footer (Sticky)

| Property | Value |
|----------|-------|
| Position | Sticky bottom |
| Background | `var(--charts/gray/10, #f6f8fa)` |
| Border | 1px top `var(--charts/gray/20, #eaedf2)` |
| Padding | 12px horizontal, 8px vertical |
| Height | 34px |
| Z-index | 2 |

**Keyboard Shortcuts:**

| Keys | Label |
|------|-------|
| ↑ ↓ | Navigate |
| ↵ | Select |
| Shift + ↵ | Open in new tab |
| ⌘ + ↵ | Open in Spotter |

**Key Badge Style:**

| Property | Value |
|----------|-------|
| Background | white |
| Border | 1px `var(--charts/gray/20, #eaedf2)` |
| Border radius | 4px |
| Padding | 4px horizontal, 1px vertical |
| Font | Plain Regular, 10px |
| Color | `var(--icons/info, #777e8b)` |
| Line height | 15px |
| Letter spacing | 0.1172px |

---

## Typography Reference

| Element | Font Family | Size | Weight | Line Height | Letter Spacing | Color |
|---------|------------|------|--------|-------------|----------------|-------|
| Search placeholder | Plain Regular | 16px | 400 | 24px | -0.064px | `#a5acb9` |
| Result title | Plain Light | 14px | 375 | 20px | 0 | `#1d232f` |
| Bold match | Plain Bold | 14px | 600 | 20px | 0 | `#1d232f` |
| Metadata | Plain Regular | 12px | 400 | 18px | -0.072px | `#777e8b` |
| Section header | Plain Regular | 12px | 400 | 18px | -0.072px | `#777e8b` |
| Key shortcut | Plain Regular | 10px | 400 | 15px | 0.1172px | `#777e8b` |
| Filter label | Plain Light | 14px | 375 | 20px | 0 | `#1d232f` |

---

## Color Reference

| Token | Value | Usage |
|-------|-------|-------|
| `--background/surface` | `#ffffff` | Container, cards background |
| `--text/default` | `#1d232f` | Primary text, titles |
| `--text/info` | `#777e8b` | Secondary text, metadata |
| `--icons/info` | `#777e8b` | Icon color |
| `--divider/on-light-bg` | `#eaedf2` | Borders, dividers |
| `--charts/gray/10` | `#f6f8fa` | Footer background |
| `--charts/gray/20` | `#eaedf2` | Borders |
| `--charts/gray/50` | `#a5acb9` | Placeholder text |
| `--charts/blue/10` | `#f2f7ff` | Filter bar background |
| `--charts/blue/30` | `#cedcf5` | Filter bar border |
| `--charts/blue/60` | `#2770ef` | Blue accent (tokens) |

---

## Interaction Behaviors

### Modal Open/Close

| Trigger | Action |
|---------|--------|
| `Cmd/Ctrl + K` | Open modal |
| `Escape` | Close modal |
| Click backdrop | Close modal |
| Select result | Close modal (after action) |

### Keyboard Navigation

| Key | Action |
|-----|--------|
| `↑` Arrow Up | Move selection up |
| `↓` Arrow Down | Move selection down |
| `Enter` | Execute primary action on selected item |
| `Shift + Enter` | Open selected item in new tab |
| `Cmd/Ctrl + Enter` | Open selected item in Spotter |
| `/` | Focus filter input (when not in search) |

### Search Input

| Behavior | Description |
|----------|-------------|
| Auto-focus | Input receives focus when modal opens |
| Live filter | Results filter in real-time as user types |
| Clear | Escape clears input (if has value), closes modal (if empty) |
| Highlight | Matching terms in results are highlighted in bold |

### Result Selection

| State | Visual |
|-------|--------|
| Default | White background |
| Hover | Light gray background highlight |
| Keyboard selected | Light gray background highlight |
| Active/Pressed | Slightly darker background |

---

## Accessibility Requirements

| Requirement | Implementation |
|-------------|----------------|
| Focus management | Modal receives focus on open, returns focus on close |
| Focus trap | Tab cycles within modal only |
| ARIA role | `role="dialog"` with `aria-modal="true"` |
| Results list | `role="listbox"` |
| Result items | `role="option"` with `aria-selected` |
| Close button | `aria-label="Close"` (if present) |
| Search input | `aria-label="Search objects or navigate"` |
| Live region | Results count announced on search |

---

## Implementation Notes

### Components to Create

1. **CommandKModal** - Main container/overlay component
2. **CommandKSearch** - Search input with shortcut hint
3. **CommandKContextFilter** - Blue filter bar component  
4. **CommandKResults** - Scrollable results container
5. **CommandKSection** - Section with header and cards
6. **CommandKResultCard** - Individual result item (handles all types)
7. **CommandKShortcuts** - Footer with keyboard shortcuts
8. **KeyBadge** - Styled keyboard shortcut badge

### Radiant Component Mapping

| Design Element | Radiant Component | Notes |
|---------------|-------------------|-------|
| Search input | `SearchInput` | Extend with shortcut hint |
| Icons | `Icon` | Add custom icons for answer, model, spotter, etc. |
| Modal overlay | Custom | No existing Modal fits; create new |
| Filter chips | `Chip` | For editable filter tokens |

### State Interface

```typescript
interface CommandKState {
  isOpen: boolean;
  searchQuery: string;
  activeFilter: CommandKFilter | null;
  selectedIndex: number;
  results: {
    recent: CommandKResult[];
    recommended: CommandKResult[];
    quickLinks: CommandKResult[];
  };
}

interface CommandKFilter {
  type: 'admin-settings' | 'answers' | 'liveboards' | 'models';
  label: string;
  icon: IconName;
}

interface CommandKResult {
  id: string;
  type: ResultType;
  title: string;
  titleHighlight?: { start: number; end: number };
  location?: string;
  author?: string;
  typeLabel: string;
  icon: IconName | React.ReactNode;
  action: () => void;
}

type ResultType = 
  | 'answer' 
  | 'answer-in-lb' 
  | 'model' 
  | 'navigate' 
  | 'admin-settings' 
  | 'spotter' 
  | 'create' 
  | 'help';
```

### Design Tokens Usage

```tsx
import { brandColors } from '../../tokens/colors/brand';

// Container
backgroundColor: brandColors.white,
borderRadius: '12px',

// Text colors
color: brandColors.gray[90], // default text
color: brandColors.gray[50], // info/secondary text

// Backgrounds
backgroundColor: brandColors.gray[10], // footer
backgroundColor: '#f2f7ff', // filter bar (blue/10)

// Borders
borderColor: brandColors.gray[20],
```

---

## Mock Data Reference

See [`src/mocks/commandK.ts`](../../src/mocks/commandK.ts) for sample data.

---

## File Locations

| File | Purpose |
|------|---------|
| `docs/specs/command-k-modal.md` | This spec document |
| `src/prototypes/CommandKModal/index.tsx` | Interactive prototype |
| `src/mocks/commandK.ts` | Mock data for results |
