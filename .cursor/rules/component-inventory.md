---
description: Complete inventory of Radiant components with use cases and selection guidance
globs: ["src/prototypes/**/*.tsx", "src/components/**/*.tsx"]
---

# Radiant Component Inventory

This document lists all available components in the Radiant Design System. **ALWAYS prefer using existing components over creating new ones.**

## Component Selection Decision Tree

Use this to quickly find the right component:

### For User Input
- **Text entry (single line)** → `TextInput`
- **Text entry (multi-line)** → `TextArea`
- **Search with icon** → `SearchInput`
- **Date selection** → `DatePicker`
- **Dropdown selection** → `Select`

### For Selection Controls
- **Single choice (mutually exclusive)** → `Radio`
- **Multiple choices** → `Checkbox`
- **On/Off toggle** → `Toggle`
- **Segmented options (2-4)** → `SegmentedControl`

### For Actions
- **Primary action (1 per screen)** → `Button variant="primary"`
- **Secondary actions** → `Button variant="secondary"`
- **Inline/text actions** → `Button variant="tertiary"`
- **Link navigation** → `Link`

### For Feedback
- **Inline notification** → `Alert`
- **Temporary notification** → `Toast`
- **Contextual help** → `Tooltip`
- **Loading state** → `LoadingIndicator`
- **Progress visualization** → `ProgressBar`

### For Layout/Navigation
- **Tab switching** → `Tabs`
- **Side navigation** → `Sidebar`
- **Wizard steps** → `Stepper`
- **Content sections** → `Accordion`
- **Visual separator** → `Divider`

### For Data Display
- **Data grid** → `Table`
- **Tags/labels** → `Chip`
- **User representation** → `Avatar`
- **Content container** → `Card`
- **Pagination** → `Pagination`

### For Overlays
- **Dialog with actions** → `Modal`
- **Confirmation prompt** → `ConfirmDialog`
- **Multi-step dialog** → `WizardModal`
- **Form in modal** → `FormModal`
- **Dropdown menu** → `Menu`
- **Contextual overlay** → `Popover`
- **Filter selection** → `FilterDialog`

---

## Complete Component Reference

### Buttons & Actions

| Component | Primary Use Case | Key Props |
|-----------|-----------------|-----------|
| **Button** | All clickable actions | `variant`: primary/secondary/tertiary, `size`: small/basic/large, `icon`, `loading`, `disabled` |
| **Link** | Navigation, external links | `href`, `variant`, `external` |

**Button Variant Rules:**
- `primary` - Main action, ONE per screen/section
- `secondary` - Alternative/cancel actions
- `tertiary` - Inline actions, less emphasis

### Selection Controls

| Component | When to Use | Key Props |
|-----------|-------------|-----------|
| **Checkbox** | Multi-select, opt-in | `checked`, `onChange`, `label`, `indeterminate` |
| **Radio** | Single selection from group | `checked`, `onChange`, `label`, `name` |
| **Toggle** | On/off, enable/disable | `checked`, `onChange`, `label`, `size` |
| **SegmentedControl** | 2-4 mutually exclusive options | `options`, `value`, `onChange` |

### Form Inputs

| Component | When to Use | Key Props |
|-----------|-------------|-----------|
| **TextInput** | Single-line text | `value`, `onChange`, `label`, `placeholder`, `error`, `helperText` |
| **TextArea** | Multi-line text | `value`, `onChange`, `label`, `rows`, `resize` |
| **SearchInput** | Search with icon | `value`, `onChange`, `placeholder`, `onClear` |
| **Select** | Dropdown selection | `options`, `value`, `onChange`, `placeholder` |
| **DatePicker** | Date selection | `value`, `onChange`, `format` |

### Feedback & Status

| Component | When to Use | Key Props |
|-----------|-------------|-----------|
| **Alert** | Inline notifications | `status`: info/success/warning/failure, `message`, `dismissible` |
| **Toast** | Temporary notifications | `message`, `status`, `duration`, `onClose` |
| **Tooltip** | Contextual help on hover | `content`, `placement`, `children` |
| **LoadingIndicator** | Loading states | `size`, `Contextual` variant, `Skeleton` variant |
| **ProgressBar** | Progress visualization | `value`, `max`, `variant` |

### Navigation

| Component | When to Use | Key Props |
|-----------|-------------|-----------|
| **Tabs** | Switch between views | `tabs`, `activeTab`, `onTabChange` |
| **Sidebar** | Side navigation | `items`, `activeItem`, `onItemClick` |
| **Stepper** | Multi-step progress | `steps`, `currentStep`, `onStepChange` |
| **Pagination** | Page navigation | `page`, `totalPages`, `onPageChange` |
| **Menu** | Dropdown menu | `items`, `onSelect`, `trigger` |

### Data Display

