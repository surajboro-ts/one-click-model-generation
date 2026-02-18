# Radiant Pro Design System — Prototyping Guidelines

> Radiant Pro allows the design, product, and engineering teams at ThoughtSpot to work efficiently while maintaining quality, usability, approachability, and originality in the ThoughtSpot product.

---

## Table of Contents

1. [Goals](#1-goals)
2. [Strategy Overview](#2-strategy-overview)
3. [Design Hierarchy](#3-design-hierarchy)
4. [Typography](#4-typography)
5. [Color System](#5-color-system)
6. [Surfaces](#6-surfaces)
7. [Widgets](#7-widgets)
8. [Components](#8-components)
9. [Icons](#9-icons)
10. [Prototyping Guidelines](#10-prototyping-guidelines)

---

## 1. Goals

### Design
- Make it **consistent** — unified visual language across all interfaces
- Make the UI **predictable** — users should always know what to expect
- Make the UI **high quality** — polished, production-grade output

### Product
- **Empower small teams** — do more with fewer resources
- **Tools to deliver more efficiently** — streamlined workflows
- **Making effective use of $$$** — maximize value from design investment

### Engineering
- **Build it once** — no redundant implementations
- **Reusable components** for faster, more efficient development

---

## 2. Strategy Overview

Radiant Pro follows a three-pillar strategy:

### Template System (Surfaces)
A set of clear templates that allows designers to create consistent interfaces with consistent structure and layouts.

### Structured (Widgets)
A clear set of standardized interconnected parts (widgets) to create the experience from. Widgets are comprised of multiple UI components. Widgets are defined by their reusable nature in various sections of the ThoughtSpot product.

### Curation
Remixing the widgets and surfaces to make interfaces. Surface widgets are designed to be easily reconfigured for various interface needs.

---

## 3. Design Hierarchy

The Radiant system follows a clear compositional hierarchy:

```
Surfaces (Page Templates)
  └── Widgets (Reusable multi-component blocks)
       └── Components (Individual UI elements)
            └── Design Tokens (Colors, Typography, Spacing, Icons)
```

- **Surfaces** define the overall page layout and structure
- **Widgets** are reusable sections composed of multiple components
- **Components** are the atomic UI elements (buttons, inputs, etc.)
- **Design Tokens** are the foundational values (colors, fonts, spacing)

---

## 4. Typography

### Typeface
Radiant uses the **Plain** font — Plain Medium and Plain Regular — exclusively. Italic and other special font variants are not supported.

> Note: Platforms and browsers render fonts differently; weight may differ across platforms like Figma or other design tools.

### Font Weights
- **400** (normal) — used for body text and descriptions
- **600** (bold) — used for headings, labels, and emphasis
- **700** (`<b>` tag) — used to bold a specific word within a sentence

> In Figma, the closest rendering equivalence is Light (375) and Medium (600).

### Type Scale

| Category | Name | Font-weight | Font-size | Line-height | Letter-spacing |
|----------|------|-------------|-----------|-------------|----------------|
| Display | Large Headline | 600 | 32pt | 40px | -0.4px |
| Title | Page Title | 600 | 24pt | 32px | -0.4px |
| Title | Modal Title | 600 | 20pt | 28px | -0.4px |
| Label | Section Label | 600 | 18pt | 24px | 0px |
| Label | Content Label | 600 | 16pt | 24px | 0px |
| Label | Content Label Subhead | 600 | 14pt | 20px | 0px |
| Body | Body Large | 400 | 16pt | 24px | 0px |
| Body (Default) | Body Normal | 400 | 14pt | 20px | 0px |
| Footnote | Footnote & Caption | 400 | 12pt | 18px | 0px |

### Type Hierarchy Usage

Instead of HTML heading tags (H1, H2, H3), Radiant defines type by **assigned role** in the content hierarchy:

- **Display (32pt)** — Reserved for large display headlines: marketing assets, onboarding, priority announcements
- **Title (24pt / 20pt)** — Top-level labels describing large amounts of content on a screen
- **Label (18pt / 16pt / 14pt)** — Mini-titles for sections/subsections; also the short text for functional elements like toggles, tabs, menus, buttons
- **Body (16pt / 14pt)** — Long-form writing and descriptive text. 14pt is the default for most situations; 16pt is for supporting large titles
- **Footnote & Caption (12pt)** — Reserved for footnotes, captions, and overlines only. Never use for regular body text or labeling

---

## 5. Color System

### Color Token Architecture

Radiant uses a three-layer token abstraction:

| Layer | Description | Example |
|-------|-------------|---------|
| **Value** | The actual hex code assigned to a token | `#1D232F` |
| **Generic token** | Color group of a token | `Gray 90` |
| **Role token** | The systematic usage of a token | `Text & Icon / Default` |

### Baseline Grayscale

| Role | Generic Token | Hex | RGB |
|------|--------------|-----|-----|
| Text 1 | Gray 90 | `#1D232F` | rgb(29, 35, 47) |
| Text 2 | Gray 60 | `#777E8B` | rgb(119, 126, 139) |
| Outline | Gray 40 | `#C0C6CF` | rgb(192, 198, 207) |
| Divider | Gray 20 | `#EAEDF2` | rgb(234, 237, 242) |
| Background | Gray 10 | `#F6F8FA` | rgb(246, 248, 250) |
| Surface | White | `#FFFFFF` | rgb(255, 255, 255) |

### Background Colors

| Role | Hex | Generic Token |
|------|-----|--------------|
| Background | `#F6F8FA` | Gray 10 |
| Surface | `#FFFFFF` | White |

### Text & Icon Colors

| Role | Hex | Generic Token |
|------|-----|--------------|
| Default | `#1D232F` | Gray 90 |
| Info | `#777E8B` | Gray 60 |
| Alternate | `#FFFFFF` | White |

### Divider Colors

| Context | Hex | Generic Token |
|---------|-----|--------------|
| On dark bg | `#777E8B` | Gray 60 |
| On light bg | `#EAEDF2` | Gray 20 |

### Outline Color
- **Outline**: `#C0C6CF` (Gray 40)

### Primary Color
- **Primary**: `#2770EF` (Blue 60) — Used exclusively for primary action buttons

### Semantic Colors

| Meaning | Foreground | Hex | Background | Hex |
|---------|-----------|-----|------------|-----|
| Failure | Red 60 | `#E22B3D` | Red 20 | `#FCD4D7` |
| Info | Blue 60 | `#2770EF` | Blue 20 | `#DEE8FA` |
| Success | Green 60 | `#06BF7F` | Green 20 | `#C7F2E3` |
| Warning | Yellow 60 | `#FCC838` | Yellow 20 | `#FCF1D1` |

> Alert descriptive text always uses the default text color (Gray 90).

### List States

| State | Hex | Description |
|-------|-----|-------------|
| Hover | `#C0C6CF1E` | Gray 40 at 12% opacity |
| Selected | `#71A1F41E` | Blue 50 at 12% opacity |

### Interaction States

**Component states** (e.g., buttons): Differentiate states by adjusting darkness value by increments of 10.
- Default: Blue 60 → Hover: Blue 70 → Pressed/Active: Blue 80
- **Focus state**: Always a 2px wide primary blue outline at darkness value 50 (consistent across all focusable elements)

### Full Color Palette

8 color families, each with 10 shades (10–100):

| Family | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 100 |
|--------|----|----|----|----|----|----|----|----|----|----|
| **Gray** | `#F6F8FA` | `#EAEDF2` | `#DBDFE7` | `#C0C6CF` | `#A5ACB9` | `#777E8B` | `#4A515E` | `#323946` | `#1C2029` | `#000000` |
| **Red** | `#FFF0F0` | `#FFEBEC` | `#FCD4D7` | `#F9B3B9` | `#F47E89` | `#E22B3D` | `#B6313E` | `#721F27` | `#3D090E` | `#1F0003` |
| **Purple** | `#F7F5FF` | `#F0EBFF` | `#E3D9FC` | `#D1C0FB` | `#B094F8` | `#8C62F5` | `#6A4ABA` | `#422E75` | `#210F4F` | `#0E0033` |
| **Blue** | `#F2F7FF` | `#DEE8FA` | `#CEDCF5` | `#ABC7F9` | `#71A1F4` | `#2770EF` | `#2359B6` | `#163772` | `#082559` | `#001740` |
| **Teal** | `#EDFDFF` | `#E1F7FA` | `#C9F0F5` | `#B5ECF2` | `#82DFE9` | `#48D1E0` | `#369FAA` | `#22636B` | `#0C3F45` | `#002D33` |
| **Yellow** | `#FFFBF0` | `#FFF8E5` | `#FCF1D1` | `#FDE9AF` | `#FCD977` | `#FCC838` | `#BF982A` | `#785F1A` | `#4F3D09` | `#2E2200` |
| **Green** | `#EDFFF9` | `#E0F8EF` | `#C7F2E3` | `#9BE5CB` | `#56D3A8` | `#06BF7F` | `#049160` | `#025B3C` | `#003B26` | `#001F14` |
| **Orange** | `#FFF5F0` | `#FFEEE5` | `#FFDDCC` | `#FFCCB3` | `#FFA97E` | `#FF8142` | `#C26232` | `#7A3D1F` | `#471F0B` | `#331100` |

### Accessibility
- Adheres to **WCAG AA** standards
- **4.5:1** contrast ratio for normal text on background
- **3:1** contrast ratio for large text

---

## 6. Surfaces

Surfaces are the top-level templates that define page structure and layout.

### Surface Pages

#### View Surface Page
- **Purpose**: Read-only content browsing
- **User Action**: View and browse read-only content to find relevant information
- **System Response**: Page displays read-only content

#### Edit Surface Page
- **Purpose**: Content creation and editing interfaces

#### Browse Surface Page
- **Purpose**: Content discovery and navigation interfaces

#### Wizard Surface Page
- **Purpose**: Multi-step guided workflows at the page level

### Surface Modals (Modal Overlays)

#### MO.1 — Simple Dialog
- **Purpose**: Straightforward single-step user interactions
- **Examples**: Schedule analysis, create liveboard, export answer, create schedule, edit filter, send to Slack, pin to liveboard
- **Pattern**: Single content area with form controls, Cancel + Primary action buttons

#### MO.2 — Sub-task Dialog
- **Purpose**: Complex workflows with nested sub-steps
- **Examples**: Filter modal with bulk value entry, SpotIQ wizard flow, share flow with permissions
- **Pattern**: Main dialog can spawn child dialogs for sub-tasks; Cancel/Back button adapts to context

#### MO.3 — Wizard Dialog
- **Purpose**: Multi-step complex tasks divided into consumable focused steps
- **User Action**: Complete complex tasks broken into manageable steps
- **System Response**: Progress modal provides sense of completion and orientation
- **Examples**: SpotIQ configuration wizard, GIT integration setup
- **Pattern**: Progress bar (stepper), Previous/Continue/Cancel buttons, state preservation between steps

#### MO.4 — Splash Screen Dialog
- **Purpose**: Onboarding and feature introduction
- **Example**: First-time login onboarding tour
- **Pattern**: Illustration + Title + Description + Primary CTA + optional "Not now" secondary

#### MO.5 — Information Dialog
- **Purpose**: Read-only information display
- **Examples**: Underlying data tables, query SQL, analysis details, permission errors, delete dependency warnings
- **Pattern**: Content display with close/dismiss action; no form inputs

#### MO.6 — Sub Navigation Modal (Pending)
- **Purpose**: Flexible panel-based navigation for complex configuration UIs
- **Structure**: Left rail navigation + right rail content editing
- **Examples**: Granular permissions, change analysis, data literacy, answer customization

### Modal Interaction Patterns
- **Overlay**: `#000000` at 60% opacity; clicking outside closes modal
- **Keyboard**: Esc key closes dialog without submitting
- **Cancel button**: Closes modal without applying changes
- **Primary CTA**: Right-aligned in footer; label describes the action

---

## 7. Widgets

Widgets are reusable elements created from multiple components.

### Navigation Widgets

#### Global Navigation
- Appears on View and Browse surfaces for site-level navigation

#### Global Left Rail
- Persistent left sidebar for section navigation

### View Widgets

#### Data Table
- Tabular data display for read-only and editable modes

#### Cards
- Contain content and actions about a single subject
- **Anatomy**: Card container (required), content elements (optional)
- **Types**: Single cards, grouped cards
- **Actions**: Primary action (whole card), supplemental actions, overflow menu, additional actions

#### Text Layout
- Structured text content display

### Input / Edit Widgets

#### Text Fields
- Two types of text field widgets for string/integer data entry
- **User Action**: Enter information to complete form processes
- **System Response**: Shows error states based on form validation rules
- **States**: Default, focused, filled, error, disabled

#### Object Table
- Tabular data in read-only and editable modes
- **Features**:
  - Search, filter, sort across columns
  - Single and batch actions on objects
  - Inline editing with spreadsheet-like interface
  - Horizontal and vertical scroll handling
  - Column width strategy for 1366px screens
- **Batch Actions**: Select single/multiple objects for bulk operations
- **Sort & Filter**: Per-column sorting, multi-object picker, search, date picker modals

#### Frequency Picker
- Select specific time periods for syncing/scheduling operations
- **User Action**: Set times and dates for recurring actions
- **System Response**: Interface adapts based on frequency type (hourly, daily, weekly, monthly)
- **Elements**: Primary frequency dropdown, day selection cluster, month selection, time fields
- **Validation**: Error states for invalid inputs

#### Date Picker
- Select specific fixed dates for filtering
- **Default State**: Condition dropdown + start/end date fields
- **Conditions**: Between, On, Not on, After, On or after, Before, On or before

#### Rolling Date Picker
- Select dates relative to current date (anchor date)
- **Default State**: Condition dropdown + number field + time period field
- **Conditions**: Yesterday, Today, Tomorrow, This, Last, Next, Before, After, and more
- **Time Periods**: Second, Minute, Hour, Day, Week, Month, Quarter (default), Year

#### Object Picker
- Single object selection interface

#### Single Object List Picker
- Select single item in list format
- Supports single-level nesting and item creation
- **Features**: Multi-level navigation, search with zero results state, create new item with error handling

#### Multi-Object List Picker
- Select multiple items in list format
- **Features**:
  - Search with select all/clear functionality
  - Add value inline with error handling
  - Bulk value addition via sub-task modal (comma-separated)
  - Stripped version without add link
  - Nested state handling

### User Assistance Widgets

#### Tool Tips
- Display descriptive text on hover/focus/tap
- **Trigger**: 1 second delay on hover to prevent distraction
- **Content**: 1–2 word nouns describing "what this is"; not for calls to action
- **Rule**: All icon-only buttons must have tooltip labels

#### Explainer Cards
- Flexible format for answering user questions
- **Trigger**: Click activation (not hover); dismiss with X or outside click
- **Width**: 340px container
- **Components**: Title (optional), description (max 3 lines), container, close button, media (optional), CTA buttons (optional)
- **Content**: 2–4 word titles, 40 characters per line max, max 4 lines

#### Spotlight Cards
- System-activated popups focusing on specific UI elements
- **Trigger**: System events (page landing, specific interactions)
- **Dismiss**: Click X, close button, or click outside
- **Types**: Text with title, sequenced stepper, text without title, with media
- **Content**: 1–2 word titles, 40 characters per line max, max 4 lines, conversational tone

### Alert Widgets

#### Banners
- System-level alerts for critical events affecting the entire system
- **Anatomy**: Indicator icon + Description + Link (optional) + Close button (optional) + Container
- **Behavior**: Persist over session, appear without user action
- **Actions**: Max 2 buttons (e.g., "Fix issue", "Report issue")
- **Close button**: Include when system-caused; omit when user-caused
- **Content**: Short phrases, no periods; include remedy action when possible

#### Toasts
- Confirmations/acknowledgments requiring minimal interaction
- **Trigger**: At task completion, animates from bottom center
- **Duration**: 5 seconds before auto-dismissal
- **Usage**: Confirm actions not clearly visible in UI; always include close button
- **Content**: Past tense ("Success! You added your pinboards"), concise, informal tone acceptable
- **Rule**: Never use for clearly visible inline editing; avoid multiple simultaneous toasts

#### Section Alerts
- Inform users of events in specific screen sections
- **Placement**: Above the affected area, shown in context
- **Close button**: Include with warning-style; omit with error-style
- **Rule**: Never show multiple local alerts per page

#### Muted Alerts (Empty States)
- Shown when no data is available
- **Types**: Big empty state (full layout), Small empty state (compact)
- **Big anatomy**: Image (optional) + Title + Subtitle (optional) + Description + Link (optional) + Primary button (optional) + Secondary button (optional)
- **Use cases**: No data (first use), user action (no search results, process completion), error management (permissions, system, configuration)
- **Templates**: No data, No search results, Success, Generic warning

### Core Pattern Widgets

#### Delete Object
- Confirm object/configuration removal
- **Pattern**: Confirmation message → extended warning for cascading effects → reconfirmation field for secondary precaution
- **Modal Header**: "Delete + [object name]"

#### Three Dot Menu
- Organized action menu with categorized actions
- **Categories** (in order):
  1. **Create** — Generate new objects
  2. **View** — Change viewing mode (not the object)
  3. **Edit** — Change objects themselves
  4. **Manage** — Control information based on objects
  5. **Share** — Invite users to connect with objects
  6. **Export** — Connect objects internally/externally
  7. **Delete** — Destructive action (always last)
- **Pattern**: Decision tree for visibility and disabled states

#### Sign Up
- User registration flow with password validation
- **States**: Landing, default, password check, requirement failures, dictionary word errors, password tips, mismatch, show/hide password

#### Request Data / Download-Export / Share Object
- Core patterns for data operations (specifications pending)

---

## 8. Components

Components are the individual UI elements that compose widgets.

### Avatar
- Circular containers with pictures or initials representing users/businesses
- **Group styles**: Single, Tray, Grid
- **Sizes**: Large (56px), Medium (32px), Small (24px)
- **Thumbnails**: Flat color with 6 default high-contrast colors
- **Interaction**: Clickable or non-clickable; optional tooltip on hover

### Buttons
- Clickable elements that trigger actions
- **Types**:
  - **Primary** — Main action; high emphasis. One per layout area
  - **Secondary** — Additional actions; medium emphasis
  - **Tertiary** — Less prominent actions; low emphasis
- **Sizes**: Medium (32px), Small (24px), XSmall (20px), Full bleed
- **Dark background** variants available
- **States**: Default → Hover (+10 darkness) → Active (+20 darkness) → Disabled
- **Focus**: 2px primary blue outline at value 50
- **Rule**: Icon-only buttons require tooltips

### Chips & Search Tokens
- Compact interactive elements representing objects, text, actions, users, or groups
- **Chip types**:
  - **Trigger chip** — Contextual actions
  - **Input chip** — Text conversion
  - **Select chip** — Single selection
- **Search tokens** (color-coded):
  - Measure (Green), Attribute (Blue), Condition (Gray), Error (Red), Warning (Yellow)
- **Max width**: 320px
- **Features**: Hover remove icons, optional avatars

### Dropdown
- Toggle contextual menu overlays
- **Input width**: Fixed
- **Menu width**: Can exceed input width if content requires
- **Max visible items**: 7 (default)
- **Width configurations**: Equal width, content width, fixed width
- **Dismiss**: On selection or outside click

### Form Components

#### Checkbox
- Select one or more items from a set
- **States**: Selected, unselected, indeterminate

#### Radio Button
- Select single option from a set
- **Behavior**: Auto-deselects previous selection

#### Toggle
- Switch between two states (on/off)

#### Number Input
- Numeric entry with spin buttons
- **Min width**: 80px

#### File Uploader
- Choose and upload files from computer

#### Segmented Control
- Horizontal filtering mechanism
- **Rule**: Text only OR icons only (never both)

### Links
- **Variants**: Default (blue on white/gray), White (dark backgrounds), Black (light backgrounds)
- **Rules**: No generic text like "click here"; use meaningful labels; mirror surrounding font size; no punctuation within links

### Menus
- Compact display of action groups
- **Triggers**: Click, icon interaction, or right-click
- **Optional elements**: Menu icon, checkbox, group header, contextual info
- **Max visible items**: 7 (search enabled for 8+)
- **Width types**: Form width, content width (max 240px), fixed width (240px or 320px)
- **Alignment**: Bottom-left; repositions if viewport edge

### Pagination
- Divide long content into separate pages
- **Types**: Range pagination (full navigation), Item pagination (previous/next only)
- **Max visible items**: 7
- **Number wrapping**: After 9,999 (e.g., 8.15M)
- **Optional**: Total result count

### Tabs
- Switch between content topics
- **Sizes**: Small (32px — nested/space-constrained), Medium (48px — default)
- **Divider**: 1px line at bottom
- **Alignment**: Left for medium, center for small
- **Labels**: Single row, max 3 words per tab

---

## 9. Icons

### Style
- **Monotone** icons only
- Simple, modern, friendly, and universal

### Anatomy

| Property | Specification |
|----------|--------------|
| Grid | 18x18px |
| Live area | 16x16px (center) |
| Stroke | 2px with sharp caps |
| Shape | Filled shapes (>2px) can mix sharp and rounded (1px) corners |
| Gap | Minimum 1px between shapes/strokes |

### Design Guidelines
- Design within the 18x18px grid; scale down to 16px, 14px, 12px for use
- Content must stay inside the live area
- Give filled shapes less space than stroke areas for visual balance
- Flatten icons before exporting
- Avoid complex or organic shapes
- Keep stroke weights and rounded caps consistent
- Check existing icons before creating new ones

### Size Variants
- Design at 18x18px, then scale to: 16px, 14px, 12px

---

## 10. Prototyping Guidelines

### General Principles

1. **Always use design tokens** — Never hard-code colors, spacing, typography, or visual values
2. **Follow the hierarchy** — Surfaces contain Widgets, Widgets contain Components
3. **Consistency first** — Use existing patterns before creating new ones
4. **Accessibility matters** — WCAG AA compliance, focus states, semantic HTML, ARIA labels

### Building a Prototype

#### Step 1: Choose the Surface
Identify which surface template fits your use case:
- **View** — Read-only content display
- **Edit** — Content creation/editing
- **Browse** — Content discovery
- **Wizard** — Multi-step guided flow
- **Modal** — Overlay dialogs (Simple, Sub-task, Wizard, Splash, Information, Sub-navigation)

#### Step 2: Compose with Widgets
Select the appropriate widgets for each section of your surface:
- **Navigation**: Global nav, left rail
- **Content display**: Data tables, cards, text layouts
- **Data input**: Text fields, object tables, pickers (date, frequency, object, list)
- **User assistance**: Tooltips, explainer cards, spotlight cards
- **Feedback**: Banners, toasts, section alerts, empty states
- **Actions**: Delete confirmation, three-dot menu, share, export

#### Step 3: Use the Right Components
Build widget internals with the correct atomic components:
- **Actions**: Buttons (primary/secondary/tertiary), links
- **Selection**: Checkboxes, radios, toggles, segmented controls
- **Input**: Text fields, number inputs, dropdowns, file uploaders
- **Display**: Avatars, chips, search tokens, tabs, pagination
- **Navigation**: Menus, tabs, pagination

#### Step 4: Apply Design Tokens
- Use **color tokens by role**, not by hex value
- Follow the **type scale** — pick by content role, not arbitrary sizing
- Use the **spacing scale** (4px base unit): A(4), B(8), C(12), D(16), E(20), F(24), H(32), J(48)
- Apply **semantic colors** consistently for alerts and states

### Component Usage Rules

| Rule | Description |
|------|-------------|
| One primary button per layout area | Never place two primary buttons side by side |
| Icon buttons need tooltips | Every icon-only button must show a tooltip on hover |
| Max 7 visible menu items | Use search for 8+ items in dropdowns and menus |
| Tabs: max 3 words | Keep tab labels concise and single-row |
| Links: no "click here" | Always use meaningful, descriptive link text |
| Modals: primary CTA on right | Cancel on left, primary action on right in footer |
| Focus: 2px blue outline | All focusable elements use Blue 50 at 2px width |
| List hover: Gray 40 @ 12% | Consistent hover state across all list items |
| List selected: Blue 50 @ 12% | Consistent selection state across all list items |
| Semantic colors are fixed | Red=failure, Blue=info, Green=success, Yellow=warning |

### Content Guidelines

| Element | Rule |
|---------|------|
| **Button labels** | 1–2 words, imperative verbs (Save, Delete, Export) |
| **Titles** | Sentence case, max 4 words |
| **Labels** | Max 3 words, no articles |
| **Tooltips** | 1–2 word nouns |
| **Explainer cards** | 2–4 word titles, max 4 lines body |
| **Toasts** | Past tense, concise ("Success! You added your pinboards") |
| **Banners** | Short phrases, no periods, include remedy action |
| **Delete confirmation** | Max 140 characters explaining consequences |
| **No periods** | In labels, buttons, or short alert phrases |
| **Active voice** | Always |

### Modal Dialog Checklist

When prototyping any modal dialog:

- [ ] Choose the correct modal type (Simple, Sub-task, Wizard, Splash, Information)
- [ ] Include overlay (`#000000` at 60% opacity)
- [ ] Support Esc key to close
- [ ] Support click-outside to close
- [ ] Place Cancel/Back on left, Primary CTA on right
- [ ] Use descriptive CTA label (not just "Submit")
- [ ] For wizards: include progress bar, Previous/Continue buttons
- [ ] For information dialogs: no form inputs, just display + close

### Alert Usage Decision Tree

```
Is it system-wide? → Banner
Is it section-specific? → Section Alert
Is it a task confirmation? → Toast
Is it an empty/no-data state? → Muted Alert (Empty State)
```

### State Color Quick Reference

```
Success:  bg → Green 20 (#C7F2E3)   text → Green 60 (#06BF7F)
Warning:  bg → Yellow 20 (#FCF1D1)  text → Yellow 60 (#FCC838)
Error:    bg → Red 20 (#FCD4D7)     text → Red 60 (#E22B3D)
Info:     bg → Blue 20 (#DEE8FA)    text → Blue 60 (#2770EF)
```

### Button State Color Pattern

```
Default  → [color] 60
Hover    → [color] 70
Active   → [color] 80
Focus    → 2px outline, Blue 50
Disabled → reduced opacity
```

---

## Appendix: Widget-Component Mapping

Quick reference for which components are commonly used within each widget category:

| Widget Category | Common Components |
|----------------|-------------------|
| **Text Fields** | Input fields, labels, helper text, error messages |
| **Object Table** | Checkboxes, menus, pagination, search input, dropdowns, chips |
| **Date Picker** | Dropdown, input fields, labels |
| **Frequency Picker** | Dropdown, number input, checkboxes, labels |
| **Object List Pickers** | Checkboxes, search input, links, chips |
| **Tooltips** | Text display (auto-positioned) |
| **Explainer Cards** | Title, description, close button, media, CTA buttons |
| **Spotlight Cards** | Title, description, stepper, close button |
| **Banners** | Icon, description, links, close button, action buttons |
| **Toasts** | Icon, message text, close button, optional action link |
| **Section Alerts** | Icon, description, close button |
| **Empty States** | Image, title, subtitle, description, buttons, links |
| **Delete Confirmation** | Warning message, text input (reconfirmation), buttons |
| **Three Dot Menu** | Menu items organized by category |
| **Cards** | Container, content area, action buttons, overflow menu |

---

*This document consolidates the Radiant Pro design system documentation from ThoughtSpot's Notion workspace into a unified prototyping reference. It is designed to be used alongside the Radiant Prototyping Kit codebase.*