| Component | When to Use | Key Props |
|-----------|-------------|-----------|
| **Table** | Tabular data | `columns`, `data`, `rowKey`, `sortable`, `hoverable` |
| **Chip** | Tags, status labels | `label`, `variant`, `onRemove`, `size` |
| **Avatar** | User representation | `name`, `src`, `size`, `variant` |
| **Card** | Content container | `children`, `variant`, `padding` |
| **Typography** | Styled text | `variant`, `color`, `children` |

### Layout

| Component | When to Use | Key Props |
|-----------|-------------|-----------|
| **Accordion** | Collapsible sections | `items`, `allowMultiple`, `defaultOpen` |
| **Divider** | Visual separator | `orientation`, `variant` |

### Overlays & Modals

| Component | When to Use | Key Props |
|-----------|-------------|-----------|
| **Modal** | Generic dialog | `isOpen`, `onClose`, `title`, `children`, `size` |
| **ConfirmDialog** | Confirmation prompts | `isOpen`, `onConfirm`, `onCancel`, `title`, `message` |
| **WizardModal** | Multi-step dialogs | `isOpen`, `steps`, `currentStep`, `onNext`, `onBack` |
| **FormModal** | Form in modal | `isOpen`, `onSubmit`, `onCancel`, `title`, `children` |
| **FilterDialog** | Filter selection | `isOpen`, `filters`, `onApply`, `onClear` |
| **Popover** | Contextual overlay | `isOpen`, `content`, `placement`, `trigger` |

### Icons

| Component | When to Use | Key Props |
|-----------|-------------|-----------|
| **Icon** | Iconography | `name`, `size`: xs/s/m/l/xl, `color` |
| **IconGallery** | Icon browsing (dev tool) | N/A |

**Available Icon Names (46 icons):**
```
arrow-up, arrow-down, arrow-left, arrow-right,
chevron-up, chevron-down, chevron-left, chevron-right,
plus, minus, cross, checkmark, checkmark-circle, cross-circle,
exclamation-point-circle, info-circle, question-mark,
copy, download, upload, save, refresh, pencil, trash-can,
share, pin, filter, play, pause, eye, eye-undo, clock, cog,
folder, funnel, lock, magnifying-glass, profile, sort, star,
tag, expand, fullscreen, hamburger, more, information
```

---

## Component Combinations

### Filter Dialog Pattern
```tsx
<Modal title="Add filter">
  <SearchInput placeholder="Search..." />
  {items.map(item => <Checkbox key={item.id} label={item.label} />)}
  <Toggle label="Show selected only" />
  <Button variant="primary">Apply</Button>
</Modal>
```

### Settings Form Pattern
```tsx
<div style={{ display: 'flex' }}>
  <Sidebar items={sections} activeItem={active} />
  <div style={{ flex: 1 }}>
    <TextInput label="Name" />
    <Toggle label="Enable notifications" />
    <Button variant="secondary">Cancel</Button>
    <Button variant="primary">Save</Button>
  </div>
</div>
```

### Data Table Pattern
```tsx
<SearchInput placeholder="Search..." />
<Table
  columns={[
    { key: 'name', label: 'Name' },
    { key: 'status', label: 'Status', render: (v) => <Chip label={v} /> },
  ]}
  data={data}
/>
<Pagination page={page} totalPages={total} />
```

### Confirmation Dialog Pattern
```tsx
<ConfirmDialog
  isOpen={isOpen}
  title="Delete this Answer?"
  message="This action cannot be undone."
  confirmLabel="Delete"
  onConfirm={handleDelete}
  onCancel={() => setIsOpen(false)}
/>
```

### Wizard/Stepper Pattern
```tsx
<WizardModal isOpen={isOpen} onClose={onClose}>
  <Stepper steps={steps} currentStep={current} />
  {/* Step content */}
  <Button variant="secondary">Back</Button>
  <Button variant="primary">Next</Button>
</WizardModal>
```

---

## Component Status

| Status | Components |
|--------|------------|
| **Stable** | Button, Alert, Modal, TextInput, Checkbox, Radio, Toggle, Tabs, Table, Chip, Avatar, Icon, SearchInput, Select, Tooltip, Card, Divider |
| **Beta** | WizardModal, Stepper, ConfirmDialog, FormModal, FilterDialog, DatePicker, Popover, Menu, SegmentedControl |
| **In Development** | Typography variants, LoadingIndicator variants |

---

## When NOT to Create New Components

**DO NOT create a new component if:**
1. An existing component with different props can achieve the result
2. The pattern is a composition of existing components
3. The difference is purely styling (use tokens instead)
4. It's a one-off prototype element (use inline styles)

**DO create a new component if:**
1. The pattern will be reused across 3+ prototypes
2. It has unique interactive behavior
3. It requires accessibility handling not in existing components
